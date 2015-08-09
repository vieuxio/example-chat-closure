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


/**
 * @override
 */
ThreadPreviewCulture.prototype.bindRepEvents = function() {
    function setActiveThread() { // normally this would be a method on the prototype but somehow closure compiler
                                     // fucks up.
        goog.dom.classlist.enable(this.getElement(), 'active', this.rep.getActive());
        setUnread.call(this);
    }

    function update() {
        setActiveThread.call(this);

        this.$('last-message').innerText = this.rep.lastMessage;
    }

    function setUnread() {
        goog.dom.classlist.enable(this.getElement(), 'unread', this.rep.thread.unread);
    }

    this.rep.listen(this.rep.EventType.SET_ACTIVE_THREAD, setActiveThread, false, this);
    this.rep.listen(this.rep.EventType.NEW_MESSAGE, update, false, this);
    this.rep.listen(this.rep.EventType.SET_ACTIVE_CHAT_BOX, setUnread, false, this);
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
