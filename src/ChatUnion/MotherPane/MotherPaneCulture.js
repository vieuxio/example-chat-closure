goog.module('vchat.MotherPaneCulture');

var Culture = goog.require('vieux.Culture');
var MotherPaneRep = goog.require('vchat.MotherPaneRep');
var ThreadListCulture = goog.require('vchat.ThreadListCulture');
var CultureMinistry = goog.require('vieux.CultureMinistry');
var ChatRegime = goog.require('vchat.ChatRegime');
var ChatPaneCulture = goog.require('vchat.ChatPaneCulture');



/**
 *
 * @constructor
 * @extends {Culture}
 */
function MotherPaneCulture() {
    this.rep = new MotherPaneRep();
    this.threadList = new ThreadListCulture();

    MotherPaneCulture.base(this, 'constructor');
}
goog.inherits(MotherPaneCulture, Culture);


/**
 * @override
 */
MotherPaneCulture.prototype.bindRepEvents = function() {
    this.rep.listen(this.rep.EventType.UPDATE, this.onUpdate, false, this);
};


MotherPaneCulture.prototype.onUpdate = function() {
    this.chatPane && this.chatPane.dispose();

    this.chatPane = new ChatPaneCulture(this.rep.getActiveThread());
    this.chatPane.render(this.getElement());
};


MotherPaneCulture.prototype.onClickThreadPreview = function(e) {
    var culture = CultureMinistry.get(e.target.id);

    ChatRegime.setActive(culture.getThread());
};


/**
 * @override
 */
MotherPaneCulture.prototype.templates_base = function() {
    return '<mother-pane id="' + this.getId() + '">' +
        this.threadList.getPlaceholder() +
        '</mother-pane>';
};


/**
 * @override
 */
MotherPaneCulture.prototype.disposeInternal = function() {
    this.chatPane.dispose();
    this.threadList.dispose();
};


MotherPaneCulture.prototype.events = {
    'click': {
        'thread-preview': MotherPaneCulture.prototype.onClickThreadPreview
    }
};


exports = MotherPaneCulture;
