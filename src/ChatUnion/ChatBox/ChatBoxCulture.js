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
    if (this.rep.minimized) this.toggle();

    this.$('input').focus();
    this.rep.setActive();
    this.onUpdate();
};


ChatBoxCulture.prototype.close = function() {
    this.rep.close();
};


ChatBoxCulture.prototype.toggle = function() {
    this.rep.minimize();

    goog.dom.classlist.toggle(this.getElement(), 'minimized');

    return false;
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
            '<header>' +
                '<img src="' + this.rep.user.picture.thumbnail + '"/>' +
                '<strong>' +
                    this.rep.user.getFullName() +
                '</strong>' +
                '<close>✖</close>' +
                '<minimize></minimize>' +
            '</header>' +
            '<content></content>' +
        '</chat-box>';
};


/**
 * @override
 */
ChatBoxCulture.prototype.disposeInternal = function() {
    this.rep.dispose();

    ChatBoxCulture.base(this, 'disposeInternal');
};


ChatBoxCulture.prototype.events = {
    'click': {
        'chat-box': ChatBoxCulture.prototype.focus,
        'close': ChatBoxCulture.prototype.close,
        'minimize': ChatBoxCulture.prototype.toggle
    }
};


exports = ChatBoxCulture;

