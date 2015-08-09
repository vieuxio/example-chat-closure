goog.module('vchat.ThreadListCulture');

var Culture = goog.require('vieux.Culture');
var ThreadListRep = goog.require('vchat.ThreadListRep');
var ThreadPreviewCulture = goog.require('vchat.ThreadPreviewCulture');



/**
 *
 * @constructor
 * @extends {Culture}
 */
function ThreadListCulture() {
    this.rep = new ThreadListRep();
    this.threadPreviewsById = {};

    ThreadListCulture.base(this, 'constructor');
}
goog.inherits(ThreadListCulture, Culture);


/**
 * @override
 */
ThreadListCulture.prototype.bindRepEvents = function() {
    this.rep.listen(this.rep.EventType.INITIAL_DATA, this.onInit, false, this);
    this.rep.listen(this.rep.EventType.NEW_MESSAGE, this.onNewMessage, false, this);
};


ThreadListCulture.prototype.onInit = function(e) {
    this.threadPreviewsById = {};
    this.threadPreviews = this.rep.getThreads().map(function(thread) {
        var culture = new ThreadPreviewCulture(thread);
        this.threadPreviewsById[thread.id] = culture;

        return culture;
    }, this);

    this.getElement().innerHTML = this.threadPreviews.map(function(threadPreview) {
        return threadPreview.getPlaceholder();
    }).join('');
};


ThreadListCulture.prototype.onNewMessage = function(e) {
    var list = this.getElement();

    e.data.forEach(function(data) {
        var correspondingThreadPreview = this.threadPreviewsById[data.thread.id];
        if (!correspondingThreadPreview) return;

        list.insertBefore(correspondingThreadPreview.getElement(), list.children[0]);
    }, this);
};


/**
 * @override
 */
ThreadListCulture.prototype.templates_base = function() {
    return '<thread-list id="' + this.getId() + '"></thread-list>';
};


/**
 * @override
 */
ThreadListCulture.prototype.disposeInternal = function() {
    this.threadPreviews.forEach(function(threadPreview) {
        threadPreview.dispose();
    });

    ThreadListCulture.base(this, 'disposeInternal');
};


exports = ThreadListCulture;

