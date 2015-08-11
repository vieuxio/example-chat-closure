goog.module('vchat.app');

var ChatRegime = goog.require('vchat.ChatRegime');
var RootCulture = goog.require('vchat.RootCulture');

new RootCulture().render(document.body);

ChatRegime.init();

[].slice.call(document.querySelectorAll('script')).forEach(function(s) {
    s.parentNode.removeChild(s);
});
