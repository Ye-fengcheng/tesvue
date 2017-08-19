!function(o){"use strict";var Z="ht",q=o[Z],$=function(){return document},E=function(){return $().body},W=function(v,K,o){v.style.setProperty(K,o,null)},c=function(Q){return $().createElement(Q)},O=function(){return c("div")},z=function(){var x=c("canvas");return x},D=function(d,e){W(d,"-webkit-transform",e),W(d,"-ms-transform",e),W(d,"transform",e)},v=function(H,P){W(H,"-webkit-transform-origin",P),W(H,"-ms-transform-origin",P),W(H,"transform-origin",P)},e=function(x,d){x.appendChild(d)},L=function(E,d){E.removeChild(d)},m=o.parseInt,g=q.Default,H=g.getInternal(),M=Math.PI,B="white-space",x="visibility",A="left",j="top",N="width",i="height",R="position",Q="display",l="z-index",r="px",C="0 0",y="absolute",F="visible",X="hidden",Y="none",G="block",P="nowrap",S="rgba(0, 0, 0, 0.005)";g.setImage("node_dragger","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAN9JREFUeNrsV9sNhDAMKyzQVdgARmGzrMJNUFZhAh6nfkVcG9PQgHSR8lEksJs6pnGuLCimSRzAa0yyBK9O4gy8GokU+O0kJOAwiQYg0LP1xNYDW3+0CfBYNb7VOuN4LAGpiOaYUhFDas9F2NPHDELNENJqaHgBgSQJ3ufakfQJqckERcOiK+Ae1FGWBNKGh9oX5WPpLpdNYfffijbsxTHh7VKP7388n1g1h7OKUoUuyGpJakQEuhwkZAKcDXVOdWcrOrL/feBVBHI/q8fcjE1nA9PpyHQ+NJ2Qi8A3AQYAOtS27fCoRY0AAAAASUVORK5CYII=");var k=q.graph.GraphView.prototype,w=k._42;k.adjustHtmlNodeIndex=!0,k._42=function(E,s){if(w.call(this,E,s),this.adjustHtmlNodeIndex)for(var j=this.getDataModel()._datas._as,c=j.length,N=1,$=0;c>$;$++){var n=j[$];if(n instanceof b){var C=this.getDataUI(n);W(C.$2f,l,N+""),W(C.$3f,l,N+1+""),N+=2}}};var n=q.HtmlNodeUI=function(p,G){var V=this;n.superClass.constructor.call(V,p,G);var w=V.$2f=O(),Z=V.$3f=z();W(w,R,y),W(w,x,X),W(w,B,P),Z.draggable=!1,W(Z,R,y),W(Z,Q,Y),v(Z,C),w.addEventListener("change",function(k){var a=k.target,n=a.bind||a.getAttribute("bind"),I=a.type&&"checkbox"===a.type?a.checked:a.value,J=G.getContext();n&&J&&(J[n]=I,V.$4f=JSON.stringify(J))}),["mousedown","touchstart","keydown","mousewheel","DOMMouseScroll"].forEach(function(g){w.addEventListener(g,this.$9f.bind(this))},V)};g.def(n,H.ui().NodeUI,{_visible:!0,$11f:function(){var q=this,_=q.$3f,c=q._data,o=c.getDraggerImageWidth(),A=c.getDraggerImageHeight(),b=c.getDraggerImage(),Q=H.initContext(_);Q.beginPath(),H.setCanvas(_,o,A),H.translateAndScale(Q,0,0,1),Q.clearRect(0,0,o,A),g.drawImage(Q,g.getImage(b),0,0,o,A),Q.restore()},_80o:function(o){n.superClass._80o.call(this,o);var f=this,H=f._data,s=H._padding,b=2*s,K=f.$2f,U=f.$3f,J=f.gv,d=J.getZoom(),u=J.getTranslateX(),h=J.getTranslateY(),C=J.getView(),t=f._83o,E=H._width,$=H._height,v=t.position,P=t.rotation,a=(E-b)/H.$5f*d,c=($-b)/H.$6f*d,Z=f._html,T=H._html,w=H.getHtmlType();if("html"===w){var V=H.getContext()||{},g=f.$4f,q=H.$10f,B=JSON.stringify(V);Z&&g&&Z===T&&g===B||(f.$4f=B,f._html=T,K.innerHTML=q?q(V):T)}else if(null!=w){var k=H.getHtml();"ht"===w&&(k=k.getView()),Z&&Z===k&&K.contains(Z)||(f._html=k,K.innerHTML="",e(K,k))}if(!K.parentNode){var z=J.$1f;if(!z){var p=O();W(p,R,y),W(p,l,"0"),z=J.$1f=p;var I=J._canvas.nextSibling;I?C.insertBefore(p,I):e(C,p)}e(z,K),e(z,U),H.onContentInitialized&&H.onContentInitialized(K)}if(H._scalable){var L=H.$5f,_=H.$6f;D(K,"rotate("+180*(P/M)+"deg) scale("+a+","+c+")"),W(K,N,""),W(K,i,""),W(K,A,(v.x-L/d/2)*d+u+r),W(K,j,(v.y-_/d/2)*d+h+r)}else{var gc=m(K.style.width),Dr=m(K.style.height),Ae=m((E-b)*d),Pm=m(($-b)*d),Wo="100%",Yd=K.children[0];W(Yd,N,Wo),W(Yd,i,Wo),(gc!==Ae||Dr!==Pm)&&(W(K,N,Ae+r),W(K,i,Pm+r),"ht"===w&&T.invalidate()),D(K,"rotate("+180*(P/M)+"deg)"),W(K,A,(v.x-Ae/d/2)*d+u+r),W(K,j,(v.y-Pm/d/2)*d+h+r)}var Vb=f.dragRect;J.isMovable(H)&&J.isSelected(H)&&Vb?(o.save(),o.fillStyle=S,o.fillRect(Vb.x,Vb.y,Vb.width,Vb.height),o.restore(),W(U,A,Vb.x*d+u+r),W(U,j,Vb.y*d+h+r),D(U,"scale("+d+","+d+")"),W(U,Q,G),f.$11f()):W(U,Q,Y),W(K,x,this._visible?F:X)},dispose:function(){var x=this.gv.$1f;this.$2f.parentNode===x&&x.removeChild(this.$2f),this.$3f.parentNode===x&&x.removeChild(this.$3f)},_84o:function(v){this._visible=v,W(this.$2f,x,v?F:X),W(this.$3f,Q,v?G:Y)},_3O:function(){var c=this,v=c.gv,L=c._data;n.superClass._3O.call(c);var P=L.getRect();v.isEditable(L)&&(c.dragRect={x:P.x+P.width+L._padding,y:P.y+10,width:L.getDraggerImageWidth(),height:L.getDraggerImageHeight()},c._68o(c.dragRect))},rectIntersects:function(O){var P=this._79o();return q.Default.intersection(P,O)?!0:void 0},$9f:function(u){var F=this.gv,y=this._data;F.sm().contains(y)&&u.stopPropagation()}});var b=q.HtmlNode=function(){b.superClass.constructor.call(this)};q.Default.def(b,q.Node,{ms_ac:["html","context","scalable","padding","draggerImage","draggerImageWidth","draggerImageHeight"],_padding:q.Default.isTouchable?12:6,_image:null,_scalable:!0,_draggerImage:"node_dragger",_draggerImageWidth:20,_draggerImageHeight:20,setHtml:function(N){var x=this,k=x._html;x._html=N,"html"===x.getHtmlType()&&"Handlebars"in o&&(x.$10f=Handlebars.compile(N)),x.$13f(),x.fp("html",k,N)},setContext:function(H){var G=this,r=G._context;G._context=H,G.fp("context",r,H),G.$13f()},setScalable:function(q){var U=this,d=U._scalable;U._scalable=q,U.fp("scalable",d,q),U.$13f()},getHtmlType:function(){var k=this._html;return k?"string"==typeof k?"html":k.getView?"ht":"dom":null},$13f:function(){var A=this,l=A._html,a=A.$10f;if(l){var Q=O(),s=!1,Z=A.getHtmlType();if(W(Q,R,y),W(Q,B,P),W(Q,x,X),"html"===Z?(Q.innerHTML=a?a(A.getContext()||{}):l,s=!0):"ht"===Z?(e(Q,l.getView()),s=!0):"dom"===Z&&(e(Q,l),s=!0),s){var Y=2*A._padding;e(E(),Q),A.$5f=Q.scrollWidth,A.$6f=Q.scrollHeight,A._width=A.$5f+Y,A._height=A.$6f+Y,A._originWidth=A._width,A._originHeight=A._height,L(E(),Q)}}},getUIClass:function(){return q.HtmlNodeUI}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:this,Object);