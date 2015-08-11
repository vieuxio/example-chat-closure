goog.module('vchat.ThreadPreviewCulture');

var classlist = goog.require('goog.dom.classlist');
var Culture = goog.require('vieux.Culture');
var ThreadPreviewRep = goog.require('vchat.ThreadPreviewRep');
var ThreadStereotype = goog.require('vchat.ThreadStereotype');
var Event = goog.require('goog.events.Event');


/**
 * @constructor
 * @extends {Culture}
 *
 * @param {ThreadStereotype} thread A thread Stereotype instance.
 */
function ThreadPreviewCulture(thread) {
    this.rep = new ThreadPreviewRep(thread);

    ThreadPreviewCulture.base(this, 'constructor');
}
goog.inherits(ThreadPreviewCulture, Culture);


ThreadPreviewCulture.prototype.setActiveThread = function() {
    goog.dom.classlist.enable(this.getElement(), 'active', this.rep.getActive());
    this.setUnread();
};


ThreadPreviewCulture.prototype.update = function() {
    this.setActiveThread();

    this.$('last-message').innerText = this.rep.lastMessage;
};


ThreadPreviewCulture.prototype.setUnread = function() {
    goog.dom.classlist.enable(this.getElement(), 'unread', this.rep.thread.unread);
};


/**
 * @override
 */
ThreadPreviewCulture.prototype.bindRepEvents = function() {
    this.rep.listen(this.rep.EventType.SET_ACTIVE_THREAD, this.setActiveThread, false, this);
    this.rep.listen(this.rep.EventType.NEW_MESSAGE, this.update, false, this);
    this.rep.listen(this.rep.EventType.SET_ACTIVE_CHAT_BOX, this.setUnread, false, this);
};


ThreadPreviewCulture.prototype.getThread = function() {
    return this.rep.thread;
};


/**
 * @override
 */
ThreadPreviewCulture.prototype.templates_base = function() {
    var active = this.rep.getActive() ? 'active' : '';

    return '<thread-preview id="' + this.getId() + '" class="' + active + '">' +
            '<img src="' + this.rep.user.picture.thumbnail + '"/>' +
            '<span>' +
                '<strong>' + this.rep.user.getFullName() + '</strong><br/>' +
                '<last-message>' + this.rep.lastMessage + '</last-message>' +
            '</span>' +
        '</thread-preview>';
};


exports = ThreadPreviewCulture;
