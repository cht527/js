/*!
 * FEATURE.JS 1.0.0, A Fast, simple and lightweight browser feature
 * detection library in just 1kb.
 *
 * http://featurejs.com
 *
 * CSS 3D Transform, CSS Transform, CSS Transition, Canvas, SVG,
 * addEventListener, querySelectorAll, matchMedia, classList API,
 * placeholder, localStorage, History API, Viewport Units, REM Units,
 * CORS, WebGL, Service Worker, Context Menu, Geolocation,
 * Device Motion, Device Orientation, Touch, Async, Defer,
 * Srcset, Sizes & Picture Element.
 *
 *
 * USAGE EXAMPLE:
 * if (feature.webGL) {
 *   console.log("webGL supported!");
 * }
 *
 * Author: @viljamis, https://viljamis.com
 */

/*使用方法
if (feature.webGL) {
  console.log("WebGL supported");
} else {
  console.log("WebGL not supported");
}*/

/* 属性列表
feature.async
feature.addEventListener
feature.canvas
feature.classList
feature.cors
feature.contextMenu
feature.css3Dtransform
feature.cssTransform
feature.cssTransition
feature.defer
feature.deviceMotion
feature.deviceOrientation
feature.geolocation
feature.historyAPI
feature.placeholder
feature.localStorage
feature.matchMedia
feature.pictureElement
feature.querySelectorAll
feature.remUnit
feature.serviceWorker
feature.sizes
feature.srcset
feature.svg
feature.touch
feature.viewportUnit
feature.webGL
*/
/* globals DocumentTouch */
;(function (window, document, undefined) {
  "use strict";

  // For minification only
  var docEl = document.documentElement;


  /**
   * Utilities
   */
  var util = {

    /**
     * Simple create element method
     */
    create : function(el) {
      return document.createElement(el);
    },

    /**
     * Test if it's an old device that we want to filter out
     */
    old : !!(/(Android\s(1.|2.))|(Silk\/1.)/i.test(navigator.userAgent)),

    /**
     * Function that takes a standard CSS property name as a parameter and
     * returns it's prefixed version valid for current browser it runs in
     * 返回当前的css属性是否当前运行的浏览器，例如一个css属性transition，这个函数会遍历
     * dummy.style['transition']/dummy.style["WebkitTransition"]/dummy.style["MozTransition"]/dummy.style["OTransition"]/dummy.style["msTransition"]
     * 的值是否为true，是则返回该值
     */
    pfx : (function() {
      var style = document.createElement("dummy").style;
      var prefixes = ["Webkit", "Moz", "O", "ms"];
      var memory = {};
      return function(prop) {
        if (typeof memory[prop] === "undefined") {
          var ucProp = prop.charAt(0).toUpperCase() + prop.substr(1),
            props = (prop + " " + prefixes.join(ucProp + " ") + ucProp).split(" ");
            memory[prop] = null;
          for (var i in props) {
            if (style[props[i]] !== undefined) {
              memory[prop] = props[i];
              break;
            }
          }
        }
        return memory[prop];
      };
    })()

  };


  /**
   * The Feature.js object
   *
   * @constructor
   */
  function Feature() {}

  Feature.prototype = {
    constructor : Feature,

    // Test if CSS 3D transforms are supported
    css3Dtransform : (function() {
      var test = (!util.old && util.pfx("perspective") !== null);
      return !!test;
    })(),

    // Test if CSS transforms are supported
    cssTransform : (function() {
      var test = (!util.old && util.pfx("transformOrigin") !== null);
      return !!test;
    })(),

    // Test if CSS transitions are supported
    // 检测css transition属性是否支持
    cssTransition : (function() {
      var test = util.pfx("transition") !== null;
      return !!test;
    })(),

    // Test if addEventListener is supported
    // 检测 addEventListener是否支持
    addEventListener : !!window.addEventListener,

    // Test if querySelectorAll is supported
    // 检测querySelectorAll是否支持
    querySelectorAll : !!document.querySelectorAll,

    // Test if matchMedia is supported
    // 检测媒体查询(media）是否支持
    matchMedia : !!window.matchMedia,

    // Test if Device Motion is supported
    // 检测device Motion是否支持
    deviceMotion : ("DeviceMotionEvent" in window),

    // Test if Device Orientation is supported
    deviceOrientation : ("DeviceOrientationEvent" in window),

    // Test if Context Menu is supported
    contextMenu : ("contextMenu" in docEl && "HTMLMenuItemElement" in window),

    // Test if classList API is supported
    // 检测classList是否支持
    classList : ("classList" in docEl),

    // Test if placeholder attribute is supported
    // 检测placeholder是否支持
    placeholder : ("placeholder" in util.create("input")),

    // Test if localStorage is supported
    localStorage : (function() {
      var test = "x";
      try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch(err) {
        return false;
      }
    })(),

    // Test if History API is supported
    historyAPI : (window.history && "pushState" in window.history),

    // Test if ServiceWorkers are supported
    serviceWorker : ("serviceWorker" in navigator),

    // Test if viewport units are supported
    viewportUnit : (function(el) {
      try {
        el.style.width = "1vw";
        var test = el.style.width !== "";
        return !!test;
      } catch(err) {
        return false;
      }
    })(util.create("dummy")),

    // Test if REM units are supported
    remUnit : (function(el) {
      try {
        el.style.width = "1rem";
        var test = el.style.width !== "";
        return !!test;
      } catch(err) {
        return false;
      }
    })(util.create("dummy")),

    // Test if Canvas is supported
    canvas : (function(el) {
      return !!(el.getContext && el.getContext("2d"));
    })(util.create("canvas")),

    // Test if SVG is supported
    svg : !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,

    // Test if WebGL is supported
    webGL : (function(el) {
      try {
        return !!(window.WebGLRenderingContext && (el.getContext("webgl") || el.getContext("experimental-webgl")));
      } catch(err) {
        return false;
      }
    })(util.create("canvas")),

    // Test if cors is supported
    cors : ("XMLHttpRequest" in window && "withCredentials" in new XMLHttpRequest()),

    // Tests if touch events are supported, but doesn't necessarily reflect a touchscreen device
    touch : !!(("ontouchstart" in window) || window.navigator && window.navigator.msPointerEnabled && window.MSGesture || window.DocumentTouch && document instanceof DocumentTouch),

    // Test if async attribute is supported
    async : ("async" in util.create("script")),

    // Test if defer attribute is supported
    defer : ("defer" in util.create("script")),

    // Test if Geolocation is supported
    geolocation : ("geolocation" in navigator),

    // Test if img srcset attribute is supported
    srcset : ("srcset" in util.create("img")),

    // Test if img sizes attribute is supported
    sizes : ("sizes" in util.create("img")),

    // Test if Picture element is supported
    pictureElement : ("HTMLPictureElement" in window),

    // Run all the tests and add supported classes
    //查找在该对象中所有不是testAll、不是对象引用并且结果为true的方法，存进classes,最后输出来
    testAll : function() {
      var classes = " js";
      for (var test in this) {
        if (test !== "testAll" && test !== "constructor" && this[test]) {
          classes += " " + test;
        }
      }
      docEl.className += classes.toLowerCase();
    }

  };

  /**
   * Expose a public-facing API
   */
  function expose() {
    var ftr = new Feature();
    return ftr;
  }
  window.feature = expose();

}(window, document));