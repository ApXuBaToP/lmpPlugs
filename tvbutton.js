(function() {
   'use strict';

   // Early return if conditions are not met
   if (!Lampa.Platform.tv() && !Lampa.Storage.get('apx_debug')) return;

   // Logging utility
   function log(message) {
       console.log.apply(console, ['lmpPlugs', '[TvColorKeys]: ' + message]);
   }

   log('TVkeys keys loaded');

   // Template HTML
   var htmlx = `
       <div>
           <div class="simple-button simple-button--filter selector filter--home">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
                   <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
               </svg>
               <span>Home</span>
               <div class="hide"></div>
           </div>
           <div class="simple-button simple-button--filter selector filter--search">
               <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <circle cx="9.9964" cy="9.63489" r="8.43556" stroke="currentColor" stroke-width="2.4"/>
                   <path d="M20.7768 20.4334L18.2135 17.8701" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
               </svg>
               <div class="hide"></div>
           </div>
           <div class="simple-button simple-button--filter selector filter--sort">
               <span>#{filter_sorted}</span>
               <div class="hide"></div>
           </div>
           <div class="simple-button simple-button--filter selector filter--filter">
               <span>#{filter_filtred}</span>
               <div class="hide"></div>
           </div>
       </div>
   `;

   // CSS styles
   var styles = `
       .tfilter_btn_wr {
           border: solid 0.1em;
           border-radius: 0.8em;
           flex-basis: 24%;
       }
       .simple-button.simple-button--filter {
           margin: 0;
           padding: 1em;
           font-size: 1em !important;
           border-radius: 0;
       }
       .torrent-filter {
           display: grid;
           grid-template-columns: 1fr 1fr 1fr 1fr;
           gap: 0px 10px;
           grid-auto-flow: row;
           justify-content: space-between;
           align-content: stretch;
           justify-items: stretch;
           align-items: stretch;
       }
   `;

   // Add template and styles
   Lampa.Template.add('filter', htmlx);
   var styleSheet = document.createElement('style');
   styleSheet.textContent = styles;
   document.head.appendChild(styleSheet);
   log('Templates patched');

   // Constants
   var COLOR_CODES = ['ColorF0Red', 'ColorF1Green', 'ColorF2Yellow', 'ColorF3Blue'];
   var COLORS = ['red', 'green', 'yellow', 'blue'];
   var activeTFilter = null;

   // Event handler for TV keys
   function plugTVkeys(e) {
       if (e.type !== 'start') return;

       var tfilter = document.querySelector('.torrent-filter');
       if (!tfilter) {
           if (activeTFilter) {
               activeTFilter = null;
               document.removeEventListener('keyup', listenTVkeys);
               Lampa.Controller.listener.follow('toggle', reBindRight);
           }
           return;
       }

       if (!tfilter.classList.contains('TVbuttons')) {
           if (tfilter.children.length > 4) {
               tfilter.removeChild(tfilter.firstChild);
           }
           tfilter.children[0].on('hover:enter', function() {
               Lampa.Activity.last();
           });
           wrapEach(tfilter);
           tfilter.classList.add('TVbuttons');
           document.addEventListener('keyup', listenTVkeys);
           Lampa.Controller.listener.follow('toggle', reBindRight);
       }
       activeTFilter = tfilter;
   }

   // Wrap each filter button
   function wrapEach(tfilter) {
       Array.prototype.slice.call(tfilter.children).forEach(function(el, index) {
           var wrapper = document.createElement('div');
           wrapper.className = 'tfilter_btn_wr';
           wrapper.style.borderColor = COLORS[index];
           el.parentNode.insertBefore(wrapper, el);
           wrapper.appendChild(el);
       });
   }

   // Listen for TV key events
   function listenTVkeys(e) {
       var keyIndex = COLOR_CODES.indexOf(e.key);
       if (keyIndex === -1) return;

       var targetButton = activeTFilter.children[keyIndex].firstChild;
       if (targetButton.offsetParent !== null) {
           Lampa.Utils.trigger(targetButton, 'hover:enter');
       }
   }

   // Rebind right controller functionality
   function reBindRight(e) {
       if (e.name === 'content') {
           Lampa.Controller.enabled().controller.right = function() {
               if (Navigator.canmove('right')) {
                   Navigator.move('right');
                   log('reBindRight');
               } else {
                   Lampa.Controller.long();
               }
           };
       }
   }

   // Initialize listener
   Lampa.Listener.follow('activity', plugTVkeys);
   log('Listener started');
})();