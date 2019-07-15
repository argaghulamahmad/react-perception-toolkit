(this.webpackJsonp=this.webpackJsonp||[]).push([[4],{51:function(e,t,n){"use strict";function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(s){a=!0,o=s}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}n.r(t);var a=n(14),o=n.n(a),i=n(16),c=n(6),s=n(7);function u(e,t,n){var r=new CustomEvent(e,{bubbles:!0,detail:n});return t.dispatchEvent(r),r}var p=function(){function e(){Object(c.a)(this,e),this.useEvents=!1,this.detectors=new Map}return Object(s.a)(e,[{key:"addDetector",value:function(e){var t=e.name,n=e.supported;if(this.detectors.has(t))throw new Error("".concat(t," already added"));this.detectors.set(t,n)}},{key:"removeDetector",value:function(e){this.detectors.delete(e)}},{key:"detect",value:function(){var t=Object(i.a)(o.a.mark(function t(){var n,a,i,c,s,p,l,d,f,v;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:n={},a=!0,i=!1,c=void 0,t.prev=4,s=this.detectors[Symbol.iterator]();case 6:if(a=(p=s.next()).done){t.next=17;break}return l=p.value,d=r(l,2),f=d[0],v=d[1],t.next=13,v();case 13:n[f]=t.sent;case 14:a=!0,t.next=6;break;case 17:t.next=23;break;case 19:t.prev=19,t.t0=t.catch(4),i=!0,c=t.t0;case 23:t.prev=23,t.prev=24,a||null==s.return||s.return();case 26:if(t.prev=26,!i){t.next=29;break}throw c;case 29:return t.finish(26);case 30:return t.finish(23);case 31:return this.useEvents&&u(e.supportsEvent,self,n),t.abrupt("return",n);case 33:case"end":return t.stop()}},t,this,[[4,19,23,31],[24,,26,30]])}));return function(){return t.apply(this,arguments)}}()}]),e}();p.supportsEvent="supports";var l={name:"getUserMedia",supported:function(){var e=Object(i.a)(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return","mediaDevices"in self.navigator&&"getUserMedia"in self.navigator.mediaDevices);case 1:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()},d={name:"wasm",supported:function(){var e=Object(i.a)(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return","WebAssembly"in self);case 1:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()};var f,v,h="pt.captureframe",w="pt.captureclose",m=function(){function e(){Object(c.a)(this,e),this.captureScale=.5,this.captureRate=0,this.capturePng=!1,this.flipped=!1,this.paused=!1;var t=window.PerceptionToolkit.StreamCapture.layoutRefs;console.log("layoutRefs",t);var n=t.container;this.root=n,this.lastCapture=-1,console.log("StreamCapture",this)}return Object(s.a)(e,[{key:"start",value:function(e){var t=this;if(console.log("startStream"),this.stream)throw new Error("Stream already provided. Stop the capture first.");this.stream=e,this.initElementsIfNecessary();var n=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Number.NEGATIVE_INFINITY,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Number.POSITIVE_INFINITY;return Math.max(t,Math.min(n,e))}(this.captureScale,0),r=this.video,a=function e(r){t.video&&t.ctx&&(t.paused||t.ctx.drawImage(t.video,0,0,t.video.videoWidth*n,t.video.videoHeight*n),0!==t.captureRate&&r-t.lastCapture>t.captureRate&&(t.lastCapture=r,t.captureFrame()),requestAnimationFrame(function(t){return e(t)}))};r.muted=!0,r.srcObject=this.stream,r.play(),r.addEventListener("playing",Object(i.a)(o.a.mark(function e(){var n,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.video&&t.canvas&&t.ctx){e.next=2;break}return e.abrupt("return");case 2:n=5,r=!0;case 4:if(!r){e.next=11;break}return n--,e.next=8,new Promise(function(e){return requestAnimationFrame(e)});case 8:r=n>0&&(0===t.video.videoWidth||0===t.video.videoHeight),e.next=4;break;case 11:if(0!==t.video.videoWidth&&0!==t.video.videoHeight){e.next=13;break}throw new Error("Video has width or height of 0");case 13:t.canvas.width=t.video.videoWidth*t.captureScale,t.canvas.height=t.video.videoHeight*t.captureScale,t.flipped&&(t.ctx.translate(.5*t.canvas.width,0),t.ctx.scale(-1,1),t.ctx.translate(.5*-t.canvas.width,0)),requestAnimationFrame(function(e){a(e),u("pt.capturestarted",t.root)});case 17:case"end":return e.stop()}},e)})),{once:!0})}},{key:"captureFrame",value:function(){var e=Object(i.a)(o.a.mark(function e(){var t=this;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("captureFrame",this),this.ctx&&this.canvas){e.next=3;break}throw new Error("Unable to capture frame");case 3:return e.abrupt("return",new Promise(function(e){var n,r=t.canvas,a=t.ctx;t.capturePng?((n=new Image).src=r.toDataURL("image/png"),n.onload=function(){0!==t.captureRate&&u(h,t.root,{imgData:n}),e(n)}):(n=a.getImageData(0,0,r.width,r.height),0!==t.captureRate&&u(h,t.root,{imgData:n}),e(n))}));case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"stop",value:function(){if(console.log("stopStreamCapture",this),this.stream&&this.ctx&&this.canvas){var e=this.stream.getTracks(),t=!0,n=!1,r=void 0;try{for(var a,o=e[Symbol.iterator]();!(t=(a=o.next()).done);t=!0){a.value.stop()}}catch(i){n=!0,r=i}finally{try{t||null==o.return||o.return()}finally{if(n)throw r}}this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.video=void 0,this.stream=void 0,this.canvas=void 0,this.ctx=void 0,u("pt.capturestopped",this.root)}}},{key:"initElementsIfNecessary",value:function(){if(console.log("initElementsIfNecessary",this.root),this.canvas=document.getElementById("capture-canvas"),this.ctx=this.canvas.getContext("2d"),!this.ctx)throw new Error("Unable to create canvas context");this.video||(this.video=document.getElementById("capture-video"))}}]),e}(),b="pt.markerdetect",x="pt.cameraaccessdenied";function g(e){return new Promise(function(t,n){var r=document.createElement("script");r.src=e,r.onload=t,r.onerror=n,document.head.appendChild(r)})}function k(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:f.INFO,n=arguments.length>2?arguments[2]:void 0;if(!("undefined"===typeof DEBUG||t>DEBUG)){var r=function(e,t){var n="";switch(e){case f.WARNING:n="WARNING";break;case f.ERROR:n="ERROR";break;default:n="INFO"}if(!t)return"".concat(n,":");return"".concat(n," [").concat(t,"]:")}(t,n);switch(t){case f.ERROR:console.error(r,e);break;case f.WARNING:console.warn(r,e);break;default:console.log(r,e)}}}function y(e){return E.apply(this,arguments)}function E(){return(E=Object(i.a)(o.a.mark(function e(t){var n,r,a,i,c,s,u,p,l,d=arguments;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=d.length>1&&void 0!==d[1]?d[1]:{},r=n.context,a=void 0===r?window:r,i=n.forceNewDetector,c=void 0!==i&&i,s=n.polyfillRequired,u=void 0!==s&&s,p=n.polyfillPrefix,l=void 0===p?"":p,!(u||a===window&&!("BarcodeDetector"in a))){e.next=6;break}return k("Using barcode detection polyfill",f.INFO,"BarcodeDetector"),e.next=6,g("".concat(l,"/lib/polyfills/barcode-detector.js"));case 6:if(v&&!c||(v=new a.BarcodeDetector),!("isReady"in v)){e.next=10;break}return e.next=10,v.isReady;case 10:return e.prev=10,e.next=13,v.detect(t);case 13:return e.abrupt("return",e.sent);case 16:if(e.prev=16,e.t0=e.catch(10),!u){e.next=20;break}return e.abrupt("return",[]);case 20:return k("Detection failed: ".concat(e.t0.message),f.WARNING),e.next=23,y(t,{context:a,forceNewDetector:c,polyfillPrefix:l,polyfillRequired:!0});case 23:return e.abrupt("return",e.sent);case 24:case"end":return e.stop()}},e,null,[[10,16]])}))).apply(this,arguments)}function R(e){return O.apply(this,arguments)}function O(){return(O=Object(i.a)(o.a.mark(function e(t){var n;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.filter(function(e){return"videoinput"===e.kind}),e.abrupt("return",n.some(function(e){if(!("getCapabilities"in e))return!1;var t=e.getCapabilities();return!!t.facingMode&&t.facingMode.find(function(e){return"environment"})}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}!function(e){e[e.VERBOSE=4]="VERBOSE",e[e.INFO=3]="INFO",e[e.WARNING=2]="WARNING",e[e.ERROR=1]="ERROR",e[e.NONE=0]="NONE"}(f||(f={})),n.d(t,"closeExperience",function(){return J});var N,D=window.PerceptionToolkit.config,I="pt.devicenotsupported",P=new Map,C=window.PerceptionToolkit.config.root||"",T=y(new ImageData(1,1),{polyfillPrefix:C}),S=new m,j=!1,F=window.PerceptionToolkit.StreamCapture.layoutRefs;console.log("layoutRefs",F);var M,A=F.container;M=f.ERROR,self.DEBUG=M,window.addEventListener(h,function(e){return Y.apply(this,arguments)}),window.addEventListener("offline",_),window.addEventListener("online",_),window.PerceptionToolkit.config=window.PerceptionToolkit.config||{},window.PerceptionToolkit.CapturedContent={detail:null},window.PerceptionToolkit.Events={CameraAccessDenied:x,CaptureClosed:w,CaptureStopped:"pt.capturestopped",DeviceNotSupported:I,MarkerChanges:"pt.markerchanges"},window.PerceptionToolkit.Functions={initializeExperience:function(){return U.apply(this,arguments)},closeExperience:function(){console.log("closeExperience")},callbackFunction:D.callback},window.PerceptionToolkit.config.onload&&window.PerceptionToolkit.config.onload.call(null);var B=new Promise(function(){var e=Object(i.a)(o.a.mark(function e(t){var n,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("deviceSupportTest",void 0),(n=new p).addDetector(l),n.addDetector(d),e.next=6,n.detect();case 6:r=e.sent,console.log("support",r),r[l.name]&&r[d.name]?t(!0):t(!1);case 9:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}());function U(){return(U=Object(i.a)(o.a.mark(function e(){var t,n,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("initializeExperience",this),e.next=3,B;case 3:if(t=e.sent,console.log("supported",t),t){e.next=9;break}return u(I,window).defaultPrevented||alert("Sorry, this browser does not support the required features"),e.abrupt("return");case 9:n=D.detectionMode,r=void 0===n?"passive":n,window.PerceptionToolkit.Functions.closeExperience=J,W(r).then("beginDetection");case 12:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function W(e){return G.apply(this,arguments)}function G(){return(G=Object(i.a)(o.a.mark(function e(t){var n,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.detectionMode,r=void 0===n?"passive":n,console.log("beginDetection",this),e.prev=2,e.next=5,T;case 5:return e.next=7,H(r);case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),k(e.t0.message,f.ERROR,"Begin detection");case 12:case"end":return e.stop()}},e,this,[[2,9]])}))).apply(this,arguments)}var L=function(e){return e&&"[object Function]"==={}.toString.call(e)};function V(e){return q.apply(this,arguments)}function q(){return(q=Object(i.a)(o.a.mark(function e(t){var n,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:console.log("onMarkerFound",t,this),n=t.detail,console.log("barcodeContent",n),r=window.PerceptionToolkit.Functions.callbackFunction,L(r)&&r(n),window.PerceptionToolkit.CapturedContent.detail=n;case 6:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function H(e){return z.apply(this,arguments)}function z(){return(z=Object(i.a)(o.a.mark(function e(t){var n,r,a,c,s;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("createStreamCapture",this),"passive"===t?S.captureRate=600:(console.log("Tap to capture"),S.root.addEventListener("click",Object(i.a)(o.a.mark(function e(){var n;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return S.paused=!0,console.log("Processing..."),e.next=4,S.captureFrame();case 4:n=e.sent,u(h,S,{imgData:n,detectionMode:t});case 6:case"end":return e.stop()}},e)})))),S.root.captureScale=.8,S.root.addEventListener(w,J),S.root.addEventListener(b,V),n={video:{facingMode:"environment"}},e.prev=6,e.next=9,navigator.mediaDevices.getUserMedia(n);case 9:return r=e.sent,e.next=12,navigator.mediaDevices.enumerateDevices();case 12:return a=e.sent,e.next=15,R(a);case 15:c=e.sent,S.flipped=!c,s=!1,window.addEventListener("visibilitychange",Object(i.a)(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!s&&null!==S.parentNode){e.next=2;break}return e.abrupt("return");case 2:if(!document.hidden){e.next=6;break}S.stop(),e.next=15;break;case 6:return s=!0,e.next=9,navigator.mediaDevices.getUserMedia(n);case 9:if(r=e.sent,s=!1,!document.hidden){e.next=13;break}return e.abrupt("return");case 13:S.stop(),S.start(r);case 15:case"end":return e.stop()}},e)}))),S.start(r),N=setTimeout(function(){console.log("Make sure the marker is inside the box.")},D.hintTimeout||5e3),e.next=26;break;case 23:e.prev=23,e.t0=e.catch(6),u(x,window);case 26:case"end":return e.stop()}},e,this,[[6,23]])}))).apply(this,arguments)}function J(){console.log("closeExperience",this),S.stop(),clearTimeout(N)}function Y(){return(Y=Object(i.a)(o.a.mark(function e(t){var n,a,c,s,p,l,d,f,v,h,w,m;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("onCaptureFrame",this),!j){e.next=3;break}return e.abrupt("return");case 3:return j=!0,n=t.target,a=t.detail,c=a.detectionMode,s=a.imgData,console.log("imgData",s),e.next=10,y(s,{polyfillPrefix:C});case 10:p=e.sent,l=!0,d=!1,f=void 0,e.prev=14,v=p[Symbol.iterator]();case 16:if(l=(h=v.next()).done){e.next=26;break}if(w=h.value,m=P.has(w.rawValue),P.set(w.rawValue,self.performance.now()),!m){e.next=22;break}return e.abrupt("continue",23);case 22:u(b,n,w.rawValue);case 23:l=!0,e.next=16;break;case 26:e.next=32;break;case 28:e.prev=28,e.t0=e.catch(14),d=!0,f=e.t0;case 32:e.prev=32,e.prev=33,l||null==v.return||v.return();case 35:if(e.prev=35,!d){e.next=38;break}throw f;case 38:return e.finish(35);case 39:return e.finish(32);case 40:p.length>0?(clearTimeout(N),console.log("Marker length > 0")):c&&"active"===c&&console.log("No markers found"),n.paused=!1,setTimeout(Object(i.a)(o.a.mark(function e(){var t,n,a,i,c,s,u,p,l,d,f;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=self.performance.now(),n=[],a=!0,i=!1,c=void 0,e.prev=5,s=P.entries()[Symbol.iterator]();case 7:if(a=(u=s.next()).done){e.next=18;break}if(p=u.value,l=r(p,2),d=l[0],f=l[1],!(t-f<1e3)){e.next=14;break}return e.abrupt("continue",15);case 14:P.delete(d);case 15:a=!0,e.next=7;break;case 18:e.next=24;break;case 20:e.prev=20,e.t0=e.catch(5),i=!0,c=e.t0;case 24:e.prev=24,e.prev=25,a||null==s.return||s.return();case 27:if(e.prev=27,!i){e.next=30;break}throw c;case 30:return e.finish(27);case 31:return e.finish(24);case 32:return e.next=34,Promise.all(n);case 34:j=!1;case 35:case"end":return e.stop()}},e,null,[[5,20,24,32],[25,,27,31]])})),1e3);case 43:case"end":return e.stop()}},e,this,[[14,28,32,40],[33,,35,39]])}))).apply(this,arguments)}function _(){console.log("onConnectivityChanged",this);var e=navigator.onLine;A&&(e?console.log("Already online."):console.log("Currently offline. Please reconnect to the network."))}}}]);
//# sourceMappingURL=4.56200746.chunk.js.map