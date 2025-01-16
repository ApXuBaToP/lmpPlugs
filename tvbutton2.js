function log() {
        console.log.apply(console.log, arguments);
      }
log('TVkeys', 'Tv color keys 006 loaded');

function openPanel(element) {
	if ('parseFloat(Lampa.Manifest.app_version)' >= '1.7') {
        log('TVkeys', '1.7.0');
		Lampa.Utils.trigger(document.querySelector(element), 'click');
	} else {
        log('TVkeys', 'old version');
		document.querySelector(element).click();
	}
};

function listenDestroy() {
	document.removeEventListener("keyup", listenTVkeys);
	Lampa.Activity.listener.remove('destroy', listenDestroy);	
};

function startTVkeys() {
	document.addEventListener("keyup", listenTVkeys);
	Lampa.Activity.listener.follow('destroy', listenDestroy);
};

function listenTVkeys(e) {

log('TVkeys', "[DBG] key: " + e.key + ", code: " + e.code);
//Channel Up	
  //if (e.keyCode === 166 || e.keyCode === 427 || e.keyCode === 27 || e.keyCode === 33 || e.keyCode === 402) {
	//openPanel('.player-panel__next.button.selector');
  //}
//Channel Down
  //if (e.keyCode === 167 || e.keyCode === 428 || e.keyCode === 28 || e.keyCode === 34 || e.keyCode === 403) {
	//openPanel('.player-panel__prev.button.selector');
  //}
//0	
  //if (e.keyCode === 48 || e.keyCode === 96 || e.keyCode === 11) {
    //log('Hotkeys', '0 pressed');
    //if (!document.querySelector('body.selectbox--open')) {
	//log('Hotkeys', 'subs list not visible');
	//openPanel('.player-panel__subs.button.selector');
    //} else {
    //  	history.back();
    //}
  }
//5	

Lampa.Listener.follow('activity',startTVkeys);