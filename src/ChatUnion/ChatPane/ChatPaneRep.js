goog.module('vchat.ChatPaneRep');

var Representative = goog.require('vieux.Representative');
var ChatRegime = goog.require('vchat.ChatRegime');



/**
 * @constructor
 * @extends {Representative}
 *
 * @param {Object} thread The initial thread this Representative will operate on.
 */
function ChatPaneRep(thread) {
    ChatPaneRep.base(this, 'constructor');

    this.thread = thread;
    this.user = this.thread.user;
    this.owner = ChatRegime.owner;

    ChatRegime.listen(ChatRegime.EventType.NEW_MESSAGE, this.onNewMessage, false, this);
}
goog.inherits(ChatPaneRep, Representative);


ChatPaneRep.prototype.onNewMessage = function(e) {
    e.data.some(function(data) {
        if (this.thread.id != data.thread.id) return;
        this.dispatchEvent(e);

        return true;
    }, this);
};


ChatPaneRep.prototype.EventType = {
    NEW_MESSAGE: 'new message'
};


exports = ChatPaneRep;
