// 顶点着色测试
import * as THREE from 'three';
import { Lut } from 'three/examples/jsm/math/Lut.js';

import {STLLoader} from 'three/examples/jsm/loaders/STLLoader.js';
import data from './data';

let max = 0;
let min = 0;
data.imax.forEach(v => {
    if (v > max) {
        max = v;
    }
    if (v < min) {
        min = v;
    }
});

const vertexrender = {};
const lut = new Lut();
lut.setColorMap("rainbow");

function addCanvasSprite(scene) {
    const sprite = new THREE.Sprite( new THREE.SpriteMaterial( {
        map: new THREE.CanvasTexture( lut.createCanvas() )
    } ) );
    // sprite.scale.x = 0.125;
    scene.add( sprite );
}

function updateColors(mesh, max, min, pressures) {

    lut.setMax( max );
    lut.setMin( min );

    const geometry = mesh.geometry;
    const colors = geometry.attributes.color;

    for ( let i = 0; i < pressures.length; i ++ ) {

        const colorValue = pressures[ i ];

        const color = lut.getColor( colorValue );

        if ( color === undefined ) {

            console.log( 'Unable to determine color for value:', colorValue );

        } else {

            colors.setXYZ( i, color.r, color.g, color.b );

        }

    }

    colors.needsUpdate = true;

}

vertexrender.start = (scene)=> {
    addCanvasSprite(scene);
    // 加载模型
    const loader = new STLLoader();
    loader.load("/mesh.stl", (geometry)=> {
      
        geometry.center();
        geometry.computeVertexNormals();

        // default color attribute
        const colors = [];

        for ( let i = 0, n = geometry.attributes.position.count; i < n; ++ i ) {

            colors.push(1, 1, 1 );

        }

        geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

        const material = new THREE.MeshLambertMaterial({color: 0xffffff, vertexColors: true, side: THREE.DoubleSide});
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        console.debug(max, min, data.imax.length, geometry.attributes.position.count);
        updateColors(mesh, max, min, data.imax);

    });
};




export {vertexrender}