# dc-water-mark
添加水印功能

```js
export interface Params {
    container: HTMLElement, // 加水印的节点
    width: number, // 单个水印的宽度
    height: number, // 单个水印的高度
    fontSize: number, // 字体大小
    font: string, // 字体
    color: string, // 字体颜色
    content: string, // 水印内容
    rotate: number, // 旋转角度
    zIndex?: number, // 水印层次
    opacity: number, // 水印透明度
    x: number, // 水印位置
    y: number, // 水印位置
    onWatermarkChanged: Function // 水印修改回掉函数
}
const watermark = new Watermark({
    container: 'dom节点',
    content: `watermark`,
    x: 100,
    y: 100,
    color: 'red',
    opacity: '0.5',
    zIndex: 1000,
    rotate: -30,
    fontSize: 20,
    width: 250,
    height: 150,
});
watermark.output();
```

示例展示图片如下所示：

![示例](./example.png)