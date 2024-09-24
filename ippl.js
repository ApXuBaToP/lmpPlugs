(function () {
    "use strict";
    function log(lgs) {
      var text = lgs;
      console.log.apply(console.log, ['lmpPlugs', '[builtinPlList]: ' + lgs])
  }
    log('Plugin loaded');
    //Lampa.Controller._controllers = {};
    //var contrList = ['player','player_panel','player_rewind'];
  
    function toggleListener(ev) {
      if (ev.name == 'player') setController(ev)
      }
  
    function setController(ev) {
      log(ev.name + ' intercepted');
      var lp = Lampa.Controller.enabled().controller
      //var lp = Lampa.Controller._controllers;
      if (!lp.patched) {
          //lp[ev.name] = Lampa.Controller.enabled().controller;
          lp.up = Lampa.PlayerPanel.listener.send('playlist')
          lp.patched = true
      }
  }
    Lampa.Controller.listener.follow('toggle', toggleListener);
    log('Listener started');
  
  })();