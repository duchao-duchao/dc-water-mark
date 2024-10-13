/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/base.js":
/*!*********************!*\
  !*** ./src/base.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   isDom: () => (/* binding */ isDom),\n/* harmony export */   isFunction: () => (/* binding */ isFunction),\n/* harmony export */   isNullOrUndefined: () => (/* binding */ isNullOrUndefined)\n/* harmony export */ });\nconst isNullOrUndefined = (n) => {\n    return n === null || n === undefined;\n}\n\nconst isFunction = (n) => {\n    return typeof n === 'function'\n}\n\nconst isDom = (n) => {\n    if (typeof HTMLElement === 'object') {\n        return n instanceof HTMLElement\n    }\n    return n && (typeof n ==='object') && (n.nodeType === 1) && (typeof n.nodeName === 'string')\n}\n\n//# sourceURL=webpack://dc-water-mark/./src/base.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Watermark)\n/* harmony export */ });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./src/base.js\");\n\n\nclass Watermark {\n  constructor(params) {\n    this.params = Object.assign(\n      {\n        container: document.body,\n        width: 250,\n        height: 150,\n        fontSize: 16,\n        font: 'microsoft yahei',\n        color: '#cccccc',\n        content: 'watermark',\n        rotate: -30,\n        zIndex: 1000,\n        opacity: 0.5,\n      },\n      params,\n    );\n\n    // 水印dom样式\n    this.styleStr = `\n    position:absolute;\n    top:0;\n    left:0;\n    width:100%;\n    height:100%;\n    z-index:${this.params.zIndex};\n    pointer-events:none;\n    background-repeat:repeat;\n    background-image:url('${this.toDataURL()}')`;\n\n    this.params.x = (0,_base__WEBPACK_IMPORTED_MODULE_0__.isNullOrUndefined)(params.x) ? this.params.width / 2 : params.x;\n    this.params.y = (0,_base__WEBPACK_IMPORTED_MODULE_0__.isNullOrUndefined)(params.y) ? this.params.height / 2 : params.y;\n    this.containerObserver = new MutationObserver((mutationsList, observer) => {\n      // 当观察到变动时执行的回调函数\n      mutationsList.forEach((mutation) => {\n        const watermarkDom = document.getElementsByClassName('open-watermark')[0];\n        if (!watermarkDom) {\n          // 水印dom被删除，重新创建\n          this.createWatermarkDom();\n          if ((0,_base__WEBPACK_IMPORTED_MODULE_0__.isFunction)(this.params.onWatermarkChanged)) {\n            // 水印dom被修改时，执行传入的回调\n            this.params.onWatermarkChanged(mutation, observer);\n          }\n        }\n      });\n    });\n    this.observer = new MutationObserver((mutationsList, observer) => {\n      // 当观察到变动时执行的回调函数\n      mutationsList.forEach((mutation) => {\n        const watermarkDom = document.getElementsByClassName('open-watermark')[0];\n        if (watermarkDom?.getAttribute('style') !== this.styleStr) {\n          // 水印dom样式被修改\n          watermarkDom.setAttribute('style', this.styleStr);\n          if ((0,_base__WEBPACK_IMPORTED_MODULE_0__.isFunction)(this.params.onWatermarkChanged)) {\n            this.params.onWatermarkChanged(mutation, observer);\n          }\n        }\n      });\n    });\n  }\n\n  toDataURL() {\n    const { width, height, fontSize, font, color, rotate, content, opacity, x, y } = this.params;\n    const canvas = document.createElement('canvas');\n    canvas.setAttribute('width', `${width}px`);\n    canvas.setAttribute('height', `${height}px`);\n\n    const ctx = canvas.getContext('2d');\n\n    ctx.clearRect(0, 0, width, height);\n    ctx.textBaseline = 'top';\n    ctx.textAlign = 'left';\n    ctx.fillStyle = color;\n    ctx.globalAlpha = opacity;\n    ctx.font = `${fontSize}px ${font}`;\n    ctx.translate(x, y);\n    ctx.rotate((Math.PI / 180) * rotate);\n    ctx.translate(-x, -y - fontSize);\n    ctx.fillText(content, x, y + fontSize);\n\n    return canvas.toDataURL();\n  }\n\n  // 创建水印dom\n  createWatermarkDom() {\n    const watermarkDom = document.getElementsByClassName('open-watermark')[0];\n    const { container } = this.params;\n    if ((0,_base__WEBPACK_IMPORTED_MODULE_0__.isDom)(container) && !watermarkDom) {\n      this.watermarkDiv = document.createElement('div');\n      this.watermarkDiv.setAttribute('style', this.styleStr);\n      this.watermarkDiv.setAttribute('class', 'open-watermark');\n      container.style.position = 'relative';\n      container.insertBefore(this.watermarkDiv, container.firstChild);\n      this.observer.observe(this.watermarkDiv, {\n        attributes: true, // 观察节点属性改变\n        childList: true, // 观察子节点改变\n        subtree: true, // 观察所有后代节点的childLIst、attributes变化\n      });\n    }\n  }\n\n  output() {\n    this.flag = true;\n    this.createWatermarkDom();\n    // 观察元素\n    this.containerObserver.observe(this.params.container, {\n      attributes: true,\n      childList: true,\n      characterData: true,\n    });\n  }\n\n  destroy() {\n    if (!this.watermarkDiv) return;\n    this.watermarkDiv.remove();\n    this.observer.disconnect();\n    this.containerObserver.disconnect();\n  }\n}\n\n//# sourceURL=webpack://dc-water-mark/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;