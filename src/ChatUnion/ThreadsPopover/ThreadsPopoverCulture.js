goog.module('vchat.ThreadsPopoverCulture');

var classlist = goog.require('goog.dom.classlist');
var Culture = goog.require('vieux.Culture');
var ThreadsPopoverRep = goog.require('vchat.ThreadsPopoverRep');
var ThreadListCulture = goog.require('vchat.ThreadListCulture');
var CultureMinistry = goog.require('vieux.CultureMinistry');



/**
 * @constructor
 * @extends {Culture}
 */
function ThreadsPopoverCulture() {
    this.rep = new ThreadsPopoverRep();

    this.threadList = new ThreadListCulture();

    ThreadsPopoverCulture.base(this, 'constructor');
}
goog.inherits(ThreadsPopoverCulture, Culture);


ThreadsPopoverCulture.prototype.toggle = function() {
    this.rep.toggle();
    classlist.enable(this.getElement(), 'visible', this.rep.visible);
};


ThreadsPopoverCulture.prototype.onClickThreadPreview = function(e) {
    var culture = CultureMinistry.get(e.target.id);

    this.rep.addChatBox(culture.getThread());

    return false;
};


/**
 * @override
 */
ThreadsPopoverCulture.prototype.templates_base = function() {
    var visible = this.rep.visible ? 'visible' : '';

    return '<threads-popover id="' + this.getId() + '" class="' + visible + '">' +
            this.threadList.getPlaceholder() +
        '</threads-popover>';
};


ThreadsPopoverCulture.prototype.events = {
    'click': {
        'thread-preview': ThreadsPopoverCulture.prototype.onClickThreadPreview
    }
};


exports = ThreadsPopoverCulture;
