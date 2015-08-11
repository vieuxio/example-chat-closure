goog.module('vchat.RootRep');

var Representative = goog.require('vieux.Representative');
var ChatRegime = goog.require('vchat.ChatRegime');


/**
 * @constructor
 * @extends {Representative}
 */
function RootRep() {
    RootRep.base(this, 'constructor');

    ChatRegime.listen(ChatRegime.EventType.ADD_CHAT_BOX, this.dispatchEvent, false, this);
    ChatRegime.listen(ChatRegime.EventType.REMOVE_CHAT_BOX, this.dispatchEvent, false, this);
}
goog.inherits(RootRep, Representative);


RootRep.prototype.getActive = function() {
    return !!ChatRegime.activeChatBox;
};


RootRep.prototype.deactivateChatBox = function() {
    ChatRegime.setActiveChatBox(null);
};


RootRep.prototype.EventType = {
    ADD_CHAT_BOX: 'add chat box',
    REMOVE_CHAT_BOX: 'remove chat box',
    SET_ACTIVE_CHAT_BOX: 'set active chat box'
};


exports = RootRep;
