goog.module('vchat.ChatBoxRep');

var Representative = goog.require('vieux.Representative');
var ThreadStereotype = goog.require('vchat.ThreadStereotype');
var ChatRegime = goog.require('vchat.ChatRegime');



/**
 *
 * @constructor
 * @extends {Representative}
 *
 * @param {ThreadStereotype} thread ThreadStereotype instance
 */
function ChatBoxRep(thread) {
    ChatBoxRep.base(this, 'constructor');

    this.thread = thread;
    this.user = this.thread.user;
    this.minimized = false;

    ChatRegime.listen(ChatRegime.EventType.NEW_MESSAGE, this.onUpdate, false, this);
    ChatRegime.listen(ChatRegime.EventType.SET_ACTIVE_CHAT_BOX, this.onUpdate, false, this);
}
goog.inherits(ChatBoxRep, Representative);


ChatBoxRep.prototype.setActive = function() {
    ChatRegime.setActiveChatBox(this.thread);
};


ChatBoxRep.prototype.close = function() {
    ChatRegime.removeChatBox(this.thread);
};


ChatBoxRep.prototype.minimize = function() {
    this.minimized = !this.minimized;

    ChatRegime.setActiveChatBox(this.minimized ? null : this.thread);
};


ChatBoxRep.prototype.getActive = function() {
    return this.thread == ChatRegime.activeChatBox;
};


ChatBoxRep.prototype.onUpdate = function() {
    this.dispatchEvent(this.EventType.UPDATE);
};


/**
 * @override
 */
ChatBoxRep.prototype.disposeInternal = function() {
    ChatRegime.unlisten(ChatRegime.EventType.NEW_MESSAGE, this.onUpdate, false, this);
    ChatRegime.unlisten(ChatRegime.EventType.SET_ACTIVE_CHAT_BOX, this.onUpdate, false, this);

    ChatBoxRep.base(this, 'disposeInternal');
};


ChatBoxRep.prototype.EventType = {
    UPDATE: 'update'
};


exports = ChatBoxRep;
