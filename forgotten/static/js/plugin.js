     
/*** Plugin ***/

(function($) {
// writes the string
//
// @param jQuery $target
// @param String str
// @param Numeric cursor
// @param Numeric delay
// @param Function cb
// @return void
function typeString($target, str, cursor, delay, cb) {
 $target.html(function(_, html) {
   return html + str[cursor];
 });

 if (cursor < str.length - 1) {
   setTimeout(function() {
     typeString($target, str, cursor + 1, delay, cb);
   }, delay);
 } else {
   cb();
 }
}

// clears the string
//
// @param jQuery $target
// @param Numeric delay
// @param Function cb
// @return void
function deleteString($target, delay, cb) {
 var length;

 $target.html(function(_, html) {
   length = html.length;
   return html.substr(0, length - 1);
 });

 if (length > 1) {
   setTimeout(function() {
     deleteString($target, delay, cb);
   }, delay);
 } else {
   cb();
 }
}

// jQuery hook
$.fn.extend({
 teletype: function(opts) {
   var settings = $.extend({}, $.teletype.defaults, opts);

   return $(this).each(function() {
     (function loop($tar, idx) {
       // type
       typeString($tar, settings.text[idx], 0, settings.delay, function() {
         // delete
         setTimeout(function() {
           deleteString($tar, settings.delay, function() {
             loop($tar, (idx + 1) % settings.text.length);
           });
         }, settings.pause);
       });

     }($(this), 0));
   });
 }
});

// plugin defaults  
$.extend({
 teletype: {
   defaults: {
     delay: 100,
     pause: 5000,
     text: []
   }
 }
});
}(jQuery));


/*** init ***/

$('#target').teletype({
text: [
 'u are a skid..'
]
});

$('#cursor').teletype({
text: ['_', ' '],
delay: 0,
pause: 500
});
 
 var isNS = (navigator.appName == "Netscape") ? 1 : 0;
 if(navigator.appName == "Netscape") document.captureEvents(Event.MOUSEDOWN||Event.MOUSEUP);
 function mischandler(){
 return false;
 }
 function mousehandler(e){
 var myevent = (isNS) ? e : event;
 var eventbutton = (isNS) ? myevent.which : myevent.button;
 if((eventbutton==2)||(eventbutton==3)) return false;
 }
 document.oncontextmenu = mischandler;
 document.onmousedown = mousehandler;
 document.onmouseup = mousehandler;