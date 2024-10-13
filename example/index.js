const Watermark = require('./dist/index.js');
const watermark = new Watermark({
    container: document.getElementById('bac'),
    content: 'watermark',
    x: 100,
    y: 80,
});
watermark.output();
console.log('index.js');
