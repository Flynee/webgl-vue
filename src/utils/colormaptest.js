// color map 用法
let colormap = require('colormap')


export default function colormaptest() {
    let colors = colormap({
        colormap: 'jet',
        nshades: 100,
        format: 'hex',
        alpha: 1
    });
    const canvas = document.querySelector("#color-map");
    const w = canvas.width;
    const h = canvas.height;
    const step = h / colors.length;

    const ctx = canvas.getContext('2d');
    
    for(let i=1; i<colors.length; i++) {
        ctx.fillStyle = colors[i];

        ctx.fillRect(0,step*i, w,step*i);
    }
    
    
}