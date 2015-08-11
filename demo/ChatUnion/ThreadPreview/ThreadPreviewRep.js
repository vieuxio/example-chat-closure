goog.module('vchat.ThreadPreviewRep');

var Representative = goog.require('vieux.Representative');
var ThreadStereotype = goog.require('vchat.ThreadStereotype');
var ChatRegime = goog.require('vchat.ChatRegime');



/**
 * @constructor
 *
 * @extends {Representative}
 * @param {ThreadStereotype} thread A thread Stereotype
 */
function ThreadPreviewRep(thread) {
    ThreadPreviewRep.base(this, 'constructor');

    this.thread = thread;
    this.user = thread.user;
    this.lastMessage = thread.messages.slice(-1);

    ChatRegime.listen(ChatRegime.EventType.SET_ACTIVE_THREAD, this.dispatchEvent, false, this);
    ChatRegime.listen(ChatRegime.EventType.NEW_MESSAGE, this.onUpdate, false, this);
    ChatRegime.listen(ChatRegime.EventType.SET_ACTIVE_CHAT_BOX, this.dispatchEvent, false, this);
}
goog.inherits(ThreadPreviewRep, Representative);


ThreadPreviewRep.prototype.getActive = function() {
    return this.thread == ChatRegime.activeThread;
};


ThreadPreviewRep.prototype.onUpdate = function(e) {
    e.data.some(function(data) {
        if (data.thread.id != this.thread.id) return;

        this.lastMessage = this.thread.messages.slice(-1);

        this.dispatchEvent(this.EventType.NEW_MESSAGE);

        return true;
    }, this);
};


ThreadPreviewRep.prototype.EventType = {
    SET_ACTIVE_THREAD: 'set active thread',
    NEW_MESSAGE: 'new message',
    SET_ACTIVE_CHAT_BOX: 'set active chat box'
};


exports = ThreadPreviewRep;
