goog.module('vchat.app');

var RootCulture = goog.require('vchat.RootCulture');
var ChatRegime = goog.require('vchat.ChatRegime');

new RootCulture().render(document.body);

ChatRegime.init();

[].slice.call(document.querySelectorAll('script')).forEach(function(s) {
    s.parentNode.removeChild(s);
});
