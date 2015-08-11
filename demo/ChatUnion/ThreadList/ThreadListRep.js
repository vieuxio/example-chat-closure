goog.module('vchat.ThreadListRep');

var Representative = goog.require('vieux.Representative');
var ChatRegime = goog.require('vchat.ChatRegime');



/**
 *
 * @constructor
 * @extends {Representative}
 */
function ThreadListRep() {
    ThreadListRep.base(this, 'constructor');

    ChatRegime.listen(ChatRegime.EventType.INITIAL_DATA, this.onInitialData, false, this);
    ChatRegime.listen(ChatRegime.EventType.NEW_MESSAGE, this.dispatchEvent, false, this);
}
goog.inherits(ThreadListRep, Representative);


/**
 * Fires on initial fetch.
 */
ThreadListRep.prototype.onInitialData = function() {
    this.dispatchEvent(this.EventType.INITIAL_DATA);
};


ThreadListRep.prototype.getThreads = function() {
    return ChatRegime.threads;
};


/**
 * @enum {string}
 */
ThreadListRep.prototype.EventType = {
    INITIAL_DATA: 'initial data',
    NEW_MESSAGE: 'new message'
};


exports = ThreadListRep;
