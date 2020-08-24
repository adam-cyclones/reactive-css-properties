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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/Users/adam.crockett/Code/typescript/reactive-css-properties/example";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./example/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./example/index.js":
/*!**************************!*\
  !*** ./example/index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _target_commonjs_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../target/commonjs/index */ \"./target/commonjs/index.js\");\n/* harmony import */ var _target_commonjs_index__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_target_commonjs_index__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst elBtnLightTheme = document.getElementById(\"light-theme\");\nconst elBtnDarkTheme = document.getElementById(\"dark-theme\");\nconst themeIndicator = document.getElementById('theme-is-text');\n\nconst { theme, themeTextColor, themeBackgroundColor } = _target_commonjs_index__WEBPACK_IMPORTED_MODULE_0___default()();\n\nconsole.log('early get value', theme.getValue())\n\nthemeTextColor(\"#000\", \"#000\");\nthemeBackgroundColor(\"#fff\");\n\ntheme.subscribe(({ value }) => {\n  themeIndicator.innerText = value;\n  console.log(value)\n  if (value === 'dark') {\n    themeTextColor(\"red\");\n  } else {\n    themeTextColor(\"blue\")\n  }\n});\n\nthemeIndicator.innerText = theme.getValue();\nconst toggleThemeHandler = ({ target: { id } }) => {\n  switch (id) {\n    case \"light-theme\":\n      theme(\"light\");\n      themeTextColor(\"#000\");\n      themeBackgroundColor(\"#fff\");\n      break;\n    case \"dark-theme\":\n      theme(\"dark\");\n\n      themeBackgroundColor(\"#000\");\n      break;\n  }\n}\n\nif (elBtnDarkTheme && elBtnLightTheme) {\n  for (const themeToggle of [elBtnDarkTheme, elBtnLightTheme]) {\n    themeToggle.addEventListener('click',toggleThemeHandler);\n  }\n}\n\n// checks\nconsole.group('quick test')\nconsole.log('value:', themeTextColor.getValue())\nconsole.log('getScope:', themeTextColor.getScope())\nconsole.log('getUsage:', themeTextColor.getUsage())\nconsole.log('key:',themeTextColor.getKey())\nconsole.groupEnd();\n\n\n//# sourceURL=webpack:///./example/index.js?");

/***/ }),

/***/ "./target/commonjs/index.js":
/*!**********************************!*\
  !*** ./target/commonjs/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst camelToSnakeCase_1 = __webpack_require__(/*! ./utils/camelToSnakeCase */ \"./target/commonjs/utils/camelToSnakeCase.js\");\nconst Callable_1 = __webpack_require__(/*! ./utils/Callable */ \"./target/commonjs/utils/Callable.js\");\nconst cssVariableObserver_1 = __webpack_require__(/*! ./utils/cssVariableObserver */ \"./target/commonjs/utils/cssVariableObserver.js\");\n/**\n * Set css variables and react to changes\n * */\nexports.default = (rootEl = document.documentElement, scope) => {\n    /**\n     * Tracks previous values against current values\n     * */\n    const previousValues = {};\n    /**\n     * used to return a magic object, an object where every got key returns a css variable factory function\n     */\n    const magicGetterFactory = Object.create(null);\n    return new Proxy(magicGetterFactory, {\n        get(target, prop, receiver) {\n            const key = `--${scope ? `${scope}-` : ''}${camelToSnakeCase_1.camelToSnakeCase(prop)}`;\n            // always return a Callable\n            // @ts-ignore\n            const valueSym = Symbol('value');\n            const fallbackSym = Symbol('fallback');\n            const nullValue = 'unset';\n            // observe rootEl for style changes\n            const rootStyleOvserver = cssVariableObserver_1.cssVariableObserver(rootEl);\n            // const rootStyleOvserver = fromMutationObserver(rootEl, {\n            //   attributes: true,\n            //   attributeFilter: [\"style\"],\n            //   attributeOldValue: false,\n            //   childList: false,\n            //   subtree: false\n            // });\n            // values can exist from stylesheets and so to overload them we need to retrieve them\n            let preExistingValue = window.getComputedStyle(rootEl).getPropertyValue(key);\n            if (preExistingValue) {\n                preExistingValue = preExistingValue.trim();\n            }\n            previousValues[key] = {\n                value: preExistingValue || nullValue,\n                oldValue: previousValues[key] ? previousValues[key].value.toString().trim() : preExistingValue || nullValue\n            };\n            const subscribeCallback = (cb) => (change) => {\n                // @ts-ignore\n                const { oldValue } = previousValues[key];\n                const newValue = window\n                    .getComputedStyle(rootEl)\n                    .getPropertyValue(key);\n                if (oldValue !== newValue && change.length) {\n                    // kill the connection while we call the callback,\n                    // changing values by calling another prop factory causes\n                    // a memory leak, I suspect this is bug\n                    rootStyleOvserver.unsubscribe();\n                    cb({\n                        value: newValue.trim(),\n                        oldValue: oldValue\n                    });\n                    // start listening again\n                    rootStyleOvserver.subscribe(cb);\n                }\n            };\n            // @ts-ignore\n            target[prop] = Callable_1.callable({\n                function(value, fallbackValue) {\n                    value = value.toString().trim();\n                    // @ts-ignore\n                    this[valueSym] = value || preExistingValue;\n                    // @ts-ignore\n                    this[fallbackSym] = fallbackValue;\n                    previousValues[key] = {\n                        value,\n                        oldValue: previousValues[key] ? previousValues[key].value : preExistingValue || \"initial\"\n                    };\n                    rootEl.style.setProperty(key, value.toString());\n                },\n                subscribe(cb) {\n                    rootStyleOvserver.subscribe(subscribeCallback(cb));\n                },\n                getUsage() {\n                    return `var(${key}, ${this.getFallbackValue()})`;\n                },\n                getKey() {\n                    return key;\n                },\n                getValue() {\n                    // @ts-ignore\n                    return this[valueSym] || preExistingValue || nullValue;\n                },\n                getFallbackValue() {\n                    // @ts-ignore\n                    return this[fallbackSym] || nullValue;\n                },\n                getScope() {\n                    return scope || '';\n                },\n                valueOf() {\n                    return this.getUsage();\n                }\n            });\n            return Reflect.get(target, prop, receiver);\n        }\n    });\n};\n\n\n//# sourceURL=webpack:///./target/commonjs/index.js?");

/***/ }),

/***/ "./target/commonjs/utils/Callable.js":
/*!*******************************************!*\
  !*** ./target/commonjs/utils/Callable.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.callable = void 0;\n/**\n * Create an object - function like datastructure which can be called and also hold keys and values\n */\nexports.callable = (body) => {\n    const instance = Object.create(body);\n    return new Proxy(Function, {\n        apply(target, thisArg, argumentsList) {\n            return Reflect.apply(instance.function, instance, argumentsList);\n        },\n        get(tar, prop, reciever) {\n            return Reflect.get(instance, prop, reciever);\n        }\n    });\n};\n\n\n//# sourceURL=webpack:///./target/commonjs/utils/Callable.js?");

/***/ }),

/***/ "./target/commonjs/utils/camelToSnakeCase.js":
/*!***************************************************!*\
  !*** ./target/commonjs/utils/camelToSnakeCase.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.camelToSnakeCase = void 0;\nexports.camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);\n\n\n//# sourceURL=webpack:///./target/commonjs/utils/camelToSnakeCase.js?");

/***/ }),

/***/ "./target/commonjs/utils/cssVariableObserver.js":
/*!******************************************************!*\
  !*** ./target/commonjs/utils/cssVariableObserver.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.cssVariableObserver = void 0;\nexports.cssVariableObserver = (el) => {\n    const config = {\n        subtree: false,\n        childList: false,\n        attributes: true,\n        attributeOldValue: true,\n        attributeFilter: ['style'],\n        characterData: false,\n        characterDataOldValue: false,\n    };\n    // set from first subscribe call\n    let rootStyleObserver;\n    return {\n        subscribe: (cb) => {\n            if (!rootStyleObserver) {\n                rootStyleObserver = new MutationObserver(cb);\n            }\n            rootStyleObserver.observe(el, config);\n        },\n        unsubscribe: () => {\n            rootStyleObserver.disconnect();\n        }\n    };\n};\n\n\n//# sourceURL=webpack:///./target/commonjs/utils/cssVariableObserver.js?");

/***/ })

/******/ });