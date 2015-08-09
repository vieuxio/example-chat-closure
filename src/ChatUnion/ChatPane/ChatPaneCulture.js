goog.module('vchat.ChatPaneCulture');

var Culture = goog.require('vieux.Culture');
var ChatPaneRep = goog.require('vchat.ChatPaneRep');



/**
 * @constructor
 *
 * @extends {Culture}
 * @param {Object} thread Thread this pane will render.
 */
function ChatPaneCulture(thread) {
    this.rep = new ChatPaneRep(thread);

    ChatPaneCulture.base(this, 'constructor');
}
goog.inherits(ChatPaneCulture, Culture);


/**
 * @override
 */
ChatPaneCulture.prototype.bindRepEvents = function() {
    this.rep.listen(this.rep.EventType.NEW_MESSAGE, this.onNewMessage, false, this);
};


ChatPaneCulture.prototype.onNewMessage = function() {
    this.$('messages').innerHTML = this.templates_messages();

    this.resetScroll_();
};


/**
 * @private
 */
ChatPaneCulture.prototype.resetScroll_ = function() {
    var messages = this.$('messages');
    var thread = this.$('thread');

    messages.scrollTop = messages.scrollHeight;
    thread.scrollTop = thread.scrollHeight;
};


ChatPaneCulture.prototype.render = function(opt_base, opt_index) {
    ChatPaneCulture.base(this, 'render', opt_base, opt_index);

    this.resetScroll_();
};


/**
 * @override
 */
ChatPaneCulture.prototype.templates_base = function() {
    return '<chat-pane id="' + this.getId() + '">' +
            this.templates_inner() +
        '</chat-pane>';
};


ChatPaneCulture.prototype.templates_inner = function() {
    var user = this.rep.thread.user;

    return '<thread>' +
            '<img src="' + user.picture.thumbnail + '"/>' +
            '<username><strong>' + user.getFullName() + '</strong></username>' +
            '<messages>' +
            this.templates_messages() +
            '</messages>' +
        '</thread>' +
        '<entry>' +
            '<img src="' + this.rep.owner.picture.thumbnail + '"/>' +
            '<input type="text" placeholder="This demo is for demonstrating unread threads synchronisation, ' +
                'so we left message typing out for the sake of brevity."/>' +
        '</entry>';
};


ChatPaneCulture.prototype.templates_messages = function() {
    return this.rep.thread.messages.map(this.templates_message.bind(this)).join('');
};


/**
 * @param {string} message Message body
 * @return {string}
 */
ChatPaneCulture.prototype.templates_message = function(message) {
    return '<message>' + message + '</message>';
};


/**
 * @override
 */
ChatPaneCulture.prototype.disposeInternal = function() {
    ChatPaneCulture.base(this, 'disposeInternal');
    this.rep.unlisten(this.rep.EventType.NEW_MESSAGE, this.onNewMessage, false, this);
};

exports = ChatPaneCulture;

