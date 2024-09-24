(function () {
    "use strict";
    function log(lgs) {
      var text = lgs;
      console.log.apply(console.log, ['lmpPlugs', '[builtinPlList]: ' + lgs])
  }
    //log('Plugin loaded');
  
    function toggleListener(ev) {
      if (ev.name == 'player') setController(ev)
      }
  
    function setController(ev) {
      //log(ev.name + ' intercepted');
      var lp = Lampa.Controller.enabled().controller
      if (!lp.patched) {
          lp.up = function() {Lampa.PlayerPanel.listener.send('playlist')}
          lp.patched = true
      }
  }
    Lampa.Controller.listener.follow('toggle', toggleListener);
    //log('Listener started');
  
  })();