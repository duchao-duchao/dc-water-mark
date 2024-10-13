import { isNullOrUndefined, isFunction, isDom } from './base';
import { Params } from './type';

export default class Watermark {
  params: Params;
  styleStr: string;
  containerObserver: MutationObserver;
  observer: MutationObserver;
  watermarkDiv: HTMLElement;
  flag: boolean;

  constructor(params: Params) {
    this.params = Object.assign(
      {
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
      },
      params,
    );

    // 水印dom样式
    this.styleStr = `
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:${this.params.zIndex};
    pointer-events:none;
    background-repeat:repeat;
    background-image:url('${this.toDataURL()}')`;

    this.params.x = isNullOrUndefined(params.x) ? this.params.width / 2 : params.x;
    this.params.y = isNullOrUndefined(params.y) ? this.params.height / 2 : params.y;
    this.containerObserver = new MutationObserver((mutationsList, observer) => {
      // 当观察到变动时执行的回调函数
      mutationsList.forEach((mutation) => {
        const watermarkDom = document.getElementsByClassName('open-watermark')[0];
        if (!watermarkDom) {
          // 水印dom被删除，重新创建
          this.createWatermarkDom();
          if (isFunction(this.params.onWatermarkChanged)) {
            // 水印dom被修改时，执行传入的回调
            this.params.onWatermarkChanged(mutation, observer);
          }
        }
      });
    });
    this.observer = new MutationObserver((mutationsList, observer) => {
      // 当观察到变动时执行的回调函数
      mutationsList.forEach((mutation) => {
        const watermarkDom = document.getElementsByClassName('open-watermark')[0];
        if (watermarkDom?.getAttribute('style') !== this.styleStr) {
          // 水印dom样式被修改
          watermarkDom.setAttribute('style', this.styleStr);
          if (isFunction(this.params.onWatermarkChanged)) {
            this.params.onWatermarkChanged(mutation, observer);
          }
        }
      });
    });
  }

  toDataURL() {
    const { width, height, fontSize, font, color, rotate, content, opacity, x, y } = this.params;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', `${width}px`);
    canvas.setAttribute('height', `${height}px`);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
      ctx.textBaseline = 'top';
      ctx.textAlign = 'left';
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.font = `${fontSize}px ${font}`;
      ctx.translate(x, y);
      ctx.rotate((Math.PI / 180) * rotate);
      ctx.translate(-x, -y - fontSize);
      ctx.fillText(content, x, y + fontSize);
    }

    return canvas.toDataURL();
  }

  // 创建水印dom
  createWatermarkDom() {
    const watermarkDom = document.getElementsByClassName('open-watermark')[0];
    const { container } = this.params;
    if (isDom(container) && !watermarkDom) {
      this.watermarkDiv = document.createElement('div');
      this.watermarkDiv.setAttribute('style', this.styleStr);
      this.watermarkDiv.setAttribute('class', 'open-watermark');
      container.style.position = 'relative';
      container.insertBefore(this.watermarkDiv, container.firstChild);
      this.observer.observe(this.watermarkDiv, {
        attributes: true, // 观察节点属性改变
        childList: true, // 观察子节点改变
        subtree: true, // 观察所有后代节点的childLIst、attributes变化
      });
    }
  }

  output() {
    this.flag = true;
    this.createWatermarkDom();
    // 观察元素
    this.containerObserver.observe(this.params.container, {
      attributes: true,
      childList: true,
      characterData: true,
    });
  }

  destroy() {
    if (!this.watermarkDiv) return;
    this.watermarkDiv.remove();
    this.observer.disconnect();
    this.containerObserver.disconnect();
  }
}