+function(a){"use strict";function b(){this._activeZoom=this._initialScrollPosition=this._initialTouchPosition=this._touchMoveListener=null,this._$document=a(document),this._$window=a(window),this._$body=a(document.body),this._boundClick=a.proxy(this._clickHandler,this)}function c(b){this._fullHeight=this._fullWidth=this._overlay=this._targetImageWrap=null,this._targetImage=b,this._$body=a(document.body)}b.prototype.listen=function(){this._$body.on("click",'[data-action="zoom"]',a.proxy(this._zoom,this))},b.prototype._zoom=function(b){var d=b.target;if(d&&"IMG"==d.tagName&&!this._$body.hasClass("zoom-overlay-open"))return b.metaKey||b.ctrlKey?window.open(b.target.getAttribute("data-original")||b.target.src,"_blank"):void(d.width>=a(window).width()-c.OFFSET||(this._activeZoomClose(!0),this._activeZoom=new c(d),this._activeZoom.zoomImage(),this._$window.on("scroll.zoom",a.proxy(this._scrollHandler,this)),this._$document.on("keyup.zoom",a.proxy(this._keyHandler,this)),this._$document.on("touchstart.zoom",a.proxy(this._touchStart,this)),document.addEventListener?document.addEventListener("click",this._boundClick,!0):document.attachEvent("onclick",this._boundClick,!0),"bubbles"in b?b.bubbles&&b.stopPropagation():b.cancelBubble=!0))},b.prototype._activeZoomClose=function(a){this._activeZoom&&(a?this._activeZoom.dispose():this._activeZoom.close(),this._$window.off(".zoom"),this._$document.off(".zoom"),document.removeEventListener("click",this._boundClick,!0),this._activeZoom=null)},b.prototype._scrollHandler=function(b){null===this._initialScrollPosition&&(this._initialScrollPosition=a(window).scrollTop());var c=this._initialScrollPosition-a(window).scrollTop();Math.abs(c)>=40&&this._activeZoomClose()},b.prototype._keyHandler=function(a){27==a.keyCode&&this._activeZoomClose()},b.prototype._clickHandler=function(a){a.preventDefault?a.preventDefault():event.returnValue=!1,"bubbles"in a?a.bubbles&&a.stopPropagation():a.cancelBubble=!0,this._activeZoomClose()},b.prototype._touchStart=function(b){this._initialTouchPosition=b.touches[0].pageY,a(b.target).on("touchmove.zoom",a.proxy(this._touchMove,this))},b.prototype._touchMove=function(b){Math.abs(b.touches[0].pageY-this._initialTouchPosition)>10&&(this._activeZoomClose(),a(b.target).off("touchmove.zoom"))},c.OFFSET=80,c._MAX_WIDTH=2560,c._MAX_HEIGHT=4096,c.prototype.zoomImage=function(){var b=document.createElement("img");b.onload=a.proxy(function(){this._fullHeight=Number(b.height),this._fullWidth=Number(b.width),this._zoomOriginal()},this),b.src=this._targetImage.src},c.prototype._zoomOriginal=function(){this._targetImageWrap=document.createElement("div"),this._targetImageWrap.className="zoom-img-wrap",this._targetImage.parentNode.insertBefore(this._targetImageWrap,this._targetImage),this._targetImageWrap.appendChild(this._targetImage),a(this._targetImage).addClass("zoom-img").attr("data-action","zoom-out"),this._overlay=document.createElement("div"),this._overlay.className="zoom-overlay",document.body.appendChild(this._overlay),this._calculateZoom(),this._triggerAnimation()},c.prototype._calculateZoom=function(){this._targetImage.offsetWidth;var b=this._fullWidth,d=this._fullHeight,f=(a(window).scrollTop(),b/this._targetImage.width),g=a(window).height()-c.OFFSET,h=a(window).width()-c.OFFSET,i=b/d,j=h/g;b<h&&d<g?this._imgScaleFactor=f:i<j?this._imgScaleFactor=g/d*f:this._imgScaleFactor=h/b*f},c.prototype._triggerAnimation=function(){this._targetImage.offsetWidth;var b=a(this._targetImage).offset(),c=a(window).scrollTop(),d=c+a(window).height()/2,e=a(window).width()/2,f=b.top+this._targetImage.height/2,g=b.left+this._targetImage.width/2;this._translateY=d-f,this._translateX=e-g;var h="scale("+this._imgScaleFactor+")",i="translate("+this._translateX+"px, "+this._translateY+"px)";a.support.transition&&(i+=" translateZ(0)"),a(this._targetImage).css({"-webkit-transform":h,"-ms-transform":h,transform:h}),a(this._targetImageWrap).css({"-webkit-transform":i,"-ms-transform":i,transform:i}),this._$body.addClass("zoom-overlay-open")},c.prototype.close=function(){return this._$body.removeClass("zoom-overlay-open").addClass("zoom-overlay-transitioning"),a(this._targetImage).css({"-webkit-transform":"","-ms-transform":"",transform:""}),a(this._targetImageWrap).css({"-webkit-transform":"","-ms-transform":"",transform:""}),a.support.transition?void a(this._targetImage).one(a.support.transition.end,a.proxy(this.dispose,this)).emulateTransitionEnd(300):this.dispose()},c.prototype.dispose=function(){this._targetImageWrap&&this._targetImageWrap.parentNode&&(a(this._targetImage).removeClass("zoom-img").attr("data-action","zoom"),this._targetImageWrap.parentNode.replaceChild(this._targetImage,this._targetImageWrap),this._overlay.parentNode.removeChild(this._overlay),this._$body.removeClass("zoom-overlay-transitioning"))},a(function(){(new b).listen()})}(jQuery);