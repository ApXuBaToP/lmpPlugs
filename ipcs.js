(function () {
  "use strict";
  function log(lgs) {
    var text = lgs;
    console.log.apply(console.log, ['lmpPlugs', '[builtinPlFix]: ' + lgs])
}
  log('Plugin loaded');
  Lampa.Controller._controllers = {};
  var contrList = ['player','player_panel','player_rewind'];

  function toggleListener(ev) {
    if (contrList.includes(ev.name)) setController(ev)
    }

  function setController(ev) {
    log(ev.name + ' intercepted');
    var lp = Lampa.Controller._controllers;
    if (!lp[ev.name] || !lp[ev.name].patched) {
        lp[ev.name] = Lampa.Controller.enabled().controller;
        if (contrList.slice(1).includes(ev.name))  {
            ['play', 'pause', 'playpause'].forEach(function (val) {
                lp[ev.name][val] = lp['player'][val];
                lp[ev.name].patched = true
            })
            log(ev.name + ' patched')
        }
    }
}
  Lampa.Controller.listener.follow('toggle', toggleListener);
  log('Listener started');

})();