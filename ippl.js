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
          var _up = lp.up;
          lp.up = function() {if (!Lampa.PlayerPanel.visibleStatus()) Lampa.PlayerPanel.listener.send('playlist'); else _up()}
          lp.patched = true
      }
  }
    Lampa.Controller.listener.follow('toggle', toggleListener);
    //log('Listener started');
  
  })();