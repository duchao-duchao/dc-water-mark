"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDom = exports.isFunction = exports.isNullOrUndefined = void 0;
var isNullOrUndefined = function (n) {
    return n === null || n === undefined;
};
exports.isNullOrUndefined = isNullOrUndefined;
var isFunction = function (n) {
    return typeof n === 'function';
};
exports.isFunction = isFunction;
var isDom = function (n) {
    if (typeof HTMLElement === 'object') {
        return n instanceof HTMLElement;
    }
    return n && (typeof n === 'object') && (n.nodeType === 1) && (typeof n.nodeName === 'string');
};
exports.isDom = isDom;
//# sourceMappingURL=base.js.map