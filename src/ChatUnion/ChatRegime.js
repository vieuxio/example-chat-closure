goog.module('vchat.ChatRegime');

var EventTarget = goog.require('goog.events.EventTarget');
var ThreadUndertaker = goog.require('vchat.ThreadUndertaker');
var ThreadStereotype = goog.require('vchat.ThreadStereotype');



/**
 * ChatRegime is responsible for dealing with all the business logic of the chat application.
 *
 * @constructor
 * @extends {EventTarget}
 */
function ChatRegime() {
    ChatRegime.base(this, 'constructor');

    this.undertaker = ThreadUndertaker;
    this.threads = /* Array.<ThreadStereotype> */[];
    this.activeThread = null;

    this.chatBoxes = [];
    this.activeChatBox = null;

    this.getThreads_();
    this.setupUpdates_();
    this.getOwner_();
}
goog.inherits(ChatRegime, EventTarget);


/**
 * Fetches initial threads
 *
 * @private
 */
ChatRegime.prototype.getThreads_ = function() {
    this.undertaker.getThreads(this.onInitialData.bind(this));
};


ChatRegime.prototype.setupUpdates_ = function() {
    setTimeout(function() {
        this.undertaker.getUpdates(this.onUpdate.bind(this));
    }.bind(this), 1000);
};


ChatRegime.prototype.onInitialData = function(err, data) {
    if (err) return;

    this.threads = data.threads.map(function(thread) {
        return new ThreadStereotype(thread);
    });
    this.activeThread = this.threads[0];
    this.activeThread.active = true;

    this.dispatchEvent(this.EventType.INITIAL_DATA);
};


ChatRegime.prototype.getThreadById = function(id) {
    return this.threads.filter(function(thread) {
        return thread.id == id;
    })[0];
};


ChatRegime.prototype.onUpdate = function(err, data) {
    if (err || !data.length) return this.setupUpdates_();

    data.forEach(function(data) {
        var correspondingThread = this.getThreadById(data.thread.id);

        if (!correspondingThread) return;

        correspondingThread.messages.push(data.thread.messages.slice(correspondingThread.messages.length));

        correspondingThread.unread = data.thread.id != this.activeThread.id &&
            (this.activeChatBox ? this.activeChatBox.id != data.thread.id : true);

        correspondingThread.active = data.thread.id == this.activeThread.id;
    }, this);

    this.dispatchEvent({
        type: this.EventType.NEW_MESSAGE,
        data: data
    });

    this.setupUpdates_();
};


ChatRegime.prototype.setActiveChatBox = function(thread) {
    if (this.activeChatBox == thread) return;

    this.activeChatBox = thread;

    if (thread)
        this.activeChatBox.unread = false;

    this.dispatchEvent(this.EventType.SET_ACTIVE_CHAT_BOX);
};


ChatRegime.prototype.addChatBox = function(thread) {
    if (this.chatBoxes.indexOf(thread) == -1)
        this.chatBoxes.push(thread);

    this.setActiveChatBox(thread);

    this.dispatchEvent({
        type: this.EventType.ADD_CHAT_BOX,
        thread: thread
    });
};


ChatRegime.prototype.removeChatBox = function(thread) {
    var i = this.chatBoxes.indexOf(thread);
    if (i == -1) return;

    this.chatBoxes.splice(i, 1, 0);
    this.setActiveChatBox(null);

    this.dispatchEvent({
        type: this.EventType.REMOVE_CHAT_BOX,
        thread: thread
    });
};


ChatRegime.prototype.getUnreadCount = function() {
    return this.threads.filter(function(thread) {
        return thread.unread;
    }).length;
};


ChatRegime.prototype.setActive = function(thread) {
    if (this.activeThread == thread) return;

    this.activeThread = thread;
    this.activeThread.unread = false;

    this.dispatchEvent(this.EventType.SET_ACTIVE_THREAD);
};


ChatRegime.prototype.getOwner_ = function() {
    this.undertaker.getOwner(function(err, owner) {
        this.owner = owner;
    }.bind(this));
};


ChatRegime.prototype.EventType = {
    INITIAL_DATA: 'initial data',
    SET_ACTIVE_THREAD: 'set active thread',
    SET_ACTIVE_CHAT_BOX: 'set active chat box',
    NEW_MESSAGE: 'new message',
    ADD_CHAT_BOX: 'add chat box',
    REMOVE_CHAT_BOX: 'remove chat box'
};

exports = new ChatRegime();
