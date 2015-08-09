goog.module('vchat.MotherPaneRep');

var Representative = goog.require('vieux.Representative');
var ChatRegime = goog.require('vchat.ChatRegime');



/**
 *
 * @constructor
 * @extends {Representative}
 */
function MotherPaneRep() {
    MotherPaneRep.base(this, 'constructor');

    ChatRegime.listen(ChatRegime.EventType.INITIAL_DATA, this.onUpdate, false, this);
    ChatRegime.listen(ChatRegime.EventType.SET_ACTIVE_THREAD, this.onUpdate, false, this);
    ChatRegime.listen(ChatRegime.EventType.NEW_MESSAGE, this.onUpdate, false, this);
}
goog.inherits(MotherPaneRep, Representative);


MotherPaneRep.prototype.getThreads = function() {
    return ChatRegime.threads;
};


MotherPaneRep.prototype.getActiveThread = function() {
    return ChatRegime.activeThread;
};


MotherPaneRep.prototype.onUpdate = function() {
    this.dispatchEvent(this.EventType.UPDATE);
};


/**
 * @enum {string}
 */
MotherPaneRep.prototype.EventType = {
    INITIAL_DATA: 'initial data',
    UPDATE: 'update',
    SET_ACTIVE_THREAD: 'set active thread'
};


exports = MotherPaneRep;
