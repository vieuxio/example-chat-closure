goog.module('vchat.RootCulture');

var Culture = goog.require('vieux.Culture');
var RootRep = goog.require('vchat.RootRep');
var MenuCulture = goog.require('vchat.MenuCulture');
var MotherPaneCulture = goog.require('vchat.MotherPaneCulture');
var ChatBoxCulture = goog.require('vchat.ChatBoxCulture');
var CultureMinistry = goog.require('vieux.CultureMinistry');



/**
 * @constructor
 * @extends {Culture}
 */
function RootCulture() {
    this.rep = new RootRep();
    RootCulture.base(this, 'constructor');

    this.menu = new MenuCulture();
    this.motherPane = new MotherPaneCulture();
    this.chatBoxes = [];
}
goog.inherits(RootCulture, Culture);


/**
 * @override
 */
RootCulture.prototype.bindRepEvents = function() {
    this.rep.listen(this.rep.EventType.ADD_CHAT_BOX, this.onAddChatBox, false, this);
    this.rep.listen(this.rep.EventType.REMOVE_CHAT_BOX, this.onRemoveChatBox, false, this);
};


RootCulture.prototype.onAddChatBox = function(e) {
    var existingChatBox = this.chatBoxes.filter(function(chatBox) {
        return chatBox.getThread().id == e.thread.id;
    })[0];

    if (existingChatBox) return existingChatBox.focus();

    var chatBox = new ChatBoxCulture(e.thread);
    this.chatBoxes.push(chatBox);

    chatBox.render(this.$('chat-boxes'));
};


RootCulture.prototype.onRemoveChatBox = function(e) {
    var existingChatBox = this.chatBoxes.filter(function(chatBox) {
        return chatBox.getThread().id == e.thread.id;
    })[0];

    if (existingChatBox) {
        goog.array.remove(this.chatBoxes, existingChatBox);
        existingChatBox.dispose();
    }
};


RootCulture.prototype.onClick = function(e) {
    var target = e.getBrowserEvent().target;

    var inChatBox = false;

    do {
        if (target.matches('chat-box') || target.matches('threads-popover')) {
            inChatBox = true;
            break;
        }
    } while ((target = target.parentNode) && (target != document.body));

    if (!inChatBox && this.rep.getActive())
        this.rep.deactivateChatBox();
};


/**
 * @override

 * @param {Element=} opt_base Optional element to render this item into.
 * @param {number=} opt_index Place to render element in base element's children list.
 */
RootCulture.prototype.render = function(opt_base, opt_index) {
    RootCulture.base(this, 'render', opt_base, opt_index);

    this.menu.render();
    this.chatBoxes.forEach(function(chatBox) {
        chatBox.render();
    });
};


/**
 * @override
 */
RootCulture.prototype.templates_base = function() {
    return '<root id="' + this.getId() + '">' +
        this.menu.getPlaceholder() +
        this.motherPane.getPlaceholder() +
        '<chat-boxes></chat-boxes>' +
        '</root>';
};


/**
 * @override
 */
RootCulture.prototype.disposeInternal = function() {
    this.menu.dispose();
    this.chatBoxes.forEach(function(chatBox) {
        chatBox.dispose();
    });

    RootCulture.base(this, 'disposeInternal');
};


RootCulture.prototype.events = {
    'click': {
        'root': RootCulture.prototype.onClick
    }
};


exports = RootCulture;

