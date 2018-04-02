/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const STATES = {
    IDLE: 'IDLE',
    START: 'START',
    TRIGGERED: 'TRIGGERED'
};

/* harmony default export */ __webpack_exports__["a"] = ({
    props: {
        topSlidingHeight: {
            type: Number,
            default: 80
        },
        slidingThreshold: {
            type: Number,
            default: 2
        },
        triggerRefreshOnMounted: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        if (this.triggerRefreshOnMounted) {
            this.triggerRefresh();
        }
    },
    computed: {
        spinnerClass() {
            if (this.state == STATES.IDLE) {
                return 'pull__spinner--animate';
            }
            else if (this.state == STATES.TRIGGERED) {
                return 'pull__spinner--active';
            }
            return '';
        },
    },
    data() {
        return {
            startY: 0,
            endY: 0,
            transformYValue: 0,
            state: STATES.IDLE,
            isLoadMoreLoading: false
        }
    },
    methods: {
        touchStart(e) {
            if (this.state != STATES.TRIGGERED && this.$refs.list.scrollTop == 0) {
                this.startY = e.touches[0].pageY;
                this.state = STATES.START;
            }
        },
        touchMoving(e) {
            if (this.state == STATES.START && this.$refs.list.scrollTop == 0) {
                this.endY = e.touches[0].pageY;
                const diff = this.endY - this.startY;

                if ((diff / this.slidingThreshold) <= this.topSlidingHeight) {
                    this.transformYValue = diff / this.slidingThreshold;
                }
            }
        },
        touchEnd() {
            if (this.$refs.list.scrollTop == 0) {
                const diff = this.endY - this.startY;
                if (diff / this.slidingThreshold >= this.topSlidingHeight) {
                    this.triggerRefresh();
                }

                if (this.state == STATES.START) {
                    this.finishLoading();
                }
            }
        },
        triggerRefresh() {
            this.state = STATES.TRIGGERED;
            this.$emit('refresh', this.finishLoading);
            this.transformYValue = this.topSlidingHeight;
        },
        finishLoading() {
            this.transformYValue = 0;
            this.state = STATES.IDLE;
        },
        scrolling() {
            if (!this.isLoadMoreLoading && this.$refs.list.offsetHeight + this.$refs.list.scrollTop == this.$refs.list.scrollHeight) {
                this.isLoadMoreLoading = true;
                this.$emit('triggerScroll', this.finishInfiniteScrollLoading);
            }
        },
        finishInfiniteScrollLoading() {
            this.isLoadMoreLoading = false;
        },
    }
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pullToRefresh__ = __webpack_require__(2);


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__pullToRefresh__["a" /* default */]);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_pullToRefresh_vue__ = __webpack_require__(0);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_95a3fadc_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_pullToRefresh_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(9);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(3)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-95a3fadc"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_pullToRefresh_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_95a3fadc_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_pullToRefresh_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_95a3fadc_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_pullToRefresh_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pullToRefresh.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-95a3fadc", Component.options)
  } else {
    hotAPI.reload("data-v-95a3fadc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(6).default
var update = add("404c1deb", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js?{\"sourceMap\":false}!../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-95a3fadc\",\"scoped\":true,\"sourceMap\":false}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pullToRefresh.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js?{\"sourceMap\":false}!../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-95a3fadc\",\"scoped\":true,\"sourceMap\":false}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pullToRefresh.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(false);
// imports


// module
exports.push([module.i, "\n.pull__container[data-v-95a3fadc] {\n  position: relative;\n  overflow: hidden;\n  height: 100%;\n}\n.pull__container .pull__list[data-v-95a3fadc] {\n    overflow: scroll;\n    height: 100%;\n}\n.pull__container .pull__list .loadMore[data-v-95a3fadc] {\n      text-align: center;\n}\n.pull__container .pull__list .loadMore .loadMore__spinner[data-v-95a3fadc] {\n        height: 30px;\n        animation: rotator-data-v-95a3fadc 1.4s linear infinite;\n        margin-top: 10px;\n}\n.pull__container .pull__list .loadMore .loadMore__spinner .path[data-v-95a3fadc] {\n          stroke-dasharray: 187;\n          stroke-dashoffset: 0;\n          transform-origin: center;\n          stroke: #01579B;\n          animation: dash-data-v-95a3fadc 1.4s ease-in-out infinite;\n}\n.pull__container .pull__spinner_container[data-v-95a3fadc] {\n    text-align: center;\n    position: absolute;\n    width: 100%;\n    left: 0;\n    top: -40px;\n}\n.pull__container .pull__spinner_container .pull__spinner[data-v-95a3fadc] {\n      background-color: #FFFFFF;\n      display: inline-block;\n      border-radius: 50%;\n      height: 34px;\n      width: 34px;\n      box-shadow: 0px 0px 6px 0px #b1b1b1;\n}\n.pull__container .pull__spinner_container .pull__spinner.pull__spinner--animate[data-v-95a3fadc] {\n        transition-property: 0.01s;\n        transition-duration: 0.35s;\n        transition-timing-function: linear;\n        transition-delay: 0s;\n}\n.pull__container .pull__spinner_container .pull__spinner .circle__idle[data-v-95a3fadc] {\n        margin-top: 9px;\n        height: 16px;\n        width: 16px;\n        border-radius: 50%;\n        display: inline-block;\n        border: 8px #01579B;\n        border-top: 0;\n        border-right: 0;\n        border-style: solid;\n        position: relative;\n}\n.pull__container .pull__spinner_container .pull__spinner .circle__idle[data-v-95a3fadc]:before {\n          content: \" \";\n          height: 12px;\n          width: 12px;\n          background-color: #FFFFFF;\n          position: absolute;\n          top: 2px;\n          border-radius: 50%;\n          left: -6px;\n}\n.pull__container .pull__spinner_container .pull__spinner .circle__idle[data-v-95a3fadc]:after {\n          content: \" \";\n          background-color: #01579B;\n          position: absolute;\n          top: -2px;\n          left: 0;\n          border: 3px solid #FFF;\n          border-left-color: #01579B;\n}\n.pull__container .pull__spinner_container .pull__spinner .circle__spinner[data-v-95a3fadc] {\n        animation: rotator-data-v-95a3fadc 1.4s linear infinite;\n        margin-top: 9px;\n        height: 16px;\n        display: none;\n}\n.pull__container .pull__spinner_container .pull__spinner .circle__spinner .path[data-v-95a3fadc] {\n          stroke-dasharray: 187;\n          stroke-dashoffset: 0;\n          transform-origin: center;\n          stroke: #01579B;\n          animation: dash-data-v-95a3fadc 1.4s ease-in-out infinite;\n}\n.pull__container .pull__spinner_container .pull__spinner.pull__spinner--active .circle__spinner[data-v-95a3fadc] {\n        display: inline-block;\n}\n.pull__container .pull__spinner_container .pull__spinner.pull__spinner--active .circle__idle[data-v-95a3fadc] {\n        display: none;\n}\n@keyframes rotator-data-v-95a3fadc {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(270deg);\n}\n}\n@keyframes dash-data-v-95a3fadc {\n0% {\n    stroke-dashoffset: 187;\n}\n50% {\n    stroke-dashoffset: 46.75;\n    transform: rotate(135deg);\n}\n100% {\n    stroke-dashoffset: 187;\n    transform: rotate(450deg);\n}\n}\n", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = addStylesClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listToStyles__ = __webpack_require__(7);
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = listToStyles;
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "pull__container",
      on: {
        touchstart: _vm.touchStart,
        touchmove: _vm.touchMoving,
        touchend: _vm.touchEnd
      }
    },
    [
      _vm._t(
        "top-scroll-container",
        [
          _c("div", { staticClass: "pull__spinner_container" }, [
            _c(
              "div",
              {
                staticClass: "pull__spinner",
                class: _vm.spinnerClass,
                style: {
                  transform:
                    "translateY(" +
                    _vm.transformYValue +
                    "px) rotate(" +
                    _vm.transformYValue * 5 +
                    "deg)"
                }
              },
              [
                _c("div", { staticClass: "circle__idle" }),
                _vm._v(" "),
                _c(
                  "svg",
                  {
                    staticClass: "circle__spinner",
                    attrs: {
                      viewBox: "0 0 66 66",
                      xmlns: "http://www.w3.org/2000/svg"
                    }
                  },
                  [
                    _c("circle", {
                      staticClass: "path",
                      attrs: {
                        fill: "none",
                        "stroke-width": "6",
                        "stroke-linecap": "round",
                        cx: "33",
                        cy: "33",
                        r: "30"
                      }
                    })
                  ]
                )
              ]
            )
          ])
        ],
        { state: _vm.state }
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          ref: "list",
          staticClass: "pull__list",
          on: { scroll: _vm.scrolling }
        },
        [
          _vm._t("default"),
          _vm._v(" "),
          _vm.isLoadMoreLoading
            ? _c("div", { staticClass: "loadMore" }, [
                _c(
                  "svg",
                  {
                    staticClass: "loadMore__spinner",
                    attrs: {
                      viewBox: "0 0 66 66",
                      xmlns: "http://www.w3.org/2000/svg"
                    }
                  },
                  [
                    _c("circle", {
                      staticClass: "path",
                      attrs: {
                        fill: "none",
                        "stroke-width": "6",
                        "stroke-linecap": "round",
                        cx: "33",
                        cy: "33",
                        r: "30"
                      }
                    })
                  ]
                )
              ])
            : _vm._e()
        ],
        2
      )
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-95a3fadc", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = normalizeComponent;
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  scriptExports = scriptExports || {}

  // ES6 modules interop
  var type = typeof scriptExports.default
  if (type === 'object' || type === 'function') {
    scriptExports = scriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })
/******/ ]);