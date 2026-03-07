function Yg(e,t){for(var a=0;a<t.length;a++){const n=t[a];if(typeof n!="string"&&!Array.isArray(n)){for(const i in n)if(i!=="default"&&!(i in e)){const r=Object.getOwnPropertyDescriptor(n,i);r&&Object.defineProperty(e,i,r.get?r:{enumerable:!0,get:()=>n[i]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=a(i);fetch(i.href,r)}})();function vf(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var jf={exports:{}},os={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ig=Symbol.for("react.transitional.element"),qg=Symbol.for("react.fragment");function wf(e,t,a){var n=null;if(a!==void 0&&(n=""+a),t.key!==void 0&&(n=""+t.key),"key"in t){a={};for(var i in t)i!=="key"&&(a[i]=t[i])}else a=t;return t=a.ref,{$$typeof:Ig,type:e,key:n,ref:t!==void 0?t:null,props:a}}os.Fragment=qg;os.jsx=wf;os.jsxs=wf;jf.exports=os;var l=jf.exports,Sf={exports:{}},J={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fc=Symbol.for("react.transitional.element"),Vg=Symbol.for("react.portal"),Xg=Symbol.for("react.fragment"),Wg=Symbol.for("react.strict_mode"),Qg=Symbol.for("react.profiler"),Fg=Symbol.for("react.consumer"),Zg=Symbol.for("react.context"),$g=Symbol.for("react.forward_ref"),Kg=Symbol.for("react.suspense"),Jg=Symbol.for("react.memo"),Cf=Symbol.for("react.lazy"),Pg=Symbol.for("react.activity"),su=Symbol.iterator;function em(e){return e===null||typeof e!="object"?null:(e=su&&e[su]||e["@@iterator"],typeof e=="function"?e:null)}var zf={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Nf=Object.assign,kf={};function ul(e,t,a){this.props=e,this.context=t,this.refs=kf,this.updater=a||zf}ul.prototype.isReactComponent={};ul.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};ul.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ef(){}Ef.prototype=ul.prototype;function Zc(e,t,a){this.props=e,this.context=t,this.refs=kf,this.updater=a||zf}var $c=Zc.prototype=new Ef;$c.constructor=Zc;Nf($c,ul.prototype);$c.isPureReactComponent=!0;var ou=Array.isArray;function Yo(){}var we={H:null,A:null,T:null,S:null},Tf=Object.prototype.hasOwnProperty;function Kc(e,t,a){var n=a.ref;return{$$typeof:Fc,type:e,key:t,ref:n!==void 0?n:null,props:a}}function tm(e,t){return Kc(e.type,t,e.props)}function Jc(e){return typeof e=="object"&&e!==null&&e.$$typeof===Fc}function am(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(a){return t[a]})}var cu=/\/+/g;function Vs(e,t){return typeof e=="object"&&e!==null&&e.key!=null?am(""+e.key):t.toString(36)}function nm(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(Yo,Yo):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function Rn(e,t,a,n,i){var r=typeof e;(r==="undefined"||r==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(r){case"bigint":case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case Fc:case Vg:s=!0;break;case Cf:return s=e._init,Rn(s(e._payload),t,a,n,i)}}if(s)return i=i(e),s=n===""?"."+Vs(e,0):n,ou(i)?(a="",s!=null&&(a=s.replace(cu,"$&/")+"/"),Rn(i,t,a,"",function(d){return d})):i!=null&&(Jc(i)&&(i=tm(i,a+(i.key==null||e&&e.key===i.key?"":(""+i.key).replace(cu,"$&/")+"/")+s)),t.push(i)),1;s=0;var o=n===""?".":n+":";if(ou(e))for(var c=0;c<e.length;c++)n=e[c],r=o+Vs(n,c),s+=Rn(n,t,a,r,i);else if(c=em(e),typeof c=="function")for(e=c.call(e),c=0;!(n=e.next()).done;)n=n.value,r=o+Vs(n,c++),s+=Rn(n,t,a,r,i);else if(r==="object"){if(typeof e.then=="function")return Rn(nm(e),t,a,n,i);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return s}function Li(e,t,a){if(e==null)return e;var n=[],i=0;return Rn(e,n,"","",function(r){return t.call(a,r,i++)}),n}function lm(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(a){(e._status===0||e._status===-1)&&(e._status=1,e._result=a)},function(a){(e._status===0||e._status===-1)&&(e._status=2,e._result=a)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var du=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},im={map:Li,forEach:function(e,t,a){Li(e,function(){t.apply(this,arguments)},a)},count:function(e){var t=0;return Li(e,function(){t++}),t},toArray:function(e){return Li(e,function(t){return t})||[]},only:function(e){if(!Jc(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};J.Activity=Pg;J.Children=im;J.Component=ul;J.Fragment=Xg;J.Profiler=Qg;J.PureComponent=Zc;J.StrictMode=Wg;J.Suspense=Kg;J.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=we;J.__COMPILER_RUNTIME={__proto__:null,c:function(e){return we.H.useMemoCache(e)}};J.cache=function(e){return function(){return e.apply(null,arguments)}};J.cacheSignal=function(){return null};J.cloneElement=function(e,t,a){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var n=Nf({},e.props),i=e.key;if(t!=null)for(r in t.key!==void 0&&(i=""+t.key),t)!Tf.call(t,r)||r==="key"||r==="__self"||r==="__source"||r==="ref"&&t.ref===void 0||(n[r]=t[r]);var r=arguments.length-2;if(r===1)n.children=a;else if(1<r){for(var s=Array(r),o=0;o<r;o++)s[o]=arguments[o+2];n.children=s}return Kc(e.type,i,n)};J.createContext=function(e){return e={$$typeof:Zg,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:Fg,_context:e},e};J.createElement=function(e,t,a){var n,i={},r=null;if(t!=null)for(n in t.key!==void 0&&(r=""+t.key),t)Tf.call(t,n)&&n!=="key"&&n!=="__self"&&n!=="__source"&&(i[n]=t[n]);var s=arguments.length-2;if(s===1)i.children=a;else if(1<s){for(var o=Array(s),c=0;c<s;c++)o[c]=arguments[c+2];i.children=o}if(e&&e.defaultProps)for(n in s=e.defaultProps,s)i[n]===void 0&&(i[n]=s[n]);return Kc(e,r,i)};J.createRef=function(){return{current:null}};J.forwardRef=function(e){return{$$typeof:$g,render:e}};J.isValidElement=Jc;J.lazy=function(e){return{$$typeof:Cf,_payload:{_status:-1,_result:e},_init:lm}};J.memo=function(e,t){return{$$typeof:Jg,type:e,compare:t===void 0?null:t}};J.startTransition=function(e){var t=we.T,a={};we.T=a;try{var n=e(),i=we.S;i!==null&&i(a,n),typeof n=="object"&&n!==null&&typeof n.then=="function"&&n.then(Yo,du)}catch(r){du(r)}finally{t!==null&&a.types!==null&&(t.types=a.types),we.T=t}};J.unstable_useCacheRefresh=function(){return we.H.useCacheRefresh()};J.use=function(e){return we.H.use(e)};J.useActionState=function(e,t,a){return we.H.useActionState(e,t,a)};J.useCallback=function(e,t){return we.H.useCallback(e,t)};J.useContext=function(e){return we.H.useContext(e)};J.useDebugValue=function(){};J.useDeferredValue=function(e,t){return we.H.useDeferredValue(e,t)};J.useEffect=function(e,t){return we.H.useEffect(e,t)};J.useEffectEvent=function(e){return we.H.useEffectEvent(e)};J.useId=function(){return we.H.useId()};J.useImperativeHandle=function(e,t,a){return we.H.useImperativeHandle(e,t,a)};J.useInsertionEffect=function(e,t){return we.H.useInsertionEffect(e,t)};J.useLayoutEffect=function(e,t){return we.H.useLayoutEffect(e,t)};J.useMemo=function(e,t){return we.H.useMemo(e,t)};J.useOptimistic=function(e,t){return we.H.useOptimistic(e,t)};J.useReducer=function(e,t,a){return we.H.useReducer(e,t,a)};J.useRef=function(e){return we.H.useRef(e)};J.useState=function(e){return we.H.useState(e)};J.useSyncExternalStore=function(e,t,a){return we.H.useSyncExternalStore(e,t,a)};J.useTransition=function(){return we.H.useTransition()};J.version="19.2.1";Sf.exports=J;var b=Sf.exports;const Vt=vf(b),rm=Yg({__proto__:null,default:Vt},[b]);var Af={exports:{}},cs={},Rf={exports:{}},Bf={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(L,q){var U=L.length;L.push(q);e:for(;0<U;){var ae=U-1>>>1,A=L[ae];if(0<i(A,q))L[ae]=q,L[U]=A,U=ae;else break e}}function a(L){return L.length===0?null:L[0]}function n(L){if(L.length===0)return null;var q=L[0],U=L.pop();if(U!==q){L[0]=U;e:for(var ae=0,A=L.length,H=A>>>1;ae<H;){var K=2*(ae+1)-1,Ce=L[K],at=K+1,$t=L[at];if(0>i(Ce,U))at<A&&0>i($t,Ce)?(L[ae]=$t,L[at]=U,ae=at):(L[ae]=Ce,L[K]=U,ae=K);else if(at<A&&0>i($t,U))L[ae]=$t,L[at]=U,ae=at;else break e}}return q}function i(L,q){var U=L.sortIndex-q.sortIndex;return U!==0?U:L.id-q.id}if(e.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var r=performance;e.unstable_now=function(){return r.now()}}else{var s=Date,o=s.now();e.unstable_now=function(){return s.now()-o}}var c=[],d=[],p=1,f=null,u=3,x=!1,m=!1,j=!1,w=!1,h=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;function y(L){for(var q=a(d);q!==null;){if(q.callback===null)n(d);else if(q.startTime<=L)n(d),q.sortIndex=q.expirationTime,t(c,q);else break;q=a(d)}}function k(L){if(j=!1,y(L),!m)if(a(c)!==null)m=!0,G||(G=!0,R());else{var q=a(d);q!==null&&P(k,q.startTime-L)}}var G=!1,C=-1,T=5,O=-1;function E(){return w?!0:!(e.unstable_now()-O<T)}function Q(){if(w=!1,G){var L=e.unstable_now();O=L;var q=!0;try{e:{m=!1,j&&(j=!1,g(C),C=-1),x=!0;var U=u;try{t:{for(y(L),f=a(c);f!==null&&!(f.expirationTime>L&&E());){var ae=f.callback;if(typeof ae=="function"){f.callback=null,u=f.priorityLevel;var A=ae(f.expirationTime<=L);if(L=e.unstable_now(),typeof A=="function"){f.callback=A,y(L),q=!0;break t}f===a(c)&&n(c),y(L)}else n(c);f=a(c)}if(f!==null)q=!0;else{var H=a(d);H!==null&&P(k,H.startTime-L),q=!1}}break e}finally{f=null,u=U,x=!1}q=void 0}}finally{q?R():G=!1}}}var R;if(typeof v=="function")R=function(){v(Q)};else if(typeof MessageChannel<"u"){var I=new MessageChannel,F=I.port2;I.port1.onmessage=Q,R=function(){F.postMessage(null)}}else R=function(){h(Q,0)};function P(L,q){C=h(function(){L(e.unstable_now())},q)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(L){L.callback=null},e.unstable_forceFrameRate=function(L){0>L||125<L?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<L?Math.floor(1e3/L):5},e.unstable_getCurrentPriorityLevel=function(){return u},e.unstable_next=function(L){switch(u){case 1:case 2:case 3:var q=3;break;default:q=u}var U=u;u=q;try{return L()}finally{u=U}},e.unstable_requestPaint=function(){w=!0},e.unstable_runWithPriority=function(L,q){switch(L){case 1:case 2:case 3:case 4:case 5:break;default:L=3}var U=u;u=L;try{return q()}finally{u=U}},e.unstable_scheduleCallback=function(L,q,U){var ae=e.unstable_now();switch(typeof U=="object"&&U!==null?(U=U.delay,U=typeof U=="number"&&0<U?ae+U:ae):U=ae,L){case 1:var A=-1;break;case 2:A=250;break;case 5:A=1073741823;break;case 4:A=1e4;break;default:A=5e3}return A=U+A,L={id:p++,callback:q,priorityLevel:L,startTime:U,expirationTime:A,sortIndex:-1},U>ae?(L.sortIndex=U,t(d,L),a(c)===null&&L===a(d)&&(j?(g(C),C=-1):j=!0,P(k,U-ae))):(L.sortIndex=A,t(c,L),m||x||(m=!0,G||(G=!0,R()))),L},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(L){var q=u;return function(){var U=u;u=q;try{return L.apply(this,arguments)}finally{u=U}}}})(Bf);Rf.exports=Bf;var sm=Rf.exports,Of={exports:{}},tt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var om=b;function Df(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function ya(){}var Je={d:{f:ya,r:function(){throw Error(Df(522))},D:ya,C:ya,L:ya,m:ya,X:ya,S:ya,M:ya},p:0,findDOMNode:null},cm=Symbol.for("react.portal");function dm(e,t,a){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:cm,key:n==null?null:""+n,children:e,containerInfo:t,implementation:a}}var Gl=om.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function ds(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}tt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Je;tt.createPortal=function(e,t){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(Df(299));return dm(e,t,null,a)};tt.flushSync=function(e){var t=Gl.T,a=Je.p;try{if(Gl.T=null,Je.p=2,e)return e()}finally{Gl.T=t,Je.p=a,Je.d.f()}};tt.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,Je.d.C(e,t))};tt.prefetchDNS=function(e){typeof e=="string"&&Je.d.D(e)};tt.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var a=t.as,n=ds(a,t.crossOrigin),i=typeof t.integrity=="string"?t.integrity:void 0,r=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;a==="style"?Je.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:n,integrity:i,fetchPriority:r}):a==="script"&&Je.d.X(e,{crossOrigin:n,integrity:i,fetchPriority:r,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};tt.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var a=ds(t.as,t.crossOrigin);Je.d.M(e,{crossOrigin:a,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&Je.d.M(e)};tt.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var a=t.as,n=ds(a,t.crossOrigin);Je.d.L(e,a,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};tt.preloadModule=function(e,t){if(typeof e=="string")if(t){var a=ds(t.as,t.crossOrigin);Je.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:a,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else Je.d.m(e)};tt.requestFormReset=function(e){Je.d.r(e)};tt.unstable_batchedUpdates=function(e,t){return e(t)};tt.useFormState=function(e,t,a){return Gl.H.useFormState(e,t,a)};tt.useFormStatus=function(){return Gl.H.useHostTransitionStatus()};tt.version="19.2.1";function Mf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Mf)}catch(e){console.error(e)}}Mf(),Of.exports=tt;var um=Of.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var He=sm,Lf=b,pm=um;function D(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Uf(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function yi(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function Hf(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function _f(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function uu(e){if(yi(e)!==e)throw Error(D(188))}function fm(e){var t=e.alternate;if(!t){if(t=yi(e),t===null)throw Error(D(188));return t!==e?null:e}for(var a=e,n=t;;){var i=a.return;if(i===null)break;var r=i.alternate;if(r===null){if(n=i.return,n!==null){a=n;continue}break}if(i.child===r.child){for(r=i.child;r;){if(r===a)return uu(i),e;if(r===n)return uu(i),t;r=r.sibling}throw Error(D(188))}if(a.return!==n.return)a=i,n=r;else{for(var s=!1,o=i.child;o;){if(o===a){s=!0,a=i,n=r;break}if(o===n){s=!0,n=i,a=r;break}o=o.sibling}if(!s){for(o=r.child;o;){if(o===a){s=!0,a=r,n=i;break}if(o===n){s=!0,n=r,a=i;break}o=o.sibling}if(!s)throw Error(D(189))}}if(a.alternate!==n)throw Error(D(190))}if(a.tag!==3)throw Error(D(188));return a.stateNode.current===a?e:t}function Gf(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=Gf(e),t!==null)return t;e=e.sibling}return null}var Se=Object.assign,hm=Symbol.for("react.element"),Ui=Symbol.for("react.transitional.element"),Dl=Symbol.for("react.portal"),Dn=Symbol.for("react.fragment"),Yf=Symbol.for("react.strict_mode"),Io=Symbol.for("react.profiler"),If=Symbol.for("react.consumer"),la=Symbol.for("react.context"),Pc=Symbol.for("react.forward_ref"),qo=Symbol.for("react.suspense"),Vo=Symbol.for("react.suspense_list"),ed=Symbol.for("react.memo"),va=Symbol.for("react.lazy"),Xo=Symbol.for("react.activity"),xm=Symbol.for("react.memo_cache_sentinel"),pu=Symbol.iterator;function Cl(e){return e===null||typeof e!="object"?null:(e=pu&&e[pu]||e["@@iterator"],typeof e=="function"?e:null)}var gm=Symbol.for("react.client.reference");function Wo(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===gm?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Dn:return"Fragment";case Io:return"Profiler";case Yf:return"StrictMode";case qo:return"Suspense";case Vo:return"SuspenseList";case Xo:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case Dl:return"Portal";case la:return e.displayName||"Context";case If:return(e._context.displayName||"Context")+".Consumer";case Pc:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ed:return t=e.displayName||null,t!==null?t:Wo(e.type)||"Memo";case va:t=e._payload,e=e._init;try{return Wo(e(t))}catch{}}return null}var Ml=Array.isArray,$=Lf.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ce=pm.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,sn={pending:!1,data:null,method:null,action:null},Qo=[],Mn=-1;function Qt(e){return{current:e}}function Ye(e){0>Mn||(e.current=Qo[Mn],Qo[Mn]=null,Mn--)}function be(e,t){Mn++,Qo[Mn]=e.current,e.current=t}var Xt=Qt(null),ai=Qt(null),Ba=Qt(null),Nr=Qt(null);function kr(e,t){switch(be(Ba,t),be(ai,e),be(Xt,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?bp(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=bp(t),e=ox(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}Ye(Xt),be(Xt,e)}function Pn(){Ye(Xt),Ye(ai),Ye(Ba)}function Fo(e){e.memoizedState!==null&&be(Nr,e);var t=Xt.current,a=ox(t,e.type);t!==a&&(be(ai,e),be(Xt,a))}function Er(e){ai.current===e&&(Ye(Xt),Ye(ai)),Nr.current===e&&(Ye(Nr),fi._currentValue=sn)}var Xs,fu;function en(e){if(Xs===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);Xs=t&&t[1]||"",fu=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Xs+e+fu}var Ws=!1;function Qs(e,t){if(!e||Ws)return"";Ws=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var n={DetermineComponentFrameRoot:function(){try{if(t){var f=function(){throw Error()};if(Object.defineProperty(f.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(f,[])}catch(x){var u=x}Reflect.construct(e,[],f)}else{try{f.call()}catch(x){u=x}e.call(f.prototype)}}else{try{throw Error()}catch(x){u=x}(f=e())&&typeof f.catch=="function"&&f.catch(function(){})}}catch(x){if(x&&u&&typeof x.stack=="string")return[x.stack,u.stack]}return[null,null]}};n.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var i=Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot,"name");i&&i.configurable&&Object.defineProperty(n.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var r=n.DetermineComponentFrameRoot(),s=r[0],o=r[1];if(s&&o){var c=s.split(`
`),d=o.split(`
`);for(i=n=0;n<c.length&&!c[n].includes("DetermineComponentFrameRoot");)n++;for(;i<d.length&&!d[i].includes("DetermineComponentFrameRoot");)i++;if(n===c.length||i===d.length)for(n=c.length-1,i=d.length-1;1<=n&&0<=i&&c[n]!==d[i];)i--;for(;1<=n&&0<=i;n--,i--)if(c[n]!==d[i]){if(n!==1||i!==1)do if(n--,i--,0>i||c[n]!==d[i]){var p=`
`+c[n].replace(" at new "," at ");return e.displayName&&p.includes("<anonymous>")&&(p=p.replace("<anonymous>",e.displayName)),p}while(1<=n&&0<=i);break}}}finally{Ws=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?en(a):""}function mm(e,t){switch(e.tag){case 26:case 27:case 5:return en(e.type);case 16:return en("Lazy");case 13:return e.child!==t&&t!==null?en("Suspense Fallback"):en("Suspense");case 19:return en("SuspenseList");case 0:case 15:return Qs(e.type,!1);case 11:return Qs(e.type.render,!1);case 1:return Qs(e.type,!0);case 31:return en("Activity");default:return""}}function hu(e){try{var t="",a=null;do t+=mm(e,a),a=e,e=e.return;while(e);return t}catch(n){return`
Error generating stack: `+n.message+`
`+n.stack}}var Zo=Object.prototype.hasOwnProperty,td=He.unstable_scheduleCallback,Fs=He.unstable_cancelCallback,bm=He.unstable_shouldYield,ym=He.unstable_requestPaint,mt=He.unstable_now,vm=He.unstable_getCurrentPriorityLevel,qf=He.unstable_ImmediatePriority,Vf=He.unstable_UserBlockingPriority,Tr=He.unstable_NormalPriority,jm=He.unstable_LowPriority,Xf=He.unstable_IdlePriority,wm=He.log,Sm=He.unstable_setDisableYieldValue,vi=null,bt=null;function Na(e){if(typeof wm=="function"&&Sm(e),bt&&typeof bt.setStrictMode=="function")try{bt.setStrictMode(vi,e)}catch{}}var yt=Math.clz32?Math.clz32:Nm,Cm=Math.log,zm=Math.LN2;function Nm(e){return e>>>=0,e===0?32:31-(Cm(e)/zm|0)|0}var Hi=256,_i=262144,Gi=4194304;function tn(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function us(e,t,a){var n=e.pendingLanes;if(n===0)return 0;var i=0,r=e.suspendedLanes,s=e.pingedLanes;e=e.warmLanes;var o=n&134217727;return o!==0?(n=o&~r,n!==0?i=tn(n):(s&=o,s!==0?i=tn(s):a||(a=o&~e,a!==0&&(i=tn(a))))):(o=n&~r,o!==0?i=tn(o):s!==0?i=tn(s):a||(a=n&~e,a!==0&&(i=tn(a)))),i===0?0:t!==0&&t!==i&&!(t&r)&&(r=i&-i,a=t&-t,r>=a||r===32&&(a&4194048)!==0)?t:i}function ji(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function km(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Wf(){var e=Gi;return Gi<<=1,!(Gi&62914560)&&(Gi=4194304),e}function Zs(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function wi(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Em(e,t,a,n,i,r){var s=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var o=e.entanglements,c=e.expirationTimes,d=e.hiddenUpdates;for(a=s&~a;0<a;){var p=31-yt(a),f=1<<p;o[p]=0,c[p]=-1;var u=d[p];if(u!==null)for(d[p]=null,p=0;p<u.length;p++){var x=u[p];x!==null&&(x.lane&=-536870913)}a&=~f}n!==0&&Qf(e,n,0),r!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=r&~(s&~t))}function Qf(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var n=31-yt(t);e.entangledLanes|=t,e.entanglements[n]=e.entanglements[n]|1073741824|a&261930}function Ff(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var n=31-yt(a),i=1<<n;i&t|e[n]&t&&(e[n]|=t),a&=~i}}function Zf(e,t){var a=t&-t;return a=a&42?1:ad(a),a&(e.suspendedLanes|t)?0:a}function ad(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function nd(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function $f(){var e=ce.p;return e!==0?e:(e=window.event,e===void 0?32:yx(e.type))}function xu(e,t){var a=ce.p;try{return ce.p=e,t()}finally{ce.p=a}}var Za=Math.random().toString(36).slice(2),Ve="__reactFiber$"+Za,ut="__reactProps$"+Za,pl="__reactContainer$"+Za,$o="__reactEvents$"+Za,Tm="__reactListeners$"+Za,Am="__reactHandles$"+Za,gu="__reactResources$"+Za,Si="__reactMarker$"+Za;function ld(e){delete e[Ve],delete e[ut],delete e[$o],delete e[Tm],delete e[Am]}function Ln(e){var t=e[Ve];if(t)return t;for(var a=e.parentNode;a;){if(t=a[pl]||a[Ve]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=Sp(e);e!==null;){if(a=e[Ve])return a;e=Sp(e)}return t}e=a,a=e.parentNode}return null}function fl(e){if(e=e[Ve]||e[pl]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Ll(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(D(33))}function Wn(e){var t=e[gu];return t||(t=e[gu]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Ge(e){e[Si]=!0}var Kf=new Set,Jf={};function Sn(e,t){el(e,t),el(e+"Capture",t)}function el(e,t){for(Jf[e]=t,e=0;e<t.length;e++)Kf.add(t[e])}var Rm=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),mu={},bu={};function Bm(e){return Zo.call(bu,e)?!0:Zo.call(mu,e)?!1:Rm.test(e)?bu[e]=!0:(mu[e]=!0,!1)}function lr(e,t,a){if(Bm(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var n=t.toLowerCase().slice(0,5);if(n!=="data-"&&n!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function Yi(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function Kt(e,t,a,n){if(n===null)e.removeAttribute(a);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+n)}}function zt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Pf(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Om(e,t,a){var n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,r=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(s){a=""+s,r.call(this,s)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return a},setValue:function(s){a=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ko(e){if(!e._valueTracker){var t=Pf(e)?"checked":"value";e._valueTracker=Om(e,t,""+e[t])}}function eh(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),n="";return e&&(n=Pf(e)?e.checked?"true":"false":e.value),e=n,e!==a?(t.setValue(e),!0):!1}function Ar(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Dm=/[\n"\\]/g;function Et(e){return e.replace(Dm,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Jo(e,t,a,n,i,r,s,o){e.name="",s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"?e.type=s:e.removeAttribute("type"),t!=null?s==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+zt(t)):e.value!==""+zt(t)&&(e.value=""+zt(t)):s!=="submit"&&s!=="reset"||e.removeAttribute("value"),t!=null?Po(e,s,zt(t)):a!=null?Po(e,s,zt(a)):n!=null&&e.removeAttribute("value"),i==null&&r!=null&&(e.defaultChecked=!!r),i!=null&&(e.checked=i&&typeof i!="function"&&typeof i!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+zt(o):e.removeAttribute("name")}function th(e,t,a,n,i,r,s,o){if(r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.type=r),t!=null||a!=null){if(!(r!=="submit"&&r!=="reset"||t!=null)){Ko(e);return}a=a!=null?""+zt(a):"",t=t!=null?""+zt(t):a,o||t===e.value||(e.value=t),e.defaultValue=t}n=n??i,n=typeof n!="function"&&typeof n!="symbol"&&!!n,e.checked=o?e.checked:!!n,e.defaultChecked=!!n,s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.name=s),Ko(e)}function Po(e,t,a){t==="number"&&Ar(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function Qn(e,t,a,n){if(e=e.options,t){t={};for(var i=0;i<a.length;i++)t["$"+a[i]]=!0;for(a=0;a<e.length;a++)i=t.hasOwnProperty("$"+e[a].value),e[a].selected!==i&&(e[a].selected=i),i&&n&&(e[a].defaultSelected=!0)}else{for(a=""+zt(a),t=null,i=0;i<e.length;i++){if(e[i].value===a){e[i].selected=!0,n&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function ah(e,t,a){if(t!=null&&(t=""+zt(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+zt(a):""}function nh(e,t,a,n){if(t==null){if(n!=null){if(a!=null)throw Error(D(92));if(Ml(n)){if(1<n.length)throw Error(D(93));n=n[0]}a=n}a==null&&(a=""),t=a}a=zt(t),e.defaultValue=a,n=e.textContent,n===a&&n!==""&&n!==null&&(e.value=n),Ko(e)}function tl(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var Mm=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function yu(e,t,a){var n=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?n?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":n?e.setProperty(t,a):typeof a!="number"||a===0||Mm.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function lh(e,t,a){if(t!=null&&typeof t!="object")throw Error(D(62));if(e=e.style,a!=null){for(var n in a)!a.hasOwnProperty(n)||t!=null&&t.hasOwnProperty(n)||(n.indexOf("--")===0?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="");for(var i in t)n=t[i],t.hasOwnProperty(i)&&a[i]!==n&&yu(e,i,n)}else for(var r in t)t.hasOwnProperty(r)&&yu(e,r,t[r])}function id(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Lm=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Um=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ir(e){return Um.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function ia(){}var ec=null;function rd(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Un=null,Fn=null;function vu(e){var t=fl(e);if(t&&(e=t.stateNode)){var a=e[ut]||null;e:switch(e=t.stateNode,t.type){case"input":if(Jo(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Et(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var n=a[t];if(n!==e&&n.form===e.form){var i=n[ut]||null;if(!i)throw Error(D(90));Jo(n,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name)}}for(t=0;t<a.length;t++)n=a[t],n.form===e.form&&eh(n)}break e;case"textarea":ah(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&Qn(e,!!a.multiple,t,!1)}}}var $s=!1;function ih(e,t,a){if($s)return e(t,a);$s=!0;try{var n=e(t);return n}finally{if($s=!1,(Un!==null||Fn!==null)&&(Ss(),Un&&(t=Un,e=Fn,Fn=Un=null,vu(t),e)))for(t=0;t<e.length;t++)vu(e[t])}}function ni(e,t){var a=e.stateNode;if(a===null)return null;var n=a[ut]||null;if(n===null)return null;a=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(D(231,t,typeof a));return a}var ua=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),tc=!1;if(ua)try{var zl={};Object.defineProperty(zl,"passive",{get:function(){tc=!0}}),window.addEventListener("test",zl,zl),window.removeEventListener("test",zl,zl)}catch{tc=!1}var ka=null,sd=null,rr=null;function rh(){if(rr)return rr;var e,t=sd,a=t.length,n,i="value"in ka?ka.value:ka.textContent,r=i.length;for(e=0;e<a&&t[e]===i[e];e++);var s=a-e;for(n=1;n<=s&&t[a-n]===i[r-n];n++);return rr=i.slice(e,1<n?1-n:void 0)}function sr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ii(){return!0}function ju(){return!1}function pt(e){function t(a,n,i,r,s){this._reactName=a,this._targetInst=i,this.type=n,this.nativeEvent=r,this.target=s,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(a=e[o],this[o]=a?a(r):r[o]);return this.isDefaultPrevented=(r.defaultPrevented!=null?r.defaultPrevented:r.returnValue===!1)?Ii:ju,this.isPropagationStopped=ju,this}return Se(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Ii)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Ii)},persist:function(){},isPersistent:Ii}),t}var Cn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ps=pt(Cn),Ci=Se({},Cn,{view:0,detail:0}),Hm=pt(Ci),Ks,Js,Nl,fs=Se({},Ci,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:od,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Nl&&(Nl&&e.type==="mousemove"?(Ks=e.screenX-Nl.screenX,Js=e.screenY-Nl.screenY):Js=Ks=0,Nl=e),Ks)},movementY:function(e){return"movementY"in e?e.movementY:Js}}),wu=pt(fs),_m=Se({},fs,{dataTransfer:0}),Gm=pt(_m),Ym=Se({},Ci,{relatedTarget:0}),Ps=pt(Ym),Im=Se({},Cn,{animationName:0,elapsedTime:0,pseudoElement:0}),qm=pt(Im),Vm=Se({},Cn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Xm=pt(Vm),Wm=Se({},Cn,{data:0}),Su=pt(Wm),Qm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Fm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Zm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function $m(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Zm[e])?!!t[e]:!1}function od(){return $m}var Km=Se({},Ci,{key:function(e){if(e.key){var t=Qm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=sr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Fm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:od,charCode:function(e){return e.type==="keypress"?sr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?sr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Jm=pt(Km),Pm=Se({},fs,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Cu=pt(Pm),e1=Se({},Ci,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:od}),t1=pt(e1),a1=Se({},Cn,{propertyName:0,elapsedTime:0,pseudoElement:0}),n1=pt(a1),l1=Se({},fs,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),i1=pt(l1),r1=Se({},Cn,{newState:0,oldState:0}),s1=pt(r1),o1=[9,13,27,32],cd=ua&&"CompositionEvent"in window,Yl=null;ua&&"documentMode"in document&&(Yl=document.documentMode);var c1=ua&&"TextEvent"in window&&!Yl,sh=ua&&(!cd||Yl&&8<Yl&&11>=Yl),zu=" ",Nu=!1;function oh(e,t){switch(e){case"keyup":return o1.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ch(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Hn=!1;function d1(e,t){switch(e){case"compositionend":return ch(t);case"keypress":return t.which!==32?null:(Nu=!0,zu);case"textInput":return e=t.data,e===zu&&Nu?null:e;default:return null}}function u1(e,t){if(Hn)return e==="compositionend"||!cd&&oh(e,t)?(e=rh(),rr=sd=ka=null,Hn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return sh&&t.locale!=="ko"?null:t.data;default:return null}}var p1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ku(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!p1[e.type]:t==="textarea"}function dh(e,t,a,n){Un?Fn?Fn.push(n):Fn=[n]:Un=n,t=Fr(t,"onChange"),0<t.length&&(a=new ps("onChange","change",null,a,n),e.push({event:a,listeners:t}))}var Il=null,li=null;function f1(e){ix(e,0)}function hs(e){var t=Ll(e);if(eh(t))return e}function Eu(e,t){if(e==="change")return t}var uh=!1;if(ua){var eo;if(ua){var to="oninput"in document;if(!to){var Tu=document.createElement("div");Tu.setAttribute("oninput","return;"),to=typeof Tu.oninput=="function"}eo=to}else eo=!1;uh=eo&&(!document.documentMode||9<document.documentMode)}function Au(){Il&&(Il.detachEvent("onpropertychange",ph),li=Il=null)}function ph(e){if(e.propertyName==="value"&&hs(li)){var t=[];dh(t,li,e,rd(e)),ih(f1,t)}}function h1(e,t,a){e==="focusin"?(Au(),Il=t,li=a,Il.attachEvent("onpropertychange",ph)):e==="focusout"&&Au()}function x1(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return hs(li)}function g1(e,t){if(e==="click")return hs(t)}function m1(e,t){if(e==="input"||e==="change")return hs(t)}function b1(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var jt=typeof Object.is=="function"?Object.is:b1;function ii(e,t){if(jt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),n=Object.keys(t);if(a.length!==n.length)return!1;for(n=0;n<a.length;n++){var i=a[n];if(!Zo.call(t,i)||!jt(e[i],t[i]))return!1}return!0}function Ru(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Bu(e,t){var a=Ru(e);e=0;for(var n;a;){if(a.nodeType===3){if(n=e+a.textContent.length,e<=t&&n>=t)return{node:a,offset:t-e};e=n}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Ru(a)}}function fh(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?fh(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function hh(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ar(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=Ar(e.document)}return t}function dd(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var y1=ua&&"documentMode"in document&&11>=document.documentMode,_n=null,ac=null,ql=null,nc=!1;function Ou(e,t,a){var n=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;nc||_n==null||_n!==Ar(n)||(n=_n,"selectionStart"in n&&dd(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),ql&&ii(ql,n)||(ql=n,n=Fr(ac,"onSelect"),0<n.length&&(t=new ps("onSelect","select",null,t,a),e.push({event:t,listeners:n}),t.target=_n)))}function Ka(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var Gn={animationend:Ka("Animation","AnimationEnd"),animationiteration:Ka("Animation","AnimationIteration"),animationstart:Ka("Animation","AnimationStart"),transitionrun:Ka("Transition","TransitionRun"),transitionstart:Ka("Transition","TransitionStart"),transitioncancel:Ka("Transition","TransitionCancel"),transitionend:Ka("Transition","TransitionEnd")},ao={},xh={};ua&&(xh=document.createElement("div").style,"AnimationEvent"in window||(delete Gn.animationend.animation,delete Gn.animationiteration.animation,delete Gn.animationstart.animation),"TransitionEvent"in window||delete Gn.transitionend.transition);function zn(e){if(ao[e])return ao[e];if(!Gn[e])return e;var t=Gn[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in xh)return ao[e]=t[a];return e}var gh=zn("animationend"),mh=zn("animationiteration"),bh=zn("animationstart"),v1=zn("transitionrun"),j1=zn("transitionstart"),w1=zn("transitioncancel"),yh=zn("transitionend"),vh=new Map,lc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");lc.push("scrollEnd");function Ut(e,t){vh.set(e,t),Sn(t,[e])}var Rr=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Ct=[],Yn=0,ud=0;function xs(){for(var e=Yn,t=ud=Yn=0;t<e;){var a=Ct[t];Ct[t++]=null;var n=Ct[t];Ct[t++]=null;var i=Ct[t];Ct[t++]=null;var r=Ct[t];if(Ct[t++]=null,n!==null&&i!==null){var s=n.pending;s===null?i.next=i:(i.next=s.next,s.next=i),n.pending=i}r!==0&&jh(a,i,r)}}function gs(e,t,a,n){Ct[Yn++]=e,Ct[Yn++]=t,Ct[Yn++]=a,Ct[Yn++]=n,ud|=n,e.lanes|=n,e=e.alternate,e!==null&&(e.lanes|=n)}function pd(e,t,a,n){return gs(e,t,a,n),Br(e)}function Nn(e,t){return gs(e,null,null,t),Br(e)}function jh(e,t,a){e.lanes|=a;var n=e.alternate;n!==null&&(n.lanes|=a);for(var i=!1,r=e.return;r!==null;)r.childLanes|=a,n=r.alternate,n!==null&&(n.childLanes|=a),r.tag===22&&(e=r.stateNode,e===null||e._visibility&1||(i=!0)),e=r,r=r.return;return e.tag===3?(r=e.stateNode,i&&t!==null&&(i=31-yt(a),e=r.hiddenUpdates,n=e[i],n===null?e[i]=[t]:n.push(t),t.lane=a|536870912),r):null}function Br(e){if(50<Jl)throw Jl=0,zc=null,Error(D(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var In={};function S1(e,t,a,n){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function xt(e,t,a,n){return new S1(e,t,a,n)}function fd(e){return e=e.prototype,!(!e||!e.isReactComponent)}function sa(e,t){var a=e.alternate;return a===null?(a=xt(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function wh(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function or(e,t,a,n,i,r){var s=0;if(n=e,typeof e=="function")fd(e)&&(s=1);else if(typeof e=="string")s=Eb(e,a,Xt.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case Xo:return e=xt(31,a,t,i),e.elementType=Xo,e.lanes=r,e;case Dn:return on(a.children,i,r,t);case Yf:s=8,i|=24;break;case Io:return e=xt(12,a,t,i|2),e.elementType=Io,e.lanes=r,e;case qo:return e=xt(13,a,t,i),e.elementType=qo,e.lanes=r,e;case Vo:return e=xt(19,a,t,i),e.elementType=Vo,e.lanes=r,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case la:s=10;break e;case If:s=9;break e;case Pc:s=11;break e;case ed:s=14;break e;case va:s=16,n=null;break e}s=29,a=Error(D(130,e===null?"null":typeof e,"")),n=null}return t=xt(s,a,t,i),t.elementType=e,t.type=n,t.lanes=r,t}function on(e,t,a,n){return e=xt(7,e,n,t),e.lanes=a,e}function no(e,t,a){return e=xt(6,e,null,t),e.lanes=a,e}function Sh(e){var t=xt(18,null,null,0);return t.stateNode=e,t}function lo(e,t,a){return t=xt(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Du=new WeakMap;function Tt(e,t){if(typeof e=="object"&&e!==null){var a=Du.get(e);return a!==void 0?a:(t={value:e,source:t,stack:hu(t)},Du.set(e,t),t)}return{value:e,source:t,stack:hu(t)}}var qn=[],Vn=0,Or=null,ri=0,Nt=[],kt=0,qa=null,Yt=1,It="";function aa(e,t){qn[Vn++]=ri,qn[Vn++]=Or,Or=e,ri=t}function Ch(e,t,a){Nt[kt++]=Yt,Nt[kt++]=It,Nt[kt++]=qa,qa=e;var n=Yt;e=It;var i=32-yt(n)-1;n&=~(1<<i),a+=1;var r=32-yt(t)+i;if(30<r){var s=i-i%5;r=(n&(1<<s)-1).toString(32),n>>=s,i-=s,Yt=1<<32-yt(t)+i|a<<i|n,It=r+e}else Yt=1<<r|a<<i|n,It=e}function hd(e){e.return!==null&&(aa(e,1),Ch(e,1,0))}function xd(e){for(;e===Or;)Or=qn[--Vn],qn[Vn]=null,ri=qn[--Vn],qn[Vn]=null;for(;e===qa;)qa=Nt[--kt],Nt[kt]=null,It=Nt[--kt],Nt[kt]=null,Yt=Nt[--kt],Nt[kt]=null}function zh(e,t){Nt[kt++]=Yt,Nt[kt++]=It,Nt[kt++]=qa,Yt=t.id,It=t.overflow,qa=e}var Xe=null,je=null,se=!1,Oa=null,At=!1,ic=Error(D(519));function Va(e){var t=Error(D(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw si(Tt(t,e)),ic}function Mu(e){var t=e.stateNode,a=e.type,n=e.memoizedProps;switch(t[Ve]=e,t[ut]=n,a){case"dialog":le("cancel",t),le("close",t);break;case"iframe":case"object":case"embed":le("load",t);break;case"video":case"audio":for(a=0;a<ui.length;a++)le(ui[a],t);break;case"source":le("error",t);break;case"img":case"image":case"link":le("error",t),le("load",t);break;case"details":le("toggle",t);break;case"input":le("invalid",t),th(t,n.value,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name,!0);break;case"select":le("invalid",t);break;case"textarea":le("invalid",t),nh(t,n.value,n.defaultValue,n.children)}a=n.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||n.suppressHydrationWarning===!0||sx(t.textContent,a)?(n.popover!=null&&(le("beforetoggle",t),le("toggle",t)),n.onScroll!=null&&le("scroll",t),n.onScrollEnd!=null&&le("scrollend",t),n.onClick!=null&&(t.onclick=ia),t=!0):t=!1,t||Va(e,!0)}function Lu(e){for(Xe=e.return;Xe;)switch(Xe.tag){case 5:case 31:case 13:At=!1;return;case 27:case 3:At=!0;return;default:Xe=Xe.return}}function Tn(e){if(e!==Xe)return!1;if(!se)return Lu(e),se=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||Ac(e.type,e.memoizedProps)),a=!a),a&&je&&Va(e),Lu(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(D(317));je=wp(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(D(317));je=wp(e)}else t===27?(t=je,$a(e.type)?(e=Dc,Dc=null,je=e):je=t):je=Xe?Ot(e.stateNode.nextSibling):null;return!0}function xn(){je=Xe=null,se=!1}function io(){var e=Oa;return e!==null&&(rt===null?rt=e:rt.push.apply(rt,e),Oa=null),e}function si(e){Oa===null?Oa=[e]:Oa.push(e)}var rc=Qt(null),kn=null,ra=null;function wa(e,t,a){be(rc,t._currentValue),t._currentValue=a}function oa(e){e._currentValue=rc.current,Ye(rc)}function sc(e,t,a){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===a)break;e=e.return}}function oc(e,t,a,n){var i=e.child;for(i!==null&&(i.return=e);i!==null;){var r=i.dependencies;if(r!==null){var s=i.child;r=r.firstContext;e:for(;r!==null;){var o=r;r=i;for(var c=0;c<t.length;c++)if(o.context===t[c]){r.lanes|=a,o=r.alternate,o!==null&&(o.lanes|=a),sc(r.return,a,e),n||(s=null);break e}r=o.next}}else if(i.tag===18){if(s=i.return,s===null)throw Error(D(341));s.lanes|=a,r=s.alternate,r!==null&&(r.lanes|=a),sc(s,a,e),s=null}else s=i.child;if(s!==null)s.return=i;else for(s=i;s!==null;){if(s===e){s=null;break}if(i=s.sibling,i!==null){i.return=s.return,s=i;break}s=s.return}i=s}}function hl(e,t,a,n){e=null;for(var i=t,r=!1;i!==null;){if(!r){if(i.flags&524288)r=!0;else if(i.flags&262144)break}if(i.tag===10){var s=i.alternate;if(s===null)throw Error(D(387));if(s=s.memoizedProps,s!==null){var o=i.type;jt(i.pendingProps.value,s.value)||(e!==null?e.push(o):e=[o])}}else if(i===Nr.current){if(s=i.alternate,s===null)throw Error(D(387));s.memoizedState.memoizedState!==i.memoizedState.memoizedState&&(e!==null?e.push(fi):e=[fi])}i=i.return}e!==null&&oc(t,e,a,n),t.flags|=262144}function Dr(e){for(e=e.firstContext;e!==null;){if(!jt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function gn(e){kn=e,ra=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function We(e){return Nh(kn,e)}function qi(e,t){return kn===null&&gn(e),Nh(e,t)}function Nh(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},ra===null){if(e===null)throw Error(D(308));ra=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ra=ra.next=t;return a}var C1=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},z1=He.unstable_scheduleCallback,N1=He.unstable_NormalPriority,De={$$typeof:la,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function gd(){return{controller:new C1,data:new Map,refCount:0}}function zi(e){e.refCount--,e.refCount===0&&z1(N1,function(){e.controller.abort()})}var Vl=null,cc=0,al=0,Zn=null;function k1(e,t){if(Vl===null){var a=Vl=[];cc=0,al=Yd(),Zn={status:"pending",value:void 0,then:function(n){a.push(n)}}}return cc++,t.then(Uu,Uu),t}function Uu(){if(--cc===0&&Vl!==null){Zn!==null&&(Zn.status="fulfilled");var e=Vl;Vl=null,al=0,Zn=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function E1(e,t){var a=[],n={status:"pending",value:null,reason:null,then:function(i){a.push(i)}};return e.then(function(){n.status="fulfilled",n.value=t;for(var i=0;i<a.length;i++)(0,a[i])(t)},function(i){for(n.status="rejected",n.reason=i,i=0;i<a.length;i++)(0,a[i])(void 0)}),n}var Hu=$.S;$.S=function(e,t){G0=mt(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&k1(e,t),Hu!==null&&Hu(e,t)};var cn=Qt(null);function md(){var e=cn.current;return e!==null?e:me.pooledCache}function cr(e,t){t===null?be(cn,cn.current):be(cn,t.pool)}function kh(){var e=md();return e===null?null:{parent:De._currentValue,pool:e}}var xl=Error(D(460)),bd=Error(D(474)),ms=Error(D(542)),Mr={then:function(){}};function _u(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Eh(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(ia,ia),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Yu(e),e;default:if(typeof t.status=="string")t.then(ia,ia);else{if(e=me,e!==null&&100<e.shellSuspendCounter)throw Error(D(482));e=t,e.status="pending",e.then(function(n){if(t.status==="pending"){var i=t;i.status="fulfilled",i.value=n}},function(n){if(t.status==="pending"){var i=t;i.status="rejected",i.reason=n}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Yu(e),e}throw dn=t,xl}}function an(e){try{var t=e._init;return t(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(dn=a,xl):a}}var dn=null;function Gu(){if(dn===null)throw Error(D(459));var e=dn;return dn=null,e}function Yu(e){if(e===xl||e===ms)throw Error(D(483))}var $n=null,oi=0;function Vi(e){var t=oi;return oi+=1,$n===null&&($n=[]),Eh($n,e,t)}function kl(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Xi(e,t){throw t.$$typeof===hm?Error(D(525)):(e=Object.prototype.toString.call(t),Error(D(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Th(e){function t(h,g){if(e){var v=h.deletions;v===null?(h.deletions=[g],h.flags|=16):v.push(g)}}function a(h,g){if(!e)return null;for(;g!==null;)t(h,g),g=g.sibling;return null}function n(h){for(var g=new Map;h!==null;)h.key!==null?g.set(h.key,h):g.set(h.index,h),h=h.sibling;return g}function i(h,g){return h=sa(h,g),h.index=0,h.sibling=null,h}function r(h,g,v){return h.index=v,e?(v=h.alternate,v!==null?(v=v.index,v<g?(h.flags|=67108866,g):v):(h.flags|=67108866,g)):(h.flags|=1048576,g)}function s(h){return e&&h.alternate===null&&(h.flags|=67108866),h}function o(h,g,v,y){return g===null||g.tag!==6?(g=no(v,h.mode,y),g.return=h,g):(g=i(g,v),g.return=h,g)}function c(h,g,v,y){var k=v.type;return k===Dn?p(h,g,v.props.children,y,v.key):g!==null&&(g.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===va&&an(k)===g.type)?(g=i(g,v.props),kl(g,v),g.return=h,g):(g=or(v.type,v.key,v.props,null,h.mode,y),kl(g,v),g.return=h,g)}function d(h,g,v,y){return g===null||g.tag!==4||g.stateNode.containerInfo!==v.containerInfo||g.stateNode.implementation!==v.implementation?(g=lo(v,h.mode,y),g.return=h,g):(g=i(g,v.children||[]),g.return=h,g)}function p(h,g,v,y,k){return g===null||g.tag!==7?(g=on(v,h.mode,y,k),g.return=h,g):(g=i(g,v),g.return=h,g)}function f(h,g,v){if(typeof g=="string"&&g!==""||typeof g=="number"||typeof g=="bigint")return g=no(""+g,h.mode,v),g.return=h,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Ui:return v=or(g.type,g.key,g.props,null,h.mode,v),kl(v,g),v.return=h,v;case Dl:return g=lo(g,h.mode,v),g.return=h,g;case va:return g=an(g),f(h,g,v)}if(Ml(g)||Cl(g))return g=on(g,h.mode,v,null),g.return=h,g;if(typeof g.then=="function")return f(h,Vi(g),v);if(g.$$typeof===la)return f(h,qi(h,g),v);Xi(h,g)}return null}function u(h,g,v,y){var k=g!==null?g.key:null;if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return k!==null?null:o(h,g,""+v,y);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Ui:return v.key===k?c(h,g,v,y):null;case Dl:return v.key===k?d(h,g,v,y):null;case va:return v=an(v),u(h,g,v,y)}if(Ml(v)||Cl(v))return k!==null?null:p(h,g,v,y,null);if(typeof v.then=="function")return u(h,g,Vi(v),y);if(v.$$typeof===la)return u(h,g,qi(h,v),y);Xi(h,v)}return null}function x(h,g,v,y,k){if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return h=h.get(v)||null,o(g,h,""+y,k);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Ui:return h=h.get(y.key===null?v:y.key)||null,c(g,h,y,k);case Dl:return h=h.get(y.key===null?v:y.key)||null,d(g,h,y,k);case va:return y=an(y),x(h,g,v,y,k)}if(Ml(y)||Cl(y))return h=h.get(v)||null,p(g,h,y,k,null);if(typeof y.then=="function")return x(h,g,v,Vi(y),k);if(y.$$typeof===la)return x(h,g,v,qi(g,y),k);Xi(g,y)}return null}function m(h,g,v,y){for(var k=null,G=null,C=g,T=g=0,O=null;C!==null&&T<v.length;T++){C.index>T?(O=C,C=null):O=C.sibling;var E=u(h,C,v[T],y);if(E===null){C===null&&(C=O);break}e&&C&&E.alternate===null&&t(h,C),g=r(E,g,T),G===null?k=E:G.sibling=E,G=E,C=O}if(T===v.length)return a(h,C),se&&aa(h,T),k;if(C===null){for(;T<v.length;T++)C=f(h,v[T],y),C!==null&&(g=r(C,g,T),G===null?k=C:G.sibling=C,G=C);return se&&aa(h,T),k}for(C=n(C);T<v.length;T++)O=x(C,h,T,v[T],y),O!==null&&(e&&O.alternate!==null&&C.delete(O.key===null?T:O.key),g=r(O,g,T),G===null?k=O:G.sibling=O,G=O);return e&&C.forEach(function(Q){return t(h,Q)}),se&&aa(h,T),k}function j(h,g,v,y){if(v==null)throw Error(D(151));for(var k=null,G=null,C=g,T=g=0,O=null,E=v.next();C!==null&&!E.done;T++,E=v.next()){C.index>T?(O=C,C=null):O=C.sibling;var Q=u(h,C,E.value,y);if(Q===null){C===null&&(C=O);break}e&&C&&Q.alternate===null&&t(h,C),g=r(Q,g,T),G===null?k=Q:G.sibling=Q,G=Q,C=O}if(E.done)return a(h,C),se&&aa(h,T),k;if(C===null){for(;!E.done;T++,E=v.next())E=f(h,E.value,y),E!==null&&(g=r(E,g,T),G===null?k=E:G.sibling=E,G=E);return se&&aa(h,T),k}for(C=n(C);!E.done;T++,E=v.next())E=x(C,h,T,E.value,y),E!==null&&(e&&E.alternate!==null&&C.delete(E.key===null?T:E.key),g=r(E,g,T),G===null?k=E:G.sibling=E,G=E);return e&&C.forEach(function(R){return t(h,R)}),se&&aa(h,T),k}function w(h,g,v,y){if(typeof v=="object"&&v!==null&&v.type===Dn&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case Ui:e:{for(var k=v.key;g!==null;){if(g.key===k){if(k=v.type,k===Dn){if(g.tag===7){a(h,g.sibling),y=i(g,v.props.children),y.return=h,h=y;break e}}else if(g.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===va&&an(k)===g.type){a(h,g.sibling),y=i(g,v.props),kl(y,v),y.return=h,h=y;break e}a(h,g);break}else t(h,g);g=g.sibling}v.type===Dn?(y=on(v.props.children,h.mode,y,v.key),y.return=h,h=y):(y=or(v.type,v.key,v.props,null,h.mode,y),kl(y,v),y.return=h,h=y)}return s(h);case Dl:e:{for(k=v.key;g!==null;){if(g.key===k)if(g.tag===4&&g.stateNode.containerInfo===v.containerInfo&&g.stateNode.implementation===v.implementation){a(h,g.sibling),y=i(g,v.children||[]),y.return=h,h=y;break e}else{a(h,g);break}else t(h,g);g=g.sibling}y=lo(v,h.mode,y),y.return=h,h=y}return s(h);case va:return v=an(v),w(h,g,v,y)}if(Ml(v))return m(h,g,v,y);if(Cl(v)){if(k=Cl(v),typeof k!="function")throw Error(D(150));return v=k.call(v),j(h,g,v,y)}if(typeof v.then=="function")return w(h,g,Vi(v),y);if(v.$$typeof===la)return w(h,g,qi(h,v),y);Xi(h,v)}return typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint"?(v=""+v,g!==null&&g.tag===6?(a(h,g.sibling),y=i(g,v),y.return=h,h=y):(a(h,g),y=no(v,h.mode,y),y.return=h,h=y),s(h)):a(h,g)}return function(h,g,v,y){try{oi=0;var k=w(h,g,v,y);return $n=null,k}catch(C){if(C===xl||C===ms)throw C;var G=xt(29,C,null,h.mode);return G.lanes=y,G.return=h,G}finally{}}}var mn=Th(!0),Ah=Th(!1),ja=!1;function yd(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function dc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Da(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ma(e,t,a){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,oe&2){var i=n.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),n.pending=t,t=Br(e),jh(e,null,a),t}return gs(e,n,t,a),Br(e)}function Xl(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var n=t.lanes;n&=e.pendingLanes,a|=n,t.lanes=a,Ff(e,a)}}function ro(e,t){var a=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,a===n)){var i=null,r=null;if(a=a.firstBaseUpdate,a!==null){do{var s={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};r===null?i=r=s:r=r.next=s,a=a.next}while(a!==null);r===null?i=r=t:r=r.next=t}else i=r=t;a={baseState:n.baseState,firstBaseUpdate:i,lastBaseUpdate:r,shared:n.shared,callbacks:n.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var uc=!1;function Wl(){if(uc){var e=Zn;if(e!==null)throw e}}function Ql(e,t,a,n){uc=!1;var i=e.updateQueue;ja=!1;var r=i.firstBaseUpdate,s=i.lastBaseUpdate,o=i.shared.pending;if(o!==null){i.shared.pending=null;var c=o,d=c.next;c.next=null,s===null?r=d:s.next=d,s=c;var p=e.alternate;p!==null&&(p=p.updateQueue,o=p.lastBaseUpdate,o!==s&&(o===null?p.firstBaseUpdate=d:o.next=d,p.lastBaseUpdate=c))}if(r!==null){var f=i.baseState;s=0,p=d=c=null,o=r;do{var u=o.lane&-536870913,x=u!==o.lane;if(x?(re&u)===u:(n&u)===u){u!==0&&u===al&&(uc=!0),p!==null&&(p=p.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});e:{var m=e,j=o;u=t;var w=a;switch(j.tag){case 1:if(m=j.payload,typeof m=="function"){f=m.call(w,f,u);break e}f=m;break e;case 3:m.flags=m.flags&-65537|128;case 0:if(m=j.payload,u=typeof m=="function"?m.call(w,f,u):m,u==null)break e;f=Se({},f,u);break e;case 2:ja=!0}}u=o.callback,u!==null&&(e.flags|=64,x&&(e.flags|=8192),x=i.callbacks,x===null?i.callbacks=[u]:x.push(u))}else x={lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},p===null?(d=p=x,c=f):p=p.next=x,s|=u;if(o=o.next,o===null){if(o=i.shared.pending,o===null)break;x=o,o=x.next,x.next=null,i.lastBaseUpdate=x,i.shared.pending=null}}while(!0);p===null&&(c=f),i.baseState=c,i.firstBaseUpdate=d,i.lastBaseUpdate=p,r===null&&(i.shared.lanes=0),Wa|=s,e.lanes=s,e.memoizedState=f}}function Rh(e,t){if(typeof e!="function")throw Error(D(191,e));e.call(t)}function Bh(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Rh(a[e],t)}var nl=Qt(null),Lr=Qt(0);function Iu(e,t){e=xa,be(Lr,e),be(nl,t),xa=e|t.baseLanes}function pc(){be(Lr,xa),be(nl,nl.current)}function vd(){xa=Lr.current,Ye(nl),Ye(Lr)}var wt=Qt(null),Bt=null;function Sa(e){var t=e.alternate;be(Ee,Ee.current&1),be(wt,e),Bt===null&&(t===null||nl.current!==null||t.memoizedState!==null)&&(Bt=e)}function fc(e){be(Ee,Ee.current),be(wt,e),Bt===null&&(Bt=e)}function Oh(e){e.tag===22?(be(Ee,Ee.current),be(wt,e),Bt===null&&(Bt=e)):Ca()}function Ca(){be(Ee,Ee.current),be(wt,wt.current)}function ht(e){Ye(wt),Bt===e&&(Bt=null),Ye(Ee)}var Ee=Qt(0);function Ur(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Bc(a)||Oc(a)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var pa=0,te=null,he=null,Be=null,Hr=!1,Kn=!1,bn=!1,_r=0,ci=0,Jn=null,T1=0;function Ne(){throw Error(D(321))}function jd(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!jt(e[a],t[a]))return!1;return!0}function wd(e,t,a,n,i,r){return pa=r,te=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,$.H=e===null||e.memoizedState===null?d0:Od,bn=!1,r=a(n,i),bn=!1,Kn&&(r=Mh(t,a,n,i)),Dh(e),r}function Dh(e){$.H=di;var t=he!==null&&he.next!==null;if(pa=0,Be=he=te=null,Hr=!1,ci=0,Jn=null,t)throw Error(D(300));e===null||Me||(e=e.dependencies,e!==null&&Dr(e)&&(Me=!0))}function Mh(e,t,a,n){te=e;var i=0;do{if(Kn&&(Jn=null),ci=0,Kn=!1,25<=i)throw Error(D(301));if(i+=1,Be=he=null,e.updateQueue!=null){var r=e.updateQueue;r.lastEffect=null,r.events=null,r.stores=null,r.memoCache!=null&&(r.memoCache.index=0)}$.H=u0,r=t(a,n)}while(Kn);return r}function A1(){var e=$.H,t=e.useState()[0];return t=typeof t.then=="function"?Ni(t):t,e=e.useState()[0],(he!==null?he.memoizedState:null)!==e&&(te.flags|=1024),t}function Sd(){var e=_r!==0;return _r=0,e}function Cd(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function zd(e){if(Hr){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Hr=!1}pa=0,Be=he=te=null,Kn=!1,ci=_r=0,Jn=null}function Ke(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Be===null?te.memoizedState=Be=e:Be=Be.next=e,Be}function Te(){if(he===null){var e=te.alternate;e=e!==null?e.memoizedState:null}else e=he.next;var t=Be===null?te.memoizedState:Be.next;if(t!==null)Be=t,he=e;else{if(e===null)throw te.alternate===null?Error(D(467)):Error(D(310));he=e,e={memoizedState:he.memoizedState,baseState:he.baseState,baseQueue:he.baseQueue,queue:he.queue,next:null},Be===null?te.memoizedState=Be=e:Be=Be.next=e}return Be}function bs(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ni(e){var t=ci;return ci+=1,Jn===null&&(Jn=[]),e=Eh(Jn,e,t),t=te,(Be===null?t.memoizedState:Be.next)===null&&(t=t.alternate,$.H=t===null||t.memoizedState===null?d0:Od),e}function ys(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Ni(e);if(e.$$typeof===la)return We(e)}throw Error(D(438,String(e)))}function Nd(e){var t=null,a=te.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var n=te.alternate;n!==null&&(n=n.updateQueue,n!==null&&(n=n.memoCache,n!=null&&(t={data:n.data.map(function(i){return i.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=bs(),te.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),n=0;n<e;n++)a[n]=xm;return t.index++,a}function fa(e,t){return typeof t=="function"?t(e):t}function dr(e){var t=Te();return kd(t,he,e)}function kd(e,t,a){var n=e.queue;if(n===null)throw Error(D(311));n.lastRenderedReducer=a;var i=e.baseQueue,r=n.pending;if(r!==null){if(i!==null){var s=i.next;i.next=r.next,r.next=s}t.baseQueue=i=r,n.pending=null}if(r=e.baseState,i===null)e.memoizedState=r;else{t=i.next;var o=s=null,c=null,d=t,p=!1;do{var f=d.lane&-536870913;if(f!==d.lane?(re&f)===f:(pa&f)===f){var u=d.revertLane;if(u===0)c!==null&&(c=c.next={lane:0,revertLane:0,gesture:null,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),f===al&&(p=!0);else if((pa&u)===u){d=d.next,u===al&&(p=!0);continue}else f={lane:0,revertLane:d.revertLane,gesture:null,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null},c===null?(o=c=f,s=r):c=c.next=f,te.lanes|=u,Wa|=u;f=d.action,bn&&a(r,f),r=d.hasEagerState?d.eagerState:a(r,f)}else u={lane:f,revertLane:d.revertLane,gesture:d.gesture,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null},c===null?(o=c=u,s=r):c=c.next=u,te.lanes|=f,Wa|=f;d=d.next}while(d!==null&&d!==t);if(c===null?s=r:c.next=o,!jt(r,e.memoizedState)&&(Me=!0,p&&(a=Zn,a!==null)))throw a;e.memoizedState=r,e.baseState=s,e.baseQueue=c,n.lastRenderedState=r}return i===null&&(n.lanes=0),[e.memoizedState,n.dispatch]}function so(e){var t=Te(),a=t.queue;if(a===null)throw Error(D(311));a.lastRenderedReducer=e;var n=a.dispatch,i=a.pending,r=t.memoizedState;if(i!==null){a.pending=null;var s=i=i.next;do r=e(r,s.action),s=s.next;while(s!==i);jt(r,t.memoizedState)||(Me=!0),t.memoizedState=r,t.baseQueue===null&&(t.baseState=r),a.lastRenderedState=r}return[r,n]}function Lh(e,t,a){var n=te,i=Te(),r=se;if(r){if(a===void 0)throw Error(D(407));a=a()}else a=t();var s=!jt((he||i).memoizedState,a);if(s&&(i.memoizedState=a,Me=!0),i=i.queue,Ed(_h.bind(null,n,i,e),[e]),i.getSnapshot!==t||s||Be!==null&&Be.memoizedState.tag&1){if(n.flags|=2048,ll(9,{destroy:void 0},Hh.bind(null,n,i,a,t),null),me===null)throw Error(D(349));r||pa&127||Uh(n,t,a)}return a}function Uh(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=te.updateQueue,t===null?(t=bs(),te.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function Hh(e,t,a,n){t.value=a,t.getSnapshot=n,Gh(t)&&Yh(e)}function _h(e,t,a){return a(function(){Gh(t)&&Yh(e)})}function Gh(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!jt(e,a)}catch{return!0}}function Yh(e){var t=Nn(e,2);t!==null&&ot(t,e,2)}function hc(e){var t=Ke();if(typeof e=="function"){var a=e;if(e=a(),bn){Na(!0);try{a()}finally{Na(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:fa,lastRenderedState:e},t}function Ih(e,t,a,n){return e.baseState=a,kd(e,he,typeof n=="function"?n:fa)}function R1(e,t,a,n,i){if(js(e))throw Error(D(485));if(e=t.action,e!==null){var r={payload:i,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(s){r.listeners.push(s)}};$.T!==null?a(!0):r.isTransition=!1,n(r),a=t.pending,a===null?(r.next=t.pending=r,qh(t,r)):(r.next=a.next,t.pending=a.next=r)}}function qh(e,t){var a=t.action,n=t.payload,i=e.state;if(t.isTransition){var r=$.T,s={};$.T=s;try{var o=a(i,n),c=$.S;c!==null&&c(s,o),qu(e,t,o)}catch(d){xc(e,t,d)}finally{r!==null&&s.types!==null&&(r.types=s.types),$.T=r}}else try{r=a(i,n),qu(e,t,r)}catch(d){xc(e,t,d)}}function qu(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(n){Vu(e,t,n)},function(n){return xc(e,t,n)}):Vu(e,t,a)}function Vu(e,t,a){t.status="fulfilled",t.value=a,Vh(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,qh(e,a)))}function xc(e,t,a){var n=e.pending;if(e.pending=null,n!==null){n=n.next;do t.status="rejected",t.reason=a,Vh(t),t=t.next;while(t!==n)}e.action=null}function Vh(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Xh(e,t){return t}function Xu(e,t){if(se){var a=me.formState;if(a!==null){e:{var n=te;if(se){if(je){t:{for(var i=je,r=At;i.nodeType!==8;){if(!r){i=null;break t}if(i=Ot(i.nextSibling),i===null){i=null;break t}}r=i.data,i=r==="F!"||r==="F"?i:null}if(i){je=Ot(i.nextSibling),n=i.data==="F!";break e}}Va(n)}n=!1}n&&(t=a[0])}}return a=Ke(),a.memoizedState=a.baseState=t,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Xh,lastRenderedState:t},a.queue=n,a=s0.bind(null,te,n),n.dispatch=a,n=hc(!1),r=Bd.bind(null,te,!1,n.queue),n=Ke(),i={state:t,dispatch:null,action:e,pending:null},n.queue=i,a=R1.bind(null,te,i,r,a),i.dispatch=a,n.memoizedState=e,[t,a,!1]}function Wu(e){var t=Te();return Wh(t,he,e)}function Wh(e,t,a){if(t=kd(e,t,Xh)[0],e=dr(fa)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var n=Ni(t)}catch(s){throw s===xl?ms:s}else n=t;t=Te();var i=t.queue,r=i.dispatch;return a!==t.memoizedState&&(te.flags|=2048,ll(9,{destroy:void 0},B1.bind(null,i,a),null)),[n,r,e]}function B1(e,t){e.action=t}function Qu(e){var t=Te(),a=he;if(a!==null)return Wh(t,a,e);Te(),t=t.memoizedState,a=Te();var n=a.queue.dispatch;return a.memoizedState=e,[t,n,!1]}function ll(e,t,a,n){return e={tag:e,create:a,deps:n,inst:t,next:null},t=te.updateQueue,t===null&&(t=bs(),te.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(n=a.next,a.next=e,e.next=n,t.lastEffect=e),e}function Qh(){return Te().memoizedState}function ur(e,t,a,n){var i=Ke();te.flags|=e,i.memoizedState=ll(1|t,{destroy:void 0},a,n===void 0?null:n)}function vs(e,t,a,n){var i=Te();n=n===void 0?null:n;var r=i.memoizedState.inst;he!==null&&n!==null&&jd(n,he.memoizedState.deps)?i.memoizedState=ll(t,r,a,n):(te.flags|=e,i.memoizedState=ll(1|t,r,a,n))}function Fu(e,t){ur(8390656,8,e,t)}function Ed(e,t){vs(2048,8,e,t)}function O1(e){te.flags|=4;var t=te.updateQueue;if(t===null)t=bs(),te.updateQueue=t,t.events=[e];else{var a=t.events;a===null?t.events=[e]:a.push(e)}}function Fh(e){var t=Te().memoizedState;return O1({ref:t,nextImpl:e}),function(){if(oe&2)throw Error(D(440));return t.impl.apply(void 0,arguments)}}function Zh(e,t){return vs(4,2,e,t)}function $h(e,t){return vs(4,4,e,t)}function Kh(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Jh(e,t,a){a=a!=null?a.concat([e]):null,vs(4,4,Kh.bind(null,t,e),a)}function Td(){}function Ph(e,t){var a=Te();t=t===void 0?null:t;var n=a.memoizedState;return t!==null&&jd(t,n[1])?n[0]:(a.memoizedState=[e,t],e)}function e0(e,t){var a=Te();t=t===void 0?null:t;var n=a.memoizedState;if(t!==null&&jd(t,n[1]))return n[0];if(n=e(),bn){Na(!0);try{e()}finally{Na(!1)}}return a.memoizedState=[n,t],n}function Ad(e,t,a){return a===void 0||pa&1073741824&&!(re&261930)?e.memoizedState=t:(e.memoizedState=a,e=I0(),te.lanes|=e,Wa|=e,a)}function t0(e,t,a,n){return jt(a,t)?a:nl.current!==null?(e=Ad(e,a,n),jt(e,t)||(Me=!0),e):!(pa&42)||pa&1073741824&&!(re&261930)?(Me=!0,e.memoizedState=a):(e=I0(),te.lanes|=e,Wa|=e,t)}function a0(e,t,a,n,i){var r=ce.p;ce.p=r!==0&&8>r?r:8;var s=$.T,o={};$.T=o,Bd(e,!1,t,a);try{var c=i(),d=$.S;if(d!==null&&d(o,c),c!==null&&typeof c=="object"&&typeof c.then=="function"){var p=E1(c,n);Fl(e,t,p,vt(e))}else Fl(e,t,n,vt(e))}catch(f){Fl(e,t,{then:function(){},status:"rejected",reason:f},vt())}finally{ce.p=r,s!==null&&o.types!==null&&(s.types=o.types),$.T=s}}function D1(){}function gc(e,t,a,n){if(e.tag!==5)throw Error(D(476));var i=n0(e).queue;a0(e,i,t,sn,a===null?D1:function(){return l0(e),a(n)})}function n0(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:sn,baseState:sn,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fa,lastRenderedState:sn},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fa,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function l0(e){var t=n0(e);t.next===null&&(t=e.alternate.memoizedState),Fl(e,t.next.queue,{},vt())}function Rd(){return We(fi)}function i0(){return Te().memoizedState}function r0(){return Te().memoizedState}function M1(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=vt();e=Da(a);var n=Ma(t,e,a);n!==null&&(ot(n,t,a),Xl(n,t,a)),t={cache:gd()},e.payload=t;return}t=t.return}}function L1(e,t,a){var n=vt();a={lane:n,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},js(e)?o0(t,a):(a=pd(e,t,a,n),a!==null&&(ot(a,e,n),c0(a,t,n)))}function s0(e,t,a){var n=vt();Fl(e,t,a,n)}function Fl(e,t,a,n){var i={lane:n,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(js(e))o0(t,i);else{var r=e.alternate;if(e.lanes===0&&(r===null||r.lanes===0)&&(r=t.lastRenderedReducer,r!==null))try{var s=t.lastRenderedState,o=r(s,a);if(i.hasEagerState=!0,i.eagerState=o,jt(o,s))return gs(e,t,i,0),me===null&&xs(),!1}catch{}finally{}if(a=pd(e,t,i,n),a!==null)return ot(a,e,n),c0(a,t,n),!0}return!1}function Bd(e,t,a,n){if(n={lane:2,revertLane:Yd(),gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},js(e)){if(t)throw Error(D(479))}else t=pd(e,a,n,2),t!==null&&ot(t,e,2)}function js(e){var t=e.alternate;return e===te||t!==null&&t===te}function o0(e,t){Kn=Hr=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function c0(e,t,a){if(a&4194048){var n=t.lanes;n&=e.pendingLanes,a|=n,t.lanes=a,Ff(e,a)}}var di={readContext:We,use:ys,useCallback:Ne,useContext:Ne,useEffect:Ne,useImperativeHandle:Ne,useLayoutEffect:Ne,useInsertionEffect:Ne,useMemo:Ne,useReducer:Ne,useRef:Ne,useState:Ne,useDebugValue:Ne,useDeferredValue:Ne,useTransition:Ne,useSyncExternalStore:Ne,useId:Ne,useHostTransitionStatus:Ne,useFormState:Ne,useActionState:Ne,useOptimistic:Ne,useMemoCache:Ne,useCacheRefresh:Ne};di.useEffectEvent=Ne;var d0={readContext:We,use:ys,useCallback:function(e,t){return Ke().memoizedState=[e,t===void 0?null:t],e},useContext:We,useEffect:Fu,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,ur(4194308,4,Kh.bind(null,t,e),a)},useLayoutEffect:function(e,t){return ur(4194308,4,e,t)},useInsertionEffect:function(e,t){ur(4,2,e,t)},useMemo:function(e,t){var a=Ke();t=t===void 0?null:t;var n=e();if(bn){Na(!0);try{e()}finally{Na(!1)}}return a.memoizedState=[n,t],n},useReducer:function(e,t,a){var n=Ke();if(a!==void 0){var i=a(t);if(bn){Na(!0);try{a(t)}finally{Na(!1)}}}else i=t;return n.memoizedState=n.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},n.queue=e,e=e.dispatch=L1.bind(null,te,e),[n.memoizedState,e]},useRef:function(e){var t=Ke();return e={current:e},t.memoizedState=e},useState:function(e){e=hc(e);var t=e.queue,a=s0.bind(null,te,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:Td,useDeferredValue:function(e,t){var a=Ke();return Ad(a,e,t)},useTransition:function(){var e=hc(!1);return e=a0.bind(null,te,e.queue,!0,!1),Ke().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var n=te,i=Ke();if(se){if(a===void 0)throw Error(D(407));a=a()}else{if(a=t(),me===null)throw Error(D(349));re&127||Uh(n,t,a)}i.memoizedState=a;var r={value:a,getSnapshot:t};return i.queue=r,Fu(_h.bind(null,n,r,e),[e]),n.flags|=2048,ll(9,{destroy:void 0},Hh.bind(null,n,r,a,t),null),a},useId:function(){var e=Ke(),t=me.identifierPrefix;if(se){var a=It,n=Yt;a=(n&~(1<<32-yt(n)-1)).toString(32)+a,t="_"+t+"R_"+a,a=_r++,0<a&&(t+="H"+a.toString(32)),t+="_"}else a=T1++,t="_"+t+"r_"+a.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Rd,useFormState:Xu,useActionState:Xu,useOptimistic:function(e){var t=Ke();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=Bd.bind(null,te,!0,a),a.dispatch=t,[e,t]},useMemoCache:Nd,useCacheRefresh:function(){return Ke().memoizedState=M1.bind(null,te)},useEffectEvent:function(e){var t=Ke(),a={impl:e};return t.memoizedState=a,function(){if(oe&2)throw Error(D(440));return a.impl.apply(void 0,arguments)}}},Od={readContext:We,use:ys,useCallback:Ph,useContext:We,useEffect:Ed,useImperativeHandle:Jh,useInsertionEffect:Zh,useLayoutEffect:$h,useMemo:e0,useReducer:dr,useRef:Qh,useState:function(){return dr(fa)},useDebugValue:Td,useDeferredValue:function(e,t){var a=Te();return t0(a,he.memoizedState,e,t)},useTransition:function(){var e=dr(fa)[0],t=Te().memoizedState;return[typeof e=="boolean"?e:Ni(e),t]},useSyncExternalStore:Lh,useId:i0,useHostTransitionStatus:Rd,useFormState:Wu,useActionState:Wu,useOptimistic:function(e,t){var a=Te();return Ih(a,he,e,t)},useMemoCache:Nd,useCacheRefresh:r0};Od.useEffectEvent=Fh;var u0={readContext:We,use:ys,useCallback:Ph,useContext:We,useEffect:Ed,useImperativeHandle:Jh,useInsertionEffect:Zh,useLayoutEffect:$h,useMemo:e0,useReducer:so,useRef:Qh,useState:function(){return so(fa)},useDebugValue:Td,useDeferredValue:function(e,t){var a=Te();return he===null?Ad(a,e,t):t0(a,he.memoizedState,e,t)},useTransition:function(){var e=so(fa)[0],t=Te().memoizedState;return[typeof e=="boolean"?e:Ni(e),t]},useSyncExternalStore:Lh,useId:i0,useHostTransitionStatus:Rd,useFormState:Qu,useActionState:Qu,useOptimistic:function(e,t){var a=Te();return he!==null?Ih(a,he,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:Nd,useCacheRefresh:r0};u0.useEffectEvent=Fh;function oo(e,t,a,n){t=e.memoizedState,a=a(n,t),a=a==null?t:Se({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var mc={enqueueSetState:function(e,t,a){e=e._reactInternals;var n=vt(),i=Da(n);i.payload=t,a!=null&&(i.callback=a),t=Ma(e,i,n),t!==null&&(ot(t,e,n),Xl(t,e,n))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var n=vt(),i=Da(n);i.tag=1,i.payload=t,a!=null&&(i.callback=a),t=Ma(e,i,n),t!==null&&(ot(t,e,n),Xl(t,e,n))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=vt(),n=Da(a);n.tag=2,t!=null&&(n.callback=t),t=Ma(e,n,a),t!==null&&(ot(t,e,a),Xl(t,e,a))}};function Zu(e,t,a,n,i,r,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,r,s):t.prototype&&t.prototype.isPureReactComponent?!ii(a,n)||!ii(i,r):!0}function $u(e,t,a,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,n),t.state!==e&&mc.enqueueReplaceState(t,t.state,null)}function yn(e,t){var a=t;if("ref"in t){a={};for(var n in t)n!=="ref"&&(a[n]=t[n])}if(e=e.defaultProps){a===t&&(a=Se({},a));for(var i in e)a[i]===void 0&&(a[i]=e[i])}return a}function p0(e){Rr(e)}function f0(e){console.error(e)}function h0(e){Rr(e)}function Gr(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(n){setTimeout(function(){throw n})}}function Ku(e,t,a){try{var n=e.onCaughtError;n(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(i){setTimeout(function(){throw i})}}function bc(e,t,a){return a=Da(a),a.tag=3,a.payload={element:null},a.callback=function(){Gr(e,t)},a}function x0(e){return e=Da(e),e.tag=3,e}function g0(e,t,a,n){var i=a.type.getDerivedStateFromError;if(typeof i=="function"){var r=n.value;e.payload=function(){return i(r)},e.callback=function(){Ku(t,a,n)}}var s=a.stateNode;s!==null&&typeof s.componentDidCatch=="function"&&(e.callback=function(){Ku(t,a,n),typeof i!="function"&&(La===null?La=new Set([this]):La.add(this));var o=n.stack;this.componentDidCatch(n.value,{componentStack:o!==null?o:""})})}function U1(e,t,a,n,i){if(a.flags|=32768,n!==null&&typeof n=="object"&&typeof n.then=="function"){if(t=a.alternate,t!==null&&hl(t,a,i,!0),a=wt.current,a!==null){switch(a.tag){case 31:case 13:return Bt===null?Xr():a.alternate===null&&ke===0&&(ke=3),a.flags&=-257,a.flags|=65536,a.lanes=i,n===Mr?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([n]):t.add(n),vo(e,n,i)),!1;case 22:return a.flags|=65536,n===Mr?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([n])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([n]):a.add(n)),vo(e,n,i)),!1}throw Error(D(435,a.tag))}return vo(e,n,i),Xr(),!1}if(se)return t=wt.current,t!==null?(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=i,n!==ic&&(e=Error(D(422),{cause:n}),si(Tt(e,a)))):(n!==ic&&(t=Error(D(423),{cause:n}),si(Tt(t,a))),e=e.current.alternate,e.flags|=65536,i&=-i,e.lanes|=i,n=Tt(n,a),i=bc(e.stateNode,n,i),ro(e,i),ke!==4&&(ke=2)),!1;var r=Error(D(520),{cause:n});if(r=Tt(r,a),Kl===null?Kl=[r]:Kl.push(r),ke!==4&&(ke=2),t===null)return!0;n=Tt(n,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=i&-i,a.lanes|=e,e=bc(a.stateNode,n,e),ro(a,e),!1;case 1:if(t=a.type,r=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||r!==null&&typeof r.componentDidCatch=="function"&&(La===null||!La.has(r))))return a.flags|=65536,i&=-i,a.lanes|=i,i=x0(i),g0(i,e,a,n),ro(a,i),!1}a=a.return}while(a!==null);return!1}var Dd=Error(D(461)),Me=!1;function qe(e,t,a,n){t.child=e===null?Ah(t,null,a,n):mn(t,e.child,a,n)}function Ju(e,t,a,n,i){a=a.render;var r=t.ref;if("ref"in n){var s={};for(var o in n)o!=="ref"&&(s[o]=n[o])}else s=n;return gn(t),n=wd(e,t,a,s,r,i),o=Sd(),e!==null&&!Me?(Cd(e,t,i),ha(e,t,i)):(se&&o&&hd(t),t.flags|=1,qe(e,t,n,i),t.child)}function Pu(e,t,a,n,i){if(e===null){var r=a.type;return typeof r=="function"&&!fd(r)&&r.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=r,m0(e,t,r,n,i)):(e=or(a.type,null,n,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(r=e.child,!Md(e,i)){var s=r.memoizedProps;if(a=a.compare,a=a!==null?a:ii,a(s,n)&&e.ref===t.ref)return ha(e,t,i)}return t.flags|=1,e=sa(r,n),e.ref=t.ref,e.return=t,t.child=e}function m0(e,t,a,n,i){if(e!==null){var r=e.memoizedProps;if(ii(r,n)&&e.ref===t.ref)if(Me=!1,t.pendingProps=n=r,Md(e,i))e.flags&131072&&(Me=!0);else return t.lanes=e.lanes,ha(e,t,i)}return yc(e,t,a,n,i)}function b0(e,t,a,n){var i=n.children,r=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.mode==="hidden"){if(t.flags&128){if(r=r!==null?r.baseLanes|a:a,e!==null){for(n=t.child=e.child,i=0;n!==null;)i=i|n.lanes|n.childLanes,n=n.sibling;n=i&~r}else n=0,t.child=null;return ep(e,t,r,a,n)}if(a&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&cr(t,r!==null?r.cachePool:null),r!==null?Iu(t,r):pc(),Oh(t);else return n=t.lanes=536870912,ep(e,t,r!==null?r.baseLanes|a:a,a,n)}else r!==null?(cr(t,r.cachePool),Iu(t,r),Ca(),t.memoizedState=null):(e!==null&&cr(t,null),pc(),Ca());return qe(e,t,i,a),t.child}function Ul(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function ep(e,t,a,n,i){var r=md();return r=r===null?null:{parent:De._currentValue,pool:r},t.memoizedState={baseLanes:a,cachePool:r},e!==null&&cr(t,null),pc(),Oh(t),e!==null&&hl(e,t,n,!0),t.childLanes=i,null}function pr(e,t){return t=Yr({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function tp(e,t,a){return mn(t,e.child,null,a),e=pr(t,t.pendingProps),e.flags|=2,ht(t),t.memoizedState=null,e}function H1(e,t,a){var n=t.pendingProps,i=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(se){if(n.mode==="hidden")return e=pr(t,n),t.lanes=536870912,Ul(null,e);if(fc(t),(e=je)?(e=dx(e,At),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:qa!==null?{id:Yt,overflow:It}:null,retryLane:536870912,hydrationErrors:null},a=Sh(e),a.return=t,t.child=a,Xe=t,je=null)):e=null,e===null)throw Va(t);return t.lanes=536870912,null}return pr(t,n)}var r=e.memoizedState;if(r!==null){var s=r.dehydrated;if(fc(t),i)if(t.flags&256)t.flags&=-257,t=tp(e,t,a);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(D(558));else if(Me||hl(e,t,a,!1),i=(a&e.childLanes)!==0,Me||i){if(n=me,n!==null&&(s=Zf(n,a),s!==0&&s!==r.retryLane))throw r.retryLane=s,Nn(e,s),ot(n,e,s),Dd;Xr(),t=tp(e,t,a)}else e=r.treeContext,je=Ot(s.nextSibling),Xe=t,se=!0,Oa=null,At=!1,e!==null&&zh(t,e),t=pr(t,n),t.flags|=4096;return t}return e=sa(e.child,{mode:n.mode,children:n.children}),e.ref=t.ref,t.child=e,e.return=t,e}function fr(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(D(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function yc(e,t,a,n,i){return gn(t),a=wd(e,t,a,n,void 0,i),n=Sd(),e!==null&&!Me?(Cd(e,t,i),ha(e,t,i)):(se&&n&&hd(t),t.flags|=1,qe(e,t,a,i),t.child)}function ap(e,t,a,n,i,r){return gn(t),t.updateQueue=null,a=Mh(t,n,a,i),Dh(e),n=Sd(),e!==null&&!Me?(Cd(e,t,r),ha(e,t,r)):(se&&n&&hd(t),t.flags|=1,qe(e,t,a,r),t.child)}function np(e,t,a,n,i){if(gn(t),t.stateNode===null){var r=In,s=a.contextType;typeof s=="object"&&s!==null&&(r=We(s)),r=new a(n,r),t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=mc,t.stateNode=r,r._reactInternals=t,r=t.stateNode,r.props=n,r.state=t.memoizedState,r.refs={},yd(t),s=a.contextType,r.context=typeof s=="object"&&s!==null?We(s):In,r.state=t.memoizedState,s=a.getDerivedStateFromProps,typeof s=="function"&&(oo(t,a,s,n),r.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(s=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),s!==r.state&&mc.enqueueReplaceState(r,r.state,null),Ql(t,n,r,i),Wl(),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308),n=!0}else if(e===null){r=t.stateNode;var o=t.memoizedProps,c=yn(a,o);r.props=c;var d=r.context,p=a.contextType;s=In,typeof p=="object"&&p!==null&&(s=We(p));var f=a.getDerivedStateFromProps;p=typeof f=="function"||typeof r.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,p||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(o||d!==s)&&$u(t,r,n,s),ja=!1;var u=t.memoizedState;r.state=u,Ql(t,n,r,i),Wl(),d=t.memoizedState,o||u!==d||ja?(typeof f=="function"&&(oo(t,a,f,n),d=t.memoizedState),(c=ja||Zu(t,a,c,n,u,d,s))?(p||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount()),typeof r.componentDidMount=="function"&&(t.flags|=4194308)):(typeof r.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=d),r.props=n,r.state=d,r.context=s,n=c):(typeof r.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{r=t.stateNode,dc(e,t),s=t.memoizedProps,p=yn(a,s),r.props=p,f=t.pendingProps,u=r.context,d=a.contextType,c=In,typeof d=="object"&&d!==null&&(c=We(d)),o=a.getDerivedStateFromProps,(d=typeof o=="function"||typeof r.getSnapshotBeforeUpdate=="function")||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(s!==f||u!==c)&&$u(t,r,n,c),ja=!1,u=t.memoizedState,r.state=u,Ql(t,n,r,i),Wl();var x=t.memoizedState;s!==f||u!==x||ja||e!==null&&e.dependencies!==null&&Dr(e.dependencies)?(typeof o=="function"&&(oo(t,a,o,n),x=t.memoizedState),(p=ja||Zu(t,a,p,n,u,x,c)||e!==null&&e.dependencies!==null&&Dr(e.dependencies))?(d||typeof r.UNSAFE_componentWillUpdate!="function"&&typeof r.componentWillUpdate!="function"||(typeof r.componentWillUpdate=="function"&&r.componentWillUpdate(n,x,c),typeof r.UNSAFE_componentWillUpdate=="function"&&r.UNSAFE_componentWillUpdate(n,x,c)),typeof r.componentDidUpdate=="function"&&(t.flags|=4),typeof r.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof r.componentDidUpdate!="function"||s===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=x),r.props=n,r.state=x,r.context=c,n=p):(typeof r.componentDidUpdate!="function"||s===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),n=!1)}return r=n,fr(e,t),n=(t.flags&128)!==0,r||n?(r=t.stateNode,a=n&&typeof a.getDerivedStateFromError!="function"?null:r.render(),t.flags|=1,e!==null&&n?(t.child=mn(t,e.child,null,i),t.child=mn(t,null,a,i)):qe(e,t,a,i),t.memoizedState=r.state,e=t.child):e=ha(e,t,i),e}function lp(e,t,a,n){return xn(),t.flags|=256,qe(e,t,a,n),t.child}var co={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function uo(e){return{baseLanes:e,cachePool:kh()}}function po(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=gt),e}function y0(e,t,a){var n=t.pendingProps,i=!1,r=(t.flags&128)!==0,s;if((s=r)||(s=e!==null&&e.memoizedState===null?!1:(Ee.current&2)!==0),s&&(i=!0,t.flags&=-129),s=(t.flags&32)!==0,t.flags&=-33,e===null){if(se){if(i?Sa(t):Ca(),(e=je)?(e=dx(e,At),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:qa!==null?{id:Yt,overflow:It}:null,retryLane:536870912,hydrationErrors:null},a=Sh(e),a.return=t,t.child=a,Xe=t,je=null)):e=null,e===null)throw Va(t);return Oc(e)?t.lanes=32:t.lanes=536870912,null}var o=n.children;return n=n.fallback,i?(Ca(),i=t.mode,o=Yr({mode:"hidden",children:o},i),n=on(n,i,a,null),o.return=t,n.return=t,o.sibling=n,t.child=o,n=t.child,n.memoizedState=uo(a),n.childLanes=po(e,s,a),t.memoizedState=co,Ul(null,n)):(Sa(t),vc(t,o))}var c=e.memoizedState;if(c!==null&&(o=c.dehydrated,o!==null)){if(r)t.flags&256?(Sa(t),t.flags&=-257,t=fo(e,t,a)):t.memoizedState!==null?(Ca(),t.child=e.child,t.flags|=128,t=null):(Ca(),o=n.fallback,i=t.mode,n=Yr({mode:"visible",children:n.children},i),o=on(o,i,a,null),o.flags|=2,n.return=t,o.return=t,n.sibling=o,t.child=n,mn(t,e.child,null,a),n=t.child,n.memoizedState=uo(a),n.childLanes=po(e,s,a),t.memoizedState=co,t=Ul(null,n));else if(Sa(t),Oc(o)){if(s=o.nextSibling&&o.nextSibling.dataset,s)var d=s.dgst;s=d,n=Error(D(419)),n.stack="",n.digest=s,si({value:n,source:null,stack:null}),t=fo(e,t,a)}else if(Me||hl(e,t,a,!1),s=(a&e.childLanes)!==0,Me||s){if(s=me,s!==null&&(n=Zf(s,a),n!==0&&n!==c.retryLane))throw c.retryLane=n,Nn(e,n),ot(s,e,n),Dd;Bc(o)||Xr(),t=fo(e,t,a)}else Bc(o)?(t.flags|=192,t.child=e.child,t=null):(e=c.treeContext,je=Ot(o.nextSibling),Xe=t,se=!0,Oa=null,At=!1,e!==null&&zh(t,e),t=vc(t,n.children),t.flags|=4096);return t}return i?(Ca(),o=n.fallback,i=t.mode,c=e.child,d=c.sibling,n=sa(c,{mode:"hidden",children:n.children}),n.subtreeFlags=c.subtreeFlags&65011712,d!==null?o=sa(d,o):(o=on(o,i,a,null),o.flags|=2),o.return=t,n.return=t,n.sibling=o,t.child=n,Ul(null,n),n=t.child,o=e.child.memoizedState,o===null?o=uo(a):(i=o.cachePool,i!==null?(c=De._currentValue,i=i.parent!==c?{parent:c,pool:c}:i):i=kh(),o={baseLanes:o.baseLanes|a,cachePool:i}),n.memoizedState=o,n.childLanes=po(e,s,a),t.memoizedState=co,Ul(e.child,n)):(Sa(t),a=e.child,e=a.sibling,a=sa(a,{mode:"visible",children:n.children}),a.return=t,a.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=a,t.memoizedState=null,a)}function vc(e,t){return t=Yr({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Yr(e,t){return e=xt(22,e,null,t),e.lanes=0,e}function fo(e,t,a){return mn(t,e.child,null,a),e=vc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function ip(e,t,a){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),sc(e.return,t,a)}function ho(e,t,a,n,i,r){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:a,tailMode:i,treeForkCount:r}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=n,s.tail=a,s.tailMode=i,s.treeForkCount=r)}function v0(e,t,a){var n=t.pendingProps,i=n.revealOrder,r=n.tail;n=n.children;var s=Ee.current,o=(s&2)!==0;if(o?(s=s&1|2,t.flags|=128):s&=1,be(Ee,s),qe(e,t,n,a),n=se?ri:0,!o&&e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ip(e,a,t);else if(e.tag===19)ip(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case"forwards":for(a=t.child,i=null;a!==null;)e=a.alternate,e!==null&&Ur(e)===null&&(i=a),a=a.sibling;a=i,a===null?(i=t.child,t.child=null):(i=a.sibling,a.sibling=null),ho(t,!1,i,a,r,n);break;case"backwards":case"unstable_legacy-backwards":for(a=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Ur(e)===null){t.child=i;break}e=i.sibling,i.sibling=a,a=i,i=e}ho(t,!0,a,null,r,n);break;case"together":ho(t,!1,null,null,void 0,n);break;default:t.memoizedState=null}return t.child}function ha(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),Wa|=t.lanes,!(a&t.childLanes))if(e!==null){if(hl(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(D(153));if(t.child!==null){for(e=t.child,a=sa(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=sa(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function Md(e,t){return e.lanes&t?!0:(e=e.dependencies,!!(e!==null&&Dr(e)))}function _1(e,t,a){switch(t.tag){case 3:kr(t,t.stateNode.containerInfo),wa(t,De,e.memoizedState.cache),xn();break;case 27:case 5:Fo(t);break;case 4:kr(t,t.stateNode.containerInfo);break;case 10:wa(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,fc(t),null;break;case 13:var n=t.memoizedState;if(n!==null)return n.dehydrated!==null?(Sa(t),t.flags|=128,null):a&t.child.childLanes?y0(e,t,a):(Sa(t),e=ha(e,t,a),e!==null?e.sibling:null);Sa(t);break;case 19:var i=(e.flags&128)!==0;if(n=(a&t.childLanes)!==0,n||(hl(e,t,a,!1),n=(a&t.childLanes)!==0),i){if(n)return v0(e,t,a);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),be(Ee,Ee.current),n)break;return null;case 22:return t.lanes=0,b0(e,t,a,t.pendingProps);case 24:wa(t,De,e.memoizedState.cache)}return ha(e,t,a)}function j0(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)Me=!0;else{if(!Md(e,a)&&!(t.flags&128))return Me=!1,_1(e,t,a);Me=!!(e.flags&131072)}else Me=!1,se&&t.flags&1048576&&Ch(t,ri,t.index);switch(t.lanes=0,t.tag){case 16:e:{var n=t.pendingProps;if(e=an(t.elementType),t.type=e,typeof e=="function")fd(e)?(n=yn(e,n),t.tag=1,t=np(null,t,e,n,a)):(t.tag=0,t=yc(null,t,e,n,a));else{if(e!=null){var i=e.$$typeof;if(i===Pc){t.tag=11,t=Ju(null,t,e,n,a);break e}else if(i===ed){t.tag=14,t=Pu(null,t,e,n,a);break e}}throw t=Wo(e)||e,Error(D(306,t,""))}}return t;case 0:return yc(e,t,t.type,t.pendingProps,a);case 1:return n=t.type,i=yn(n,t.pendingProps),np(e,t,n,i,a);case 3:e:{if(kr(t,t.stateNode.containerInfo),e===null)throw Error(D(387));n=t.pendingProps;var r=t.memoizedState;i=r.element,dc(e,t),Ql(t,n,null,a);var s=t.memoizedState;if(n=s.cache,wa(t,De,n),n!==r.cache&&oc(t,[De],a,!0),Wl(),n=s.element,r.isDehydrated)if(r={element:n,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=r,t.memoizedState=r,t.flags&256){t=lp(e,t,n,a);break e}else if(n!==i){i=Tt(Error(D(424)),t),si(i),t=lp(e,t,n,a);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(je=Ot(e.firstChild),Xe=t,se=!0,Oa=null,At=!0,a=Ah(t,null,n,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(xn(),n===i){t=ha(e,t,a);break e}qe(e,t,n,a)}t=t.child}return t;case 26:return fr(e,t),e===null?(a=zp(t.type,null,t.pendingProps,null))?t.memoizedState=a:se||(a=t.type,e=t.pendingProps,n=Zr(Ba.current).createElement(a),n[Ve]=t,n[ut]=e,Qe(n,a,e),Ge(n),t.stateNode=n):t.memoizedState=zp(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Fo(t),e===null&&se&&(n=t.stateNode=ux(t.type,t.pendingProps,Ba.current),Xe=t,At=!0,i=je,$a(t.type)?(Dc=i,je=Ot(n.firstChild)):je=i),qe(e,t,t.pendingProps.children,a),fr(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&se&&((i=n=je)&&(n=xb(n,t.type,t.pendingProps,At),n!==null?(t.stateNode=n,Xe=t,je=Ot(n.firstChild),At=!1,i=!0):i=!1),i||Va(t)),Fo(t),i=t.type,r=t.pendingProps,s=e!==null?e.memoizedProps:null,n=r.children,Ac(i,r)?n=null:s!==null&&Ac(i,s)&&(t.flags|=32),t.memoizedState!==null&&(i=wd(e,t,A1,null,null,a),fi._currentValue=i),fr(e,t),qe(e,t,n,a),t.child;case 6:return e===null&&se&&((e=a=je)&&(a=gb(a,t.pendingProps,At),a!==null?(t.stateNode=a,Xe=t,je=null,e=!0):e=!1),e||Va(t)),null;case 13:return y0(e,t,a);case 4:return kr(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=mn(t,null,n,a):qe(e,t,n,a),t.child;case 11:return Ju(e,t,t.type,t.pendingProps,a);case 7:return qe(e,t,t.pendingProps,a),t.child;case 8:return qe(e,t,t.pendingProps.children,a),t.child;case 12:return qe(e,t,t.pendingProps.children,a),t.child;case 10:return n=t.pendingProps,wa(t,t.type,n.value),qe(e,t,n.children,a),t.child;case 9:return i=t.type._context,n=t.pendingProps.children,gn(t),i=We(i),n=n(i),t.flags|=1,qe(e,t,n,a),t.child;case 14:return Pu(e,t,t.type,t.pendingProps,a);case 15:return m0(e,t,t.type,t.pendingProps,a);case 19:return v0(e,t,a);case 31:return H1(e,t,a);case 22:return b0(e,t,a,t.pendingProps);case 24:return gn(t),n=We(De),e===null?(i=md(),i===null&&(i=me,r=gd(),i.pooledCache=r,r.refCount++,r!==null&&(i.pooledCacheLanes|=a),i=r),t.memoizedState={parent:n,cache:i},yd(t),wa(t,De,i)):(e.lanes&a&&(dc(e,t),Ql(t,null,null,a),Wl()),i=e.memoizedState,r=t.memoizedState,i.parent!==n?(i={parent:n,cache:n},t.memoizedState=i,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=i),wa(t,De,n)):(n=r.cache,wa(t,De,n),n!==i.cache&&oc(t,[De],a,!0))),qe(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(D(156,t.tag))}function Jt(e){e.flags|=4}function xo(e,t,a,n,i){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(X0())e.flags|=8192;else throw dn=Mr,bd}else e.flags&=-16777217}function rp(e,t){if(t.type!=="stylesheet"||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!hx(t))if(X0())e.flags|=8192;else throw dn=Mr,bd}function Wi(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Wf():536870912,e.lanes|=t,il|=t)}function El(e,t){if(!se)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var n=null;a!==null;)a.alternate!==null&&(n=a),a=a.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function ye(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,n=0;if(t)for(var i=e.child;i!==null;)a|=i.lanes|i.childLanes,n|=i.subtreeFlags&65011712,n|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)a|=i.lanes|i.childLanes,n|=i.subtreeFlags,n|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=n,e.childLanes=a,t}function G1(e,t,a){var n=t.pendingProps;switch(xd(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ye(t),null;case 1:return ye(t),null;case 3:return a=t.stateNode,n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),oa(De),Pn(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Tn(t)?Jt(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,io())),ye(t),null;case 26:var i=t.type,r=t.memoizedState;return e===null?(Jt(t),r!==null?(ye(t),rp(t,r)):(ye(t),xo(t,i,null,n,a))):r?r!==e.memoizedState?(Jt(t),ye(t),rp(t,r)):(ye(t),t.flags&=-16777217):(e=e.memoizedProps,e!==n&&Jt(t),ye(t),xo(t,i,e,n,a)),null;case 27:if(Er(t),a=Ba.current,i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&Jt(t);else{if(!n){if(t.stateNode===null)throw Error(D(166));return ye(t),null}e=Xt.current,Tn(t)?Mu(t):(e=ux(i,n,a),t.stateNode=e,Jt(t))}return ye(t),null;case 5:if(Er(t),i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&Jt(t);else{if(!n){if(t.stateNode===null)throw Error(D(166));return ye(t),null}if(r=Xt.current,Tn(t))Mu(t);else{var s=Zr(Ba.current);switch(r){case 1:r=s.createElementNS("http://www.w3.org/2000/svg",i);break;case 2:r=s.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;default:switch(i){case"svg":r=s.createElementNS("http://www.w3.org/2000/svg",i);break;case"math":r=s.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;case"script":r=s.createElement("div"),r.innerHTML="<script><\/script>",r=r.removeChild(r.firstChild);break;case"select":r=typeof n.is=="string"?s.createElement("select",{is:n.is}):s.createElement("select"),n.multiple?r.multiple=!0:n.size&&(r.size=n.size);break;default:r=typeof n.is=="string"?s.createElement(i,{is:n.is}):s.createElement(i)}}r[Ve]=t,r[ut]=n;e:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)r.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break e;for(;s.sibling===null;){if(s.return===null||s.return===t)break e;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=r;e:switch(Qe(r,i,n),i){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}n&&Jt(t)}}return ye(t),xo(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,a),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==n&&Jt(t);else{if(typeof n!="string"&&t.stateNode===null)throw Error(D(166));if(e=Ba.current,Tn(t)){if(e=t.stateNode,a=t.memoizedProps,n=null,i=Xe,i!==null)switch(i.tag){case 27:case 5:n=i.memoizedProps}e[Ve]=t,e=!!(e.nodeValue===a||n!==null&&n.suppressHydrationWarning===!0||sx(e.nodeValue,a)),e||Va(t,!0)}else e=Zr(e).createTextNode(n),e[Ve]=t,t.stateNode=e}return ye(t),null;case 31:if(a=t.memoizedState,e===null||e.memoizedState!==null){if(n=Tn(t),a!==null){if(e===null){if(!n)throw Error(D(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(D(557));e[Ve]=t}else xn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;ye(t),e=!1}else a=io(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return t.flags&256?(ht(t),t):(ht(t),null);if(t.flags&128)throw Error(D(558))}return ye(t),null;case 13:if(n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(i=Tn(t),n!==null&&n.dehydrated!==null){if(e===null){if(!i)throw Error(D(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(D(317));i[Ve]=t}else xn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;ye(t),i=!1}else i=io(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=i),i=!0;if(!i)return t.flags&256?(ht(t),t):(ht(t),null)}return ht(t),t.flags&128?(t.lanes=a,t):(a=n!==null,e=e!==null&&e.memoizedState!==null,a&&(n=t.child,i=null,n.alternate!==null&&n.alternate.memoizedState!==null&&n.alternate.memoizedState.cachePool!==null&&(i=n.alternate.memoizedState.cachePool.pool),r=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(r=n.memoizedState.cachePool.pool),r!==i&&(n.flags|=2048)),a!==e&&a&&(t.child.flags|=8192),Wi(t,t.updateQueue),ye(t),null);case 4:return Pn(),e===null&&Id(t.stateNode.containerInfo),ye(t),null;case 10:return oa(t.type),ye(t),null;case 19:if(Ye(Ee),n=t.memoizedState,n===null)return ye(t),null;if(i=(t.flags&128)!==0,r=n.rendering,r===null)if(i)El(n,!1);else{if(ke!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(r=Ur(e),r!==null){for(t.flags|=128,El(n,!1),e=r.updateQueue,t.updateQueue=e,Wi(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)wh(a,e),a=a.sibling;return be(Ee,Ee.current&1|2),se&&aa(t,n.treeForkCount),t.child}e=e.sibling}n.tail!==null&&mt()>qr&&(t.flags|=128,i=!0,El(n,!1),t.lanes=4194304)}else{if(!i)if(e=Ur(r),e!==null){if(t.flags|=128,i=!0,e=e.updateQueue,t.updateQueue=e,Wi(t,e),El(n,!0),n.tail===null&&n.tailMode==="hidden"&&!r.alternate&&!se)return ye(t),null}else 2*mt()-n.renderingStartTime>qr&&a!==536870912&&(t.flags|=128,i=!0,El(n,!1),t.lanes=4194304);n.isBackwards?(r.sibling=t.child,t.child=r):(e=n.last,e!==null?e.sibling=r:t.child=r,n.last=r)}return n.tail!==null?(e=n.tail,n.rendering=e,n.tail=e.sibling,n.renderingStartTime=mt(),e.sibling=null,a=Ee.current,be(Ee,i?a&1|2:a&1),se&&aa(t,n.treeForkCount),e):(ye(t),null);case 22:case 23:return ht(t),vd(),n=t.memoizedState!==null,e!==null?e.memoizedState!==null!==n&&(t.flags|=8192):n&&(t.flags|=8192),n?a&536870912&&!(t.flags&128)&&(ye(t),t.subtreeFlags&6&&(t.flags|=8192)):ye(t),a=t.updateQueue,a!==null&&Wi(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),n=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),n!==a&&(t.flags|=2048),e!==null&&Ye(cn),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),oa(De),ye(t),null;case 25:return null;case 30:return null}throw Error(D(156,t.tag))}function Y1(e,t){switch(xd(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return oa(De),Pn(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Er(t),null;case 31:if(t.memoizedState!==null){if(ht(t),t.alternate===null)throw Error(D(340));xn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(ht(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(D(340));xn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Ye(Ee),null;case 4:return Pn(),null;case 10:return oa(t.type),null;case 22:case 23:return ht(t),vd(),e!==null&&Ye(cn),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return oa(De),null;case 25:return null;default:return null}}function w0(e,t){switch(xd(t),t.tag){case 3:oa(De),Pn();break;case 26:case 27:case 5:Er(t);break;case 4:Pn();break;case 31:t.memoizedState!==null&&ht(t);break;case 13:ht(t);break;case 19:Ye(Ee);break;case 10:oa(t.type);break;case 22:case 23:ht(t),vd(),e!==null&&Ye(cn);break;case 24:oa(De)}}function ki(e,t){try{var a=t.updateQueue,n=a!==null?a.lastEffect:null;if(n!==null){var i=n.next;a=i;do{if((a.tag&e)===e){n=void 0;var r=a.create,s=a.inst;n=r(),s.destroy=n}a=a.next}while(a!==i)}}catch(o){pe(t,t.return,o)}}function Xa(e,t,a){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var r=i.next;n=r;do{if((n.tag&e)===e){var s=n.inst,o=s.destroy;if(o!==void 0){s.destroy=void 0,i=t;var c=a,d=o;try{d()}catch(p){pe(i,c,p)}}}n=n.next}while(n!==r)}}catch(p){pe(t,t.return,p)}}function S0(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{Bh(t,a)}catch(n){pe(e,e.return,n)}}}function C0(e,t,a){a.props=yn(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(n){pe(e,t,n)}}function Zl(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var n=e.stateNode;break;case 30:n=e.stateNode;break;default:n=e.stateNode}typeof a=="function"?e.refCleanup=a(n):a.current=n}}catch(i){pe(e,t,i)}}function qt(e,t){var a=e.ref,n=e.refCleanup;if(a!==null)if(typeof n=="function")try{n()}catch(i){pe(e,t,i)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(i){pe(e,t,i)}else a.current=null}function z0(e){var t=e.type,a=e.memoizedProps,n=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break e;case"img":a.src?n.src=a.src:a.srcSet&&(n.srcset=a.srcSet)}}catch(i){pe(e,e.return,i)}}function go(e,t,a){try{var n=e.stateNode;cb(n,e.type,a,t),n[ut]=t}catch(i){pe(e,e.return,i)}}function N0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&$a(e.type)||e.tag===4}function mo(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||N0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&$a(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function jc(e,t,a){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=ia));else if(n!==4&&(n===27&&$a(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(jc(e,t,a),e=e.sibling;e!==null;)jc(e,t,a),e=e.sibling}function Ir(e,t,a){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(n!==4&&(n===27&&$a(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Ir(e,t,a),e=e.sibling;e!==null;)Ir(e,t,a),e=e.sibling}function k0(e){var t=e.stateNode,a=e.memoizedProps;try{for(var n=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Qe(t,n,a),t[Ve]=e,t[ut]=a}catch(r){pe(e,e.return,r)}}var na=!1,Oe=!1,bo=!1,sp=typeof WeakSet=="function"?WeakSet:Set,_e=null;function I1(e,t){if(e=e.containerInfo,Ec=Pr,e=hh(e),dd(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var n=a.getSelection&&a.getSelection();if(n&&n.rangeCount!==0){a=n.anchorNode;var i=n.anchorOffset,r=n.focusNode;n=n.focusOffset;try{a.nodeType,r.nodeType}catch{a=null;break e}var s=0,o=-1,c=-1,d=0,p=0,f=e,u=null;t:for(;;){for(var x;f!==a||i!==0&&f.nodeType!==3||(o=s+i),f!==r||n!==0&&f.nodeType!==3||(c=s+n),f.nodeType===3&&(s+=f.nodeValue.length),(x=f.firstChild)!==null;)u=f,f=x;for(;;){if(f===e)break t;if(u===a&&++d===i&&(o=s),u===r&&++p===n&&(c=s),(x=f.nextSibling)!==null)break;f=u,u=f.parentNode}f=x}a=o===-1||c===-1?null:{start:o,end:c}}else a=null}a=a||{start:0,end:0}}else a=null;for(Tc={focusedElem:e,selectionRange:a},Pr=!1,_e=t;_e!==null;)if(t=_e,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,_e=e;else for(;_e!==null;){switch(t=_e,r=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)i=e[a],i.ref.impl=i.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&r!==null){e=void 0,a=t,i=r.memoizedProps,r=r.memoizedState,n=a.stateNode;try{var m=yn(a.type,i);e=n.getSnapshotBeforeUpdate(m,r),n.__reactInternalSnapshotBeforeUpdate=e}catch(j){pe(a,a.return,j)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)Rc(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Rc(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(D(163))}if(e=t.sibling,e!==null){e.return=t.return,_e=e;break}_e=t.return}}function E0(e,t,a){var n=a.flags;switch(a.tag){case 0:case 11:case 15:ea(e,a),n&4&&ki(5,a);break;case 1:if(ea(e,a),n&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(s){pe(a,a.return,s)}else{var i=yn(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(s){pe(a,a.return,s)}}n&64&&S0(a),n&512&&Zl(a,a.return);break;case 3:if(ea(e,a),n&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{Bh(e,t)}catch(s){pe(a,a.return,s)}}break;case 27:t===null&&n&4&&k0(a);case 26:case 5:ea(e,a),t===null&&n&4&&z0(a),n&512&&Zl(a,a.return);break;case 12:ea(e,a);break;case 31:ea(e,a),n&4&&R0(e,a);break;case 13:ea(e,a),n&4&&B0(e,a),n&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=K1.bind(null,a),mb(e,a))));break;case 22:if(n=a.memoizedState!==null||na,!n){t=t!==null&&t.memoizedState!==null||Oe,i=na;var r=Oe;na=n,(Oe=t)&&!r?ta(e,a,(a.subtreeFlags&8772)!==0):ea(e,a),na=i,Oe=r}break;case 30:break;default:ea(e,a)}}function T0(e){var t=e.alternate;t!==null&&(e.alternate=null,T0(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&ld(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var ze=null,it=!1;function Pt(e,t,a){for(a=a.child;a!==null;)A0(e,t,a),a=a.sibling}function A0(e,t,a){if(bt&&typeof bt.onCommitFiberUnmount=="function")try{bt.onCommitFiberUnmount(vi,a)}catch{}switch(a.tag){case 26:Oe||qt(a,t),Pt(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Oe||qt(a,t);var n=ze,i=it;$a(a.type)&&(ze=a.stateNode,it=!1),Pt(e,t,a),Pl(a.stateNode),ze=n,it=i;break;case 5:Oe||qt(a,t);case 6:if(n=ze,i=it,ze=null,Pt(e,t,a),ze=n,it=i,ze!==null)if(it)try{(ze.nodeType===9?ze.body:ze.nodeName==="HTML"?ze.ownerDocument.body:ze).removeChild(a.stateNode)}catch(r){pe(a,t,r)}else try{ze.removeChild(a.stateNode)}catch(r){pe(a,t,r)}break;case 18:ze!==null&&(it?(e=ze,vp(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),cl(e)):vp(ze,a.stateNode));break;case 4:n=ze,i=it,ze=a.stateNode.containerInfo,it=!0,Pt(e,t,a),ze=n,it=i;break;case 0:case 11:case 14:case 15:Xa(2,a,t),Oe||Xa(4,a,t),Pt(e,t,a);break;case 1:Oe||(qt(a,t),n=a.stateNode,typeof n.componentWillUnmount=="function"&&C0(a,t,n)),Pt(e,t,a);break;case 21:Pt(e,t,a);break;case 22:Oe=(n=Oe)||a.memoizedState!==null,Pt(e,t,a),Oe=n;break;default:Pt(e,t,a)}}function R0(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{cl(e)}catch(a){pe(t,t.return,a)}}}function B0(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{cl(e)}catch(a){pe(t,t.return,a)}}function q1(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new sp),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new sp),t;default:throw Error(D(435,e.tag))}}function Qi(e,t){var a=q1(e);t.forEach(function(n){if(!a.has(n)){a.add(n);var i=J1.bind(null,e,n);n.then(i,i)}})}function nt(e,t){var a=t.deletions;if(a!==null)for(var n=0;n<a.length;n++){var i=a[n],r=e,s=t,o=s;e:for(;o!==null;){switch(o.tag){case 27:if($a(o.type)){ze=o.stateNode,it=!1;break e}break;case 5:ze=o.stateNode,it=!1;break e;case 3:case 4:ze=o.stateNode.containerInfo,it=!0;break e}o=o.return}if(ze===null)throw Error(D(160));A0(r,s,i),ze=null,it=!1,r=i.alternate,r!==null&&(r.return=null),i.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)O0(t,e),t=t.sibling}var Lt=null;function O0(e,t){var a=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:nt(t,e),lt(e),n&4&&(Xa(3,e,e.return),ki(3,e),Xa(5,e,e.return));break;case 1:nt(t,e),lt(e),n&512&&(Oe||a===null||qt(a,a.return)),n&64&&na&&(e=e.updateQueue,e!==null&&(n=e.callbacks,n!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?n:a.concat(n))));break;case 26:var i=Lt;if(nt(t,e),lt(e),n&512&&(Oe||a===null||qt(a,a.return)),n&4){var r=a!==null?a.memoizedState:null;if(n=e.memoizedState,a===null)if(n===null)if(e.stateNode===null){e:{n=e.type,a=e.memoizedProps,i=i.ownerDocument||i;t:switch(n){case"title":r=i.getElementsByTagName("title")[0],(!r||r[Si]||r[Ve]||r.namespaceURI==="http://www.w3.org/2000/svg"||r.hasAttribute("itemprop"))&&(r=i.createElement(n),i.head.insertBefore(r,i.querySelector("head > title"))),Qe(r,n,a),r[Ve]=e,Ge(r),n=r;break e;case"link":var s=kp("link","href",i).get(n+(a.href||""));if(s){for(var o=0;o<s.length;o++)if(r=s[o],r.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&r.getAttribute("rel")===(a.rel==null?null:a.rel)&&r.getAttribute("title")===(a.title==null?null:a.title)&&r.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){s.splice(o,1);break t}}r=i.createElement(n),Qe(r,n,a),i.head.appendChild(r);break;case"meta":if(s=kp("meta","content",i).get(n+(a.content||""))){for(o=0;o<s.length;o++)if(r=s[o],r.getAttribute("content")===(a.content==null?null:""+a.content)&&r.getAttribute("name")===(a.name==null?null:a.name)&&r.getAttribute("property")===(a.property==null?null:a.property)&&r.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&r.getAttribute("charset")===(a.charSet==null?null:a.charSet)){s.splice(o,1);break t}}r=i.createElement(n),Qe(r,n,a),i.head.appendChild(r);break;default:throw Error(D(468,n))}r[Ve]=e,Ge(r),n=r}e.stateNode=n}else Ep(i,e.type,e.stateNode);else e.stateNode=Np(i,n,e.memoizedProps);else r!==n?(r===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):r.count--,n===null?Ep(i,e.type,e.stateNode):Np(i,n,e.memoizedProps)):n===null&&e.stateNode!==null&&go(e,e.memoizedProps,a.memoizedProps)}break;case 27:nt(t,e),lt(e),n&512&&(Oe||a===null||qt(a,a.return)),a!==null&&n&4&&go(e,e.memoizedProps,a.memoizedProps);break;case 5:if(nt(t,e),lt(e),n&512&&(Oe||a===null||qt(a,a.return)),e.flags&32){i=e.stateNode;try{tl(i,"")}catch(m){pe(e,e.return,m)}}n&4&&e.stateNode!=null&&(i=e.memoizedProps,go(e,i,a!==null?a.memoizedProps:i)),n&1024&&(bo=!0);break;case 6:if(nt(t,e),lt(e),n&4){if(e.stateNode===null)throw Error(D(162));n=e.memoizedProps,a=e.stateNode;try{a.nodeValue=n}catch(m){pe(e,e.return,m)}}break;case 3:if(gr=null,i=Lt,Lt=$r(t.containerInfo),nt(t,e),Lt=i,lt(e),n&4&&a!==null&&a.memoizedState.isDehydrated)try{cl(t.containerInfo)}catch(m){pe(e,e.return,m)}bo&&(bo=!1,D0(e));break;case 4:n=Lt,Lt=$r(e.stateNode.containerInfo),nt(t,e),lt(e),Lt=n;break;case 12:nt(t,e),lt(e);break;case 31:nt(t,e),lt(e),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,Qi(e,n)));break;case 13:nt(t,e),lt(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(ws=mt()),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,Qi(e,n)));break;case 22:i=e.memoizedState!==null;var c=a!==null&&a.memoizedState!==null,d=na,p=Oe;if(na=d||i,Oe=p||c,nt(t,e),Oe=p,na=d,lt(e),n&8192)e:for(t=e.stateNode,t._visibility=i?t._visibility&-2:t._visibility|1,i&&(a===null||c||na||Oe||nn(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){c=a=t;try{if(r=c.stateNode,i)s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none";else{o=c.stateNode;var f=c.memoizedProps.style,u=f!=null&&f.hasOwnProperty("display")?f.display:null;o.style.display=u==null||typeof u=="boolean"?"":(""+u).trim()}}catch(m){pe(c,c.return,m)}}}else if(t.tag===6){if(a===null){c=t;try{c.stateNode.nodeValue=i?"":c.memoizedProps}catch(m){pe(c,c.return,m)}}}else if(t.tag===18){if(a===null){c=t;try{var x=c.stateNode;i?jp(x,!0):jp(c.stateNode,!1)}catch(m){pe(c,c.return,m)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}n&4&&(n=e.updateQueue,n!==null&&(a=n.retryQueue,a!==null&&(n.retryQueue=null,Qi(e,a))));break;case 19:nt(t,e),lt(e),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,Qi(e,n)));break;case 30:break;case 21:break;default:nt(t,e),lt(e)}}function lt(e){var t=e.flags;if(t&2){try{for(var a,n=e.return;n!==null;){if(N0(n)){a=n;break}n=n.return}if(a==null)throw Error(D(160));switch(a.tag){case 27:var i=a.stateNode,r=mo(e);Ir(e,r,i);break;case 5:var s=a.stateNode;a.flags&32&&(tl(s,""),a.flags&=-33);var o=mo(e);Ir(e,o,s);break;case 3:case 4:var c=a.stateNode.containerInfo,d=mo(e);jc(e,d,c);break;default:throw Error(D(161))}}catch(p){pe(e,e.return,p)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function D0(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;D0(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function ea(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)E0(e,t.alternate,t),t=t.sibling}function nn(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Xa(4,t,t.return),nn(t);break;case 1:qt(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&C0(t,t.return,a),nn(t);break;case 27:Pl(t.stateNode);case 26:case 5:qt(t,t.return),nn(t);break;case 22:t.memoizedState===null&&nn(t);break;case 30:nn(t);break;default:nn(t)}e=e.sibling}}function ta(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var n=t.alternate,i=e,r=t,s=r.flags;switch(r.tag){case 0:case 11:case 15:ta(i,r,a),ki(4,r);break;case 1:if(ta(i,r,a),n=r,i=n.stateNode,typeof i.componentDidMount=="function")try{i.componentDidMount()}catch(d){pe(n,n.return,d)}if(n=r,i=n.updateQueue,i!==null){var o=n.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Rh(c[i],o)}catch(d){pe(n,n.return,d)}}a&&s&64&&S0(r),Zl(r,r.return);break;case 27:k0(r);case 26:case 5:ta(i,r,a),a&&n===null&&s&4&&z0(r),Zl(r,r.return);break;case 12:ta(i,r,a);break;case 31:ta(i,r,a),a&&s&4&&R0(i,r);break;case 13:ta(i,r,a),a&&s&4&&B0(i,r);break;case 22:r.memoizedState===null&&ta(i,r,a),Zl(r,r.return);break;case 30:break;default:ta(i,r,a)}t=t.sibling}}function Ld(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&zi(a))}function Ud(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&zi(e))}function Mt(e,t,a,n){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)M0(e,t,a,n),t=t.sibling}function M0(e,t,a,n){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Mt(e,t,a,n),i&2048&&ki(9,t);break;case 1:Mt(e,t,a,n);break;case 3:Mt(e,t,a,n),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&zi(e)));break;case 12:if(i&2048){Mt(e,t,a,n),e=t.stateNode;try{var r=t.memoizedProps,s=r.id,o=r.onPostCommit;typeof o=="function"&&o(s,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(c){pe(t,t.return,c)}}else Mt(e,t,a,n);break;case 31:Mt(e,t,a,n);break;case 13:Mt(e,t,a,n);break;case 23:break;case 22:r=t.stateNode,s=t.alternate,t.memoizedState!==null?r._visibility&2?Mt(e,t,a,n):$l(e,t):r._visibility&2?Mt(e,t,a,n):(r._visibility|=2,Bn(e,t,a,n,(t.subtreeFlags&10256)!==0||!1)),i&2048&&Ld(s,t);break;case 24:Mt(e,t,a,n),i&2048&&Ud(t.alternate,t);break;default:Mt(e,t,a,n)}}function Bn(e,t,a,n,i){for(i=i&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var r=e,s=t,o=a,c=n,d=s.flags;switch(s.tag){case 0:case 11:case 15:Bn(r,s,o,c,i),ki(8,s);break;case 23:break;case 22:var p=s.stateNode;s.memoizedState!==null?p._visibility&2?Bn(r,s,o,c,i):$l(r,s):(p._visibility|=2,Bn(r,s,o,c,i)),i&&d&2048&&Ld(s.alternate,s);break;case 24:Bn(r,s,o,c,i),i&&d&2048&&Ud(s.alternate,s);break;default:Bn(r,s,o,c,i)}t=t.sibling}}function $l(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,n=t,i=n.flags;switch(n.tag){case 22:$l(a,n),i&2048&&Ld(n.alternate,n);break;case 24:$l(a,n),i&2048&&Ud(n.alternate,n);break;default:$l(a,n)}t=t.sibling}}var Hl=8192;function An(e,t,a){if(e.subtreeFlags&Hl)for(e=e.child;e!==null;)L0(e,t,a),e=e.sibling}function L0(e,t,a){switch(e.tag){case 26:An(e,t,a),e.flags&Hl&&e.memoizedState!==null&&Tb(a,Lt,e.memoizedState,e.memoizedProps);break;case 5:An(e,t,a);break;case 3:case 4:var n=Lt;Lt=$r(e.stateNode.containerInfo),An(e,t,a),Lt=n;break;case 22:e.memoizedState===null&&(n=e.alternate,n!==null&&n.memoizedState!==null?(n=Hl,Hl=16777216,An(e,t,a),Hl=n):An(e,t,a));break;default:An(e,t,a)}}function U0(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Tl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var a=0;a<t.length;a++){var n=t[a];_e=n,_0(n,e)}U0(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)H0(e),e=e.sibling}function H0(e){switch(e.tag){case 0:case 11:case 15:Tl(e),e.flags&2048&&Xa(9,e,e.return);break;case 3:Tl(e);break;case 12:Tl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,hr(e)):Tl(e);break;default:Tl(e)}}function hr(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var a=0;a<t.length;a++){var n=t[a];_e=n,_0(n,e)}U0(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Xa(8,t,t.return),hr(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,hr(t));break;default:hr(t)}e=e.sibling}}function _0(e,t){for(;_e!==null;){var a=_e;switch(a.tag){case 0:case 11:case 15:Xa(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var n=a.memoizedState.cachePool.pool;n!=null&&n.refCount++}break;case 24:zi(a.memoizedState.cache)}if(n=a.child,n!==null)n.return=a,_e=n;else e:for(a=e;_e!==null;){n=_e;var i=n.sibling,r=n.return;if(T0(n),n===a){_e=null;break e}if(i!==null){i.return=r,_e=i;break e}_e=r}}}var V1={getCacheForType:function(e){var t=We(De),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a},cacheSignal:function(){return We(De).controller.signal}},X1=typeof WeakMap=="function"?WeakMap:Map,oe=0,me=null,ie=null,re=0,ue=0,ft=null,Ea=!1,gl=!1,Hd=!1,xa=0,ke=0,Wa=0,un=0,_d=0,gt=0,il=0,Kl=null,rt=null,wc=!1,ws=0,G0=0,qr=1/0,Vr=null,La=null,Le=0,Ua=null,rl=null,ca=0,Sc=0,Cc=null,Y0=null,Jl=0,zc=null;function vt(){return oe&2&&re!==0?re&-re:$.T!==null?Yd():$f()}function I0(){if(gt===0)if(!(re&536870912)||se){var e=_i;_i<<=1,!(_i&3932160)&&(_i=262144),gt=e}else gt=536870912;return e=wt.current,e!==null&&(e.flags|=32),gt}function ot(e,t,a){(e===me&&(ue===2||ue===9)||e.cancelPendingCommit!==null)&&(sl(e,0),Ta(e,re,gt,!1)),wi(e,a),(!(oe&2)||e!==me)&&(e===me&&(!(oe&2)&&(un|=a),ke===4&&Ta(e,re,gt,!1)),Ft(e))}function q0(e,t,a){if(oe&6)throw Error(D(327));var n=!a&&(t&127)===0&&(t&e.expiredLanes)===0||ji(e,t),i=n?F1(e,t):yo(e,t,!0),r=n;do{if(i===0){gl&&!n&&Ta(e,t,0,!1);break}else{if(a=e.current.alternate,r&&!W1(a)){i=yo(e,t,!1),r=!1;continue}if(i===2){if(r=t,e.errorRecoveryDisabledLanes&r)var s=0;else s=e.pendingLanes&-536870913,s=s!==0?s:s&536870912?536870912:0;if(s!==0){t=s;e:{var o=e;i=Kl;var c=o.current.memoizedState.isDehydrated;if(c&&(sl(o,s).flags|=256),s=yo(o,s,!1),s!==2){if(Hd&&!c){o.errorRecoveryDisabledLanes|=r,un|=r,i=4;break e}r=rt,rt=i,r!==null&&(rt===null?rt=r:rt.push.apply(rt,r))}i=s}if(r=!1,i!==2)continue}}if(i===1){sl(e,0),Ta(e,t,0,!0);break}e:{switch(n=e,r=i,r){case 0:case 1:throw Error(D(345));case 4:if((t&4194048)!==t)break;case 6:Ta(n,t,gt,!Ea);break e;case 2:rt=null;break;case 3:case 5:break;default:throw Error(D(329))}if((t&62914560)===t&&(i=ws+300-mt(),10<i)){if(Ta(n,t,gt,!Ea),us(n,0,!0)!==0)break e;ca=t,n.timeoutHandle=cx(op.bind(null,n,a,rt,Vr,wc,t,gt,un,il,Ea,r,"Throttled",-0,0),i);break e}op(n,a,rt,Vr,wc,t,gt,un,il,Ea,r,null,-0,0)}}break}while(!0);Ft(e)}function op(e,t,a,n,i,r,s,o,c,d,p,f,u,x){if(e.timeoutHandle=-1,f=t.subtreeFlags,f&8192||(f&16785408)===16785408){f={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ia},L0(t,r,f);var m=(r&62914560)===r?ws-mt():(r&4194048)===r?G0-mt():0;if(m=Ab(f,m),m!==null){ca=r,e.cancelPendingCommit=m(dp.bind(null,e,t,r,a,n,i,s,o,c,p,f,null,u,x)),Ta(e,r,s,!d);return}}dp(e,t,r,a,n,i,s,o,c)}function W1(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var n=0;n<a.length;n++){var i=a[n],r=i.getSnapshot;i=i.value;try{if(!jt(r(),i))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Ta(e,t,a,n){t&=~_d,t&=~un,e.suspendedLanes|=t,e.pingedLanes&=~t,n&&(e.warmLanes|=t),n=e.expirationTimes;for(var i=t;0<i;){var r=31-yt(i),s=1<<r;n[r]=-1,i&=~s}a!==0&&Qf(e,a,t)}function Ss(){return oe&6?!0:(Ei(0),!1)}function Gd(){if(ie!==null){if(ue===0)var e=ie.return;else e=ie,ra=kn=null,zd(e),$n=null,oi=0,e=ie;for(;e!==null;)w0(e.alternate,e),e=e.return;ie=null}}function sl(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,pb(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),ca=0,Gd(),me=e,ie=a=sa(e.current,null),re=t,ue=0,ft=null,Ea=!1,gl=ji(e,t),Hd=!1,il=gt=_d=un=Wa=ke=0,rt=Kl=null,wc=!1,t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var i=31-yt(n),r=1<<i;t|=e[i],n&=~r}return xa=t,xs(),a}function V0(e,t){te=null,$.H=di,t===xl||t===ms?(t=Gu(),ue=3):t===bd?(t=Gu(),ue=4):ue=t===Dd?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,ft=t,ie===null&&(ke=1,Gr(e,Tt(t,e.current)))}function X0(){var e=wt.current;return e===null?!0:(re&4194048)===re?Bt===null:(re&62914560)===re||re&536870912?e===Bt:!1}function W0(){var e=$.H;return $.H=di,e===null?di:e}function Q0(){var e=$.A;return $.A=V1,e}function Xr(){ke=4,Ea||(re&4194048)!==re&&wt.current!==null||(gl=!0),!(Wa&134217727)&&!(un&134217727)||me===null||Ta(me,re,gt,!1)}function yo(e,t,a){var n=oe;oe|=2;var i=W0(),r=Q0();(me!==e||re!==t)&&(Vr=null,sl(e,t)),t=!1;var s=ke;e:do try{if(ue!==0&&ie!==null){var o=ie,c=ft;switch(ue){case 8:Gd(),s=6;break e;case 3:case 2:case 9:case 6:wt.current===null&&(t=!0);var d=ue;if(ue=0,ft=null,Xn(e,o,c,d),a&&gl){s=0;break e}break;default:d=ue,ue=0,ft=null,Xn(e,o,c,d)}}Q1(),s=ke;break}catch(p){V0(e,p)}while(!0);return t&&e.shellSuspendCounter++,ra=kn=null,oe=n,$.H=i,$.A=r,ie===null&&(me=null,re=0,xs()),s}function Q1(){for(;ie!==null;)F0(ie)}function F1(e,t){var a=oe;oe|=2;var n=W0(),i=Q0();me!==e||re!==t?(Vr=null,qr=mt()+500,sl(e,t)):gl=ji(e,t);e:do try{if(ue!==0&&ie!==null){t=ie;var r=ft;t:switch(ue){case 1:ue=0,ft=null,Xn(e,t,r,1);break;case 2:case 9:if(_u(r)){ue=0,ft=null,cp(t);break}t=function(){ue!==2&&ue!==9||me!==e||(ue=7),Ft(e)},r.then(t,t);break e;case 3:ue=7;break e;case 4:ue=5;break e;case 7:_u(r)?(ue=0,ft=null,cp(t)):(ue=0,ft=null,Xn(e,t,r,7));break;case 5:var s=null;switch(ie.tag){case 26:s=ie.memoizedState;case 5:case 27:var o=ie;if(s?hx(s):o.stateNode.complete){ue=0,ft=null;var c=o.sibling;if(c!==null)ie=c;else{var d=o.return;d!==null?(ie=d,Cs(d)):ie=null}break t}}ue=0,ft=null,Xn(e,t,r,5);break;case 6:ue=0,ft=null,Xn(e,t,r,6);break;case 8:Gd(),ke=6;break e;default:throw Error(D(462))}}Z1();break}catch(p){V0(e,p)}while(!0);return ra=kn=null,$.H=n,$.A=i,oe=a,ie!==null?0:(me=null,re=0,xs(),ke)}function Z1(){for(;ie!==null&&!bm();)F0(ie)}function F0(e){var t=j0(e.alternate,e,xa);e.memoizedProps=e.pendingProps,t===null?Cs(e):ie=t}function cp(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=ap(a,t,t.pendingProps,t.type,void 0,re);break;case 11:t=ap(a,t,t.pendingProps,t.type.render,t.ref,re);break;case 5:zd(t);default:w0(a,t),t=ie=wh(t,xa),t=j0(a,t,xa)}e.memoizedProps=e.pendingProps,t===null?Cs(e):ie=t}function Xn(e,t,a,n){ra=kn=null,zd(t),$n=null,oi=0;var i=t.return;try{if(U1(e,i,t,a,re)){ke=1,Gr(e,Tt(a,e.current)),ie=null;return}}catch(r){if(i!==null)throw ie=i,r;ke=1,Gr(e,Tt(a,e.current)),ie=null;return}t.flags&32768?(se||n===1?e=!0:gl||re&536870912?e=!1:(Ea=e=!0,(n===2||n===9||n===3||n===6)&&(n=wt.current,n!==null&&n.tag===13&&(n.flags|=16384))),Z0(t,e)):Cs(t)}function Cs(e){var t=e;do{if(t.flags&32768){Z0(t,Ea);return}e=t.return;var a=G1(t.alternate,t,xa);if(a!==null){ie=a;return}if(t=t.sibling,t!==null){ie=t;return}ie=t=e}while(t!==null);ke===0&&(ke=5)}function Z0(e,t){do{var a=Y1(e.alternate,e);if(a!==null){a.flags&=32767,ie=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){ie=e;return}ie=e=a}while(e!==null);ke=6,ie=null}function dp(e,t,a,n,i,r,s,o,c){e.cancelPendingCommit=null;do zs();while(Le!==0);if(oe&6)throw Error(D(327));if(t!==null){if(t===e.current)throw Error(D(177));if(r=t.lanes|t.childLanes,r|=ud,Em(e,a,r,s,o,c),e===me&&(ie=me=null,re=0),rl=t,Ua=e,ca=a,Sc=r,Cc=i,Y0=n,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,P1(Tr,function(){return ex(),null})):(e.callbackNode=null,e.callbackPriority=0),n=(t.flags&13878)!==0,t.subtreeFlags&13878||n){n=$.T,$.T=null,i=ce.p,ce.p=2,s=oe,oe|=4;try{I1(e,t,a)}finally{oe=s,ce.p=i,$.T=n}}Le=1,$0(),K0(),J0()}}function $0(){if(Le===1){Le=0;var e=Ua,t=rl,a=(t.flags&13878)!==0;if(t.subtreeFlags&13878||a){a=$.T,$.T=null;var n=ce.p;ce.p=2;var i=oe;oe|=4;try{O0(t,e);var r=Tc,s=hh(e.containerInfo),o=r.focusedElem,c=r.selectionRange;if(s!==o&&o&&o.ownerDocument&&fh(o.ownerDocument.documentElement,o)){if(c!==null&&dd(o)){var d=c.start,p=c.end;if(p===void 0&&(p=d),"selectionStart"in o)o.selectionStart=d,o.selectionEnd=Math.min(p,o.value.length);else{var f=o.ownerDocument||document,u=f&&f.defaultView||window;if(u.getSelection){var x=u.getSelection(),m=o.textContent.length,j=Math.min(c.start,m),w=c.end===void 0?j:Math.min(c.end,m);!x.extend&&j>w&&(s=w,w=j,j=s);var h=Bu(o,j),g=Bu(o,w);if(h&&g&&(x.rangeCount!==1||x.anchorNode!==h.node||x.anchorOffset!==h.offset||x.focusNode!==g.node||x.focusOffset!==g.offset)){var v=f.createRange();v.setStart(h.node,h.offset),x.removeAllRanges(),j>w?(x.addRange(v),x.extend(g.node,g.offset)):(v.setEnd(g.node,g.offset),x.addRange(v))}}}}for(f=[],x=o;x=x.parentNode;)x.nodeType===1&&f.push({element:x,left:x.scrollLeft,top:x.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<f.length;o++){var y=f[o];y.element.scrollLeft=y.left,y.element.scrollTop=y.top}}Pr=!!Ec,Tc=Ec=null}finally{oe=i,ce.p=n,$.T=a}}e.current=t,Le=2}}function K0(){if(Le===2){Le=0;var e=Ua,t=rl,a=(t.flags&8772)!==0;if(t.subtreeFlags&8772||a){a=$.T,$.T=null;var n=ce.p;ce.p=2;var i=oe;oe|=4;try{E0(e,t.alternate,t)}finally{oe=i,ce.p=n,$.T=a}}Le=3}}function J0(){if(Le===4||Le===3){Le=0,ym();var e=Ua,t=rl,a=ca,n=Y0;t.subtreeFlags&10256||t.flags&10256?Le=5:(Le=0,rl=Ua=null,P0(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(La=null),nd(a),t=t.stateNode,bt&&typeof bt.onCommitFiberRoot=="function")try{bt.onCommitFiberRoot(vi,t,void 0,(t.current.flags&128)===128)}catch{}if(n!==null){t=$.T,i=ce.p,ce.p=2,$.T=null;try{for(var r=e.onRecoverableError,s=0;s<n.length;s++){var o=n[s];r(o.value,{componentStack:o.stack})}}finally{$.T=t,ce.p=i}}ca&3&&zs(),Ft(e),i=e.pendingLanes,a&261930&&i&42?e===zc?Jl++:(Jl=0,zc=e):Jl=0,Ei(0)}}function P0(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,zi(t)))}function zs(){return $0(),K0(),J0(),ex()}function ex(){if(Le!==5)return!1;var e=Ua,t=Sc;Sc=0;var a=nd(ca),n=$.T,i=ce.p;try{ce.p=32>a?32:a,$.T=null,a=Cc,Cc=null;var r=Ua,s=ca;if(Le=0,rl=Ua=null,ca=0,oe&6)throw Error(D(331));var o=oe;if(oe|=4,H0(r.current),M0(r,r.current,s,a),oe=o,Ei(0,!1),bt&&typeof bt.onPostCommitFiberRoot=="function")try{bt.onPostCommitFiberRoot(vi,r)}catch{}return!0}finally{ce.p=i,$.T=n,P0(e,t)}}function up(e,t,a){t=Tt(a,t),t=bc(e.stateNode,t,2),e=Ma(e,t,2),e!==null&&(wi(e,2),Ft(e))}function pe(e,t,a){if(e.tag===3)up(e,e,a);else for(;t!==null;){if(t.tag===3){up(t,e,a);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(La===null||!La.has(n))){e=Tt(a,e),a=x0(2),n=Ma(t,a,2),n!==null&&(g0(a,n,t,e),wi(n,2),Ft(n));break}}t=t.return}}function vo(e,t,a){var n=e.pingCache;if(n===null){n=e.pingCache=new X1;var i=new Set;n.set(t,i)}else i=n.get(t),i===void 0&&(i=new Set,n.set(t,i));i.has(a)||(Hd=!0,i.add(a),e=$1.bind(null,e,t,a),t.then(e,e))}function $1(e,t,a){var n=e.pingCache;n!==null&&n.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,me===e&&(re&a)===a&&(ke===4||ke===3&&(re&62914560)===re&&300>mt()-ws?!(oe&2)&&sl(e,0):_d|=a,il===re&&(il=0)),Ft(e)}function tx(e,t){t===0&&(t=Wf()),e=Nn(e,t),e!==null&&(wi(e,t),Ft(e))}function K1(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),tx(e,a)}function J1(e,t){var a=0;switch(e.tag){case 31:case 13:var n=e.stateNode,i=e.memoizedState;i!==null&&(a=i.retryLane);break;case 19:n=e.stateNode;break;case 22:n=e.stateNode._retryCache;break;default:throw Error(D(314))}n!==null&&n.delete(t),tx(e,a)}function P1(e,t){return td(e,t)}var Wr=null,On=null,Nc=!1,Qr=!1,jo=!1,Aa=0;function Ft(e){e!==On&&e.next===null&&(On===null?Wr=On=e:On=On.next=e),Qr=!0,Nc||(Nc=!0,tb())}function Ei(e,t){if(!jo&&Qr){jo=!0;do for(var a=!1,n=Wr;n!==null;){if(e!==0){var i=n.pendingLanes;if(i===0)var r=0;else{var s=n.suspendedLanes,o=n.pingedLanes;r=(1<<31-yt(42|e)+1)-1,r&=i&~(s&~o),r=r&201326741?r&201326741|1:r?r|2:0}r!==0&&(a=!0,pp(n,r))}else r=re,r=us(n,n===me?r:0,n.cancelPendingCommit!==null||n.timeoutHandle!==-1),!(r&3)||ji(n,r)||(a=!0,pp(n,r));n=n.next}while(a);jo=!1}}function eb(){ax()}function ax(){Qr=Nc=!1;var e=0;Aa!==0&&ub()&&(e=Aa);for(var t=mt(),a=null,n=Wr;n!==null;){var i=n.next,r=nx(n,t);r===0?(n.next=null,a===null?Wr=i:a.next=i,i===null&&(On=a)):(a=n,(e!==0||r&3)&&(Qr=!0)),n=i}Le!==0&&Le!==5||Ei(e),Aa!==0&&(Aa=0)}function nx(e,t){for(var a=e.suspendedLanes,n=e.pingedLanes,i=e.expirationTimes,r=e.pendingLanes&-62914561;0<r;){var s=31-yt(r),o=1<<s,c=i[s];c===-1?(!(o&a)||o&n)&&(i[s]=km(o,t)):c<=t&&(e.expiredLanes|=o),r&=~o}if(t=me,a=re,a=us(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n=e.callbackNode,a===0||e===t&&(ue===2||ue===9)||e.cancelPendingCommit!==null)return n!==null&&n!==null&&Fs(n),e.callbackNode=null,e.callbackPriority=0;if(!(a&3)||ji(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(n!==null&&Fs(n),nd(a)){case 2:case 8:a=Vf;break;case 32:a=Tr;break;case 268435456:a=Xf;break;default:a=Tr}return n=lx.bind(null,e),a=td(a,n),e.callbackPriority=t,e.callbackNode=a,t}return n!==null&&n!==null&&Fs(n),e.callbackPriority=2,e.callbackNode=null,2}function lx(e,t){if(Le!==0&&Le!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(zs()&&e.callbackNode!==a)return null;var n=re;return n=us(e,e===me?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n===0?null:(q0(e,n,t),nx(e,mt()),e.callbackNode!=null&&e.callbackNode===a?lx.bind(null,e):null)}function pp(e,t){if(zs())return null;q0(e,t,!0)}function tb(){fb(function(){oe&6?td(qf,eb):ax()})}function Yd(){if(Aa===0){var e=al;e===0&&(e=Hi,Hi<<=1,!(Hi&261888)&&(Hi=256)),Aa=e}return Aa}function fp(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:ir(""+e)}function hp(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function ab(e,t,a,n,i){if(t==="submit"&&a&&a.stateNode===i){var r=fp((i[ut]||null).action),s=n.submitter;s&&(t=(t=s[ut]||null)?fp(t.formAction):s.getAttribute("formAction"),t!==null&&(r=t,s=null));var o=new ps("action","action",null,n,i);e.push({event:o,listeners:[{instance:null,listener:function(){if(n.defaultPrevented){if(Aa!==0){var c=s?hp(i,s):new FormData(i);gc(a,{pending:!0,data:c,method:i.method,action:r},null,c)}}else typeof r=="function"&&(o.preventDefault(),c=s?hp(i,s):new FormData(i),gc(a,{pending:!0,data:c,method:i.method,action:r},r,c))},currentTarget:i}]})}}for(var wo=0;wo<lc.length;wo++){var So=lc[wo],nb=So.toLowerCase(),lb=So[0].toUpperCase()+So.slice(1);Ut(nb,"on"+lb)}Ut(gh,"onAnimationEnd");Ut(mh,"onAnimationIteration");Ut(bh,"onAnimationStart");Ut("dblclick","onDoubleClick");Ut("focusin","onFocus");Ut("focusout","onBlur");Ut(v1,"onTransitionRun");Ut(j1,"onTransitionStart");Ut(w1,"onTransitionCancel");Ut(yh,"onTransitionEnd");el("onMouseEnter",["mouseout","mouseover"]);el("onMouseLeave",["mouseout","mouseover"]);el("onPointerEnter",["pointerout","pointerover"]);el("onPointerLeave",["pointerout","pointerover"]);Sn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Sn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Sn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Sn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Sn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Sn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ui="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ib=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ui));function ix(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var n=e[a],i=n.event;n=n.listeners;e:{var r=void 0;if(t)for(var s=n.length-1;0<=s;s--){var o=n[s],c=o.instance,d=o.currentTarget;if(o=o.listener,c!==r&&i.isPropagationStopped())break e;r=o,i.currentTarget=d;try{r(i)}catch(p){Rr(p)}i.currentTarget=null,r=c}else for(s=0;s<n.length;s++){if(o=n[s],c=o.instance,d=o.currentTarget,o=o.listener,c!==r&&i.isPropagationStopped())break e;r=o,i.currentTarget=d;try{r(i)}catch(p){Rr(p)}i.currentTarget=null,r=c}}}}function le(e,t){var a=t[$o];a===void 0&&(a=t[$o]=new Set);var n=e+"__bubble";a.has(n)||(rx(t,e,2,!1),a.add(n))}function Co(e,t,a){var n=0;t&&(n|=4),rx(a,e,n,t)}var Fi="_reactListening"+Math.random().toString(36).slice(2);function Id(e){if(!e[Fi]){e[Fi]=!0,Kf.forEach(function(a){a!=="selectionchange"&&(ib.has(a)||Co(a,!1,e),Co(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Fi]||(t[Fi]=!0,Co("selectionchange",!1,t))}}function rx(e,t,a,n){switch(yx(t)){case 2:var i=Ob;break;case 8:i=Db;break;default:i=Wd}a=i.bind(null,t,a,e),i=void 0,!tc||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),n?i!==void 0?e.addEventListener(t,a,{capture:!0,passive:i}):e.addEventListener(t,a,!0):i!==void 0?e.addEventListener(t,a,{passive:i}):e.addEventListener(t,a,!1)}function zo(e,t,a,n,i){var r=n;if(!(t&1)&&!(t&2)&&n!==null)e:for(;;){if(n===null)return;var s=n.tag;if(s===3||s===4){var o=n.stateNode.containerInfo;if(o===i)break;if(s===4)for(s=n.return;s!==null;){var c=s.tag;if((c===3||c===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;o!==null;){if(s=Ln(o),s===null)return;if(c=s.tag,c===5||c===6||c===26||c===27){n=r=s;continue e}o=o.parentNode}}n=n.return}ih(function(){var d=r,p=rd(a),f=[];e:{var u=vh.get(e);if(u!==void 0){var x=ps,m=e;switch(e){case"keypress":if(sr(a)===0)break e;case"keydown":case"keyup":x=Jm;break;case"focusin":m="focus",x=Ps;break;case"focusout":m="blur",x=Ps;break;case"beforeblur":case"afterblur":x=Ps;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=wu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=Gm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=t1;break;case gh:case mh:case bh:x=qm;break;case yh:x=n1;break;case"scroll":case"scrollend":x=Hm;break;case"wheel":x=i1;break;case"copy":case"cut":case"paste":x=Xm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=Cu;break;case"toggle":case"beforetoggle":x=s1}var j=(t&4)!==0,w=!j&&(e==="scroll"||e==="scrollend"),h=j?u!==null?u+"Capture":null:u;j=[];for(var g=d,v;g!==null;){var y=g;if(v=y.stateNode,y=y.tag,y!==5&&y!==26&&y!==27||v===null||h===null||(y=ni(g,h),y!=null&&j.push(pi(g,y,v))),w)break;g=g.return}0<j.length&&(u=new x(u,m,null,a,p),f.push({event:u,listeners:j}))}}if(!(t&7)){e:{if(u=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",u&&a!==ec&&(m=a.relatedTarget||a.fromElement)&&(Ln(m)||m[pl]))break e;if((x||u)&&(u=p.window===p?p:(u=p.ownerDocument)?u.defaultView||u.parentWindow:window,x?(m=a.relatedTarget||a.toElement,x=d,m=m?Ln(m):null,m!==null&&(w=yi(m),j=m.tag,m!==w||j!==5&&j!==27&&j!==6)&&(m=null)):(x=null,m=d),x!==m)){if(j=wu,y="onMouseLeave",h="onMouseEnter",g="mouse",(e==="pointerout"||e==="pointerover")&&(j=Cu,y="onPointerLeave",h="onPointerEnter",g="pointer"),w=x==null?u:Ll(x),v=m==null?u:Ll(m),u=new j(y,g+"leave",x,a,p),u.target=w,u.relatedTarget=v,y=null,Ln(p)===d&&(j=new j(h,g+"enter",m,a,p),j.target=v,j.relatedTarget=w,y=j),w=y,x&&m)t:{for(j=rb,h=x,g=m,v=0,y=h;y;y=j(y))v++;y=0;for(var k=g;k;k=j(k))y++;for(;0<v-y;)h=j(h),v--;for(;0<y-v;)g=j(g),y--;for(;v--;){if(h===g||g!==null&&h===g.alternate){j=h;break t}h=j(h),g=j(g)}j=null}else j=null;x!==null&&xp(f,u,x,j,!1),m!==null&&w!==null&&xp(f,w,m,j,!0)}}e:{if(u=d?Ll(d):window,x=u.nodeName&&u.nodeName.toLowerCase(),x==="select"||x==="input"&&u.type==="file")var G=Eu;else if(ku(u))if(uh)G=m1;else{G=x1;var C=h1}else x=u.nodeName,!x||x.toLowerCase()!=="input"||u.type!=="checkbox"&&u.type!=="radio"?d&&id(d.elementType)&&(G=Eu):G=g1;if(G&&(G=G(e,d))){dh(f,G,a,p);break e}C&&C(e,u,d),e==="focusout"&&d&&u.type==="number"&&d.memoizedProps.value!=null&&Po(u,"number",u.value)}switch(C=d?Ll(d):window,e){case"focusin":(ku(C)||C.contentEditable==="true")&&(_n=C,ac=d,ql=null);break;case"focusout":ql=ac=_n=null;break;case"mousedown":nc=!0;break;case"contextmenu":case"mouseup":case"dragend":nc=!1,Ou(f,a,p);break;case"selectionchange":if(y1)break;case"keydown":case"keyup":Ou(f,a,p)}var T;if(cd)e:{switch(e){case"compositionstart":var O="onCompositionStart";break e;case"compositionend":O="onCompositionEnd";break e;case"compositionupdate":O="onCompositionUpdate";break e}O=void 0}else Hn?oh(e,a)&&(O="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(O="onCompositionStart");O&&(sh&&a.locale!=="ko"&&(Hn||O!=="onCompositionStart"?O==="onCompositionEnd"&&Hn&&(T=rh()):(ka=p,sd="value"in ka?ka.value:ka.textContent,Hn=!0)),C=Fr(d,O),0<C.length&&(O=new Su(O,e,null,a,p),f.push({event:O,listeners:C}),T?O.data=T:(T=ch(a),T!==null&&(O.data=T)))),(T=c1?d1(e,a):u1(e,a))&&(O=Fr(d,"onBeforeInput"),0<O.length&&(C=new Su("onBeforeInput","beforeinput",null,a,p),f.push({event:C,listeners:O}),C.data=T)),ab(f,e,d,a,p)}ix(f,t)})}function pi(e,t,a){return{instance:e,listener:t,currentTarget:a}}function Fr(e,t){for(var a=t+"Capture",n=[];e!==null;){var i=e,r=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||r===null||(i=ni(e,a),i!=null&&n.unshift(pi(e,i,r)),i=ni(e,t),i!=null&&n.push(pi(e,i,r))),e.tag===3)return n;e=e.return}return[]}function rb(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function xp(e,t,a,n,i){for(var r=t._reactName,s=[];a!==null&&a!==n;){var o=a,c=o.alternate,d=o.stateNode;if(o=o.tag,c!==null&&c===n)break;o!==5&&o!==26&&o!==27||d===null||(c=d,i?(d=ni(a,r),d!=null&&s.unshift(pi(a,d,c))):i||(d=ni(a,r),d!=null&&s.push(pi(a,d,c)))),a=a.return}s.length!==0&&e.push({event:t,listeners:s})}var sb=/\r\n?/g,ob=/\u0000|\uFFFD/g;function gp(e){return(typeof e=="string"?e:""+e).replace(sb,`
`).replace(ob,"")}function sx(e,t){return t=gp(t),gp(e)===t}function fe(e,t,a,n,i,r){switch(a){case"children":typeof n=="string"?t==="body"||t==="textarea"&&n===""||tl(e,n):(typeof n=="number"||typeof n=="bigint")&&t!=="body"&&tl(e,""+n);break;case"className":Yi(e,"class",n);break;case"tabIndex":Yi(e,"tabindex",n);break;case"dir":case"role":case"viewBox":case"width":case"height":Yi(e,a,n);break;case"style":lh(e,n,r);break;case"data":if(t!=="object"){Yi(e,"data",n);break}case"src":case"href":if(n===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(n==null||typeof n=="function"||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(a);break}n=ir(""+n),e.setAttribute(a,n);break;case"action":case"formAction":if(typeof n=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof r=="function"&&(a==="formAction"?(t!=="input"&&fe(e,t,"name",i.name,i,null),fe(e,t,"formEncType",i.formEncType,i,null),fe(e,t,"formMethod",i.formMethod,i,null),fe(e,t,"formTarget",i.formTarget,i,null)):(fe(e,t,"encType",i.encType,i,null),fe(e,t,"method",i.method,i,null),fe(e,t,"target",i.target,i,null)));if(n==null||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(a);break}n=ir(""+n),e.setAttribute(a,n);break;case"onClick":n!=null&&(e.onclick=ia);break;case"onScroll":n!=null&&le("scroll",e);break;case"onScrollEnd":n!=null&&le("scrollend",e);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(D(61));if(a=n.__html,a!=null){if(i.children!=null)throw Error(D(60));e.innerHTML=a}}break;case"multiple":e.multiple=n&&typeof n!="function"&&typeof n!="symbol";break;case"muted":e.muted=n&&typeof n!="function"&&typeof n!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(n==null||typeof n=="function"||typeof n=="boolean"||typeof n=="symbol"){e.removeAttribute("xlink:href");break}a=ir(""+n),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,""+n):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":n&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":n===!0?e.setAttribute(a,""):n!==!1&&n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,n):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":n!=null&&typeof n!="function"&&typeof n!="symbol"&&!isNaN(n)&&1<=n?e.setAttribute(a,n):e.removeAttribute(a);break;case"rowSpan":case"start":n==null||typeof n=="function"||typeof n=="symbol"||isNaN(n)?e.removeAttribute(a):e.setAttribute(a,n);break;case"popover":le("beforetoggle",e),le("toggle",e),lr(e,"popover",n);break;case"xlinkActuate":Kt(e,"http://www.w3.org/1999/xlink","xlink:actuate",n);break;case"xlinkArcrole":Kt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",n);break;case"xlinkRole":Kt(e,"http://www.w3.org/1999/xlink","xlink:role",n);break;case"xlinkShow":Kt(e,"http://www.w3.org/1999/xlink","xlink:show",n);break;case"xlinkTitle":Kt(e,"http://www.w3.org/1999/xlink","xlink:title",n);break;case"xlinkType":Kt(e,"http://www.w3.org/1999/xlink","xlink:type",n);break;case"xmlBase":Kt(e,"http://www.w3.org/XML/1998/namespace","xml:base",n);break;case"xmlLang":Kt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",n);break;case"xmlSpace":Kt(e,"http://www.w3.org/XML/1998/namespace","xml:space",n);break;case"is":lr(e,"is",n);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Lm.get(a)||a,lr(e,a,n))}}function kc(e,t,a,n,i,r){switch(a){case"style":lh(e,n,r);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(D(61));if(a=n.__html,a!=null){if(i.children!=null)throw Error(D(60));e.innerHTML=a}}break;case"children":typeof n=="string"?tl(e,n):(typeof n=="number"||typeof n=="bigint")&&tl(e,""+n);break;case"onScroll":n!=null&&le("scroll",e);break;case"onScrollEnd":n!=null&&le("scrollend",e);break;case"onClick":n!=null&&(e.onclick=ia);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Jf.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(i=a.endsWith("Capture"),t=a.slice(2,i?a.length-7:void 0),r=e[ut]||null,r=r!=null?r[a]:null,typeof r=="function"&&e.removeEventListener(t,r,i),typeof n=="function")){typeof r!="function"&&r!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,n,i);break e}a in e?e[a]=n:n===!0?e.setAttribute(a,""):lr(e,a,n)}}}function Qe(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":le("error",e),le("load",e);var n=!1,i=!1,r;for(r in a)if(a.hasOwnProperty(r)){var s=a[r];if(s!=null)switch(r){case"src":n=!0;break;case"srcSet":i=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(D(137,t));default:fe(e,t,r,s,a,null)}}i&&fe(e,t,"srcSet",a.srcSet,a,null),n&&fe(e,t,"src",a.src,a,null);return;case"input":le("invalid",e);var o=r=s=i=null,c=null,d=null;for(n in a)if(a.hasOwnProperty(n)){var p=a[n];if(p!=null)switch(n){case"name":i=p;break;case"type":s=p;break;case"checked":c=p;break;case"defaultChecked":d=p;break;case"value":r=p;break;case"defaultValue":o=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(D(137,t));break;default:fe(e,t,n,p,a,null)}}th(e,r,o,c,d,s,i,!1);return;case"select":le("invalid",e),n=s=r=null;for(i in a)if(a.hasOwnProperty(i)&&(o=a[i],o!=null))switch(i){case"value":r=o;break;case"defaultValue":s=o;break;case"multiple":n=o;default:fe(e,t,i,o,a,null)}t=r,a=s,e.multiple=!!n,t!=null?Qn(e,!!n,t,!1):a!=null&&Qn(e,!!n,a,!0);return;case"textarea":le("invalid",e),r=i=n=null;for(s in a)if(a.hasOwnProperty(s)&&(o=a[s],o!=null))switch(s){case"value":n=o;break;case"defaultValue":i=o;break;case"children":r=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(D(91));break;default:fe(e,t,s,o,a,null)}nh(e,n,i,r);return;case"option":for(c in a)if(a.hasOwnProperty(c)&&(n=a[c],n!=null))switch(c){case"selected":e.selected=n&&typeof n!="function"&&typeof n!="symbol";break;default:fe(e,t,c,n,a,null)}return;case"dialog":le("beforetoggle",e),le("toggle",e),le("cancel",e),le("close",e);break;case"iframe":case"object":le("load",e);break;case"video":case"audio":for(n=0;n<ui.length;n++)le(ui[n],e);break;case"image":le("error",e),le("load",e);break;case"details":le("toggle",e);break;case"embed":case"source":case"link":le("error",e),le("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(d in a)if(a.hasOwnProperty(d)&&(n=a[d],n!=null))switch(d){case"children":case"dangerouslySetInnerHTML":throw Error(D(137,t));default:fe(e,t,d,n,a,null)}return;default:if(id(t)){for(p in a)a.hasOwnProperty(p)&&(n=a[p],n!==void 0&&kc(e,t,p,n,a,void 0));return}}for(o in a)a.hasOwnProperty(o)&&(n=a[o],n!=null&&fe(e,t,o,n,a,null))}function cb(e,t,a,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var i=null,r=null,s=null,o=null,c=null,d=null,p=null;for(x in a){var f=a[x];if(a.hasOwnProperty(x)&&f!=null)switch(x){case"checked":break;case"value":break;case"defaultValue":c=f;default:n.hasOwnProperty(x)||fe(e,t,x,null,n,f)}}for(var u in n){var x=n[u];if(f=a[u],n.hasOwnProperty(u)&&(x!=null||f!=null))switch(u){case"type":r=x;break;case"name":i=x;break;case"checked":d=x;break;case"defaultChecked":p=x;break;case"value":s=x;break;case"defaultValue":o=x;break;case"children":case"dangerouslySetInnerHTML":if(x!=null)throw Error(D(137,t));break;default:x!==f&&fe(e,t,u,x,n,f)}}Jo(e,s,o,c,d,p,r,i);return;case"select":x=s=o=u=null;for(r in a)if(c=a[r],a.hasOwnProperty(r)&&c!=null)switch(r){case"value":break;case"multiple":x=c;default:n.hasOwnProperty(r)||fe(e,t,r,null,n,c)}for(i in n)if(r=n[i],c=a[i],n.hasOwnProperty(i)&&(r!=null||c!=null))switch(i){case"value":u=r;break;case"defaultValue":o=r;break;case"multiple":s=r;default:r!==c&&fe(e,t,i,r,n,c)}t=o,a=s,n=x,u!=null?Qn(e,!!a,u,!1):!!n!=!!a&&(t!=null?Qn(e,!!a,t,!0):Qn(e,!!a,a?[]:"",!1));return;case"textarea":x=u=null;for(o in a)if(i=a[o],a.hasOwnProperty(o)&&i!=null&&!n.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:fe(e,t,o,null,n,i)}for(s in n)if(i=n[s],r=a[s],n.hasOwnProperty(s)&&(i!=null||r!=null))switch(s){case"value":u=i;break;case"defaultValue":x=i;break;case"children":break;case"dangerouslySetInnerHTML":if(i!=null)throw Error(D(91));break;default:i!==r&&fe(e,t,s,i,n,r)}ah(e,u,x);return;case"option":for(var m in a)if(u=a[m],a.hasOwnProperty(m)&&u!=null&&!n.hasOwnProperty(m))switch(m){case"selected":e.selected=!1;break;default:fe(e,t,m,null,n,u)}for(c in n)if(u=n[c],x=a[c],n.hasOwnProperty(c)&&u!==x&&(u!=null||x!=null))switch(c){case"selected":e.selected=u&&typeof u!="function"&&typeof u!="symbol";break;default:fe(e,t,c,u,n,x)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var j in a)u=a[j],a.hasOwnProperty(j)&&u!=null&&!n.hasOwnProperty(j)&&fe(e,t,j,null,n,u);for(d in n)if(u=n[d],x=a[d],n.hasOwnProperty(d)&&u!==x&&(u!=null||x!=null))switch(d){case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(D(137,t));break;default:fe(e,t,d,u,n,x)}return;default:if(id(t)){for(var w in a)u=a[w],a.hasOwnProperty(w)&&u!==void 0&&!n.hasOwnProperty(w)&&kc(e,t,w,void 0,n,u);for(p in n)u=n[p],x=a[p],!n.hasOwnProperty(p)||u===x||u===void 0&&x===void 0||kc(e,t,p,u,n,x);return}}for(var h in a)u=a[h],a.hasOwnProperty(h)&&u!=null&&!n.hasOwnProperty(h)&&fe(e,t,h,null,n,u);for(f in n)u=n[f],x=a[f],!n.hasOwnProperty(f)||u===x||u==null&&x==null||fe(e,t,f,u,n,x)}function mp(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function db(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,a=performance.getEntriesByType("resource"),n=0;n<a.length;n++){var i=a[n],r=i.transferSize,s=i.initiatorType,o=i.duration;if(r&&o&&mp(s)){for(s=0,o=i.responseEnd,n+=1;n<a.length;n++){var c=a[n],d=c.startTime;if(d>o)break;var p=c.transferSize,f=c.initiatorType;p&&mp(f)&&(c=c.responseEnd,s+=p*(c<o?1:(o-d)/(c-d)))}if(--n,t+=8*(r+s)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Ec=null,Tc=null;function Zr(e){return e.nodeType===9?e:e.ownerDocument}function bp(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function ox(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Ac(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var No=null;function ub(){var e=window.event;return e&&e.type==="popstate"?e===No?!1:(No=e,!0):(No=null,!1)}var cx=typeof setTimeout=="function"?setTimeout:void 0,pb=typeof clearTimeout=="function"?clearTimeout:void 0,yp=typeof Promise=="function"?Promise:void 0,fb=typeof queueMicrotask=="function"?queueMicrotask:typeof yp<"u"?function(e){return yp.resolve(null).then(e).catch(hb)}:cx;function hb(e){setTimeout(function(){throw e})}function $a(e){return e==="head"}function vp(e,t){var a=t,n=0;do{var i=a.nextSibling;if(e.removeChild(a),i&&i.nodeType===8)if(a=i.data,a==="/$"||a==="/&"){if(n===0){e.removeChild(i),cl(t);return}n--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")n++;else if(a==="html")Pl(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Pl(a);for(var r=a.firstChild;r;){var s=r.nextSibling,o=r.nodeName;r[Si]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&r.rel.toLowerCase()==="stylesheet"||a.removeChild(r),r=s}}else a==="body"&&Pl(e.ownerDocument.body);a=i}while(a);cl(t)}function jp(e,t){var a=e;e=0;do{var n=a.nextSibling;if(a.nodeType===1?t?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(t?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),n&&n.nodeType===8)if(a=n.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=n}while(a)}function Rc(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Rc(a),ld(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function xb(e,t,a,n){for(;e.nodeType===1;){var i=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!n&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(n){if(!e[Si])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(r=e.getAttribute("rel"),r==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(r!==i.rel||e.getAttribute("href")!==(i.href==null||i.href===""?null:i.href)||e.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute("title")!==(i.title==null?null:i.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(r=e.getAttribute("src"),(r!==(i.src==null?null:i.src)||e.getAttribute("type")!==(i.type==null?null:i.type)||e.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin))&&r&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var r=i.name==null?null:""+i.name;if(i.type==="hidden"&&e.getAttribute("name")===r)return e}else return e;if(e=Ot(e.nextSibling),e===null)break}return null}function gb(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Ot(e.nextSibling),e===null))return null;return e}function dx(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Ot(e.nextSibling),e===null))return null;return e}function Bc(e){return e.data==="$?"||e.data==="$~"}function Oc(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function mb(e,t){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||a.readyState!=="loading")t();else{var n=function(){t(),a.removeEventListener("DOMContentLoaded",n)};a.addEventListener("DOMContentLoaded",n),e._reactRetry=n}}function Ot(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Dc=null;function wp(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(t===0)return Ot(e.nextSibling);t--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||t++}e=e.nextSibling}return null}function Sp(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(t===0)return e;t--}else a!=="/$"&&a!=="/&"||t++}e=e.previousSibling}return null}function ux(e,t,a){switch(t=Zr(a),e){case"html":if(e=t.documentElement,!e)throw Error(D(452));return e;case"head":if(e=t.head,!e)throw Error(D(453));return e;case"body":if(e=t.body,!e)throw Error(D(454));return e;default:throw Error(D(451))}}function Pl(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);ld(e)}var Dt=new Map,Cp=new Set;function $r(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ga=ce.d;ce.d={f:bb,r:yb,D:vb,C:jb,L:wb,m:Sb,X:zb,S:Cb,M:Nb};function bb(){var e=ga.f(),t=Ss();return e||t}function yb(e){var t=fl(e);t!==null&&t.tag===5&&t.type==="form"?l0(t):ga.r(e)}var ml=typeof document>"u"?null:document;function px(e,t,a){var n=ml;if(n&&typeof t=="string"&&t){var i=Et(t);i='link[rel="'+e+'"][href="'+i+'"]',typeof a=="string"&&(i+='[crossorigin="'+a+'"]'),Cp.has(i)||(Cp.add(i),e={rel:e,crossOrigin:a,href:t},n.querySelector(i)===null&&(t=n.createElement("link"),Qe(t,"link",e),Ge(t),n.head.appendChild(t)))}}function vb(e){ga.D(e),px("dns-prefetch",e,null)}function jb(e,t){ga.C(e,t),px("preconnect",e,t)}function wb(e,t,a){ga.L(e,t,a);var n=ml;if(n&&e&&t){var i='link[rel="preload"][as="'+Et(t)+'"]';t==="image"&&a&&a.imageSrcSet?(i+='[imagesrcset="'+Et(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(i+='[imagesizes="'+Et(a.imageSizes)+'"]')):i+='[href="'+Et(e)+'"]';var r=i;switch(t){case"style":r=ol(e);break;case"script":r=bl(e)}Dt.has(r)||(e=Se({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),Dt.set(r,e),n.querySelector(i)!==null||t==="style"&&n.querySelector(Ti(r))||t==="script"&&n.querySelector(Ai(r))||(t=n.createElement("link"),Qe(t,"link",e),Ge(t),n.head.appendChild(t)))}}function Sb(e,t){ga.m(e,t);var a=ml;if(a&&e){var n=t&&typeof t.as=="string"?t.as:"script",i='link[rel="modulepreload"][as="'+Et(n)+'"][href="'+Et(e)+'"]',r=i;switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":r=bl(e)}if(!Dt.has(r)&&(e=Se({rel:"modulepreload",href:e},t),Dt.set(r,e),a.querySelector(i)===null)){switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Ai(r)))return}n=a.createElement("link"),Qe(n,"link",e),Ge(n),a.head.appendChild(n)}}}function Cb(e,t,a){ga.S(e,t,a);var n=ml;if(n&&e){var i=Wn(n).hoistableStyles,r=ol(e);t=t||"default";var s=i.get(r);if(!s){var o={loading:0,preload:null};if(s=n.querySelector(Ti(r)))o.loading=5;else{e=Se({rel:"stylesheet",href:e,"data-precedence":t},a),(a=Dt.get(r))&&qd(e,a);var c=s=n.createElement("link");Ge(c),Qe(c,"link",e),c._p=new Promise(function(d,p){c.onload=d,c.onerror=p}),c.addEventListener("load",function(){o.loading|=1}),c.addEventListener("error",function(){o.loading|=2}),o.loading|=4,xr(s,t,n)}s={type:"stylesheet",instance:s,count:1,state:o},i.set(r,s)}}}function zb(e,t){ga.X(e,t);var a=ml;if(a&&e){var n=Wn(a).hoistableScripts,i=bl(e),r=n.get(i);r||(r=a.querySelector(Ai(i)),r||(e=Se({src:e,async:!0},t),(t=Dt.get(i))&&Vd(e,t),r=a.createElement("script"),Ge(r),Qe(r,"link",e),a.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},n.set(i,r))}}function Nb(e,t){ga.M(e,t);var a=ml;if(a&&e){var n=Wn(a).hoistableScripts,i=bl(e),r=n.get(i);r||(r=a.querySelector(Ai(i)),r||(e=Se({src:e,async:!0,type:"module"},t),(t=Dt.get(i))&&Vd(e,t),r=a.createElement("script"),Ge(r),Qe(r,"link",e),a.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},n.set(i,r))}}function zp(e,t,a,n){var i=(i=Ba.current)?$r(i):null;if(!i)throw Error(D(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=ol(a.href),a=Wn(i).hoistableStyles,n=a.get(t),n||(n={type:"style",instance:null,count:0,state:null},a.set(t,n)),n):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=ol(a.href);var r=Wn(i).hoistableStyles,s=r.get(e);if(s||(i=i.ownerDocument||i,s={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},r.set(e,s),(r=i.querySelector(Ti(e)))&&!r._p&&(s.instance=r,s.state.loading=5),Dt.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Dt.set(e,a),r||kb(i,e,a,s.state))),t&&n===null)throw Error(D(528,""));return s}if(t&&n!==null)throw Error(D(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=bl(a),a=Wn(i).hoistableScripts,n=a.get(t),n||(n={type:"script",instance:null,count:0,state:null},a.set(t,n)),n):{type:"void",instance:null,count:0,state:null};default:throw Error(D(444,e))}}function ol(e){return'href="'+Et(e)+'"'}function Ti(e){return'link[rel="stylesheet"]['+e+"]"}function fx(e){return Se({},e,{"data-precedence":e.precedence,precedence:null})}function kb(e,t,a,n){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?n.loading=1:(t=e.createElement("link"),n.preload=t,t.addEventListener("load",function(){return n.loading|=1}),t.addEventListener("error",function(){return n.loading|=2}),Qe(t,"link",a),Ge(t),e.head.appendChild(t))}function bl(e){return'[src="'+Et(e)+'"]'}function Ai(e){return"script[async]"+e}function Np(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var n=e.querySelector('style[data-href~="'+Et(a.href)+'"]');if(n)return t.instance=n,Ge(n),n;var i=Se({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return n=(e.ownerDocument||e).createElement("style"),Ge(n),Qe(n,"style",i),xr(n,a.precedence,e),t.instance=n;case"stylesheet":i=ol(a.href);var r=e.querySelector(Ti(i));if(r)return t.state.loading|=4,t.instance=r,Ge(r),r;n=fx(a),(i=Dt.get(i))&&qd(n,i),r=(e.ownerDocument||e).createElement("link"),Ge(r);var s=r;return s._p=new Promise(function(o,c){s.onload=o,s.onerror=c}),Qe(r,"link",n),t.state.loading|=4,xr(r,a.precedence,e),t.instance=r;case"script":return r=bl(a.src),(i=e.querySelector(Ai(r)))?(t.instance=i,Ge(i),i):(n=a,(i=Dt.get(r))&&(n=Se({},a),Vd(n,i)),e=e.ownerDocument||e,i=e.createElement("script"),Ge(i),Qe(i,"link",n),e.head.appendChild(i),t.instance=i);case"void":return null;default:throw Error(D(443,t.type))}else t.type==="stylesheet"&&!(t.state.loading&4)&&(n=t.instance,t.state.loading|=4,xr(n,a.precedence,e));return t.instance}function xr(e,t,a){for(var n=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),i=n.length?n[n.length-1]:null,r=i,s=0;s<n.length;s++){var o=n[s];if(o.dataset.precedence===t)r=o;else if(r!==i)break}r?r.parentNode.insertBefore(e,r.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function qd(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Vd(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var gr=null;function kp(e,t,a){if(gr===null){var n=new Map,i=gr=new Map;i.set(a,n)}else i=gr,n=i.get(a),n||(n=new Map,i.set(a,n));if(n.has(e))return n;for(n.set(e,null),a=a.getElementsByTagName(e),i=0;i<a.length;i++){var r=a[i];if(!(r[Si]||r[Ve]||e==="link"&&r.getAttribute("rel")==="stylesheet")&&r.namespaceURI!=="http://www.w3.org/2000/svg"){var s=r.getAttribute(t)||"";s=e+s;var o=n.get(s);o?o.push(r):n.set(s,[r])}}return n}function Ep(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function Eb(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function hx(e){return!(e.type==="stylesheet"&&!(e.state.loading&3))}function Tb(e,t,a,n){if(a.type==="stylesheet"&&(typeof n.media!="string"||matchMedia(n.media).matches!==!1)&&!(a.state.loading&4)){if(a.instance===null){var i=ol(n.href),r=t.querySelector(Ti(i));if(r){t=r._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Kr.bind(e),t.then(e,e)),a.state.loading|=4,a.instance=r,Ge(r);return}r=t.ownerDocument||t,n=fx(n),(i=Dt.get(i))&&qd(n,i),r=r.createElement("link"),Ge(r);var s=r;s._p=new Promise(function(o,c){s.onload=o,s.onerror=c}),Qe(r,"link",n),a.instance=r}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,t),(t=a.state.preload)&&!(a.state.loading&3)&&(e.count++,a=Kr.bind(e),t.addEventListener("load",a),t.addEventListener("error",a))}}var ko=0;function Ab(e,t){return e.stylesheets&&e.count===0&&mr(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var n=setTimeout(function(){if(e.stylesheets&&mr(e,e.stylesheets),e.unsuspend){var r=e.unsuspend;e.unsuspend=null,r()}},6e4+t);0<e.imgBytes&&ko===0&&(ko=62500*db());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&mr(e,e.stylesheets),e.unsuspend)){var r=e.unsuspend;e.unsuspend=null,r()}},(e.imgBytes>ko?50:800)+t);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(n),clearTimeout(i)}}:null}function Kr(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)mr(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Jr=null;function mr(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Jr=new Map,t.forEach(Rb,e),Jr=null,Kr.call(e))}function Rb(e,t){if(!(t.state.loading&4)){var a=Jr.get(e);if(a)var n=a.get(null);else{a=new Map,Jr.set(e,a);for(var i=e.querySelectorAll("link[data-precedence],style[data-precedence]"),r=0;r<i.length;r++){var s=i[r];(s.nodeName==="LINK"||s.getAttribute("media")!=="not all")&&(a.set(s.dataset.precedence,s),n=s)}n&&a.set(null,n)}i=t.instance,s=i.getAttribute("data-precedence"),r=a.get(s)||n,r===n&&a.set(null,i),a.set(s,i),this.count++,n=Kr.bind(this),i.addEventListener("load",n),i.addEventListener("error",n),r?r.parentNode.insertBefore(i,r.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var fi={$$typeof:la,Provider:null,Consumer:null,_currentValue:sn,_currentValue2:sn,_threadCount:0};function Bb(e,t,a,n,i,r,s,o,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Zs(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Zs(0),this.hiddenUpdates=Zs(null),this.identifierPrefix=n,this.onUncaughtError=i,this.onCaughtError=r,this.onRecoverableError=s,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function xx(e,t,a,n,i,r,s,o,c,d,p,f){return e=new Bb(e,t,a,s,c,d,p,f,o),t=1,r===!0&&(t|=24),r=xt(3,null,null,t),e.current=r,r.stateNode=e,t=gd(),t.refCount++,e.pooledCache=t,t.refCount++,r.memoizedState={element:n,isDehydrated:a,cache:t},yd(r),e}function gx(e){return e?(e=In,e):In}function mx(e,t,a,n,i,r){i=gx(i),n.context===null?n.context=i:n.pendingContext=i,n=Da(t),n.payload={element:a},r=r===void 0?null:r,r!==null&&(n.callback=r),a=Ma(e,n,t),a!==null&&(ot(a,e,t),Xl(a,e,t))}function Tp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function Xd(e,t){Tp(e,t),(e=e.alternate)&&Tp(e,t)}function bx(e){if(e.tag===13||e.tag===31){var t=Nn(e,67108864);t!==null&&ot(t,e,67108864),Xd(e,67108864)}}function Ap(e){if(e.tag===13||e.tag===31){var t=vt();t=ad(t);var a=Nn(e,t);a!==null&&ot(a,e,t),Xd(e,t)}}var Pr=!0;function Ob(e,t,a,n){var i=$.T;$.T=null;var r=ce.p;try{ce.p=2,Wd(e,t,a,n)}finally{ce.p=r,$.T=i}}function Db(e,t,a,n){var i=$.T;$.T=null;var r=ce.p;try{ce.p=8,Wd(e,t,a,n)}finally{ce.p=r,$.T=i}}function Wd(e,t,a,n){if(Pr){var i=Mc(n);if(i===null)zo(e,t,n,es,a),Rp(e,n);else if(Lb(i,e,t,a,n))n.stopPropagation();else if(Rp(e,n),t&4&&-1<Mb.indexOf(e)){for(;i!==null;){var r=fl(i);if(r!==null)switch(r.tag){case 3:if(r=r.stateNode,r.current.memoizedState.isDehydrated){var s=tn(r.pendingLanes);if(s!==0){var o=r;for(o.pendingLanes|=2,o.entangledLanes|=2;s;){var c=1<<31-yt(s);o.entanglements[1]|=c,s&=~c}Ft(r),!(oe&6)&&(qr=mt()+500,Ei(0))}}break;case 31:case 13:o=Nn(r,2),o!==null&&ot(o,r,2),Ss(),Xd(r,2)}if(r=Mc(n),r===null&&zo(e,t,n,es,a),r===i)break;i=r}i!==null&&n.stopPropagation()}else zo(e,t,n,null,a)}}function Mc(e){return e=rd(e),Qd(e)}var es=null;function Qd(e){if(es=null,e=Ln(e),e!==null){var t=yi(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=Hf(t),e!==null)return e;e=null}else if(a===31){if(e=_f(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return es=e,null}function yx(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(vm()){case qf:return 2;case Vf:return 8;case Tr:case jm:return 32;case Xf:return 268435456;default:return 32}default:return 32}}var Lc=!1,Ha=null,_a=null,Ga=null,hi=new Map,xi=new Map,za=[],Mb="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Rp(e,t){switch(e){case"focusin":case"focusout":Ha=null;break;case"dragenter":case"dragleave":_a=null;break;case"mouseover":case"mouseout":Ga=null;break;case"pointerover":case"pointerout":hi.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":xi.delete(t.pointerId)}}function Al(e,t,a,n,i,r){return e===null||e.nativeEvent!==r?(e={blockedOn:t,domEventName:a,eventSystemFlags:n,nativeEvent:r,targetContainers:[i]},t!==null&&(t=fl(t),t!==null&&bx(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Lb(e,t,a,n,i){switch(t){case"focusin":return Ha=Al(Ha,e,t,a,n,i),!0;case"dragenter":return _a=Al(_a,e,t,a,n,i),!0;case"mouseover":return Ga=Al(Ga,e,t,a,n,i),!0;case"pointerover":var r=i.pointerId;return hi.set(r,Al(hi.get(r)||null,e,t,a,n,i)),!0;case"gotpointercapture":return r=i.pointerId,xi.set(r,Al(xi.get(r)||null,e,t,a,n,i)),!0}return!1}function vx(e){var t=Ln(e.target);if(t!==null){var a=yi(t);if(a!==null){if(t=a.tag,t===13){if(t=Hf(a),t!==null){e.blockedOn=t,xu(e.priority,function(){Ap(a)});return}}else if(t===31){if(t=_f(a),t!==null){e.blockedOn=t,xu(e.priority,function(){Ap(a)});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function br(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=Mc(e.nativeEvent);if(a===null){a=e.nativeEvent;var n=new a.constructor(a.type,a);ec=n,a.target.dispatchEvent(n),ec=null}else return t=fl(a),t!==null&&bx(t),e.blockedOn=a,!1;t.shift()}return!0}function Bp(e,t,a){br(e)&&a.delete(t)}function Ub(){Lc=!1,Ha!==null&&br(Ha)&&(Ha=null),_a!==null&&br(_a)&&(_a=null),Ga!==null&&br(Ga)&&(Ga=null),hi.forEach(Bp),xi.forEach(Bp)}function Zi(e,t){e.blockedOn===t&&(e.blockedOn=null,Lc||(Lc=!0,He.unstable_scheduleCallback(He.unstable_NormalPriority,Ub)))}var $i=null;function Op(e){$i!==e&&($i=e,He.unstable_scheduleCallback(He.unstable_NormalPriority,function(){$i===e&&($i=null);for(var t=0;t<e.length;t+=3){var a=e[t],n=e[t+1],i=e[t+2];if(typeof n!="function"){if(Qd(n||a)===null)continue;break}var r=fl(a);r!==null&&(e.splice(t,3),t-=3,gc(r,{pending:!0,data:i,method:a.method,action:n},n,i))}}))}function cl(e){function t(c){return Zi(c,e)}Ha!==null&&Zi(Ha,e),_a!==null&&Zi(_a,e),Ga!==null&&Zi(Ga,e),hi.forEach(t),xi.forEach(t);for(var a=0;a<za.length;a++){var n=za[a];n.blockedOn===e&&(n.blockedOn=null)}for(;0<za.length&&(a=za[0],a.blockedOn===null);)vx(a),a.blockedOn===null&&za.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(n=0;n<a.length;n+=3){var i=a[n],r=a[n+1],s=i[ut]||null;if(typeof r=="function")s||Op(a);else if(s){var o=null;if(r&&r.hasAttribute("formAction")){if(i=r,s=r[ut]||null)o=s.formAction;else if(Qd(i)!==null)continue}else o=s.action;typeof o=="function"?a[n+1]=o:(a.splice(n,3),n-=3),Op(a)}}}function jx(){function e(r){r.canIntercept&&r.info==="react-transition"&&r.intercept({handler:function(){return new Promise(function(s){return i=s})},focusReset:"manual",scroll:"manual"})}function t(){i!==null&&(i(),i=null),n||setTimeout(a,20)}function a(){if(!n&&!navigation.transition){var r=navigation.currentEntry;r&&r.url!=null&&navigation.navigate(r.url,{state:r.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var n=!1,i=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(a,100),function(){n=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),i!==null&&(i(),i=null)}}}function Fd(e){this._internalRoot=e}Ns.prototype.render=Fd.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(D(409));var a=t.current,n=vt();mx(a,n,e,t,null,null)};Ns.prototype.unmount=Fd.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;mx(e.current,2,null,e,null,null),Ss(),t[pl]=null}};function Ns(e){this._internalRoot=e}Ns.prototype.unstable_scheduleHydration=function(e){if(e){var t=$f();e={blockedOn:null,target:e,priority:t};for(var a=0;a<za.length&&t!==0&&t<za[a].priority;a++);za.splice(a,0,e),a===0&&vx(e)}};var Dp=Lf.version;if(Dp!=="19.2.1")throw Error(D(527,Dp,"19.2.1"));ce.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(D(188)):(e=Object.keys(e).join(","),Error(D(268,e)));return e=fm(t),e=e!==null?Gf(e):null,e=e===null?null:e.stateNode,e};var Hb={bundleType:0,version:"19.2.1",rendererPackageName:"react-dom",currentDispatcherRef:$,reconcilerVersion:"19.2.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ki=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ki.isDisabled&&Ki.supportsFiber)try{vi=Ki.inject(Hb),bt=Ki}catch{}}cs.createRoot=function(e,t){if(!Uf(e))throw Error(D(299));var a=!1,n="",i=p0,r=f0,s=h0;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onUncaughtError!==void 0&&(i=t.onUncaughtError),t.onCaughtError!==void 0&&(r=t.onCaughtError),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=xx(e,1,!1,null,null,a,n,null,i,r,s,jx),e[pl]=t.current,Id(e),new Fd(t)};cs.hydrateRoot=function(e,t,a){if(!Uf(e))throw Error(D(299));var n=!1,i="",r=p0,s=f0,o=h0,c=null;return a!=null&&(a.unstable_strictMode===!0&&(n=!0),a.identifierPrefix!==void 0&&(i=a.identifierPrefix),a.onUncaughtError!==void 0&&(r=a.onUncaughtError),a.onCaughtError!==void 0&&(s=a.onCaughtError),a.onRecoverableError!==void 0&&(o=a.onRecoverableError),a.formState!==void 0&&(c=a.formState)),t=xx(e,1,!0,t,a??null,n,i,c,r,s,o,jx),t.context=gx(null),a=t.current,n=vt(),n=ad(n),i=Da(n),i.callback=null,Ma(a,i,n),a=n,t.current.lanes=a,wi(t,a),Ft(t),e[pl]=t.current,Id(e),new Ns(t)};cs.version="19.2.1";function wx(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(wx)}catch(e){console.error(e)}}wx(),Af.exports=cs;var _b=Af.exports;const Gb=vf(_b);/**
 * @remix-run/router v1.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function gi(){return gi=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},gi.apply(this,arguments)}var Ra;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(Ra||(Ra={}));const Mp="popstate";function Yb(e){e===void 0&&(e={});function t(n,i){let{pathname:r,search:s,hash:o}=n.location;return Uc("",{pathname:r,search:s,hash:o},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function a(n,i){return typeof i=="string"?i:Sx(i)}return qb(t,a,null,e)}function Ue(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Zd(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Ib(){return Math.random().toString(36).substr(2,8)}function Lp(e,t){return{usr:e.state,key:e.key,idx:t}}function Uc(e,t,a,n){return a===void 0&&(a=null),gi({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?yl(t):t,{state:a,key:t&&t.key||n||Ib()})}function Sx(e){let{pathname:t="/",search:a="",hash:n=""}=e;return a&&a!=="?"&&(t+=a.charAt(0)==="?"?a:"?"+a),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function yl(e){let t={};if(e){let a=e.indexOf("#");a>=0&&(t.hash=e.substr(a),e=e.substr(0,a));let n=e.indexOf("?");n>=0&&(t.search=e.substr(n),e=e.substr(0,n)),e&&(t.pathname=e)}return t}function qb(e,t,a,n){n===void 0&&(n={});let{window:i=document.defaultView,v5Compat:r=!1}=n,s=i.history,o=Ra.Pop,c=null,d=p();d==null&&(d=0,s.replaceState(gi({},s.state,{idx:d}),""));function p(){return(s.state||{idx:null}).idx}function f(){o=Ra.Pop;let w=p(),h=w==null?null:w-d;d=w,c&&c({action:o,location:j.location,delta:h})}function u(w,h){o=Ra.Push;let g=Uc(j.location,w,h);d=p()+1;let v=Lp(g,d),y=j.createHref(g);try{s.pushState(v,"",y)}catch(k){if(k instanceof DOMException&&k.name==="DataCloneError")throw k;i.location.assign(y)}r&&c&&c({action:o,location:j.location,delta:1})}function x(w,h){o=Ra.Replace;let g=Uc(j.location,w,h);d=p();let v=Lp(g,d),y=j.createHref(g);s.replaceState(v,"",y),r&&c&&c({action:o,location:j.location,delta:0})}function m(w){let h=i.location.origin!=="null"?i.location.origin:i.location.href,g=typeof w=="string"?w:Sx(w);return g=g.replace(/ $/,"%20"),Ue(h,"No window.location.(origin|href) available to create URL for href: "+g),new URL(g,h)}let j={get action(){return o},get location(){return e(i,s)},listen(w){if(c)throw new Error("A history only accepts one active listener");return i.addEventListener(Mp,f),c=w,()=>{i.removeEventListener(Mp,f),c=null}},createHref(w){return t(i,w)},createURL:m,encodeLocation(w){let h=m(w);return{pathname:h.pathname,search:h.search,hash:h.hash}},push:u,replace:x,go(w){return s.go(w)}};return j}var Up;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Up||(Up={}));function Vb(e,t,a){return a===void 0&&(a="/"),Xb(e,t,a)}function Xb(e,t,a,n){let i=typeof t=="string"?yl(t):t,r=Nx(i.pathname||"/",a);if(r==null)return null;let s=Cx(e);Wb(s);let o=null;for(let c=0;o==null&&c<s.length;++c){let d=ly(r);o=ty(s[c],d)}return o}function Cx(e,t,a,n){t===void 0&&(t=[]),a===void 0&&(a=[]),n===void 0&&(n="");let i=(r,s,o)=>{let c={relativePath:o===void 0?r.path||"":o,caseSensitive:r.caseSensitive===!0,childrenIndex:s,route:r};c.relativePath.startsWith("/")&&(Ue(c.relativePath.startsWith(n),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+n+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(n.length));let d=pn([n,c.relativePath]),p=a.concat(c);r.children&&r.children.length>0&&(Ue(r.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+d+'".')),Cx(r.children,t,p,d)),!(r.path==null&&!r.index)&&t.push({path:d,score:Pb(d,r.index),routesMeta:p})};return e.forEach((r,s)=>{var o;if(r.path===""||!((o=r.path)!=null&&o.includes("?")))i(r,s);else for(let c of zx(r.path))i(r,s,c)}),t}function zx(e){let t=e.split("/");if(t.length===0)return[];let[a,...n]=t,i=a.endsWith("?"),r=a.replace(/\?$/,"");if(n.length===0)return i?[r,""]:[r];let s=zx(n.join("/")),o=[];return o.push(...s.map(c=>c===""?r:[r,c].join("/"))),i&&o.push(...s),o.map(c=>e.startsWith("/")&&c===""?"/":c)}function Wb(e){e.sort((t,a)=>t.score!==a.score?a.score-t.score:ey(t.routesMeta.map(n=>n.childrenIndex),a.routesMeta.map(n=>n.childrenIndex)))}const Qb=/^:[\w-]+$/,Fb=3,Zb=2,$b=1,Kb=10,Jb=-2,Hp=e=>e==="*";function Pb(e,t){let a=e.split("/"),n=a.length;return a.some(Hp)&&(n+=Jb),t&&(n+=Zb),a.filter(i=>!Hp(i)).reduce((i,r)=>i+(Qb.test(r)?Fb:r===""?$b:Kb),n)}function ey(e,t){return e.length===t.length&&e.slice(0,-1).every((n,i)=>n===t[i])?e[e.length-1]-t[t.length-1]:0}function ty(e,t,a){let{routesMeta:n}=e,i={},r="/",s=[];for(let o=0;o<n.length;++o){let c=n[o],d=o===n.length-1,p=r==="/"?t:t.slice(r.length)||"/",f=ay({path:c.relativePath,caseSensitive:c.caseSensitive,end:d},p),u=c.route;if(!f)return null;Object.assign(i,f.params),s.push({params:i,pathname:pn([r,f.pathname]),pathnameBase:uy(pn([r,f.pathnameBase])),route:u}),f.pathnameBase!=="/"&&(r=pn([r,f.pathnameBase]))}return s}function ay(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[a,n]=ny(e.path,e.caseSensitive,e.end),i=t.match(a);if(!i)return null;let r=i[0],s=r.replace(/(.)\/+$/,"$1"),o=i.slice(1);return{params:n.reduce((d,p,f)=>{let{paramName:u,isOptional:x}=p;if(u==="*"){let j=o[f]||"";s=r.slice(0,r.length-j.length).replace(/(.)\/+$/,"$1")}const m=o[f];return x&&!m?d[u]=void 0:d[u]=(m||"").replace(/%2F/g,"/"),d},{}),pathname:r,pathnameBase:s,pattern:e}}function ny(e,t,a){t===void 0&&(t=!1),a===void 0&&(a=!0),Zd(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let n=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(s,o,c)=>(n.push({paramName:o,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),i+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):a?i+="\\/*$":e!==""&&e!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,t?void 0:"i"),n]}function ly(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Zd(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function Nx(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let a=t.endsWith("/")?t.length-1:t.length,n=e.charAt(a);return n&&n!=="/"?null:e.slice(a)||"/"}const iy=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,ry=e=>iy.test(e);function sy(e,t){t===void 0&&(t="/");let{pathname:a,search:n="",hash:i=""}=typeof e=="string"?yl(e):e,r;if(a)if(ry(a))r=a;else{if(a.includes("//")){let s=a;a=a.replace(/\/\/+/g,"/"),Zd(!1,"Pathnames cannot have embedded double slashes - normalizing "+(s+" -> "+a))}a.startsWith("/")?r=_p(a.substring(1),"/"):r=_p(a,t)}else r=t;return{pathname:r,search:py(n),hash:fy(i)}}function _p(e,t){let a=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(i=>{i===".."?a.length>1&&a.pop():i!=="."&&a.push(i)}),a.length>1?a.join("/"):"/"}function Eo(e,t,a,n){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(n)+"].  Please separate it out to the ")+("`to."+a+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function oy(e){return e.filter((t,a)=>a===0||t.route.path&&t.route.path.length>0)}function cy(e,t){let a=oy(e);return t?a.map((n,i)=>i===a.length-1?n.pathname:n.pathnameBase):a.map(n=>n.pathnameBase)}function dy(e,t,a,n){n===void 0&&(n=!1);let i;typeof e=="string"?i=yl(e):(i=gi({},e),Ue(!i.pathname||!i.pathname.includes("?"),Eo("?","pathname","search",i)),Ue(!i.pathname||!i.pathname.includes("#"),Eo("#","pathname","hash",i)),Ue(!i.search||!i.search.includes("#"),Eo("#","search","hash",i)));let r=e===""||i.pathname==="",s=r?"/":i.pathname,o;if(s==null)o=a;else{let f=t.length-1;if(!n&&s.startsWith("..")){let u=s.split("/");for(;u[0]==="..";)u.shift(),f-=1;i.pathname=u.join("/")}o=f>=0?t[f]:"/"}let c=sy(i,o),d=s&&s!=="/"&&s.endsWith("/"),p=(r||s===".")&&a.endsWith("/");return!c.pathname.endsWith("/")&&(d||p)&&(c.pathname+="/"),c}const pn=e=>e.join("/").replace(/\/\/+/g,"/"),uy=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),py=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,fy=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function hy(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const kx=["post","put","patch","delete"];new Set(kx);const xy=["get",...kx];new Set(xy);/**
 * React Router v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function mi(){return mi=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},mi.apply(this,arguments)}const $d=b.createContext(null),gy=b.createContext(null),ks=b.createContext(null),Es=b.createContext(null),En=b.createContext({outlet:null,matches:[],isDataRoute:!1}),Ex=b.createContext(null);function Ts(){return b.useContext(Es)!=null}function As(){return Ts()||Ue(!1),b.useContext(Es).location}function Tx(e){b.useContext(ks).static||b.useLayoutEffect(e)}function Zt(){let{isDataRoute:e}=b.useContext(En);return e?Ay():my()}function my(){Ts()||Ue(!1);let e=b.useContext($d),{basename:t,future:a,navigator:n}=b.useContext(ks),{matches:i}=b.useContext(En),{pathname:r}=As(),s=JSON.stringify(cy(i,a.v7_relativeSplatPath)),o=b.useRef(!1);return Tx(()=>{o.current=!0}),b.useCallback(function(d,p){if(p===void 0&&(p={}),!o.current)return;if(typeof d=="number"){n.go(d);return}let f=dy(d,JSON.parse(s),r,p.relative==="path");e==null&&t!=="/"&&(f.pathname=f.pathname==="/"?t:pn([t,f.pathname])),(p.replace?n.replace:n.push)(f,p.state,p)},[t,n,s,r,e])}function by(){let{matches:e}=b.useContext(En),t=e[e.length-1];return t?t.params:{}}function yy(e,t){return vy(e,t)}function vy(e,t,a,n){Ts()||Ue(!1);let{navigator:i}=b.useContext(ks),{matches:r}=b.useContext(En),s=r[r.length-1],o=s?s.params:{};s&&s.pathname;let c=s?s.pathnameBase:"/";s&&s.route;let d=As(),p;if(t){var f;let w=typeof t=="string"?yl(t):t;c==="/"||(f=w.pathname)!=null&&f.startsWith(c)||Ue(!1),p=w}else p=d;let u=p.pathname||"/",x=u;if(c!=="/"){let w=c.replace(/^\//,"").split("/");x="/"+u.replace(/^\//,"").split("/").slice(w.length).join("/")}let m=Vb(e,{pathname:x}),j=zy(m&&m.map(w=>Object.assign({},w,{params:Object.assign({},o,w.params),pathname:pn([c,i.encodeLocation?i.encodeLocation(w.pathname).pathname:w.pathname]),pathnameBase:w.pathnameBase==="/"?c:pn([c,i.encodeLocation?i.encodeLocation(w.pathnameBase).pathname:w.pathnameBase])})),r,a,n);return t&&j?b.createElement(Es.Provider,{value:{location:mi({pathname:"/",search:"",hash:"",state:null,key:"default"},p),navigationType:Ra.Pop}},j):j}function jy(){let e=Ty(),t=hy(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),a=e instanceof Error?e.stack:null,i={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return b.createElement(b.Fragment,null,b.createElement("h2",null,"Unexpected Application Error!"),b.createElement("h3",{style:{fontStyle:"italic"}},t),a?b.createElement("pre",{style:i},a):null,null)}const wy=b.createElement(jy,null);class Sy extends b.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,a){return a.location!==t.location||a.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:a.error,location:a.location,revalidation:t.revalidation||a.revalidation}}componentDidCatch(t,a){console.error("React Router caught the following error during render",t,a)}render(){return this.state.error!==void 0?b.createElement(En.Provider,{value:this.props.routeContext},b.createElement(Ex.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Cy(e){let{routeContext:t,match:a,children:n}=e,i=b.useContext($d);return i&&i.static&&i.staticContext&&(a.route.errorElement||a.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=a.route.id),b.createElement(En.Provider,{value:t},n)}function zy(e,t,a,n){var i;if(t===void 0&&(t=[]),a===void 0&&(a=null),n===void 0&&(n=null),e==null){var r;if(!a)return null;if(a.errors)e=a.matches;else if((r=n)!=null&&r.v7_partialHydration&&t.length===0&&!a.initialized&&a.matches.length>0)e=a.matches;else return null}let s=e,o=(i=a)==null?void 0:i.errors;if(o!=null){let p=s.findIndex(f=>f.route.id&&(o==null?void 0:o[f.route.id])!==void 0);p>=0||Ue(!1),s=s.slice(0,Math.min(s.length,p+1))}let c=!1,d=-1;if(a&&n&&n.v7_partialHydration)for(let p=0;p<s.length;p++){let f=s[p];if((f.route.HydrateFallback||f.route.hydrateFallbackElement)&&(d=p),f.route.id){let{loaderData:u,errors:x}=a,m=f.route.loader&&u[f.route.id]===void 0&&(!x||x[f.route.id]===void 0);if(f.route.lazy||m){c=!0,d>=0?s=s.slice(0,d+1):s=[s[0]];break}}}return s.reduceRight((p,f,u)=>{let x,m=!1,j=null,w=null;a&&(x=o&&f.route.id?o[f.route.id]:void 0,j=f.route.errorElement||wy,c&&(d<0&&u===0?(Ry("route-fallback"),m=!0,w=null):d===u&&(m=!0,w=f.route.hydrateFallbackElement||null)));let h=t.concat(s.slice(0,u+1)),g=()=>{let v;return x?v=j:m?v=w:f.route.Component?v=b.createElement(f.route.Component,null):f.route.element?v=f.route.element:v=p,b.createElement(Cy,{match:f,routeContext:{outlet:p,matches:h,isDataRoute:a!=null},children:v})};return a&&(f.route.ErrorBoundary||f.route.errorElement||u===0)?b.createElement(Sy,{location:a.location,revalidation:a.revalidation,component:j,error:x,children:g(),routeContext:{outlet:null,matches:h,isDataRoute:!0}}):g()},null)}var Ax=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(Ax||{}),Rx=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Rx||{});function Ny(e){let t=b.useContext($d);return t||Ue(!1),t}function ky(e){let t=b.useContext(gy);return t||Ue(!1),t}function Ey(e){let t=b.useContext(En);return t||Ue(!1),t}function Bx(e){let t=Ey(),a=t.matches[t.matches.length-1];return a.route.id||Ue(!1),a.route.id}function Ty(){var e;let t=b.useContext(Ex),a=ky(),n=Bx();return t!==void 0?t:(e=a.errors)==null?void 0:e[n]}function Ay(){let{router:e}=Ny(Ax.UseNavigateStable),t=Bx(Rx.UseNavigateStable),a=b.useRef(!1);return Tx(()=>{a.current=!0}),b.useCallback(function(i,r){r===void 0&&(r={}),a.current&&(typeof i=="number"?e.navigate(i):e.navigate(i,mi({fromRouteId:t},r)))},[e,t])}const Gp={};function Ry(e,t,a){Gp[e]||(Gp[e]=!0)}function By(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function Re(e){Ue(!1)}function Oy(e){let{basename:t="/",children:a=null,location:n,navigationType:i=Ra.Pop,navigator:r,static:s=!1,future:o}=e;Ts()&&Ue(!1);let c=t.replace(/^\/*/,"/"),d=b.useMemo(()=>({basename:c,navigator:r,static:s,future:mi({v7_relativeSplatPath:!1},o)}),[c,o,r,s]);typeof n=="string"&&(n=yl(n));let{pathname:p="/",search:f="",hash:u="",state:x=null,key:m="default"}=n,j=b.useMemo(()=>{let w=Nx(p,c);return w==null?null:{location:{pathname:w,search:f,hash:u,state:x,key:m},navigationType:i}},[c,p,f,u,x,m,i]);return j==null?null:b.createElement(ks.Provider,{value:d},b.createElement(Es.Provider,{children:a,value:j}))}function Ox(e){let{children:t,location:a}=e;return yy(Hc(t),a)}new Promise(()=>{});function Hc(e,t){t===void 0&&(t=[]);let a=[];return b.Children.forEach(e,(n,i)=>{if(!b.isValidElement(n))return;let r=[...t,i];if(n.type===b.Fragment){a.push.apply(a,Hc(n.props.children,r));return}n.type!==Re&&Ue(!1),!n.props.index||!n.props.children||Ue(!1);let s={id:n.props.id||r.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(s.children=Hc(n.props.children,r)),a.push(s)}),a}/**
 * React Router DOM v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Dy="6";try{window.__reactRouterVersion=Dy}catch{}const My="startTransition",Yp=rm[My];function Ly(e){let{basename:t,children:a,future:n,window:i}=e,r=b.useRef();r.current==null&&(r.current=Yb({window:i,v5Compat:!0}));let s=r.current,[o,c]=b.useState({action:s.action,location:s.location}),{v7_startTransition:d}=n||{},p=b.useCallback(f=>{d&&Yp?Yp(()=>c(f)):c(f)},[c,d]);return b.useLayoutEffect(()=>s.listen(p),[s,p]),b.useEffect(()=>By(n),[n]),b.createElement(Oy,{basename:t,children:a,location:o.location,navigationType:o.action,navigator:s,future:n})}var Ip;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Ip||(Ip={}));var qp;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(qp||(qp={}));const Dx="http://localhost:5000",_c=e=>e.replace(/\/+$/,""),Mx=e=>e.startsWith("/")?e:`/${e}`,Ht=_c(`${_c(Dx)}/api`),Rs=_c(Ht.replace(/\/api$/i,"")||Dx),Lx=`${Ht}/Admin`,ts=e=>`${Ht}${Mx(e)}`,Uy=e=>`${Rs}${Mx(e)}`;async function Ux(){const e=await fetch(ts("/courses"),{headers:{Accept:"application/json"}});if(!e.ok){const t=await e.text();throw new Error(`Failed to fetch courses: ${e.status} ${t}`)}return e.json()}async function Hy(e){const t=await fetch(ts(`/courses/${e}`),{headers:{Accept:"application/json"}});if(!t.ok){const a=await t.text();throw new Error(`Failed to fetch course ${e}: ${t.status} ${a}`)}return t.json()}var Hx={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},Vp=Vt.createContext&&Vt.createContext(Hx),_y=["attr","size","title"];function Gy(e,t){if(e==null)return{};var a=Yy(e,t),n,i;if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function Yy(e,t){if(e==null)return{};var a={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){if(t.indexOf(n)>=0)continue;a[n]=e[n]}return a}function as(){return as=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},as.apply(this,arguments)}function Xp(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),a.push.apply(a,n)}return a}function ns(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]!=null?arguments[t]:{};t%2?Xp(Object(a),!0).forEach(function(n){Iy(e,n,a[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):Xp(Object(a)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))})}return e}function Iy(e,t,a){return t=qy(t),t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function qy(e){var t=Vy(e,"string");return typeof t=="symbol"?t:t+""}function Vy(e,t){if(typeof e!="object"||!e)return e;var a=e[Symbol.toPrimitive];if(a!==void 0){var n=a.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function _x(e){return e&&e.map((t,a)=>Vt.createElement(t.tag,ns({key:a},t.attr),_x(t.child)))}function V(e){return t=>Vt.createElement(Xy,as({attr:ns({},e.attr)},t),_x(e.child))}function Xy(e){var t=a=>{var{attr:n,size:i,title:r}=e,s=Gy(e,_y),o=i||a.size||"1em",c;return a.className&&(c=a.className),e.className&&(c=(c?c+" ":"")+e.className),Vt.createElement("svg",as({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},a.attr,n,s,{className:c,style:ns(ns({color:e.color||a.color},a.style),e.style),height:o,width:o,xmlns:"http://www.w3.org/2000/svg"}),r&&Vt.createElement("title",null,r),e.children)};return Vp!==void 0?Vt.createElement(Vp.Consumer,null,a=>t(a)):t(Hx)}function Fe(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"},child:[]}]})(e)}function da(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z",clipRule:"evenodd"},child:[]}]})(e)}function Wp(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z",clipRule:"evenodd"},child:[]}]})(e)}function Gc(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"},child:[]}]})(e)}function Wy(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z",clipRule:"evenodd"},child:[]}]})(e)}function Kd(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"},child:[]}]})(e)}function Gx(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"},child:[]},{tag:"path",attr:{d:"M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"},child:[]}]})(e)}function st(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"},child:[]}]})(e)}function Yc(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",clipRule:"evenodd"},child:[]}]})(e)}function ls(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",clipRule:"evenodd"},child:[]}]})(e)}function ma(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",clipRule:"evenodd"},child:[]}]})(e)}function ba(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",clipRule:"evenodd"},child:[]}]})(e)}function Yx(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",clipRule:"evenodd"},child:[]}]})(e)}function Qa(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z",clipRule:"evenodd"},child:[]}]})(e)}function Qy(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z",clipRule:"evenodd"},child:[]}]})(e)}function Ix(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"},child:[]},{tag:"path",attr:{fillRule:"evenodd",d:"M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z",clipRule:"evenodd"},child:[]}]})(e)}function qx(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 100 2h1a2 2 0 011.732 1H7a1 1 0 100 2h2.732A2 2 0 018 11H7a1 1 0 00-.707 1.707l3 3a1 1 0 001.414-1.414l-1.483-1.484A4.008 4.008 0 0011.874 10H13a1 1 0 100-2h-1.126a3.976 3.976 0 00-.41-1H13a1 1 0 100-2H7z",clipRule:"evenodd"},child:[]}]})(e)}function Fy(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z",clipRule:"evenodd"},child:[]}]})(e)}function Zy(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",clipRule:"evenodd"},child:[]}]})(e)}function Bs(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",clipRule:"evenodd"},child:[]}]})(e)}function To(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z",clipRule:"evenodd"},child:[]},{tag:"path",attr:{d:"M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"},child:[]}]})(e)}function ei(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M10 12a2 2 0 100-4 2 2 0 000 4z"},child:[]},{tag:"path",attr:{fillRule:"evenodd",d:"M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z",clipRule:"evenodd"},child:[]}]})(e)}function Qp(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z",clipRule:"evenodd"},child:[]}]})(e)}function $y(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z",clipRule:"evenodd"},child:[]}]})(e)}function Ao(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z",clipRule:"evenodd"},child:[]}]})(e)}function Vx(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"},child:[]}]})(e)}function is(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z",clipRule:"evenodd"},child:[]}]})(e)}function Xx(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z",clipRule:"evenodd"},child:[]}]})(e)}function yr(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",clipRule:"evenodd"},child:[]}]})(e)}function rs(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z",clipRule:"evenodd"},child:[]}]})(e)}function Fa(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"},child:[]},{tag:"path",attr:{d:"M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"},child:[]}]})(e)}function Jd(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",clipRule:"evenodd"},child:[]}]})(e)}function Ky(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"},child:[]}]})(e)}function Jy(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"},child:[]},{tag:"path",attr:{fillRule:"evenodd",d:"M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z",clipRule:"evenodd"},child:[]}]})(e)}function Wt(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"},child:[]}]})(e)}function Wx(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"},child:[]}]})(e)}function ln(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z",clipRule:"evenodd"},child:[]}]})(e)}function Ya(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",clipRule:"evenodd"},child:[]}]})(e)}function bi(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z",clipRule:"evenodd"},child:[]}]})(e)}function Fp(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",clipRule:"evenodd"},child:[]}]})(e)}function vr(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"},child:[]}]})(e)}function vl(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",clipRule:"evenodd"},child:[]}]})(e)}function _l(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"},child:[]}]})(e)}function Qx(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"},child:[]}]})(e)}function Ji(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z",clipRule:"evenodd"},child:[]}]})(e)}function fn(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"},child:[]}]})(e)}function $e(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z",clipRule:"evenodd"},child:[]}]})(e)}function jr(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z",clipRule:"evenodd"},child:[]}]})(e)}function Ia(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"},child:[]}]})(e)}function Pd(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z",clipRule:"evenodd"},child:[]}]})(e)}function jl(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"},child:[]}]})(e)}function wr(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"},child:[]}]})(e)}function Py(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",clipRule:"evenodd"},child:[]}]})(e)}function et(e){return V({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"},child:[]}]})(e)}const vn=()=>{try{const e=localStorage.getItem("user");if(!e)return null;const t=JSON.parse(e);return!t.userId||!t.email?(console.error("Invalid user object in localStorage"),null):t}catch(e){return console.error("Error parsing user from localStorage:",e),null}},Pi=()=>{const e=vn();if(!e||!e.userId)throw new Error("No authenticated user found. Please log in.");return e.userId},e2=e=>{localStorage.setItem("user",JSON.stringify(e))},t2=()=>{localStorage.removeItem("user")},Os=e=>{const t=vn();if(!t||!t.userId)throw e("/"),new Error("Authentication required");return t},Pe=Ht,eu={GET:`${Pe}/Cart`,ADD:`${Pe}/Cart/add`,REMOVE:`${Pe}/Cart/remove`},Fx={CREATE_ORDER:`${Pe}/payment/create-order`,VERIFY:`${Pe}/payment/verify-payment`},Ds={GET_PROFILE:e=>`${Pe}/Users/${e}`,UPDATE_PROFILE:e=>`${Pe}/Users/${e}`,UPLOAD_PHOTO:e=>`${Pe}/Users/${e}/upload-photo`,DELETE_PHOTO:e=>`${Pe}/Users/${e}/delete-photo`},Zx={GET:e=>`${Pe}/Enrollment/${e}`,CHECK:(e,t)=>`${Pe}/Enrollment/check/${e}/${t}`,CREATE:`${Pe}/Enrollment`},a2={GET:`${Pe}/About`},$x=`${Pe}/CourseProgress`;async function Ri(e){var t,a,n,i;try{const r=Zx.GET(e);console.log("📡 Fetching enrollments from:",r);const s=await fetch(r,{method:"GET",headers:{"Content-Type":"application/json"}});if(console.log("📥 Response status:",s.status,s.statusText),!s.ok){const c=await s.json().catch(()=>({}));throw console.error("❌ API Error Response:",c),new Error(c.message||`Failed to fetch enrollments (${s.status})`)}const o=await s.json();return console.log("✅ Raw API Response:",o),console.log("✅ Response type:",Array.isArray(o)?"Array":typeof o),console.log("✅ Number of items:",Array.isArray(o)?o.length:"N/A"),Array.isArray(o)&&o.length>0&&console.log("✅ First enrollment structure:",{id:o[0].id,userId:o[0].userId,courseId:o[0].courseId,hasCourse:!!o[0].course,courseTitle:(t=o[0].course)==null?void 0:t.title,hasInstructor:!!((a=o[0].course)!=null&&a.instructor),instructorName:(i=(n=o[0].course)==null?void 0:n.instructor)==null?void 0:i.name}),o}catch(r){throw console.error("❌ Error fetching enrollments:",r),console.error("❌ Error stack:",r.stack),new Error(r.message||"Failed to fetch enrollments")}}async function n2(e,t){try{const a=Zx.CHECK(e,t);console.log("🔍 Checking enrollment:",a);const n=await fetch(a,{method:"GET",headers:{"Content-Type":"application/json"}});if(!n.ok)throw console.error("❌ Check enrollment failed:",n.status),new Error("Failed to check enrollment status");const i=await n.json();return console.log("✅ Enrollment check result:",i),i.isEnrolled||!1}catch(a){return console.error("❌ Error checking enrollment:",a),!1}}function Kx(e,t){return function(){return e.apply(t,arguments)}}const{toString:l2}=Object.prototype,{getPrototypeOf:tu}=Object,{iterator:Ms,toStringTag:Jx}=Symbol,Ls=(e=>t=>{const a=l2.call(t);return e[a]||(e[a]=a.slice(8,-1).toLowerCase())})(Object.create(null)),_t=e=>(e=e.toLowerCase(),t=>Ls(t)===e),Us=e=>t=>typeof t===e,{isArray:wl}=Array,dl=Us("undefined");function Bi(e){return e!==null&&!dl(e)&&e.constructor!==null&&!dl(e.constructor)&&ct(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Px=_t("ArrayBuffer");function i2(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Px(e.buffer),t}const r2=Us("string"),ct=Us("function"),eg=Us("number"),Oi=e=>e!==null&&typeof e=="object",s2=e=>e===!0||e===!1,Sr=e=>{if(Ls(e)!=="object")return!1;const t=tu(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Jx in e)&&!(Ms in e)},o2=e=>{if(!Oi(e)||Bi(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},c2=_t("Date"),d2=_t("File"),u2=_t("Blob"),p2=_t("FileList"),f2=e=>Oi(e)&&ct(e.pipe),h2=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||ct(e.append)&&((t=Ls(e))==="formdata"||t==="object"&&ct(e.toString)&&e.toString()==="[object FormData]"))},x2=_t("URLSearchParams"),[g2,m2,b2,y2]=["ReadableStream","Request","Response","Headers"].map(_t),v2=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Di(e,t,{allOwnKeys:a=!1}={}){if(e===null||typeof e>"u")return;let n,i;if(typeof e!="object"&&(e=[e]),wl(e))for(n=0,i=e.length;n<i;n++)t.call(null,e[n],n,e);else{if(Bi(e))return;const r=a?Object.getOwnPropertyNames(e):Object.keys(e),s=r.length;let o;for(n=0;n<s;n++)o=r[n],t.call(null,e[o],o,e)}}function tg(e,t){if(Bi(e))return null;t=t.toLowerCase();const a=Object.keys(e);let n=a.length,i;for(;n-- >0;)if(i=a[n],t===i.toLowerCase())return i;return null}const rn=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,ag=e=>!dl(e)&&e!==rn;function Ic(){const{caseless:e,skipUndefined:t}=ag(this)&&this||{},a={},n=(i,r)=>{const s=e&&tg(a,r)||r;Sr(a[s])&&Sr(i)?a[s]=Ic(a[s],i):Sr(i)?a[s]=Ic({},i):wl(i)?a[s]=i.slice():(!t||!dl(i))&&(a[s]=i)};for(let i=0,r=arguments.length;i<r;i++)arguments[i]&&Di(arguments[i],n);return a}const j2=(e,t,a,{allOwnKeys:n}={})=>(Di(t,(i,r)=>{a&&ct(i)?e[r]=Kx(i,a):e[r]=i},{allOwnKeys:n}),e),w2=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),S2=(e,t,a,n)=>{e.prototype=Object.create(t.prototype,n),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),a&&Object.assign(e.prototype,a)},C2=(e,t,a,n)=>{let i,r,s;const o={};if(t=t||{},e==null)return t;do{for(i=Object.getOwnPropertyNames(e),r=i.length;r-- >0;)s=i[r],(!n||n(s,e,t))&&!o[s]&&(t[s]=e[s],o[s]=!0);e=a!==!1&&tu(e)}while(e&&(!a||a(e,t))&&e!==Object.prototype);return t},z2=(e,t,a)=>{e=String(e),(a===void 0||a>e.length)&&(a=e.length),a-=t.length;const n=e.indexOf(t,a);return n!==-1&&n===a},N2=e=>{if(!e)return null;if(wl(e))return e;let t=e.length;if(!eg(t))return null;const a=new Array(t);for(;t-- >0;)a[t]=e[t];return a},k2=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&tu(Uint8Array)),E2=(e,t)=>{const n=(e&&e[Ms]).call(e);let i;for(;(i=n.next())&&!i.done;){const r=i.value;t.call(e,r[0],r[1])}},T2=(e,t)=>{let a;const n=[];for(;(a=e.exec(t))!==null;)n.push(a);return n},A2=_t("HTMLFormElement"),R2=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(a,n,i){return n.toUpperCase()+i}),Zp=(({hasOwnProperty:e})=>(t,a)=>e.call(t,a))(Object.prototype),B2=_t("RegExp"),ng=(e,t)=>{const a=Object.getOwnPropertyDescriptors(e),n={};Di(a,(i,r)=>{let s;(s=t(i,r,e))!==!1&&(n[r]=s||i)}),Object.defineProperties(e,n)},O2=e=>{ng(e,(t,a)=>{if(ct(e)&&["arguments","caller","callee"].indexOf(a)!==-1)return!1;const n=e[a];if(ct(n)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+a+"'")})}})},D2=(e,t)=>{const a={},n=i=>{i.forEach(r=>{a[r]=!0})};return wl(e)?n(e):n(String(e).split(t)),a},M2=()=>{},L2=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function U2(e){return!!(e&&ct(e.append)&&e[Jx]==="FormData"&&e[Ms])}const H2=e=>{const t=new Array(10),a=(n,i)=>{if(Oi(n)){if(t.indexOf(n)>=0)return;if(Bi(n))return n;if(!("toJSON"in n)){t[i]=n;const r=wl(n)?[]:{};return Di(n,(s,o)=>{const c=a(s,i+1);!dl(c)&&(r[o]=c)}),t[i]=void 0,r}}return n};return a(e,0)},_2=_t("AsyncFunction"),G2=e=>e&&(Oi(e)||ct(e))&&ct(e.then)&&ct(e.catch),lg=((e,t)=>e?setImmediate:t?((a,n)=>(rn.addEventListener("message",({source:i,data:r})=>{i===rn&&r===a&&n.length&&n.shift()()},!1),i=>{n.push(i),rn.postMessage(a,"*")}))(`axios@${Math.random()}`,[]):a=>setTimeout(a))(typeof setImmediate=="function",ct(rn.postMessage)),Y2=typeof queueMicrotask<"u"?queueMicrotask.bind(rn):typeof process<"u"&&process.nextTick||lg,I2=e=>e!=null&&ct(e[Ms]),z={isArray:wl,isArrayBuffer:Px,isBuffer:Bi,isFormData:h2,isArrayBufferView:i2,isString:r2,isNumber:eg,isBoolean:s2,isObject:Oi,isPlainObject:Sr,isEmptyObject:o2,isReadableStream:g2,isRequest:m2,isResponse:b2,isHeaders:y2,isUndefined:dl,isDate:c2,isFile:d2,isBlob:u2,isRegExp:B2,isFunction:ct,isStream:f2,isURLSearchParams:x2,isTypedArray:k2,isFileList:p2,forEach:Di,merge:Ic,extend:j2,trim:v2,stripBOM:w2,inherits:S2,toFlatObject:C2,kindOf:Ls,kindOfTest:_t,endsWith:z2,toArray:N2,forEachEntry:E2,matchAll:T2,isHTMLForm:A2,hasOwnProperty:Zp,hasOwnProp:Zp,reduceDescriptors:ng,freezeMethods:O2,toObjectSet:D2,toCamelCase:R2,noop:M2,toFiniteNumber:L2,findKey:tg,global:rn,isContextDefined:ag,isSpecCompliantForm:U2,toJSONObject:H2,isAsyncFn:_2,isThenable:G2,setImmediate:lg,asap:Y2,isIterable:I2};function ee(e,t,a,n,i){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),a&&(this.config=a),n&&(this.request=n),i&&(this.response=i,this.status=i.status?i.status:null)}z.inherits(ee,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:z.toJSONObject(this.config),code:this.code,status:this.status}}});const ig=ee.prototype,rg={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{rg[e]={value:e}});Object.defineProperties(ee,rg);Object.defineProperty(ig,"isAxiosError",{value:!0});ee.from=(e,t,a,n,i,r)=>{const s=Object.create(ig);z.toFlatObject(e,s,function(p){return p!==Error.prototype},d=>d!=="isAxiosError");const o=e&&e.message?e.message:"Error",c=t==null&&e?e.code:t;return ee.call(s,o,c,a,n,i),e&&s.cause==null&&Object.defineProperty(s,"cause",{value:e,configurable:!0}),s.name=e&&e.name||"Error",r&&Object.assign(s,r),s};const q2=null;function qc(e){return z.isPlainObject(e)||z.isArray(e)}function sg(e){return z.endsWith(e,"[]")?e.slice(0,-2):e}function $p(e,t,a){return e?e.concat(t).map(function(i,r){return i=sg(i),!a&&r?"["+i+"]":i}).join(a?".":""):t}function V2(e){return z.isArray(e)&&!e.some(qc)}const X2=z.toFlatObject(z,{},null,function(t){return/^is[A-Z]/.test(t)});function Hs(e,t,a){if(!z.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,a=z.toFlatObject(a,{metaTokens:!0,dots:!1,indexes:!1},!1,function(j,w){return!z.isUndefined(w[j])});const n=a.metaTokens,i=a.visitor||p,r=a.dots,s=a.indexes,c=(a.Blob||typeof Blob<"u"&&Blob)&&z.isSpecCompliantForm(t);if(!z.isFunction(i))throw new TypeError("visitor must be a function");function d(m){if(m===null)return"";if(z.isDate(m))return m.toISOString();if(z.isBoolean(m))return m.toString();if(!c&&z.isBlob(m))throw new ee("Blob is not supported. Use a Buffer instead.");return z.isArrayBuffer(m)||z.isTypedArray(m)?c&&typeof Blob=="function"?new Blob([m]):Buffer.from(m):m}function p(m,j,w){let h=m;if(m&&!w&&typeof m=="object"){if(z.endsWith(j,"{}"))j=n?j:j.slice(0,-2),m=JSON.stringify(m);else if(z.isArray(m)&&V2(m)||(z.isFileList(m)||z.endsWith(j,"[]"))&&(h=z.toArray(m)))return j=sg(j),h.forEach(function(v,y){!(z.isUndefined(v)||v===null)&&t.append(s===!0?$p([j],y,r):s===null?j:j+"[]",d(v))}),!1}return qc(m)?!0:(t.append($p(w,j,r),d(m)),!1)}const f=[],u=Object.assign(X2,{defaultVisitor:p,convertValue:d,isVisitable:qc});function x(m,j){if(!z.isUndefined(m)){if(f.indexOf(m)!==-1)throw Error("Circular reference detected in "+j.join("."));f.push(m),z.forEach(m,function(h,g){(!(z.isUndefined(h)||h===null)&&i.call(t,h,z.isString(g)?g.trim():g,j,u))===!0&&x(h,j?j.concat(g):[g])}),f.pop()}}if(!z.isObject(e))throw new TypeError("data must be an object");return x(e),t}function Kp(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(n){return t[n]})}function au(e,t){this._pairs=[],e&&Hs(e,this,t)}const og=au.prototype;og.append=function(t,a){this._pairs.push([t,a])};og.toString=function(t){const a=t?function(n){return t.call(this,n,Kp)}:Kp;return this._pairs.map(function(i){return a(i[0])+"="+a(i[1])},"").join("&")};function W2(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function cg(e,t,a){if(!t)return e;const n=a&&a.encode||W2;z.isFunction(a)&&(a={serialize:a});const i=a&&a.serialize;let r;if(i?r=i(t,a):r=z.isURLSearchParams(t)?t.toString():new au(t,a).toString(n),r){const s=e.indexOf("#");s!==-1&&(e=e.slice(0,s)),e+=(e.indexOf("?")===-1?"?":"&")+r}return e}class Jp{constructor(){this.handlers=[]}use(t,a,n){return this.handlers.push({fulfilled:t,rejected:a,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){z.forEach(this.handlers,function(n){n!==null&&t(n)})}}const dg={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Q2=typeof URLSearchParams<"u"?URLSearchParams:au,F2=typeof FormData<"u"?FormData:null,Z2=typeof Blob<"u"?Blob:null,$2={isBrowser:!0,classes:{URLSearchParams:Q2,FormData:F2,Blob:Z2},protocols:["http","https","file","blob","url","data"]},nu=typeof window<"u"&&typeof document<"u",Vc=typeof navigator=="object"&&navigator||void 0,K2=nu&&(!Vc||["ReactNative","NativeScript","NS"].indexOf(Vc.product)<0),J2=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",P2=nu&&window.location.href||"http://localhost",ev=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:nu,hasStandardBrowserEnv:K2,hasStandardBrowserWebWorkerEnv:J2,navigator:Vc,origin:P2},Symbol.toStringTag,{value:"Module"})),Ze={...ev,...$2};function tv(e,t){return Hs(e,new Ze.classes.URLSearchParams,{visitor:function(a,n,i,r){return Ze.isNode&&z.isBuffer(a)?(this.append(n,a.toString("base64")),!1):r.defaultVisitor.apply(this,arguments)},...t})}function av(e){return z.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function nv(e){const t={},a=Object.keys(e);let n;const i=a.length;let r;for(n=0;n<i;n++)r=a[n],t[r]=e[r];return t}function ug(e){function t(a,n,i,r){let s=a[r++];if(s==="__proto__")return!0;const o=Number.isFinite(+s),c=r>=a.length;return s=!s&&z.isArray(i)?i.length:s,c?(z.hasOwnProp(i,s)?i[s]=[i[s],n]:i[s]=n,!o):((!i[s]||!z.isObject(i[s]))&&(i[s]=[]),t(a,n,i[s],r)&&z.isArray(i[s])&&(i[s]=nv(i[s])),!o)}if(z.isFormData(e)&&z.isFunction(e.entries)){const a={};return z.forEachEntry(e,(n,i)=>{t(av(n),i,a,0)}),a}return null}function lv(e,t,a){if(z.isString(e))try{return(t||JSON.parse)(e),z.trim(e)}catch(n){if(n.name!=="SyntaxError")throw n}return(a||JSON.stringify)(e)}const Mi={transitional:dg,adapter:["xhr","http","fetch"],transformRequest:[function(t,a){const n=a.getContentType()||"",i=n.indexOf("application/json")>-1,r=z.isObject(t);if(r&&z.isHTMLForm(t)&&(t=new FormData(t)),z.isFormData(t))return i?JSON.stringify(ug(t)):t;if(z.isArrayBuffer(t)||z.isBuffer(t)||z.isStream(t)||z.isFile(t)||z.isBlob(t)||z.isReadableStream(t))return t;if(z.isArrayBufferView(t))return t.buffer;if(z.isURLSearchParams(t))return a.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let o;if(r){if(n.indexOf("application/x-www-form-urlencoded")>-1)return tv(t,this.formSerializer).toString();if((o=z.isFileList(t))||n.indexOf("multipart/form-data")>-1){const c=this.env&&this.env.FormData;return Hs(o?{"files[]":t}:t,c&&new c,this.formSerializer)}}return r||i?(a.setContentType("application/json",!1),lv(t)):t}],transformResponse:[function(t){const a=this.transitional||Mi.transitional,n=a&&a.forcedJSONParsing,i=this.responseType==="json";if(z.isResponse(t)||z.isReadableStream(t))return t;if(t&&z.isString(t)&&(n&&!this.responseType||i)){const s=!(a&&a.silentJSONParsing)&&i;try{return JSON.parse(t,this.parseReviver)}catch(o){if(s)throw o.name==="SyntaxError"?ee.from(o,ee.ERR_BAD_RESPONSE,this,null,this.response):o}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Ze.classes.FormData,Blob:Ze.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};z.forEach(["delete","get","head","post","put","patch"],e=>{Mi.headers[e]={}});const iv=z.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),rv=e=>{const t={};let a,n,i;return e&&e.split(`
`).forEach(function(s){i=s.indexOf(":"),a=s.substring(0,i).trim().toLowerCase(),n=s.substring(i+1).trim(),!(!a||t[a]&&iv[a])&&(a==="set-cookie"?t[a]?t[a].push(n):t[a]=[n]:t[a]=t[a]?t[a]+", "+n:n)}),t},Pp=Symbol("internals");function Rl(e){return e&&String(e).trim().toLowerCase()}function Cr(e){return e===!1||e==null?e:z.isArray(e)?e.map(Cr):String(e)}function sv(e){const t=Object.create(null),a=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let n;for(;n=a.exec(e);)t[n[1]]=n[2];return t}const ov=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Ro(e,t,a,n,i){if(z.isFunction(n))return n.call(this,t,a);if(i&&(t=a),!!z.isString(t)){if(z.isString(n))return t.indexOf(n)!==-1;if(z.isRegExp(n))return n.test(t)}}function cv(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,a,n)=>a.toUpperCase()+n)}function dv(e,t){const a=z.toCamelCase(" "+t);["get","set","has"].forEach(n=>{Object.defineProperty(e,n+a,{value:function(i,r,s){return this[n].call(this,t,i,r,s)},configurable:!0})})}let dt=class{constructor(t){t&&this.set(t)}set(t,a,n){const i=this;function r(o,c,d){const p=Rl(c);if(!p)throw new Error("header name must be a non-empty string");const f=z.findKey(i,p);(!f||i[f]===void 0||d===!0||d===void 0&&i[f]!==!1)&&(i[f||c]=Cr(o))}const s=(o,c)=>z.forEach(o,(d,p)=>r(d,p,c));if(z.isPlainObject(t)||t instanceof this.constructor)s(t,a);else if(z.isString(t)&&(t=t.trim())&&!ov(t))s(rv(t),a);else if(z.isObject(t)&&z.isIterable(t)){let o={},c,d;for(const p of t){if(!z.isArray(p))throw TypeError("Object iterator must return a key-value pair");o[d=p[0]]=(c=o[d])?z.isArray(c)?[...c,p[1]]:[c,p[1]]:p[1]}s(o,a)}else t!=null&&r(a,t,n);return this}get(t,a){if(t=Rl(t),t){const n=z.findKey(this,t);if(n){const i=this[n];if(!a)return i;if(a===!0)return sv(i);if(z.isFunction(a))return a.call(this,i,n);if(z.isRegExp(a))return a.exec(i);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,a){if(t=Rl(t),t){const n=z.findKey(this,t);return!!(n&&this[n]!==void 0&&(!a||Ro(this,this[n],n,a)))}return!1}delete(t,a){const n=this;let i=!1;function r(s){if(s=Rl(s),s){const o=z.findKey(n,s);o&&(!a||Ro(n,n[o],o,a))&&(delete n[o],i=!0)}}return z.isArray(t)?t.forEach(r):r(t),i}clear(t){const a=Object.keys(this);let n=a.length,i=!1;for(;n--;){const r=a[n];(!t||Ro(this,this[r],r,t,!0))&&(delete this[r],i=!0)}return i}normalize(t){const a=this,n={};return z.forEach(this,(i,r)=>{const s=z.findKey(n,r);if(s){a[s]=Cr(i),delete a[r];return}const o=t?cv(r):String(r).trim();o!==r&&delete a[r],a[o]=Cr(i),n[o]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const a=Object.create(null);return z.forEach(this,(n,i)=>{n!=null&&n!==!1&&(a[i]=t&&z.isArray(n)?n.join(", "):n)}),a}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,a])=>t+": "+a).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...a){const n=new this(t);return a.forEach(i=>n.set(i)),n}static accessor(t){const n=(this[Pp]=this[Pp]={accessors:{}}).accessors,i=this.prototype;function r(s){const o=Rl(s);n[o]||(dv(i,s),n[o]=!0)}return z.isArray(t)?t.forEach(r):r(t),this}};dt.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);z.reduceDescriptors(dt.prototype,({value:e},t)=>{let a=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(n){this[a]=n}}});z.freezeMethods(dt);function Bo(e,t){const a=this||Mi,n=t||a,i=dt.from(n.headers);let r=n.data;return z.forEach(e,function(o){r=o.call(a,r,i.normalize(),t?t.status:void 0)}),i.normalize(),r}function pg(e){return!!(e&&e.__CANCEL__)}function Sl(e,t,a){ee.call(this,e??"canceled",ee.ERR_CANCELED,t,a),this.name="CanceledError"}z.inherits(Sl,ee,{__CANCEL__:!0});function fg(e,t,a){const n=a.config.validateStatus;!a.status||!n||n(a.status)?e(a):t(new ee("Request failed with status code "+a.status,[ee.ERR_BAD_REQUEST,ee.ERR_BAD_RESPONSE][Math.floor(a.status/100)-4],a.config,a.request,a))}function uv(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function pv(e,t){e=e||10;const a=new Array(e),n=new Array(e);let i=0,r=0,s;return t=t!==void 0?t:1e3,function(c){const d=Date.now(),p=n[r];s||(s=d),a[i]=c,n[i]=d;let f=r,u=0;for(;f!==i;)u+=a[f++],f=f%e;if(i=(i+1)%e,i===r&&(r=(r+1)%e),d-s<t)return;const x=p&&d-p;return x?Math.round(u*1e3/x):void 0}}function fv(e,t){let a=0,n=1e3/t,i,r;const s=(d,p=Date.now())=>{a=p,i=null,r&&(clearTimeout(r),r=null),e(...d)};return[(...d)=>{const p=Date.now(),f=p-a;f>=n?s(d,p):(i=d,r||(r=setTimeout(()=>{r=null,s(i)},n-f)))},()=>i&&s(i)]}const ss=(e,t,a=3)=>{let n=0;const i=pv(50,250);return fv(r=>{const s=r.loaded,o=r.lengthComputable?r.total:void 0,c=s-n,d=i(c),p=s<=o;n=s;const f={loaded:s,total:o,progress:o?s/o:void 0,bytes:c,rate:d||void 0,estimated:d&&o&&p?(o-s)/d:void 0,event:r,lengthComputable:o!=null,[t?"download":"upload"]:!0};e(f)},a)},ef=(e,t)=>{const a=e!=null;return[n=>t[0]({lengthComputable:a,total:e,loaded:n}),t[1]]},tf=e=>(...t)=>z.asap(()=>e(...t)),hv=Ze.hasStandardBrowserEnv?((e,t)=>a=>(a=new URL(a,Ze.origin),e.protocol===a.protocol&&e.host===a.host&&(t||e.port===a.port)))(new URL(Ze.origin),Ze.navigator&&/(msie|trident)/i.test(Ze.navigator.userAgent)):()=>!0,xv=Ze.hasStandardBrowserEnv?{write(e,t,a,n,i,r,s){if(typeof document>"u")return;const o=[`${e}=${encodeURIComponent(t)}`];z.isNumber(a)&&o.push(`expires=${new Date(a).toUTCString()}`),z.isString(n)&&o.push(`path=${n}`),z.isString(i)&&o.push(`domain=${i}`),r===!0&&o.push("secure"),z.isString(s)&&o.push(`SameSite=${s}`),document.cookie=o.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function gv(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function mv(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function hg(e,t,a){let n=!gv(t);return e&&(n||a==!1)?mv(e,t):t}const af=e=>e instanceof dt?{...e}:e;function jn(e,t){t=t||{};const a={};function n(d,p,f,u){return z.isPlainObject(d)&&z.isPlainObject(p)?z.merge.call({caseless:u},d,p):z.isPlainObject(p)?z.merge({},p):z.isArray(p)?p.slice():p}function i(d,p,f,u){if(z.isUndefined(p)){if(!z.isUndefined(d))return n(void 0,d,f,u)}else return n(d,p,f,u)}function r(d,p){if(!z.isUndefined(p))return n(void 0,p)}function s(d,p){if(z.isUndefined(p)){if(!z.isUndefined(d))return n(void 0,d)}else return n(void 0,p)}function o(d,p,f){if(f in t)return n(d,p);if(f in e)return n(void 0,d)}const c={url:r,method:r,data:r,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:o,headers:(d,p,f)=>i(af(d),af(p),f,!0)};return z.forEach(Object.keys({...e,...t}),function(p){const f=c[p]||i,u=f(e[p],t[p],p);z.isUndefined(u)&&f!==o||(a[p]=u)}),a}const xg=e=>{const t=jn({},e);let{data:a,withXSRFToken:n,xsrfHeaderName:i,xsrfCookieName:r,headers:s,auth:o}=t;if(t.headers=s=dt.from(s),t.url=cg(hg(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),o&&s.set("Authorization","Basic "+btoa((o.username||"")+":"+(o.password?unescape(encodeURIComponent(o.password)):""))),z.isFormData(a)){if(Ze.hasStandardBrowserEnv||Ze.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(z.isFunction(a.getHeaders)){const c=a.getHeaders(),d=["content-type","content-length"];Object.entries(c).forEach(([p,f])=>{d.includes(p.toLowerCase())&&s.set(p,f)})}}if(Ze.hasStandardBrowserEnv&&(n&&z.isFunction(n)&&(n=n(t)),n||n!==!1&&hv(t.url))){const c=i&&r&&xv.read(r);c&&s.set(i,c)}return t},bv=typeof XMLHttpRequest<"u",yv=bv&&function(e){return new Promise(function(a,n){const i=xg(e);let r=i.data;const s=dt.from(i.headers).normalize();let{responseType:o,onUploadProgress:c,onDownloadProgress:d}=i,p,f,u,x,m;function j(){x&&x(),m&&m(),i.cancelToken&&i.cancelToken.unsubscribe(p),i.signal&&i.signal.removeEventListener("abort",p)}let w=new XMLHttpRequest;w.open(i.method.toUpperCase(),i.url,!0),w.timeout=i.timeout;function h(){if(!w)return;const v=dt.from("getAllResponseHeaders"in w&&w.getAllResponseHeaders()),k={data:!o||o==="text"||o==="json"?w.responseText:w.response,status:w.status,statusText:w.statusText,headers:v,config:e,request:w};fg(function(C){a(C),j()},function(C){n(C),j()},k),w=null}"onloadend"in w?w.onloadend=h:w.onreadystatechange=function(){!w||w.readyState!==4||w.status===0&&!(w.responseURL&&w.responseURL.indexOf("file:")===0)||setTimeout(h)},w.onabort=function(){w&&(n(new ee("Request aborted",ee.ECONNABORTED,e,w)),w=null)},w.onerror=function(y){const k=y&&y.message?y.message:"Network Error",G=new ee(k,ee.ERR_NETWORK,e,w);G.event=y||null,n(G),w=null},w.ontimeout=function(){let y=i.timeout?"timeout of "+i.timeout+"ms exceeded":"timeout exceeded";const k=i.transitional||dg;i.timeoutErrorMessage&&(y=i.timeoutErrorMessage),n(new ee(y,k.clarifyTimeoutError?ee.ETIMEDOUT:ee.ECONNABORTED,e,w)),w=null},r===void 0&&s.setContentType(null),"setRequestHeader"in w&&z.forEach(s.toJSON(),function(y,k){w.setRequestHeader(k,y)}),z.isUndefined(i.withCredentials)||(w.withCredentials=!!i.withCredentials),o&&o!=="json"&&(w.responseType=i.responseType),d&&([u,m]=ss(d,!0),w.addEventListener("progress",u)),c&&w.upload&&([f,x]=ss(c),w.upload.addEventListener("progress",f),w.upload.addEventListener("loadend",x)),(i.cancelToken||i.signal)&&(p=v=>{w&&(n(!v||v.type?new Sl(null,e,w):v),w.abort(),w=null)},i.cancelToken&&i.cancelToken.subscribe(p),i.signal&&(i.signal.aborted?p():i.signal.addEventListener("abort",p)));const g=uv(i.url);if(g&&Ze.protocols.indexOf(g)===-1){n(new ee("Unsupported protocol "+g+":",ee.ERR_BAD_REQUEST,e));return}w.send(r||null)})},vv=(e,t)=>{const{length:a}=e=e?e.filter(Boolean):[];if(t||a){let n=new AbortController,i;const r=function(d){if(!i){i=!0,o();const p=d instanceof Error?d:this.reason;n.abort(p instanceof ee?p:new Sl(p instanceof Error?p.message:p))}};let s=t&&setTimeout(()=>{s=null,r(new ee(`timeout ${t} of ms exceeded`,ee.ETIMEDOUT))},t);const o=()=>{e&&(s&&clearTimeout(s),s=null,e.forEach(d=>{d.unsubscribe?d.unsubscribe(r):d.removeEventListener("abort",r)}),e=null)};e.forEach(d=>d.addEventListener("abort",r));const{signal:c}=n;return c.unsubscribe=()=>z.asap(o),c}},jv=function*(e,t){let a=e.byteLength;if(a<t){yield e;return}let n=0,i;for(;n<a;)i=n+t,yield e.slice(n,i),n=i},wv=async function*(e,t){for await(const a of Sv(e))yield*jv(a,t)},Sv=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:a,value:n}=await t.read();if(a)break;yield n}}finally{await t.cancel()}},nf=(e,t,a,n)=>{const i=wv(e,t);let r=0,s,o=c=>{s||(s=!0,n&&n(c))};return new ReadableStream({async pull(c){try{const{done:d,value:p}=await i.next();if(d){o(),c.close();return}let f=p.byteLength;if(a){let u=r+=f;a(u)}c.enqueue(new Uint8Array(p))}catch(d){throw o(d),d}},cancel(c){return o(c),i.return()}},{highWaterMark:2})},lf=64*1024,{isFunction:er}=z,Cv=(({Request:e,Response:t})=>({Request:e,Response:t}))(z.global),{ReadableStream:rf,TextEncoder:sf}=z.global,of=(e,...t)=>{try{return!!e(...t)}catch{return!1}},zv=e=>{e=z.merge.call({skipUndefined:!0},Cv,e);const{fetch:t,Request:a,Response:n}=e,i=t?er(t):typeof fetch=="function",r=er(a),s=er(n);if(!i)return!1;const o=i&&er(rf),c=i&&(typeof sf=="function"?(m=>j=>m.encode(j))(new sf):async m=>new Uint8Array(await new a(m).arrayBuffer())),d=r&&o&&of(()=>{let m=!1;const j=new a(Ze.origin,{body:new rf,method:"POST",get duplex(){return m=!0,"half"}}).headers.has("Content-Type");return m&&!j}),p=s&&o&&of(()=>z.isReadableStream(new n("").body)),f={stream:p&&(m=>m.body)};i&&["text","arrayBuffer","blob","formData","stream"].forEach(m=>{!f[m]&&(f[m]=(j,w)=>{let h=j&&j[m];if(h)return h.call(j);throw new ee(`Response type '${m}' is not supported`,ee.ERR_NOT_SUPPORT,w)})});const u=async m=>{if(m==null)return 0;if(z.isBlob(m))return m.size;if(z.isSpecCompliantForm(m))return(await new a(Ze.origin,{method:"POST",body:m}).arrayBuffer()).byteLength;if(z.isArrayBufferView(m)||z.isArrayBuffer(m))return m.byteLength;if(z.isURLSearchParams(m)&&(m=m+""),z.isString(m))return(await c(m)).byteLength},x=async(m,j)=>{const w=z.toFiniteNumber(m.getContentLength());return w??u(j)};return async m=>{let{url:j,method:w,data:h,signal:g,cancelToken:v,timeout:y,onDownloadProgress:k,onUploadProgress:G,responseType:C,headers:T,withCredentials:O="same-origin",fetchOptions:E}=xg(m),Q=t||fetch;C=C?(C+"").toLowerCase():"text";let R=vv([g,v&&v.toAbortSignal()],y),I=null;const F=R&&R.unsubscribe&&(()=>{R.unsubscribe()});let P;try{if(G&&d&&w!=="get"&&w!=="head"&&(P=await x(T,h))!==0){let H=new a(j,{method:"POST",body:h,duplex:"half"}),K;if(z.isFormData(h)&&(K=H.headers.get("content-type"))&&T.setContentType(K),H.body){const[Ce,at]=ef(P,ss(tf(G)));h=nf(H.body,lf,Ce,at)}}z.isString(O)||(O=O?"include":"omit");const L=r&&"credentials"in a.prototype,q={...E,signal:R,method:w.toUpperCase(),headers:T.normalize().toJSON(),body:h,duplex:"half",credentials:L?O:void 0};I=r&&new a(j,q);let U=await(r?Q(I,E):Q(j,q));const ae=p&&(C==="stream"||C==="response");if(p&&(k||ae&&F)){const H={};["status","statusText","headers"].forEach($t=>{H[$t]=U[$t]});const K=z.toFiniteNumber(U.headers.get("content-length")),[Ce,at]=k&&ef(K,ss(tf(k),!0))||[];U=new n(nf(U.body,lf,Ce,()=>{at&&at(),F&&F()}),H)}C=C||"text";let A=await f[z.findKey(f,C)||"text"](U,m);return!ae&&F&&F(),await new Promise((H,K)=>{fg(H,K,{data:A,headers:dt.from(U.headers),status:U.status,statusText:U.statusText,config:m,request:I})})}catch(L){throw F&&F(),L&&L.name==="TypeError"&&/Load failed|fetch/i.test(L.message)?Object.assign(new ee("Network Error",ee.ERR_NETWORK,m,I),{cause:L.cause||L}):ee.from(L,L&&L.code,m,I)}}},Nv=new Map,gg=e=>{let t=e&&e.env||{};const{fetch:a,Request:n,Response:i}=t,r=[n,i,a];let s=r.length,o=s,c,d,p=Nv;for(;o--;)c=r[o],d=p.get(c),d===void 0&&p.set(c,d=o?new Map:zv(t)),p=d;return d};gg();const lu={http:q2,xhr:yv,fetch:{get:gg}};z.forEach(lu,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const cf=e=>`- ${e}`,kv=e=>z.isFunction(e)||e===null||e===!1;function Ev(e,t){e=z.isArray(e)?e:[e];const{length:a}=e;let n,i;const r={};for(let s=0;s<a;s++){n=e[s];let o;if(i=n,!kv(n)&&(i=lu[(o=String(n)).toLowerCase()],i===void 0))throw new ee(`Unknown adapter '${o}'`);if(i&&(z.isFunction(i)||(i=i.get(t))))break;r[o||"#"+s]=i}if(!i){const s=Object.entries(r).map(([c,d])=>`adapter ${c} `+(d===!1?"is not supported by the environment":"is not available in the build"));let o=a?s.length>1?`since :
`+s.map(cf).join(`
`):" "+cf(s[0]):"as no adapter specified";throw new ee("There is no suitable adapter to dispatch the request "+o,"ERR_NOT_SUPPORT")}return i}const mg={getAdapter:Ev,adapters:lu};function Oo(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Sl(null,e)}function df(e){return Oo(e),e.headers=dt.from(e.headers),e.data=Bo.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),mg.getAdapter(e.adapter||Mi.adapter,e)(e).then(function(n){return Oo(e),n.data=Bo.call(e,e.transformResponse,n),n.headers=dt.from(n.headers),n},function(n){return pg(n)||(Oo(e),n&&n.response&&(n.response.data=Bo.call(e,e.transformResponse,n.response),n.response.headers=dt.from(n.response.headers))),Promise.reject(n)})}const bg="1.13.2",_s={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{_s[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}});const uf={};_s.transitional=function(t,a,n){function i(r,s){return"[Axios v"+bg+"] Transitional option '"+r+"'"+s+(n?". "+n:"")}return(r,s,o)=>{if(t===!1)throw new ee(i(s," has been removed"+(a?" in "+a:"")),ee.ERR_DEPRECATED);return a&&!uf[s]&&(uf[s]=!0,console.warn(i(s," has been deprecated since v"+a+" and will be removed in the near future"))),t?t(r,s,o):!0}};_s.spelling=function(t){return(a,n)=>(console.warn(`${n} is likely a misspelling of ${t}`),!0)};function Tv(e,t,a){if(typeof e!="object")throw new ee("options must be an object",ee.ERR_BAD_OPTION_VALUE);const n=Object.keys(e);let i=n.length;for(;i-- >0;){const r=n[i],s=t[r];if(s){const o=e[r],c=o===void 0||s(o,r,e);if(c!==!0)throw new ee("option "+r+" must be "+c,ee.ERR_BAD_OPTION_VALUE);continue}if(a!==!0)throw new ee("Unknown option "+r,ee.ERR_BAD_OPTION)}}const zr={assertOptions:Tv,validators:_s},Gt=zr.validators;let hn=class{constructor(t){this.defaults=t||{},this.interceptors={request:new Jp,response:new Jp}}async request(t,a){try{return await this._request(t,a)}catch(n){if(n instanceof Error){let i={};Error.captureStackTrace?Error.captureStackTrace(i):i=new Error;const r=i.stack?i.stack.replace(/^.+\n/,""):"";try{n.stack?r&&!String(n.stack).endsWith(r.replace(/^.+\n.+\n/,""))&&(n.stack+=`
`+r):n.stack=r}catch{}}throw n}}_request(t,a){typeof t=="string"?(a=a||{},a.url=t):a=t||{},a=jn(this.defaults,a);const{transitional:n,paramsSerializer:i,headers:r}=a;n!==void 0&&zr.assertOptions(n,{silentJSONParsing:Gt.transitional(Gt.boolean),forcedJSONParsing:Gt.transitional(Gt.boolean),clarifyTimeoutError:Gt.transitional(Gt.boolean)},!1),i!=null&&(z.isFunction(i)?a.paramsSerializer={serialize:i}:zr.assertOptions(i,{encode:Gt.function,serialize:Gt.function},!0)),a.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?a.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:a.allowAbsoluteUrls=!0),zr.assertOptions(a,{baseUrl:Gt.spelling("baseURL"),withXsrfToken:Gt.spelling("withXSRFToken")},!0),a.method=(a.method||this.defaults.method||"get").toLowerCase();let s=r&&z.merge(r.common,r[a.method]);r&&z.forEach(["delete","get","head","post","put","patch","common"],m=>{delete r[m]}),a.headers=dt.concat(s,r);const o=[];let c=!0;this.interceptors.request.forEach(function(j){typeof j.runWhen=="function"&&j.runWhen(a)===!1||(c=c&&j.synchronous,o.unshift(j.fulfilled,j.rejected))});const d=[];this.interceptors.response.forEach(function(j){d.push(j.fulfilled,j.rejected)});let p,f=0,u;if(!c){const m=[df.bind(this),void 0];for(m.unshift(...o),m.push(...d),u=m.length,p=Promise.resolve(a);f<u;)p=p.then(m[f++],m[f++]);return p}u=o.length;let x=a;for(;f<u;){const m=o[f++],j=o[f++];try{x=m(x)}catch(w){j.call(this,w);break}}try{p=df.call(this,x)}catch(m){return Promise.reject(m)}for(f=0,u=d.length;f<u;)p=p.then(d[f++],d[f++]);return p}getUri(t){t=jn(this.defaults,t);const a=hg(t.baseURL,t.url,t.allowAbsoluteUrls);return cg(a,t.params,t.paramsSerializer)}};z.forEach(["delete","get","head","options"],function(t){hn.prototype[t]=function(a,n){return this.request(jn(n||{},{method:t,url:a,data:(n||{}).data}))}});z.forEach(["post","put","patch"],function(t){function a(n){return function(r,s,o){return this.request(jn(o||{},{method:t,headers:n?{"Content-Type":"multipart/form-data"}:{},url:r,data:s}))}}hn.prototype[t]=a(),hn.prototype[t+"Form"]=a(!0)});let Av=class yg{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let a;this.promise=new Promise(function(r){a=r});const n=this;this.promise.then(i=>{if(!n._listeners)return;let r=n._listeners.length;for(;r-- >0;)n._listeners[r](i);n._listeners=null}),this.promise.then=i=>{let r;const s=new Promise(o=>{n.subscribe(o),r=o}).then(i);return s.cancel=function(){n.unsubscribe(r)},s},t(function(r,s,o){n.reason||(n.reason=new Sl(r,s,o),a(n.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const a=this._listeners.indexOf(t);a!==-1&&this._listeners.splice(a,1)}toAbortSignal(){const t=new AbortController,a=n=>{t.abort(n)};return this.subscribe(a),t.signal.unsubscribe=()=>this.unsubscribe(a),t.signal}static source(){let t;return{token:new yg(function(i){t=i}),cancel:t}}};function Rv(e){return function(a){return e.apply(null,a)}}function Bv(e){return z.isObject(e)&&e.isAxiosError===!0}const Xc={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Xc).forEach(([e,t])=>{Xc[t]=e});function vg(e){const t=new hn(e),a=Kx(hn.prototype.request,t);return z.extend(a,hn.prototype,t,{allOwnKeys:!0}),z.extend(a,t,null,{allOwnKeys:!0}),a.create=function(i){return vg(jn(e,i))},a}const xe=vg(Mi);xe.Axios=hn;xe.CanceledError=Sl;xe.CancelToken=Av;xe.isCancel=pg;xe.VERSION=bg;xe.toFormData=Hs;xe.AxiosError=ee;xe.Cancel=xe.CanceledError;xe.all=function(t){return Promise.all(t)};xe.spread=Rv;xe.isAxiosError=Bv;xe.mergeConfig=jn;xe.AxiosHeaders=dt;xe.formToJSON=e=>ug(z.isHTMLForm(e)?new FormData(e):e);xe.getAdapter=mg.getAdapter;xe.HttpStatusCode=Xc;xe.default=xe;const{Axios:H4,AxiosError:_4,CanceledError:G4,isCancel:Y4,CancelToken:I4,VERSION:q4,all:V4,Cancel:X4,isAxiosError:W4,spread:Q4,toFormData:F4,AxiosHeaders:Z4,HttpStatusCode:$4,formToJSON:K4,getAdapter:J4,mergeConfig:P4}=xe,Wc="cart-updated",jg=()=>{typeof window<"u"&&window.dispatchEvent(new CustomEvent(Wc))},wg=e=>xe.get(`${eu.GET}/${e}`),Sg=async(e,t)=>{const a=await xe.post(eu.ADD,{userId:e,courseId:t});return jg(),a},pf=async e=>{const t=await xe.delete(`${eu.REMOVE}/${e}`);return jg(),t},wn=({cartCount:e})=>{const t=Zt(),[a,n]=b.useState([]),[i,r]=b.useState(!1),[s,o]=b.useState(!1),[c,d]=b.useState(!1),[p,f]=b.useState(!1),[u,x]=b.useState(!1),[m,j]=b.useState([]),[w,h]=b.useState(!1),[g,v]=b.useState(""),[y,k]=b.useState(!1),[G,C]=b.useState(""),[T,O]=b.useState(0),[E,Q]=b.useState(null);b.useEffect(()=>{R();const H=()=>x(window.scrollY>8),K=()=>{E&&P(E)},Ce=()=>{E&&P(E)};return window.addEventListener("scroll",H),window.addEventListener(Wc,K),window.addEventListener("focus",Ce),()=>{window.removeEventListener("scroll",H),window.removeEventListener(Wc,K),window.removeEventListener("focus",Ce)}},[E]);const R=async()=>{try{const H=vn();H!=null&&H.userId?(h(!0),Q(H.userId),v(H.fullName||H.email||"User"),await Promise.all([I(H.userId),P(H.userId)])):(h(!1),Q(null),O(0)),await F()}catch(H){console.error("Header init error:",H)}},I=async H=>{try{k(!0),j(await Ri(String(H)))}catch{j([])}finally{k(!1)}},F=async()=>{try{n(await Ux())}catch{n([])}},P=async H=>{try{const K=await wg(String(H));O(Array.isArray(K.data)?K.data.length:0)}catch{O(0)}},L=()=>{t2(),h(!1),v(""),Q(null),O(0),j([]),d(!1),t("/")},q=typeof e=="number"?e:T,U=a.reduce((H,K)=>{const Ce=K.category||"Other";return(H[Ce]=H[Ce]||[]).push(K),H},{}),ae=G?a.filter(H=>H.title.toLowerCase().includes(G.toLowerCase())):[],A=g.split(" ").map(H=>H[0]).slice(0,2).join("").toUpperCase();return l.jsxs(l.Fragment,{children:[l.jsxs("header",{className:`hd-root${u?" hd-root--scrolled":""}`,children:[l.jsxs("div",{className:"hd-inner",children:[l.jsxs("div",{className:"hd-logo",onClick:()=>t("/"),children:[l.jsx("span",{className:"hd-logo-icon",children:"⚡"}),l.jsxs("div",{className:"hd-logo-text",children:[l.jsx("span",{className:"hd-logo-brand",children:"Srinu tech"}),l.jsx("span",{className:"hd-logo-tag",children:"Guru"})]})]}),l.jsxs("nav",{className:"hd-nav",children:[l.jsxs("div",{className:"hd-dd-wrap",onMouseEnter:()=>r(!0),onMouseLeave:()=>{r(!1),C("")},children:[l.jsxs("button",{className:`hd-nav-btn${i?" hd-nav-btn--open":""}`,children:["Courses ",l.jsx(ls,{size:14,className:`hd-chevron${i?" hd-chevron--up":""}`})]}),i&&l.jsxs("div",{className:"hd-mega",children:[l.jsxs("div",{className:"hd-mega-search",children:[l.jsx(vl,{size:15,className:"hd-search-icon"}),l.jsx("input",{type:"text",placeholder:"Search courses…",value:G,onChange:H=>C(H.target.value),className:"hd-search-input",autoFocus:!0})]}),l.jsx("div",{className:"hd-mega-body",children:G?l.jsxs("div",{className:"hd-mega-col",children:[l.jsxs("p",{className:"hd-col-label",children:["Results (",ae.length,")"]}),ae.length>0?ae.map(H=>l.jsx(ff,{course:H,onClick:()=>{t(`/course/${H.id}`),r(!1)}},H.id)):l.jsxs("p",{className:"hd-empty",children:['No courses match "',G,'"']})]}):l.jsx(l.Fragment,{children:Object.entries(U).map(([H,K])=>l.jsxs("div",{className:"hd-mega-col",children:[l.jsxs("p",{className:"hd-col-label",children:[H," ",l.jsx("span",{className:"hd-col-count",children:K.length})]}),K.slice(0,4).map(Ce=>l.jsx(ff,{course:Ce,onClick:()=>{t(`/course/${Ce.id}`),r(!1)}},Ce.id))]},H))})}),a.length>0&&!G&&l.jsx("div",{className:"hd-mega-footer",children:l.jsxs("button",{className:"hd-mega-cta",onClick:()=>{t("/"),r(!1)},children:["View all ",a.length," courses ",l.jsx(da,{size:14})]})})]})]}),w&&l.jsxs("div",{className:"hd-dd-wrap",onMouseEnter:()=>o(!0),onMouseLeave:()=>o(!1),children:[l.jsxs("button",{className:`hd-nav-btn${s?" hd-nav-btn--open":""}`,children:[l.jsx(Gc,{size:15})," My Learning ",l.jsx(ls,{size:14,className:`hd-chevron${s?" hd-chevron--up":""}`})]}),s&&l.jsxs("div",{className:"hd-dropdown",children:[l.jsxs("div",{className:"hd-dd-header",children:[l.jsx("p",{className:"hd-dd-title",children:"My Enrolled Courses"}),l.jsx("span",{className:"hd-dd-count",children:m.length})]}),l.jsx("div",{className:"hd-dd-body",children:y?l.jsxs("div",{className:"hd-dd-loading",children:[l.jsx("span",{className:"hd-spinner"})," Loading…"]}):m.length>0?l.jsxs(l.Fragment,{children:[m.slice(0,5).map(H=>l.jsxs("button",{className:"hd-enrollment-row",onClick:()=>{t(`/course/${H.course.id}`),o(!1)},children:[l.jsx("span",{className:"hd-enroll-check",children:"✓"}),l.jsxs("div",{className:"hd-enroll-info",children:[l.jsx("p",{className:"hd-enroll-title",children:H.course.title}),l.jsxs("p",{className:"hd-enroll-date",children:["Enrolled ",new Date(H.enrolledAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})]})]})]},H.id)),l.jsxs("button",{className:"hd-dd-footer-btn",onClick:()=>{t("/my-learning"),o(!1)},children:["View all my courses ",l.jsx(da,{size:13})]})]}):l.jsxs("div",{className:"hd-dd-empty",children:[l.jsx(Fe,{size:28}),l.jsx("p",{children:"No enrolled courses yet"}),l.jsx("button",{className:"hd-dd-browse",onClick:()=>{t("/"),o(!1)},children:"Browse Courses"})]})})]})]}),l.jsx("button",{className:"hd-nav-btn",onClick:()=>t("/about"),children:"About"}),l.jsx("button",{className:"hd-nav-btn",onClick:()=>t("/contact"),children:"Contact"})]}),l.jsxs("div",{className:"hd-actions",children:[l.jsxs("button",{className:"hd-icon-btn",onClick:()=>t("/cart"),title:"Cart",children:[l.jsx(Qx,{size:19}),q>0&&l.jsx("span",{className:"hd-cart-badge",children:q>9?"9+":q})]}),w?l.jsxs("div",{className:"hd-dd-wrap",onMouseEnter:()=>d(!0),onMouseLeave:()=>d(!1),children:[l.jsx("button",{className:"hd-avatar-btn",children:l.jsx("span",{className:"hd-avatar",children:A})}),c&&l.jsxs("div",{className:"hd-profile-menu",children:[l.jsxs("div",{className:"hd-pm-header",onClick:()=>{t("/profile"),d(!1)},children:[l.jsx("span",{className:"hd-pm-avatar",children:A}),l.jsxs("div",{children:[l.jsx("p",{className:"hd-pm-name",children:g}),l.jsxs("p",{className:"hd-pm-link",children:["View profile ",l.jsx(da,{size:11})]})]})]}),l.jsx("div",{className:"hd-pm-divider"}),l.jsx("div",{className:"hd-pm-items",children:[{icon:l.jsx(Pd,{size:15}),label:"My Profile",path:"/profile"},{icon:l.jsx(Gc,{size:15}),label:`My Learning (${m.length})`,path:"/my-learning"}].map(H=>l.jsxs("button",{className:"hd-pm-item",onClick:()=>{t(H.path),d(!1)},children:[H.icon," ",H.label]},H.path))}),l.jsx("div",{className:"hd-pm-divider"}),l.jsxs("button",{className:"hd-pm-item hd-pm-item--danger",onClick:L,children:[l.jsx(rs,{size:15})," Logout"]})]})]}):l.jsxs("div",{className:"hd-auth-btns",children:[l.jsx("button",{className:"hd-login-btn",onClick:()=>t("/auth"),children:"Log in"}),l.jsx("button",{className:"hd-signup-btn",onClick:()=>t("/auth"),children:"Sign Up"})]}),l.jsx("button",{className:"hd-mobile-toggle",onClick:()=>f(H=>!H),children:p?l.jsx(et,{size:20}):l.jsx(Jd,{size:20})})]})]}),p&&l.jsxs("div",{className:"hd-mobile-menu",children:[[{label:"Browse Courses",path:"/"},...w?[{label:`My Learning (${m.length})`,path:"/my-learning"}]:[],{label:"About",path:"/about"},{label:"Contact",path:"/contact"},...w?[{label:"Profile",path:"/profile"}]:[]].map(H=>l.jsx("button",{className:"hd-mobile-item",onClick:()=>{t(H.path),f(!1)},children:H.label},H.path)),l.jsx("div",{className:"hd-mobile-divider"}),w?l.jsxs("button",{className:"hd-mobile-item hd-mobile-item--danger",onClick:()=>{L(),f(!1)},children:[l.jsx(rs,{size:15})," Logout"]}):l.jsxs("div",{className:"hd-mobile-auth",children:[l.jsx("button",{className:"hd-mobile-login",onClick:()=>{t("/auth"),f(!1)},children:"Log in"}),l.jsx("button",{className:"hd-mobile-signup",onClick:()=>{t("/auth"),f(!1)},children:"Sign Up Free"})]})]})]}),l.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

        /* ── TOKENS ── */
        :root {
          --hd-ink:        #0e0f13;
          --hd-ink-soft:   #3d4154;
          --hd-ink-muted:  #8b90a8;
          --hd-surface:    #ffffff;
          --hd-surface-2:  #f6f6fb;
          --hd-border:     #e3e3ed;
          --hd-accent:     #1a56db;
          --hd-accent-s:   #eef2fd;
          --hd-gold:       #c9a84c;
          --hd-green:      #16a34a;
          --hd-green-s:    #f0fdf4;
          --hd-error:      #be185d;
          --hd-font-d:     'Playfair Display', Georgia, serif;
          --hd-font-b:     'DM Sans', 'Helvetica Neue', sans-serif;
          --hd-shadow:     0 1px 3px rgba(14,15,19,.06), 0 4px 16px rgba(14,15,19,.06);
          --hd-shadow-lg:  0 8px 32px rgba(14,15,19,.12), 0 2px 8px rgba(14,15,19,.06);
          --hd-t:          .18s cubic-bezier(.4,0,.2,1);
          --hd-r:          10px;
        }

        /* ── ROOT ── */
        .hd-root {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(255,255,255,.97);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--hd-border);
          font-family: var(--hd-font-b);
          -webkit-font-smoothing: antialiased;
          transition: box-shadow var(--hd-t), border-color var(--hd-t);
        }

        .hd-root--scrolled {
          box-shadow: var(--hd-shadow);
          border-color: rgba(227,227,237,.9);
        }

        .hd-inner {
          display: flex;
          align-items: center;
          gap: 28px;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 28px;
          height: 64px;
        }

        /* ── BACK BUTTON ── */
        .hd-back {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--hd-border);
          border-radius: var(--hd-r);
          background: transparent;
          color: var(--hd-ink-muted);
          cursor: pointer;
          flex-shrink: 0;
          transition: color var(--hd-t), border-color var(--hd-t), background var(--hd-t);
        }
        .hd-back:hover { color: var(--hd-ink); border-color: var(--hd-ink-soft); background: var(--hd-surface-2); }

        /* ── LOGO ── */
        .hd-logo {
          display: flex;
          align-items: center;
          gap: 9px;
          cursor: pointer;
          flex-shrink: 0;
          text-decoration: none;
        }

        .hd-logo-icon {
          font-size: 20px;
          filter: drop-shadow(0 0 6px rgba(201,168,76,.5));
          line-height: 1;
        }

        .hd-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .hd-logo-brand {
          font-family: var(--hd-font-d);
          font-size: 17px;
          font-weight: 800;
          color: var(--hd-ink);
          letter-spacing: -0.01em;
        }

        .hd-logo-tag {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--hd-gold);
          margin-top: 1px;
        }

        /* ── DESKTOP NAV ── */
        .hd-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          flex: 1;
        }

        .hd-dd-wrap { position: relative; }

        .hd-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 8px 13px;
          background: transparent;
          border: none;
          border-radius: var(--hd-r);
          font-family: var(--hd-font-b);
          font-size: 13.5px;
          font-weight: 600;
          color: var(--hd-ink-soft);
          cursor: pointer;
          transition: background var(--hd-t), color var(--hd-t);
          white-space: nowrap;
        }
        .hd-nav-btn:hover,
        .hd-nav-btn--open { background: var(--hd-surface-2); color: var(--hd-ink); }

        .hd-chevron { transition: transform var(--hd-t); }
        .hd-chevron--up { transform: rotate(180deg); }

        /* ── MEGA DROPDOWN ── */
        .hd-mega {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: var(--hd-surface);
          border: 1px solid var(--hd-border);
          border-radius: 16px;
          box-shadow: var(--hd-shadow-lg);
          width: min(860px, calc(100vw - 24px));
          min-width: 0;
          max-width: 860px;
          max-height: calc(100vh - 120px);
          z-index: 2000;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: hd-drop .18s ease both;
        }

        @keyframes hd-drop {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hd-mega-search {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 18px;
          border-bottom: 1px solid var(--hd-border);
          background: var(--hd-surface-2);
        }

        .hd-search-icon { color: var(--hd-ink-muted); flex-shrink: 0; }

        .hd-search-input {
          flex: 1;
          border: none;
          background: transparent;
          font-family: var(--hd-font-b);
          font-size: 13.5px;
          color: var(--hd-ink);
          outline: none;
        }
        .hd-search-input::placeholder { color: var(--hd-ink-muted); }

        .hd-mega-body {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0;
          max-height: none;
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: 20px;
          gap: 24px;
        }

        .hd-mega-col { display: flex; flex-direction: column; gap: 4px; }

        .hd-col-label {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--hd-ink-muted);
          margin: 0 0 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .hd-col-count {
          background: var(--hd-surface-2);
          border: 1px solid var(--hd-border);
          border-radius: 99px;
          font-size: 10px;
          padding: 1px 7px;
          font-weight: 600;
          color: var(--hd-ink-muted);
        }

        .hd-empty {
          font-size: 13px;
          color: var(--hd-ink-muted);
          padding: 12px 0;
          font-style: italic;
        }

        .hd-mega-footer {
          border-top: 1px solid var(--hd-border);
          padding: 12px 20px;
          background: var(--hd-surface-2);
        }

        .hd-mega-cta {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 18px;
          background: var(--hd-ink);
          color: #fff;
          border: none;
          border-radius: var(--hd-r);
          font-family: var(--hd-font-b);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background var(--hd-t), transform var(--hd-t);
        }
        .hd-mega-cta:hover { background: var(--hd-ink-soft); transform: translateY(-1px); }

        /* ── COURSE ROW ── */
        .hd-course-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
          border-radius: var(--hd-r);
          cursor: pointer;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          transition: background var(--hd-t);
        }
        .hd-course-row:hover { background: var(--hd-surface-2); }

        .hd-course-thumb {
          width: 36px; height: 36px;
          border-radius: 8px;
          background: var(--hd-surface-2);
          border: 1px solid var(--hd-border);
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }
        .hd-course-thumb img { width: 100%; height: 100%; object-fit: cover; }

        .hd-course-info { flex: 1; min-width: 0; }
        .hd-course-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--hd-ink);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
        }
        .hd-course-price { font-size: 11.5px; color: var(--hd-accent); font-weight: 600; margin-top: 1px; display: block; }

        /* ── STANDARD DROPDOWN ── */
        .hd-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: var(--hd-surface);
          border: 1px solid var(--hd-border);
          border-radius: 16px;
          box-shadow: var(--hd-shadow-lg);
          min-width: 320px;
          max-width: 380px;
          z-index: 2000;
          overflow: hidden;
          animation: hd-drop .18s ease both;
        }

        .hd-dd-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid var(--hd-border);
          background: var(--hd-surface-2);
        }

        .hd-dd-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--hd-ink);
          margin: 0;
        }

        .hd-dd-count {
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          background: var(--hd-surface);
          border: 1px solid var(--hd-border);
          border-radius: 99px;
          color: var(--hd-ink-muted);
        }

        .hd-dd-body { max-height: 360px; overflow-y: auto; }

        .hd-dd-loading {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 20px;
          font-size: 13px;
          color: var(--hd-ink-muted);
        }

        .hd-enrollment-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          width: 100%;
          padding: 14px 20px;
          border: none;
          background: transparent;
          border-bottom: 1px solid var(--hd-border);
          cursor: pointer;
          text-align: left;
          transition: background var(--hd-t);
        }
        .hd-enrollment-row:hover { background: var(--hd-surface-2); }
        .hd-enrollment-row:last-of-type { border-bottom: none; }

        .hd-enroll-check {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: var(--hd-green-s);
          color: var(--hd-green);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .hd-enroll-info { flex: 1; min-width: 0; }
        .hd-enroll-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--hd-ink);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0 0 3px;
        }
        .hd-enroll-date { font-size: 11.5px; color: var(--hd-ink-muted); margin: 0; }

        .hd-dd-footer-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          width: 100%;
          padding: 13px 20px;
          background: transparent;
          border: none;
          border-top: 1px solid var(--hd-border);
          font-family: var(--hd-font-b);
          font-size: 13px;
          font-weight: 600;
          color: var(--hd-accent);
          cursor: pointer;
          transition: background var(--hd-t);
        }
        .hd-dd-footer-btn:hover { background: var(--hd-accent-s); }

        .hd-dd-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 32px 20px;
          color: var(--hd-ink-muted);
          font-size: 13px;
        }
        .hd-dd-empty p { margin: 0; }
        .hd-dd-browse {
          padding: 8px 16px;
          background: var(--hd-ink);
          color: #fff;
          border: none;
          border-radius: var(--hd-r);
          font-family: var(--hd-font-b);
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: background var(--hd-t);
        }
        .hd-dd-browse:hover { background: var(--hd-ink-soft); }

        /* ── RIGHT ACTIONS ── */
        .hd-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: auto;
        }

        .hd-icon-btn {
          position: relative;
          width: 38px; height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--hd-border);
          border-radius: var(--hd-r);
          background: transparent;
          color: var(--hd-ink-soft);
          cursor: pointer;
          transition: color var(--hd-t), border-color var(--hd-t), background var(--hd-t);
        }
        .hd-icon-btn:hover { color: var(--hd-ink); border-color: var(--hd-ink-soft); background: var(--hd-surface-2); }

        .hd-cart-badge {
          position: absolute;
          top: -6px; right: -6px;
          background: var(--hd-error);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 5px;
          border-radius: 99px;
          min-width: 18px;
          text-align: center;
          line-height: 1.4;
          border: 2px solid #fff;
        }

        .hd-auth-btns { display: flex; align-items: center; gap: 8px; }

        .hd-login-btn {
          padding: 8px 16px;
          background: transparent;
          border: 1px solid var(--hd-border);
          border-radius: var(--hd-r);
          font-family: var(--hd-font-b);
          font-size: 13.5px;
          font-weight: 600;
          color: var(--hd-ink-soft);
          cursor: pointer;
          transition: color var(--hd-t), border-color var(--hd-t), background var(--hd-t);
        }
        .hd-login-btn:hover { color: var(--hd-ink); border-color: var(--hd-ink-soft); background: var(--hd-surface-2); }

        .hd-signup-btn {
          padding: 8px 16px;
          background: var(--hd-ink);
          color: #fff;
          border: none;
          border-radius: var(--hd-r);
          font-family: var(--hd-font-b);
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: background var(--hd-t), transform var(--hd-t);
          box-shadow: 0 1px 3px rgba(14,15,19,.2);
        }
        .hd-signup-btn:hover { background: var(--hd-ink-soft); transform: translateY(-1px); }

        /* ── PROFILE ── */
        .hd-avatar-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1.5px solid var(--hd-border);
          background: transparent;
          padding: 0;
          cursor: pointer;
          overflow: hidden;
          transition: border-color var(--hd-t), transform var(--hd-t);
        }
        .hd-avatar-btn:hover { border-color: var(--hd-gold); transform: scale(1.06); }

        .hd-avatar {
          width: 100%; height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--hd-ink);
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          font-family: var(--hd-font-d);
          border-radius: 50%;
        }

        .hd-profile-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: var(--hd-surface);
          border: 1px solid var(--hd-border);
          border-radius: 16px;
          box-shadow: var(--hd-shadow-lg);
          min-width: 260px;
          z-index: 2000;
          overflow: hidden;
          animation: hd-drop .18s ease both;
        }

        .hd-pm-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: var(--hd-ink);
          cursor: pointer;
          transition: background var(--hd-t);
        }
        .hd-pm-header:hover { background: var(--hd-ink-soft); }

        .hd-pm-avatar {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: rgba(255,255,255,.12);
          border: 1.5px solid rgba(255,255,255,.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--hd-font-d);
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
        }

        .hd-pm-name {
          font-size: 13.5px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 3px;
        }

        .hd-pm-link {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11.5px;
          color: rgba(255,255,255,.5);
          margin: 0;
        }

        .hd-pm-divider { height: 1px; background: var(--hd-border); }

        .hd-pm-items { padding: 6px; }

        .hd-pm-item {
          display: flex;
          align-items: center;
          gap: 9px;
          width: 100%;
          padding: 10px 14px;
          background: transparent;
          border: none;
          border-radius: var(--hd-r);
          font-family: var(--hd-font-b);
          font-size: 13.5px;
          font-weight: 600;
          color: var(--hd-ink-soft);
          cursor: pointer;
          transition: background var(--hd-t), color var(--hd-t);
          text-align: left;
        }
        .hd-pm-item:hover { background: var(--hd-surface-2); color: var(--hd-ink); }

        .hd-pm-item--danger {
          margin: 4px 6px 6px;
          width: calc(100% - 12px);
          color: var(--hd-error);
        }
        .hd-pm-item--danger:hover { background: rgba(190,24,93,.06); color: var(--hd-error); }

        /* ── SPINNER ── */
        .hd-spinner {
          display: inline-block;
          width: 14px; height: 14px;
          border: 2px solid var(--hd-border);
          border-top-color: var(--hd-accent);
          border-radius: 50%;
          animation: hd-spin .7s linear infinite;
        }
        @keyframes hd-spin { to { transform: rotate(360deg); } }

        /* ── MOBILE TOGGLE ── */
        .hd-mobile-toggle {
          display: none;
          width: 36px; height: 36px;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--hd-border);
          border-radius: var(--hd-r);
          background: transparent;
          color: var(--hd-ink-soft);
          cursor: pointer;
          transition: color var(--hd-t), background var(--hd-t);
        }
        .hd-mobile-toggle:hover { color: var(--hd-ink); background: var(--hd-surface-2); }

        /* ── MOBILE MENU ── */
        .hd-mobile-menu {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 12px 20px 20px;
          border-top: 1px solid var(--hd-border);
          animation: hd-drop .2s ease both;
        }

        .hd-mobile-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 12px 14px;
          background: transparent;
          border: none;
          border-radius: var(--hd-r);
          font-family: var(--hd-font-b);
          font-size: 14px;
          font-weight: 600;
          color: var(--hd-ink-soft);
          cursor: pointer;
          text-align: left;
          transition: background var(--hd-t), color var(--hd-t);
          width: 100%;
        }
        .hd-mobile-item:hover { background: var(--hd-surface-2); color: var(--hd-ink); }
        .hd-mobile-item--danger { color: var(--hd-error); }
        .hd-mobile-item--danger:hover { background: rgba(190,24,93,.06); }

        .hd-mobile-divider { height: 1px; background: var(--hd-border); margin: 6px 0; }

        .hd-mobile-auth { display: flex; gap: 10px; margin-top: 4px; }

        .hd-mobile-login {
          flex: 1;
          padding: 11px;
          background: transparent;
          border: 1px solid var(--hd-border);
          border-radius: var(--hd-r);
          font-family: var(--hd-font-b);
          font-size: 14px;
          font-weight: 600;
          color: var(--hd-ink-soft);
          cursor: pointer;
        }

        .hd-mobile-signup {
          flex: 1;
          padding: 11px;
          background: var(--hd-ink);
          color: #fff;
          border: none;
          border-radius: var(--hd-r);
          font-family: var(--hd-font-b);
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .hd-nav { display: none; }
          .hd-mobile-toggle { display: flex; }
          .hd-auth-btns { display: none; }
        }

        @media (max-width: 600px) {
          .hd-inner { padding: 0 16px; gap: 16px; }
          .hd-logo-tag { display: none; }
        }
      `})]})},ff=({course:e,onClick:t})=>l.jsxs("button",{className:"hd-course-row",onClick:t,children:[l.jsx("span",{className:"hd-course-thumb",children:e.imageUrl?l.jsx("img",{src:e.imageUrl,alt:e.title}):"📚"}),l.jsxs("span",{className:"hd-course-info",children:[l.jsx("span",{className:"hd-course-name",children:e.title}),e.price!==void 0&&l.jsxs("span",{className:"hd-course-price",children:["₹",e.price.toFixed(2)]})]})]}),iu=async e=>(await xe.get(`${$x}/${e}`)).data,Ov=async(e,t,a)=>xe.post(`${$x}/update`,null,{params:{userId:e,courseId:t,watchedSeconds:a}}),Dv=e=>e===100?{label:"Completed",color:"var(--hs-green)",bg:"var(--hs-green-s)"}:e>50?{label:"Almost Done",color:"var(--hs-amber)",bg:"var(--hs-amber-s)"}:e>0?{label:"In Progress",color:"var(--hs-accent)",bg:"var(--hs-accent-s)"}:{label:"Not Started",color:"var(--hs-muted)",bg:"var(--hs-surface-3)"},Mv=({course:e,onClick:t})=>{var r;const[a,n]=b.useState(!1),i=Dv(e.progress);return l.jsxs("div",{className:`hs-course-card${a?" hs-course-card--hover":""}`,onClick:t,onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),children:[l.jsxs("div",{className:"hs-thumb",children:[l.jsx("img",{src:e.course.imageUrl||"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",alt:e.course.title,className:`hs-thumb-img${a?" hs-thumb-img--zoom":""}`}),l.jsx("div",{className:`hs-thumb-overlay${a?" hs-thumb-overlay--show":""}`,children:l.jsx("span",{className:"hs-play-btn",children:l.jsx(ln,{size:16})})}),e.progress>0&&l.jsxs("span",{className:"hs-prog-badge",children:[e.progress,"%"]})]}),l.jsxs("div",{className:"hs-card-body",children:[l.jsxs("div",{children:[l.jsx("h4",{className:"hs-card-title",children:e.course.title}),l.jsxs("p",{className:"hs-card-instructor",children:[l.jsx(Fe,{size:13}),((r=e.course.instructor)==null?void 0:r.name)||"Expert Instructor"]})]}),l.jsxs("div",{className:"hs-card-footer",children:[l.jsx("div",{className:"hs-bar-wrap",children:l.jsx("div",{className:"hs-bar",children:l.jsx("div",{className:"hs-bar-fill",style:{width:`${e.progress}%`},children:l.jsx("div",{className:"hs-bar-shimmer"})})})}),l.jsx("span",{className:"hs-status-chip",style:{color:i.color,background:i.bg},children:i.label})]})]})]})},Lv=({streak:e,totalTime:t})=>l.jsxs("div",{className:"hs-streak-card",children:[l.jsxs("div",{className:"hs-streak-left",children:[l.jsx("span",{className:"hs-streak-emoji",children:"🔥"}),l.jsxs("div",{children:[l.jsxs("p",{className:"hs-streak-num",children:[e,"-day streak"]}),l.jsx("p",{className:"hs-streak-sub",children:"Keep the momentum going"})]})]}),l.jsxs("div",{className:"hs-streak-right",children:[l.jsxs("span",{className:"hs-streak-stat",children:[l.jsx(Qa,{size:13})," ",t,"h this week"]}),l.jsxs("span",{className:"hs-streak-stat",children:[l.jsx(Kd,{size:13})," +",e*10," XP earned"]})]})]}),Do=({style:e,delay:t,icon:a,iconBg:n,iconColor:i,bold:r,small:s})=>l.jsxs("div",{className:"hs-float-card",style:{...e,animationDelay:t},children:[l.jsx("span",{className:"hs-float-icon",style:{background:n,color:i},children:a}),l.jsxs("div",{children:[l.jsx("p",{className:"hs-float-bold",children:r}),l.jsx("p",{className:"hs-float-small",children:s})]})]}),Uv=({onExplorePress:e,onWatchDemoPress:t,onCoursePress:a})=>{const[n,i]=b.useState([]),[r,s]=b.useState(!0),[o,c]=b.useState(!1),[d,p]=b.useState(""),[f,u]=b.useState(!1),[x,m]=b.useState({totalCourses:2e5,activeLearners:5e4,completionRate:0,totalProgress:0,streak:0,weeklyHours:0}),j=b.useCallback(async()=>{var w;try{const h=vn();if(h!=null&&h.userId){c(!0),p(h.fullName||((w=h.email)==null?void 0:w.split("@")[0])||"Student");const[g,v]=await Promise.all([Ri(String(h.userId)),iu(String(h.userId))]),y=new Map;v.forEach(E=>y.set(E.courseId,E.progress));const k=g.map(E=>({...E,progress:y.get(E.course.id)||0,lastAccessed:new Date,timeSpent:Math.floor(Math.random()*20)+5})).sort((E,Q)=>Q.progress-E.progress).slice(0,3);i(k);const G=k.length?Math.round(k.reduce((E,Q)=>E+Q.progress,0)/k.length):0,C=k.filter(E=>E.progress===100).length,T=Math.floor(Math.random()*30)+1,O=k.reduce((E,Q)=>E+(Q.timeSpent||0),0);m(E=>({...E,completionRate:k.length?Math.round(C/k.length*100):0,totalProgress:G,streak:T,weeklyHours:O}))}else c(!1)}catch(h){console.error("Error loading hero data:",h)}finally{s(!1),u(!1)}},[]);return b.useEffect(()=>{j();const w=setInterval(()=>{o&&(u(!0),j())},3e4);return()=>clearInterval(w)},[j,o]),l.jsxs("section",{className:"hs-root",children:[l.jsx("div",{className:"hs-grid-tex"}),l.jsx("div",{className:"hs-ring hs-ring-1"}),l.jsx("div",{className:"hs-ring hs-ring-2"}),l.jsx("div",{className:"hs-wrap",children:l.jsxs("div",{className:"hs-columns",children:[l.jsxs("div",{className:"hs-left",children:[o?l.jsxs("div",{className:"hs-badge hs-badge--welcome",children:[l.jsx("span",{className:"hs-wave",children:"👋"}),l.jsxs("span",{className:"hs-badge-text",children:["Welcome back, ",l.jsx("strong",{children:d})]}),f&&l.jsx("span",{className:"hs-refresh-dot"})]}):l.jsxs("div",{className:"hs-badge",children:[l.jsx("span",{className:"hs-pulse-dot"}),l.jsx("span",{className:"hs-badge-text",children:"Start your learning journey"})]}),l.jsx("h1",{className:"hs-headline",children:o?l.jsxs(l.Fragment,{children:["Continue your",l.jsx("br",{}),l.jsx("em",{className:"hs-em",children:"learning journey."})]}):l.jsxs(l.Fragment,{children:["Master your future with",l.jsx("br",{}),l.jsx("em",{className:"hs-em",children:"world-class skills."})]})}),l.jsx("p",{className:"hs-desc",children:o&&n.length>0?l.jsxs(l.Fragment,{children:["You have ",l.jsxs("strong",{children:[n.length," active ",n.length===1?"course":"courses"]})," with an average progress of"," ",l.jsxs("strong",{className:"hs-progress-highlight",children:[x.totalProgress,"%"]}),".",x.completionRate>0&&l.jsxs(l.Fragment,{children:[" You've completed ",x.completionRate,"% of your enrolled courses — outstanding work."]})]}):o?"Ready to start learning? Explore thousands of courses and begin building your expertise today.":`Join over 1M+ students learning from industry experts. Access ${x.totalCourses.toLocaleString()}+ courses in coding, design, business, and more.`}),l.jsxs("div",{className:"hs-actions",children:[l.jsxs("button",{className:"hs-btn-primary",onClick:e,children:[o?"Explore More Courses":"Get Started Free",l.jsx(da,{size:16})]}),!o&&l.jsxs("button",{className:"hs-btn-ghost",onClick:t,children:[l.jsx("span",{className:"hs-play-wrap",children:l.jsx(ln,{size:13})}),"Watch Demo"]}),o&&n.length>0&&l.jsxs("button",{className:`hs-btn-ghost${f?" hs-btn-ghost--loading":""}`,onClick:()=>{u(!0),j()},disabled:f,children:[l.jsx(bi,{size:15,className:f?"hs-spin":""}),f?"Refreshing…":"Refresh"]})]}),l.jsx("div",{className:"hs-stats-strip",children:o&&n.length>0?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"hs-stat",children:[l.jsx("span",{className:"hs-stat-num",children:n.length}),l.jsx("span",{className:"hs-stat-lbl",children:"Active Courses"})]}),l.jsx("span",{className:"hs-stat-div"}),l.jsxs("div",{className:"hs-stat",children:[l.jsxs("span",{className:"hs-stat-num",children:[x.totalProgress,"%"]}),l.jsx("span",{className:"hs-stat-lbl",children:"Avg Progress"})]}),l.jsx("span",{className:"hs-stat-div"}),l.jsxs("div",{className:"hs-stat",children:[l.jsxs("span",{className:"hs-stat-num",children:[x.streak,"d"]}),l.jsx("span",{className:"hs-stat-lbl",children:"Streak 🔥"})]})]}):l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"hs-stat",children:[l.jsx("span",{className:"hs-stat-num",children:"200K+"}),l.jsx("span",{className:"hs-stat-lbl",children:"Courses"})]}),l.jsx("span",{className:"hs-stat-div"}),l.jsxs("div",{className:"hs-stat",children:[l.jsx("span",{className:"hs-stat-num",children:"50K+"}),l.jsx("span",{className:"hs-stat-lbl",children:"Expert Mentors"})]}),l.jsx("span",{className:"hs-stat-div"}),l.jsxs("div",{className:"hs-stat",children:[l.jsx("span",{className:"hs-stat-num",children:"4.9★"}),l.jsx("span",{className:"hs-stat-lbl",children:"Avg Rating"})]})]})})]}),l.jsx("div",{className:"hs-right",children:o&&n.length>0?l.jsxs("div",{className:"hs-enrolled-panel",children:[l.jsxs("div",{className:"hs-enrolled-hdr",children:[l.jsx(is,{size:18,className:"hs-bolt"}),l.jsxs("div",{children:[l.jsx("h3",{className:"hs-enrolled-title",children:"Continue Learning"}),l.jsxs("p",{className:"hs-enrolled-sub",children:["Your ",n.length," most recent ",n.length===1?"course":"courses"]})]})]}),l.jsx("div",{className:"hs-courses-list",children:r?l.jsxs("div",{className:"hs-loading-state",children:[l.jsx("span",{className:"hs-loader"}),l.jsx("p",{className:"hs-loading-txt",children:"Loading your courses…"})]}):n.map(w=>l.jsx(Mv,{course:w,onClick:()=>a==null?void 0:a(w.course.id)},w.id))}),!r&&x.streak>0&&l.jsx(Lv,{streak:x.streak,totalTime:x.weeklyHours})]}):l.jsxs("div",{className:"hs-img-wrap",children:[l.jsx("img",{src:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=800&fit=crop",alt:"Students collaborating",className:"hs-hero-img"}),l.jsx("div",{className:"hs-img-overlay"}),l.jsx(Do,{style:{top:"8%",left:"-32px"},delay:"0s",icon:l.jsx(jl,{size:18}),iconBg:"var(--hs-accent-s)",iconColor:"var(--hs-accent)",bold:"10k+ Students",small:"Enrolled Today"}),l.jsx(Do,{style:{bottom:"20%",right:"-28px"},delay:"1.4s",icon:l.jsx(st,{size:18}),iconBg:"var(--hs-green-s)",iconColor:"var(--hs-green)",bold:"Course Completed",small:"Python Advanced"}),l.jsx(Do,{style:{top:"50%",right:"-36px"},delay:"0.8s",icon:l.jsx(fn,{size:18}),iconBg:"var(--hs-amber-s)",iconColor:"var(--hs-amber)",bold:"Top Rated",small:"4.9 / 5 Average"})]})})]})}),l.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        /* ── TOKENS ── */
        :root {
          --hs-ink:        #0e0f13;
          --hs-ink-soft:   #3d4154;
          --hs-ink-muted:  #8b90a8;
          --hs-surface:    #ffffff;
          --hs-surface-2:  rgba(255,255,255,.06);
          --hs-surface-3:  rgba(255,255,255,.12);
          --hs-border:     rgba(255,255,255,.10);
          --hs-accent:     #1a56db;
          --hs-accent-s:   rgba(26,86,219,.15);
          --hs-green:      #16a34a;
          --hs-green-s:    rgba(22,163,74,.15);
          --hs-amber:      #b45309;
          --hs-amber-s:    rgba(180,83,9,.15);
          --hs-gold:       #c9a84c;
          --hs-muted:      rgba(255,255,255,.38);
          --hs-font-d:     'Playfair Display', Georgia, serif;
          --hs-font-b:     'DM Sans', 'Helvetica Neue', sans-serif;
          --hs-t:          .22s cubic-bezier(.4,0,.2,1);
        }

        /* ── SECTION ── */
        .hs-root {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: var(--hs-ink);
          color: #fff;
          font-family: var(--hs-font-b);
          -webkit-font-smoothing: antialiased;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 100px 24px 80px;
        }

        /* Subtle grid texture */
        .hs-grid-tex {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
          background-size: 52px 52px;
          pointer-events: none;
        }

        /* Decorative rings */
        .hs-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,.07);
          pointer-events: none;
        }
        .hs-ring-1 { width: 700px; height: 700px; bottom: -300px; right: -200px; animation: hs-spin 90s linear infinite; }
        .hs-ring-2 { width: 380px; height: 380px; top: -120px; left: -80px;  animation: hs-spin 70s linear infinite reverse; }

        @keyframes hs-spin { to { transform: rotate(360deg); } }

        /* Wrapper */
        .hs-wrap {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .hs-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
        }

        /* ═══════════════════════════════════
           LEFT COLUMN
        ═══════════════════════════════════ */
        .hs-left {
          animation: hs-fade-up .55s ease both;
        }

        @keyframes hs-fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Badge */
        .hs-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          background: var(--hs-surface-2);
          border: 1px solid var(--hs-border);
          border-radius: 99px;
          margin-bottom: 28px;
          backdrop-filter: blur(8px);
        }

        .hs-badge--welcome {
          border-color: rgba(201,168,76,.25);
          background: rgba(201,168,76,.08);
        }

        .hs-badge-text {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,.8);
        }

        .hs-badge-text strong { color: #fff; font-weight: 700; }

        .hs-pulse-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--hs-gold);
          animation: hs-pulse 2.4s ease infinite;
        }

        @keyframes hs-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(201,168,76,.6); }
          60%      { box-shadow: 0 0 0 8px rgba(201,168,76,.0); }
        }

        .hs-wave { display: inline-block; animation: hs-wave 2s ease-in-out infinite; }
        @keyframes hs-wave {
          0%,100% { transform: rotate(0deg); }
          25%      { transform: rotate(18deg); }
          75%      { transform: rotate(-18deg); }
        }

        .hs-refresh-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--hs-gold);
          animation: hs-glow 1.6s ease infinite;
        }
        @keyframes hs-glow {
          0%,100% { opacity: 1; }
          50%      { opacity: .3; }
        }

        /* Headline */
        .hs-headline {
          font-family: var(--hs-font-d);
          font-size: clamp(36px, 4.5vw, 62px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 22px;
          color: #fff;
        }

        .hs-em {
          font-style: italic;
          color: var(--hs-gold);
        }

        /* Description */
        .hs-desc {
          font-size: 15.5px;
          line-height: 1.8;
          color: rgba(255,255,255,.58);
          margin: 0 0 36px;
          max-width: 500px;
          font-weight: 300;
        }

        .hs-desc strong { color: rgba(255,255,255,.9); font-weight: 600; }
        .hs-progress-highlight { color: var(--hs-gold); }

        /* CTA buttons */
        .hs-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }

        .hs-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 28px;
          background: #fff;
          color: var(--hs-ink);
          border: none;
          border-radius: 10px;
          font-family: var(--hs-font-b);
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: transform var(--hs-t), box-shadow var(--hs-t);
          box-shadow: 0 4px 16px rgba(255,255,255,.12);
          letter-spacing: .01em;
        }
        .hs-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(255,255,255,.18);
        }

        .hs-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 22px;
          background: transparent;
          color: rgba(255,255,255,.72);
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 10px;
          font-family: var(--hs-font-b);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background var(--hs-t), border-color var(--hs-t), color var(--hs-t);
        }
        .hs-btn-ghost:hover:not(:disabled) {
          background: rgba(255,255,255,.07);
          border-color: rgba(255,255,255,.3);
          color: #fff;
        }
        .hs-btn-ghost--loading { opacity: .5; cursor: not-allowed; }

        .hs-play-wrap {
          width: 24px; height: 24px;
          border-radius: 50%;
          background: rgba(255,255,255,.15);
          display: flex; align-items: center; justify-content: center;
        }

        .hs-spin { animation: hs-spin .6s linear infinite; }

        /* Stats strip */
        .hs-stats-strip {
          display: flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
          padding-top: 28px;
          border-top: 1px solid rgba(255,255,255,.08);
        }

        .hs-stat {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .hs-stat-num {
          font-family: var(--hs-font-d);
          font-size: 26px;
          font-weight: 700;
          color: #fff;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .hs-stat-lbl {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: rgba(255,255,255,.35);
        }

        .hs-stat-div {
          width: 1px; height: 36px;
          background: rgba(255,255,255,.1);
        }

        /* ═══════════════════════════════════
           RIGHT COLUMN
        ═══════════════════════════════════ */
        .hs-right {
          display: flex;
          justify-content: center;
          position: relative;
          animation: hs-fade-up .65s ease both .15s;
        }

        /* ── HERO IMAGE (guest) ── */
        .hs-img-wrap {
          position: relative;
          width: 100%;
          max-width: 520px;
        }

        .hs-hero-img {
          width: 100%;
          border-radius: 20px;
          display: block;
          transform: rotate(1.5deg);
          border: 1px solid rgba(255,255,255,.1);
          box-shadow: 0 32px 64px rgba(0,0,0,.5);
        }

        .hs-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(14,15,19,.55), transparent 55%);
          border-radius: 20px;
          transform: rotate(1.5deg);
          pointer-events: none;
        }

        /* Floating cards */
        .hs-float-card {
          position: absolute;
          background: rgba(255,255,255,.96);
          backdrop-filter: blur(16px);
          padding: 14px 18px;
          border-radius: 14px;
          box-shadow: 0 16px 40px rgba(0,0,0,.22);
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 10;
          color: var(--hs-ink);
          min-width: 188px;
          animation: hs-float 6s ease-in-out infinite;
        }

        @keyframes hs-float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }

        .hs-float-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .hs-float-bold  { font-size: 13px; font-weight: 700; color: var(--hs-ink); margin: 0; }
        .hs-float-small { font-size: 12px; color: var(--hs-ink-muted); margin: 2px 0 0; }

        /* ── ENROLLED PANEL ── */
        .hs-enrolled-panel {
          width: 100%;
          max-width: 520px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .hs-enrolled-hdr {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--hs-border);
        }

        .hs-bolt { color: var(--hs-gold); flex-shrink: 0; margin-top: 3px; }

        .hs-enrolled-title {
          font-family: var(--hs-font-d);
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 3px;
          letter-spacing: -0.01em;
        }

        .hs-enrolled-sub {
          font-size: 13px;
          color: rgba(255,255,255,.4);
          margin: 0;
          font-weight: 400;
        }

        /* Courses list */
        .hs-courses-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* Course card */
        .hs-course-card {
          display: flex;
          gap: 14px;
          background: rgba(255,255,255,.05);
          border: 1px solid var(--hs-border);
          border-radius: 14px;
          padding: 14px;
          cursor: pointer;
          transition: background var(--hs-t), border-color var(--hs-t), transform var(--hs-t);
        }

        .hs-course-card--hover {
          background: rgba(255,255,255,.09);
          border-color: rgba(201,168,76,.3);
          transform: translateX(4px);
        }

        .hs-thumb {
          width: 120px; height: 84px;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
          background: rgba(255,255,255,.05);
        }

        .hs-thumb-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform var(--hs-t);
        }
        .hs-thumb-img--zoom { transform: scale(1.08); }

        .hs-thumb-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,.45);
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transition: opacity var(--hs-t);
        }
        .hs-thumb-overlay--show { opacity: 1; }

        .hs-play-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,.95);
          color: var(--hs-ink);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,.25);
        }

        .hs-prog-badge {
          position: absolute;
          top: 7px; right: 7px;
          background: rgba(14,15,19,.85);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,.12);
        }

        .hs-card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-width: 0;
        }

        .hs-card-title {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,.92);
          margin: 0 0 5px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .hs-card-instructor {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: rgba(255,255,255,.4);
          margin: 0;
          font-weight: 400;
        }

        .hs-card-footer {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hs-bar-wrap { flex: 1; }

        .hs-bar {
          width: 100%; height: 5px;
          background: rgba(255,255,255,.1);
          border-radius: 99px;
          overflow: hidden;
        }

        .hs-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--hs-gold), rgba(201,168,76,.65));
          border-radius: 99px;
          transition: width .6s ease;
          position: relative;
          overflow: hidden;
        }

        .hs-bar-shimmer {
          position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent);
          animation: hs-shimmer 2.4s infinite;
        }
        @keyframes hs-shimmer { to { left: 100%; } }

        .hs-status-chip {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 9px;
          border-radius: 6px;
          white-space: nowrap;
        }

        /* Streak card */
        .hs-streak-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          background: rgba(201,168,76,.08);
          border: 1px solid rgba(201,168,76,.2);
          border-radius: 14px;
          gap: 16px;
        }

        .hs-streak-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hs-streak-emoji {
          font-size: 26px;
          line-height: 1;
        }

        .hs-streak-num {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 3px;
        }

        .hs-streak-sub {
          font-size: 12px;
          color: rgba(255,255,255,.4);
          margin: 0;
        }

        .hs-streak-right {
          display: flex;
          flex-direction: column;
          gap: 5px;
          align-items: flex-end;
        }

        .hs-streak-stat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,.45);
        }

        /* Loading state */
        .hs-loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          padding: 48px 0;
        }

        .hs-loader {
          display: block;
          width: 32px; height: 32px;
          border: 3px solid rgba(255,255,255,.1);
          border-top-color: var(--hs-gold);
          border-radius: 50%;
          animation: hs-spin .7s linear infinite;
        }

        .hs-loading-txt {
          font-size: 13px;
          color: rgba(255,255,255,.35);
          margin: 0;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .hs-columns {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .hs-right { order: -1; }
          .hs-enrolled-panel,
          .hs-img-wrap { max-width: 100%; }
        }

        @media (max-width: 600px) {
          .hs-root { padding: 80px 20px 60px; }
          .hs-actions { flex-direction: column; align-items: flex-start; }
          .hs-btn-primary, .hs-btn-ghost { width: 100%; justify-content: center; }
        }
      `})]})},Mo={background:"#f8fafc",textLight:"#6b7280",textLighter:"#9aa3ad"},Ja={sm:12,lg:24,xl:32,xxl:56},hf={sm:14,md:16};function Hv(e){return V({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"},child:[]}]})(e)}function _v(e){return V({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32 140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5 40.7-.1 35.5 29.8 35.5 69.1zm0 86.8c0 80-84.2 68-84.2 17.2 0-47.2 50.5-56.7 84.2-57.8v40.6zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12zm39.8 2.2c-6.5 15.8-16 26.8-21.2 31-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2-10.8 1-13 2-14-.3-2.3-5.7 21.7-15.5 37.5-17.5 15.7-1.8 41-.8 46 5.7 3.7 5.1 0 27.1-6.5 43.1z"},child:[]}]})(e)}function Gv(e){return V({attr:{viewBox:"0 0 488 512"},child:[{tag:"path",attr:{d:"M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"},child:[]}]})(e)}function Yv(e){return V({attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M640 317.9C640 409.2 600.6 466.4 529.7 466.4C467.1 466.4 433.9 431.8 372.8 329.8L341.4 277.2C333.1 264.7 326.9 253 320.2 242.2C300.1 276 273.1 325.2 273.1 325.2C206.1 441.8 168.5 466.4 116.2 466.4C43.42 466.4 0 409.1 0 320.5C0 177.5 79.78 42.4 183.9 42.4C234.1 42.4 277.7 67.08 328.7 131.9C365.8 81.8 406.8 42.4 459.3 42.4C558.4 42.4 640 168.1 640 317.9H640zM287.4 192.2C244.5 130.1 216.5 111.7 183 111.7C121.1 111.7 69.22 217.8 69.22 321.7C69.22 370.2 87.7 397.4 118.8 397.4C149 397.4 167.8 378.4 222 293.6C222 293.6 246.7 254.5 287.4 192.2V192.2zM531.2 397.4C563.4 397.4 578.1 369.9 578.1 322.5C578.1 198.3 523.8 97.08 454.9 97.08C421.7 97.08 393.8 123 360 175.1C369.4 188.9 379.1 204.1 389.3 220.5L426.8 282.9C485.5 377 500.3 397.4 531.2 397.4L531.2 397.4z"},child:[]}]})(e)}function Iv(e){return V({attr:{viewBox:"0 0 496 512"},child:[{tag:"path",attr:{d:"M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"},child:[]}]})(e)}const qv=()=>{const e=[{name:"Google",icon:l.jsx(Gv,{size:28})},{name:"Spotify",icon:l.jsx(Iv,{size:28})},{name:"Airbnb",icon:l.jsx(Hv,{size:28})},{name:"Amazon",icon:l.jsx(_v,{size:28})},{name:"Meta",icon:l.jsx(Yv,{size:28})}];return l.jsx("section",{style:Pa.container,children:l.jsxs("div",{style:Pa.wrapper,children:[l.jsx("h3",{style:Pa.title,children:"TRUSTED BY INNOVATORS AT"}),l.jsx("div",{style:Pa.partnersContent,children:e.map((t,a)=>l.jsxs("div",{style:Pa.partnerItem,children:[l.jsx("div",{style:Pa.icon,children:t.icon}),l.jsx("span",{style:Pa.partnerName,children:t.name})]},a))})]})})},Pa={container:{backgroundColor:Mo.background,paddingTop:Ja.xxl,paddingBottom:Ja.xxl},wrapper:{paddingLeft:Ja.lg,paddingRight:Ja.lg,maxWidth:1400,marginLeft:"auto",marginRight:"auto"},title:{textAlign:"center",fontSize:hf.sm,fontWeight:600,color:Mo.textLight,letterSpacing:1,marginBottom:Ja.xl},partnersContent:{display:"flex",justifyContent:"center",alignItems:"center",gap:Ja.xxl,flexWrap:"wrap"},partnerItem:{display:"flex",alignItems:"center",gap:Ja.sm,opacity:.65},icon:{display:"flex",alignItems:"center"},partnerName:{fontSize:hf.md,fontWeight:600,color:Mo.textLighter}},Vv=`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .lp-root *, .lp-root *::before, .lp-root *::after { box-sizing: border-box; }

  .lp-root {
    font-family: 'DM Sans', sans-serif;
    background: #0d0e11;
    padding: 72px 0 80px;
    position: relative;
    overflow: hidden;
  }

  /* mesh bg */
  .lp-mesh {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 60% 50% at 10% 20%, rgba(201,168,76,0.06), transparent),
      radial-gradient(ellipse 50% 60% at 90% 80%, rgba(201,168,76,0.04), transparent),
      radial-gradient(ellipse 40% 40% at 50% 50%, rgba(255,255,255,0.015), transparent);
  }

  .lp-wrapper {
    position: relative;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 40px;
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 48px;
    align-items: start;
  }

  /* ── Section Header ── */
  .lp-header { margin-bottom: 40px; }

  .lp-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #c9a84c;
    margin-bottom: 18px;
  }
  .lp-eyebrow-line {
    width: 28px;
    height: 1px;
    background: #c9a84c;
    opacity: 0.6;
  }

  .lp-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.6rem;
    font-weight: 700;
    color: #f0f1f5;
    letter-spacing: -0.025em;
    line-height: 1.15;
    margin: 0 0 14px;
  }

  .lp-subtitle {
    font-size: 0.95rem;
    color: #555868;
    line-height: 1.65;
    margin: 0;
    max-width: 520px;
  }

  .lp-refresh-btn {
    margin-top: 20px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: 1px solid #1e2028;
    color: #7b7f93;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .lp-refresh-btn:hover { border-color: #c9a84c40; color: #c9a84c; }
  .lp-refresh-btn svg { transition: transform 0.4s; }
  .lp-refresh-btn:hover svg { transform: rotate(180deg); }

  .lp-refreshing-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 6px #4ade8060;
    margin-left: 4px;
    animation: lp-pulse 1.8s infinite;
  }
  @keyframes lp-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

  /* ── Course Cards ── */
  .lp-list { display: flex; flex-direction: column; gap: 12px; }

  .lp-card {
    display: grid;
    grid-template-columns: 64px 1fr auto;
    align-items: center;
    gap: 20px;
    background: #13151a;
    border: 1px solid #1e2028;
    border-radius: 16px;
    padding: 20px 22px;
    cursor: pointer;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    animation: lp-fadeup 0.35s ease backwards;
    text-decoration: none;
  }
  .lp-card:hover {
    border-color: #c9a84c30;
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.25);
  }
  @keyframes lp-fadeup {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .lp-thumb {
    width: 64px;
    height: 64px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }
  .lp-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 14px;
  }
  .lp-thumb-badge {
    position: absolute;
    top: -3px;
    right: -3px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #0d0e11;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lp-card-body { min-width: 0; }

  .lp-card-top {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 5px;
  }

  .lp-card-title {
    font-size: 0.97rem;
    font-weight: 600;
    color: #e8e9ef;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }

  .lp-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 3px 9px;
    border-radius: 20px;
    flex-shrink: 0;
  }

  .lp-card-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }
  .lp-meta-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.78rem;
    color: #3a3d4d;
    font-weight: 400;
  }
  .lp-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: #2a2d3a; }

  .lp-progress-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .lp-track {
    flex: 1;
    height: 4px;
    background: #1e2028;
    border-radius: 999px;
    overflow: hidden;
  }
  .lp-fill {
    height: 100%;
    border-radius: 999px;
    transition: width 0.6s cubic-bezier(.4,0,.2,1);
    position: relative;
    overflow: hidden;
  }
  .lp-fill::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
    animation: lp-shimmer 2.2s infinite;
  }
  @keyframes lp-shimmer { from{transform:translateX(-100%)} to{transform:translateX(100%)} }

  .lp-pct {
    font-size: 0.78rem;
    font-weight: 700;
    color: #7b7f93;
    min-width: 36px;
    text-align: right;
  }

  .lp-card-arrow {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    border: 1px solid #1e2028;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3a3d4d;
    flex-shrink: 0;
    transition: all 0.2s;
  }
  .lp-card:hover .lp-card-arrow {
    border-color: #c9a84c40;
    color: #c9a84c;
    transform: translateX(2px);
  }

  /* ── States ── */
  .lp-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 64px 32px;
  }
  .lp-spinner {
    width: 36px;
    height: 36px;
    border: 3px solid #1e2028;
    border-top-color: #c9a84c;
    border-radius: 50%;
    animation: lp-spin 0.75s linear infinite;
  }
  @keyframes lp-spin { to { transform: rotate(360deg); } }
  .lp-loading p { color: #3a3d4d; font-size: 0.88rem; margin: 0; }

  .lp-error {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 24px;
    background: #1a0e0e;
    border: 1px solid #3d1316;
    border-radius: 14px;
  }
  .lp-error p { color: #f87171; font-size: 0.88rem; margin: 0 0 8px; }
  .lp-retry {
    background: none;
    border: 1px solid #6b1e22;
    color: #f87171;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    padding: 5px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .lp-retry:hover { background: #2a1012; }

  .lp-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 64px 32px;
    background: #13151a;
    border: 1px dashed #1e2028;
    border-radius: 20px;
    text-align: center;
  }
  .lp-empty-icon { font-size: 40px; margin-bottom: 4px; }
  .lp-empty h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    color: #c8cad6;
    margin: 0;
    font-weight: 600;
  }
  .lp-empty p { color: #3a3d4d; font-size: 0.88rem; margin: 0; }
  .lp-explore-btn {
    margin-top: 12px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #c9a84c;
    color: #0d0e11;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    padding: 12px 22px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }
  .lp-explore-btn:hover { background: #d9bb66; transform: translateY(-1px); }

  /* ── Right Panel ── */
  .lp-panel {
    background: #13151a;
    border: 1px solid #1e2028;
    border-radius: 20px;
    padding: 28px;
    position: sticky;
    top: 28px;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .lp-panel-header { padding-bottom: 20px; border-bottom: 1px solid #1e2028; }
  .lp-panel-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
    font-weight: 600;
    color: #f0f1f5;
    margin: 0 0 6px;
    display: flex;
    align-items: center;
    gap: 9px;
  }
  .lp-panel-title svg { color: #c9a84c; }
  .lp-panel-sub { font-size: 0.78rem; color: #3a3d4d; margin: 0; line-height: 1.5; }

  /* Stats */
  .lp-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .lp-stat {
    background: #0d0e11;
    border: 1px solid #1e2028;
    border-radius: 12px;
    padding: 14px 12px;
    text-align: center;
  }
  .lp-stat-val {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #f0f1f5;
    line-height: 1;
    margin-bottom: 5px;
  }
  .lp-stat-label {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #3a3d4d;
  }
  .lp-stat.gold .lp-stat-val  { color: #c9a84c; }
  .lp-stat.green .lp-stat-val { color: #4ade80; }
  .lp-stat.amber .lp-stat-val { color: #fbbf24; }

  /* Weekly bars */
  .lp-weekly-label {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #3a3d4d;
    margin-bottom: 14px;
  }

  .lp-bars {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    height: 120px;
  }

  .lp-bar-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    position: relative;
    cursor: default;
  }

  .lp-bar-track {
    width: 100%;
    flex: 1;
    background: #0d0e11;
    border: 1px solid #1e2028;
    border-radius: 6px;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
  }

  .lp-bar-fill {
    width: 100%;
    border-radius: 4px 4px 0 0;
    transition: height 0.5s cubic-bezier(.4,0,.2,1);
    background: linear-gradient(180deg, #c9a84c, #a67c2e);
  }
  .lp-bar-fill.zero { background: transparent; }

  .lp-bar-day {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: #3a3d4d;
    text-transform: uppercase;
  }
  .lp-bar-col:hover .lp-bar-day { color: #c9a84c; }
  .lp-bar-col:hover .lp-bar-fill:not(.zero) { background: linear-gradient(180deg, #d9bb66, #c9a84c); }

  .lp-bar-tip {
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    background: #c9a84c;
    color: #0d0e11;
    font-size: 0.68rem;
    font-weight: 700;
    padding: 3px 7px;
    border-radius: 5px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
  }
  .lp-bar-col:hover .lp-bar-tip { opacity: 1; }

  /* No-progress note */
  .lp-no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 20px;
    background: #0d0e11;
    border: 1px dashed #1e2028;
    border-radius: 12px;
    text-align: center;
  }
  .lp-no-data p { color: #3a3d4d; font-size: 0.8rem; margin: 0; line-height: 1.5; }

  /* Responsive */
  @media (max-width: 1024px) {
    .lp-wrapper { grid-template-columns: 1fr; }
    .lp-panel { position: static; }
  }
  @media (max-width: 640px) {
    .lp-wrapper { padding: 0 20px; }
    .lp-title { font-size: 1.9rem; }
    .lp-card { grid-template-columns: 52px 1fr auto; gap: 14px; padding: 16px; }
    .lp-thumb { width: 52px; height: 52px; }
    .lp-stats { grid-template-columns: repeat(3, 1fr); }
  }
`;if(typeof document<"u"&&!document.getElementById("lp-styles")){const t=document.createElement("style");t.id="lp-styles",t.textContent=Vv,document.head.appendChild(t)}const xf=[{bg:"linear-gradient(135deg,#c9a84c,#a67c2e)",glow:"#c9a84c"},{bg:"linear-gradient(135deg,#4f8ef7,#2563eb)",glow:"#4f8ef7"},{bg:"linear-gradient(135deg,#34d399,#059669)",glow:"#34d399"},{bg:"linear-gradient(135deg,#a78bfa,#7c3aed)",glow:"#a78bfa"}];function Xv(e){return e===100?{icon:l.jsx(st,{size:11}),text:"Completed",bg:"#0d2818",color:"#4ade80",border:"#1a5c35"}:e>0?{icon:l.jsx(is,{size:11}),text:"In Progress",bg:"#1a1506",color:"#fbbf24",border:"#5c4a0e"}:{icon:l.jsx(Qa,{size:11}),text:"Not Started",bg:"#13151a",color:"#555868",border:"#1e2028"}}const Wv=({course:e,index:t,onPress:a})=>{const n=xf[t%xf.length],i=Xv(e.progress),r=Math.floor((Date.now()-new Date(e.enrolledAt).getTime())/864e5);return l.jsxs("div",{className:"lp-card",style:{animationDelay:`${t*.06}s`},onClick:a,children:[l.jsxs("div",{className:"lp-thumb",style:{background:n.bg},children:[e.imageUrl?l.jsx("img",{src:e.imageUrl,alt:e.title,onError:s=>{s.target.style.display="none"}}):l.jsx(Fe,{size:24,color:"rgba(255,255,255,0.9)"}),e.progress===100&&l.jsx("div",{className:"lp-thumb-badge",children:l.jsx(st,{size:14,color:"#4ade80"})})]}),l.jsxs("div",{className:"lp-card-body",children:[l.jsxs("div",{className:"lp-card-top",children:[l.jsx("p",{className:"lp-card-title",children:e.title}),l.jsxs("span",{className:"lp-status",style:{background:i.bg,color:i.color,border:`1px solid ${i.border}`},children:[i.icon," ",i.text]})]}),l.jsxs("div",{className:"lp-card-meta",children:[l.jsxs("span",{className:"lp-meta-item",children:[l.jsx(Fe,{size:12})," ",e.instructor]}),e.completedLessons!==void 0&&e.totalLessons!==void 0&&l.jsxs(l.Fragment,{children:[l.jsx("span",{className:"lp-meta-dot"}),l.jsxs("span",{className:"lp-meta-item",children:[e.completedLessons,"/",e.totalLessons," lessons"]})]}),e.estimatedTime&&l.jsxs(l.Fragment,{children:[l.jsx("span",{className:"lp-meta-dot"}),l.jsxs("span",{className:"lp-meta-item",children:[l.jsx(Qa,{size:11})," ",e.estimatedTime]})]}),l.jsx("span",{className:"lp-meta-dot"}),l.jsx("span",{className:"lp-meta-item",children:r===0?"Enrolled today":`${r}d ago`})]}),l.jsxs("div",{className:"lp-progress-row",children:[l.jsx("div",{className:"lp-track",children:l.jsx("div",{className:"lp-fill",style:{width:`${e.progress}%`,background:n.bg}})}),l.jsxs("span",{className:"lp-pct",children:[e.progress,"%"]})]})]}),l.jsx("div",{className:"lp-card-arrow",children:l.jsx(da,{size:14})})]})},Qv=({courses:e})=>{const t=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],{bars:a,bestDay:n,avgPct:i}=b.useMemo(()=>{const c=e.length>0?[...e.slice(0,7).map(x=>Math.min(x.progress,100))]:Array(7).fill(0);for(;c.length<7;)c.push(0);const d=c.filter(x=>x>0),p=d.length?Math.round(c.reduce((x,m)=>x+m,0)/d.length):0,f=Math.max(...c),u=c.indexOf(f);return{bars:c,bestDay:f>0?t[u]:null,avgPct:p}},[e]),r=e.length,s=e.filter(c=>c.progress===100).length,o=e.filter(c=>c.progress>0&&c.progress<100).length;return l.jsxs("aside",{className:"lp-panel",children:[l.jsxs("div",{className:"lp-panel-header",children:[l.jsxs("h3",{className:"lp-panel-title",children:[l.jsx(Kd,{size:18})," Learning Analytics"]}),l.jsx("p",{className:"lp-panel-sub",children:i>0?`Avg. progress ${i}%${n?` · Peak activity: ${n}`:""}`:"Enrol in courses to see analytics"})]}),l.jsxs("div",{className:"lp-stats",children:[l.jsxs("div",{className:"lp-stat gold",children:[l.jsx("div",{className:"lp-stat-val",children:r}),l.jsx("div",{className:"lp-stat-label",children:"Enrolled"})]}),l.jsxs("div",{className:"lp-stat green",children:[l.jsx("div",{className:"lp-stat-val",children:s}),l.jsx("div",{className:"lp-stat-label",children:"Done"})]}),l.jsxs("div",{className:"lp-stat amber",children:[l.jsx("div",{className:"lp-stat-val",children:o}),l.jsx("div",{className:"lp-stat-label",children:"Active"})]})]}),l.jsxs("div",{children:[l.jsx("p",{className:"lp-weekly-label",children:"Weekly Activity"}),l.jsx("div",{className:"lp-bars",children:a.map((c,d)=>l.jsxs("div",{className:"lp-bar-col",children:[c>0&&l.jsxs("span",{className:"lp-bar-tip",children:[c,"%"]}),l.jsx("div",{className:"lp-bar-track",children:l.jsx("div",{className:`lp-bar-fill${c===0?" zero":""}`,style:{height:`${c}%`}})}),l.jsx("span",{className:"lp-bar-day",children:t[d]})]},d))})]}),r===0&&l.jsx("div",{className:"lp-no-data",children:l.jsx("p",{children:"Enrol in courses to begin tracking your weekly learning activity."})})]})},Fv=({onPathPress:e})=>{const t=Zt(),[a,n]=b.useState([]),[i,r]=b.useState(!0),[s,o]=b.useState(null),[c,d]=b.useState(!1),p=b.useCallback(async()=>{try{r(!0),o(null);const u=Os(t),[x,m]=await Promise.all([Ri(String(u.userId)),iu(String(u.userId))]),j=new Map;m.forEach(h=>j.set(h.courseId,h.progress));const w=x.map(h=>{var g;return{id:h.course.id,title:h.course.title,progress:j.get(h.course.id)||0,enrolledAt:new Date(h.enrolledAt),instructor:((g=h.course.instructor)==null?void 0:g.name)||"Unknown Instructor",imageUrl:h.course.imageUrl,estimatedTime:"2–4 hours",totalLessons:12,completedLessons:Math.floor((j.get(h.course.id)||0)/100*12)}});w.sort((h,g)=>g.enrolledAt.getTime()-h.enrolledAt.getTime()),n(w)}catch(u){if(u.message==="Authentication required")return;o(u.message||"Failed to load progress"),n([])}finally{r(!1),d(!1)}},[t]);b.useEffect(()=>{p();const u=setInterval(()=>{d(!0),p()},3e4);return()=>clearInterval(u)},[p]);const f=u=>e?e(String(u)):t(`/course/${u}`);return l.jsxs("section",{className:"lp-root",children:[l.jsx("div",{className:"lp-mesh"}),l.jsxs("div",{className:"lp-wrapper",children:[l.jsxs("div",{children:[l.jsxs("header",{className:"lp-header",children:[l.jsxs("div",{className:"lp-eyebrow",children:[l.jsx("span",{className:"lp-eyebrow-line"}),"Your Learning Journey",c&&l.jsx("span",{className:"lp-refreshing-dot"})]}),l.jsx("h2",{className:"lp-title",children:"Continue Your Progress"}),l.jsx("p",{className:"lp-subtitle",children:a.length>0?`You're enrolled in ${a.length} ${a.length===1?"course":"courses"}. Keep building momentum.`:"Discover courses and start your learning journey today."}),a.length>0&&l.jsxs("button",{className:"lp-refresh-btn",onClick:()=>{d(!0),p()},children:[l.jsx(bi,{size:13})," Refresh Progress"]})]}),l.jsxs("div",{className:"lp-list",children:[i&&l.jsxs("div",{className:"lp-loading",children:[l.jsx("div",{className:"lp-spinner"}),l.jsx("p",{children:"Loading your courses…"})]}),!i&&s&&l.jsx("div",{className:"lp-error",children:l.jsxs("div",{children:[l.jsx("p",{children:s}),l.jsx("button",{className:"lp-retry",onClick:p,children:"Try Again"})]})}),!i&&!s&&a.length===0&&l.jsxs("div",{className:"lp-empty",children:[l.jsx("span",{className:"lp-empty-icon",children:"🎓"}),l.jsx("h3",{children:"Ready to start learning?"}),l.jsx("p",{children:"Explore our catalogue and begin your journey today."}),l.jsxs("button",{className:"lp-explore-btn",onClick:()=>t("/"),children:[l.jsx(Fe,{size:16})," Explore Courses"]})]}),!i&&!s&&a.map((u,x)=>l.jsx(Wv,{course:u,index:x,onPress:()=>f(u.id)},u.id))]})]}),l.jsx(Qv,{courses:a})]})]})},Zv=[{title:"Learn",links:[{label:"Full Stack Dev",href:"#"},{label:"Cloud Computing",href:"#"},{label:"Data Science",href:"#"},{label:"System Design",href:"#"}]},{title:"Community",links:[{label:"Discord Server",href:"#"},{label:"Student Showcase",href:"#"},{label:"Tech Forums",href:"#"}]},{title:"Company",links:[{label:"About Srinutech",href:"#"},{label:"Career Paths",href:"#"},{label:"Contact Us",href:"#"}]}],$v=`
  :root {
    --footer-bg: #0f172a;
    --footer-text: #94a3b8;
    --footer-heading: #f8fafc;
    --brand-gradient: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    --hover-bg: rgba(255, 255, 255, 0.05);
  }

  .footer-container {
    background: var(--footer-bg);
    color: var(--footer-text);
    padding: 80px 20px 40px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    position: relative;
    overflow: hidden;
  }

  /* Decorative Background Glow */
  .footer-glow {
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .footer-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* Top Section Grid */
  .footer-top {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 40px;
    margin-bottom: 60px;
  }

  /* Brand Column */
  .brand-col {
    padding-right: 40px;
  }

  .brand-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .logo-icon {
    width: 48px;
    height: 48px;
    background: var(--brand-gradient);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    font-weight: 800;
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
  }

  .logo-text {
    font-size: 24px;
    font-weight: 700;
    background: linear-gradient(to right, #fff, #e2e8f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.5px;
  }

  .brand-desc {
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 24px;
    color: var(--footer-text);
    max-width: 300px;
  }

  /* Social Icons */
  .social-links {
    display: flex;
    gap: 12px;
  }

  .social-btn {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .social-btn:hover {
    background: var(--brand-gradient);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
    border-color: transparent;
  }

  /* Link Columns */
  .nav-col h4 {
    color: var(--footer-heading);
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 20px 0;
  }

  .nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .nav-link {
    color: var(--footer-text);
    text-decoration: none;
    font-size: 14px;
    transition: color 0.2s;
    display: inline-block;
  }

  .nav-link:hover {
    color: #fff;
    transform: translateX(4px);
  }

  /* Bottom Bar */
  .footer-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    margin-bottom: 30px;
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }

  .legal-links {
    display: flex;
    gap: 24px;
  }

  .legal-link {
    color: var(--footer-text);
    text-decoration: none;
    transition: color 0.2s;
  }
  .legal-link:hover { color: #fff; }

  /* Responsive Queries */
  @media (max-width: 1024px) {
    .footer-top {
      grid-template-columns: 1fr 1fr;
      gap: 40px 20px;
    }
    .brand-col {
      grid-column: 1 / -1;
      text-align: center;
      padding-right: 0;
    }
    .brand-logo { justify-content: center; }
    .brand-desc { margin: 0 auto 24px; }
    .social-links { justify-content: center; }
  }

  @media (max-width: 600px) {
    .footer-top {
      grid-template-columns: 1fr;
      text-align: center;
    }
    .footer-bottom {
      flex-direction: column;
      gap: 20px;
      text-align: center;
    }
    .nav-link:hover { transform: none; }
  }
`,Gs=()=>l.jsxs("footer",{className:"footer-container",children:[l.jsx("style",{children:$v}),l.jsx("div",{className:"footer-glow"}),l.jsxs("div",{className:"footer-wrapper",children:[l.jsxs("div",{className:"footer-top",children:[l.jsxs("div",{className:"brand-col",children:[l.jsxs("div",{className:"brand-logo",children:[l.jsx("div",{className:"logo-icon",children:"S"}),l.jsx("span",{className:"logo-text",children:"SrinutechGuru"})]}),l.jsx("p",{className:"brand-desc",children:"Empowering the next generation of developers with cutting-edge tech education and community support."}),l.jsxs("div",{className:"social-links",children:[l.jsx("a",{href:"#",className:"social-btn","aria-label":"Twitter",children:l.jsx("svg",{width:"20",height:"20",fill:"currentColor",viewBox:"0 0 24 24",children:l.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"})})}),l.jsx("a",{href:"#",className:"social-btn","aria-label":"Facebook",children:l.jsx("svg",{width:"20",height:"20",fill:"currentColor",viewBox:"0 0 24 24",children:l.jsx("path",{d:"M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.048 0-2.733.984-2.733 2.583v1.388h3.853l-1.127 3.667h-2.726v8.011c5.35-1.792 8.791-6.916 8.579-12.78C22.618 5.609 17.561.423 11.528.423S.44 5.609.587 11.391c-.212 5.864 3.227 10.988 8.514 12.3z"})})}),l.jsx("a",{href:"#",className:"social-btn","aria-label":"LinkedIn",children:l.jsx("svg",{width:"20",height:"20",fill:"currentColor",viewBox:"0 0 24 24",children:l.jsx("path",{d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"})})}),l.jsx("a",{href:"#",className:"social-btn","aria-label":"YouTube",children:l.jsx("svg",{width:"20",height:"20",fill:"currentColor",viewBox:"0 0 24 24",children:l.jsx("path",{d:"M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"})})})]})]}),Zv.map(e=>l.jsxs("div",{className:"nav-col",children:[l.jsx("h4",{children:e.title}),l.jsx("ul",{className:"nav-list",children:e.links.map(t=>l.jsx("li",{children:l.jsx("a",{href:t.href,className:"nav-link",children:t.label})},t.label))})]},e.title))]}),l.jsx("div",{className:"footer-divider"}),l.jsxs("div",{className:"footer-bottom",children:[l.jsx("p",{children:"© 2026 SrinutechGuru. All rights reserved."}),l.jsxs("div",{className:"legal-links",children:[l.jsx("a",{href:"#",className:"legal-link",children:"Privacy Policy"}),l.jsx("a",{href:"#",className:"legal-link",children:"Terms of Service"}),l.jsx("a",{href:"#",className:"legal-link",children:"Cookies"})]})]})]})]}),Qc=()=>{var t;const e=JSON.parse(localStorage.getItem("user")||"{}");return((t=e==null?void 0:e.userId)==null?void 0:t.toString())||"demoUser"},Kv=`
  :root {
    --primary: #6366f1;
    --primary-dark: #4f46e5;
    --bg-dark: #0f172a;
    --bg-card: rgba(30, 41, 59, 0.7);
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --border: rgba(255, 255, 255, 0.1);
  }

  .page-container {
    min-height: 100vh;
    background: var(--bg-dark);
    color: var(--text-main);
    padding: 40px 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  .wrapper {
    max-width: 1400px;
    margin: 0 auto;
  }

  /* Header */
  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 40px;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .header-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    margin: 0;
    background: linear-gradient(to right, #fff, #94a3b8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .header-subtitle {
    color: var(--text-muted);
    margin-top: 10px;
    font-size: 1.1rem;
  }

  .view-all-btn {
    padding: 10px 24px;
    border: 1px solid var(--border);
    border-radius: 100px;
    color: var(--text-main);
    background: rgba(255,255,255,0.05);
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 600;
    text-decoration: none;
  }
  .view-all-btn:hover { background: rgba(255,255,255,0.1); }

  /* Layout Grid */
  .main-layout {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 40px;
    align-items: start;
  }

  /* Sidebar */
  .sidebar {
    position: sticky;
    top: 20px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    backdrop-filter: blur(12px);
    border-radius: 24px;
    padding: 24px;
  }

  .category-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    margin-bottom: 8px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
    color: var(--text-muted);
    font-weight: 500;
  }

  .category-item:hover {
    background: rgba(255,255,255,0.05);
    color: #fff;
  }

  .category-item.active {
    background: var(--primary);
    color: #fff;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  }

  /* Course Grid */
  .course-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
  }

  /* Card Component */
  .course-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
  }

  .course-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    border-color: rgba(99, 102, 241, 0.5);
  }

  .card-image-wrapper {
    position: relative;
    padding-top: 60%; /* Aspect Ratio 16:9 */
    overflow: hidden;
  }

  .card-image {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .course-card:hover .card-image { transform: scale(1.05); }

  .badge {
    position: absolute;
    top: 12px; left: 12px;
    background: rgba(16, 185, 129, 0.9);
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 100px;
    backdrop-filter: blur(4px);
  }

  .card-content {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .card-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 10px 0;
    line-height: 1.4;
    color: #fff;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .rating-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    margin-bottom: 16px;
  }
  
  .star { color: #fbbf24; }
  .rating-num { font-weight: 700; color: #fff; }
  .review-count { color: var(--text-muted); font-size: 0.8rem; }

  .card-footer {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
    border-top: 1px solid var(--border);
  }

  .price { font-size: 1.25rem; font-weight: 700; color: #fff; }
  .original-price { font-size: 0.9rem; text-decoration: line-through; color: var(--text-muted); margin-left: 8px;}

  .cart-btn {
    background: var(--primary);
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .cart-btn:hover:not(:disabled) { background: var(--primary-dark); }
  .cart-btn:disabled { background: #10b981; cursor: default; }

  /* Notification Toast */
  .toast {
    position: fixed;
    top: 20px; right: 20px;
    background: #10b981;
    color: white;
    padding: 12px 24px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    font-weight: 600;
    z-index: 100;
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  /* Loading & Error */
  .state-card {
    grid-column: 1 / -1;
    text-align: center;
    padding: 60px;
    background: var(--bg-card);
    border-radius: 20px;
    border: 1px solid var(--border);
  }

  .spinner {
    width: 40px; height: 40px;
    border: 3px solid rgba(255,255,255,0.1);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* --- RESPONSIVE QUERIES --- */
  @media (max-width: 1024px) {
    .main-layout {
      grid-template-columns: 1fr; /* Stack sidebar on top */
      gap: 24px;
    }

    .sidebar {
      position: relative;
      top: 0;
      padding: 16px;
      overflow-x: auto; /* Horizontal scroll */
      white-space: nowrap;
      border-radius: 16px;
      
      /* Hide scrollbar but keep functionality */
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .sidebar::-webkit-scrollbar { display: none; }

    .sidebar-list {
      display: flex;
      flex-direction: row;
      gap: 12px;
    }

    .category-item {
      margin: 0;
      background: rgba(255,255,255,0.05);
      padding: 10px 20px;
      border-radius: 100px;
    }
    
    .sidebar-title { display: none; } /* Hide title on mobile to save space */
  }

  @media (max-width: 600px) {
    .header-title { font-size: 2rem; }
    .course-grid { grid-template-columns: 1fr; }
  }
`,Jv=({course:e,isPurchased:t=!1,onPress:a,onAddToCart:n})=>{const[i,r]=b.useState(!1),s=async o=>{o.stopPropagation(),r(!0);try{await(n==null?void 0:n(e.id))}finally{setTimeout(()=>r(!1),1500)}};return l.jsxs("div",{className:"course-card",onClick:()=>a==null?void 0:a(e.id),children:[l.jsxs("div",{className:"card-image-wrapper",children:[l.jsx("img",{src:e.imageUrl||"https://via.placeholder.com/400x225?text=No+Image",alt:e.title,className:"card-image"}),e.badge&&l.jsx("span",{className:"badge",children:e.badge})]}),l.jsxs("div",{className:"card-content",children:[l.jsx("h4",{className:"card-title",children:e.title}),l.jsxs("div",{className:"rating-row",children:[l.jsx("span",{className:"star",children:"*"}),l.jsx("span",{className:"rating-num",children:e.rating.toFixed(1)}),l.jsxs("span",{className:"review-count",children:["(",e.reviewCount.toLocaleString(),")"]})]}),l.jsxs("div",{className:"card-footer",children:[l.jsxs("div",{children:[l.jsxs("div",{className:"price",children:["Rs ",e.price.toFixed(0)]}),e.originalPrice>e.price&&l.jsxs("span",{className:"original-price",children:["Rs ",e.originalPrice.toFixed(0)]})]}),l.jsx("button",{className:"cart-btn",onClick:s,disabled:i||t,children:t?l.jsx(l.Fragment,{children:"Purchased"}):i?l.jsx(l.Fragment,{children:"Added"}):l.jsxs(l.Fragment,{children:[l.jsx("svg",{width:"16",height:"16",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:l.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"})}),"Add"]})})]})]})]})},Pv=({courses:e,loading:t=!1,error:a=null,onCategoryPress:n,onCoursePress:i,onRetry:r})=>{const[s,o]=b.useState("All Courses"),[c,d]=b.useState(""),[p,f]=b.useState(new Set),u=b.useMemo(()=>["All Courses","Development","Design","Marketing","IT & Software","Personal Growth","Business","Photography"],[]),x=b.useMemo(()=>s==="All Courses"?e:e.filter(w=>{var h;return((h=w.category)==null?void 0:h.toLowerCase())===s.toLowerCase()}),[e,s]);b.useEffect(()=>{(async()=>{try{const h=vn();if(!(h!=null&&h.userId)){f(new Set);return}const g=await Ri(String(h.userId));f(new Set(g.map(v=>v.course.id)))}catch(h){console.error("Failed to load enrollments:",h),f(new Set)}})()},[]);const m=w=>{o(w),n==null||n(w)},j=async w=>{var h;if(p.has(w)){d("You already purchased this course."),setTimeout(()=>d(""),3e3);return}try{const g=Qc();await Sg(g,w),d("Course added to cart successfully!"),setTimeout(()=>d(""),3e3)}catch(g){((h=g.response)==null?void 0:h.status)===400?(d("Course is already in your cart!"),setTimeout(()=>d(""),3e3)):(d("Please login to add courses to cart."),setTimeout(()=>d(""),3e3))}};return l.jsxs("section",{className:"page-container",children:[l.jsx("style",{children:Kv}),c&&l.jsx("div",{className:"toast",children:c}),l.jsxs("div",{className:"wrapper",children:[l.jsxs("div",{className:"header-section",children:[l.jsxs("div",{children:[l.jsx("h2",{className:"header-title",children:"Explore Courses"}),l.jsx("p",{className:"header-subtitle",children:"Discover new skills to ignite your potential"})]}),l.jsxs("a",{href:"#",className:"view-all-btn",children:["View All Categories ","->"]})]}),l.jsxs("div",{className:"main-layout",children:[l.jsxs("aside",{className:"sidebar",children:[l.jsx("h3",{className:"sidebar-title",style:{marginTop:0,marginBottom:"20px",fontSize:"1.2rem"},children:"Categories"}),l.jsx("div",{className:"sidebar-list",children:u.map(w=>l.jsxs("div",{className:`category-item ${s===w?"active":""}`,onClick:()=>m(w),children:[l.jsx("span",{children:w}),s===w&&l.jsx("span",{style:{fontSize:"1.2rem"},children:"*"})]},w))})]}),l.jsx("div",{className:"content-area",children:a?l.jsxs("div",{className:"state-card",children:[l.jsx("div",{style:{fontSize:"40px",marginBottom:"16px"},children:"!"}),l.jsx("h3",{style:{color:"#ef4444",margin:"0 0 16px 0"},children:a}),l.jsx("button",{className:"view-all-btn",onClick:r,style:{background:"#ef4444",borderColor:"#ef4444"},children:"Try Again"})]}):t?l.jsxs("div",{className:"state-card",children:[l.jsx("div",{className:"spinner"}),l.jsx("p",{children:"Loading your courses..."})]}):x.length===0?l.jsx("div",{className:"state-card",children:l.jsx("p",{children:"No courses found in this category."})}):l.jsx("div",{className:"course-grid",children:x.map(w=>l.jsx(Jv,{course:w,isPurchased:p.has(w.id),onPress:i,onAddToCart:j},w.id))})})]})]})]})},gf=()=>{const e=Zt(),t=As(),[a,n]=b.useState([]),[i,r]=b.useState(!0),[s,o]=b.useState(null);b.useEffect(()=>void c(),[]),b.useEffect(()=>{if(t.hash==="#explore-courses"){const p=document.getElementById("explore-courses");p&&p.scrollIntoView({behavior:"smooth",block:"start"})}},[t.hash]);const c=async()=>{r(!0),o(null);try{const p=await Ux();n(p)}catch(p){o((p==null?void 0:p.message)??"Failed to load courses"),n([])}finally{r(!1)}},d=async p=>{e(`/course/${p}`)};return l.jsxs(l.Fragment,{children:[l.jsx(wn,{}),l.jsx(Uv,{onExplorePress:()=>e("/#explore-courses"),onWatchDemoPress:()=>e("/#explore-courses")}),l.jsx(qv,{}),l.jsx("div",{id:"explore-courses",children:l.jsx(Pv,{courses:a,loading:i,error:s,onCategoryPress:p=>console.log("category",p),onCoursePress:d,onRetry:c})}),l.jsx(Fv,{onPathPress:p=>console.log("path:",p)}),l.jsx(Gs,{})]})},e4=e=>{if(!e)return 0;const t=e.trim().toLowerCase();if(t.includes(":")){const o=t.split(":").map(Number);if(o.length===2&&o.every(isFinite))return o[0]*60+o[1];if(o.length===3&&o.every(isFinite))return o[0]*3600+o[1]*60+o[2]}const a=t.match(/(\d+)\s*h/),n=t.match(/(\d+)\s*m/),i=t.match(/(\d+)\s*s/),r=(a?+a[1]*3600:0)+(n?+n[1]*60:0)+(i?+i[1]:0);if(r>0)return r;const s=Number(t);return isFinite(s)&&s>0?s*60:0},t4=()=>{var T,O,E,Q,R,I;const{id:e}=by(),t=Zt(),[a,n]=b.useState(null),[i,r]=b.useState(!0),[s,o]=b.useState(null),[c,d]=b.useState(new Set([0])),[p,f]=b.useState(null),[u,x]=b.useState(""),[m,j]=b.useState(!1),[w,h]=b.useState(!1);b.useEffect(()=>{e&&g(e)},[e]);const g=async F=>{var P,L,q;try{r(!0);const U=await Hy(F);n(U);const ae=(q=(L=(P=U.courseSections)==null?void 0:P[0])==null?void 0:L.lectures)==null?void 0:q[0];ae&&(f(ae.videoUrl),x(ae.title));const A=vn();A!=null&&A.userId&&j(await n2(String(A.userId),U.id))}catch(U){o((U==null?void 0:U.message)??"Failed to load course")}finally{r(!1)}},v=F=>{const P=new Set(c);P.has(F)?P.delete(F):P.add(F),d(P)},y=async(F,P,L)=>{f(F),x(P),window.scrollTo({top:0,behavior:"smooth"});try{const q=vn();if(!q||!a)return;const U=e4(L);await Ov(String(q.userId),a.id,U>0?U:void 0),window.dispatchEvent(new CustomEvent("progress-updated"))}catch(q){console.error("Progress update failed",q)}},k=async()=>{if(a)try{h(!0);const F=Os(t);if(m){alert("You already own this course.");return}await Sg(String(F.userId),a.id),t("/cart")}catch(F){console.error(F)}finally{h(!1)}},G=((T=a==null?void 0:a.courseSections)==null?void 0:T.reduce((F,P)=>{var L;return F+(((L=P.lectures)==null?void 0:L.length)??0)},0))??0,C=a?(a.price*.7).toFixed(2):"0";return i?l.jsxs("div",{className:"cdp-loading",children:[l.jsx("span",{className:"cdp-loader"}),l.jsx("p",{children:"Loading course…"}),l.jsx(Lo,{})]}):!a||s?l.jsxs("div",{className:"cdp-error",children:[l.jsx("p",{children:s||"Course not found."}),l.jsx("button",{className:"cdp-error-btn",onClick:()=>t(-1),children:"Go Back"}),l.jsx(Lo,{})]}):l.jsxs("div",{className:"cdp-root",children:[l.jsx(Lo,{}),l.jsx(wn,{}),l.jsxs("section",{className:"cdp-hero",children:[l.jsx("div",{className:"cdp-hero-grid"}),l.jsx("div",{className:"cdp-hero-ring cdp-hero-ring-1"}),l.jsx("div",{className:"cdp-hero-ring cdp-hero-ring-2"}),l.jsx("div",{className:"cdp-container cdp-hero-inner",children:l.jsxs("div",{className:"cdp-hero-body",children:[a.category&&l.jsx("span",{className:"cdp-category-chip",children:a.category}),l.jsx("h1",{className:"cdp-hero-title",children:a.title}),l.jsx("p",{className:"cdp-hero-desc",children:a.description}),l.jsxs("div",{className:"cdp-hero-meta",children:[l.jsxs("span",{className:"cdp-rating-pill",children:[l.jsx(fn,{size:14}),((O=a.rating)==null?void 0:O.toFixed(1))??"—"]}),l.jsx("span",{className:"cdp-meta-sep"}),l.jsxs("span",{className:"cdp-meta-item",children:[l.jsx(jl,{size:14}),((E=a.studentCount)==null?void 0:E.toLocaleString())??"0"," students"]}),l.jsx("span",{className:"cdp-meta-sep"}),l.jsxs("span",{className:"cdp-meta-item",children:[l.jsx(Fe,{size:14}),"Expert Instructor"]})]})]})})]}),l.jsx("main",{className:"cdp-container cdp-main",children:l.jsxs("div",{className:"cdp-grid",children:[l.jsxs("div",{className:"cdp-left",children:[p&&l.jsxs("div",{className:"cdp-video-wrap",children:[l.jsx("iframe",{src:p,title:u||"Course Video",className:"cdp-video",allowFullScreen:!0}),u&&l.jsxs("div",{className:"cdp-video-caption",children:[l.jsx(ln,{size:13}),l.jsx("span",{children:u})]})]}),l.jsxs("div",{className:"cdp-section-header",children:[l.jsx("h2",{className:"cdp-section-title",children:"Course Content"}),l.jsxs("span",{className:"cdp-section-meta",children:[(Q=a.courseSections)==null?void 0:Q.length," sections · ",G," lectures"]})]}),l.jsx("div",{className:"cdp-curriculum",children:(R=a.courseSections)==null?void 0:R.map((F,P)=>{var L,q;return l.jsxs("div",{className:"cdp-acc-item",children:[l.jsxs("button",{className:`cdp-acc-header${c.has(P)?" cdp-acc-header--open":""}`,onClick:()=>v(P),children:[l.jsx("span",{className:"cdp-acc-index",children:String(P+1).padStart(2,"0")}),l.jsx("span",{className:"cdp-acc-label",children:F.title}),l.jsxs("span",{className:"cdp-acc-count",children:[((L=F.lectures)==null?void 0:L.length)??0," lectures"]}),c.has(P)?l.jsx(Yx,{size:15}):l.jsx(ls,{size:15})]}),c.has(P)&&l.jsx("div",{className:"cdp-acc-body",children:(q=F.lectures)==null?void 0:q.map((U,ae)=>{const A=U.videoUrl===p;return l.jsxs("button",{className:`cdp-lec-row${A?" cdp-lec-row--active":""}`,onClick:()=>{U.videoUrl&&y(U.videoUrl,U.title,U.duration)},children:[l.jsx("span",{className:`cdp-lec-icon${A?" cdp-lec-icon--active":""}`,children:l.jsx(ln,{size:11})}),l.jsx("span",{className:"cdp-lec-title",children:U.title}),l.jsx("span",{className:"cdp-lec-dur",children:U.duration||"—"})]},ae)})})]},P)})})]}),l.jsx("aside",{className:"cdp-right",children:l.jsxs("div",{className:"cdp-card",children:[a.imageUrl&&l.jsxs("div",{className:"cdp-card-thumb",children:[l.jsx("img",{src:a.imageUrl,alt:a.title,className:"cdp-card-img"}),l.jsx("div",{className:"cdp-card-thumb-overlay",children:l.jsxs("span",{className:"cdp-preview-btn",children:[l.jsx(ln,{size:18})," Preview"]})})]}),l.jsxs("div",{className:"cdp-card-body",children:[l.jsxs("div",{className:"cdp-price-row",children:[l.jsxs("span",{className:"cdp-price",children:["₹",C]}),l.jsxs("span",{className:"cdp-price-original",children:["₹",(I=a.price)==null?void 0:I.toFixed(2)]}),l.jsx("span",{className:"cdp-discount-chip",children:"30% off"})]}),m?l.jsxs("button",{className:"cdp-btn-primary",onClick:()=>p&&window.scrollTo({top:0,behavior:"smooth"}),children:[l.jsx(ln,{size:16})," Continue Learning"]}):l.jsxs(l.Fragment,{children:[l.jsx("button",{className:`cdp-btn-primary${w?" cdp-btn-primary--loading":""}`,onClick:k,disabled:w,children:w?l.jsxs(l.Fragment,{children:[l.jsx("span",{className:"cdp-spinner"})," Adding…"]}):l.jsxs(l.Fragment,{children:["Add to Cart ",l.jsx(da,{size:15})]})}),l.jsx("button",{className:"cdp-btn-ghost",onClick:()=>t("/auth"),children:"Buy Now"})]}),l.jsxs("p",{className:"cdp-guarantee",children:[l.jsx(_l,{size:14})," 30-day money-back guarantee"]}),l.jsxs("div",{className:"cdp-includes",children:[l.jsx("p",{className:"cdp-includes-title",children:"This course includes:"}),[{icon:l.jsx(ln,{size:14}),text:`${G} on-demand lectures`},{icon:l.jsx(Zy,{size:14}),text:"Downloadable resources"},{icon:l.jsx(Fy,{size:14}),text:"Access on mobile & desktop"},{icon:l.jsx(yr,{size:14}),text:"Full lifetime access"},{icon:l.jsx(st,{size:14}),text:"Certificate of completion"}].map((F,P)=>l.jsxs("div",{className:"cdp-includes-row",children:[l.jsx("span",{className:"cdp-includes-icon",children:F.icon}),l.jsx("span",{className:"cdp-includes-text",children:F.text})]},P))]})]})]})})]})}),l.jsx(Gs,{})]})},Lo=()=>l.jsx("style",{children:`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

    /* ── TOKENS ── */
    :root {
      --cdp-ink:        #0e0f13;
      --cdp-ink-soft:   #3d4154;
      --cdp-ink-muted:  #8b90a8;
      --cdp-surface:    #ffffff;
      --cdp-surface-2:  #f6f6fb;
      --cdp-surface-3:  #eeeef4;
      --cdp-border:     #e3e3ed;
      --cdp-accent:     #1a56db;
      --cdp-accent-s:   #eef2fd;
      --cdp-gold:       #c9a84c;
      --cdp-gold-s:     rgba(201,168,76,.12);
      --cdp-green:      #16a34a;
      --cdp-green-s:    #f0fdf4;
      --cdp-shadow:     0 1px 4px rgba(14,15,19,.06), 0 6px 20px rgba(14,15,19,.07);
      --cdp-shadow-lg:  0 12px 40px rgba(14,15,19,.12), 0 3px 10px rgba(14,15,19,.06);
      --cdp-r-md:       10px;
      --cdp-r-lg:       16px;
      --cdp-r-xl:       24px;
      --cdp-font-d:     'Playfair Display', Georgia, serif;
      --cdp-font-b:     'DM Sans', 'Helvetica Neue', sans-serif;
      --cdp-t:          .2s cubic-bezier(.4,0,.2,1);
    }

    /* ── BASE ── */
    .cdp-root {
      background: var(--cdp-surface-2);
      min-height: 100vh;
      font-family: var(--cdp-font-b);
      -webkit-font-smoothing: antialiased;
    }

    .cdp-loading, .cdp-error {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 14px;
      background: var(--cdp-surface-2);
      font-family: var(--cdp-font-b);
      color: var(--cdp-ink-muted);
      font-size: 14px;
    }

    .cdp-loader {
      display: block;
      width: 36px; height: 36px;
      border: 3px solid var(--cdp-border);
      border-top-color: var(--cdp-gold);
      border-radius: 50%;
      animation: cdp-spin .7s linear infinite;
    }

    .cdp-error-btn {
      padding: 10px 22px;
      background: var(--cdp-ink);
      color: #fff;
      border: none;
      border-radius: var(--cdp-r-md);
      font-family: var(--cdp-font-b);
      font-size: 13.5px;
      font-weight: 600;
      cursor: pointer;
      transition: background var(--cdp-t);
    }
    .cdp-error-btn:hover { background: var(--cdp-ink-soft); }

    @keyframes cdp-spin { to { transform: rotate(360deg); } }

    .cdp-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 28px;
    }

    /* ══════════════════════════════════
       HERO
    ══════════════════════════════════ */
    .cdp-hero {
      position: relative;
      background: var(--cdp-ink);
      padding: 72px 0 80px;
      overflow: hidden;
    }

    .cdp-hero-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
      background-size: 52px 52px;
      pointer-events: none;
    }

    .cdp-hero-ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid rgba(201,168,76,.08);
      pointer-events: none;
    }
    .cdp-hero-ring-1 { width: 480px; height: 480px; bottom: -220px; right: -100px; animation: cdp-spin 90s linear infinite; }
    .cdp-hero-ring-2 { width: 240px; height: 240px; top: -80px; left:  -60px; animation: cdp-spin 70s linear infinite reverse; }

    .cdp-hero-inner {
      position: relative;
      z-index: 1;
      animation: cdp-fade-up .5s ease both;
    }

    @keyframes cdp-fade-up {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .cdp-hero-body { max-width: 680px; }

    .cdp-category-chip {
      display: inline-block;
      padding: 4px 12px;
      background: var(--cdp-gold-s);
      border: 1px solid rgba(201,168,76,.25);
      color: var(--cdp-gold);
      border-radius: 99px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
      margin-bottom: 18px;
    }

    .cdp-hero-title {
      font-family: var(--cdp-font-d);
      font-size: clamp(28px, 4vw, 46px);
      font-weight: 800;
      color: #fff;
      line-height: 1.12;
      letter-spacing: -0.02em;
      margin: 0 0 16px;
    }

    .cdp-hero-desc {
      font-size: 16px;
      line-height: 1.75;
      color: rgba(255,255,255,.6);
      font-weight: 300;
      margin: 0 0 28px;
    }

    .cdp-hero-meta {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }

    .cdp-rating-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 5px 12px;
      background: rgba(201,168,76,.14);
      border: 1px solid rgba(201,168,76,.22);
      color: var(--cdp-gold);
      border-radius: 99px;
      font-size: 13px;
      font-weight: 700;
    }

    .cdp-meta-sep {
      width: 3px; height: 3px;
      border-radius: 50%;
      background: rgba(255,255,255,.2);
    }

    .cdp-meta-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: rgba(255,255,255,.5);
      font-weight: 400;
    }

    /* ══════════════════════════════════
       MAIN LAYOUT
    ══════════════════════════════════ */
    .cdp-main {
      padding-top: 40px;
      padding-bottom: 80px;
    }

    .cdp-grid {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 28px;
      align-items: start;
    }

    /* ══════════════════════════════════
       LEFT COLUMN
    ══════════════════════════════════ */
    .cdp-left {
      display: flex;
      flex-direction: column;
      gap: 28px;
      animation: cdp-fade-up .55s ease both .1s;
    }

    /* Video */
    .cdp-video-wrap {
      border-radius: var(--cdp-r-xl);
      overflow: hidden;
      background: #000;
      box-shadow: var(--cdp-shadow-lg);
      border: 1px solid var(--cdp-border);
    }

    .cdp-video {
      display: block;
      width: 100%;
      aspect-ratio: 16/9;
      border: none;
    }

    .cdp-video-caption {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 18px;
      background: var(--cdp-surface);
      border-top: 1px solid var(--cdp-border);
      font-size: 13px;
      font-weight: 500;
      color: var(--cdp-ink-soft);
    }
    .cdp-video-caption svg { color: var(--cdp-accent); }

    /* Section header */
    .cdp-section-header {
      display: flex;
      align-items: baseline;
      gap: 14px;
    }

    .cdp-section-title {
      font-family: var(--cdp-font-d);
      font-size: 22px;
      font-weight: 700;
      color: var(--cdp-ink);
      margin: 0;
      letter-spacing: -0.01em;
    }

    .cdp-section-meta {
      font-size: 12.5px;
      color: var(--cdp-ink-muted);
      font-weight: 400;
    }

    /* Curriculum */
    .cdp-curriculum {
      background: var(--cdp-surface);
      border: 1px solid var(--cdp-border);
      border-radius: var(--cdp-r-xl);
      box-shadow: var(--cdp-shadow);
      overflow: hidden;
    }

    .cdp-acc-item {
      border-bottom: 1px solid var(--cdp-border);
    }
    .cdp-acc-item:last-child { border-bottom: none; }

    .cdp-acc-header {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 22px;
      background: var(--cdp-surface-2);
      border: none;
      cursor: pointer;
      text-align: left;
      font-family: var(--cdp-font-b);
      transition: background var(--cdp-t);
    }
    .cdp-acc-header:hover { background: var(--cdp-surface-3); }
    .cdp-acc-header--open { background: var(--cdp-surface); }

    .cdp-acc-index {
      font-size: 11px;
      font-weight: 700;
      color: var(--cdp-ink-muted);
      letter-spacing: .04em;
      width: 22px;
      flex-shrink: 0;
    }

    .cdp-acc-label {
      flex: 1;
      font-size: 14px;
      font-weight: 600;
      color: var(--cdp-ink);
    }

    .cdp-acc-count {
      font-size: 11.5px;
      color: var(--cdp-ink-muted);
      font-weight: 400;
      flex-shrink: 0;
    }

    .cdp-acc-header svg { color: var(--cdp-ink-muted); flex-shrink: 0; }

    .cdp-acc-body { background: var(--cdp-surface); }

    /* Lecture row */
    .cdp-lec-row {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 12px 22px 12px 40px;
      border: none;
      border-bottom: 1px solid var(--cdp-border);
      background: transparent;
      cursor: pointer;
      text-align: left;
      font-family: var(--cdp-font-b);
      transition: background var(--cdp-t);
    }
    .cdp-lec-row:last-child { border-bottom: none; }
    .cdp-lec-row:hover { background: var(--cdp-surface-2); }
    .cdp-lec-row--active { background: var(--cdp-accent-s) !important; }

    .cdp-lec-icon {
      width: 22px; height: 22px;
      border-radius: 50%;
      background: var(--cdp-surface-3);
      border: 1px solid var(--cdp-border);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--cdp-ink-muted);
      flex-shrink: 0;
      transition: background var(--cdp-t), color var(--cdp-t);
    }
    .cdp-lec-icon--active { background: var(--cdp-accent); color: #fff; border-color: var(--cdp-accent); }

    .cdp-lec-title {
      flex: 1;
      font-size: 13.5px;
      font-weight: 500;
      color: var(--cdp-ink-soft);
    }
    .cdp-lec-row--active .cdp-lec-title { color: var(--cdp-accent); font-weight: 600; }

    .cdp-lec-dur {
      font-size: 12px;
      color: var(--cdp-ink-muted);
      font-weight: 400;
      flex-shrink: 0;
    }

    /* ══════════════════════════════════
       RIGHT COLUMN — STICKY CARD
    ══════════════════════════════════ */
    .cdp-right {
      position: sticky;
      top: 84px;
      animation: cdp-fade-up .6s ease both .2s;
    }

    .cdp-card {
      background: var(--cdp-surface);
      border: 1px solid var(--cdp-border);
      border-radius: var(--cdp-r-xl);
      box-shadow: var(--cdp-shadow-lg);
      overflow: hidden;
    }

    .cdp-card-thumb {
      position: relative;
      overflow: hidden;
    }

    .cdp-card-img {
      width: 100%;
      aspect-ratio: 16/9;
      object-fit: cover;
      display: block;
    }

    .cdp-card-thumb-overlay {
      position: absolute;
      inset: 0;
      background: rgba(14,15,19,.45);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity var(--cdp-t);
    }
    .cdp-card-thumb:hover .cdp-card-thumb-overlay { opacity: 1; }

    .cdp-preview-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: rgba(255,255,255,.95);
      color: var(--cdp-ink);
      border-radius: var(--cdp-r-md);
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }

    .cdp-card-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    /* Price */
    .cdp-price-row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .cdp-price {
      font-family: var(--cdp-font-d);
      font-size: 32px;
      font-weight: 800;
      color: var(--cdp-ink);
      line-height: 1;
      letter-spacing: -0.02em;
    }

    .cdp-price-original {
      font-size: 15px;
      color: var(--cdp-ink-muted);
      text-decoration: line-through;
      font-weight: 400;
    }

    .cdp-discount-chip {
      padding: 3px 9px;
      background: var(--cdp-green-s);
      color: var(--cdp-green);
      border-radius: 99px;
      font-size: 11.5px;
      font-weight: 700;
      border: 1px solid rgba(22,163,74,.15);
    }

    /* Buttons */
    .cdp-btn-primary {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 14px;
      background: var(--cdp-ink);
      color: #fff;
      border: none;
      border-radius: var(--cdp-r-md);
      font-family: var(--cdp-font-b);
      font-size: 14.5px;
      font-weight: 700;
      cursor: pointer;
      transition: background var(--cdp-t), transform var(--cdp-t), box-shadow var(--cdp-t);
      box-shadow: 0 2px 8px rgba(14,15,19,.18);
      letter-spacing: .01em;
    }
    .cdp-btn-primary:hover:not(:disabled) {
      background: var(--cdp-ink-soft);
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(14,15,19,.2);
    }
    .cdp-btn-primary--loading { opacity: .6; cursor: not-allowed; }

    .cdp-btn-ghost {
      width: 100%;
      padding: 13px;
      background: transparent;
      color: var(--cdp-ink);
      border: 1.5px solid var(--cdp-border);
      border-radius: var(--cdp-r-md);
      font-family: var(--cdp-font-b);
      font-size: 14.5px;
      font-weight: 700;
      cursor: pointer;
      transition: border-color var(--cdp-t), background var(--cdp-t);
    }
    .cdp-btn-ghost:hover { border-color: var(--cdp-ink-soft); background: var(--cdp-surface-2); }

    /* Guarantee */
    .cdp-guarantee {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 12px;
      color: var(--cdp-ink-muted);
      margin: 0;
    }
    .cdp-guarantee svg { color: var(--cdp-green); }

    /* Divider */
    .cdp-card-div {
      height: 1px;
      background: var(--cdp-border);
    }

    /* Includes */
    .cdp-includes { display: flex; flex-direction: column; gap: 8px; }

    .cdp-includes-title {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .06em;
      text-transform: uppercase;
      color: var(--cdp-ink-muted);
      margin: 0 0 4px;
    }

    .cdp-includes-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .cdp-includes-icon {
      width: 26px; height: 26px;
      border-radius: 7px;
      background: var(--cdp-surface-2);
      border: 1px solid var(--cdp-border);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--cdp-ink-muted);
      flex-shrink: 0;
    }

    .cdp-includes-text {
      font-size: 13px;
      color: var(--cdp-ink-soft);
      font-weight: 400;
    }

    /* Spinner */
    .cdp-spinner {
      display: inline-block;
      width: 14px; height: 14px;
      border: 2px solid rgba(255,255,255,.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: cdp-spin .75s linear infinite;
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 960px) {
      .cdp-grid {
        grid-template-columns: 1fr;
      }
      .cdp-right {
        position: static;
        order: -1;
      }
    }

    @media (max-width: 600px) {
      .cdp-container { padding: 0 16px; }
      .cdp-main { padding-top: 28px; padding-bottom: 56px; }
      .cdp-hero { padding: 56px 0 64px; }
      .cdp-card-body { padding: 18px; }
    }
  `}),a4="/LMS/assets/loginimage-CuSabqWB.png",n4=()=>{const e=Zt(),[t,a]=b.useState("login"),[n,i]=b.useState(""),[r,s]=b.useState(""),[o,c]=b.useState(""),[d,p]=b.useState(""),[f,u]=b.useState(""),[x,m]=b.useState(!1),[j,w]=b.useState(!1),[h,g]=b.useState(!1),[v,y]=b.useState(!1);b.useEffect(()=>{const E=localStorage.getItem("user");if(E)try{JSON.parse(E).userId&&e("/")}catch{localStorage.removeItem("user")}},[e]);const k=E=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(E),G=async()=>{if(!n||!r){u("Please enter both email and password");return}if(!k(n)){u("Please enter a valid email address");return}m(!0),u("");try{const E=await fetch(ts("/Auth/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n,password:r})});if(!E.ok)throw new Error(await E.text()||"Login failed");const Q=await E.json();if(!Q.userId||!Q.email)throw new Error("Invalid response from server");e2(Q),e("/")}catch(E){u(E.message||"Login failed. Please check your credentials.")}finally{m(!1)}},C=async()=>{if(!d||!n||!r||!o){u("Please fill in all fields");return}if(!k(n)){u("Please enter a valid email address");return}if(r.length<6){u("Password must be at least 6 characters long");return}if(r!==o){u("Passwords do not match");return}if(!v){u("Please accept the Terms of Service and Privacy Policy");return}m(!0),u("");try{const E=await fetch(ts("/Auth/register"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n,password:r,fullName:d})});if(!E.ok)throw new Error(await E.text()||"Registration failed");a("login"),s(""),c(""),p(""),y(!1),u(""),setTimeout(()=>alert("Registration successful! Please login with your credentials."),100)}catch(E){u(E.message||"Registration failed. Please try again.")}finally{m(!1)}},T=E=>{E.key==="Enter"&&(t==="login"?G():C())},O=E=>{a(E),u(""),i(""),p(""),s(""),c(""),y(!1),w(!1),g(!1)};return l.jsxs("div",{className:"lp-root",children:[l.jsx(wn,{}),l.jsxs("main",{className:"lp-main",children:[l.jsxs("aside",{className:"lp-panel-left",children:[l.jsxs("div",{className:"lp-panel-bg",children:[l.jsx("img",{src:a4,alt:"",className:"lp-bg-img"}),l.jsx("div",{className:"lp-bg-overlay"})]}),l.jsxs("div",{className:"lp-panel-content",children:[l.jsxs("div",{className:"lp-wordmark",children:[l.jsx("span",{className:"lp-wordmark-icon",children:"⚡"}),l.jsx("span",{className:"lp-wordmark-text",children:"Srinu tech Guru"})]}),l.jsxs("div",{className:"lp-hero-text",children:[l.jsx("p",{className:"lp-eyebrow",children:"Online Learning Platform"}),l.jsxs("h1",{className:"lp-headline",children:["Advance your",l.jsx("br",{}),"career with",l.jsx("br",{}),l.jsx("em",{children:"expert-led"}),l.jsx("br",{}),"courses."]}),l.jsx("p",{className:"lp-body",children:"Join thousands of professionals who trust Srinu tech Guru to sharpen their skills and reach the next level."})]}),l.jsxs("div",{className:"lp-stats",children:[l.jsxs("div",{className:"lp-stat",children:[l.jsx("span",{className:"lp-stat-num",children:"50K+"}),l.jsx("span",{className:"lp-stat-lbl",children:"Active Students"})]}),l.jsx("div",{className:"lp-stat-rule"}),l.jsxs("div",{className:"lp-stat",children:[l.jsx("span",{className:"lp-stat-num",children:"1,000+"}),l.jsx("span",{className:"lp-stat-lbl",children:"Online Courses"})]}),l.jsx("div",{className:"lp-stat-rule"}),l.jsxs("div",{className:"lp-stat",children:[l.jsx("span",{className:"lp-stat-num",children:"4.8★"}),l.jsx("span",{className:"lp-stat-lbl",children:"Avg. Rating"})]})]}),l.jsx("div",{className:"lp-geo lp-geo--circle"}),l.jsx("div",{className:"lp-geo lp-geo--ring"})]})]}),l.jsx("section",{className:"lp-panel-right",children:l.jsxs("div",{className:"lp-form-container",children:[l.jsxs("div",{className:"lp-form-header",children:[l.jsx("h2",{className:"lp-form-title",children:t==="login"?"Welcome":"Get started"}),l.jsx("p",{className:"lp-form-subtitle",children:t==="login"?"Sign in to continue your learning journey.":"Create your account and start learning today."})]}),l.jsxs("div",{className:"lp-tabs",role:"tablist",children:[l.jsx("button",{role:"tab","aria-selected":t==="login",className:`lp-tab ${t==="login"?"lp-tab--active":""}`,onClick:()=>O("login"),children:"Sign In"}),l.jsx("button",{role:"tab","aria-selected":t==="signup",className:`lp-tab ${t==="signup"?"lp-tab--active":""}`,onClick:()=>O("signup"),children:"Register"}),l.jsx("div",{className:`lp-tab-indicator ${t==="signup"?"lp-tab-indicator--right":""}`})]}),f&&l.jsxs("div",{className:"lp-error",role:"alert",children:[l.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:[l.jsx("circle",{cx:"8",cy:"8",r:"7.5",stroke:"currentColor"}),l.jsx("path",{d:"M8 4.5v4M8 10.5v1",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),f]}),t==="login"?l.jsxs("form",{className:"lp-form",onSubmit:E=>{E.preventDefault(),G()},children:[l.jsxs("div",{className:"lp-field",children:[l.jsx("label",{className:"lp-label",children:"Email address"}),l.jsxs("div",{className:"lp-input-wrap",children:[l.jsx(Fa,{className:"lp-input-icon",size:18}),l.jsx("input",{type:"email",placeholder:"you@example.com",value:n,onChange:E=>i(E.target.value),onKeyPress:T,className:"lp-input",disabled:x,autoComplete:"email"})]})]}),l.jsxs("div",{className:"lp-field",children:[l.jsxs("div",{className:"lp-label-row",children:[l.jsx("label",{className:"lp-label",children:"Password"}),l.jsx("a",{href:"#",className:"lp-forgot",children:"Forgot password?"})]}),l.jsxs("div",{className:"lp-input-wrap",children:[l.jsx(yr,{className:"lp-input-icon",size:18}),l.jsx("input",{type:j?"text":"password",placeholder:"Enter your password",value:r,onChange:E=>s(E.target.value),onKeyPress:T,className:"lp-input",disabled:x,autoComplete:"current-password"}),l.jsx("button",{type:"button",className:"lp-eye",onClick:()=>w(!j),tabIndex:-1,"aria-label":j?"Hide password":"Show password",children:j?l.jsx(To,{size:18}):l.jsx(ei,{size:18})})]})]}),l.jsx("button",{type:"submit",disabled:x,className:"lp-btn-primary",children:x?l.jsxs(l.Fragment,{children:[l.jsx("span",{className:"lp-spinner"})," Signing in…"]}):"Sign In"}),l.jsxs("p",{className:"lp-switch-hint",children:["Don't have an account?"," ",l.jsx("button",{type:"button",className:"lp-switch-link",onClick:()=>O("signup"),children:"Create one"})]})]}):l.jsxs("form",{className:"lp-form",onSubmit:E=>{E.preventDefault(),C()},children:[l.jsxs("div",{className:"lp-field",children:[l.jsx("label",{className:"lp-label",children:"Full name"}),l.jsxs("div",{className:"lp-input-wrap",children:[l.jsx(Pd,{className:"lp-input-icon",size:18}),l.jsx("input",{type:"text",placeholder:"John Doe",value:d,onChange:E=>p(E.target.value),onKeyPress:T,className:"lp-input",disabled:x,autoComplete:"name"})]})]}),l.jsxs("div",{className:"lp-field",children:[l.jsx("label",{className:"lp-label",children:"Email address"}),l.jsxs("div",{className:"lp-input-wrap",children:[l.jsx(Fa,{className:"lp-input-icon",size:18}),l.jsx("input",{type:"email",placeholder:"you@example.com",value:n,onChange:E=>i(E.target.value),onKeyPress:T,className:"lp-input",disabled:x,autoComplete:"email"})]})]}),l.jsxs("div",{className:"lp-field-row",children:[l.jsxs("div",{className:"lp-field",children:[l.jsx("label",{className:"lp-label",children:"Password"}),l.jsxs("div",{className:"lp-input-wrap",children:[l.jsx(yr,{className:"lp-input-icon",size:18}),l.jsx("input",{type:j?"text":"password",placeholder:"Create password",value:r,onChange:E=>s(E.target.value),onKeyPress:T,className:"lp-input",disabled:x,autoComplete:"new-password"}),l.jsx("button",{type:"button",className:"lp-eye",onClick:()=>w(!j),tabIndex:-1,children:j?l.jsx(To,{size:18}):l.jsx(ei,{size:18})})]})]}),l.jsxs("div",{className:"lp-field",children:[l.jsx("label",{className:"lp-label",children:"Confirm password"}),l.jsxs("div",{className:"lp-input-wrap",children:[l.jsx(yr,{className:"lp-input-icon",size:18}),l.jsx("input",{type:h?"text":"password",placeholder:"Repeat password",value:o,onChange:E=>c(E.target.value),onKeyPress:T,className:"lp-input",disabled:x,autoComplete:"new-password"}),l.jsx("button",{type:"button",className:"lp-eye",onClick:()=>g(!h),tabIndex:-1,children:h?l.jsx(To,{size:18}):l.jsx(ei,{size:18})})]})]})]}),r.length>0&&l.jsxs("div",{className:"lp-strength",children:[l.jsx("div",{className:`lp-strength-bar ${r.length>=10?"lp-strength--strong":r.length>=6?"lp-strength--medium":"lp-strength--weak"}`}),l.jsx("span",{className:"lp-strength-label",children:r.length>=10?"Strong":r.length>=6?"Fair":"Too short"})]}),l.jsx("div",{className:"lp-terms",children:l.jsxs("label",{className:"lp-checkbox-label",children:[l.jsx("input",{type:"checkbox",checked:v,onChange:E=>y(E.target.checked),className:"lp-checkbox",disabled:x}),l.jsx("span",{className:"lp-checkbox-custom","aria-hidden":"true",children:v&&l.jsx("svg",{width:"10",height:"8",viewBox:"0 0 10 8",fill:"none",children:l.jsx("path",{d:"M1 4l3 3 5-6",stroke:"white",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})}),l.jsxs("span",{className:"lp-terms-text",children:["I agree to the ",l.jsx("a",{href:"#",className:"lp-terms-link",children:"Terms of Service"})," and"," ",l.jsx("a",{href:"#",className:"lp-terms-link",children:"Privacy Policy"})]})]})}),l.jsx("button",{type:"submit",disabled:x,className:"lp-btn-primary",children:x?l.jsxs(l.Fragment,{children:[l.jsx("span",{className:"lp-spinner"})," Creating account…"]}):"Create Account"}),l.jsxs("p",{className:"lp-switch-hint",children:["Already have an account?"," ",l.jsx("button",{type:"button",className:"lp-switch-link",onClick:()=>O("login"),children:"Sign in"})]})]}),l.jsx("p",{className:"lp-footer-note",children:"Protected by enterprise-grade encryption. Your data is safe with us."})]})})]}),l.jsx("style",{children:`
        /* ════════════════════════════════════════════
           DESIGN TOKENS
        ════════════════════════════════════════════ */
        :root {
          --ink:        #0e0f13;
          --ink-soft:   #4a4d5a;
          --ink-muted:  #8b8fa8;
          --surface:    #ffffff;
          --surface-2:  #f7f7fb;
          --surface-3:  #ededf5;
          --border:     #e2e2ee;
          --border-focus: #2e5be8;
          --accent:     #2e5be8;
          --accent-dark: #1d3fbd;
          --accent-light: #eef2fd;
          --gold:       #c9a84c;
          --gold-light: #fdf6e3;
          --error:      #c0392b;
          --error-bg:   #fef4f3;
          --success:    #1e7e5a;
          --radius-sm:  6px;
          --radius-md:  10px;
          --radius-lg:  16px;
          --radius-xl:  24px;
          --shadow-sm:  0 1px 3px rgba(14,15,19,.06), 0 1px 2px rgba(14,15,19,.04);
          --shadow-md:  0 4px 16px rgba(14,15,19,.10), 0 1px 4px rgba(14,15,19,.06);
          --shadow-lg:  0 20px 48px rgba(14,15,19,.18), 0 4px 16px rgba(14,15,19,.08);
          --font-display: 'Playfair Display', Georgia, serif;
          --font-body:    'DM Sans', 'Helvetica Neue', sans-serif;
          --transition:   0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        html, body, #root {
          margin: 0;
          padding: 0;
        }

        /* ════════════════════════════════════════════
           LAYOUT ROOT
        ════════════════════════════════════════════ */
        .lp-root {
          min-height: 100vh;
          background: var(--ink);
          font-family: var(--font-body);
          -webkit-font-smoothing: antialiased;
        }

        .lp-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 64px); /* adjust to header height */
        }

        /* ════════════════════════════════════════════
           LEFT PANEL
        ════════════════════════════════════════════ */
        .lp-panel-left {
          position: relative;
          overflow: hidden;
          background: var(--ink);
        }

        .lp-panel-bg {
          position: absolute;
          inset: 0;
        }

        .lp-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.18;
          filter: grayscale(40%) contrast(1.1);
        }

        .lp-bg-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(145deg, rgba(14,15,19,0.82) 0%, rgba(14,15,19,0.55) 60%, rgba(46,91,232,0.25) 100%);
        }

        /* Decorative geometric shapes */
        .lp-geo {
          position: absolute;
          pointer-events: none;
        }

        .lp-geo--circle {
          width: 380px;
          height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(46,91,232,0.14) 0%, transparent 70%);
          bottom: -80px;
          right: -80px;
        }

        .lp-geo--ring {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.2);
          top: 80px;
          right: 40px;
          animation: lp-spin 40s linear infinite;
        }

        @keyframes lp-spin {
          to { transform: rotate(360deg); }
        }

        .lp-panel-content {
          position: relative;
          z-index: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 52px 56px;
        }

        /* Wordmark */
        .lp-wordmark {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .lp-wordmark-icon {
          font-size: 20px;
          filter: drop-shadow(0 0 8px rgba(201,168,76,0.6));
        }

        .lp-wordmark-text {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.01em;
        }

        /* Hero text */
        .lp-hero-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 0 40px;
        }

        .lp-eyebrow {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 20px;
        }

        .lp-headline {
          font-family: var(--font-display);
          font-size: clamp(36px, 3.8vw, 54px);
          font-weight: 800;
          line-height: 1.12;
          color: #ffffff;
          margin: 0 0 28px;
        }

        .lp-headline em {
          font-style: italic;
          color: var(--gold);
        }

        .lp-body {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(255,255,255,0.62);
          max-width: 360px;
          font-weight: 300;
        }

        /* Stats */
        .lp-stats {
          display: flex;
          align-items: center;
          gap: 32px;
          padding-top: 8px;
        }

        .lp-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .lp-stat-num {
          font-size: 22px;
          font-weight: 700;
          color: #ffffff;
          font-family: var(--font-display);
          letter-spacing: -0.02em;
        }

        .lp-stat-lbl {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.44);
        }

        .lp-stat-rule {
          width: 1px;
          height: 36px;
          background: rgba(255,255,255,0.14);
        }

        /* ════════════════════════════════════════════
           RIGHT PANEL
        ════════════════════════════════════════════ */
        .lp-panel-right {
          background: var(--surface);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 56px 40px;
          overflow-y: auto;
        }

        .lp-form-container {
          width: 100%;
          max-width: 440px;
          animation: lp-fade-up 0.5s ease both;
        }

        @keyframes lp-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Form header */
        .lp-form-header {
          margin-bottom: 36px;
        }

        .lp-form-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 3vw, 36px);
          font-weight: 800;
          color: var(--ink);
          margin: 0 0 8px;
          line-height: 1.1;
        }

        .lp-form-subtitle {
          font-size: 14.5px;
          color: var(--ink-muted);
          font-weight: 400;
          margin: 0;
          line-height: 1.5;
        }

        /* ── TABS ── */
        .lp-tabs {
          position: relative;
          display: flex;
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 4px;
          margin-bottom: 32px;
          overflow: hidden;
        }

        .lp-tab-indicator {
          position: absolute;
          top: 4px;
          left: 4px;
          width: calc(50% - 4px);
          bottom: 4px;
          background: var(--surface);
          border-radius: 7px;
          box-shadow: var(--shadow-sm);
          transition: transform var(--transition);
          border: 1px solid var(--border);
        }

        .lp-tab-indicator--right {
          transform: translateX(calc(100% + 0px));
        }

        .lp-tab {
          position: relative;
          z-index: 1;
          flex: 1;
          padding: 10px 0;
          border: none;
          background: transparent;
          font-family: var(--font-body);
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 7px;
          transition: color var(--transition);
          color: var(--ink-muted);
          letter-spacing: 0.01em;
        }

        .lp-tab--active {
          color: var(--ink);
        }

        /* ── ERROR ── */
        .lp-error {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--error-bg);
          border: 1px solid rgba(192,57,43,0.2);
          color: var(--error);
          padding: 12px 14px;
          border-radius: var(--radius-md);
          font-size: 13.5px;
          font-weight: 500;
          margin-bottom: 20px;
          animation: lp-shake 0.3s ease;
        }

        @keyframes lp-shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-4px); }
          60%       { transform: translateX(4px); }
        }

        /* ── FORM LAYOUT ── */
        .lp-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .lp-field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .lp-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .lp-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .lp-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: 0.01em;
        }

        .lp-forgot {
          font-size: 12.5px;
          color: var(--accent);
          text-decoration: none;
          font-weight: 500;
          transition: color var(--transition);
        }

        .lp-forgot:hover { color: var(--accent-dark); }

        /* ── INPUT ── */
        .lp-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .lp-input-icon {
          position: absolute;
          left: 14px;
          color: var(--ink-muted);
          pointer-events: none;
          flex-shrink: 0;
        }

        .lp-input {
          width: 100%;
          padding: 11px 14px 11px 42px;
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: var(--radius-md);
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 400;
          color: var(--ink);
          outline: none;
          transition:
            border-color var(--transition),
            box-shadow var(--transition),
            background var(--transition);
          -webkit-appearance: none;
        }

        .lp-input::placeholder {
          color: var(--ink-muted);
          font-weight: 400;
        }

        .lp-input:focus {
          border-color: var(--border-focus);
          box-shadow: 0 0 0 3.5px rgba(46,91,232,0.10);
          background: var(--surface);
        }

        .lp-input:disabled {
          background: var(--surface-2);
          cursor: not-allowed;
          color: var(--ink-muted);
        }

        .lp-eye {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--ink-muted);
          display: flex;
          align-items: center;
          padding: 4px;
          border-radius: 4px;
          transition: color var(--transition), background var(--transition);
        }

        .lp-eye:hover {
          color: var(--ink);
          background: var(--surface-3);
        }

        /* ── PASSWORD STRENGTH ── */
        .lp-strength {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: -6px;
        }

        .lp-strength-bar {
          height: 3px;
          flex: 1;
          border-radius: 99px;
          background: var(--surface-3);
          position: relative;
          overflow: hidden;
        }

        .lp-strength-bar::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 99px;
          transition: width 0.4s ease, background 0.4s ease;
        }

        .lp-strength--weak::after   { width: 28%; background: #e74c3c; }
        .lp-strength--medium::after { width: 62%; background: #f39c12; }
        .lp-strength--strong::after { width: 100%; background: var(--success); }

        .lp-strength-label {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.04em;
          min-width: 44px;
          color: var(--ink-muted);
        }

        /* ── TERMS ── */
        .lp-terms { margin-top: -4px; }

        .lp-checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          cursor: pointer;
          user-select: none;
        }

        .lp-checkbox {
          position: absolute;
          opacity: 0;
          pointer-events: none;
          width: 0; height: 0;
        }

        .lp-checkbox-custom {
          flex-shrink: 0;
          width: 17px;
          height: 17px;
          border-radius: 5px;
          border: 1.5px solid var(--border);
          background: var(--surface);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1px;
          transition: border-color var(--transition), background var(--transition);
        }

        .lp-checkbox:checked + .lp-checkbox-custom {
          background: var(--accent);
          border-color: var(--accent);
        }

        .lp-terms-text {
          font-size: 13px;
          color: var(--ink-muted);
          line-height: 1.55;
        }

        .lp-terms-link {
          color: var(--accent);
          text-decoration: none;
          font-weight: 500;
          transition: color var(--transition);
        }

        .lp-terms-link:hover { color: var(--accent-dark); text-decoration: underline; }

        /* ── PRIMARY BUTTON ── */
        .lp-btn-primary {
          width: 100%;
          padding: 13px 20px;
          background: var(--ink);
          color: #ffffff;
          border: none;
          border-radius: var(--radius-md);
          font-family: var(--font-body);
          font-size: 14.5px;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 4px;
          position: relative;
          overflow: hidden;
          transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
          box-shadow: 0 1px 3px rgba(14,15,19,0.20), 0 4px 12px rgba(14,15,19,0.12);
        }

        .lp-btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent, rgba(255,255,255,0.06));
          pointer-events: none;
        }

        .lp-btn-primary:hover:not(:disabled) {
          background: #1a1c24;
          transform: translateY(-1px);
          box-shadow: 0 3px 8px rgba(14,15,19,0.22), 0 8px 24px rgba(14,15,19,0.16);
        }

        .lp-btn-primary:active:not(:disabled) {
          transform: translateY(0);
        }

        .lp-btn-primary:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        /* ── SPINNER ── */
        .lp-spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: lp-rotate 0.75s linear infinite;
        }

        @keyframes lp-rotate { to { transform: rotate(360deg); } }

        /* ── SWITCH HINT ── */
        .lp-switch-hint {
          text-align: center;
          font-size: 13px;
          color: var(--ink-muted);
          margin: 0;
        }

        .lp-switch-link {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: var(--accent);
          font-size: inherit;
          font-weight: 600;
          font-family: inherit;
          transition: color var(--transition);
        }

        .lp-switch-link:hover { color: var(--accent-dark); }

        /* ── FOOTER NOTE ── */
        .lp-footer-note {
          margin-top: 28px;
          text-align: center;
          font-size: 11.5px;
          color: var(--ink-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          opacity: 0.7;
        }

        .lp-footer-note::before {
          content: '🔒';
          font-size: 11px;
        }

        /* ════════════════════════════════════════════
           RESPONSIVE
        ════════════════════════════════════════════ */
        @media (max-width: 960px) {
          .lp-main {
            grid-template-columns: 1fr;
          }

          .lp-panel-left {
            min-height: 340px;
          }

          .lp-panel-content {
            padding: 36px 36px;
          }

          .lp-hero-text {
            padding: 32px 0 24px;
          }
        }

        @media (max-width: 600px) {
          .lp-panel-left {
            min-height: 260px;
          }

          .lp-panel-content {
            padding: 28px 24px;
          }

          .lp-panel-right {
            padding: 36px 20px;
          }

          .lp-form-container {
            max-width: 100%;
          }

          .lp-field-row {
            grid-template-columns: 1fr;
          }

          .lp-stats {
            gap: 20px;
          }
        }
      `})]})},l4=e=>xe.post(Fx.CREATE_ORDER,e),i4=e=>xe.post(Fx.VERIFY,e),r4=()=>{const e=Zt(),[t,a]=b.useState([]),[n,i]=b.useState(!0),[r,s]=b.useState(!1),[o,c]=b.useState(""),[d,p]=b.useState("");b.useEffect(()=>{const j=document.createElement("script");return j.src="https://checkout.razorpay.com/v1/checkout.js",j.async=!0,j.onload=()=>s(!0),j.onerror=()=>c("Payment system unavailable. Please refresh."),document.body.appendChild(j),()=>{document.body.removeChild(j)}},[]);const f=async()=>{try{i(!0);const j=Qc(),w=await wg(j);a(w.data||[])}catch{c("Failed to load cart")}finally{i(!1)}};b.useEffect(()=>{f()},[]);const u=async j=>{try{await pf(j),a(t.filter(w=>w.id!==j)),p("Item removed"),setTimeout(()=>p(""),2e3)}catch{c("Failed to remove item")}},x=t.reduce((j,w)=>{var h;return j+(((h=w.course)==null?void 0:h.price)??0)},0),m=async()=>{if(t.length!==0)try{c("");const j=t[0],w=Qc(),h=await l4({userId:w,courseId:j.course.id,amount:j.course.price}),{orderId:g,key:v}=h.data,y={key:v,amount:j.course.price*100,currency:"INR",name:"Srinu tech Guru LMS",description:`Enrollment: ${j.course.title}`,order_id:g,handler:async G=>{try{await i4({userId:w,courseId:j.course.id,amount:j.course.price,razorpayPaymentId:G.razorpay_payment_id,razorpayOrderId:G.razorpay_order_id,razorpaySignature:G.razorpay_signature}),await pf(j.id),p("Payment Successful! Redirecting..."),setTimeout(()=>e(`/course/${j.course.id}`),2e3)}catch{c("Payment verification failed")}},theme:{color:"#6366f1"}};new window.Razorpay(y).open()}catch{c("Checkout initialization failed")}};return l.jsx("div",{style:de.pageContainer,children:l.jsxs("div",{style:de.contentWrapper,children:[l.jsxs("header",{style:de.header,children:[l.jsx("h1",{style:de.mainTitle,children:"Shopping Cart"}),l.jsxs("p",{style:de.countText,children:[t.length," Courses in Cart"]})]}),d&&l.jsxs("div",{style:de.successAlert,children:[l.jsx(Yc,{})," ",d]}),o&&l.jsxs("div",{style:de.errorAlert,children:[l.jsx(et,{})," ",o]}),l.jsxs("div",{style:de.mainGrid,children:[l.jsx("section",{style:de.itemsSection,children:n?l.jsx("div",{style:de.skeletonBox,children:"Loading items..."}):t.length===0?l.jsxs("div",{style:de.emptyState,children:[l.jsx(Qx,{size:60,color:"#cbd5e1"}),l.jsx("h2",{children:"Your cart is empty"}),l.jsx("p",{children:"Looks like you haven't added any courses yet."}),l.jsx("button",{style:de.primaryBtn,onClick:()=>e("/courses"),children:"Browse Courses"})]}):t.map(j=>{var w,h,g;return l.jsxs("div",{style:de.cartCard,children:[l.jsx("img",{src:(w=j.course)==null?void 0:w.imageUrl,alt:"",style:de.courseImg}),l.jsxs("div",{style:de.itemDetails,children:[l.jsx("h3",{style:de.courseTitle,children:(h=j.course)==null?void 0:h.title}),l.jsx("p",{style:de.instructor,children:"By Srinu tech Guru Instructor"})]}),l.jsxs("div",{style:de.priceSection,children:[l.jsxs("span",{style:de.priceTag,children:["₹",(g=j.course)==null?void 0:g.price]}),l.jsx("button",{style:de.removeBtn,onClick:()=>u(j.id),children:l.jsx($e,{})})]})]},j.id)})}),l.jsx("aside",{style:de.sidebar,children:l.jsxs("div",{style:de.summaryCard,children:[l.jsx("h3",{style:de.summaryTitle,children:"Order Summary"}),l.jsxs("div",{style:de.summaryRow,children:[l.jsx("span",{children:"Subtotal"}),l.jsxs("span",{children:["₹",x.toFixed(2)]})]}),l.jsxs("div",{style:de.summaryRow,children:[l.jsx("span",{children:"Tax (GST)"}),l.jsx("span",{children:"₹0.00"})]}),l.jsx("hr",{style:de.divider}),l.jsxs("div",{style:de.totalRow,children:[l.jsx("span",{children:"Total:"}),l.jsxs("span",{children:["₹",x.toFixed(2)]})]}),l.jsxs("button",{style:{...de.checkoutBtn,opacity:!r||t.length===0?.6:1},onClick:m,disabled:!r||t.length===0,children:[l.jsx(Ix,{})," Checkout Now"]}),l.jsx("p",{style:de.secureText,children:"🔒 Secure Checkout via Razorpay"})]})})]})]})})},de={pageContainer:{backgroundColor:"#f8fafc",minHeight:"100vh",padding:"40px 20px"},contentWrapper:{maxWidth:"1200px",margin:"0 auto"},header:{marginBottom:"32px"},mainTitle:{fontSize:"2.5rem",fontWeight:800,color:"#1e293b",margin:0},countText:{color:"#64748b",marginTop:"4px"},mainGrid:{display:"grid",gridTemplateColumns:"1fr 350px",gap:"32px",alignItems:"start"},itemsSection:{display:"flex",flexDirection:"column",gap:"16px"},cartCard:{display:"flex",backgroundColor:"#fff",borderRadius:"16px",padding:"16px",boxShadow:"0 4px 6px -1px rgb(0 0 0 / 0.1)",alignItems:"center",gap:"20px"},courseImg:{width:"140px",height:"90px",borderRadius:"12px",objectFit:"cover"},itemDetails:{flex:1},courseTitle:{margin:"0 0 4px 0",fontSize:"1.1rem",color:"#1e293b"},instructor:{color:"#64748b",fontSize:"0.9rem",margin:0},priceSection:{textAlign:"right",display:"flex",flexDirection:"column",gap:"12px"},priceTag:{fontSize:"1.25rem",fontWeight:700,color:"#1e293b"},removeBtn:{background:"#fee2e2",color:"#ef4444",border:"none",padding:"8px",borderRadius:"8px",cursor:"pointer",fontSize:"1.2rem",transition:"0.2s"},summaryCard:{backgroundColor:"#fff",borderRadius:"20px",padding:"24px",boxShadow:"0 10px 15px -3px rgb(0 0 0 / 0.1)",position:"sticky",top:"20px"},summaryTitle:{marginTop:0,marginBottom:"20px",fontSize:"1.25rem"},summaryRow:{display:"flex",justifyContent:"space-between",marginBottom:"12px",color:"#64748b"},divider:{border:"none",borderTop:"1px solid #e2e8f0",margin:"16px 0"},totalRow:{display:"flex",justifyContent:"space-between",fontWeight:800,fontSize:"1.5rem",color:"#1e293b",marginBottom:"24px"},checkoutBtn:{width:"100%",padding:"16px",borderRadius:"12px",border:"none",backgroundColor:"#4f46e5",color:"#fff",fontWeight:700,fontSize:"1rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px"},secureText:{textAlign:"center",fontSize:"0.8rem",color:"#94a3b8",marginTop:"12px"},successAlert:{backgroundColor:"#dcfce7",color:"#166534",padding:"16px",borderRadius:"12px",marginBottom:"20px",display:"flex",alignItems:"center",gap:"10px"},errorAlert:{backgroundColor:"#fee2e2",color:"#991b1b",padding:"16px",borderRadius:"12px",marginBottom:"20px",display:"flex",alignItems:"center",gap:"10px"},emptyState:{textAlign:"center",padding:"60px",backgroundColor:"#fff",borderRadius:"20px"},primaryBtn:{marginTop:"20px",padding:"12px 24px",borderRadius:"8px",border:"none",backgroundColor:"#4f46e5",color:"#fff",fontWeight:600,cursor:"pointer"}};async function Ys(e){const t=e.headers.get("content-type")||"",a=await e.text();if(t.includes("application/json"))try{return JSON.parse(a)}catch{return{message:a}}return{message:a}}function Is(e){return e instanceof TypeError?`Cannot connect to API server at ${Rs}. Please start backend and try again.`:e instanceof Error&&e.message?e.message:"Network request failed"}async function s4(e){let t;try{t=await fetch(Ds.GET_PROFILE(e))}catch(n){throw new Error(Is(n))}const a=await Ys(t);if(!t.ok)throw new Error(a.message||"Failed to fetch profile");return a}async function o4(e,t){let a;try{a=await fetch(Ds.UPDATE_PROFILE(e),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}catch(i){throw new Error(Is(i))}const n=await Ys(a);if(!a.ok)throw new Error(n.message||"Failed to update profile");return n}async function c4(e,t){const a=new FormData;a.append("profileImage",t);let n;try{n=await fetch(Ds.UPLOAD_PHOTO(e),{method:"POST",body:a})}catch(r){throw new Error(Is(r))}const i=await Ys(n);if(!n.ok)throw new Error(i.message||"Failed to upload photo");return i}async function d4(e){let t;try{t=await fetch(Ds.DELETE_PHOTO(e),{method:"DELETE"})}catch(n){throw new Error(Is(n))}const a=await Ys(t);if(!t.ok)throw new Error(a.message||"Failed to delete photo");return a}function Uo(e){return V({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"},child:[]}]})(e)}function Ho(e){return V({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"},child:[]}]})(e)}const _o=(e,t)=>{const a=(e==null?void 0:e.message)||"";return a.toLowerCase().includes("failed to fetch")?`Unable to connect to server. Please make sure API is running on ${Rs}.`:a||t},tr=({icon:e,label:t,children:a})=>l.jsxs("div",{className:"pp-info-row",children:[l.jsx("span",{className:"pp-info-row-icon",children:e}),l.jsxs("div",{className:"pp-info-row-body",children:[l.jsx("span",{className:"pp-info-row-label",children:t}),l.jsx("span",{className:"pp-info-row-value",children:a})]})]}),ar=({label:e,editing:t,value:a,placeholder:n,type:i="text",onChange:r,href:s})=>l.jsxs("div",{className:"pp-field-card",children:[l.jsx("p",{className:"pp-field-label",children:e}),t?l.jsx("input",{type:i,value:a,onChange:o=>r(o.target.value),placeholder:n,className:"pp-field-input"}):s&&a?l.jsx("a",{href:s,target:"_blank",rel:"noopener noreferrer",className:"pp-field-link",children:a}):l.jsx("p",{className:"pp-field-value",children:a||l.jsx("span",{className:"pp-field-empty",children:"Not provided"})})]}),u4=()=>{const e=Zt(),[t,a]=b.useState(null),[n,i]=b.useState(!0),[r,s]=b.useState(!1),[o,c]=b.useState(!1),[d,p]=b.useState(!1),[f,u]=b.useState(""),[x,m]=b.useState(""),j=b.useRef(null),[w,h]=b.useState({fullName:"",bio:"",phone:"",location:"",website:"",linkedIn:"",twitter:""}),g=O=>E=>h(Q=>({...Q,[O]:E}));b.useEffect(()=>{v()},[]);const v=async()=>{try{i(!0),u(""),Os(e);const O=Pi(),E=await s4(O);a(E),h({fullName:E.fullName||"",bio:E.bio||"",phone:E.phone||"",location:E.location||"",website:E.website||"",linkedIn:E.linkedIn||"",twitter:E.twitter||""})}catch(O){if(O.message==="Authentication required")return;u(O.message||"Failed to load profile")}finally{i(!1)}},y=async()=>{if(!w.fullName.trim()){u("Full name is required");return}try{c(!0),u(""),m(""),await o4(Pi(),w),m("Profile updated successfully."),s(!1),await v(),setTimeout(()=>m(""),4e3)}catch(O){u(_o(O,"Failed to update profile"))}finally{c(!1)}},k=async O=>{var Q;const E=(Q=O.target.files)==null?void 0:Q[0];if(E){if(E.size>5*1024*1024){u("File size must be less than 5 MB");return}if(!E.type.startsWith("image/")){u("Please upload an image file");return}try{p(!0),u(""),await c4(Pi(),E),m("Profile photo updated."),await v(),setTimeout(()=>m(""),4e3)}catch(R){u(_o(R,"Failed to upload photo"))}finally{p(!1),j.current&&(j.current.value="")}}},G=async()=>{if(window.confirm("Delete your profile photo?"))try{u(""),await d4(Pi()),m("Profile photo removed."),await v(),setTimeout(()=>m(""),4e3)}catch(O){u(_o(O,"Failed to delete photo"))}};if(n)return l.jsxs("div",{className:"pp-loading",children:[l.jsx("span",{className:"pp-loader"}),l.jsx("p",{className:"pp-loading-label",children:"Loading profile…"})]});if(!t)return l.jsxs("div",{className:"pp-loading",children:[l.jsx("p",{className:"pp-empty-err",children:"Failed to load profile."}),l.jsx("button",{className:"pp-retry-btn",onClick:v,children:"Retry"})]});const C=t.fullName.split(" ").map(O=>O[0]).slice(0,2).join("").toUpperCase(),T=new Date(t.createdAt).toLocaleDateString("en-US",{year:"numeric",month:"long"});return l.jsxs("div",{className:"pp-root",children:[x&&l.jsxs("div",{className:"pp-toast pp-toast--success",children:[l.jsx(Yc,{size:15}),x]}),f&&l.jsxs("div",{className:"pp-toast pp-toast--error",children:[l.jsx(et,{size:15}),f]}),l.jsxs("div",{className:"pp-layout",children:[l.jsxs("aside",{className:"pp-sidebar",children:[l.jsxs("div",{className:"pp-avatar-block",children:[l.jsxs("div",{className:"pp-avatar-wrap",children:[l.jsx("div",{className:"pp-avatar",children:t.profileImageUrl?l.jsx("img",{src:`${Rs}${t.profileImageUrl}`,alt:t.fullName,className:"pp-avatar-img"}):l.jsx("span",{className:"pp-avatar-initials",children:C})}),l.jsx("button",{className:"pp-camera-btn",onClick:()=>{var O;return(O=j.current)==null?void 0:O.click()},disabled:d||o,title:"Change photo",children:d?l.jsx("span",{className:"pp-mini-spinner"}):l.jsx(Wy,{size:14})}),l.jsx("input",{ref:j,type:"file",accept:"image/*",onChange:k,className:"pp-hidden-input"})]}),r?l.jsx("input",{type:"text",value:w.fullName,onChange:O=>g("fullName")(O.target.value),className:"pp-name-edit",placeholder:"Full Name"}):l.jsx("h1",{className:"pp-name",children:t.fullName}),l.jsx("span",{className:"pp-role-chip",children:t.role}),l.jsxs("p",{className:"pp-member-since",children:["Member since ",T]})]}),l.jsx("div",{className:"pp-sidebar-divider"}),l.jsxs("div",{className:"pp-sidebar-info",children:[l.jsx(tr,{icon:l.jsx(Fa,{size:14}),label:"Email",children:l.jsx("span",{className:"pp-email-val",children:t.email})}),l.jsx(tr,{icon:l.jsx(Wx,{size:14}),label:"Phone",children:t.phone||l.jsx("span",{className:"pp-field-empty",children:"—"})}),l.jsx(tr,{icon:l.jsx(Xx,{size:14}),label:"Location",children:t.location||l.jsx("span",{className:"pp-field-empty",children:"—"})}),l.jsx(tr,{icon:l.jsx($y,{size:14}),label:"Website",children:t.website?l.jsx("a",{href:t.website,target:"_blank",rel:"noopener noreferrer",className:"pp-sidebar-link",children:t.website.replace(/^https?:\/\//,"")}):l.jsx("span",{className:"pp-field-empty",children:"—"})})]}),l.jsx("div",{className:"pp-sidebar-divider"}),l.jsxs("div",{className:"pp-social-chips",children:[t.linkedIn?l.jsxs("a",{href:t.linkedIn,target:"_blank",rel:"noopener noreferrer",className:"pp-social-chip pp-social-chip--li",children:[l.jsx(Uo,{size:13})," LinkedIn"]}):l.jsxs("span",{className:"pp-social-chip pp-social-chip--empty",children:[l.jsx(Uo,{size:13})," LinkedIn"]}),t.twitter?l.jsxs("a",{href:t.twitter,target:"_blank",rel:"noopener noreferrer",className:"pp-social-chip pp-social-chip--tw",children:[l.jsx(Ho,{size:13})," Twitter"]}):l.jsxs("span",{className:"pp-social-chip pp-social-chip--empty",children:[l.jsx(Ho,{size:13})," Twitter"]})]}),t.profileImageUrl&&!r&&l.jsxs("button",{className:"pp-delete-photo-btn",onClick:G,disabled:d||o,children:[l.jsx($e,{size:13})," Remove photo"]})]}),l.jsxs("main",{className:"pp-content",children:[l.jsxs("div",{className:"pp-content-header",children:[l.jsxs("div",{children:[l.jsx("h2",{className:"pp-content-title",children:r?"Edit Profile":"Profile Overview"}),l.jsx("p",{className:"pp-content-subtitle",children:r?"Make your changes below and save when done.":"Manage your personal information and social presence."})]}),l.jsx("div",{className:"pp-header-actions",children:r?l.jsxs(l.Fragment,{children:[l.jsxs("button",{className:"pp-btn pp-btn--ghost",onClick:()=>{s(!1),v()},disabled:o,children:[l.jsx(et,{size:14}),"Cancel"]}),l.jsxs("button",{className:`pp-btn pp-btn--save${o?" pp-btn--loading":""}`,onClick:y,disabled:o,children:[o?l.jsx("span",{className:"pp-mini-spinner"}):l.jsx(Yc,{size:14}),o?"Saving…":"Save Changes"]})]}):l.jsxs("button",{className:"pp-btn pp-btn--primary",onClick:()=>s(!0),disabled:d,children:[l.jsx(Wt,{size:14}),"Edit Profile"]})})]}),l.jsxs("section",{className:"pp-section",children:[l.jsxs("div",{className:"pp-section-header",children:[l.jsx("h3",{className:"pp-section-title",children:"About"}),l.jsx("span",{className:"pp-section-rule"})]}),r?l.jsx("textarea",{value:w.bio,onChange:O=>g("bio")(O.target.value),rows:4,placeholder:"Write a short bio about yourself…",className:"pp-bio-textarea"}):l.jsx("p",{className:"pp-bio-text",children:t.bio||l.jsxs("span",{className:"pp-field-empty",children:["No bio added yet. Click ",l.jsx("strong",{children:"Edit Profile"})," to add one."]})})]}),l.jsxs("section",{className:"pp-section",children:[l.jsxs("div",{className:"pp-section-header",children:[l.jsx("h3",{className:"pp-section-title",children:"Contact Information"}),l.jsx("span",{className:"pp-section-rule"})]}),l.jsxs("div",{className:"pp-fields-grid",children:[l.jsx(ar,{label:"Email Address",editing:!1,value:t.email,onChange:()=>{}}),l.jsx(ar,{label:"Phone Number",editing:r,value:r?w.phone:t.phone||"",placeholder:"+1 234 567 8900",type:"tel",onChange:g("phone")}),l.jsx(ar,{label:"Location",editing:r,value:r?w.location:t.location||"",placeholder:"City, Country",onChange:g("location")}),l.jsx(ar,{label:"Website",editing:r,value:r?w.website:t.website||"",placeholder:"https://example.com",type:"url",href:t.website,onChange:g("website")})]})]}),l.jsxs("section",{className:"pp-section",children:[l.jsxs("div",{className:"pp-section-header",children:[l.jsx("h3",{className:"pp-section-title",children:"Social Media"}),l.jsx("span",{className:"pp-section-rule"})]}),l.jsxs("div",{className:"pp-fields-grid",children:[l.jsxs("div",{className:"pp-field-card pp-field-card--social",children:[l.jsx("span",{className:"pp-social-badge pp-social-badge--li",children:l.jsx(Uo,{size:16})}),l.jsxs("div",{className:"pp-field-card-body",children:[l.jsx("p",{className:"pp-field-label",children:"LinkedIn"}),r?l.jsx("input",{type:"url",value:w.linkedIn,onChange:O=>g("linkedIn")(O.target.value),placeholder:"https://linkedin.com/in/username",className:"pp-field-input"}):t.linkedIn?l.jsx("a",{href:t.linkedIn,target:"_blank",rel:"noopener noreferrer",className:"pp-field-link",children:t.linkedIn.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//,"")}):l.jsx("p",{className:"pp-field-value",children:l.jsx("span",{className:"pp-field-empty",children:"Not connected"})})]})]}),l.jsxs("div",{className:"pp-field-card pp-field-card--social",children:[l.jsx("span",{className:"pp-social-badge pp-social-badge--tw",children:l.jsx(Ho,{size:16})}),l.jsxs("div",{className:"pp-field-card-body",children:[l.jsx("p",{className:"pp-field-label",children:"Twitter / X"}),r?l.jsx("input",{type:"url",value:w.twitter,onChange:O=>g("twitter")(O.target.value),placeholder:"https://twitter.com/username",className:"pp-field-input"}):t.twitter?l.jsx("a",{href:t.twitter,target:"_blank",rel:"noopener noreferrer",className:"pp-field-link",children:t.twitter.replace(/^https?:\/\/(www\.)?twitter\.com\//,"@")}):l.jsx("p",{className:"pp-field-value",children:l.jsx("span",{className:"pp-field-empty",children:"Not connected"})})]})]})]})]})]})]}),l.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

        /* ── TOKENS ── */
        :root {
          --pp-ink:          #111318;
          --pp-ink-soft:     #434759;
          --pp-ink-muted:    #8c92a8;
          --pp-surface:      #ffffff;
          --pp-surface-2:    #f5f5f9;
          --pp-surface-3:    #eeeef5;
          --pp-border:       #e3e3ed;
          --pp-accent:       #1a56db;
          --pp-accent-soft:  #eef2fd;
          --pp-amber:        #b45309;
          --pp-amber-soft:   #fef3c7;
          --pp-li:           #0077b5;
          --pp-li-soft:      #e8f4fc;
          --pp-tw:           #1da1f2;
          --pp-tw-soft:      #e8f5fe;
          --pp-success:      #166534;
          --pp-success-bg:   #f0fdf4;
          --pp-success-bdr:  rgba(22,101,52,.15);
          --pp-error:        #991b1b;
          --pp-error-bg:     #fef2f2;
          --pp-error-bdr:    rgba(153,27,27,.15);
          --pp-radius-sm:    6px;
          --pp-radius-md:    10px;
          --pp-radius-lg:    16px;
          --pp-shadow-card:  0 1px 3px rgba(17,19,24,.06), 0 4px 16px rgba(17,19,24,.06);
          --pp-shadow-pop:   0 8px 32px rgba(17,19,24,.14), 0 2px 8px rgba(17,19,24,.06);
          --pp-font-display: 'Sora', sans-serif;
          --pp-font-serif:   'Lora', Georgia, serif;
          --pp-t: .2s cubic-bezier(.4,0,.2,1);
        }

        /* ── ROOT ── */
        .pp-root {
          min-height: 100vh;
          background: var(--pp-surface-2);
          font-family: var(--pp-font-display);
          -webkit-font-smoothing: antialiased;
          padding: 36px 24px 64px;
          position: relative;
        }

        /* ── TOAST ── */
        .pp-toast {
          position: fixed;
          top: 20px;
          right: 24px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 18px;
          border-radius: var(--pp-radius-md);
          font-size: 13px;
          font-weight: 500;
          box-shadow: var(--pp-shadow-pop);
          animation: pp-slide-in .3s ease both;
          border: 1px solid transparent;
          max-width: 360px;
        }

        .pp-toast--success {
          background: var(--pp-success-bg);
          color: var(--pp-success);
          border-color: var(--pp-success-bdr);
        }

        .pp-toast--error {
          background: var(--pp-error-bg);
          color: var(--pp-error);
          border-color: var(--pp-error-bdr);
        }

        @keyframes pp-slide-in {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ── LOADING ── */
        .pp-loading {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          background: var(--pp-surface-2);
          font-family: var(--pp-font-display);
        }

        .pp-loader {
          display: block;
          width: 36px;
          height: 36px;
          border: 3px solid var(--pp-border);
          border-top-color: var(--pp-accent);
          border-radius: 50%;
          animation: pp-spin .7s linear infinite;
        }

        .pp-loading-label {
          font-size: 14px;
          color: var(--pp-ink-muted);
          font-weight: 400;
        }

        .pp-empty-err {
          font-size: 15px;
          color: var(--pp-error);
          font-weight: 500;
        }

        .pp-retry-btn {
          padding: 10px 22px;
          background: var(--pp-ink);
          color: #fff;
          border: none;
          border-radius: var(--pp-radius-md);
          font-family: var(--pp-font-display);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background var(--pp-t);
        }
        .pp-retry-btn:hover { background: var(--pp-ink-soft); }

        @keyframes pp-spin { to { transform: rotate(360deg); } }

        /* ── TWO-COLUMN LAYOUT ── */
        .pp-layout {
          max-width: 1120px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 24px;
          align-items: start;
        }

        /* ══════════════════════════════════
           SIDEBAR
        ══════════════════════════════════ */
        .pp-sidebar {
          background: var(--pp-surface);
          border: 1px solid var(--pp-border);
          border-radius: var(--pp-radius-lg);
          box-shadow: var(--pp-shadow-card);
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          gap: 0;
          position: sticky;
          top: 24px;
        }

        /* Avatar block */
        .pp-avatar-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding-bottom: 24px;
        }

        .pp-avatar-wrap {
          position: relative;
          margin-bottom: 18px;
        }

        .pp-avatar {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background: var(--pp-surface-3);
          border: 3px solid var(--pp-surface);
          box-shadow: 0 0 0 2px var(--pp-border), var(--pp-shadow-card);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pp-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pp-avatar-initials {
          font-family: var(--pp-font-serif);
          font-size: 32px;
          font-weight: 600;
          color: var(--pp-ink-soft);
          letter-spacing: -0.02em;
        }

        .pp-camera-btn {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--pp-ink);
          border: 2px solid var(--pp-surface);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background var(--pp-t), transform var(--pp-t);
        }
        .pp-camera-btn:hover:not(:disabled) {
          background: var(--pp-ink-soft);
          transform: scale(1.1);
        }
        .pp-camera-btn:disabled { opacity: .5; cursor: not-allowed; }

        .pp-hidden-input { display: none; }

        .pp-name {
          font-family: var(--pp-font-serif);
          font-size: 20px;
          font-weight: 600;
          color: var(--pp-ink);
          margin: 0 0 10px;
          line-height: 1.25;
        }

        .pp-name-edit {
          font-family: var(--pp-font-serif);
          font-size: 18px;
          font-weight: 600;
          color: var(--pp-ink);
          text-align: center;
          background: var(--pp-surface-2);
          border: 1.5px solid var(--pp-border);
          border-radius: var(--pp-radius-sm);
          outline: none;
          padding: 6px 10px;
          width: 100%;
          margin-bottom: 10px;
          transition: border-color var(--pp-t);
        }
        .pp-name-edit:focus { border-color: var(--pp-accent); }

        .pp-role-chip {
          display: inline-block;
          padding: 3px 10px;
          background: var(--pp-surface-2);
          border: 1px solid var(--pp-border);
          border-radius: 99px;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--pp-ink-soft);
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .pp-member-since {
          font-size: 11.5px;
          color: var(--pp-ink-muted);
          font-weight: 400;
          margin: 0;
        }

        /* Sidebar divider */
        .pp-sidebar-divider {
          height: 1px;
          background: var(--pp-border);
          margin: 20px 0;
        }

        /* Info rows */
        .pp-sidebar-info {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .pp-info-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .pp-info-row-icon {
          width: 28px;
          height: 28px;
          border-radius: var(--pp-radius-sm);
          background: var(--pp-surface-2);
          border: 1px solid var(--pp-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--pp-ink-muted);
          flex-shrink: 0;
        }

        .pp-info-row-body {
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: 0;
        }

        .pp-info-row-label {
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--pp-ink-muted);
        }

        .pp-info-row-value {
          font-size: 13px;
          font-weight: 500;
          color: var(--pp-ink);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 180px;
        }

        .pp-email-val {
          font-size: 12.5px;
        }

        .pp-sidebar-link {
          font-size: 13px;
          color: var(--pp-accent);
          text-decoration: none;
          font-weight: 500;
        }
        .pp-sidebar-link:hover { text-decoration: underline; }

        /* Social chips */
        .pp-social-chips {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .pp-social-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: var(--pp-radius-sm);
          font-size: 12.5px;
          font-weight: 600;
          text-decoration: none;
          transition: background var(--pp-t), opacity var(--pp-t);
        }

        .pp-social-chip--li {
          background: var(--pp-li-soft);
          color: var(--pp-li);
          border: 1px solid rgba(0,119,181,.12);
        }
        .pp-social-chip--li:hover { opacity: .8; }

        .pp-social-chip--tw {
          background: var(--pp-tw-soft);
          color: var(--pp-tw);
          border: 1px solid rgba(29,161,242,.12);
        }
        .pp-social-chip--tw:hover { opacity: .8; }

        .pp-social-chip--empty {
          background: var(--pp-surface-2);
          color: var(--pp-ink-muted);
          border: 1px solid var(--pp-border);
        }

        /* Delete photo */
        .pp-delete-photo-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 16px;
          width: 100%;
          padding: 8px;
          background: none;
          border: 1px solid var(--pp-border);
          border-radius: var(--pp-radius-sm);
          font-family: var(--pp-font-display);
          font-size: 12px;
          font-weight: 500;
          color: var(--pp-ink-muted);
          cursor: pointer;
          transition: color var(--pp-t), border-color var(--pp-t), background var(--pp-t);
        }
        .pp-delete-photo-btn:hover {
          color: var(--pp-error);
          border-color: rgba(153,27,27,.3);
          background: var(--pp-error-bg);
        }
        .pp-delete-photo-btn:disabled { opacity: .4; cursor: not-allowed; }

        /* ══════════════════════════════════
           MAIN CONTENT
        ══════════════════════════════════ */
        .pp-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Content header */
        .pp-content-header {
          background: var(--pp-surface);
          border: 1px solid var(--pp-border);
          border-radius: var(--pp-radius-lg);
          box-shadow: var(--pp-shadow-card);
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .pp-content-title {
          font-family: var(--pp-font-serif);
          font-size: 20px;
          font-weight: 600;
          color: var(--pp-ink);
          margin: 0 0 4px;
        }

        .pp-content-subtitle {
          font-size: 13px;
          color: var(--pp-ink-muted);
          margin: 0;
          font-weight: 400;
        }

        .pp-header-actions {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
        }

        /* Buttons */
        .pp-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 18px;
          border-radius: var(--pp-radius-md);
          font-family: var(--pp-font-display);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: background var(--pp-t), transform var(--pp-t), box-shadow var(--pp-t);
          white-space: nowrap;
        }
        .pp-btn:disabled { opacity: .5; cursor: not-allowed; }

        .pp-btn--primary {
          background: var(--pp-ink);
          color: #fff;
          box-shadow: 0 1px 3px rgba(17,19,24,.2);
        }
        .pp-btn--primary:hover:not(:disabled) {
          background: var(--pp-ink-soft);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(17,19,24,.2);
        }

        .pp-btn--ghost {
          background: var(--pp-surface-2);
          color: var(--pp-ink-soft);
          border: 1px solid var(--pp-border);
        }
        .pp-btn--ghost:hover:not(:disabled) { background: var(--pp-surface-3); }

        .pp-btn--save {
          background: var(--pp-success);
          color: #fff;
          box-shadow: 0 1px 3px rgba(22,101,52,.25);
        }
        .pp-btn--save:hover:not(:disabled) {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }
        .pp-btn--loading { opacity: .7; }

        /* Sections */
        .pp-section {
          background: var(--pp-surface);
          border: 1px solid var(--pp-border);
          border-radius: var(--pp-radius-lg);
          box-shadow: var(--pp-shadow-card);
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: pp-fade-in .4s ease both;
        }

        @keyframes pp-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .pp-section-header {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .pp-section-title {
          font-family: var(--pp-font-display);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--pp-ink-soft);
          margin: 0;
          white-space: nowrap;
        }

        .pp-section-rule {
          flex: 1;
          height: 1px;
          background: var(--pp-border);
        }

        /* Bio */
        .pp-bio-text {
          font-size: 14.5px;
          line-height: 1.75;
          color: var(--pp-ink-soft);
          margin: 0;
          font-weight: 400;
        }

        .pp-bio-textarea {
          width: 100%;
          padding: 14px 16px;
          font-family: var(--pp-font-display);
          font-size: 14px;
          line-height: 1.7;
          color: var(--pp-ink);
          background: var(--pp-surface-2);
          border: 1.5px solid var(--pp-border);
          border-radius: var(--pp-radius-md);
          resize: vertical;
          outline: none;
          transition: border-color var(--pp-t), box-shadow var(--pp-t);
        }
        .pp-bio-textarea:focus {
          border-color: var(--pp-accent);
          box-shadow: 0 0 0 3px rgba(26,86,219,.08);
          background: var(--pp-surface);
        }

        /* Field grid */
        .pp-fields-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        /* Field card */
        .pp-field-card {
          background: var(--pp-surface-2);
          border: 1px solid var(--pp-border);
          border-radius: var(--pp-radius-md);
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: border-color var(--pp-t);
        }
        .pp-field-card:hover { border-color: var(--pp-surface-3); }

        .pp-field-card--social {
          flex-direction: row;
          align-items: flex-start;
          gap: 14px;
        }

        .pp-field-card-body {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .pp-field-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--pp-ink-muted);
          margin: 0;
        }

        .pp-field-value {
          font-size: 14px;
          font-weight: 500;
          color: var(--pp-ink);
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .pp-field-empty {
          color: var(--pp-ink-muted);
          font-weight: 400;
          font-style: italic;
        }

        .pp-field-input {
          width: 100%;
          font-family: var(--pp-font-display);
          font-size: 14px;
          font-weight: 500;
          color: var(--pp-ink);
          background: var(--pp-surface);
          border: 1.5px solid var(--pp-border);
          border-radius: var(--pp-radius-sm);
          padding: 7px 10px;
          outline: none;
          transition: border-color var(--pp-t), box-shadow var(--pp-t);
        }
        .pp-field-input:focus {
          border-color: var(--pp-accent);
          box-shadow: 0 0 0 3px rgba(26,86,219,.08);
        }

        .pp-field-link {
          font-size: 13.5px;
          font-weight: 500;
          color: var(--pp-accent);
          text-decoration: none;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
        }
        .pp-field-link:hover { text-decoration: underline; }

        /* Social badges */
        .pp-social-badge {
          width: 36px;
          height: 36px;
          border-radius: var(--pp-radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pp-social-badge--li { background: var(--pp-li-soft); color: var(--pp-li); }
        .pp-social-badge--tw { background: var(--pp-tw-soft); color: var(--pp-tw); }

        /* Mini spinner */
        .pp-mini-spinner {
          display: inline-block;
          width: 12px;
          height: 12px;
          border: 2px solid rgba(255,255,255,.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: pp-spin .7s linear infinite;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .pp-layout {
            grid-template-columns: 1fr;
          }
          .pp-sidebar {
            position: static;
          }
        }

        @media (max-width: 640px) {
          .pp-root { padding: 20px 16px 48px; }
          .pp-content-header { flex-direction: column; align-items: flex-start; }
          .pp-fields-grid { grid-template-columns: 1fr; }
          .pp-header-actions { width: 100%; }
          .pp-btn { flex: 1; justify-content: center; }
        }
      `})]})},p4=()=>{const e=Zt(),[t,a]=b.useState([]),[n,i]=b.useState(new Map),[r,s]=b.useState(!0),[o,c]=b.useState("");b.useEffect(()=>{d()},[]);const d=async()=>{try{s(!0),c("");const u=Os(e);console.log("✅ Authenticated user:",{userId:u.userId,email:u.email,fullName:u.fullName});const[x,m]=await Promise.all([Ri(String(u.userId)),iu(String(u.userId))]);console.log("✅ API Response received:",{enrollments:x.length,progress:m.length});const j=new Map;m.forEach(w=>{j.set(w.courseId,w.progress)}),a(x),i(j)}catch(u){if(console.error("❌ Error loading enrollments:",u),u.message==="Authentication required")return;c(u.message||"Failed to load your courses. Please try again.")}finally{s(!1)}},p=u=>{e(`/course/${u}`)},f=u=>n.get(u)||0;return r?l.jsxs(l.Fragment,{children:[l.jsx(wn,{}),l.jsxs("div",{style:ne.loadingContainer,children:[l.jsx("div",{style:ne.spinner}),l.jsx("p",{style:ne.loadingText,children:"Loading your courses..."})]})]}):l.jsxs(l.Fragment,{children:[l.jsx(wn,{}),l.jsx("div",{style:ne.pageContainer,children:l.jsxs("div",{style:ne.contentWrapper,children:[l.jsx("div",{style:ne.header,children:l.jsxs("div",{style:ne.headerContent,children:[l.jsx("div",{style:ne.headerIcon,children:l.jsx(Fe,{size:32,color:"white"})}),l.jsxs("div",{children:[l.jsx("h1",{style:ne.title,children:"My Learning"}),l.jsx("p",{style:ne.subtitle,children:t.length===0?"Start your learning journey today":`Continue your journey with ${t.length} enrolled ${t.length===1?"course":"courses"}`})]})]})}),o&&l.jsxs("div",{style:ne.errorAlert,children:[l.jsx("span",{style:ne.errorIcon,children:"⚠️"}),l.jsxs("div",{style:{flex:1},children:[l.jsx("div",{style:ne.errorTitle,children:"Error Loading Courses"}),l.jsx("div",{style:ne.errorText,children:o})]}),l.jsx("button",{style:ne.retryButton,onClick:d,children:"Try Again"})]}),!o&&t.length===0?l.jsxs("div",{style:ne.emptyState,children:[l.jsx("div",{style:ne.emptyIcon,children:l.jsx(Gc,{size:64})}),l.jsx("h2",{style:ne.emptyTitle,children:"No courses enrolled yet"}),l.jsx("p",{style:ne.emptyText,children:"Discover thousands of courses and start learning something new today. Build skills that will help you advance your career."}),l.jsxs("button",{style:ne.exploreButton,onClick:()=>e("/"),children:[l.jsx(Fe,{size:20}),l.jsx("span",{children:"Explore Courses"})]})]}):l.jsx("div",{style:ne.coursesGrid,children:t.map(u=>{var m;const x=f(u.course.id);return l.jsxs("div",{style:ne.courseCard,className:"course-card",onClick:()=>p(u.course.id),children:[l.jsxs("div",{style:ne.courseImage,children:[l.jsx("img",{src:u.course.imageUrl||"https://via.placeholder.com/400x200/667eea/ffffff?text=Course+Image",alt:u.course.title,style:ne.image,onError:j=>{j.target.src="https://via.placeholder.com/400x200/667eea/ffffff?text=Course+Image"}}),l.jsxs("div",{style:ne.enrolledBadge,children:[l.jsx(Fe,{size:16}),l.jsx("span",{children:"Enrolled"})]})]}),l.jsxs("div",{style:ne.courseContent,children:[l.jsx("h3",{style:ne.courseTitle,children:u.course.title}),l.jsxs("p",{style:ne.courseInstructor,children:["By ",((m=u.course.instructor)==null?void 0:m.name)||"Unknown Instructor"]}),l.jsx("p",{style:ne.courseDescription,children:u.course.description}),l.jsxs("div",{style:ne.progressSection,children:[l.jsxs("div",{style:ne.progressHeader,children:[l.jsx("span",{style:ne.progressLabel,children:"Course Progress"}),l.jsxs("span",{style:ne.progressPercent,children:[x,"%"]})]}),l.jsx("div",{style:ne.progressBarContainer,children:l.jsx("div",{style:{...ne.progressBarFill,width:`${x}%`}})}),l.jsx("p",{style:ne.progressHint,children:x===0?"Start watching to track your progress":x===100?"🎉 Course completed!":"Keep going! You're making great progress"})]}),l.jsxs("div",{style:ne.courseFooter,children:[l.jsxs("div",{style:ne.enrolledDate,children:[l.jsx(Qa,{size:14}),l.jsxs("span",{children:["Enrolled ",new Date(u.enrolledAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})]})]}),l.jsxs("button",{style:ne.continueButton,className:"continue-btn",onClick:j=>{j.stopPropagation(),p(u.course.id)},children:[x===0?"Start Course":x===100?"Review":"Continue",l.jsx(da,{size:16})]})]})]})]},u.id)})})]})}),l.jsx(Gs,{})]})},ne={pageContainer:{minHeight:"100vh",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",padding:"40px 20px"},contentWrapper:{maxWidth:"1200px",margin:"0 auto"},loadingContainer:{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"},spinner:{width:"50px",height:"50px",border:"4px solid rgba(255,255,255,0.3)",borderTop:"4px solid white",borderRadius:"50%",animation:"spin 1s linear infinite"},loadingText:{marginTop:"20px",fontSize:"18px",color:"white",fontWeight:500},header:{background:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(20px)",borderRadius:"24px",padding:"32px",marginBottom:"32px",boxShadow:"0 25px 50px rgba(0, 0, 0, 0.15)"},headerContent:{display:"flex",alignItems:"center",gap:"20px"},headerIcon:{width:"64px",height:"64px",borderRadius:"16px",background:"linear-gradient(135deg, #667eea, #764ba2)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 20px rgba(102, 126, 234, 0.4)",flexShrink:0},title:{margin:0,fontSize:"32px",fontWeight:800,color:"#1f2937"},subtitle:{margin:"8px 0 0 0",fontSize:"16px",color:"#6b7280",lineHeight:1.5},errorAlert:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"16px",background:"linear-gradient(135deg, #ef4444, #dc2626)",color:"white",padding:"20px 24px",borderRadius:"16px",marginBottom:"24px",boxShadow:"0 10px 30px rgba(239, 68, 68, 0.3)"},errorIcon:{fontSize:"24px",flexShrink:0},errorTitle:{fontSize:"16px",fontWeight:700,marginBottom:"4px"},errorText:{fontSize:"14px",opacity:.9},retryButton:{padding:"10px 20px",background:"rgba(255, 255, 255, 0.2)",color:"white",border:"2px solid white",borderRadius:"10px",fontSize:"14px",fontWeight:600,cursor:"pointer",transition:"all 0.2s",whiteSpace:"nowrap"},emptyState:{background:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(20px)",borderRadius:"24px",padding:"80px 40px",display:"flex",flexDirection:"column",alignItems:"center",gap:"20px",textAlign:"center",boxShadow:"0 25px 50px rgba(0, 0, 0, 0.15)"},emptyIcon:{width:"120px",height:"120px",borderRadius:"50%",background:"linear-gradient(135deg, #667eea, #764ba2)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",marginBottom:"8px"},emptyTitle:{margin:0,fontSize:"28px",fontWeight:700,color:"#1f2937"},emptyText:{margin:0,fontSize:"16px",color:"#6b7280",maxWidth:"500px",lineHeight:1.6},exploreButton:{marginTop:"8px",padding:"14px 32px",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",border:"none",borderRadius:"12px",fontSize:"16px",fontWeight:600,cursor:"pointer",transition:"all 0.2s",boxShadow:"0 8px 20px rgba(102, 126, 234, 0.3)",display:"flex",alignItems:"center",gap:"10px"},coursesGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(350px, 1fr))",gap:"24px"},courseCard:{background:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(20px)",borderRadius:"20px",overflow:"hidden",cursor:"pointer",transition:"all 0.3s ease",boxShadow:"0 10px 30px rgba(0, 0, 0, 0.1)"},courseImage:{position:"relative",height:"200px",overflow:"hidden",background:"linear-gradient(135deg, #667eea, #764ba2)"},image:{width:"100%",height:"100%",objectFit:"cover"},enrolledBadge:{position:"absolute",top:"16px",right:"16px",background:"linear-gradient(135deg, #10b981, #059669)",color:"white",padding:"8px 16px",borderRadius:"20px",display:"flex",alignItems:"center",gap:"6px",fontSize:"13px",fontWeight:600,boxShadow:"0 4px 12px rgba(16, 185, 129, 0.4)"},courseContent:{padding:"24px"},courseTitle:{margin:0,fontSize:"20px",fontWeight:700,color:"#1f2937",marginBottom:"8px",lineHeight:1.3},courseInstructor:{margin:0,fontSize:"14px",color:"#667eea",fontWeight:600,marginBottom:"12px"},courseDescription:{margin:0,fontSize:"14px",color:"#6b7280",lineHeight:"1.6",marginBottom:"20px",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"},progressSection:{marginBottom:"20px",padding:"16px",background:"rgba(102, 126, 234, 0.05)",borderRadius:"12px",border:"1px solid rgba(102, 126, 234, 0.1)"},progressHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},progressLabel:{fontSize:"13px",fontWeight:600,color:"#4b5563",textTransform:"uppercase",letterSpacing:"0.5px"},progressPercent:{fontSize:"16px",fontWeight:700,color:"#667eea"},progressBarContainer:{width:"100%",height:"8px",background:"rgba(102, 126, 234, 0.15)",borderRadius:"999px",overflow:"hidden",marginBottom:"8px"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #667eea, #764ba2)",borderRadius:"999px",transition:"width 0.5s ease"},progressHint:{margin:0,fontSize:"12px",color:"#6b7280",fontStyle:"italic"},courseFooter:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"20px",borderTop:"2px solid #f3f4f6",gap:"12px"},enrolledDate:{display:"flex",alignItems:"center",gap:"6px",fontSize:"13px",color:"#6b7280",flexShrink:1},continueButton:{padding:"10px 20px",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",border:"none",borderRadius:"10px",fontSize:"14px",fontWeight:600,cursor:"pointer",transition:"all 0.2s",display:"flex",alignItems:"center",gap:"6px",whiteSpace:"nowrap",boxShadow:"0 4px 12px rgba(102, 126, 234, 0.3)"}},Cg=document.createElement("style");Cg.textContent=`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .course-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
  }
  
  .continue-btn:hover,
  button[style*="exploreButton"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(102, 126, 234, 0.4) !important;
  }
  
  button[style*="retryButton"]:hover {
    background: rgba(255, 255, 255, 0.3) !important;
  }
  
  @media (max-width: 768px) {
    div[style*="coursesGrid"] {
      grid-template-columns: 1fr !important;
    }
  }
`;document.head.appendChild(Cg);async function f4(e){const t=await fetch(`${Pe}/Contact`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok){const a=await t.json();throw new Error(a.message||"Failed to submit contact form")}return t.json()}const h4=()=>{const[e,t]=b.useState({name:"",email:"",subject:"",message:""}),[a,n]=b.useState(!1),[i,r]=b.useState(""),[s,o]=b.useState(""),[c,d]=b.useState(null),p=x=>t({...e,[x.target.name]:x.target.value}),f=async()=>{if(!e.name||!e.email||!e.message){o("Please fill in all required fields."),setTimeout(()=>o(""),4e3);return}n(!0),o(""),r("");try{await f4(e),r("Message sent — we'll get back to you within 24 hours."),t({name:"",email:"",subject:"",message:""}),setTimeout(()=>r(""),6e3)}catch(x){o(x.message||"Failed to send message. Please try again."),setTimeout(()=>o(""),5e3)}finally{n(!1)}},u=[{icon:l.jsx(Fa,{size:18}),label:"Email",primary:"support@luminalearning.com",secondary:"Response within 24 hours",color:"var(--ct-accent)",bg:"var(--ct-accent-s)"},{icon:l.jsx(Wx,{size:18}),label:"Phone",primary:"+1 (555) 123-4567",secondary:"Mon – Fri, 9 AM – 6 PM EST",color:"var(--ct-rose)",bg:"var(--ct-rose-s)"},{icon:l.jsx(Xx,{size:18}),label:"Address",primary:"123 Business Street",secondary:"San Francisco, CA 94105",color:"var(--ct-amber)",bg:"var(--ct-amber-s)"},{icon:l.jsx(Qa,{size:18}),label:"Hours",primary:"Monday – Friday",secondary:"9:00 AM – 6:00 PM EST",color:"var(--ct-green)",bg:"var(--ct-green-s)"}];return l.jsxs("div",{className:"ct-root",children:[i&&l.jsxs("div",{className:"ct-toast ct-toast--success",children:[l.jsx(st,{size:15})," ",i]}),s&&l.jsxs("div",{className:"ct-toast ct-toast--error",children:[l.jsx(Py,{size:15})," ",s]}),l.jsxs("header",{className:"ct-header",children:[l.jsx("div",{className:"ct-header-grid"}),l.jsxs("div",{className:"ct-header-inner",children:[l.jsx("p",{className:"ct-eyebrow",children:"Contact Us"}),l.jsx("h1",{className:"ct-page-title",children:"Get In Touch"}),l.jsx("p",{className:"ct-page-sub",children:"Have a question, feedback, or just want to say hello? We'd love to hear from you."})]}),l.jsx("div",{className:"ct-header-ring ct-ring-1"}),l.jsx("div",{className:"ct-header-ring ct-ring-2"})]}),l.jsxs("div",{className:"ct-layout",children:[l.jsxs("div",{className:"ct-form-card",children:[l.jsxs("div",{className:"ct-form-card-header",children:[l.jsx("h2",{className:"ct-form-title",children:"Send a Message"}),l.jsx("p",{className:"ct-form-sub",children:"Fill in the details below and we'll respond as soon as possible."})]}),l.jsxs("div",{className:"ct-form",children:[l.jsxs("div",{className:"ct-field-row",children:[l.jsxs("div",{className:"ct-field",children:[l.jsxs("label",{className:"ct-label",children:[l.jsx(Pd,{size:13})," Full Name ",l.jsx("span",{className:"ct-required",children:"*"})]}),l.jsx("div",{className:`ct-input-wrap${c==="name"?" ct-input-wrap--focus":""}`,children:l.jsx("input",{name:"name",placeholder:"John Doe",value:e.name,onChange:p,onFocus:()=>d("name"),onBlur:()=>d(null),className:"ct-input",autoComplete:"name"})})]}),l.jsxs("div",{className:"ct-field",children:[l.jsxs("label",{className:"ct-label",children:[l.jsx(Fa,{size:13})," Email Address ",l.jsx("span",{className:"ct-required",children:"*"})]}),l.jsx("div",{className:`ct-input-wrap${c==="email"?" ct-input-wrap--focus":""}`,children:l.jsx("input",{name:"email",type:"email",placeholder:"john@example.com",value:e.email,onChange:p,onFocus:()=>d("email"),onBlur:()=>d(null),className:"ct-input",autoComplete:"email"})})]})]}),l.jsxs("div",{className:"ct-field",children:[l.jsxs("label",{className:"ct-label",children:[l.jsx(Jy,{size:13})," Subject ",l.jsx("span",{className:"ct-optional",children:"(optional)"})]}),l.jsx("div",{className:`ct-input-wrap${c==="subject"?" ct-input-wrap--focus":""}`,children:l.jsx("input",{name:"subject",placeholder:"How can we help?",value:e.subject,onChange:p,onFocus:()=>d("subject"),onBlur:()=>d(null),className:"ct-input"})})]}),l.jsxs("div",{className:"ct-field",children:[l.jsxs("label",{className:"ct-label",children:[l.jsx(Gx,{size:13})," Message ",l.jsx("span",{className:"ct-required",children:"*"})]}),l.jsx("div",{className:`ct-input-wrap ct-input-wrap--textarea${c==="message"?" ct-input-wrap--focus":""}`,children:l.jsx("textarea",{name:"message",placeholder:"Tell us what's on your mind…",value:e.message,onChange:p,onFocus:()=>d("message"),onBlur:()=>d(null),rows:6,className:"ct-textarea"})}),l.jsxs("p",{className:"ct-char-hint",children:[e.message.length," characters"]})]}),l.jsx("button",{className:`ct-submit${a?" ct-submit--loading":""}`,onClick:f,disabled:a,children:a?l.jsxs(l.Fragment,{children:[l.jsx("span",{className:"ct-spinner"})," Sending…"]}):l.jsxs(l.Fragment,{children:["Send Message ",l.jsx(da,{size:15})]})})]})]}),l.jsxs("aside",{className:"ct-info-col",children:[l.jsxs("div",{className:"ct-intro-card",children:[l.jsx("div",{className:"ct-intro-ring"}),l.jsx("p",{className:"ct-intro-eyebrow",children:"Srinu tech Guru Support"}),l.jsx("h3",{className:"ct-intro-title",children:"We're here to help"}),l.jsx("p",{className:"ct-intro-body",children:"Our support team is dedicated to ensuring you have the best learning experience. Reach out through any of the channels below."})]}),l.jsx("div",{className:"ct-info-list",children:u.map((x,m)=>l.jsxs("div",{className:"ct-info-row",children:[l.jsx("span",{className:"ct-info-icon",style:{background:x.bg,color:x.color},children:x.icon}),l.jsxs("div",{className:"ct-info-body",children:[l.jsx("p",{className:"ct-info-label",children:x.label}),l.jsx("p",{className:"ct-info-primary",children:x.primary}),l.jsx("p",{className:"ct-info-secondary",children:x.secondary})]})]},m))}),l.jsxs("div",{className:"ct-response-note",children:[l.jsx(st,{size:14}),l.jsxs("span",{children:["Average response time: ",l.jsx("strong",{children:"under 4 hours"})," on business days"]})]})]})]}),l.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        /* ── TOKENS ── */
        :root {
          --ct-ink:        #0e0f13;
          --ct-ink-soft:   #3d4154;
          --ct-ink-muted:  #8b90a8;
          --ct-surface:    #ffffff;
          --ct-surface-2:  #f6f6fb;
          --ct-surface-3:  #eeeef4;
          --ct-border:     #e3e3ed;
          --ct-accent:     #1a56db;
          --ct-accent-s:   #eef2fd;
          --ct-green:      #16a34a;
          --ct-green-s:    #f0fdf4;
          --ct-amber:      #b45309;
          --ct-amber-s:    #fffbeb;
          --ct-rose:       #be185d;
          --ct-rose-s:     #fdf2f8;
          --ct-gold:       #c9a84c;
          --ct-success:    #166534;
          --ct-success-bg: #f0fdf4;
          --ct-success-bd: rgba(22,101,52,.15);
          --ct-error:      #991b1b;
          --ct-error-bg:   #fef2f2;
          --ct-error-bd:   rgba(153,27,27,.15);
          --ct-shadow:     0 1px 4px rgba(14,15,19,.06), 0 6px 20px rgba(14,15,19,.07);
          --ct-shadow-lg:  0 12px 40px rgba(14,15,19,.12), 0 3px 10px rgba(14,15,19,.06);
          --ct-r-md:       10px;
          --ct-r-lg:       16px;
          --ct-r-xl:       24px;
          --ct-t:          .2s cubic-bezier(.4,0,.2,1);
          --ct-font-d:     'Playfair Display', Georgia, serif;
          --ct-font-b:     'DM Sans', 'Helvetica Neue', sans-serif;
        }

        /* ── ROOT ── */
        .ct-root {
          min-height: 100vh;
          background: var(--ct-surface-2);
          font-family: var(--ct-font-b);
          -webkit-font-smoothing: antialiased;
          padding-bottom: 72px;
        }

        /* ── TOAST ── */
        .ct-toast {
          position: fixed;
          top: 20px; right: 24px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 12px 18px;
          border-radius: var(--ct-r-md);
          font-size: 13.5px;
          font-weight: 500;
          border: 1px solid transparent;
          box-shadow: var(--ct-shadow-lg);
          animation: ct-slide-in .3s ease both;
          max-width: 380px;
        }
        .ct-toast--success {
          background: var(--ct-success-bg);
          color: var(--ct-success);
          border-color: var(--ct-success-bd);
        }
        .ct-toast--error {
          background: var(--ct-error-bg);
          color: var(--ct-error);
          border-color: var(--ct-error-bd);
        }
        @keyframes ct-slide-in {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ── PAGE HEADER ── */
        .ct-header {
          position: relative;
          background: var(--ct-ink);
          padding: 80px 24px 100px;
          overflow: hidden;
          text-align: center;
        }

        .ct-header-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
          background-size: 52px 52px;
          pointer-events: none;
        }

        .ct-header-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,.1);
          pointer-events: none;
        }
        .ct-ring-1 { width: 440px; height: 440px; bottom: -200px; right: -120px; animation: ct-spin 80s linear infinite; }
        .ct-ring-2 { width: 260px; height: 260px; top: -80px; left: -60px; animation: ct-spin 60s linear infinite reverse; }

        @keyframes ct-spin { to { transform: rotate(360deg); } }

        .ct-header-inner {
          position: relative;
          z-index: 2;
          max-width: 600px;
          margin: 0 auto;
          animation: ct-fade-up .55s ease both;
        }

        @keyframes ct-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ct-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--ct-gold);
          margin: 0 0 16px;
        }

        .ct-page-title {
          font-family: var(--ct-font-d);
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          color: #fff;
          margin: 0 0 14px;
          letter-spacing: -0.02em;
        }

        .ct-page-sub {
          font-size: 15.5px;
          color: rgba(255,255,255,.55);
          font-weight: 300;
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto;
        }

        /* ── MAIN GRID ── */
        .ct-layout {
          max-width: 1100px;
          margin: -48px auto 0;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 24px;
          align-items: start;
          position: relative;
          z-index: 10;
        }

        /* ══════════════════════════════════
           FORM CARD
        ══════════════════════════════════ */
        .ct-form-card {
          background: var(--ct-surface);
          border: 1px solid var(--ct-border);
          border-radius: var(--ct-r-xl);
          box-shadow: var(--ct-shadow-lg);
          padding: 44px 44px 48px;
          animation: ct-fade-up .5s ease both;
        }

        .ct-form-card-header {
          margin-bottom: 36px;
          padding-bottom: 28px;
          border-bottom: 1px solid var(--ct-border);
        }

        .ct-form-title {
          font-family: var(--ct-font-d);
          font-size: 26px;
          font-weight: 700;
          color: var(--ct-ink);
          margin: 0 0 8px;
        }

        .ct-form-sub {
          font-size: 14px;
          color: var(--ct-ink-muted);
          margin: 0;
          line-height: 1.6;
        }

        /* ── FORM FIELDS ── */
        .ct-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .ct-field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .ct-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .ct-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .04em;
          text-transform: uppercase;
          color: var(--ct-ink-soft);
        }

        .ct-required { color: var(--ct-rose); margin-left: 2px; font-style: normal; }
        .ct-optional  { color: var(--ct-ink-muted); font-weight: 400; letter-spacing: 0; text-transform: none; font-size: 12px; margin-left: 4px; }

        /* Input wrapper handles the focus ring */
        .ct-input-wrap {
          border: 1.5px solid var(--ct-border);
          border-radius: var(--ct-r-md);
          background: var(--ct-surface-2);
          transition: border-color var(--ct-t), box-shadow var(--ct-t), background var(--ct-t);
        }

        .ct-input-wrap--focus {
          border-color: var(--ct-accent);
          box-shadow: 0 0 0 3.5px rgba(26,86,219,.09);
          background: var(--ct-surface);
        }

        .ct-input-wrap--textarea { align-items: stretch; }

        .ct-input {
          width: 100%;
          padding: 12px 14px;
          font-family: var(--ct-font-b);
          font-size: 14px;
          font-weight: 400;
          color: var(--ct-ink);
          background: transparent;
          border: none;
          outline: none;
          border-radius: inherit;
          box-sizing: border-box;
        }

        .ct-input::placeholder { color: var(--ct-ink-muted); }

        .ct-textarea {
          width: 100%;
          padding: 12px 14px;
          font-family: var(--ct-font-b);
          font-size: 14px;
          font-weight: 400;
          color: var(--ct-ink);
          background: transparent;
          border: none;
          outline: none;
          resize: vertical;
          line-height: 1.7;
          border-radius: inherit;
          box-sizing: border-box;
        }

        .ct-textarea::placeholder { color: var(--ct-ink-muted); }

        .ct-char-hint {
          font-size: 11.5px;
          color: var(--ct-ink-muted);
          text-align: right;
          margin: 0;
          font-weight: 400;
        }

        /* ── SUBMIT BUTTON ── */
        .ct-submit {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 14px 24px;
          background: var(--ct-ink);
          color: #fff;
          border: none;
          border-radius: var(--ct-r-md);
          font-family: var(--ct-font-b);
          font-size: 14.5px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 4px;
          transition: background var(--ct-t), transform var(--ct-t), box-shadow var(--ct-t);
          box-shadow: 0 2px 8px rgba(14,15,19,.2), 0 1px 3px rgba(14,15,19,.1);
          letter-spacing: .01em;
        }

        .ct-submit:hover:not(:disabled) {
          background: #1a1c24;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(14,15,19,.22);
        }

        .ct-submit:active:not(:disabled) { transform: translateY(0); }

        .ct-submit--loading { opacity: .6; cursor: not-allowed; }

        .ct-spinner {
          display: inline-block;
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: ct-spin .75s linear infinite;
        }

        /* ══════════════════════════════════
           INFO COLUMN
        ══════════════════════════════════ */
        .ct-info-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: ct-fade-up .6s ease both .1s;
        }

        /* Intro card (dark) */
        .ct-intro-card {
          position: relative;
          background: var(--ct-ink);
          border-radius: var(--ct-r-xl);
          padding: 32px 28px;
          overflow: hidden;
        }

        .ct-intro-ring {
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,.12);
          bottom: -80px; right: -60px;
          pointer-events: none;
        }

        .ct-intro-eyebrow {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--ct-gold);
          margin: 0 0 12px;
        }

        .ct-intro-title {
          font-family: var(--ct-font-d);
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 10px;
          position: relative;
          z-index: 1;
        }

        .ct-intro-body {
          font-size: 13.5px;
          color: rgba(255,255,255,.52);
          line-height: 1.7;
          margin: 0;
          font-weight: 300;
          position: relative;
          z-index: 1;
        }

        /* Info list */
        .ct-info-list {
          background: var(--ct-surface);
          border: 1px solid var(--ct-border);
          border-radius: var(--ct-r-xl);
          box-shadow: var(--ct-shadow);
          overflow: hidden;
        }

        .ct-info-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 20px 24px;
          border-bottom: 1px solid var(--ct-border);
          transition: background var(--ct-t);
        }
        .ct-info-row:last-child { border-bottom: none; }
        .ct-info-row:hover { background: var(--ct-surface-2); }

        .ct-info-icon {
          width: 36px; height: 36px;
          border-radius: var(--ct-r-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ct-info-body { flex: 1; }

        .ct-info-label {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--ct-ink-muted);
          margin: 0 0 3px;
        }

        .ct-info-primary {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--ct-ink);
          margin: 0 0 2px;
        }

        .ct-info-secondary {
          font-size: 12.5px;
          color: var(--ct-ink-muted);
          margin: 0;
          font-weight: 400;
        }

        /* Response note */
        .ct-response-note {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          padding: 14px 18px;
          background: var(--ct-surface);
          border: 1px solid var(--ct-border);
          border-radius: var(--ct-r-md);
          font-size: 12.5px;
          color: var(--ct-ink-muted);
          line-height: 1.55;
        }

        .ct-response-note svg { color: var(--ct-green); flex-shrink: 0; margin-top: 1px; }
        .ct-response-note strong { color: var(--ct-ink); font-weight: 700; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .ct-layout {
            grid-template-columns: 1fr;
            margin-top: -40px;
          }
          .ct-info-col { order: -1; }
        }

        @media (max-width: 600px) {
          .ct-form-card { padding: 28px 22px 32px; }
          .ct-field-row { grid-template-columns: 1fr; }
          .ct-layout { padding: 0 16px; }
        }
      `})]})},x4=async()=>(await xe.get(a2.GET)).data,g4=()=>{const e=Zt(),[t,a]=b.useState(null),[n,i]=b.useState(!0),[r,s]=b.useState("mission");if(b.useEffect(()=>{x4().then(a).catch(console.error).finally(()=>i(!1))},[]),n)return l.jsxs(l.Fragment,{children:[l.jsx(wn,{}),l.jsxs("div",{className:"ab-loading",children:[l.jsx("span",{className:"ab-loader"}),l.jsx("p",{className:"ab-loading-title",children:"Srinu tech Guru"}),l.jsx("p",{className:"ab-loading-sub",children:"Preparing your experience…"})]}),l.jsx(mf,{})]});if(!t)return null;const o=[{id:"mission",label:"Mission",icon:l.jsx(Ao,{size:16})},{id:"vision",label:"Vision",icon:l.jsx(Ji,{size:16})},{id:"values",label:"Values",icon:l.jsx(st,{size:16})}],c=[{n:"01",icon:l.jsx(Qy,{size:24}),title:"Industry-Relevant Curriculum",text:"Learn cutting-edge technologies used by leading companies. Our curriculum is continuously updated to reflect current industry standards and best practices.",tag:"Updated monthly",tagIcon:l.jsx(st,{size:13}),tagColor:"var(--ab-green)"},{n:"02",icon:l.jsx(Fe,{size:24}),title:"World-Class Instructors",text:"Learn from industry veterans with decades of combined experience. Our instructors are practitioners who bring real-world insight to every lesson.",tag:"Expert mentors",tagIcon:l.jsx(fn,{size:13}),tagColor:"var(--ab-amber)"},{n:"03",icon:l.jsx(Wp,{size:24}),title:"Hands-On Projects",text:"Build a portfolio of real-world projects. Every course includes practical assignments designed to simulate actual workplace scenarios.",tag:"100+ projects",tagIcon:l.jsx(is,{size:13}),tagColor:"var(--ab-rose)"},{n:"04",icon:l.jsx(Ia,{size:24}),title:"Thriving Community",text:"Join a global network of ambitious learners and professionals. Collaborate, share knowledge, and build connections that last beyond the courses.",tag:"Active community",tagIcon:l.jsx(Ia,{size:13}),tagColor:"var(--ab-blue)"},{n:"05",icon:l.jsx(Qa,{size:24}),title:"Flexible Learning",text:"Learn at your own pace with lifetime access to all course materials. Our flexible format fits seamlessly into any schedule.",tag:"Learn anytime",tagIcon:l.jsx(Qa,{size:13}),tagColor:"var(--ab-violet)"},{n:"06",icon:l.jsx(_l,{size:24}),title:"Verified Certificates",text:"Earn industry-recognised certificates upon completion. Showcase achievements on LinkedIn and your résumé to stand out to employers.",tag:"Verified certificates",tagIcon:l.jsx(_l,{size:13}),tagColor:"var(--ab-green)"}],d=[{initials:"RK",name:"Rajesh Kumar",title:"Full Stack Developer",text:"Srinu tech Guru transformed my career. The courses are incredibly well-structured and the instructors genuinely care about student success. Within 6 months I landed my dream job."},{initials:"PS",name:"Priya Sharma",title:"Data Analyst",text:"The hands-on projects and real-world scenarios make all the difference. I feel confident applying what I've learned immediately at work. Best career investment I've made."},{initials:"AP",name:"Arun Patel",title:"Product Manager",text:"Outstanding platform with exceptional content quality. The community support is incredible and the flexible format allowed me to upskill while working full-time."}],p=[{icon:l.jsx(_l,{size:20}),title:"Integrity",text:"Honest, transparent, and ethical in all we do"},{icon:l.jsx(Wp,{size:20}),title:"Innovation",text:"Constantly evolving and improving our platform"},{icon:l.jsx(Ao,{size:20}),title:"Excellence",text:"Delivering only the highest-quality content"},{icon:l.jsx(Qp,{size:20}),title:"Inclusivity",text:"Making education accessible to everyone"}];return l.jsxs(l.Fragment,{children:[l.jsx(wn,{}),l.jsxs("section",{className:"ab-hero",children:[l.jsx("div",{className:"ab-hero-grid"}),l.jsxs("div",{className:"ab-hero-inner",children:[l.jsx("p",{className:"ab-eyebrow",children:"Online Learning Platform"}),l.jsxs("h1",{className:"ab-wordmark",children:[l.jsx("span",{className:"ab-w-white",children:"Srinu tech Guru"}),l.jsx("span",{className:"ab-w-gold",children:" Learning"})]}),l.jsx("p",{className:"ab-hero-sub",children:"Where Learning Meets Excellence"}),l.jsx("p",{className:"ab-tagline",children:t.tagline}),l.jsxs("div",{className:"ab-pill-row",children:[l.jsxs("span",{className:"ab-pill",children:[l.jsx(Ji,{size:14})," Transform Skills"]}),l.jsxs("span",{className:"ab-pill",children:[l.jsx(jr,{size:14})," Accelerate Growth"]}),l.jsxs("span",{className:"ab-pill",children:[l.jsx(is,{size:14})," Excel Career"]})]}),l.jsxs("div",{className:"ab-trust-strip",children:[l.jsxs("span",{className:"ab-trust-item",children:[l.jsx(_l,{size:15})," Certified Programs"]}),l.jsx("span",{className:"ab-trust-dot"}),l.jsxs("span",{className:"ab-trust-item",children:[l.jsx(Qp,{size:15})," Global Community"]}),l.jsx("span",{className:"ab-trust-dot"}),l.jsxs("span",{className:"ab-trust-item",children:[l.jsx(fn,{size:15})," Top Rated Platform"]})]})]}),l.jsx("div",{className:"ab-ring ab-ring-1"}),l.jsx("div",{className:"ab-ring ab-ring-2"})]}),l.jsx("div",{className:"ab-stats-wrap",children:l.jsx("div",{className:"ab-stats-grid",children:[{icon:l.jsx(Ia,{size:28}),num:`${t.stats.activeLearners.toLocaleString()}+`,label:"Active Learners",desc:"Students worldwide",badge:"+15% this month",color:"var(--ab-accent)"},{icon:l.jsx(Fe,{size:28}),num:`${t.stats.courses}+`,label:"Premium Courses",desc:"Expert-crafted paths",badge:"100+ new this year",color:"var(--ab-rose)"},{icon:l.jsx(Kd,{size:28}),num:`${t.stats.satisfaction}%`,label:"Satisfaction Rate",desc:"Highly rated by community",badge:"4.9 / 5 avg rating",color:"var(--ab-green)"}].map((f,u)=>l.jsxs("div",{className:"ab-stat-card",children:[l.jsx("div",{className:"ab-stat-icon",style:{background:f.color},children:f.icon}),l.jsxs("div",{className:"ab-stat-body",children:[l.jsx("p",{className:"ab-stat-num",children:f.num}),l.jsx("p",{className:"ab-stat-label",children:f.label}),l.jsx("p",{className:"ab-stat-desc",children:f.desc})]}),l.jsx("span",{className:"ab-stat-badge",children:f.badge})]},u))})}),l.jsx("section",{className:"ab-section ab-section--light",children:l.jsxs("div",{className:"ab-container",children:[l.jsxs("div",{className:"ab-section-header",children:[l.jsx("p",{className:"ab-section-eyebrow",children:"Who We Are"}),l.jsx("h2",{className:"ab-section-title",children:"Purpose & Principles"}),l.jsx("p",{className:"ab-section-sub",children:"Discover what drives Srinu tech Guru forward"})]}),l.jsx("div",{className:"ab-tab-bar",children:o.map(f=>l.jsxs("button",{className:`ab-tab${r===f.id?" ab-tab--active":""}`,onClick:()=>s(f.id),children:[f.icon,f.label]},f.id))}),l.jsxs("div",{className:"ab-tab-panel",children:[r==="mission"&&l.jsxs("div",{className:"ab-tab-content ab-fade",children:[l.jsx("div",{className:"ab-tab-icon ab-tab-icon--rose",children:l.jsx(Ao,{size:26})}),l.jsx("h3",{className:"ab-tab-title",children:"Empowering Through Education"}),l.jsx("p",{className:"ab-tab-text",children:"Our mission is to democratise education by providing world-class learning experiences that empower individuals to achieve their full potential. We believe quality education should be accessible to everyone, regardless of background or location."}),l.jsx("p",{className:"ab-tab-text",children:"We're committed to bridging the gap between academic knowledge and industry requirements, ensuring learners are equipped with practical, job-ready skills that make them stand out in today's market."})]}),r==="vision"&&l.jsxs("div",{className:"ab-tab-content ab-fade",children:[l.jsx("div",{className:"ab-tab-icon ab-tab-icon--amber",children:l.jsx(Ji,{size:26})}),l.jsx("h3",{className:"ab-tab-title",children:"Building Tomorrow's Leaders"}),l.jsx("p",{className:"ab-tab-text",children:"We envision a world where continuous learning is the norm, and every individual has the tools to transform their career and life. Srinu tech Guru aims to be the global leader in online education, recognised for innovative teaching methods and exceptional learning outcomes."}),l.jsx("p",{className:"ab-tab-text",children:"Our vision extends beyond courses — we're creating a thriving ecosystem of learners, educators, and industry professionals who collaborate, innovate, and grow together."})]}),r==="values"&&l.jsxs("div",{className:"ab-tab-content ab-fade",children:[l.jsx("div",{className:"ab-tab-icon ab-tab-icon--blue",children:l.jsx(st,{size:26})}),l.jsx("h3",{className:"ab-tab-title",children:"Principles That Guide Us"}),l.jsx("div",{className:"ab-values-grid",children:p.map((f,u)=>l.jsxs("div",{className:"ab-value-box",children:[l.jsx("span",{className:"ab-value-icon",children:f.icon}),l.jsx("h4",{className:"ab-value-title",children:f.title}),l.jsx("p",{className:"ab-value-text",children:f.text})]},u))})]})]})]})}),l.jsx("section",{className:"ab-section ab-section--white",children:l.jsxs("div",{className:"ab-container",children:[l.jsxs("div",{className:"ab-section-header",children:[l.jsx("p",{className:"ab-section-eyebrow",children:"Why Choose Us"}),l.jsx("h2",{className:"ab-section-title",children:"The Srinu tech Guru Advantage"}),l.jsx("p",{className:"ab-section-sub",children:"Learning designed for real-world success"})]}),l.jsx("div",{className:"ab-features-grid",children:c.map((f,u)=>l.jsxs("div",{className:"ab-feature-card",children:[l.jsx("span",{className:"ab-feature-num",children:f.n}),l.jsx("div",{className:"ab-feature-icon",children:f.icon}),l.jsx("h3",{className:"ab-feature-title",children:f.title}),l.jsx("p",{className:"ab-feature-text",children:f.text}),l.jsxs("div",{className:"ab-feature-tag",style:{color:f.tagColor},children:[f.tagIcon,l.jsx("span",{children:f.tag})]})]},u))})]})}),l.jsx("section",{className:"ab-section ab-section--light",children:l.jsxs("div",{className:"ab-container",children:[l.jsxs("div",{className:"ab-section-header",children:[l.jsx("p",{className:"ab-section-eyebrow",children:"Student Stories"}),l.jsx("h2",{className:"ab-section-title",children:"Trusted by Thousands"}),l.jsx("p",{className:"ab-section-sub",children:"Hear directly from our community"})]}),l.jsx("div",{className:"ab-testimonials-grid",children:d.map((f,u)=>l.jsxs("div",{className:"ab-testi-card",children:[l.jsx("div",{className:"ab-testi-quote",children:"“"}),l.jsx("p",{className:"ab-testi-text",children:f.text}),l.jsxs("div",{className:"ab-testi-footer",children:[l.jsxs("div",{className:"ab-testi-author",children:[l.jsx("span",{className:"ab-testi-avatar",children:f.initials}),l.jsxs("div",{children:[l.jsx("p",{className:"ab-testi-name",children:f.name}),l.jsx("p",{className:"ab-testi-role",children:f.title})]})]}),l.jsx("div",{className:"ab-stars",children:[...Array(5)].map((x,m)=>l.jsx(fn,{size:14},m))})]})]},u))})]})}),l.jsxs("section",{className:"ab-cta-section",children:[l.jsx("div",{className:"ab-cta-grid"}),l.jsxs("div",{className:"ab-cta-inner",children:[l.jsxs("p",{className:"ab-cta-eyebrow",children:[l.jsx(Ji,{size:13})," Start Your Journey Today"]}),l.jsx("h2",{className:"ab-cta-title",children:"Ready to Transform Your Career?"}),l.jsxs("p",{className:"ab-cta-sub",children:["Join over ",t.stats.activeLearners.toLocaleString(),"+ learners already upgrading their skills and achieving professional goals with Srinu tech Guru."]}),l.jsxs("div",{className:"ab-cta-actions",children:[l.jsxs("button",{className:"ab-cta-primary",onClick:()=>e("/"),children:["Explore Courses ",l.jsx(da,{size:16})]}),l.jsx("button",{className:"ab-cta-secondary",onClick:()=>e("/signup"),children:"Get Started Free"})]}),l.jsx("div",{className:"ab-cta-checks",children:["Free trial courses","No credit card required","Cancel anytime"].map(f=>l.jsxs("span",{className:"ab-cta-check",children:[l.jsx(st,{size:14})," ",f]},f))})]}),l.jsx("div",{className:"ab-cta-ring ab-cta-ring-1"}),l.jsx("div",{className:"ab-cta-ring ab-cta-ring-2"})]}),l.jsx(Gs,{}),l.jsx(mf,{})]})},mf=()=>l.jsx("style",{children:`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

    /* ── TOKENS ── */
    :root {
      --ab-ink:        #0e0f13;
      --ab-ink-soft:   #3d4154;
      --ab-ink-muted:  #8b90a8;
      --ab-surface:    #ffffff;
      --ab-surface-2:  #f6f6fb;
      --ab-surface-3:  #eeeef4;
      --ab-border:     #e3e3ed;
      --ab-accent:     #1a56db;
      --ab-accent-s:   #eef2fd;
      --ab-green:      #16a34a;
      --ab-green-s:    #f0fdf4;
      --ab-amber:      #b45309;
      --ab-amber-s:    #fffbeb;
      --ab-rose:       #be185d;
      --ab-rose-s:     #fdf2f8;
      --ab-blue:       #1d4ed8;
      --ab-blue-s:     #eff6ff;
      --ab-violet:     #7c3aed;
      --ab-gold:       #c9a84c;
      --ab-font-d:     'Playfair Display', Georgia, serif;
      --ab-font-b:     'DM Sans', 'Helvetica Neue', sans-serif;
      --ab-r-md:       10px;
      --ab-r-lg:       16px;
      --ab-r-xl:       24px;
      --ab-shadow:     0 1px 4px rgba(14,15,19,.06), 0 6px 20px rgba(14,15,19,.07);
      --ab-shadow-lg:  0 12px 40px rgba(14,15,19,.12), 0 3px 10px rgba(14,15,19,.06);
      --ab-t:          .22s cubic-bezier(.4,0,.2,1);
    }

    /* ── BASE ── */
    .ab-loading {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--ab-ink);
      gap: 14px;
      font-family: var(--ab-font-b);
    }
    .ab-loader {
      display: block;
      width: 40px; height: 40px;
      border: 3px solid rgba(255,255,255,.15);
      border-top-color: var(--ab-gold);
      border-radius: 50%;
      animation: ab-spin .7s linear infinite;
    }
    .ab-loading-title { font-family: var(--ab-font-d); font-size: 22px; color: #fff; font-weight: 700; margin: 0; }
    .ab-loading-sub   { font-size: 13px; color: rgba(255,255,255,.45); margin: 0; }
    @keyframes ab-spin { to { transform: rotate(360deg); } }

    /* ══════════════════════════════════
       HERO
    ══════════════════════════════════ */
    .ab-hero {
      position: relative;
      background: var(--ab-ink);
      padding: 110px 24px 160px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--ab-font-b);
    }

    .ab-hero-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
      background-size: 56px 56px;
      pointer-events: none;
    }

    /* decorative rings */
    .ab-ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid rgba(201,168,76,.12);
      pointer-events: none;
    }
    .ab-ring-1 { width: 600px; height: 600px; bottom: -260px; right: -160px; animation: ab-spin 80s linear infinite; }
    .ab-ring-2 { width: 340px; height: 340px; top: 40px; left: -100px; animation: ab-spin 60s linear infinite reverse; }

    .ab-hero-inner {
      position: relative;
      z-index: 2;
      text-align: center;
      max-width: 860px;
      animation: ab-fade-up .6s ease both;
    }

    @keyframes ab-fade-up {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .ab-eyebrow {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: var(--ab-gold);
      margin: 0 0 24px;
    }

    .ab-wordmark {
      font-family: var(--ab-font-d);
      font-size: clamp(52px, 8vw, 88px);
      font-weight: 800;
      line-height: 1.06;
      margin: 0 0 18px;
      letter-spacing: -0.02em;
    }

    .ab-w-white { color: #fff; }
    .ab-w-gold  { color: var(--ab-gold); font-style: italic; }

    .ab-hero-sub {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: rgba(255,255,255,.4);
      margin: 0 0 20px;
    }

    .ab-tagline {
      font-size: clamp(16px, 2.5vw, 20px);
      line-height: 1.75;
      color: rgba(255,255,255,.72);
      font-weight: 300;
      max-width: 640px;
      margin: 0 auto 44px;
    }

    /* Pills */
    .ab-pill-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
      margin-bottom: 40px;
    }

    .ab-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: rgba(255,255,255,.07);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 99px;
      color: rgba(255,255,255,.88);
      font-size: 13px;
      font-weight: 600;
      backdrop-filter: blur(8px);
      transition: background var(--ab-t), border-color var(--ab-t);
    }
    .ab-pill:hover { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.2); }

    /* Trust strip */
    .ab-trust-strip {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 16px;
      padding-top: 32px;
      border-top: 1px solid rgba(255,255,255,.08);
    }

    .ab-trust-item {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      color: rgba(255,255,255,.5);
      font-size: 12.5px;
      font-weight: 500;
    }

    .ab-trust-dot {
      width: 3px; height: 3px;
      border-radius: 50%;
      background: rgba(255,255,255,.2);
    }

    /* ══════════════════════════════════
       STATS
    ══════════════════════════════════ */
    .ab-stats-wrap {
      padding: 0 24px;
      margin-top: -80px;
      margin-bottom: 0;
      position: relative;
      z-index: 10;
    }

    .ab-stats-grid {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .ab-stat-card {
      background: var(--ab-surface);
      border: 1px solid var(--ab-border);
      border-radius: var(--ab-r-xl);
      box-shadow: var(--ab-shadow-lg);
      padding: 32px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      font-family: var(--ab-font-b);
      transition: transform var(--ab-t), box-shadow var(--ab-t);
    }
    .ab-stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 56px rgba(14,15,19,.14);
    }

    .ab-stat-icon {
      width: 52px; height: 52px;
      border-radius: var(--ab-r-md);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      flex-shrink: 0;
    }

    .ab-stat-body { flex: 1; }

    .ab-stat-num {
      font-family: var(--ab-font-d);
      font-size: 44px;
      font-weight: 800;
      color: var(--ab-ink);
      margin: 0 0 4px;
      line-height: 1;
      letter-spacing: -0.02em;
    }

    .ab-stat-label {
      font-size: 14px;
      font-weight: 700;
      color: var(--ab-ink);
      margin: 0 0 4px;
      letter-spacing: -0.01em;
    }

    .ab-stat-desc {
      font-size: 13px;
      color: var(--ab-ink-muted);
      margin: 0;
      font-weight: 400;
    }

    .ab-stat-badge {
      font-size: 11.5px;
      font-weight: 600;
      color: var(--ab-ink-muted);
      background: var(--ab-surface-2);
      border: 1px solid var(--ab-border);
      padding: 4px 10px;
      border-radius: 99px;
      align-self: flex-start;
    }

    /* ══════════════════════════════════
       SHARED SECTION LAYOUT
    ══════════════════════════════════ */
    .ab-section {
      padding: 100px 24px;
      font-family: var(--ab-font-b);
    }
    .ab-section--light { background: var(--ab-surface-2); }
    .ab-section--white { background: var(--ab-surface); }

    .ab-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .ab-section-header {
      text-align: center;
      margin-bottom: 60px;
    }

    .ab-section-eyebrow {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: var(--ab-accent);
      margin: 0 0 14px;
    }

    .ab-section-title {
      font-family: var(--ab-font-d);
      font-size: clamp(30px, 4vw, 48px);
      font-weight: 800;
      color: var(--ab-ink);
      margin: 0 0 14px;
      letter-spacing: -0.02em;
    }

    .ab-section-sub {
      font-size: 16px;
      color: var(--ab-ink-muted);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.7;
      font-weight: 400;
    }

    /* ══════════════════════════════════
       TABS
    ══════════════════════════════════ */
    .ab-tab-bar {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin-bottom: 32px;
      background: var(--ab-surface);
      border: 1px solid var(--ab-border);
      border-radius: var(--ab-r-lg);
      padding: 6px;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 40px;
    }

    .ab-tab {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      padding: 10px 16px;
      border: none;
      background: transparent;
      font-family: var(--ab-font-b);
      font-size: 13px;
      font-weight: 600;
      color: var(--ab-ink-muted);
      border-radius: var(--ab-r-md);
      cursor: pointer;
      transition: all var(--ab-t);
      white-space: nowrap;
    }
    .ab-tab--active {
      background: var(--ab-ink);
      color: #fff;
      box-shadow: 0 2px 8px rgba(14,15,19,.2);
    }
    .ab-tab:hover:not(.ab-tab--active) { color: var(--ab-ink); background: var(--ab-surface-3); }

    .ab-tab-panel {
      background: var(--ab-surface);
      border: 1px solid var(--ab-border);
      border-radius: var(--ab-r-xl);
      box-shadow: var(--ab-shadow);
      padding: 52px;
      min-height: 340px;
    }

    .ab-tab-content {
      max-width: 780px;
      margin: 0 auto;
      text-align: center;
    }

    .ab-fade {
      animation: ab-fade-up .35s ease both;
    }

    .ab-tab-icon {
      width: 56px; height: 56px;
      border-radius: var(--ab-r-md);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      margin-bottom: 24px;
    }
    .ab-tab-icon--rose   { background: var(--ab-rose); }
    .ab-tab-icon--amber  { background: var(--ab-amber); }
    .ab-tab-icon--blue   { background: var(--ab-blue); }

    .ab-tab-title {
      font-family: var(--ab-font-d);
      font-size: 26px;
      font-weight: 700;
      color: var(--ab-ink);
      margin: 0 0 20px;
    }

    .ab-tab-text {
      font-size: 15.5px;
      line-height: 1.8;
      color: var(--ab-ink-soft);
      margin: 0 0 16px;
      font-weight: 400;
    }

    /* Values grid */
    .ab-values-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      margin-top: 28px;
      text-align: left;
    }

    .ab-value-box {
      background: var(--ab-surface-2);
      border: 1px solid var(--ab-border);
      border-radius: var(--ab-r-md);
      padding: 20px 22px;
      transition: border-color var(--ab-t);
    }
    .ab-value-box:hover { border-color: var(--ab-accent); }

    .ab-value-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px; height: 36px;
      background: var(--ab-accent-s);
      color: var(--ab-accent);
      border-radius: var(--ab-r-md);
      margin-bottom: 10px;
    }

    .ab-value-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--ab-ink);
      margin: 0 0 5px;
    }

    .ab-value-text {
      font-size: 13px;
      color: var(--ab-ink-muted);
      margin: 0;
      line-height: 1.55;
    }

    /* ══════════════════════════════════
       FEATURES
    ══════════════════════════════════ */
    .ab-features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 18px;
    }

    .ab-feature-card {
      background: var(--ab-surface-2);
      border: 1px solid var(--ab-border);
      border-radius: var(--ab-r-xl);
      padding: 32px;
      position: relative;
      overflow: hidden;
      transition: transform var(--ab-t), box-shadow var(--ab-t), border-color var(--ab-t);
    }
    .ab-feature-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--ab-shadow-lg);
      border-color: rgba(26,86,219,.15);
    }

    .ab-feature-num {
      position: absolute;
      top: 20px;
      right: 24px;
      font-family: var(--ab-font-d);
      font-size: 56px;
      font-weight: 800;
      color: var(--ab-surface-3);
      line-height: 1;
      pointer-events: none;
    }

    .ab-feature-icon {
      width: 48px; height: 48px;
      border-radius: var(--ab-r-md);
      background: var(--ab-ink);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      position: relative;
      z-index: 1;
    }

    .ab-feature-title {
      font-family: var(--ab-font-d);
      font-size: 18px;
      font-weight: 700;
      color: var(--ab-ink);
      margin: 0 0 12px;
      line-height: 1.3;
    }

    .ab-feature-text {
      font-size: 13.5px;
      line-height: 1.75;
      color: var(--ab-ink-soft);
      margin: 0 0 20px;
      font-weight: 400;
    }

    .ab-feature-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 600;
    }

    /* ══════════════════════════════════
       TESTIMONIALS
    ══════════════════════════════════ */
    .ab-testimonials-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .ab-testi-card {
      background: var(--ab-surface);
      border: 1px solid var(--ab-border);
      border-radius: var(--ab-r-xl);
      padding: 36px;
      box-shadow: var(--ab-shadow);
      display: flex;
      flex-direction: column;
      transition: transform var(--ab-t), box-shadow var(--ab-t);
    }
    .ab-testi-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--ab-shadow-lg);
    }

    .ab-testi-quote {
      font-family: var(--ab-font-d);
      font-size: 72px;
      line-height: .8;
      color: var(--ab-border);
      margin-bottom: 16px;
      font-weight: 700;
    }

    .ab-testi-text {
      font-size: 14px;
      line-height: 1.8;
      color: var(--ab-ink-soft);
      font-style: italic;
      flex: 1;
      margin: 0 0 24px;
    }

    .ab-testi-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .ab-testi-author {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .ab-testi-avatar {
      width: 40px; height: 40px;
      border-radius: var(--ab-r-md);
      background: var(--ab-ink);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
    }

    .ab-testi-name {
      font-size: 13px;
      font-weight: 700;
      color: var(--ab-ink);
      margin: 0 0 2px;
    }

    .ab-testi-role {
      font-size: 12px;
      color: var(--ab-ink-muted);
      margin: 0;
    }

    .ab-stars {
      display: flex;
      gap: 2px;
      color: #f59e0b;
    }

    /* ══════════════════════════════════
       CTA
    ══════════════════════════════════ */
    .ab-cta-section {
      position: relative;
      background: var(--ab-ink);
      padding: 100px 24px;
      overflow: hidden;
      font-family: var(--ab-font-b);
    }

    .ab-cta-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px);
      background-size: 56px 56px;
      pointer-events: none;
    }

    .ab-cta-ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid rgba(201,168,76,.1);
      pointer-events: none;
    }
    .ab-cta-ring-1 { width: 500px; height: 500px; bottom: -200px; right: -120px; }
    .ab-cta-ring-2 { width: 280px; height: 280px; top: -80px;  left:  -60px; }

    .ab-cta-inner {
      position: relative;
      z-index: 2;
      max-width: 700px;
      margin: 0 auto;
      text-align: center;
    }

    .ab-cta-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: var(--ab-gold);
      margin: 0 0 20px;
    }

    .ab-cta-title {
      font-family: var(--ab-font-d);
      font-size: clamp(30px, 5vw, 52px);
      font-weight: 800;
      color: #fff;
      margin: 0 0 18px;
      letter-spacing: -0.02em;
    }

    .ab-cta-sub {
      font-size: 16px;
      line-height: 1.75;
      color: rgba(255,255,255,.6);
      margin: 0 0 44px;
      font-weight: 300;
    }

    .ab-cta-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 28px;
    }

    .ab-cta-primary {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      padding: 14px 32px;
      background: #fff;
      color: var(--ab-ink);
      border: none;
      border-radius: var(--ab-r-lg);
      font-family: var(--ab-font-b);
      font-size: 14.5px;
      font-weight: 700;
      cursor: pointer;
      transition: transform var(--ab-t), box-shadow var(--ab-t);
      box-shadow: 0 4px 16px rgba(255,255,255,.15);
    }
    .ab-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(255,255,255,.2); }

    .ab-cta-secondary {
      padding: 14px 32px;
      background: transparent;
      color: rgba(255,255,255,.8);
      border: 1px solid rgba(255,255,255,.2);
      border-radius: var(--ab-r-lg);
      font-family: var(--ab-font-b);
      font-size: 14.5px;
      font-weight: 600;
      cursor: pointer;
      transition: background var(--ab-t), border-color var(--ab-t), color var(--ab-t);
    }
    .ab-cta-secondary:hover { background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.4); color: #fff; }

    .ab-cta-checks {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
      padding-top: 24px;
      border-top: 1px solid rgba(255,255,255,.08);
    }

    .ab-cta-check {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      font-size: 13px;
      font-weight: 500;
      color: rgba(255,255,255,.5);
    }
    .ab-cta-check svg { color: #16a34a; }

    /* ── RESPONSIVE ── */
    @media (max-width: 1024px) {
      .ab-features-grid,
      .ab-testimonials-grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 768px) {
      .ab-stats-grid { grid-template-columns: 1fr; }
      .ab-features-grid,
      .ab-testimonials-grid { grid-template-columns: 1fr; }
      .ab-tab-panel { padding: 28px 20px; }
      .ab-values-grid { grid-template-columns: 1fr; }
      .ab-hero { padding: 80px 20px 130px; }
    }

    @media (max-width: 540px) {
      .ab-tab-bar { max-width: 100%; }
      .ab-cta-actions { flex-direction: column; }
      .ab-cta-primary, .ab-cta-secondary { width: 100%; justify-content: center; }
    }
  `}),m4=({children:e})=>{const[t,a]=b.useState(!0),n=Zt(),i=As(),r=[{id:"dashboard",label:"Dashboard",icon:l.jsx(Vx,{size:20}),path:"/admin"},{id:"users",label:"Users",icon:l.jsx(jl,{size:20}),path:"/admin/users"},{id:"courses",label:"Courses",icon:l.jsx(Fe,{size:20}),path:"/admin/courses"},{id:"messages",label:"Messages",icon:l.jsx(Fa,{size:20}),path:"/admin/messages"},{id:"complete-manager",label:"Course Manager",icon:l.jsx(Fe,{size:20}),path:"/admin/complete-manager"}],s=()=>{window.confirm("Are you sure you want to logout?")&&(localStorage.removeItem("adminUser"),n("/login"))};return l.jsxs("div",{style:Ae.container,children:[l.jsxs("aside",{style:{...Ae.sidebar,width:t?"280px":"80px"},children:[l.jsx("div",{style:Ae.sidebarHeader,children:l.jsxs("div",{style:Ae.logo,children:[l.jsx("div",{style:Ae.logoIcon,children:"A"}),t&&l.jsx("span",{style:Ae.logoText,children:"Admin Panel"})]})}),l.jsx("nav",{style:Ae.nav,children:r.map(o=>l.jsxs("button",{onClick:()=>n(o.path),style:{...Ae.navItem,...i.pathname===o.path?Ae.navItemActive:{}},children:[l.jsx("span",{style:Ae.navIcon,children:o.icon}),t&&l.jsx("span",{style:Ae.navLabel,children:o.label})]},o.id))}),l.jsxs("button",{style:Ae.logoutButton,onClick:s,children:[l.jsx(rs,{size:20}),t&&l.jsx("span",{children:"Logout"})]})]}),l.jsxs("main",{style:Ae.main,children:[l.jsxs("header",{style:Ae.header,children:[l.jsx("button",{onClick:()=>a(!t),style:Ae.menuButton,children:t?l.jsx(et,{size:24}):l.jsx(Jd,{size:24})}),l.jsx("div",{style:Ae.headerRight,children:l.jsxs("div",{style:Ae.adminProfile,children:[l.jsx("div",{style:Ae.adminAvatar,children:"A"}),l.jsx("span",{style:Ae.adminName,children:"Admin"})]})})]}),l.jsx("div",{style:Ae.content,children:e})]})]})},Ae={container:{display:"flex",minHeight:"100vh",background:"#f3f4f6"},sidebar:{background:"#1f2937",display:"flex",flexDirection:"column",transition:"width 0.3s ease",position:"sticky",top:0,height:"100vh",overflow:"hidden",flexShrink:0},sidebarHeader:{padding:"24px",borderBottom:"1px solid rgba(255,255,255,0.1)",background:"#1f2937"},logo:{display:"flex",alignItems:"center",gap:"12px"},logoIcon:{width:"40px",height:"40px",borderRadius:"10px",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",fontWeight:"bold",flexShrink:0},logoText:{fontSize:"18px",fontWeight:700,color:"white",whiteSpace:"nowrap",overflow:"hidden"},nav:{flex:1,padding:"16px",display:"flex",flexDirection:"column",gap:"8px",background:"#1f2937",overflow:"hidden"},navItem:{display:"flex",alignItems:"center",gap:"12px",padding:"12px 16px",borderRadius:"10px",color:"#9ca3af",fontSize:"15px",fontWeight:500,cursor:"pointer",transition:"all 0.2s",textDecoration:"none",border:"none",background:"transparent",width:"100%",textAlign:"left",whiteSpace:"nowrap",overflow:"hidden"},navItemActive:{background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white"},navIcon:{display:"flex",alignItems:"center",flexShrink:0},navLabel:{overflow:"hidden"},logoutButton:{margin:"16px",padding:"12px 16px",borderRadius:"10px",border:"none",background:"#ef4444",color:"white",fontSize:"15px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"12px",justifyContent:"center",whiteSpace:"nowrap",overflow:"hidden"},main:{flex:1,display:"flex",flexDirection:"column",background:"#f3f4f6",minWidth:0},header:{background:"white",padding:"20px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #e5e7eb",position:"sticky",top:0,zIndex:10},menuButton:{width:"44px",height:"44px",borderRadius:"10px",border:"none",background:"#f3f4f6",color:"#1f2937",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},headerRight:{display:"flex",alignItems:"center",gap:"16px"},adminProfile:{display:"flex",alignItems:"center",gap:"12px"},adminAvatar:{width:"40px",height:"40px",borderRadius:"50%",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",fontWeight:"bold"},adminName:{fontSize:"15px",fontWeight:600,color:"#1f2937"},content:{flex:1,overflow:"auto",padding:"32px",background:"#f3f4f6"}},b4=Lx,y4=()=>{var d,p,f,u;const[e,t]=b.useState(null),[a,n]=b.useState(!0),[i,r]=b.useState(null),[s,o]=b.useState(!1);b.useEffect(()=>{c()},[]);const c=async(x=!1)=>{try{x?o(!0):n(!0),r(null),console.log("📊 Fetching dashboard stats...");const m=await fetch(`${b4}/dashboard/stats`);if(!m.ok)throw new Error(`HTTP error! status: ${m.status}`);const j=await m.json();console.log("✅ Dashboard data loaded:",j),t(j)}catch(m){console.error("❌ Error fetching stats:",m),r(m.message)}finally{n(!1),o(!1)}};return a?l.jsx("div",{style:_.loadingContainer,children:l.jsxs("div",{style:_.loadingContent,children:[l.jsxs("div",{style:_.modernSpinner,children:[l.jsx("div",{style:_.spinnerRing}),l.jsx("div",{style:_.spinnerRing}),l.jsx("div",{style:_.spinnerRing})]}),l.jsx("h3",{style:_.loadingTitle,children:"Loading Dashboard"}),l.jsx("p",{style:_.loadingText,children:"Fetching your analytics..."})]})}):i?l.jsx("div",{style:_.errorContainer,children:l.jsxs("div",{style:_.errorContent,children:[l.jsx("div",{style:_.errorIcon,children:"⚠️"}),l.jsx("h2",{style:_.errorTitle,children:"Oops! Something went wrong"}),l.jsx("p",{style:_.errorText,children:i}),l.jsxs("button",{onClick:()=>c(),style:_.retryButton,children:[l.jsx(bi,{size:20}),"Try Again"]}),l.jsxs("div",{style:_.errorTips,children:[l.jsx("p",{style:_.tipTitle,children:"💡 Quick Troubleshooting:"}),l.jsxs("ul",{style:_.tipList,children:[l.jsx("li",{children:"Check if the backend is running on port 5000"}),l.jsx("li",{children:"Verify CORS is configured in Program.cs"}),l.jsx("li",{children:"Ensure the database connection is active"})]})]})]})}):l.jsxs("div",{style:_.container,children:[l.jsxs("div",{style:_.header,children:[l.jsxs("div",{children:[l.jsx("h1",{style:_.title,children:"📊 Dashboard Overview"}),l.jsx("p",{style:_.subtitle,children:"Welcome back! Here's what's happening today."})]}),l.jsxs("button",{onClick:()=>c(!0),style:{..._.refreshButton,...s?_.refreshButtonActive:{}},disabled:s,children:[l.jsx(bi,{size:20,style:{transform:s?"rotate(360deg)":"none",transition:"transform 0.5s"}}),s?"Refreshing...":"Refresh"]})]}),l.jsxs("div",{style:_.statsGrid,children:[l.jsxs("div",{style:{..._.statCard,..._.statCard1},children:[l.jsx("div",{style:_.statIcon,children:l.jsx(jl,{size:32,color:"#667eea"})}),l.jsxs("div",{style:_.statContent,children:[l.jsx("p",{style:_.statLabel,children:"Total Users"}),l.jsx("h2",{style:_.statValue,children:((d=e==null?void 0:e.totalUsers)==null?void 0:d.toLocaleString())||0}),l.jsxs("div",{style:_.statBadge,children:[l.jsx(jr,{size:14}),l.jsx("span",{children:"Active"})]})]}),l.jsx("div",{style:_.statGlow1})]}),l.jsxs("div",{style:{..._.statCard,..._.statCard2},children:[l.jsx("div",{style:_.statIcon,children:l.jsx(Fe,{size:32,color:"#f093fb"})}),l.jsxs("div",{style:_.statContent,children:[l.jsx("p",{style:_.statLabel,children:"Total Courses"}),l.jsx("h2",{style:_.statValue,children:((p=e==null?void 0:e.totalCourses)==null?void 0:p.toLocaleString())||0}),l.jsxs("div",{style:_.statBadge,children:[l.jsx(fn,{size:14}),l.jsx("span",{children:"Published"})]})]}),l.jsx("div",{style:_.statGlow2})]}),l.jsxs("div",{style:{..._.statCard,..._.statCard3},children:[l.jsx("div",{style:_.statIcon,children:l.jsx(Ia,{size:32,color:"#4ade80"})}),l.jsxs("div",{style:_.statContent,children:[l.jsx("p",{style:_.statLabel,children:"Enrollments"}),l.jsx("h2",{style:_.statValue,children:((f=e==null?void 0:e.totalEnrollments)==null?void 0:f.toLocaleString())||0}),l.jsxs("div",{style:_.statBadge,children:[l.jsx(jr,{size:14}),l.jsx("span",{children:"Growing"})]})]}),l.jsx("div",{style:_.statGlow3})]}),l.jsxs("div",{style:{..._.statCard,..._.statCard4},children:[l.jsx("div",{style:_.statIcon,children:l.jsx(qx,{size:32,color:"#fbbf24"})}),l.jsxs("div",{style:_.statContent,children:[l.jsx("p",{style:_.statLabel,children:"Total Revenue"}),l.jsxs("h2",{style:_.statValue,children:["₹",((u=e==null?void 0:e.totalRevenue)==null?void 0:u.toLocaleString())||0]}),l.jsxs("div",{style:_.statBadge,children:[l.jsx(jr,{size:14}),l.jsx("span",{children:"+12.5%"})]})]}),l.jsx("div",{style:_.statGlow4})]})]}),l.jsxs("div",{style:_.contentGrid,children:[l.jsxs("div",{style:_.section,children:[l.jsxs("div",{style:_.sectionHeader,children:[l.jsxs("div",{children:[l.jsx("h2",{style:_.sectionTitle,children:"🎓 Recent Enrollments"}),l.jsx("p",{style:_.sectionSubtitle,children:"Latest student registrations"})]}),l.jsx(Qa,{size:24,color:"#9ca3af"})]}),e!=null&&e.recentEnrollments&&e.recentEnrollments.length>0?l.jsx("div",{style:_.enrollmentList,children:e.recentEnrollments.map((x,m)=>l.jsxs("div",{style:{..._.enrollmentItem,animationDelay:`${m*.1}s`},children:[l.jsx("div",{style:_.enrollmentAvatar,children:x.userName.charAt(0).toUpperCase()}),l.jsxs("div",{style:_.enrollmentContent,children:[l.jsx("h4",{style:_.enrollmentName,children:x.userName}),l.jsx("p",{style:_.enrollmentCourse,children:x.courseName})]}),l.jsx("div",{style:_.enrollmentDate,children:new Date(x.enrolledAt).toLocaleDateString("en-US",{month:"short",day:"numeric"})})]},x.id))}):l.jsxs("div",{style:_.emptyState,children:[l.jsx("div",{style:_.emptyIcon,children:"📚"}),l.jsx("p",{style:_.emptyText,children:"No enrollments yet"}),l.jsx("p",{style:_.emptySubtext,children:"Start by adding some courses!"})]})]}),l.jsxs("div",{style:_.section,children:[l.jsxs("div",{style:_.sectionHeader,children:[l.jsxs("div",{children:[l.jsx("h2",{style:_.sectionTitle,children:"🔥 Popular Courses"}),l.jsx("p",{style:_.sectionSubtitle,children:"Top performing courses"})]}),l.jsx(fn,{size:24,color:"#fbbf24"})]}),e!=null&&e.popularCourses&&e.popularCourses.length>0?l.jsx("div",{style:_.courseGrid,children:e.popularCourses.map((x,m)=>l.jsxs("div",{style:{..._.courseCard,animationDelay:`${m*.1}s`},children:[l.jsxs("div",{style:_.courseImageContainer,children:[l.jsx("img",{src:x.imageUrl||"https://via.placeholder.com/300x160/667eea/ffffff?text=Course",alt:x.title,style:_.courseImage,onError:j=>{j.target.src="https://via.placeholder.com/300x160/667eea/ffffff?text=Course"}}),l.jsx("div",{style:_.courseOverlay,children:l.jsxs("div",{style:_.enrollmentBadge,children:[l.jsx(Ia,{size:16}),l.jsx("span",{children:x.enrollmentCount})]})})]}),l.jsxs("div",{style:_.courseInfo,children:[l.jsx("h4",{style:_.courseTitle,children:x.title}),l.jsxs("p",{style:_.courseEnrollments,children:[x.enrollmentCount," ",x.enrollmentCount===1?"student":"students"]})]})]},x.id))}):l.jsxs("div",{style:_.emptyState,children:[l.jsx("div",{style:_.emptyIcon,children:"🎯"}),l.jsx("p",{style:_.emptyText,children:"No popular courses yet"}),l.jsx("p",{style:_.emptySubtext,children:"Courses will appear here as students enroll!"})]})]})]})]})},_={container:{maxWidth:"1600px",margin:"0 auto",padding:"0"},header:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"32px",flexWrap:"wrap",gap:"16px"},title:{fontSize:"36px",fontWeight:900,background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",margin:"0 0 8px 0",letterSpacing:"-0.5px"},subtitle:{fontSize:"16px",color:"#6b7280",margin:0},refreshButton:{display:"flex",alignItems:"center",gap:"8px",padding:"12px 24px",background:"white",border:"2px solid #e5e7eb",borderRadius:"12px",color:"#1f2937",fontSize:"15px",fontWeight:600,cursor:"pointer",transition:"all 0.3s ease"},refreshButtonActive:{background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",borderColor:"transparent"},statsGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"24px",marginBottom:"32px"},statCard:{position:"relative",background:"white",borderRadius:"24px",padding:"28px",display:"flex",gap:"20px",alignItems:"flex-start",boxShadow:"0 4px 20px rgba(0,0,0,0.06)",overflow:"hidden",transition:"all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",cursor:"pointer",animation:"slideUp 0.6s ease-out"},statCard1:{animationDelay:"0s"},statCard2:{animationDelay:"0.1s"},statCard3:{animationDelay:"0.2s"},statCard4:{animationDelay:"0.3s"},statIcon:{width:"64px",height:"64px",borderRadius:"16px",background:"linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},statContent:{flex:1},statLabel:{fontSize:"14px",color:"#6b7280",fontWeight:600,marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.5px"},statValue:{fontSize:"36px",fontWeight:900,color:"#1f2937",margin:"0 0 8px 0",lineHeight:1},statBadge:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"4px 12px",background:"#dcfce7",color:"#16a34a",borderRadius:"20px",fontSize:"12px",fontWeight:700},statGlow1:{position:"absolute",top:"-50%",right:"-50%",width:"200px",height:"200px",background:"radial-gradient(circle, rgba(102, 126, 234, 0.15), transparent)",borderRadius:"50%"},statGlow2:{position:"absolute",top:"-50%",right:"-50%",width:"200px",height:"200px",background:"radial-gradient(circle, rgba(240, 147, 251, 0.15), transparent)",borderRadius:"50%"},statGlow3:{position:"absolute",top:"-50%",right:"-50%",width:"200px",height:"200px",background:"radial-gradient(circle, rgba(74, 222, 128, 0.15), transparent)",borderRadius:"50%"},statGlow4:{position:"absolute",top:"-50%",right:"-50%",width:"200px",height:"200px",background:"radial-gradient(circle, rgba(251, 191, 36, 0.15), transparent)",borderRadius:"50%"},contentGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(450px, 1fr))",gap:"24px"},section:{background:"white",borderRadius:"24px",padding:"28px",boxShadow:"0 4px 20px rgba(0,0,0,0.06)",animation:"slideUp 0.6s ease-out 0.4s both"},sectionHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},sectionTitle:{fontSize:"22px",fontWeight:800,color:"#1f2937",margin:"0 0 4px 0"},sectionSubtitle:{fontSize:"14px",color:"#9ca3af",margin:0},enrollmentList:{display:"flex",flexDirection:"column",gap:"12px"},enrollmentItem:{display:"flex",alignItems:"center",gap:"16px",padding:"16px",background:"#f9fafb",borderRadius:"16px",transition:"all 0.3s ease",cursor:"pointer",animation:"fadeIn 0.5s ease-out"},enrollmentAvatar:{width:"48px",height:"48px",borderRadius:"12px",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",fontWeight:700,flexShrink:0},enrollmentContent:{flex:1,minWidth:0},enrollmentName:{fontSize:"16px",fontWeight:700,color:"#1f2937",margin:"0 0 4px 0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},enrollmentCourse:{fontSize:"14px",color:"#6b7280",margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},enrollmentDate:{fontSize:"13px",color:"#9ca3af",fontWeight:600,flexShrink:0},courseGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))",gap:"16px"},courseCard:{background:"#f9fafb",borderRadius:"16px",overflow:"hidden",transition:"all 0.3s ease",cursor:"pointer",animation:"fadeIn 0.5s ease-out"},courseImageContainer:{position:"relative",width:"100%",paddingTop:"56.25%",overflow:"hidden"},courseImage:{position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover"},courseOverlay:{position:"absolute",top:"12px",right:"12px"},enrollmentBadge:{display:"flex",alignItems:"center",gap:"6px",padding:"6px 12px",background:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(10px)",borderRadius:"20px",fontSize:"13px",fontWeight:700,color:"#1f2937",boxShadow:"0 2px 10px rgba(0,0,0,0.1)"},courseInfo:{padding:"16px"},courseTitle:{fontSize:"15px",fontWeight:700,color:"#1f2937",margin:"0 0 6px 0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},courseEnrollments:{fontSize:"13px",color:"#6b7280",margin:0},emptyState:{textAlign:"center",padding:"60px 20px"},emptyIcon:{fontSize:"64px",marginBottom:"16px"},emptyText:{fontSize:"18px",fontWeight:700,color:"#1f2937",margin:"0 0 8px 0"},emptySubtext:{fontSize:"15px",color:"#9ca3af",margin:0},loadingContainer:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"600px"},loadingContent:{textAlign:"center"},modernSpinner:{position:"relative",width:"80px",height:"80px",margin:"0 auto 24px"},spinnerRing:{position:"absolute",width:"100%",height:"100%",border:"4px solid transparent",borderTopColor:"#667eea",borderRadius:"50%",animation:"spin 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite"},loadingTitle:{fontSize:"24px",fontWeight:800,color:"#1f2937",margin:"0 0 8px 0"},loadingText:{fontSize:"16px",color:"#6b7280",margin:0},errorContainer:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"600px",padding:"20px"},errorContent:{maxWidth:"500px",textAlign:"center",background:"white",padding:"48px",borderRadius:"24px",boxShadow:"0 10px 40px rgba(0,0,0,0.1)"},errorIcon:{fontSize:"64px",marginBottom:"24px"},errorTitle:{fontSize:"28px",fontWeight:800,color:"#1f2937",margin:"0 0 12px 0"},errorText:{fontSize:"16px",color:"#6b7280",marginBottom:"32px",lineHeight:1.6},retryButton:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"14px 32px",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",border:"none",borderRadius:"12px",fontSize:"16px",fontWeight:700,cursor:"pointer",transition:"all 0.3s ease",boxShadow:"0 4px 16px rgba(102, 126, 234, 0.3)"},errorTips:{marginTop:"32px",padding:"20px",background:"#f9fafb",borderRadius:"12px",textAlign:"left"},tipTitle:{fontSize:"14px",fontWeight:700,color:"#1f2937",marginBottom:"12px"},tipList:{margin:0,paddingLeft:"20px",fontSize:"14px",color:"#6b7280",lineHeight:1.8}},zg=document.createElement("style");zg.textContent=`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  [style*="statCard"]:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.12) !important;
  }
  
  [style*="enrollmentItem"]:hover {
    background: white !important;
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
  
  [style*="courseCard"]:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  }
  
  [style*="courseCard"]:hover img {
    transform: scale(1.05);
  }
  
  [style*="refreshButton"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1) !important;
  }
  
  [style*="retryButton"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4) !important;
  }
  
  [style*="courseImage"] {
    transition: transform 0.3s ease;
  }
  
  [style*="modernSpinner"] div:nth-child(1) {
    animation-delay: -0.45s;
  }
  
  [style*="modernSpinner"] div:nth-child(2) {
    animation-delay: -0.3s;
  }
  
  [style*="modernSpinner"] div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;document.head.appendChild(zg);const Go=Ht,v4=()=>{const[e,t]=b.useState([]),[a,n]=b.useState(!0),[i,r]=b.useState(""),[s,o]=b.useState(1),[c,d]=b.useState(1),[p,f]=b.useState(0),[u,x]=b.useState(null),[m,j]=b.useState("");b.useEffect(()=>{w()},[s]);const w=async()=>{try{n(!0);const k=await(await fetch(`${Go}/Admin/users?page=${s}&pageSize=10`)).json();t(k.users),d(k.totalPages),f(k.totalUsers)}catch(y){console.error("Error loading users:",y)}finally{n(!1)}},h=async y=>{try{(await fetch(`${Go}/Admin/users/${y}/role`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({role:m})})).ok&&(alert("Role updated successfully!"),x(null),w())}catch(k){console.error("Error updating role:",k),alert("Failed to update role")}},g=async(y,k)=>{if(confirm(`Are you sure you want to delete user "${k}"?`))try{(await fetch(`${Go}/Admin/users/${y}`,{method:"DELETE"})).ok&&(alert("User deleted successfully!"),w())}catch(G){console.error("Error deleting user:",G),alert("Failed to delete user")}},v=e.filter(y=>y.fullName.toLowerCase().includes(i.toLowerCase())||y.email.toLowerCase().includes(i.toLowerCase()));return a?l.jsxs("div",{style:Z.loadingContainer,children:[l.jsx("div",{style:Z.spinner}),l.jsx("p",{style:Z.loadingText,children:"Loading users..."})]}):l.jsxs("div",{style:Z.container,children:[l.jsxs("div",{style:Z.header,children:[l.jsxs("div",{children:[l.jsx("h1",{style:Z.title,children:"User Management"}),l.jsx("p",{style:Z.subtitle,children:"Manage all registered users"})]}),l.jsxs("div",{style:Z.statsCard,children:[l.jsx("span",{style:Z.statsLabel,children:"Total Users"}),l.jsx("span",{style:Z.statsValue,children:p})]})]}),l.jsx("div",{style:Z.searchContainer,children:l.jsxs("div",{style:Z.searchWrapper,children:[l.jsx(vl,{size:20,style:Z.searchIcon}),l.jsx("input",{type:"text",placeholder:"Search users by name or email...",value:i,onChange:y=>r(y.target.value),style:Z.searchInput})]})}),l.jsxs("div",{style:Z.tableCard,children:[l.jsx("div",{style:Z.tableWrapper,children:l.jsxs("table",{style:Z.table,children:[l.jsx("thead",{children:l.jsxs("tr",{children:[l.jsx("th",{style:Z.th,children:"ID"}),l.jsx("th",{style:Z.th,children:"User"}),l.jsx("th",{style:Z.th,children:"Email"}),l.jsx("th",{style:Z.th,children:"Role"}),l.jsx("th",{style:Z.th,children:"Joined"}),l.jsx("th",{style:Z.th,children:"Actions"})]})}),l.jsx("tbody",{children:v.map(y=>l.jsxs("tr",{style:Z.tr,children:[l.jsx("td",{style:Z.td,children:y.id}),l.jsx("td",{style:Z.td,children:l.jsxs("div",{style:Z.userCell,children:[l.jsx("div",{style:Z.avatar,children:y.profileImageUrl?l.jsx("img",{src:Uy(y.profileImageUrl),alt:y.fullName,style:Z.avatarImage}):l.jsx("span",{style:Z.avatarText,children:y.fullName.charAt(0).toUpperCase()})}),l.jsx("span",{style:Z.userName,children:y.fullName})]})}),l.jsx("td",{style:Z.td,children:y.email}),l.jsx("td",{style:Z.td,children:(u==null?void 0:u.id)===y.id?l.jsxs("select",{value:m,onChange:k=>j(k.target.value),style:Z.roleSelect,children:[l.jsx("option",{value:"Student",children:"Student"}),l.jsx("option",{value:"Instructor",children:"Instructor"}),l.jsx("option",{value:"Admin",children:"Admin"})]}):l.jsx("span",{style:Z.roleBadge,children:y.role})}),l.jsx("td",{style:Z.td,children:new Date(y.createdAt).toLocaleDateString()}),l.jsx("td",{style:Z.td,children:l.jsx("div",{style:Z.actions,children:(u==null?void 0:u.id)===y.id?l.jsxs(l.Fragment,{children:[l.jsx("button",{onClick:()=>h(y.id),style:Z.saveButton,children:"Save"}),l.jsx("button",{onClick:()=>x(null),style:Z.cancelButton,children:"Cancel"})]}):l.jsxs(l.Fragment,{children:[l.jsx("button",{onClick:()=>{x(y),j(y.role)},style:Z.editButton,children:l.jsx(Wt,{size:16})}),l.jsx("button",{onClick:()=>g(y.id,y.fullName),style:Z.deleteButton,children:l.jsx($e,{size:16})})]})})})]},y.id))})]})}),l.jsxs("div",{style:Z.pagination,children:[l.jsxs("button",{onClick:()=>o(y=>Math.max(1,y-1)),disabled:s===1,style:{...Z.pageButton,...s===1?Z.pageButtonDisabled:{}},children:[l.jsx(ma,{size:20}),"Previous"]}),l.jsxs("span",{style:Z.pageInfo,children:["Page ",s," of ",c]}),l.jsxs("button",{onClick:()=>o(y=>Math.min(c,y+1)),disabled:s===c,style:{...Z.pageButton,...s===c?Z.pageButtonDisabled:{}},children:["Next",l.jsx(ba,{size:20})]})]})]})]})},Z={container:{padding:"32px",maxWidth:"1400px",margin:"0 auto"},loadingContainer:{minHeight:"80vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},spinner:{width:"50px",height:"50px",border:"4px solid #e5e7eb",borderTop:"4px solid #667eea",borderRadius:"50%",animation:"spin 1s linear infinite"},loadingText:{marginTop:"20px",fontSize:"16px",color:"#6b7280"},header:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"32px",flexWrap:"wrap",gap:"20px"},title:{fontSize:"32px",fontWeight:800,color:"#1f2937",margin:"0 0 8px 0"},subtitle:{fontSize:"16px",color:"#6b7280",margin:0},statsCard:{background:"linear-gradient(135deg, #667eea, #764ba2)",padding:"20px 32px",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"8px",alignItems:"center"},statsLabel:{fontSize:"14px",color:"rgba(255,255,255,0.9)",fontWeight:500},statsValue:{fontSize:"32px",fontWeight:800,color:"white"},searchContainer:{marginBottom:"24px"},searchWrapper:{position:"relative",maxWidth:"500px"},searchIcon:{position:"absolute",left:"16px",top:"50%",transform:"translateY(-50%)",color:"#9ca3af",pointerEvents:"none"},searchInput:{width:"100%",padding:"14px 16px 14px 48px",fontSize:"15px",border:"2px solid #e5e7eb",borderRadius:"12px",outline:"none",transition:"all 0.2s"},tableCard:{background:"white",borderRadius:"16px",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",overflow:"hidden"},tableWrapper:{overflowX:"auto"},table:{width:"100%",borderCollapse:"collapse"},th:{textAlign:"left",padding:"16px 20px",fontSize:"13px",fontWeight:600,color:"#6b7280",background:"#f9fafb",borderBottom:"2px solid #e5e7eb",textTransform:"uppercase",letterSpacing:"0.5px"},tr:{borderBottom:"1px solid #f3f4f6",transition:"background 0.2s"},td:{padding:"16px 20px",fontSize:"14px",color:"#1f2937"},userCell:{display:"flex",alignItems:"center",gap:"12px"},avatar:{width:"40px",height:"40px",borderRadius:"50%",background:"linear-gradient(135deg, #667eea, #764ba2)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0},avatarImage:{width:"100%",height:"100%",objectFit:"cover"},avatarText:{color:"white",fontSize:"16px",fontWeight:"bold"},userName:{fontWeight:600,color:"#1f2937"},roleBadge:{display:"inline-block",padding:"6px 12px",borderRadius:"8px",fontSize:"13px",fontWeight:600,background:"#f3f4f6",color:"#1f2937"},roleSelect:{padding:"6px 12px",borderRadius:"8px",border:"2px solid #667eea",fontSize:"13px",fontWeight:600,outline:"none"},actions:{display:"flex",gap:"8px"},editButton:{width:"36px",height:"36px",borderRadius:"8px",border:"none",background:"#eff6ff",color:"#3b82f6",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.2s"},deleteButton:{width:"36px",height:"36px",borderRadius:"8px",border:"none",background:"#fef2f2",color:"#ef4444",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.2s"},saveButton:{padding:"8px 16px",borderRadius:"8px",border:"none",background:"#10b981",color:"white",fontSize:"13px",fontWeight:600,cursor:"pointer"},cancelButton:{padding:"8px 16px",borderRadius:"8px",border:"none",background:"#6b7280",color:"white",fontSize:"13px",fontWeight:600,cursor:"pointer"},pagination:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 24px",borderTop:"1px solid #f3f4f6"},pageButton:{padding:"10px 16px",borderRadius:"8px",border:"2px solid #e5e7eb",background:"white",color:"#1f2937",fontSize:"14px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",transition:"all 0.2s"},pageButtonDisabled:{opacity:.5,cursor:"not-allowed"},pageInfo:{fontSize:"14px",color:"#6b7280",fontWeight:500}},Ng=document.createElement("style");Ng.textContent=`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  [style*="searchInput"]:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  [style*="tr"]:hover {
    background: #f9fafb !important;
  }
  
  button:hover:not(:disabled) {
    transform: translateY(-2px);
  }
  
  [style*="editButton"]:hover {
    background: #dbeafe !important;
  }
  
  [style*="deleteButton"]:hover {
    background: #fee2e2 !important;
  }
  
  [style*="pageButton"]:hover:not([style*="pageButtonDisabled"]) {
    border-color: #667eea !important;
    color: #667eea !important;
  }
`;document.head.appendChild(Ng);const bf=Ht,j4=()=>{const[e,t]=b.useState([]),[a,n]=b.useState(!0),[i,r]=b.useState(""),[s,o]=b.useState(1),[c,d]=b.useState(1),[p,f]=b.useState(0),[u,x]=b.useState("All"),[m,j]=b.useState(!1),w=["All","Development","Design","Marketing","IT & Software","Personal Growth"];b.useEffect(()=>{h()},[s]);const h=async()=>{try{n(!0);const k=await(await fetch(`${bf}/Admin/courses?page=${s}&pageSize=10`)).json();t(k.courses),d(k.totalPages),f(k.totalCourses)}catch(y){console.error("Error loading courses:",y)}finally{n(!1)}},g=async(y,k)=>{if(confirm(`Are you sure you want to delete "${k}"?`))try{(await fetch(`${bf}/Courses/${y}`,{method:"DELETE"})).ok&&(alert("Course deleted successfully!"),h())}catch(G){console.error("Error deleting course:",G),alert("Failed to delete course")}},v=e.filter(y=>{const k=y.title.toLowerCase().includes(i.toLowerCase())||y.category.toLowerCase().includes(i.toLowerCase()),G=u==="All"||y.category===u;return k&&G});return a?l.jsxs("div",{style:X.loadingContainer,children:[l.jsx("div",{style:X.spinner}),l.jsx("p",{style:X.loadingText,children:"Loading courses..."})]}):l.jsxs("div",{style:X.container,children:[l.jsxs("div",{style:X.header,children:[l.jsxs("div",{children:[l.jsx("h1",{style:X.title,children:"Course Management"}),l.jsx("p",{style:X.subtitle,children:"Manage all courses and content"})]}),l.jsxs("div",{style:X.headerActions,children:[l.jsxs("div",{style:X.statsCard,children:[l.jsx("span",{style:X.statsLabel,children:"Total Courses"}),l.jsx("span",{style:X.statsValue,children:p})]}),l.jsxs("button",{onClick:()=>j(!0),style:X.addButton,children:[l.jsx(Ya,{size:20}),l.jsx("span",{children:"Add Course"})]})]})]}),l.jsxs("div",{style:X.filtersContainer,children:[l.jsxs("div",{style:X.searchWrapper,children:[l.jsx(vl,{size:20,style:X.searchIcon}),l.jsx("input",{type:"text",placeholder:"Search courses by title or category...",value:i,onChange:y=>r(y.target.value),style:X.searchInput})]}),l.jsx("div",{style:X.categoryFilter,children:w.map(y=>l.jsx("button",{onClick:()=>x(y),style:{...X.categoryButton,...u===y?X.categoryButtonActive:{}},children:y},y))})]}),l.jsx("div",{style:X.coursesGrid,children:v.map(y=>l.jsxs("div",{style:X.courseCard,children:[l.jsxs("div",{style:X.courseImageContainer,children:[l.jsx("img",{src:y.imageUrl,alt:y.title,style:X.courseImage,onError:k=>{k.target.src="https://via.placeholder.com/400x200/667eea/ffffff?text=Course"}}),l.jsxs("div",{style:X.courseOverlay,children:[l.jsx("button",{style:X.overlayButton,children:l.jsx(ei,{size:18})}),l.jsx("button",{style:X.overlayButton,children:l.jsx(Wt,{size:18})}),l.jsx("button",{onClick:()=>g(y.id,y.title),style:{...X.overlayButton,background:"#ef4444"},children:l.jsx($e,{size:18})})]})]}),l.jsxs("div",{style:X.courseContent,children:[l.jsx("div",{style:X.categoryBadge,children:y.category}),l.jsx("h3",{style:X.courseTitle,children:y.title}),l.jsxs("p",{style:X.instructorName,children:["By ",y.instructorName]}),l.jsxs("div",{style:X.courseStats,children:[l.jsxs("div",{style:X.stat,children:[l.jsx("span",{style:X.statIcon,children:"⭐"}),l.jsx("span",{style:X.statText,children:y.rating.toFixed(1)})]}),l.jsxs("div",{style:X.stat,children:[l.jsx("span",{style:X.statIcon,children:"👥"}),l.jsx("span",{style:X.statText,children:y.studentCount.toLocaleString()})]}),l.jsxs("div",{style:X.stat,children:[l.jsx("span",{style:X.statIcon,children:"💰"}),l.jsxs("span",{style:X.statText,children:["₹",y.price.toFixed(0)]})]})]}),l.jsx("div",{style:X.courseFooter,children:l.jsxs("span",{style:X.createdDate,children:["Created ",new Date(y.createdAt).toLocaleDateString()]})})]})]},y.id))}),l.jsxs("div",{style:X.pagination,children:[l.jsxs("button",{onClick:()=>o(y=>Math.max(1,y-1)),disabled:s===1,style:{...X.pageButton,...s===1?X.pageButtonDisabled:{}},children:[l.jsx(ma,{size:20}),"Previous"]}),l.jsxs("span",{style:X.pageInfo,children:["Page ",s," of ",c]}),l.jsxs("button",{onClick:()=>o(y=>Math.min(c,y+1)),disabled:s===c,style:{...X.pageButton,...s===c?X.pageButtonDisabled:{}},children:["Next",l.jsx(ba,{size:20})]})]}),m&&l.jsx("div",{style:X.modalOverlay,onClick:()=>j(!1),children:l.jsxs("div",{style:X.modal,onClick:y=>y.stopPropagation(),children:[l.jsxs("div",{style:X.modalHeader,children:[l.jsx("h2",{style:X.modalTitle,children:"Add New Course"}),l.jsx("button",{onClick:()=>j(!1),style:X.modalClose,children:l.jsx(et,{size:24})})]}),l.jsxs("div",{style:X.modalBody,children:[l.jsx("p",{style:X.modalText,children:"Course creation form would go here. This would include fields for: title, description, price, category, instructor, etc."}),l.jsx("button",{style:X.modalButton,children:"Create Course"})]})]})})]})},X={container:{padding:"32px",maxWidth:"1400px",margin:"0 auto"},loadingContainer:{minHeight:"80vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},spinner:{width:"50px",height:"50px",border:"4px solid #e5e7eb",borderTop:"4px solid #667eea",borderRadius:"50%",animation:"spin 1s linear infinite"},loadingText:{marginTop:"20px",fontSize:"16px",color:"#6b7280"},header:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"32px",flexWrap:"wrap",gap:"20px"},title:{fontSize:"32px",fontWeight:800,color:"#1f2937",margin:"0 0 8px 0"},subtitle:{fontSize:"16px",color:"#6b7280",margin:0},headerActions:{display:"flex",gap:"16px",alignItems:"center"},statsCard:{background:"linear-gradient(135deg, #f093fb, #f5576c)",padding:"20px 32px",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"8px",alignItems:"center"},statsLabel:{fontSize:"14px",color:"rgba(255,255,255,0.9)",fontWeight:500},statsValue:{fontSize:"32px",fontWeight:800,color:"white"},addButton:{padding:"14px 24px",borderRadius:"12px",border:"none",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",fontSize:"15px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(102, 126, 234, 0.3)"},filtersContainer:{marginBottom:"32px",display:"flex",flexDirection:"column",gap:"16px"},searchWrapper:{position:"relative",maxWidth:"500px"},searchIcon:{position:"absolute",left:"16px",top:"50%",transform:"translateY(-50%)",color:"#9ca3af",pointerEvents:"none"},searchInput:{width:"100%",padding:"14px 16px 14px 48px",fontSize:"15px",border:"2px solid #e5e7eb",borderRadius:"12px",outline:"none",transition:"all 0.2s"},categoryFilter:{display:"flex",gap:"12px",flexWrap:"wrap"},categoryButton:{padding:"10px 20px",borderRadius:"10px",border:"2px solid #e5e7eb",background:"white",color:"#6b7280",fontSize:"14px",fontWeight:600,cursor:"pointer",transition:"all 0.2s"},categoryButtonActive:{background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",borderColor:"transparent"},coursesGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))",gap:"24px",marginBottom:"32px"},courseCard:{background:"white",borderRadius:"16px",overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",transition:"all 0.3s ease"},courseImageContainer:{position:"relative",height:"200px",overflow:"hidden"},courseImage:{width:"100%",height:"100%",objectFit:"cover"},courseOverlay:{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",opacity:0,transition:"opacity 0.3s"},overlayButton:{width:"44px",height:"44px",borderRadius:"50%",border:"none",background:"white",color:"#1f2937",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"transform 0.2s"},courseContent:{padding:"20px"},categoryBadge:{display:"inline-block",padding:"6px 12px",borderRadius:"8px",fontSize:"12px",fontWeight:600,background:"#eff6ff",color:"#3b82f6",marginBottom:"12px"},courseTitle:{fontSize:"18px",fontWeight:700,color:"#1f2937",margin:"0 0 8px 0",lineHeight:1.3,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"},instructorName:{fontSize:"14px",color:"#6b7280",margin:"0 0 16px 0"},courseStats:{display:"flex",gap:"16px",marginBottom:"16px",paddingTop:"16px",borderTop:"1px solid #f3f4f6"},stat:{display:"flex",alignItems:"center",gap:"6px"},statIcon:{fontSize:"16px"},statText:{fontSize:"14px",fontWeight:600,color:"#1f2937"},courseFooter:{paddingTop:"16px",borderTop:"1px solid #f3f4f6"},createdDate:{fontSize:"13px",color:"#9ca3af"},pagination:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"24px",background:"white",borderRadius:"16px",boxShadow:"0 1px 3px rgba(0,0,0,0.1)"},pageButton:{padding:"10px 16px",borderRadius:"8px",border:"2px solid #e5e7eb",background:"white",color:"#1f2937",fontSize:"14px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",transition:"all 0.2s"},pageButtonDisabled:{opacity:.5,cursor:"not-allowed"},pageInfo:{fontSize:"14px",color:"#6b7280",fontWeight:500},modalOverlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3},modal:{background:"white",borderRadius:"20px",maxWidth:"600px",width:"90%",maxHeight:"90vh",overflow:"auto"},modalHeader:{padding:"24px",borderBottom:"1px solid #e5e7eb",display:"flex",justifyContent:"space-between",alignItems:"center"},modalTitle:{fontSize:"24px",fontWeight:700,color:"#1f2937",margin:0},modalClose:{width:"40px",height:"40px",borderRadius:"10px",border:"none",background:"#f3f4f6",color:"#1f2937",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},modalBody:{padding:"24px"},modalText:{fontSize:"16px",color:"#6b7280",lineHeight:1.6,marginBottom:"24px"},modalButton:{width:"100%",padding:"14px",borderRadius:"12px",border:"none",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",fontSize:"16px",fontWeight:600,cursor:"pointer"}},kg=document.createElement("style");kg.textContent=`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  [style*="searchInput"]:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  [style*="courseCard"]:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
  }
  
  [style*="courseCard"]:hover [style*="courseOverlay"] {
    opacity: 1 !important;
  }
  
  [style*="overlayButton"]:hover {
    transform: scale(1.1);
  }
  
  [style*="categoryButton"]:hover {
    border-color: #667eea !important;
    color: #667eea !important;
  }
  
  [style*="addButton"]:hover,
  [style*="modalButton"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4) !important;
  }
  
  [style*="pageButton"]:hover:not([style*="pageButtonDisabled"]) {
    border-color: #667eea !important;
    color: #667eea !important;
  }
`;document.head.appendChild(kg);const yf=Ht,w4=()=>{const[e,t]=b.useState([]),[a,n]=b.useState(!0),[i,r]=b.useState(""),[s,o]=b.useState(1),[c,d]=b.useState(1),[p,f]=b.useState(0),[u,x]=b.useState(null);b.useEffect(()=>{m()},[s]);const m=async()=>{try{n(!0);const g=await(await fetch(`${yf}/Admin/contact-messages?page=${s}&pageSize=10`)).json();t(g.messages),d(g.totalPages),f(g.totalMessages)}catch(h){console.error("Error loading messages:",h)}finally{n(!1)}},j=async(h,g)=>{if(confirm(`Delete message from "${g}"?`))try{(await fetch(`${yf}/Admin/contact-messages/${h}`,{method:"DELETE"})).ok&&(alert("Message deleted successfully!"),m(),x(null))}catch(v){console.error("Error deleting message:",v),alert("Failed to delete message")}},w=e.filter(h=>h.name.toLowerCase().includes(i.toLowerCase())||h.email.toLowerCase().includes(i.toLowerCase())||h.subject.toLowerCase().includes(i.toLowerCase())||h.message.toLowerCase().includes(i.toLowerCase()));return a?l.jsxs("div",{style:W.loadingContainer,children:[l.jsx("div",{style:W.spinner}),l.jsx("p",{style:W.loadingText,children:"Loading messages..."})]}):l.jsxs("div",{style:W.container,children:[l.jsxs("div",{style:W.header,children:[l.jsxs("div",{children:[l.jsx("h1",{style:W.title,children:"Contact Messages"}),l.jsx("p",{style:W.subtitle,children:"View and manage user inquiries"})]}),l.jsxs("div",{style:W.statsCard,children:[l.jsx(Fa,{size:32,color:"white"}),l.jsxs("div",{children:[l.jsx("span",{style:W.statsLabel,children:"Total Messages"}),l.jsx("span",{style:W.statsValue,children:p})]})]})]}),l.jsx("div",{style:W.searchContainer,children:l.jsxs("div",{style:W.searchWrapper,children:[l.jsx(vl,{size:20,style:W.searchIcon}),l.jsx("input",{type:"text",placeholder:"Search messages by name, email, or content...",value:i,onChange:h=>r(h.target.value),style:W.searchInput})]})}),l.jsx("div",{style:W.messagesGrid,children:w.map(h=>l.jsxs("div",{style:W.messageCard,onClick:()=>x(h),children:[l.jsxs("div",{style:W.messageHeader,children:[l.jsx("div",{style:W.messageAvatar,children:h.name.charAt(0).toUpperCase()}),l.jsxs("div",{style:W.messageHeaderInfo,children:[l.jsx("h3",{style:W.messageName,children:h.name}),l.jsx("p",{style:W.messageEmail,children:h.email})]}),l.jsx("button",{onClick:g=>{g.stopPropagation(),j(h.id,h.name)},style:W.deleteIconButton,children:l.jsx($e,{size:18})})]}),l.jsxs("div",{style:W.messageContent,children:[l.jsx("h4",{style:W.messageSubject,children:h.subject||"No Subject"}),l.jsx("p",{style:W.messageText,children:h.message.length>120?h.message.substring(0,120)+"...":h.message})]}),l.jsxs("div",{style:W.messageFooter,children:[l.jsx("span",{style:W.messageDate,children:new Date(h.createdAt).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}),l.jsxs("button",{style:W.replyButton,children:[l.jsx(Fp,{size:16}),"Reply"]})]})]},h.id))}),l.jsxs("div",{style:W.pagination,children:[l.jsxs("button",{onClick:()=>o(h=>Math.max(1,h-1)),disabled:s===1,style:{...W.pageButton,...s===1?W.pageButtonDisabled:{}},children:[l.jsx(ma,{size:20}),"Previous"]}),l.jsxs("span",{style:W.pageInfo,children:["Page ",s," of ",c]}),l.jsxs("button",{onClick:()=>o(h=>Math.min(c,h+1)),disabled:s===c,style:{...W.pageButton,...s===c?W.pageButtonDisabled:{}},children:["Next",l.jsx(ba,{size:20})]})]}),u&&l.jsx("div",{style:W.modalOverlay,onClick:()=>x(null),children:l.jsxs("div",{style:W.modal,onClick:h=>h.stopPropagation(),children:[l.jsxs("div",{style:W.modalHeader,children:[l.jsxs("div",{style:W.modalHeaderInfo,children:[l.jsx("div",{style:W.modalAvatar,children:u.name.charAt(0).toUpperCase()}),l.jsxs("div",{children:[l.jsx("h2",{style:W.modalName,children:u.name}),l.jsx("p",{style:W.modalEmail,children:u.email})]})]}),l.jsx("button",{onClick:()=>x(null),style:W.modalClose,children:l.jsx(et,{size:24})})]}),l.jsxs("div",{style:W.modalBody,children:[l.jsxs("div",{style:W.modalSubjectSection,children:[l.jsx("span",{style:W.modalLabel,children:"Subject"}),l.jsx("h3",{style:W.modalSubject,children:u.subject||"No Subject"})]}),l.jsxs("div",{style:W.modalMessageSection,children:[l.jsx("span",{style:W.modalLabel,children:"Message"}),l.jsx("p",{style:W.modalMessage,children:u.message})]}),l.jsxs("div",{style:W.modalDateSection,children:[l.jsx("span",{style:W.modalLabel,children:"Received"}),l.jsx("p",{style:W.modalDate,children:new Date(u.createdAt).toLocaleString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})})]})]}),l.jsxs("div",{style:W.modalFooter,children:[l.jsxs("button",{style:W.modalReplyButton,children:[l.jsx(Fp,{size:20}),"Reply via Email"]}),l.jsxs("button",{onClick:()=>j(u.id,u.name),style:W.modalDeleteButton,children:[l.jsx($e,{size:20}),"Delete Message"]})]})]})})]})},W={container:{padding:"32px",maxWidth:"1400px",margin:"0 auto"},loadingContainer:{minHeight:"80vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},spinner:{width:"50px",height:"50px",border:"4px solid #e5e7eb",borderTop:"4px solid #667eea",borderRadius:"50%",animation:"spin 1s linear infinite"},loadingText:{marginTop:"20px",fontSize:"16px",color:"#6b7280"},header:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"32px",flexWrap:"wrap",gap:"20px"},title:{fontSize:"32px",fontWeight:800,color:"#1f2937",margin:"0 0 8px 0"},subtitle:{fontSize:"16px",color:"#6b7280",margin:0},statsCard:{background:"linear-gradient(135deg, #667eea, #764ba2)",padding:"20px 32px",borderRadius:"16px",display:"flex",alignItems:"center",gap:"16px"},statsLabel:{fontSize:"14px",color:"rgba(255,255,255,0.9)",fontWeight:500,display:"block",marginBottom:"4px"},statsValue:{fontSize:"32px",fontWeight:800,color:"white",display:"block"},searchContainer:{marginBottom:"32px"},searchWrapper:{position:"relative",maxWidth:"600px"},searchIcon:{position:"absolute",left:"16px",top:"50%",transform:"translateY(-50%)",color:"#9ca3af",pointerEvents:"none"},searchInput:{width:"100%",padding:"14px 16px 14px 48px",fontSize:"15px",border:"2px solid #e5e7eb",borderRadius:"12px",outline:"none",transition:"all 0.2s"},messagesGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(380px, 1fr))",gap:"24px",marginBottom:"32px"},messageCard:{background:"white",borderRadius:"16px",padding:"24px",cursor:"pointer",transition:"all 0.3s ease",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",border:"2px solid transparent"},messageHeader:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},messageAvatar:{width:"48px",height:"48px",borderRadius:"50%",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",fontWeight:"bold",flexShrink:0},messageHeaderInfo:{flex:1,minWidth:0},messageName:{fontSize:"16px",fontWeight:700,color:"#1f2937",margin:"0 0 4px 0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},messageEmail:{fontSize:"14px",color:"#6b7280",margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},deleteIconButton:{width:"36px",height:"36px",borderRadius:"8px",border:"none",background:"#fef2f2",color:"#ef4444",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,transition:"all 0.2s"},messageContent:{marginBottom:"16px"},messageSubject:{fontSize:"15px",fontWeight:600,color:"#1f2937",margin:"0 0 8px 0"},messageText:{fontSize:"14px",color:"#6b7280",lineHeight:1.6,margin:0},messageFooter:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"16px",borderTop:"1px solid #f3f4f6"},messageDate:{fontSize:"13px",color:"#9ca3af"},replyButton:{padding:"8px 16px",borderRadius:"8px",border:"none",background:"#eff6ff",color:"#3b82f6",fontSize:"13px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"6px",transition:"all 0.2s"},pagination:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"24px",background:"white",borderRadius:"16px",boxShadow:"0 1px 3px rgba(0,0,0,0.1)"},pageButton:{padding:"10px 16px",borderRadius:"8px",border:"2px solid #e5e7eb",background:"white",color:"#1f2937",fontSize:"14px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",transition:"all 0.2s"},pageButtonDisabled:{opacity:.5,cursor:"not-allowed"},pageInfo:{fontSize:"14px",color:"#6b7280",fontWeight:500},modalOverlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3,padding:"20px"},modal:{background:"white",borderRadius:"20px",maxWidth:"700px",width:"100%",maxHeight:"90vh",overflow:"auto",boxShadow:"0 25px 50px rgba(0,0,0,0.25)"},modalHeader:{padding:"24px",borderBottom:"1px solid #e5e7eb",display:"flex",justifyContent:"space-between",alignItems:"center"},modalHeaderInfo:{display:"flex",alignItems:"center",gap:"16px"},modalAvatar:{width:"56px",height:"56px",borderRadius:"50%",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"24px",fontWeight:"bold"},modalName:{fontSize:"20px",fontWeight:700,color:"#1f2937",margin:"0 0 4px 0"},modalEmail:{fontSize:"15px",color:"#6b7280",margin:0},modalClose:{width:"40px",height:"40px",borderRadius:"10px",border:"none",background:"#f3f4f6",color:"#1f2937",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},modalBody:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px"},modalSubjectSection:{},modalMessageSection:{},modalDateSection:{},modalLabel:{fontSize:"12px",fontWeight:600,color:"#6b7280",textTransform:"uppercase",letterSpacing:"0.5px",display:"block",marginBottom:"8px"},modalSubject:{fontSize:"18px",fontWeight:700,color:"#1f2937",margin:0},modalMessage:{fontSize:"15px",color:"#374151",lineHeight:1.8,margin:0,whiteSpace:"pre-wrap"},modalDate:{fontSize:"15px",color:"#6b7280",margin:0},modalFooter:{padding:"24px",borderTop:"1px solid #e5e7eb",display:"flex",gap:"12px"},modalReplyButton:{flex:1,padding:"14px 24px",borderRadius:"12px",border:"none",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",fontSize:"15px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},modalDeleteButton:{padding:"14px 24px",borderRadius:"12px",border:"2px solid #fee2e2",background:"#fef2f2",color:"#ef4444",fontSize:"15px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px"}},Eg=document.createElement("style");Eg.textContent=`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  [style*="searchInput"]:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  [style*="messageCard"]:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
    border-color: #667eea !important;
  }
  
  [style*="deleteIconButton"]:hover {
    background: #fee2e2 !important;
    transform: scale(1.1);
  }
  
  [style*="replyButton"]:hover {
    background: #dbeafe !important;
  }
  
  [style*="pageButton"]:hover:not([style*="pageButtonDisabled"]) {
    border-color: #667eea !important;
    color: #667eea !important;
  }
  
  [style*="modalReplyButton"]:hover,
  [style*="modalDeleteButton"]:hover {
    transform: translateY(-2px);
  }
`;document.head.appendChild(Eg);const Bl=Ht,Tg=()=>{const[e,t]=b.useState([]),[a,n]=b.useState([]),[i,r]=b.useState(!0),[s,o]=b.useState(""),[c,d]=b.useState(1),[p,f]=b.useState(1),[u,x]=b.useState(0),[m,j]=b.useState("All"),[w,h]=b.useState(!1),[g,v]=b.useState("add"),[y,k]=b.useState(null),[G,C]=b.useState(null),[T,O]=b.useState({title:"",description:"",category:"Development",subcategory:"",price:0,originalPrice:0,badge:"Best Seller",imageUrl:"",instructorId:0,whatYouLearn:"",includes:"",companies:""}),E=["All","Development","Design","Marketing","IT & Software","Personal Growth","Business"];b.useEffect(()=>{Q(),R()},[c]);const Q=async()=>{try{r(!0);const H=await(await fetch(`${Bl}/Admin/courses?page=${c}&pageSize=10`)).json();t(H.courses),f(H.totalPages),x(H.totalCourses)}catch(A){console.error("Error loading courses:",A),I("error","Failed to load courses")}finally{r(!1)}},R=async()=>{try{const H=await(await fetch(`${Bl}/Admin/instructors`)).json();n(H)}catch(A){console.error("Error loading instructors:",A)}},I=(A,H)=>{C({type:A,message:H}),setTimeout(()=>C(null),3e3)},F=()=>{v("add"),k(null),O({title:"",description:"",category:"Development",subcategory:"",price:0,originalPrice:0,badge:"Best Seller",imageUrl:"",instructorId:a.length>0?a[0].id:0,whatYouLearn:"",includes:"",companies:""}),h(!0)},P=A=>{var H,K,Ce;v("edit"),k(A),O({title:A.title,description:A.description,category:A.category,subcategory:"",price:A.price,originalPrice:A.price*1.2,badge:"Best Seller",imageUrl:A.imageUrl,instructorId:A.instructorId,whatYouLearn:((H=A.whatYouLearn)==null?void 0:H.join(`
`))||"",includes:((K=A.includes)==null?void 0:K.join(`
`))||"",companies:((Ce=A.companies)==null?void 0:Ce.join(`
`))||""}),h(!0)},L=A=>{v("view"),k(A),h(!0)},q=async(A,H)=>{if(confirm(`Are you sure you want to delete "${H}"?`))try{(await fetch(`${Bl}/Courses/${A}`,{method:"DELETE"})).ok?(I("success","Course deleted successfully!"),Q()):I("error","Failed to delete course")}catch(K){console.error("Error deleting course:",K),I("error","Failed to delete course")}},U=async A=>{A.preventDefault();const H={title:T.title,description:T.description,category:T.category,subcategory:T.subcategory||T.category,price:Number(T.price),originalPrice:Number(T.originalPrice),badge:T.badge,imageUrl:T.imageUrl,instructorId:Number(T.instructorId),whatYouLearn:T.whatYouLearn.split(`
`).filter(K=>K.trim()),includes:T.includes.split(`
`).filter(K=>K.trim()),companies:T.companies.split(`
`).filter(K=>K.trim())};try{let K;if(g==="add"?K=await fetch(`${Bl}/Courses`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(H)}):K=await fetch(`${Bl}/Courses/${y==null?void 0:y.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(H)}),K.ok)I("success",`Course ${g==="add"?"created":"updated"} successfully!`),h(!1),Q();else{const Ce=await K.json();I("error",Ce.message||"Operation failed")}}catch(K){console.error("Error saving course:",K),I("error","Failed to save course")}},ae=e.filter(A=>{const H=A.title.toLowerCase().includes(s.toLowerCase())||A.category.toLowerCase().includes(s.toLowerCase()),K=m==="All"||A.category===m;return H&&K});return i?l.jsxs("div",{style:M.loadingContainer,children:[l.jsx("div",{style:M.spinner}),l.jsx("p",{style:M.loadingText,children:"Loading courses..."})]}):l.jsxs("div",{style:M.container,children:[G&&l.jsxs("div",{style:{...M.notification,...G.type==="success"?M.notificationSuccess:M.notificationError},children:[G.type==="success"?l.jsx(st,{size:24}):l.jsx(Bs,{size:24}),l.jsx("span",{children:G.message})]}),l.jsxs("div",{style:M.header,children:[l.jsxs("div",{children:[l.jsx("h1",{style:M.title,children:"📚 Course Management"}),l.jsx("p",{style:M.subtitle,children:"Create, edit, and manage all courses"})]}),l.jsxs("div",{style:M.headerActions,children:[l.jsxs("div",{style:M.statsCard,children:[l.jsx("span",{style:M.statsLabel,children:"Total Courses"}),l.jsx("span",{style:M.statsValue,children:u})]}),l.jsxs("button",{onClick:F,style:M.addButton,children:[l.jsx(Ya,{size:20}),l.jsx("span",{children:"Add New Course"})]})]})]}),l.jsxs("div",{style:M.filtersContainer,children:[l.jsxs("div",{style:M.searchWrapper,children:[l.jsx(vl,{size:20,style:M.searchIcon}),l.jsx("input",{type:"text",placeholder:"Search courses by title or category...",value:s,onChange:A=>o(A.target.value),style:M.searchInput})]}),l.jsx("div",{style:M.categoryFilter,children:E.map(A=>l.jsx("button",{onClick:()=>j(A),style:{...M.categoryButton,...m===A?M.categoryButtonActive:{}},children:A},A))})]}),l.jsx("div",{style:M.coursesGrid,children:ae.map(A=>l.jsxs("div",{style:M.courseCard,className:"course-card",children:[l.jsxs("div",{style:M.courseImageContainer,children:[l.jsx("img",{src:A.imageUrl,alt:A.title,style:M.courseImage,onError:H=>{H.target.src="https://via.placeholder.com/400x200/667eea/ffffff?text=Course"}}),l.jsxs("div",{style:M.courseOverlay,className:"course-overlay",children:[l.jsx("button",{onClick:()=>L(A),style:M.overlayButton,className:"overlay-button",title:"View Details",children:l.jsx(ei,{size:18})}),l.jsx("button",{onClick:()=>P(A),style:M.overlayButton,className:"overlay-button",title:"Edit Course",children:l.jsx(Wt,{size:18})}),l.jsx("button",{onClick:()=>q(A.id,A.title),style:{...M.overlayButton,background:"#ef4444"},className:"overlay-button",title:"Delete Course",children:l.jsx($e,{size:18})})]})]}),l.jsxs("div",{style:M.courseContent,children:[l.jsx("div",{style:M.categoryBadge,children:A.category}),l.jsx("h3",{style:M.courseTitle,children:A.title}),l.jsxs("p",{style:M.instructorName,children:["By ",A.instructorName]}),l.jsxs("div",{style:M.courseStats,children:[l.jsxs("div",{style:M.stat,children:[l.jsx("span",{style:M.statIcon,children:"⭐"}),l.jsx("span",{style:M.statText,children:A.rating.toFixed(1)})]}),l.jsxs("div",{style:M.stat,children:[l.jsx("span",{style:M.statIcon,children:"👥"}),l.jsx("span",{style:M.statText,children:A.studentCount.toLocaleString()})]}),l.jsxs("div",{style:M.stat,children:[l.jsx("span",{style:M.statIcon,children:"💰"}),l.jsxs("span",{style:M.statText,children:["₹",A.price.toFixed(0)]})]})]}),l.jsx("div",{style:M.courseFooter,children:l.jsxs("span",{style:M.createdDate,children:["Created ",new Date(A.createdAt).toLocaleDateString()]})})]})]},A.id))}),l.jsxs("div",{style:M.pagination,children:[l.jsxs("button",{onClick:()=>d(A=>Math.max(1,A-1)),disabled:c===1,style:{...M.pageButton,...c===1?M.pageButtonDisabled:{}},children:[l.jsx(ma,{size:20}),"Previous"]}),l.jsxs("span",{style:M.pageInfo,children:["Page ",c," of ",p]}),l.jsxs("button",{onClick:()=>d(A=>Math.min(p,A+1)),disabled:c===p,style:{...M.pageButton,...c===p?M.pageButtonDisabled:{}},children:["Next",l.jsx(ba,{size:20})]})]}),w&&l.jsx("div",{style:M.modalOverlay,onClick:()=>h(!1),children:l.jsxs("div",{style:M.modal,onClick:A=>A.stopPropagation(),children:[l.jsxs("div",{style:M.modalHeader,children:[l.jsx("h2",{style:M.modalTitle,children:g==="add"?"➕ Add New Course":g==="edit"?"✏️ Edit Course":"👁️ View Course Details"}),l.jsx("button",{onClick:()=>h(!1),style:M.modalClose,children:l.jsx(et,{size:24})})]}),l.jsx("div",{style:M.modalBody,children:g==="view"&&y?l.jsxs("div",{style:M.viewContent,children:[l.jsx("img",{src:y.imageUrl,alt:y.title,style:M.viewImage,onError:A=>{A.target.src="https://via.placeholder.com/600x300/667eea/ffffff?text=Course"}}),l.jsx("h3",{style:M.viewTitle,children:y.title}),l.jsx("p",{style:M.viewDescription,children:y.description}),l.jsxs("div",{style:M.viewDetails,children:[l.jsxs("div",{style:M.viewDetail,children:[l.jsx("strong",{children:"Category:"})," ",y.category]}),l.jsxs("div",{style:M.viewDetail,children:[l.jsx("strong",{children:"Price:"})," ₹",y.price]}),l.jsxs("div",{style:M.viewDetail,children:[l.jsx("strong",{children:"Instructor:"})," ",y.instructorName]}),l.jsxs("div",{style:M.viewDetail,children:[l.jsx("strong",{children:"Students:"})," ",y.studentCount]}),l.jsxs("div",{style:M.viewDetail,children:[l.jsx("strong",{children:"Rating:"})," ",y.rating," ⭐"]})]})]}):l.jsxs("form",{onSubmit:U,style:M.form,children:[l.jsx("div",{style:M.formRow,children:l.jsxs("div",{style:M.formGroup,children:[l.jsx("label",{style:M.label,children:"Course Title *"}),l.jsx("input",{type:"text",required:!0,value:T.title,onChange:A=>O({...T,title:A.target.value}),style:M.input,placeholder:"e.g., Complete Web Development Bootcamp"})]})}),l.jsxs("div",{style:M.formGroup,children:[l.jsx("label",{style:M.label,children:"Description *"}),l.jsx("textarea",{required:!0,value:T.description,onChange:A=>O({...T,description:A.target.value}),style:M.textarea,rows:4,placeholder:"Describe what students will learn in this course..."})]}),l.jsxs("div",{style:M.formRow,children:[l.jsxs("div",{style:M.formGroup,children:[l.jsx("label",{style:M.label,children:"Category *"}),l.jsx("select",{required:!0,value:T.category,onChange:A=>O({...T,category:A.target.value}),style:M.select,children:E.filter(A=>A!=="All").map(A=>l.jsx("option",{value:A,children:A},A))})]}),l.jsxs("div",{style:M.formGroup,children:[l.jsx("label",{style:M.label,children:"Subcategory"}),l.jsx("input",{type:"text",value:T.subcategory,onChange:A=>O({...T,subcategory:A.target.value}),style:M.input,placeholder:"e.g., React, Node.js, etc."})]})]}),l.jsxs("div",{style:M.formRow,children:[l.jsxs("div",{style:M.formGroup,children:[l.jsx("label",{style:M.label,children:"Price (₹) *"}),l.jsx("input",{type:"number",required:!0,min:"0",step:"0.01",value:T.price,onChange:A=>O({...T,price:Number(A.target.value)}),style:M.input,placeholder:"2999"})]}),l.jsxs("div",{style:M.formGroup,children:[l.jsx("label",{style:M.label,children:"Original Price (₹)"}),l.jsx("input",{type:"number",min:"0",step:"0.01",value:T.originalPrice,onChange:A=>O({...T,originalPrice:Number(A.target.value)}),style:M.input,placeholder:"4999"})]}),l.jsxs("div",{style:M.formGroup,children:[l.jsx("label",{style:M.label,children:"Badge"}),l.jsxs("select",{value:T.badge,onChange:A=>O({...T,badge:A.target.value}),style:M.select,children:[l.jsx("option",{value:"Best Seller",children:"Best Seller"}),l.jsx("option",{value:"New",children:"New"}),l.jsx("option",{value:"Popular",children:"Popular"}),l.jsx("option",{value:"Hot",children:"Hot"}),l.jsx("option",{value:"",children:"None"})]})]})]}),l.jsxs("div",{style:M.formRow,children:[l.jsxs("div",{style:M.formGroup,children:[l.jsx("label",{style:M.label,children:"Instructor *"}),l.jsxs("select",{required:!0,value:T.instructorId,onChange:A=>O({...T,instructorId:Number(A.target.value)}),style:M.select,children:[l.jsx("option",{value:"",children:"Select Instructor"}),a.map(A=>l.jsx("option",{value:A.id,children:A.name},A.id))]})]}),l.jsxs("div",{style:M.formGroup,children:[l.jsx("label",{style:M.label,children:"Image URL *"}),l.jsx("input",{type:"url",required:!0,value:T.imageUrl,onChange:A=>O({...T,imageUrl:A.target.value}),style:M.input,placeholder:"https://example.com/image.jpg"})]})]}),l.jsxs("div",{style:M.formGroup,children:[l.jsx("label",{style:M.label,children:"What You'll Learn"}),l.jsx("textarea",{value:T.whatYouLearn,onChange:A=>O({...T,whatYouLearn:A.target.value}),style:M.textarea,rows:4,placeholder:`Build modern web applications
Master React and Node.js
Deploy to production`})]}),l.jsxs("div",{style:M.formGroup,children:[l.jsx("label",{style:M.label,children:"Course Includes (one per line)"}),l.jsx("textarea",{value:T.includes,onChange:A=>O({...T,includes:A.target.value}),style:M.textarea,rows:3,placeholder:`24 hours video
Certificate of completion
Lifetime access`})]}),l.jsxs("div",{style:M.formGroup,children:[l.jsx("label",{style:M.label,children:"Companies (one per line)"}),l.jsx("textarea",{value:T.companies,onChange:A=>O({...T,companies:A.target.value}),style:M.textarea,rows:3,placeholder:`Google
Microsoft
Amazon`})]}),l.jsxs("div",{style:M.formActions,children:[l.jsx("button",{type:"button",onClick:()=>h(!1),style:M.cancelButton,children:"Cancel"}),l.jsx("button",{type:"submit",style:M.submitButton,children:g==="add"?"➕ Create Course":"💾 Update Course"})]})]})})]})})]})},M={container:{padding:"32px",maxWidth:"1400px",margin:"0 auto"},notification:{position:"fixed",top:"20px",right:"20px",padding:"16px 24px",borderRadius:"12px",display:"flex",alignItems:"center",gap:"12px",fontWeight:600,fontSize:"15px",zIndex:1e4,boxShadow:"0 10px 40px rgba(0,0,0,0.2)",animation:"slideIn 0.3s ease-out"},notificationSuccess:{background:"linear-gradient(135deg, #10b981, #059669)",color:"white"},notificationError:{background:"linear-gradient(135deg, #ef4444, #dc2626)",color:"white"},loadingContainer:{minHeight:"80vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},spinner:{width:"50px",height:"50px",border:"4px solid #e5e7eb",borderTop:"4px solid #667eea",borderRadius:"50%",animation:"spin 1s linear infinite"},loadingText:{marginTop:"20px",fontSize:"16px",color:"#6b7280"},header:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"32px",flexWrap:"wrap",gap:"20px"},title:{fontSize:"36px",fontWeight:900,background:"linear-gradient(135deg, #667eea, #764ba2)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",margin:"0 0 8px 0"},subtitle:{fontSize:"16px",color:"#6b7280",margin:0},headerActions:{display:"flex",gap:"16px",alignItems:"center"},statsCard:{background:"linear-gradient(135deg, #f093fb, #f5576c)",padding:"20px 32px",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"8px",alignItems:"center",boxShadow:"0 4px 20px rgba(240, 147, 251, 0.3)"},statsLabel:{fontSize:"14px",color:"rgba(255,255,255,0.9)",fontWeight:500},statsValue:{fontSize:"32px",fontWeight:800,color:"white"},addButton:{padding:"14px 24px",borderRadius:"12px",border:"none",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",fontSize:"15px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(102, 126, 234, 0.3)",transition:"all 0.3s ease"},filtersContainer:{marginBottom:"32px",display:"flex",flexDirection:"column",gap:"16px"},searchWrapper:{position:"relative",maxWidth:"500px"},searchIcon:{position:"absolute",left:"16px",top:"50%",transform:"translateY(-50%)",color:"#9ca3af",pointerEvents:"none"},searchInput:{width:"100%",padding:"14px 16px 14px 48px",fontSize:"15px",border:"2px solid #e5e7eb",borderRadius:"12px",outline:"none",transition:"all 0.2s"},categoryFilter:{display:"flex",gap:"12px",flexWrap:"wrap"},categoryButton:{padding:"10px 20px",borderRadius:"10px",border:"2px solid #e5e7eb",background:"white",color:"#6b7280",fontSize:"14px",fontWeight:600,cursor:"pointer",transition:"all 0.2s"},categoryButtonActive:{background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",borderColor:"transparent"},coursesGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))",gap:"24px",marginBottom:"32px"},courseCard:{background:"white",borderRadius:"16px",overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",transition:"all 0.3s ease"},courseImageContainer:{position:"relative",height:"200px",overflow:"hidden"},courseImage:{width:"100%",height:"100%",objectFit:"cover"},courseOverlay:{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",opacity:0,transition:"opacity 0.3s"},overlayButton:{width:"44px",height:"44px",borderRadius:"50%",border:"none",background:"white",color:"#1f2937",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"transform 0.2s"},courseContent:{padding:"20px"},categoryBadge:{display:"inline-block",padding:"6px 12px",borderRadius:"8px",fontSize:"12px",fontWeight:600,background:"#eff6ff",color:"#3b82f6",marginBottom:"12px"},courseTitle:{fontSize:"18px",fontWeight:700,color:"#1f2937",margin:"0 0 8px 0",lineHeight:1.3,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"},instructorName:{fontSize:"14px",color:"#6b7280",margin:"0 0 16px 0"},courseStats:{display:"flex",gap:"16px",marginBottom:"16px",paddingTop:"16px",borderTop:"1px solid #f3f4f6"},stat:{display:"flex",alignItems:"center",gap:"6px"},statIcon:{fontSize:"16px"},statText:{fontSize:"14px",fontWeight:600,color:"#1f2937"},courseFooter:{paddingTop:"16px",borderTop:"1px solid #f3f4f6"},createdDate:{fontSize:"13px",color:"#9ca3af"},pagination:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"24px",background:"white",borderRadius:"16px",boxShadow:"0 1px 3px rgba(0,0,0,0.1)"},pageButton:{padding:"10px 16px",borderRadius:"8px",border:"2px solid #e5e7eb",background:"white",color:"#1f2937",fontSize:"14px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",transition:"all 0.2s"},pageButtonDisabled:{opacity:.5,cursor:"not-allowed"},pageInfo:{fontSize:"14px",color:"#6b7280",fontWeight:500},modalOverlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3,backdropFilter:"blur(4px)"},modal:{background:"white",borderRadius:"20px",maxWidth:"800px",width:"90%",maxHeight:"90vh",overflow:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"},modalHeader:{padding:"24px",borderBottom:"1px solid #e5e7eb",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:"white",zIndex:1},modalTitle:{fontSize:"24px",fontWeight:700,color:"#1f2937",margin:0},modalClose:{width:"40px",height:"40px",borderRadius:"10px",border:"none",background:"#f3f4f6",color:"#1f2937",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.2s"},modalBody:{padding:"24px"},form:{display:"flex",flexDirection:"column",gap:"20px"},formRow:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},formGroup:{display:"flex",flexDirection:"column",gap:"8px"},label:{fontSize:"14px",fontWeight:600,color:"#374151"},input:{padding:"12px 16px",fontSize:"15px",border:"2px solid #e5e7eb",borderRadius:"10px",outline:"none",transition:"all 0.2s"},textarea:{padding:"12px 16px",fontSize:"15px",border:"2px solid #e5e7eb",borderRadius:"10px",outline:"none",transition:"all 0.2s",resize:"vertical",fontFamily:"inherit"},select:{padding:"12px 16px",fontSize:"15px",border:"2px solid #e5e7eb",borderRadius:"10px",outline:"none",transition:"all 0.2s",background:"white",cursor:"pointer"},formActions:{display:"flex",gap:"12px",justifyContent:"flex-end",paddingTop:"20px",borderTop:"1px solid #e5e7eb"},cancelButton:{padding:"12px 24px",borderRadius:"10px",border:"2px solid #e5e7eb",background:"white",color:"#1f2937",fontSize:"15px",fontWeight:600,cursor:"pointer",transition:"all 0.2s"},submitButton:{padding:"12px 24px",borderRadius:"10px",border:"none",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",fontSize:"15px",fontWeight:600,cursor:"pointer",transition:"all 0.2s",boxShadow:"0 4px 12px rgba(102, 126, 234, 0.3)"},viewContent:{display:"flex",flexDirection:"column",gap:"20px"},viewImage:{width:"100%",height:"300px",objectFit:"cover",borderRadius:"12px"},viewTitle:{fontSize:"28px",fontWeight:800,color:"#1f2937",margin:0},viewDescription:{fontSize:"16px",color:"#6b7280",lineHeight:1.6,margin:0},viewDetails:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"16px",padding:"20px",background:"#f9fafb",borderRadius:"12px"},viewDetail:{fontSize:"15px",color:"#1f2937"}},Ag=document.createElement("style");Ag.textContent=`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  [style*="searchInput"]:focus,
  [style*="input"]:focus,
  [style*="textarea"]:focus,
  [style*="select"]:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  .course-card {
    transition: all 0.3s ease !important;
  }
  
  .course-card:hover {
    transform: translateY(-8px) !important;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
  }
  
  .course-card:hover .course-overlay {
    opacity: 1 !important;
  }
  
  .overlay-button:hover {
    transform: scale(1.1) !important;
  }
  
  [style*="categoryButton"]:hover {
    border-color: #667eea !important;
    color: #667eea !important;
  }
  
  [style*="addButton"]:hover,
  [style*="submitButton"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4) !important;
  }
  
  [style*="pageButton"]:hover:not([disabled]) {
    border-color: #667eea !important;
    color: #667eea !important;
  }
  
  [style*="cancelButton"]:hover {
    background: #f3f4f6 !important;
  }
  
  [style*="modalClose"]:hover {
    background: #e5e7eb !important;
  }
`;document.head.appendChild(Ag);const Rt=Ht,S4=()=>{const[e,t]=b.useState("dashboard"),[a,n]=b.useState(!0),[i,r]=b.useState(null),s=(c,d)=>{r({type:c,message:d}),setTimeout(()=>r(null),3e3)},o=()=>{window.confirm("Are you sure you want to logout?")&&(localStorage.removeItem("adminUser"),window.location.href="/login")};return l.jsxs("div",{style:S.container,children:[i&&l.jsxs("div",{style:{...S.notification,...i.type==="success"?S.notificationSuccess:S.notificationError},children:[i.type==="success"?l.jsx(st,{size:24}):l.jsx(Bs,{size:24}),l.jsx("span",{children:i.message})]}),l.jsxs("aside",{style:{...S.sidebar,width:a?"280px":"80px"},children:[l.jsx("div",{style:S.sidebarHeader,children:l.jsxs("div",{style:S.logo,children:[l.jsx("div",{style:S.logoIcon,children:"A"}),a&&l.jsx("span",{style:S.logoText,children:"Admin Panel"})]})}),l.jsx("nav",{style:S.nav,children:[{id:"dashboard",label:"Dashboard",icon:l.jsx(Vx,{size:20})},{id:"users",label:"Users",icon:l.jsx(jl,{size:20})},{id:"courses",label:"Courses",icon:l.jsx(Fe,{size:20})},{id:"enrollments",label:"Enrollments",icon:l.jsx(Ia,{size:20})},{id:"payments",label:"Payments",icon:l.jsx(Ix,{size:20})},{id:"messages",label:"Messages",icon:l.jsx(Fa,{size:20})}].map(c=>l.jsxs("button",{onClick:()=>t(c.id),style:{...S.navItem,...e===c.id?S.navItemActive:{}},children:[l.jsx("span",{style:S.navIcon,children:c.icon}),a&&l.jsx("span",{children:c.label})]},c.id))}),l.jsxs("button",{style:S.logoutButton,onClick:o,children:[l.jsx(rs,{size:20}),a&&l.jsx("span",{children:"Logout"})]})]}),l.jsxs("main",{style:S.main,children:[l.jsxs("header",{style:S.header,children:[l.jsx("button",{onClick:()=>n(!a),style:S.menuButton,children:a?l.jsx(et,{size:24}):l.jsx(Jd,{size:24})}),l.jsxs("div",{style:S.adminProfile,children:[l.jsx("div",{style:S.adminAvatar,children:"A"}),l.jsx("span",{style:S.adminName,children:"Admin"})]})]}),l.jsxs("div",{style:S.content,children:[e==="dashboard"&&l.jsx(C4,{showNotification:s}),e==="users"&&l.jsx(z4,{showNotification:s}),e==="courses"&&l.jsx(N4,{showNotification:s}),e==="enrollments"&&l.jsx(k4,{showNotification:s}),e==="payments"&&l.jsx(E4,{showNotification:s}),e==="messages"&&l.jsx(T4,{showNotification:s})]})]})]})},C4=({showNotification:e})=>{const[t,a]=b.useState(null),[n,i]=b.useState(!0);b.useEffect(()=>{r()},[]);const r=async()=>{try{i(!0);const s=await fetch(`${Rt}/Admin/dashboard/stats`);if(!s.ok)throw new Error("Failed to fetch stats");const o=await s.json();a(o)}catch{e("error","Failed to load dashboard stats")}finally{i(!1)}};return n?l.jsxs("div",{style:S.loadingContainer,children:[l.jsx("div",{style:S.spinner}),l.jsx("p",{style:S.loadingText,children:"Loading dashboard..."})]}):l.jsxs("div",{children:[l.jsxs("div",{style:S.dashboardHeader,children:[l.jsxs("div",{children:[l.jsx("h1",{style:S.pageTitle,children:"📊 Dashboard Overview"}),l.jsx("p",{style:S.pageSubtitle,children:"Welcome back! Here's what's happening today."})]}),l.jsxs("button",{onClick:r,style:S.refreshButton,children:[l.jsx(bi,{size:20}),"Refresh"]})]}),l.jsx("div",{style:S.statsGrid,children:[{label:"Total Users",value:(t==null?void 0:t.totalUsers)||0,icon:l.jsx(jl,{size:32,color:"#667eea"}),gradient:"linear-gradient(135deg, #667eea, #764ba2)"},{label:"Total Courses",value:(t==null?void 0:t.totalCourses)||0,icon:l.jsx(Fe,{size:32,color:"#f093fb"}),gradient:"linear-gradient(135deg, #f093fb, #f5576c)"},{label:"Enrollments",value:(t==null?void 0:t.totalEnrollments)||0,icon:l.jsx(Ia,{size:32,color:"#4ade80"}),gradient:"linear-gradient(135deg, #4ade80, #22c55e)"},{label:"Total Revenue",value:`₹${(t==null?void 0:t.totalRevenue.toLocaleString())||0}`,icon:l.jsx(qx,{size:32,color:"#fbbf24"}),gradient:"linear-gradient(135deg, #fbbf24, #f59e0b)"}].map((s,o)=>l.jsxs("div",{style:{...S.statCard,animationDelay:`${o*.1}s`},children:[l.jsx("div",{style:S.statIcon,children:s.icon}),l.jsxs("div",{style:S.statContent,children:[l.jsx("p",{style:S.statLabel,children:s.label}),l.jsx("h2",{style:S.statValue,children:s.value})]})]},o))}),l.jsxs("div",{style:S.dashboardGrid,children:[l.jsxs("div",{style:S.dashboardSection,children:[l.jsx("h2",{style:S.sectionTitle,children:"🎓 Recent Enrollments"}),t!=null&&t.recentEnrollments&&t.recentEnrollments.length>0?l.jsx("div",{style:S.enrollmentList,children:t.recentEnrollments.map(s=>l.jsxs("div",{style:S.enrollmentItem,children:[l.jsx("div",{style:S.enrollmentAvatar,children:s.userName.charAt(0).toUpperCase()}),l.jsxs("div",{style:S.enrollmentContent,children:[l.jsx("h4",{style:S.enrollmentName,children:s.userName}),l.jsx("p",{style:S.enrollmentCourse,children:s.courseName})]}),l.jsx("div",{style:S.enrollmentDate,children:new Date(s.enrolledAt).toLocaleDateString("en-US",{month:"short",day:"numeric"})})]},s.id))}):l.jsxs("div",{style:S.emptyState,children:[l.jsx("div",{style:S.emptyIcon,children:"📚"}),l.jsx("p",{style:S.emptyText,children:"No enrollments yet"})]})]}),l.jsxs("div",{style:S.dashboardSection,children:[l.jsx("h2",{style:S.sectionTitle,children:"🔥 Popular Courses"}),t!=null&&t.popularCourses&&t.popularCourses.length>0?l.jsx("div",{style:S.popularCoursesGrid,children:t.popularCourses.map(s=>l.jsxs("div",{style:S.popularCourseCard,children:[l.jsx("img",{src:s.imageUrl,alt:s.title,style:S.popularCourseImage}),l.jsxs("div",{style:S.popularCourseInfo,children:[l.jsx("h4",{style:S.popularCourseTitle,children:s.title}),l.jsxs("div",{style:S.popularCourseStats,children:[l.jsx(Ia,{size:16}),l.jsxs("span",{children:[s.enrollmentCount," students"]})]})]})]},s.id))}):l.jsxs("div",{style:S.emptyState,children:[l.jsx("div",{style:S.emptyIcon,children:"🎯"}),l.jsx("p",{style:S.emptyText,children:"No popular courses yet"})]})]})]})]})},z4=({showNotification:e})=>{const[t,a]=b.useState([]),[n,i]=b.useState(!0),[r,s]=b.useState(""),[o,c]=b.useState(1),[d,p]=b.useState(1),[f,u]=b.useState(null),[x,m]=b.useState("");b.useEffect(()=>{j()},[o]);const j=async()=>{try{i(!0);const y=await(await fetch(`${Rt}/Admin/users?page=${o}&pageSize=10`)).json();a(y.users),p(y.totalPages)}catch{e("error","Failed to load users")}finally{i(!1)}},w=async v=>{try{(await fetch(`${Rt}/Admin/users/${v}/role`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({role:x})})).ok&&(e("success","Role updated successfully!"),u(null),j())}catch{e("error","Failed to update role")}},h=async(v,y)=>{if(confirm(`Delete user "${y}"?`))try{(await fetch(`${Rt}/Admin/users/${v}`,{method:"DELETE"})).ok&&(e("success","User deleted successfully!"),j())}catch{e("error","Failed to delete user")}},g=t.filter(v=>v.fullName.toLowerCase().includes(r.toLowerCase())||v.email.toLowerCase().includes(r.toLowerCase()));return n?l.jsx("div",{style:S.loadingContainer,children:l.jsx("div",{style:S.spinner})}):l.jsxs("div",{children:[l.jsx("h1",{style:S.pageTitle,children:"👥 User Management"}),l.jsxs("div",{style:S.searchWrapper,children:[l.jsx(vl,{size:20,style:S.searchIcon}),l.jsx("input",{type:"text",placeholder:"Search users...",value:r,onChange:v=>s(v.target.value),style:S.searchInput})]}),l.jsxs("div",{style:S.tableCard,children:[l.jsxs("table",{style:S.table,children:[l.jsx("thead",{children:l.jsxs("tr",{children:[l.jsx("th",{style:S.th,children:"User"}),l.jsx("th",{style:S.th,children:"Email"}),l.jsx("th",{style:S.th,children:"Role"}),l.jsx("th",{style:S.th,children:"Joined"}),l.jsx("th",{style:S.th,children:"Actions"})]})}),l.jsx("tbody",{children:g.map(v=>l.jsxs("tr",{style:S.tr,children:[l.jsx("td",{style:S.td,children:l.jsxs("div",{style:S.userCell,children:[l.jsx("div",{style:S.tableAvatar,children:v.fullName.charAt(0).toUpperCase()}),l.jsx("span",{children:v.fullName})]})}),l.jsx("td",{style:S.td,children:v.email}),l.jsx("td",{style:S.td,children:(f==null?void 0:f.id)===v.id?l.jsxs("select",{value:x,onChange:y=>m(y.target.value),style:S.roleSelect,children:[l.jsx("option",{value:"Student",children:"Student"}),l.jsx("option",{value:"Instructor",children:"Instructor"}),l.jsx("option",{value:"Admin",children:"Admin"})]}):l.jsx("span",{style:S.roleBadge,children:v.role})}),l.jsx("td",{style:S.td,children:new Date(v.createdAt).toLocaleDateString()}),l.jsx("td",{style:S.td,children:l.jsx("div",{style:S.actions,children:(f==null?void 0:f.id)===v.id?l.jsxs(l.Fragment,{children:[l.jsx("button",{onClick:()=>w(v.id),style:S.saveButton,children:"Save"}),l.jsx("button",{onClick:()=>u(null),style:S.cancelButton,children:"Cancel"})]}):l.jsxs(l.Fragment,{children:[l.jsx("button",{onClick:()=>{u(v),m(v.role)},style:S.editButton,children:l.jsx(Wt,{size:16})}),l.jsx("button",{onClick:()=>h(v.id,v.fullName),style:S.deleteButton,children:l.jsx($e,{size:16})})]})})})]},v.id))})]}),l.jsxs("div",{style:S.pagination,children:[l.jsxs("button",{onClick:()=>c(v=>Math.max(1,v-1)),disabled:o===1,style:{...S.pageButton,...o===1?S.pageButtonDisabled:{}},children:[l.jsx(ma,{size:20})," Previous"]}),l.jsxs("span",{style:S.pageInfo,children:["Page ",o," of ",d]}),l.jsxs("button",{onClick:()=>c(v=>Math.min(d,v+1)),disabled:o===d,style:{...S.pageButton,...o===d?S.pageButtonDisabled:{}},children:["Next ",l.jsx(ba,{size:20})]})]})]})]})},N4=({showNotification:e})=>{const[t,a]=b.useState([]),[n,i]=b.useState([]),[r,s]=b.useState(!0),[o,c]=b.useState(1),[d,p]=b.useState(1),[f,u]=b.useState(!1),[x,m]=b.useState("add"),[j,w]=b.useState({title:"",description:"",category:"Development",price:0,imageUrl:"",instructorId:0,whatYouLearn:"",includes:"",companies:""});b.useEffect(()=>{h(),g()},[o]);const h=async()=>{try{s(!0);const T=await(await fetch(`${Rt}/Admin/courses?page=${o}&pageSize=10`)).json();a(T.courses),p(T.totalPages)}catch{e("error","Failed to load courses")}finally{s(!1)}},g=async()=>{try{const T=await(await fetch(`${Rt}/Admin/instructors`)).json();i(T)}catch(C){console.error("Error loading instructors:",C)}},v=()=>{m("add"),w({title:"",description:"",category:"Development",price:0,imageUrl:"",instructorId:n.length>0?n[0].id:0,whatYouLearn:"",includes:"",companies:""}),u(!0)},y=C=>{var T,O,E;m("edit"),w({title:C.title,description:C.description,category:C.category,price:C.price,imageUrl:C.imageUrl,instructorId:C.instructorId,whatYouLearn:((T=C.whatYouLearn)==null?void 0:T.join(`
`))||"",includes:((O=C.includes)==null?void 0:O.join(`
`))||"",companies:((E=C.companies)==null?void 0:E.join(`
`))||""}),u(!0)},k=async C=>{C.preventDefault();try{const T={title:j.title,description:j.description,category:j.category,subcategory:"",price:Number(j.price),originalPrice:Number(j.price)+500,badge:"Bestseller",instructorId:Number(j.instructorId),imageUrl:j.imageUrl,whatYouLearn:j.whatYouLearn.split(`
`).map(Q=>Q.trim()).filter(Boolean),includes:[],companies:[]};console.log("CREATE COURSE PAYLOAD:",T);const O=await fetch(`${Rt}/Admin/courses`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(T)}),E=await O.json();if(!O.ok)throw console.error("API ERROR:",E),new Error(E.message||"Failed to create course");e("success","Course created successfully!"),u(!1),h()}catch(T){console.error("CREATE COURSE ERROR:",T),e("error",T.message||"Course creation failed")}},G=async(C,T)=>{if(confirm(`Delete "${T}"?`))try{(await fetch(`${Rt}/Courses/${C}`,{method:"DELETE"})).ok&&(e("success","Course deleted successfully!"),h())}catch{e("error","Failed to delete course")}};return r?l.jsx("div",{style:S.loadingContainer,children:l.jsx("div",{style:S.spinner})}):l.jsxs("div",{children:[l.jsxs("div",{style:S.sectionHeader,children:[l.jsx("h1",{style:S.pageTitle,children:"📚 Course Management"}),l.jsxs("button",{onClick:v,style:S.addButton,children:[l.jsx(Ya,{size:20})," Add Course"]})]}),l.jsx("div",{style:S.coursesGrid,children:t.map(C=>l.jsxs("div",{style:S.courseCard,children:[l.jsxs("div",{style:S.courseImageContainer,children:[l.jsx("img",{src:C.imageUrl,alt:C.title,style:S.courseImage}),l.jsxs("div",{style:S.courseOverlay,children:[l.jsx("button",{onClick:()=>y(C),style:S.overlayButton,children:l.jsx(Wt,{size:18})}),l.jsx("button",{onClick:()=>G(C.id,C.title),style:{...S.overlayButton,background:"#ef4444"},children:l.jsx($e,{size:18})})]})]}),l.jsxs("div",{style:S.courseContent,children:[l.jsx("div",{style:S.categoryBadge,children:C.category}),l.jsx("h3",{style:S.courseTitle,children:C.title}),l.jsxs("p",{style:S.instructorName,children:["By ",C.instructorName]}),l.jsxs("div",{style:S.courseStats,children:[l.jsxs("div",{style:S.stat,children:[l.jsx("span",{children:"⭐"})," ",C.rating.toFixed(1)]}),l.jsxs("div",{style:S.stat,children:[l.jsx("span",{children:"👥"})," ",C.studentCount]}),l.jsxs("div",{style:S.stat,children:[l.jsx("span",{children:"💰"})," ₹",C.price]})]})]})]},C.id))}),l.jsxs("div",{style:S.pagination,children:[l.jsxs("button",{onClick:()=>c(C=>Math.max(1,C-1)),disabled:o===1,style:{...S.pageButton,...o===1?S.pageButtonDisabled:{}},children:[l.jsx(ma,{size:20})," Previous"]}),l.jsxs("span",{style:S.pageInfo,children:["Page ",o," of ",d]}),l.jsxs("button",{onClick:()=>c(C=>Math.min(d,C+1)),disabled:o===d,style:{...S.pageButton,...o===d?S.pageButtonDisabled:{}},children:["Next ",l.jsx(ba,{size:20})]})]}),f&&l.jsx("div",{style:S.modalOverlay,onClick:()=>u(!1),children:l.jsxs("div",{style:S.modal,onClick:C=>C.stopPropagation(),children:[l.jsxs("div",{style:S.modalHeader,children:[l.jsx("h2",{style:S.modalTitle,children:x==="add"?"➕ Add Course":"✏️ Edit Course"}),l.jsx("button",{onClick:()=>u(!1),style:S.modalClose,children:l.jsx(et,{size:24})})]}),l.jsx("div",{style:S.modalBody,children:l.jsxs("form",{onSubmit:k,style:S.form,children:[l.jsxs("div",{style:S.formGroup,children:[l.jsx("label",{style:S.formLabel,children:"Course Title *"}),l.jsx("input",{type:"text",required:!0,value:j.title,onChange:C=>w({...j,title:C.target.value}),placeholder:"e.g., Complete Python Programming",style:S.input})]}),l.jsxs("div",{style:S.formGroup,children:[l.jsx("label",{style:S.formLabel,children:"Description *"}),l.jsx("textarea",{required:!0,value:j.description,onChange:C=>w({...j,description:C.target.value}),placeholder:"Detailed course description",style:S.textarea,rows:4})]}),l.jsxs("div",{style:S.formRow,children:[l.jsxs("div",{style:S.formGroup,children:[l.jsx("label",{style:S.formLabel,children:"Category *"}),l.jsx("select",{required:!0,value:j.category,onChange:C=>w({...j,category:C.target.value}),style:S.select,children:["Development","Design","Marketing","IT & Software","Personal Growth","Business","Data Science"].map(C=>l.jsx("option",{value:C,children:C},C))})]}),l.jsxs("div",{style:S.formGroup,children:[l.jsx("label",{style:S.formLabel,children:"Price (₹) *"}),l.jsx("input",{type:"number",required:!0,min:"0",step:"0.01",value:j.price,onChange:C=>w({...j,price:Number(C.target.value)}),placeholder:"19.99",style:S.input})]})]}),l.jsxs("div",{style:S.formRow,children:[l.jsxs("div",{style:S.formGroup,children:[l.jsx("label",{style:S.formLabel,children:"Instructor *"}),l.jsxs("select",{required:!0,value:j.instructorId,onChange:C=>w({...j,instructorId:Number(C.target.value)}),style:S.select,children:[l.jsx("option",{value:"",children:"Select Instructor"}),n.map(C=>l.jsx("option",{value:C.id,children:C.name},C.id))]})]}),l.jsxs("div",{style:S.formGroup,children:[l.jsx("label",{style:S.formLabel,children:"Image URL *"}),l.jsx("input",{type:"url",required:!0,value:j.imageUrl,onChange:C=>w({...j,imageUrl:C.target.value}),placeholder:"https://example.com/image.jpg",style:S.input})]})]}),l.jsxs("div",{style:S.formGroup,children:[l.jsx("label",{style:S.formLabel,children:"What You'll Learn (one per line)"}),l.jsx("textarea",{value:j.whatYouLearn,onChange:C=>w({...j,whatYouLearn:C.target.value}),placeholder:`Python Basics
OOP Concepts
Web Development
Data Analysis`,style:S.textarea,rows:4})]}),l.jsxs("div",{style:S.formActions,children:[l.jsx("button",{type:"button",onClick:()=>u(!1),style:S.cancelButton,children:"Cancel"}),l.jsx("button",{type:"submit",style:S.submitButton,children:x==="add"?"✓ Create Course":"✓ Update Course"})]})]})})]})})]})},k4=({showNotification:e})=>{const[t,a]=b.useState([]),[n,i]=b.useState(!0),[r,s]=b.useState(1),[o,c]=b.useState(1);b.useEffect(()=>{d()},[r]);const d=async()=>{try{i(!0);const f=await(await fetch(`${Rt}/Admin/enrollments?page=${r}&pageSize=10`)).json();a(f.enrollments),c(f.totalPages)}catch{e("error","Failed to load enrollments")}finally{i(!1)}};return n?l.jsx("div",{style:S.loadingContainer,children:l.jsx("div",{style:S.spinner})}):l.jsxs("div",{children:[l.jsx("h1",{style:S.pageTitle,children:"🎓 Enrollment Management"}),l.jsxs("div",{style:S.tableCard,children:[l.jsxs("table",{style:S.table,children:[l.jsx("thead",{children:l.jsxs("tr",{children:[l.jsx("th",{style:S.th,children:"Student"}),l.jsx("th",{style:S.th,children:"Course"}),l.jsx("th",{style:S.th,children:"Enrolled Date"})]})}),l.jsx("tbody",{children:t.map(p=>l.jsxs("tr",{style:S.tr,children:[l.jsx("td",{style:S.td,children:p.userName}),l.jsx("td",{style:S.td,children:p.courseName}),l.jsx("td",{style:S.td,children:new Date(p.enrolledAt).toLocaleDateString()})]},p.id))})]}),l.jsxs("div",{style:S.pagination,children:[l.jsxs("button",{onClick:()=>s(p=>Math.max(1,p-1)),disabled:r===1,style:{...S.pageButton,...r===1?S.pageButtonDisabled:{}},children:[l.jsx(ma,{size:20})," Previous"]}),l.jsxs("span",{style:S.pageInfo,children:["Page ",r," of ",o]}),l.jsxs("button",{onClick:()=>s(p=>Math.min(o,p+1)),disabled:r===o,style:{...S.pageButton,...r===o?S.pageButtonDisabled:{}},children:["Next ",l.jsx(ba,{size:20})]})]})]})]})},S={container:{display:"flex",minHeight:"100vh",background:"#f3f4f6"},sidebar:{background:"#1f2937",display:"flex",flexDirection:"column",transition:"width 0.3s",position:"sticky",top:0,height:"100vh"},sidebarHeader:{padding:"24px",borderBottom:"1px solid rgba(255,255,255,0.1)"},logo:{display:"flex",alignItems:"center",gap:"12px"},logoIcon:{width:"40px",height:"40px",borderRadius:"10px",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",fontWeight:"bold"},logoText:{fontSize:"18px",fontWeight:700,color:"white"},nav:{flex:1,padding:"16px",display:"flex",flexDirection:"column",gap:"8px"},navItem:{display:"flex",alignItems:"center",gap:"12px",padding:"12px 16px",borderRadius:"10px",color:"#9ca3af",fontSize:"15px",fontWeight:500,cursor:"pointer",border:"none",background:"transparent",width:"100%",textAlign:"left",transition:"all 0.2s"},navItemActive:{background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white"},navIcon:{display:"flex"},logoutButton:{margin:"16px",padding:"12px 16px",borderRadius:"10px",border:"none",background:"#ef4444",color:"white",fontSize:"15px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"12px",justifyContent:"center"},main:{flex:1,display:"flex",flexDirection:"column"},header:{background:"white",padding:"20px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #e5e7eb",position:"sticky",top:0,zIndex:10},menuButton:{width:"44px",height:"44px",borderRadius:"10px",border:"none",background:"#f3f4f6",color:"#1f2937",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},adminProfile:{display:"flex",alignItems:"center",gap:"12px"},adminAvatar:{width:"40px",height:"40px",borderRadius:"50%",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",fontWeight:"bold"},adminName:{fontSize:"15px",fontWeight:600,color:"#1f2937"},content:{flex:1,padding:"32px",overflow:"auto"},notification:{position:"fixed",top:"20px",right:"20px",padding:"16px 24px",borderRadius:"12px",display:"flex",alignItems:"center",gap:"12px",fontWeight:600,fontSize:"15px",zIndex:1e4,boxShadow:"0 10px 40px rgba(0,0,0,0.2)"},notificationSuccess:{background:"linear-gradient(135deg, #10b981, #059669)",color:"white"},notificationError:{background:"linear-gradient(135deg, #ef4444, #dc2626)",color:"white"},loadingContainer:{minHeight:"400px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},spinner:{width:"50px",height:"50px",border:"4px solid #e5e7eb",borderTop:"4px solid #667eea",borderRadius:"50%",animation:"spin 1s linear infinite"},loadingText:{marginTop:"20px",fontSize:"16px",color:"#6b7280"},dashboardHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"32px"},pageTitle:{fontSize:"36px",fontWeight:900,background:"linear-gradient(135deg, #667eea, #764ba2)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",margin:"0 0 8px 0"},pageSubtitle:{fontSize:"16px",color:"#6b7280",margin:0},refreshButton:{display:"flex",alignItems:"center",gap:"8px",padding:"12px 24px",background:"white",border:"2px solid #e5e7eb",borderRadius:"12px",color:"#1f2937",fontSize:"15px",fontWeight:600,cursor:"pointer"},statsGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"24px",marginBottom:"32px"},statCard:{background:"white",borderRadius:"24px",padding:"28px",display:"flex",gap:"20px",alignItems:"flex-start",boxShadow:"0 4px 20px rgba(0,0,0,0.06)",animation:"slideUp 0.6s ease-out"},statIcon:{width:"64px",height:"64px",borderRadius:"16px",background:"linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",display:"flex",alignItems:"center",justifyContent:"center"},statContent:{flex:1},statLabel:{fontSize:"14px",color:"#6b7280",fontWeight:600,marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.5px"},statValue:{fontSize:"36px",fontWeight:900,color:"#1f2937",margin:"0"},dashboardGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(450px, 1fr))",gap:"24px"},dashboardSection:{background:"white",borderRadius:"24px",padding:"28px",boxShadow:"0 4px 20px rgba(0,0,0,0.06)"},sectionTitle:{fontSize:"22px",fontWeight:800,color:"#1f2937",margin:"0 0 24px 0"},enrollmentList:{display:"flex",flexDirection:"column",gap:"12px"},enrollmentItem:{display:"flex",alignItems:"center",gap:"16px",padding:"16px",background:"#f9fafb",borderRadius:"16px",cursor:"pointer",transition:"all 0.3s"},enrollmentAvatar:{width:"48px",height:"48px",borderRadius:"12px",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",fontWeight:700},enrollmentContent:{flex:1},enrollmentName:{fontSize:"16px",fontWeight:700,color:"#1f2937",margin:"0 0 4px 0"},enrollmentCourse:{fontSize:"14px",color:"#6b7280",margin:0},enrollmentDate:{fontSize:"13px",color:"#9ca3af",fontWeight:600},popularCoursesGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))",gap:"16px"},popularCourseCard:{background:"#f9fafb",borderRadius:"16px",overflow:"hidden",cursor:"pointer",transition:"all 0.3s"},popularCourseImage:{width:"100%",height:"120px",objectFit:"cover"},popularCourseInfo:{padding:"16px"},popularCourseTitle:{fontSize:"15px",fontWeight:700,color:"#1f2937",margin:"0 0 8px 0"},popularCourseStats:{display:"flex",alignItems:"center",gap:"6px",fontSize:"13px",color:"#6b7280"},emptyState:{textAlign:"center",padding:"60px 20px"},emptyIcon:{fontSize:"64px",marginBottom:"16px"},emptyText:{fontSize:"18px",fontWeight:700,color:"#1f2937"},searchWrapper:{position:"relative",maxWidth:"500px",marginBottom:"24px"},searchIcon:{position:"absolute",left:"16px",top:"50%",transform:"translateY(-50%)",color:"#9ca3af",pointerEvents:"none"},searchInput:{width:"100%",padding:"14px 16px 14px 48px",fontSize:"15px",border:"2px solid #e5e7eb",borderRadius:"12px",outline:"none"},tableCard:{background:"white",borderRadius:"16px",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",overflow:"hidden"},table:{width:"100%",borderCollapse:"collapse"},th:{textAlign:"left",padding:"16px 20px",fontSize:"13px",fontWeight:600,color:"#6b7280",background:"#f9fafb",borderBottom:"2px solid #e5e7eb",textTransform:"uppercase"},tr:{borderBottom:"1px solid #f3f4f6",transition:"background 0.2s"},td:{padding:"16px 20px",fontSize:"14px",color:"#1f2937"},userCell:{display:"flex",alignItems:"center",gap:"12px"},tableAvatar:{width:"40px",height:"40px",borderRadius:"50%",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",fontWeight:"bold"},roleBadge:{display:"inline-block",padding:"6px 12px",borderRadius:"8px",fontSize:"13px",fontWeight:600,background:"#f3f4f6",color:"#1f2937"},roleSelect:{padding:"6px 12px",borderRadius:"8px",border:"2px solid #667eea",fontSize:"13px",fontWeight:600},actions:{display:"flex",gap:"8px"},editButton:{width:"36px",height:"36px",borderRadius:"8px",border:"none",background:"#eff6ff",color:"#3b82f6",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},deleteButton:{width:"36px",height:"36px",borderRadius:"8px",border:"none",background:"#fef2f2",color:"#ef4444",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},saveButton:{padding:"8px 16px",borderRadius:"8px",border:"none",background:"#10b981",color:"white",fontSize:"13px",fontWeight:600,cursor:"pointer"},cancelButton:{padding:"8px 16px",borderRadius:"8px",border:"none",background:"#6b7280",color:"white",fontSize:"13px",fontWeight:600,cursor:"pointer"},pagination:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 24px",borderTop:"1px solid #f3f4f6"},pageButton:{padding:"10px 16px",borderRadius:"8px",border:"2px solid #e5e7eb",background:"white",color:"#1f2937",fontSize:"14px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px"},pageButtonDisabled:{opacity:.5,cursor:"not-allowed"},pageInfo:{fontSize:"14px",color:"#6b7280",fontWeight:500},sectionHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px"},addButton:{padding:"14px 24px",borderRadius:"12px",border:"none",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",fontSize:"15px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px"},coursesGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))",gap:"24px",marginBottom:"32px"},courseCard:{background:"white",borderRadius:"16px",overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",transition:"all 0.3s"},courseImageContainer:{position:"relative",height:"200px",overflow:"hidden"},courseImage:{width:"100%",height:"100%",objectFit:"cover"},courseOverlay:{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",opacity:0,transition:"opacity 0.3s"},overlayButton:{width:"44px",height:"44px",borderRadius:"50%",border:"none",background:"white",color:"#1f2937",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},courseContent:{padding:"20px"},categoryBadge:{display:"inline-block",padding:"6px 12px",borderRadius:"8px",fontSize:"12px",fontWeight:600,background:"#eff6ff",color:"#3b82f6",marginBottom:"12px"},courseTitle:{fontSize:"18px",fontWeight:700,color:"#1f2937",margin:"0 0 8px 0"},instructorName:{fontSize:"14px",color:"#6b7280",margin:"0 0 16px 0"},courseStats:{display:"flex",gap:"16px"},stat:{display:"flex",alignItems:"center",gap:"6px",fontSize:"14px",fontWeight:600,color:"#1f2937"},modalOverlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3,padding:"20px"},modal:{background:"white",borderRadius:"20px",maxWidth:"800px",width:"100%",maxHeight:"90vh",overflow:"auto"},modalHeader:{padding:"24px",borderBottom:"1px solid #e5e7eb",display:"flex",justifyContent:"space-between",alignItems:"center"},modalTitle:{fontSize:"24px",fontWeight:700,color:"#1f2937",margin:0},modalClose:{width:"40px",height:"40px",borderRadius:"10px",border:"none",background:"#f3f4f6",color:"#1f2937",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},modalBody:{padding:"24px"},form:{display:"flex",flexDirection:"column",gap:"20px"},formRow:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},input:{padding:"12px 16px",fontSize:"15px",border:"2px solid #e5e7eb",borderRadius:"10px",outline:"none"},textarea:{padding:"12px 16px",fontSize:"15px",border:"2px solid #e5e7eb",borderRadius:"10px",outline:"none",resize:"vertical",fontFamily:"inherit"},select:{padding:"12px 16px",fontSize:"15px",border:"2px solid #e5e7eb",borderRadius:"10px",outline:"none",background:"white",cursor:"pointer"},formActions:{display:"flex",gap:"12px",justifyContent:"flex-end",paddingTop:"20px",borderTop:"1px solid #e5e7eb"},submitButton:{padding:"12px 24px",borderRadius:"10px",border:"none",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",fontSize:"15px",fontWeight:600,cursor:"pointer"},statusBadge:{display:"inline-block",padding:"6px 12px",borderRadius:"8px",fontSize:"13px",fontWeight:600},statusPaid:{background:"#dcfce7",color:"#16a34a"},statusPending:{background:"#fef3c7",color:"#ca8a04"},messagesGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(380px, 1fr))",gap:"24px",marginBottom:"32px"},messageCard:{background:"white",borderRadius:"16px",padding:"24px",cursor:"pointer",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",transition:"all 0.3s"},messageHeader:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},messageAvatar:{width:"48px",height:"48px",borderRadius:"50%",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",fontWeight:"bold"},messageHeaderInfo:{flex:1},messageName:{fontSize:"16px",fontWeight:700,color:"#1f2937",margin:"0 0 4px 0"},messageEmail:{fontSize:"14px",color:"#6b7280",margin:0},deleteIconButton:{width:"36px",height:"36px",borderRadius:"8px",border:"none",background:"#fef2f2",color:"#ef4444",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},messageSubject:{fontSize:"15px",fontWeight:600,color:"#1f2937",margin:"0 0 8px 0"},messageText:{fontSize:"14px",color:"#6b7280",margin:"0 0 16px 0"},messageDate:{fontSize:"13px",color:"#9ca3af"},messageDetailSection:{marginBottom:"20px"},messageDetailText:{marginTop:"8px",fontSize:"15px",color:"#374151",lineHeight:1.8,whiteSpace:"pre-wrap"},modalFooter:{padding:"24px",borderTop:"1px solid #e5e7eb",display:"flex",gap:"12px",justifyContent:"flex-end"}},Rg=document.createElement("style");Rg.textContent=`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  [style*="courseCard"]:hover { transform: translateY(-8px); box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important; }
  [style*="courseCard"]:hover [style*="courseOverlay"] { opacity: 1 !important; }
  [style*="messageCard"]:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important; }
  [style*="enrollmentItem"]:hover { background: white !important; }
  [style*="popularCourseCard"]:hover { transform: translateY(-4px); }
`;document.head.appendChild(Rg);const E4=({showNotification:e})=>{const[t,a]=b.useState([]),[n,i]=b.useState(!0),[r,s]=b.useState(1),[o,c]=b.useState(1);b.useEffect(()=>{d()},[r]);const d=async()=>{try{i(!0);const f=await(await fetch(`${Rt}/Admin/payments?page=${r}&pageSize=10`)).json();a(f.payments),c(f.totalPages)}catch{e("error","Failed to load payments")}finally{i(!1)}};return n?l.jsx("div",{style:S.loadingContainer,children:l.jsx("div",{style:S.spinner})}):l.jsxs("div",{children:[l.jsx("h1",{style:S.pageTitle,children:"💳 Payment Management"}),l.jsxs("div",{style:S.tableCard,children:[l.jsxs("table",{style:S.table,children:[l.jsx("thead",{children:l.jsxs("tr",{children:[l.jsx("th",{style:S.th,children:"User"}),l.jsx("th",{style:S.th,children:"Course"}),l.jsx("th",{style:S.th,children:"Amount"}),l.jsx("th",{style:S.th,children:"Status"}),l.jsx("th",{style:S.th,children:"Date"})]})}),l.jsx("tbody",{children:t.map(p=>l.jsxs("tr",{style:S.tr,children:[l.jsx("td",{style:S.td,children:p.userName}),l.jsx("td",{style:S.td,children:p.courseName}),l.jsxs("td",{style:S.td,children:["₹",p.amount]}),l.jsx("td",{style:S.td,children:l.jsx("span",{style:{...S.statusBadge,...p.status==="PAID"?S.statusPaid:S.statusPending},children:p.status})}),l.jsx("td",{style:S.td,children:new Date(p.createdAt).toLocaleDateString()})]},p.id))})]}),l.jsxs("div",{style:S.pagination,children:[l.jsxs("button",{onClick:()=>s(p=>Math.max(1,p-1)),disabled:r===1,style:{...S.pageButton,...r===1?S.pageButtonDisabled:{}},children:[l.jsx(ma,{size:20})," Previous"]}),l.jsxs("span",{style:S.pageInfo,children:["Page ",r," of ",o]}),l.jsxs("button",{onClick:()=>s(p=>Math.min(o,p+1)),disabled:r===o,style:{...S.pageButton,...r===o?S.pageButtonDisabled:{}},children:["Next ",l.jsx(ba,{size:20})]})]})]})]})},T4=({showNotification:e})=>{const[t,a]=b.useState([]),[n,i]=b.useState(!0),[r,s]=b.useState(1),[o,c]=b.useState(1),[d,p]=b.useState(null);b.useEffect(()=>{f()},[r]);const f=async()=>{try{i(!0);const m=await(await fetch(`${Rt}/Admin/contact-messages?page=${r}&pageSize=10`)).json();a(m.messages),c(m.totalPages)}catch{e("error","Failed to load messages")}finally{i(!1)}},u=async x=>{if(confirm("Delete this message?"))try{(await fetch(`${Rt}/Admin/contact-messages/${x}`,{method:"DELETE"})).ok&&(e("success","Message deleted successfully!"),p(null),f())}catch{e("error","Failed to delete message")}};return n?l.jsx("div",{style:S.loadingContainer,children:l.jsx("div",{style:S.spinner})}):l.jsxs("div",{children:[l.jsx("h1",{style:S.pageTitle,children:"📧 Contact Messages"}),l.jsx("div",{style:S.messagesGrid,children:t.map(x=>l.jsxs("div",{style:S.messageCard,onClick:()=>p(x),children:[l.jsxs("div",{style:S.messageHeader,children:[l.jsx("div",{style:S.messageAvatar,children:x.name.charAt(0).toUpperCase()}),l.jsxs("div",{style:S.messageHeaderInfo,children:[l.jsx("h3",{style:S.messageName,children:x.name}),l.jsx("p",{style:S.messageEmail,children:x.email})]}),l.jsx("button",{onClick:m=>{m.stopPropagation(),u(x.id)},style:S.deleteIconButton,children:l.jsx($e,{size:18})})]}),l.jsx("h4",{style:S.messageSubject,children:x.subject||"No Subject"}),l.jsxs("p",{style:S.messageText,children:[x.message.substring(0,120),"..."]}),l.jsx("span",{style:S.messageDate,children:new Date(x.createdAt).toLocaleDateString()})]},x.id))}),l.jsxs("div",{style:S.pagination,children:[l.jsxs("button",{onClick:()=>s(x=>Math.max(1,x-1)),disabled:r===1,style:{...S.pageButton,...r===1?S.pageButtonDisabled:{}},children:[l.jsx(ma,{size:20})," Previous"]}),l.jsxs("span",{style:S.pageInfo,children:["Page ",r," of ",o]}),l.jsxs("button",{onClick:()=>s(x=>Math.min(o,x+1)),disabled:r===o,style:{...S.pageButton,...r===o?S.pageButtonDisabled:{}},children:["Next ",l.jsx(ba,{size:20})]})]}),d&&l.jsx("div",{style:S.modalOverlay,onClick:()=>p(null),children:l.jsxs("div",{style:S.modal,onClick:x=>x.stopPropagation(),children:[l.jsxs("div",{style:S.modalHeader,children:[l.jsx("h2",{style:S.modalTitle,children:"Message Details"}),l.jsx("button",{onClick:()=>p(null),style:S.modalClose,children:l.jsx(et,{size:24})})]}),l.jsxs("div",{style:S.modalBody,children:[l.jsxs("div",{style:S.messageDetailSection,children:[l.jsx("strong",{children:"From:"})," ",d.name," (",d.email,")"]}),l.jsxs("div",{style:S.messageDetailSection,children:[l.jsx("strong",{children:"Subject:"})," ",d.subject||"No Subject"]}),l.jsxs("div",{style:S.messageDetailSection,children:[l.jsx("strong",{children:"Message:"}),l.jsx("p",{style:S.messageDetailText,children:d.message})]}),l.jsxs("div",{style:S.messageDetailSection,children:[l.jsx("strong",{children:"Received:"})," ",new Date(d.createdAt).toLocaleString()]})]}),l.jsx("div",{style:S.modalFooter,children:l.jsxs("button",{onClick:()=>u(d.id),style:S.deleteButton,children:[l.jsx($e,{size:20})," Delete"]})})]})})]})},Ol=Lx+"/courses",A4=()=>{var Q;const[e,t]=b.useState("1"),[a,n]=b.useState(null),[i,r]=b.useState(!0),[s,o]=b.useState(null),[c,d]=b.useState(!1),[p,f]=b.useState(!1),[u,x]=b.useState(null),[m,j]=b.useState({title:"",description:"",category:"",price:0,originalPrice:0,imageUrl:"",whatYouLearn:"",includes:"",companies:""}),[w,h]=b.useState({day:"",title:"",duration:""}),[g,v]=b.useState({title:"",duration:"",videoUrl:""});b.useEffect(()=>{k()},[e]);const y=(R,I)=>{o({type:R,message:I}),setTimeout(()=>o(null),3e3)},k=async()=>{try{r(!0);const R=await fetch(`${Ol}/${e}/detail`);if(!R.ok)throw new Error("Failed to load course");const I=await R.json();n(I),j({title:I.title,description:I.description,category:I.category,price:I.price,originalPrice:I.originalPrice,imageUrl:I.imageUrl,whatYouLearn:I.whatYouLearn.join(`
`),includes:I.includes.join(`
`),companies:I.companies.join(`
`)})}catch{y("error","Failed to load course details")}finally{r(!1)}},G=async()=>{try{(await fetch(`${Ht}/Courses/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:m.title,description:m.description,category:m.category,price:m.price,originalPrice:m.originalPrice,imageUrl:m.imageUrl,whatYouLearn:m.whatYouLearn.split(`
`).filter(Boolean),includes:m.includes.split(`
`).filter(Boolean),companies:m.companies.split(`
`).filter(Boolean)})})).ok&&(y("success","Course updated successfully!"),d(!1),k())}catch{y("error","Failed to update course")}},C=async()=>{try{(await fetch(`${Ol}/sections`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({courseId:parseInt(e),day:w.day,title:w.title,duration:w.duration})})).ok&&(y("success","Section created successfully!"),f(!1),h({day:"",title:"",duration:""}),k())}catch{y("error","Failed to create section")}},T=async R=>{if(confirm("Delete this section and all its lectures?"))try{(await fetch(`${Ol}/sections/${R}`,{method:"DELETE"})).ok&&(y("success","Section deleted successfully!"),k())}catch{y("error","Failed to delete section")}},O=async R=>{try{(await fetch(`${Ol}/lectures`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sectionId:R,title:g.title,duration:g.duration,videoUrl:g.videoUrl||null})})).ok&&(y("success","Lecture created successfully!"),x(null),v({title:"",duration:"",videoUrl:""}),k())}catch{y("error","Failed to create lecture")}},E=async R=>{if(confirm("Delete this lecture?"))try{(await fetch(`${Ol}/lectures/${R}`,{method:"DELETE"})).ok&&(y("success","Lecture deleted successfully!"),k())}catch{y("error","Failed to delete lecture")}};return i?l.jsxs("div",{style:Y.loadingContainer,children:[l.jsx("div",{style:Y.spinner}),l.jsx("p",{style:Y.loadingText,children:"Loading course details..."})]}):a?l.jsxs("div",{style:Y.container,children:[s&&l.jsxs("div",{style:{...Y.notification,...s.type==="success"?Y.notificationSuccess:Y.notificationError},children:[s.type==="success"?l.jsx(st,{size:24}):l.jsx(Bs,{size:24}),l.jsx("span",{children:s.message})]}),l.jsxs("div",{style:Y.header,children:[l.jsx("h1",{style:Y.mainTitle,children:"📚 Course Management"}),l.jsxs("div",{style:Y.courseSelector,children:[l.jsx("label",{style:Y.selectorLabel,children:"Select Course ID:"}),l.jsx("input",{type:"number",value:e,onChange:R=>t(R.target.value),style:Y.selectorInput,min:"1"}),l.jsx("button",{onClick:k,style:Y.loadButton,children:"Load"})]})]}),l.jsxs("div",{style:Y.card,children:[l.jsxs("div",{style:Y.cardHeader,children:[l.jsx("h2",{style:Y.cardTitle,children:"📖 Course Information"}),l.jsxs("button",{onClick:()=>d(!c),style:Y.editButton,children:[l.jsx(Wt,{size:18})," ",c?"Cancel":"Edit"]})]}),c?l.jsxs("div",{style:Y.form,children:[l.jsxs("div",{style:Y.formRow,children:[l.jsxs("div",{style:Y.formGroup,children:[l.jsx("label",{style:Y.label,children:"Title"}),l.jsx("input",{type:"text",value:m.title,onChange:R=>j({...m,title:R.target.value}),style:Y.input})]}),l.jsxs("div",{style:Y.formGroup,children:[l.jsx("label",{style:Y.label,children:"Category"}),l.jsx("input",{type:"text",value:m.category,onChange:R=>j({...m,category:R.target.value}),style:Y.input})]})]}),l.jsxs("div",{style:Y.formGroup,children:[l.jsx("label",{style:Y.label,children:"Description"}),l.jsx("textarea",{value:m.description,onChange:R=>j({...m,description:R.target.value}),style:Y.textarea,rows:4})]}),l.jsxs("div",{style:Y.formRow,children:[l.jsxs("div",{style:Y.formGroup,children:[l.jsx("label",{style:Y.label,children:"Price (₹)"}),l.jsx("input",{type:"number",value:m.price,onChange:R=>j({...m,price:parseFloat(R.target.value)}),style:Y.input})]}),l.jsxs("div",{style:Y.formGroup,children:[l.jsx("label",{style:Y.label,children:"Original Price (₹)"}),l.jsx("input",{type:"number",value:m.originalPrice,onChange:R=>j({...m,originalPrice:parseFloat(R.target.value)}),style:Y.input})]})]}),l.jsxs("div",{style:Y.formGroup,children:[l.jsx("label",{style:Y.label,children:"Image URL"}),l.jsx("input",{type:"url",value:m.imageUrl,onChange:R=>j({...m,imageUrl:R.target.value}),style:Y.input})]}),l.jsxs("button",{onClick:G,style:Y.saveButton,children:[l.jsx(vr,{size:20})," Save Changes"]})]}):l.jsxs("div",{style:Y.courseInfo,children:[l.jsx("img",{src:a.imageUrl,alt:a.title,style:Y.courseImage}),l.jsxs("div",{style:Y.infoGrid,children:[l.jsxs("div",{children:[l.jsx("strong",{children:"Title:"})," ",a.title]}),l.jsxs("div",{children:[l.jsx("strong",{children:"Category:"})," ",a.category]}),l.jsxs("div",{children:[l.jsx("strong",{children:"Price:"})," ₹",a.price]}),l.jsxs("div",{children:[l.jsx("strong",{children:"Students:"})," ",a.studentCount]}),l.jsxs("div",{children:[l.jsx("strong",{children:"Rating:"})," ⭐ ",a.rating.toFixed(1)]}),l.jsxs("div",{children:[l.jsx("strong",{children:"Instructor:"})," ",((Q=a.instructor)==null?void 0:Q.name)||"N/A"]})]}),l.jsx("p",{style:Y.description,children:a.description})]})]}),l.jsxs("div",{style:Y.card,children:[l.jsxs("div",{style:Y.cardHeader,children:[l.jsxs("h2",{style:Y.cardTitle,children:["🎬 Course Content (",a.courseSections.length," sections)"]}),l.jsxs("button",{onClick:()=>f(!0),style:Y.addButton,children:[l.jsx(Ya,{size:18})," Add Section"]})]}),p&&l.jsxs("div",{style:Y.addForm,children:[l.jsx("input",{type:"text",placeholder:"Day (e.g., Day 1)",value:w.day,onChange:R=>h({...w,day:R.target.value}),style:Y.inputSmall}),l.jsx("input",{type:"text",placeholder:"Section Title",value:w.title,onChange:R=>h({...w,title:R.target.value}),style:Y.input}),l.jsx("input",{type:"text",placeholder:"Duration (e.g., 2h 30m)",value:w.duration,onChange:R=>h({...w,duration:R.target.value}),style:Y.inputSmall}),l.jsx("button",{onClick:C,style:Y.submitButton,children:"Create"}),l.jsx("button",{onClick:()=>f(!1),style:Y.cancelButton,children:"Cancel"})]}),a.courseSections.map(R=>l.jsxs("div",{style:Y.section,children:[l.jsxs("div",{style:Y.sectionHeader,children:[l.jsxs("div",{style:Y.sectionInfo,children:[l.jsxs("h3",{style:Y.sectionTitle,children:["📂 ",R.title]}),l.jsxs("span",{style:Y.sectionMeta,children:[R.day," • ",R.duration," • ",R.lectures.length," lectures"]})]}),l.jsxs("div",{style:Y.actions,children:[l.jsx("button",{onClick:()=>x(R.id),style:Y.iconButton,children:l.jsx(Ya,{size:16})}),l.jsx("button",{onClick:()=>T(R.id),style:Y.deleteIconButton,children:l.jsx($e,{size:16})})]})]}),u===R.id&&l.jsxs("div",{style:Y.addForm,children:[l.jsx("input",{type:"text",placeholder:"Lecture Title",value:g.title,onChange:I=>v({...g,title:I.target.value}),style:Y.input}),l.jsx("input",{type:"text",placeholder:"Duration (e.g., 15:30)",value:g.duration,onChange:I=>v({...g,duration:I.target.value}),style:Y.inputSmall}),l.jsx("input",{type:"url",placeholder:"Video URL (optional)",value:g.videoUrl,onChange:I=>v({...g,videoUrl:I.target.value}),style:Y.input}),l.jsx("button",{onClick:()=>O(R.id),style:Y.submitButton,children:"Add"}),l.jsx("button",{onClick:()=>x(null),style:Y.cancelButton,children:"Cancel"})]}),l.jsx("div",{style:Y.lectureList,children:R.lectures.length===0?l.jsx("p",{style:Y.emptyText,children:"No lectures yet"}):R.lectures.map(I=>l.jsxs("div",{style:Y.lectureItem,children:[l.jsx(wr,{size:20,color:"#667eea"}),l.jsxs("div",{style:Y.lectureInfo,children:[l.jsx("span",{style:Y.lectureTitle,children:I.title}),l.jsxs("span",{style:Y.lectureMeta,children:[I.duration," ",I.videoUrl&&"• Has Video"]})]}),l.jsx("button",{onClick:()=>E(I.id),style:Y.deleteIconButton,children:l.jsx($e,{size:16})})]},I.id))})]},R.id)),a.courseSections.length===0&&l.jsx("div",{style:Y.emptyState,children:l.jsx("p",{style:Y.emptyStateText,children:"No sections yet. Add your first section to get started!"})})]})]}):l.jsx("div",{style:Y.errorContainer,children:"Course not found"})},Y={container:{maxWidth:"1200px",margin:"0 auto",padding:"32px",fontFamily:"system-ui, -apple-system, sans-serif"},header:{marginBottom:"32px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"16px"},mainTitle:{fontSize:"32px",fontWeight:900,background:"linear-gradient(135deg, #667eea, #764ba2)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",margin:0},courseSelector:{display:"flex",gap:"12px",alignItems:"center",background:"white",padding:"12px 20px",borderRadius:"12px",boxShadow:"0 2px 8px rgba(0,0,0,0.1)"},selectorLabel:{fontSize:"14px",fontWeight:600,color:"#1f2937"},selectorInput:{width:"80px",padding:"8px 12px",fontSize:"15px",border:"2px solid #e5e7eb",borderRadius:"8px",outline:"none"},loadButton:{padding:"8px 16px",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:600,cursor:"pointer"},card:{background:"white",borderRadius:"16px",padding:"32px",marginBottom:"24px",boxShadow:"0 1px 3px rgba(0,0,0,0.1)"},cardHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexWrap:"wrap",gap:"12px"},cardTitle:{fontSize:"22px",fontWeight:800,color:"#1f2937",margin:0},courseInfo:{display:"flex",flexDirection:"column",gap:"20px"},courseImage:{width:"100%",maxWidth:"400px",height:"240px",objectFit:"cover",borderRadius:"12px"},infoGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"16px",fontSize:"15px",color:"#1f2937"},description:{fontSize:"15px",color:"#6b7280",lineHeight:"1.6"},form:{display:"flex",flexDirection:"column",gap:"20px"},formRow:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:"20px"},formGroup:{display:"flex",flexDirection:"column",gap:"8px"},label:{fontSize:"14px",fontWeight:600,color:"#374151"},input:{padding:"12px 16px",fontSize:"15px",border:"2px solid #e5e7eb",borderRadius:"10px",outline:"none",flex:1},inputSmall:{padding:"8px 12px",fontSize:"14px",border:"2px solid #e5e7eb",borderRadius:"8px",outline:"none",width:"150px"},textarea:{padding:"12px 16px",fontSize:"15px",border:"2px solid #e5e7eb",borderRadius:"10px",outline:"none",resize:"vertical",fontFamily:"inherit"},editButton:{padding:"10px 20px",background:"#eff6ff",color:"#3b82f6",border:"none",borderRadius:"10px",fontSize:"14px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px"},saveButton:{padding:"14px 24px",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",border:"none",borderRadius:"12px",fontSize:"15px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",justifyContent:"center",alignSelf:"flex-start"},addButton:{padding:"10px 20px",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",border:"none",borderRadius:"10px",fontSize:"14px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px"},section:{border:"2px solid #e5e7eb",borderRadius:"12px",padding:"20px",marginBottom:"16px",background:"#fafafa"},sectionHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px"},sectionInfo:{flex:1},sectionTitle:{fontSize:"18px",fontWeight:700,color:"#1f2937",margin:"0 0 8px 0"},sectionMeta:{fontSize:"14px",color:"#6b7280"},lectureList:{display:"flex",flexDirection:"column",gap:"12px"},lectureItem:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",background:"white",borderRadius:"8px",border:"1px solid #e5e7eb"},lectureInfo:{flex:1,display:"flex",flexDirection:"column",gap:"4px"},lectureTitle:{fontSize:"15px",fontWeight:600,color:"#1f2937"},lectureMeta:{fontSize:"13px",color:"#6b7280"},addForm:{display:"flex",gap:"12px",alignItems:"center",padding:"16px",background:"white",borderRadius:"12px",marginBottom:"16px",flexWrap:"wrap",border:"2px dashed #e5e7eb"},submitButton:{padding:"10px 20px",background:"#10b981",color:"white",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:600,cursor:"pointer"},cancelButton:{padding:"10px 20px",background:"#6b7280",color:"white",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:600,cursor:"pointer"},actions:{display:"flex",gap:"8px"},iconButton:{width:"36px",height:"36px",borderRadius:"8px",border:"none",background:"#eff6ff",color:"#3b82f6",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},deleteIconButton:{width:"36px",height:"36px",borderRadius:"8px",border:"none",background:"#fef2f2",color:"#ef4444",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},emptyText:{textAlign:"center",color:"#9ca3af",fontSize:"14px",padding:"20px"},emptyState:{textAlign:"center",padding:"40px",color:"#6b7280"},emptyStateText:{fontSize:"16px"},notification:{position:"fixed",top:"20px",right:"20px",padding:"16px 24px",borderRadius:"12px",display:"flex",alignItems:"center",gap:"12px",fontWeight:600,fontSize:"15px",zIndex:1e4,boxShadow:"0 10px 40px rgba(0,0,0,0.2)"},notificationSuccess:{background:"linear-gradient(135deg, #10b981, #059669)",color:"white"},notificationError:{background:"linear-gradient(135deg, #ef4444, #dc2626)",color:"white"},loadingContainer:{minHeight:"400px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},spinner:{width:"50px",height:"50px",border:"4px solid #e5e7eb",borderTop:"4px solid #667eea",borderRadius:"50%",animation:"spin 1s linear infinite"},loadingText:{marginTop:"20px",fontSize:"16px",color:"#6b7280"},errorContainer:{padding:"40px",textAlign:"center",fontSize:"18px",color:"#ef4444"}},Bg=document.createElement("style");Bg.textContent=`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;document.head.appendChild(Bg);const St=Ht,R4=()=>{const[e,t]=b.useState([]),[a,n]=b.useState([]),[i,r]=b.useState(null),[s,o]=b.useState([]),[c,d]=b.useState(!1),[p,f]=b.useState(null),[u,x]=b.useState("create"),[m,j]=b.useState(new Set),[w,h]=b.useState(!1),[g,v]=b.useState(!1),[y,k]=b.useState(!1),[G,C]=b.useState(null),[T,O]=b.useState(null),[E,Q]=b.useState(null),[R,I]=b.useState({title:"",description:"",category:"",subcategory:"",price:0,originalPrice:0,badge:"NEW",instructorId:0,imageUrl:"",whatYouLearn:"",includes:"",companies:""}),[F,P]=b.useState({day:"",title:"",duration:""}),[L,q]=b.useState({title:"",duration:"",videoUrl:""});b.useEffect(()=>{ae(),A()},[]),b.useEffect(()=>{i&&H(i.id)},[i]);const U=(B,ge)=>{f({type:B,message:ge}),setTimeout(()=>f(null),3e3)},ae=async()=>{try{const ge=await(await fetch(`${St}/Courses`)).json();t(ge)}catch{U("error","Failed to load courses")}},A=async()=>{try{const ge=await(await fetch(`${St}/Admin/instructors`)).json();n(ge)}catch{U("error","Failed to load instructors")}},H=async B=>{var ge;try{d(!0);const ru=await(await fetch(`${St}/Admin/courses/${B}/detail`)).json();o(ru.courseSections||[]),j(new Set(((ge=ru.courseSections)==null?void 0:ge.map((M4,Gg)=>Gg))||[]))}catch{U("error","Failed to load course sections"),o([])}finally{d(!1)}},K=async()=>{if(!R.title||!R.instructorId){U("error","Please fill required fields");return}try{(await fetch(`${St}/Admin/courses`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:R.title,description:R.description,category:R.category,subcategory:R.subcategory,price:R.price,originalPrice:R.originalPrice,badge:R.badge,instructorId:R.instructorId,imageUrl:R.imageUrl,whatYouLearn:R.whatYouLearn.split(`
`).filter(Boolean),includes:R.includes.split(`
`).filter(Boolean),companies:R.companies.split(`
`).filter(Boolean)})})).ok?(U("success","Course created successfully!"),h(!1),qs(),ae()):U("error","Failed to create course")}catch{U("error","Error creating course")}},Ce=async()=>{if(i)try{(await fetch(`${St}/Courses/${i.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:R.title,description:R.description,category:R.category,subcategory:R.subcategory,price:R.price,originalPrice:R.originalPrice,badge:R.badge,imageUrl:R.imageUrl,whatYouLearn:R.whatYouLearn.split(`
`).filter(Boolean),includes:R.includes.split(`
`).filter(Boolean),companies:R.companies.split(`
`).filter(Boolean)})})).ok&&(U("success","Course updated successfully!"),v(!1),ae())}catch{U("error","Failed to update course")}},at=async(B,ge)=>{if(confirm(`Delete "${ge}"?`))try{(await fetch(`${St}/Admin/courses/${B}`,{method:"DELETE"})).ok&&(U("success","Course deleted!"),ae(),(i==null?void 0:i.id)===B&&r(null))}catch{U("error","Failed to delete course")}},$t=async()=>{if(!i||!F.day||!F.title){U("error","Please fill all fields");return}try{(await fetch(`${St}/Admin/courses/sections`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({courseId:i.id,day:F.day,title:F.title,duration:F.duration})})).ok&&(U("success","Section created!"),k(!1),P({day:"",title:"",duration:""}),H(i.id))}catch{U("error","Error creating section")}},Dg=async()=>{if(T)try{(await fetch(`${St}/Admin/courses/sections/${T.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({day:F.day,title:F.title,duration:F.duration})})).ok&&(U("success","Section updated!"),O(null),P({day:"",title:"",duration:""}),i&&H(i.id))}catch{U("error","Error updating section")}},Mg=async B=>{if(confirm("Delete this section and all lectures?"))try{(await fetch(`${St}/Admin/courses/sections/${B}`,{method:"DELETE"})).ok&&(U("success","Section deleted!"),i&&H(i.id))}catch{U("error","Error deleting section")}},Lg=async B=>{if(!L.title||!L.duration){U("error","Please fill all fields");return}try{(await fetch(`${St}/Admin/courses/lectures`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sectionId:B,title:L.title,duration:L.duration,videoUrl:L.videoUrl||null})})).ok&&(U("success","Lecture created!"),C(null),q({title:"",duration:"",videoUrl:""}),i&&H(i.id))}catch{U("error","Error creating lecture")}},Ug=async()=>{if(E)try{(await fetch(`${St}/Admin/courses/lectures/${E.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:L.title,duration:L.duration,videoUrl:L.videoUrl||null})})).ok&&(U("success","Lecture updated!"),Q(null),q({title:"",duration:"",videoUrl:""}),i&&H(i.id))}catch{U("error","Error updating lecture")}},Hg=async B=>{if(confirm("Delete this lecture?"))try{(await fetch(`${St}/Admin/courses/lectures/${B}`,{method:"DELETE"})).ok&&(U("success","Lecture deleted!"),i&&H(i.id))}catch{U("error","Error deleting lecture")}},qs=()=>{I({title:"",description:"",category:"",subcategory:"",price:0,originalPrice:0,badge:"NEW",instructorId:0,imageUrl:"",whatYouLearn:"",includes:"",companies:""})},_g=B=>{const ge=new Set(m);ge.has(B)?ge.delete(B):ge.add(B),j(ge)};return l.jsxs("div",{style:N.container,children:[p&&l.jsxs("div",{style:{...N.notification,...p.type==="success"?N.notificationSuccess:N.notificationError},children:[p.type==="success"?l.jsx(st,{size:24}):l.jsx(Bs,{size:24}),l.jsx("span",{children:p.message})]}),l.jsxs("div",{style:N.header,children:[l.jsxs("div",{children:[l.jsx("h1",{style:N.title,children:"🎓 Complete Course Manager"}),l.jsx("p",{style:N.subtitle,children:"Create courses, add content, and manage everything"})]}),l.jsxs("button",{onClick:()=>h(!0),style:N.createButton,children:[l.jsx(Ya,{size:20})," Create New Course"]})]}),l.jsxs("div",{style:N.tabs,children:[l.jsxs("button",{onClick:()=>x("create"),style:{...N.tab,...u==="create"?N.tabActive:{}},children:[l.jsx(Fe,{size:20})," My Courses (",e.length,")"]}),l.jsxs("button",{onClick:()=>x("manage"),style:{...N.tab,...u==="manage"?N.tabActive:{}},children:[l.jsx(wr,{size:20})," Content Manager"]})]}),u==="create"&&l.jsx("div",{style:N.coursesGrid,children:e.map(B=>l.jsxs("div",{style:N.courseCard,children:[l.jsx("img",{src:B.imageUrl,alt:B.title,style:N.courseImage}),l.jsxs("div",{style:N.courseContent,children:[l.jsx("div",{style:N.courseBadge,children:B.badge}),l.jsx("h3",{style:N.courseTitle,children:B.title}),l.jsxs("p",{style:N.courseCategory,children:[B.category," • ",B.subcategory]}),l.jsxs("div",{style:N.courseStats,children:[l.jsxs("span",{children:["⭐ ",B.rating]}),l.jsxs("span",{children:["👥 ",B.studentCount]}),l.jsxs("span",{children:["₹",B.price]})]}),l.jsxs("div",{style:N.courseActions,children:[l.jsxs("button",{onClick:()=>{r(B),x("manage")},style:N.actionButton,children:[l.jsx(wr,{size:16})," Manage Content"]}),l.jsx("button",{onClick:()=>{r(B),I({title:B.title,description:B.description,category:B.category,subcategory:B.subcategory,price:B.price,originalPrice:B.originalPrice,badge:B.badge,instructorId:B.instructorId,imageUrl:B.imageUrl,whatYouLearn:B.whatYouLearn.join(`
`),includes:B.includes.join(`
`),companies:B.companies.join(`
`)}),v(!0)},style:N.editButton,children:l.jsx(Wt,{size:16})}),l.jsx("button",{onClick:()=>at(B.id,B.title),style:N.deleteButton,children:l.jsx($e,{size:16})})]})]})]},B.id))}),u==="manage"&&l.jsx("div",{style:N.contentManager,children:i?l.jsx(l.Fragment,{children:l.jsxs("div",{style:N.card,children:[l.jsxs("div",{style:N.cardHeader,children:[l.jsxs("div",{children:[l.jsxs("h2",{style:N.cardTitle,children:["📖 ",i.title]}),l.jsxs("p",{style:N.cardSubtitle,children:[s.length," sections • ",s.reduce((B,ge)=>B+ge.lectures.length,0)," lectures"]})]}),l.jsxs("button",{onClick:()=>k(!0),style:N.addButton,children:[l.jsx(Ya,{size:18})," Add Section"]})]}),c?l.jsxs("div",{style:N.loadingContainer,children:[l.jsx("div",{style:N.spinner}),l.jsx("p",{children:"Loading sections..."})]}):s.length===0?l.jsxs("div",{style:N.emptyState,children:[l.jsx("div",{style:N.emptyIcon,children:"📖"}),l.jsx("p",{style:N.emptyText,children:"No sections yet"}),l.jsx("p",{style:N.emptySubtext,children:'Click "Add Section" to create your first section'})]}):l.jsx("div",{style:N.sectionsList,children:s.map((B,ge)=>l.jsxs("div",{style:N.section,children:[l.jsxs("div",{style:N.sectionHeader,onClick:()=>_g(ge),children:[l.jsxs("div",{style:N.sectionHeaderLeft,children:[m.has(ge)?l.jsx(Yx,{size:20}):l.jsx(ls,{size:20}),l.jsxs("div",{children:[l.jsx("h3",{style:N.sectionTitle,children:B.title}),l.jsxs("p",{style:N.sectionMeta,children:[B.day," • ",B.duration," • ",B.lectures.length," lectures"]})]})]}),l.jsxs("div",{style:N.sectionActions,children:[l.jsx("button",{onClick:Ie=>{Ie.stopPropagation(),O(B),P({day:B.day,title:B.title,duration:B.duration})},style:N.iconButton,children:l.jsx(Wt,{size:16})}),l.jsx("button",{onClick:Ie=>{Ie.stopPropagation(),Mg(B.id)},style:N.deleteIconButton,children:l.jsx($e,{size:16})})]})]}),m.has(ge)&&l.jsxs("div",{style:N.sectionContent,children:[l.jsxs("button",{onClick:()=>C(B.id),style:N.addLectureButton,children:[l.jsx(Ya,{size:16})," Add Lecture"]}),B.lectures.length===0?l.jsx("p",{style:N.noLectures,children:"No lectures yet"}):l.jsx("div",{style:N.lecturesList,children:B.lectures.map(Ie=>l.jsxs("div",{style:N.lecture,children:[l.jsx(wr,{size:20,color:"#667eea"}),l.jsxs("div",{style:N.lectureInfo,children:[l.jsx("h4",{style:N.lectureTitle,children:Ie.title}),l.jsxs("p",{style:N.lectureMeta,children:[Ie.duration,Ie.videoUrl&&" • Has Video"]})]}),l.jsxs("div",{style:N.lectureActions,children:[l.jsx("button",{onClick:()=>{Q(Ie),q({title:Ie.title,duration:Ie.duration,videoUrl:Ie.videoUrl||""})},style:N.iconButton,children:l.jsx(Wt,{size:14})}),l.jsx("button",{onClick:()=>Hg(Ie.id),style:N.deleteIconButton,children:l.jsx($e,{size:14})})]})]},Ie.id))})]})]},B.id))})]})}):l.jsxs("div",{style:N.emptyState,children:[l.jsx("div",{style:N.emptyIcon,children:"📚"}),l.jsx("p",{style:N.emptyText,children:"Select a course to manage content"}),l.jsx("p",{style:N.emptySubtext,children:'Go to "My Courses" tab and click "Manage Content"'})]})}),(w||g)&&l.jsx("div",{style:N.modalOverlay,onClick:()=>{h(!1),v(!1),qs()},children:l.jsxs("div",{style:N.modalLarge,onClick:B=>B.stopPropagation(),children:[l.jsxs("div",{style:N.modalHeader,children:[l.jsx("h2",{style:N.modalTitle,children:g?"Edit Course":"Create New Course"}),l.jsx("button",{onClick:()=>{h(!1),v(!1),qs()},style:N.modalClose,children:l.jsx(et,{size:24})})]}),l.jsxs("div",{style:N.modalBody,children:[l.jsxs("div",{style:N.formRow,children:[l.jsxs("div",{style:N.formGroup,children:[l.jsx("label",{style:N.label,children:"Course Title *"}),l.jsx("input",{type:"text",value:R.title,onChange:B=>I({...R,title:B.target.value}),style:N.input,placeholder:"Complete Python Programming"})]}),l.jsxs("div",{style:N.formGroup,children:[l.jsx("label",{style:N.label,children:"Instructor *"}),l.jsxs("select",{value:R.instructorId,onChange:B=>I({...R,instructorId:parseInt(B.target.value)}),style:N.input,children:[l.jsx("option",{value:0,children:"Select Instructor"}),a.map(B=>l.jsx("option",{value:B.id,children:B.name},B.id))]})]})]}),l.jsxs("div",{style:N.formGroup,children:[l.jsx("label",{style:N.label,children:"Description"}),l.jsx("textarea",{value:R.description,onChange:B=>I({...R,description:B.target.value}),style:N.textarea,rows:3,placeholder:"Learn Python from basics to advanced..."})]}),l.jsxs("div",{style:N.formRow,children:[l.jsxs("div",{style:N.formGroup,children:[l.jsx("label",{style:N.label,children:"Category"}),l.jsx("input",{type:"text",value:R.category,onChange:B=>I({...R,category:B.target.value}),style:N.input,placeholder:"Development"})]}),l.jsxs("div",{style:N.formGroup,children:[l.jsx("label",{style:N.label,children:"Subcategory"}),l.jsx("input",{type:"text",value:R.subcategory,onChange:B=>I({...R,subcategory:B.target.value}),style:N.input,placeholder:"Python"})]}),l.jsxs("div",{style:N.formGroup,children:[l.jsx("label",{style:N.label,children:"Badge"}),l.jsxs("select",{value:R.badge,onChange:B=>I({...R,badge:B.target.value}),style:N.input,children:[l.jsx("option",{value:"NEW",children:"NEW"}),l.jsx("option",{value:"BESTSELLER",children:"BESTSELLER"}),l.jsx("option",{value:"HOT",children:"HOT"})]})]})]}),l.jsxs("div",{style:N.formRow,children:[l.jsxs("div",{style:N.formGroup,children:[l.jsx("label",{style:N.label,children:"Price (₹)"}),l.jsx("input",{type:"number",value:R.price,onChange:B=>I({...R,price:parseFloat(B.target.value)}),style:N.input})]}),l.jsxs("div",{style:N.formGroup,children:[l.jsx("label",{style:N.label,children:"Original Price (₹)"}),l.jsx("input",{type:"number",value:R.originalPrice,onChange:B=>I({...R,originalPrice:parseFloat(B.target.value)}),style:N.input})]})]}),l.jsxs("div",{style:N.formGroup,children:[l.jsx("label",{style:N.label,children:"Image URL"}),l.jsx("input",{type:"url",value:R.imageUrl,onChange:B=>I({...R,imageUrl:B.target.value}),style:N.input,placeholder:"https://example.com/image.jpg"})]}),l.jsxs("div",{style:N.formGroup,children:[l.jsx("label",{style:N.label,children:"What You'll Learn (one per line)"}),l.jsx("textarea",{value:R.whatYouLearn,onChange:B=>I({...R,whatYouLearn:B.target.value}),style:N.textarea,rows:3,placeholder:`Python Basics
OOP Concepts
Web Scraping`})]}),l.jsxs("div",{style:N.formGroup,children:[l.jsx("label",{style:N.label,children:"Includes (one per line)"}),l.jsx("textarea",{value:R.includes,onChange:B=>I({...R,includes:B.target.value}),style:N.textarea,rows:3,placeholder:`50 hours video
Certificate
Lifetime access`})]}),l.jsxs("div",{style:N.formGroup,children:[l.jsx("label",{style:N.label,children:"Companies (one per line)"}),l.jsx("textarea",{value:R.companies,onChange:B=>I({...R,companies:B.target.value}),style:N.textarea,rows:2,placeholder:`Google
Amazon
Microsoft`})]}),l.jsxs("button",{onClick:g?Ce:K,style:N.submitButton,children:[l.jsx(vr,{size:20}),g?"Update Course":"Create Course"]})]})]})}),(y||T)&&l.jsx("div",{style:N.modalOverlay,onClick:()=>{k(!1),O(null),P({day:"",title:"",duration:""})},children:l.jsxs("div",{style:N.modal,onClick:B=>B.stopPropagation(),children:[l.jsxs("div",{style:N.modalHeader,children:[l.jsx("h2",{style:N.modalTitle,children:T?"Edit Section":"Add Section"}),l.jsx("button",{onClick:()=>{k(!1),O(null),P({day:"",title:"",duration:""})},style:N.modalClose,children:l.jsx(et,{size:24})})]}),l.jsxs("div",{style:N.modalBody,children:[l.jsxs("div",{style:N.formGroup,children:[l.jsx("label",{style:N.label,children:"Day"}),l.jsx("input",{type:"text",value:F.day,onChange:B=>P({...F,day:B.target.value}),style:N.input,placeholder:"Day 1"})]}),l.jsxs("div",{style:N.formGroup,children:[l.jsx("label",{style:N.label,children:"Section Title"}),l.jsx("input",{type:"text",value:F.title,onChange:B=>P({...F,title:B.target.value}),style:N.input,placeholder:"Introduction to Python"})]}),l.jsxs("div",{style:N.formGroup,children:[l.jsx("label",{style:N.label,children:"Duration"}),l.jsx("input",{type:"text",value:F.duration,onChange:B=>P({...F,duration:B.target.value}),style:N.input,placeholder:"4 hours"})]}),l.jsxs("button",{onClick:T?Dg:$t,style:N.submitButton,children:[l.jsx(vr,{size:20}),T?"Update Section":"Create Section"]})]})]})}),(G!==null||E)&&l.jsx("div",{style:N.modalOverlay,onClick:()=>{C(null),Q(null),q({title:"",duration:"",videoUrl:""})},children:l.jsxs("div",{style:N.modal,onClick:B=>B.stopPropagation(),children:[l.jsxs("div",{style:N.modalHeader,children:[l.jsx("h2",{style:N.modalTitle,children:E?"Edit Lecture":"Add Lecture"}),l.jsx("button",{onClick:()=>{C(null),Q(null),q({title:"",duration:"",videoUrl:""})},style:N.modalClose,children:l.jsx(et,{size:24})})]}),l.jsxs("div",{style:N.modalBody,children:[l.jsxs("div",{style:N.formGroup,children:[l.jsx("label",{style:N.label,children:"Lecture Title"}),l.jsx("input",{type:"text",value:L.title,onChange:B=>q({...L,title:B.target.value}),style:N.input,placeholder:"Variables and Data Types"})]}),l.jsxs("div",{style:N.formGroup,children:[l.jsx("label",{style:N.label,children:"Duration"}),l.jsx("input",{type:"text",value:L.duration,onChange:B=>q({...L,duration:B.target.value}),style:N.input,placeholder:"15 min"})]}),l.jsxs("div",{style:N.formGroup,children:[l.jsx("label",{style:N.label,children:"Video URL (Optional)"}),l.jsx("input",{type:"url",value:L.videoUrl,onChange:B=>q({...L,videoUrl:B.target.value}),style:N.input,placeholder:"https://www.youtube.com/embed/..."})]}),l.jsxs("button",{onClick:E?Ug:()=>Lg(G),style:N.submitButton,children:[l.jsx(vr,{size:20}),E?"Update Lecture":"Add Lecture"]})]})]})})]})},N={container:{maxWidth:"1600px",margin:"0 auto",padding:"32px",fontFamily:"system-ui, -apple-system, sans-serif"},header:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexWrap:"wrap",gap:"16px"},title:{fontSize:"32px",fontWeight:900,background:"linear-gradient(135deg, #667eea, #764ba2)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",margin:"0 0 8px 0"},subtitle:{fontSize:"16px",color:"#6b7280",margin:0},createButton:{padding:"12px 24px",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",border:"none",borderRadius:"10px",fontSize:"15px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px"},tabs:{display:"flex",gap:"12px",marginBottom:"24px",borderBottom:"2px solid #e5e7eb"},tab:{padding:"12px 24px",background:"transparent",border:"none",borderBottom:"3px solid transparent",color:"#6b7280",fontSize:"15px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",transition:"all 0.2s"},tabActive:{color:"#667eea",borderBottomColor:"#667eea"},coursesGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))",gap:"24px"},courseCard:{background:"white",borderRadius:"16px",overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.1)",transition:"transform 0.3s"},courseImage:{width:"100%",height:"180px",objectFit:"cover"},courseContent:{padding:"20px"},courseBadge:{display:"inline-block",padding:"4px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:700,background:"#fef3c7",color:"#d97706",marginBottom:"12px"},courseTitle:{fontSize:"18px",fontWeight:700,color:"#1f2937",margin:"0 0 8px 0"},courseCategory:{fontSize:"14px",color:"#6b7280",margin:"0 0 12px 0"},courseStats:{display:"flex",gap:"16px",fontSize:"14px",color:"#1f2937",marginBottom:"16px",paddingTop:"12px",borderTop:"1px solid #f3f4f6"},courseActions:{display:"flex",gap:"8px"},actionButton:{flex:1,padding:"8px 12px",background:"#eff6ff",color:"#3b82f6",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px"},editButton:{width:"36px",height:"36px",borderRadius:"8px",border:"none",background:"#eff6ff",color:"#3b82f6",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},deleteButton:{width:"36px",height:"36px",borderRadius:"8px",border:"none",background:"#fef2f2",color:"#ef4444",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},contentManager:{minHeight:"400px"},card:{background:"white",borderRadius:"16px",padding:"32px",boxShadow:"0 2px 8px rgba(0,0,0,0.1)"},cardHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px",flexWrap:"wrap",gap:"16px"},cardTitle:{fontSize:"22px",fontWeight:800,color:"#1f2937",margin:"0 0 4px 0"},cardSubtitle:{fontSize:"14px",color:"#6b7280",margin:0},addButton:{padding:"10px 20px",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",border:"none",borderRadius:"10px",fontSize:"14px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px"},loadingContainer:{display:"flex",flexDirection:"column",alignItems:"center",padding:"60px 20px"},spinner:{width:"50px",height:"50px",border:"4px solid #e5e7eb",borderTop:"4px solid #667eea",borderRadius:"50%",animation:"spin 1s linear infinite"},emptyState:{textAlign:"center",padding:"60px 20px"},emptyIcon:{fontSize:"64px",marginBottom:"16px"},emptyText:{fontSize:"18px",fontWeight:700,color:"#1f2937",margin:"0 0 8px 0"},emptySubtext:{fontSize:"15px",color:"#9ca3af",margin:0},sectionsList:{display:"flex",flexDirection:"column",gap:"16px"},section:{border:"2px solid #e5e7eb",borderRadius:"12px",overflow:"hidden",background:"white"},sectionHeader:{padding:"20px",display:"flex",justifyContent:"space-between",alignItems:"center",background:"#f9fafb",cursor:"pointer"},sectionHeaderLeft:{display:"flex",alignItems:"center",gap:"16px",flex:1},sectionTitle:{fontSize:"18px",fontWeight:700,color:"#1f2937",margin:"0 0 4px 0"},sectionMeta:{fontSize:"14px",color:"#6b7280",margin:0},sectionActions:{display:"flex",gap:"8px"},sectionContent:{padding:"20px",background:"white",borderTop:"1px solid #e5e7eb"},addLectureButton:{padding:"10px 20px",background:"#eff6ff",color:"#3b82f6",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",marginBottom:"16px"},lecturesList:{display:"flex",flexDirection:"column",gap:"12px"},lecture:{padding:"16px",background:"#f9fafb",borderRadius:"8px",display:"flex",alignItems:"center",gap:"16px",border:"1px solid #e5e7eb"},lectureInfo:{flex:1},lectureTitle:{fontSize:"15px",fontWeight:600,color:"#1f2937",margin:"0 0 4px 0"},lectureMeta:{fontSize:"13px",color:"#6b7280",margin:0},lectureActions:{display:"flex",gap:"8px"},iconButton:{width:"36px",height:"36px",borderRadius:"8px",border:"none",background:"#eff6ff",color:"#3b82f6",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},deleteIconButton:{width:"36px",height:"36px",borderRadius:"8px",border:"none",background:"#fef2f2",color:"#ef4444",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},noLectures:{textAlign:"center",color:"#9ca3af",fontSize:"14px",padding:"20px"},modalOverlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3},modal:{background:"white",borderRadius:"20px",maxWidth:"600px",width:"90%",maxHeight:"90vh",overflow:"auto"},modalLarge:{background:"white",borderRadius:"20px",maxWidth:"800px",width:"90%",maxHeight:"90vh",overflow:"auto"},modalHeader:{padding:"24px",borderBottom:"1px solid #e5e7eb",display:"flex",justifyContent:"space-between",alignItems:"center"},modalTitle:{fontSize:"24px",fontWeight:700,color:"#1f2937",margin:0},modalClose:{width:"40px",height:"40px",borderRadius:"10px",border:"none",background:"#f3f4f6",color:"#1f2937",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},modalBody:{padding:"24px"},formGroup:{marginBottom:"20px"},formRow:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"20px",marginBottom:"20px"},label:{display:"block",fontSize:"14px",fontWeight:600,color:"#374151",marginBottom:"8px"},input:{width:"100%",padding:"12px 16px",borderRadius:"10px",border:"1px solid #d1d5db",fontSize:"14px",outline:"none"},textarea:{width:"100%",padding:"12px 16px",borderRadius:"10px",border:"1px solid #d1d5db",fontSize:"14px",outline:"none",fontFamily:"inherit",resize:"vertical"},submitButton:{width:"100%",padding:"14px 24px",background:"linear-gradient(135deg, #667eea, #764ba2)",color:"white",border:"none",borderRadius:"12px",fontSize:"16px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},notification:{position:"fixed",top:"20px",right:"20px",padding:"16px 24px",borderRadius:"12px",display:"flex",alignItems:"center",gap:"12px",color:"white",zIndex:1100},notificationSuccess:{background:"#10b981"},notificationError:{background:"#ef4444"}},Og=document.createElement("style");Og.textContent="@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }";document.head.appendChild(Og);const B4=()=>l.jsx(m4,{children:l.jsxs(Ox,{children:[l.jsx(Re,{path:"/",element:l.jsx(y4,{})}),l.jsx(Re,{path:"/users",element:l.jsx(v4,{})}),l.jsx(Re,{path:"/courses",element:l.jsx(j4,{})}),l.jsx(Re,{path:"/messages",element:l.jsx(w4,{})}),l.jsx(Re,{path:"/course-crud",element:l.jsx(Tg,{})}),l.jsx(Re,{path:"/complete-lms-admin",element:l.jsx(S4,{})}),l.jsx(Re,{path:"/course/:courseId",element:l.jsx(A4,{})}),l.jsx(Re,{path:"/complete-manager",element:l.jsx(R4,{})})]})}),nr={hello:"👋 Hello! Welcome to SrinuTechGuru Learning Management System. I'm here to help! What can I assist you with today?",hi:"👋 Hello! Welcome to SrinuTechGuru. How can I help you?",courses:`📚 We offer a wide variety of courses across different categories:
• Programming & Web Development
• Data Science & Analytics
• Cloud & DevOps
• Mobile Development
• UI/UX Design

Visit our home page to browse all available courses or click 'Courses' in the menu!`,course:`📚 Check out our course catalog! You can:
• Browse all courses from the home page
• View course details, ratings, and reviews
• See instructor information
• Check pricing and what's included
• Read student feedback

Just click on any course to learn more!`,category:"📚 Our courses are organized by category. Use the Courses menu to filter and find courses in your area of interest!",instructor:`👨‍🏫 Each course has an experienced instructor. You can view:
• Their name and expertise
• Number of courses they teach
• Student reviews
• Course details

This information is displayed on the course details page.`,enroll:`✅ Enrolling is easy!
1. Browse courses and click on the one you like
2. Click 'Add to Cart' or 'Buy Now'
3. Review your cart
4. Complete payment
5. Start learning immediately!

Once enrolled, you'll see the course in 'My Learning' section.`,enrollment:`✅ To enroll in a course:
• Click 'Add to Cart' to purchase later
• Click 'Buy Now' for immediate enrollment
• Go to your cart and checkout
• Payment is secure and encrypted
• Instant access after payment!`,"how to enroll":`✅ Simple enrollment process:
1. Find a course you like
2. Click 'Add to Cart' (to buy later) or 'Buy Now' (instant)
3. Go to shopping cart
4. Enter payment details
5. Confirm purchase
6. Access course immediately!`,"my learning":`📖 Your 'My Learning' section shows:
• All courses you've enrolled in
• Course progress
• Your certificates
• Learning history

Access it from the header menu!`,"enrolled courses":"📖 View your enrolled courses in 'My Learning' (available in the header menu after login). You'll see your progress and can resume learning anytime!",payment:`💳 Payment Information:
• We accept credit cards & debit cards
• All payments are secure and encrypted
• Payment gateway is PCI-DSS compliant
• Instant confirmation after payment
• No hidden charges

Your transaction is protected!`,price:`💰 Course Pricing:
• Prices vary by course
• Many courses have discounts available
• See pricing on individual course pages
• Check your cart before checkout

Visit a course page to see current pricing!`,discount:`🎉 We offer special discounts and promotions!
• Follow our social media for exclusive deals
• Check course pages for active sales
• Seasonal promotions throughout the year

Keeep an eye out for limited-time offers!`,cost:"💰 Course costs depend on the specific course. You can see the price on each course's detail page. Many courses offer discounts - check the current pricing!",refund:`💵 Our Refund Policy:
✅ 30-Day Money-Back Guarantee
• Full refund within 30 days of purchase
• No questions asked
• Easy refund process
• Your satisfaction is our priority

If you're not happy, we'll refund your money!`,"money back":`💵 Yes! We offer a 30-Day Money-Back Guarantee.
• Enroll risk-free
• Get full refund within 30 days if not satisfied
• Easy refund process
• No complicated terms`,guarantee:`✅ 30-Day Money-Back Guarantee:
• Get a full refund if not satisfied
• Valid for 30 days after purchase
• No questions asked
• Contact our support team to request`,"refund policy":`💵 Our Refund Policy:
• 30-day money-back guarantee
• Full refund if dissatisfied
• Simple refund process
• Contact support for assistance`,certificate:`🎓 Certificate of Completion:
✅ You'll receive a certificate after completing a course
• Digital certificate (downloadable)
• Shareable on LinkedIn and resumes
• Proves your skills and commitment
• Add to your professional portfolio

Certificates are issued upon 100% course completion!`,certification:`🎓 Upon completing a course, you receive:
• Certificate of Completion
• Digital credential
• Shareable certificate
• Professional recognition

Display it proudly on your profile!`,"certificate of completion":"🎓 Yes! Complete a course and earn a Certificate of Completion. It's digital, downloadable, and perfect for your resume and LinkedIn profile!",access:`🎯 Course Access:
✅ Lifetime Access Guarantee
• Access all course materials forever
• Watch videos anytime, anywhere
• Download resources
• Revisit lessons as needed
• Never expires!

Your investment lasts a lifetime!`,lifetime:`♾️ Yes! You get Lifetime Access:
• Access courses forever
• Revisit materials anytime
• Get updates for free
• No expiration date
• Full course access preserved`,duration:`⏱️ Course Duration:
• Varies by course
• Self-paced learning
• Learn at your own speed
• Access lifetime
• No time limits

Check the course details for estimated duration!`,"how long":`⏱️ Courses are self-paced:
• No strict time limits
• Complete at your speed
• Estimated hours shown on course page
• Access lifetime
• Learn whenever you want`,profile:`👤 Your Profile:
• View and edit your information
• Upload profile photo
• Add social media links
• Update bio
• Manage account settings

Visit the Profile page to manage your account!`,account:`🔐 Account Management:
• Login/Sign up securely
• Update profile information
• View enrollment history
• Track progress
• Download certificates

All your learning in one place!`,login:`🔐 How to Login:
• Click 'Log in' button in header
• Enter your email and password
• Secure login with encryption
• Create account if new user

Your account is protected!`,"sign up":`📝 Getting Started:
• Click 'Sign Up' button
• Enter your email and create password
• Complete registration
• Start browsing courses
• Begin your learning journey!

It's free to join!`,support:`💬 Need Help?
• Visit our Contact page
• Email our support team
• We respond within 24 hours
• Available for all your questions
• Professional and friendly support

Don't hesitate to reach out!`,contact:`📧 Contact Us:
• Visit the Contact page (in menu)
• Send us your message
• Get response within 24 hours
• Support team available
• Dedicated to helping you`,help:`🆘 How can we help?
• Courses - Browse and enroll
• Enrollment - How to join courses
• Payment - Secure transactions
• Refunds - 30-day guarantee
• Certificates - Proof of completion
• Support - Contact our team

What would you like to know?`,career:`💼 Career Growth:
• Learn in-demand skills
• Industry expert instructors
• Practical projects
• Certificates for your resume
• Advance your career

Many students launch new careers after our courses!`,learning:`📚 Learning Path:
1. Choose a course
2. Enroll and start learning
3. Complete lessons at your pace
4. Track your progress
5. Earn certificate
6. Apply new skills

Your learning journey starts here!`,skills:`🎯 Skill Development:
• Learn from industry experts
• Hands-on practical content
• Real-world projects
• Up-to-date curriculum
• Certificates to showcase skills

Gain skills that matter!`,default:`I'm not sure about that. I can help with:
• 📚 Courses - Browse & learn
• ✅ Enrollment - How to join
• 💳 Payment - Secure transactions
• 💵 Refunds - 30-day guarantee
• 🎓 Certificates - Proof of completion
• 💬 Support - Contact our team

Or visit our Contact page for more help!`},O4=()=>{const[e,t]=b.useState(!1),[a,n]=b.useState([{id:"1",text:"👋 Hi! I'm your SrinuTechGuru assistant. How can I help you today?",sender:"bot",timestamp:new Date}]),[i,r]=b.useState(""),[s,o]=b.useState(!1),c=b.useRef(null);b.useEffect(()=>{var u;(u=c.current)==null||u.scrollIntoView({behavior:"smooth"})},[a]),b.useEffect(()=>{const u=x=>{x.key==="Escape"&&e&&t(!1)};return window.addEventListener("keydown",u),()=>window.removeEventListener("keydown",u)},[e]);const d=u=>{const x=u.toLowerCase().trim();if(nr[x])return nr[x];for(const[m,j]of Object.entries(nr))if(m!=="default"&&(x.includes(m)||m.includes(x)))return j;return nr.default},p=async()=>{if(!i.trim())return;const u={id:Date.now().toString(),text:i,sender:"user",timestamp:new Date};n(x=>[...x,u]),r(""),o(!0),setTimeout(()=>{const x={id:(Date.now()+1).toString(),text:d(i),sender:"bot",timestamp:new Date};n(m=>[...m,x]),o(!1)},500)},f=u=>{u.key==="Enter"&&!u.shiftKey&&(u.preventDefault(),p())};return l.jsxs("div",{style:ve.chatbotContainer,children:[!e&&l.jsxs("button",{onClick:()=>t(!0),style:ve.floatingButton,title:"Open Chat",children:[l.jsx(Gx,{size:24}),l.jsx("span",{style:ve.badge,children:"?"})]}),e&&l.jsxs("div",{style:ve.chatWindow,children:[l.jsxs("div",{style:ve.header,children:[l.jsxs("div",{style:ve.headerContent,children:[l.jsx("h3",{style:ve.title,children:"SrinuTechGuru Support"}),l.jsx("p",{style:ve.subtitle,children:"Typically replies in minutes"})]}),l.jsx("button",{onClick:()=>t(!1),style:ve.closeButton,title:"Close Chat",children:l.jsx(et,{size:20})})]}),l.jsxs("div",{style:ve.messagesContainer,children:[a.map(u=>l.jsx("div",{style:{...ve.messageWrapper,...u.sender==="user"?ve.userMessageWrapper:ve.botMessageWrapper},children:l.jsxs("div",{style:{...ve.messageBubble,...u.sender==="user"?ve.userMessage:ve.botMessage},children:[l.jsx("p",{style:ve.messageText,children:u.text}),l.jsx("span",{style:ve.timestamp,children:u.timestamp.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})})]})},u.id)),s&&l.jsx("div",{style:ve.botMessageWrapper,children:l.jsxs("div",{style:ve.typingIndicator,children:[l.jsx("span",{}),l.jsx("span",{}),l.jsx("span",{})]})}),l.jsx("div",{ref:c})]}),l.jsxs("div",{style:ve.inputContainer,children:[l.jsx("input",{type:"text",value:i,onChange:u=>r(u.target.value),onKeyPress:f,placeholder:"Type your message...",style:ve.input}),l.jsx("button",{onClick:p,disabled:!i.trim(),style:{...ve.sendButton,...i.trim()?ve.sendButtonActive:ve.sendButtonDisabled},title:"Send Message",children:l.jsx(Ky,{size:18})})]})]})]})},ve={chatbotContainer:{position:"fixed",bottom:0,right:0,zIndex:98,pointerEvents:"none"},floatingButton:{position:"fixed",bottom:"30px",right:"30px",width:"60px",height:"60px",borderRadius:"50%",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",color:"white",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(102, 126, 234, 0.4)",zIndex:98,transition:"all 0.3s ease",pointerEvents:"auto"},badge:{position:"absolute",top:"-5px",right:"-5px",background:"#ef4444",color:"white",width:"28px",height:"28px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:"bold"},chatWindow:{position:"fixed",bottom:"30px",right:"30px",width:"420px",height:"600px",background:"white",borderRadius:"16px",boxShadow:"0 10px 40px rgba(0, 0, 0, 0.15)",display:"flex",flexDirection:"column",zIndex:99,overflow:"hidden",maxHeight:"calc(100vh - 100px)",pointerEvents:"auto","@media (max-width: 768px)":{width:"calc(100vw - 20px)",height:"calc(100vh - 100px)",bottom:"10px",right:"10px"}},header:{background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",color:"white",padding:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"},headerContent:{flex:1},title:{margin:0,fontSize:"16px",fontWeight:700},subtitle:{margin:"4px 0 0 0",fontSize:"12px",opacity:.9},closeButton:{background:"transparent",border:"none",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:"8px",transition:"all 0.2s",fontSize:"20px",minWidth:"40px",minHeight:"40px"},messagesContainer:{flex:1,overflowY:"auto",padding:"20px",display:"flex",flexDirection:"column",gap:"12px",background:"#f9fafb"},messageWrapper:{display:"flex",marginBottom:"8px"},userMessageWrapper:{justifyContent:"flex-end"},botMessageWrapper:{justifyContent:"flex-start"},messageBubble:{maxWidth:"75%",padding:"12px 16px",borderRadius:"12px",wordWrap:"break-word"},userMessage:{background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",color:"white",borderBottomRightRadius:"4px"},botMessage:{background:"white",color:"#374151",border:"1px solid #e5e7eb",borderBottomLeftRadius:"4px"},messageText:{margin:"0 0 6px 0",fontSize:"14px",lineHeight:"1.4",whiteSpace:"pre-wrap"},timestamp:{fontSize:"11px",opacity:.7},typingIndicator:{display:"flex",gap:"4px",padding:"12px 16px",background:"white",border:"1px solid #e5e7eb",borderRadius:"12px",borderBottomLeftRadius:"4px"},inputContainer:{display:"flex",gap:"8px",padding:"16px",background:"white",borderTop:"1px solid #e5e7eb"},input:{flex:1,padding:"12px 16px",border:"1px solid #e5e7eb",borderRadius:"24px",fontSize:"14px",outline:"none",transition:"all 0.2s",backgroundColor:"#f9fafb"},sendButton:{width:"44px",height:"44px",borderRadius:"50%",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"},sendButtonActive:{background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",color:"white"},sendButtonDisabled:{background:"#e5e7eb",color:"#9ca3af",cursor:"not-allowed"}},D4=()=>l.jsxs(Ly,{children:[l.jsx(O4,{}),l.jsxs(Ox,{children:[l.jsx(Re,{path:"/",element:l.jsx(gf,{})}),l.jsx(Re,{path:"/course/:id",element:l.jsx(t4,{})}),l.jsx(Re,{path:"/login",element:l.jsx(gf,{})}),l.jsx(Re,{path:"/auth",element:l.jsx(n4,{})}),l.jsx(Re,{path:"/cart",element:l.jsx(r4,{})}),l.jsx(Re,{path:"/profile",element:l.jsx(u4,{})}),l.jsx(Re,{path:"/my-learning",element:l.jsx(p4,{})}),l.jsx(Re,{path:"/contact",element:l.jsx(h4,{})}),"   ",l.jsx(Re,{path:"/about",element:l.jsx(g4,{})}),l.jsx(Re,{path:"/admin/*",element:l.jsx(B4,{})}),l.jsx(Re,{path:"/admin/course-crud",element:l.jsx(Tg,{})})]})]});console.log("========== main.tsx loaded ==========");console.log("React version:",Vt.version);const ti=document.getElementById("root");console.log("Root element found:",ti?"YES":"NO",ti);if(!ti)console.error("❌ CRITICAL: Root element (#root) not found in DOM"),document.body.innerHTML='<h1 style="color: red; padding: 20px; font-family: Arial;">ERROR: Root element not found</h1>';else try{console.log("✓ Creating React root...");const e=Gb.createRoot(ti);console.log("✓ Rendering AppRoutes..."),e.render(l.jsxs(Vt.StrictMode,{children:[l.jsx(D4,{}),"   "]})),console.log("✓ App successfully rendered to DOM"),console.log("========== React app is LIVE ==========")}catch(e){console.error("❌ Error during React rendering:",e);const t=e instanceof Error?e.message:String(e);ti.innerHTML=`<h1 style="color: red; padding: 20px; font-family: Arial;">ERROR: ${t}</h1>`}
