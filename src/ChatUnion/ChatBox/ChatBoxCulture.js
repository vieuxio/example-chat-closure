goog.module('vchat.ChatBoxCulture');

var ChatBoxRep = goog.require('vchat.ChatBoxRep');
var Culture = goog.require('vieux.Culture');
var ChatPane = goog.require('vchat.ChatPaneCulture');
var ThreadStereotype = goog.require('vchat.ThreadStereotype');



/**
 *
 * @constructor
 * @extends {Culture}
 *
 * @param {ThreadStereotype} thread Chat thread stereotype.
 */
function ChatBoxCulture(thread) {
    this.rep = new ChatBoxRep(thread);
    ChatBoxCulture.base(this, 'constructor');

    this.chatPane = new ChatPane(thread);
}
goog.inherits(ChatBoxCulture, Culture);


ChatBoxCulture.prototype.bindRepEvents = function() {
    this.rep.listen(this.rep.EventType.UPDATE, this.onUpdate, false, this);
};


ChatBoxCulture.prototype.onUpdate = function() {
    goog.dom.classlist.enable(this.getElement(), 'active', this.rep.getActive());
    goog.dom.classlist.enable(this.getElement(), 'unread', this.rep.thread.unread);
};


ChatBoxCulture.prototype.getThread = function() {
    return this.rep.thread;
};


ChatBoxCulture.prototype.focus = function() {
    this.$('input').focus();
    this.rep.setActive();
    this.onUpdate();
};


ChatBoxCulture.prototype.render = function(opt_base, opt_index) {
    ChatBoxCulture.base(this, 'render', opt_base, opt_index);

    this.chatPane.render(this.$('content'));
    this.$('input').focus();
};


/**
 * @override
 */
ChatBoxCulture.prototype.templates_base = function() {
    return '<chat-box id="' + this.getId() + '">' +
            '<header>' + this.rep.user.getFullName() + '</header>' +
            '<content></content>' +
        '</chat-box>';
};


ChatBoxCulture.prototype.events = {
    'click': {
        'chat-box': ChatBoxCulture.prototype.focus
    }
};

exports = ChatBoxCulture;

