"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var Watermark = /** @class */ (function () {
    function Watermark(params) {
        var _this = this;
        this.params = Object.assign({
            container: document.body,
            width: 250,
            height: 150,
            fontSize: 16,
            font: 'microsoft yahei',
            color: '#cccccc',
            content: 'watermark',
            rotate: -30,
            zIndex: 1000,
            opacity: 0.5,
        }, params);
        // 水印dom样式
        this.styleStr = "\n    position:absolute;\n    top:0;\n    left:0;\n    width:100%;\n    height:100%;\n    z-index:".concat(this.params.zIndex, ";\n    pointer-events:none;\n    background-repeat:repeat;\n    background-image:url('").concat(this.toDataURL(), "')");
        this.params.x = (0, base_1.isNullOrUndefined)(params.x) ? this.params.width / 2 : params.x;
        this.params.y = (0, base_1.isNullOrUndefined)(params.y) ? this.params.height / 2 : params.y;
        this.containerObserver = new MutationObserver(function (mutationsList, observer) {
            // 当观察到变动时执行的回调函数
            mutationsList.forEach(function (mutation) {
                var watermarkDom = document.getElementsByClassName('open-watermark')[0];
                if (!watermarkDom) {
                    // 水印dom被删除，重新创建
                    _this.createWatermarkDom();
                    if ((0, base_1.isFunction)(_this.params.onWatermarkChanged)) {
                        // 水印dom被修改时，执行传入的回调
                        _this.params.onWatermarkChanged(mutation, observer);
                    }
                }
            });
        });
        this.observer = new MutationObserver(function (mutationsList, observer) {
            // 当观察到变动时执行的回调函数
            mutationsList.forEach(function (mutation) {
                var watermarkDom = document.getElementsByClassName('open-watermark')[0];
                if ((watermarkDom === null || watermarkDom === void 0 ? void 0 : watermarkDom.getAttribute('style')) !== _this.styleStr) {
                    // 水印dom样式被修改
                    watermarkDom.setAttribute('style', _this.styleStr);
                    if ((0, base_1.isFunction)(_this.params.onWatermarkChanged)) {
                        _this.params.onWatermarkChanged(mutation, observer);
                    }
                }
            });
        });
    }
    Watermark.prototype.toDataURL = function () {
        var _a = this.params, width = _a.width, height = _a.height, fontSize = _a.fontSize, font = _a.font, color = _a.color, rotate = _a.rotate, content = _a.content, opacity = _a.opacity, x = _a.x, y = _a.y;
        var canvas = document.createElement('canvas');
        canvas.setAttribute('width', "".concat(width, "px"));
        canvas.setAttribute('height', "".concat(height, "px"));
        var ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, width, height);
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            ctx.fillStyle = color;
            ctx.globalAlpha = opacity;
            ctx.font = "".concat(fontSize, "px ").concat(font);
            ctx.translate(x, y);
            ctx.rotate((Math.PI / 180) * rotate);
            ctx.translate(-x, -y - fontSize);
            ctx.fillText(content, x, y + fontSize);
        }
        return canvas.toDataURL();
    };
    // 创建水印dom
    Watermark.prototype.createWatermarkDom = function () {
        var watermarkDom = document.getElementsByClassName('open-watermark')[0];
        var container = this.params.container;
        if ((0, base_1.isDom)(container) && !watermarkDom) {
            this.watermarkDiv = document.createElement('div');
            this.watermarkDiv.setAttribute('style', this.styleStr);
            this.watermarkDiv.setAttribute('class', 'open-watermark');
            container.style.position = 'relative';
            container.insertBefore(this.watermarkDiv, container.firstChild);
            this.observer.observe(this.watermarkDiv, {
                attributes: true,
                childList: true,
                subtree: true, // 观察所有后代节点的childLIst、attributes变化
            });
        }
    };
    Watermark.prototype.output = function () {
        this.flag = true;
        this.createWatermarkDom();
        // 观察元素
        this.containerObserver.observe(this.params.container, {
            attributes: true,
            childList: true,
            characterData: true,
        });
    };
    Watermark.prototype.destroy = function () {
        if (!this.watermarkDiv)
            return;
        this.watermarkDiv.remove();
        this.observer.disconnect();
        this.containerObserver.disconnect();
    };
    return Watermark;
}());
exports.default = Watermark;
//# sourceMappingURL=index.js.map