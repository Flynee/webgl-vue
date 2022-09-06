import * as THREE from 'three';


// 实现threejs 颜色渐变动画
const animation = {};
animation.start = (scene)=> {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshLambertMaterial({color: 0x234234, side: THREE.DoubleSide});
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const colorFK = new THREE.ColorKeyframeTrack('.material.color', [0, 1, 1], [1,0,0, 0,1,0, 0,0,1], THREE.InterpolateDiscrete);
    const clip = new THREE.AnimationClip('Action', 3, [colorFK]);
    const mixer = new THREE.AnimationMixer(mesh);
    const action = mixer.clipAction(clip);
    action.play();

    const clock = new THREE.Clock();

    const renderCB = (clock, mixer)=> {
        const delta = clock.getDelta();
        if (mixer) {
            mixer.update(delta);
        }
    }
    window.rendererCBS.push([renderCB, clock, mixer]);
}

// 顶点颜色渐变
animation.start2 = (scene)=> {
    const geometry = new THREE.BoxGeometry();
    const colors = new THREE.Int8BufferAttribute([
        1,0,0, 0,1,0, 0,0,1,
        1,0,0, 0,1,0, 0,0,1,
        1,0,0, 0,1,0, 0,0,1,
        1,0,0, 0,1,0, 0,0,1,
        1,0,0, 0,1,0, 0,0,1,
        1,0,0, 0,1,0, 0,0,1,
        1,0,0, 0,1,0, 0,0,1,
        1,0,0, 0,1,0, 0,0,1,
       
    ], 3, false);
    geometry.setAttribute("color", colors);
    const material = new THREE.MeshLambertMaterial({color: 0xffffff, vertexColors: true, side: THREE.DoubleSide});
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const colorss =  [
        new THREE.Int8BufferAttribute([
            1,0,0, 0,1,0, 0,0,1,
            1,0,0, 0,1,0, 0,0,1,
            1,0,0, 0,1,0, 0,0,1,
            1,0,0, 0,1,0, 0,0,1,
            1,0,0, 0,1,0, 0,0,1,
            1,0,0, 0,1,0, 0,0,1,
            1,0,0, 0,1,0, 0,0,1,
            1,0,0, 0,1,0, 0,0,1,
        ],3),
        new THREE.Int8BufferAttribute([
            0,1,0, 0,0,1, 1,0,0,
            0,1,0, 0,0,1, 1,0,0,
            0,1,0, 0,0,1, 1,0,0,
            0,1,0, 0,0,1, 1,0,0,
            0,1,0, 0,0,1, 1,0,0,
            0,1,0, 0,0,1, 1,0,0,
            0,1,0, 0,0,1, 1,0,0,
            0,1,0, 0,0,1, 1,0,0,
        ],3),
        new THREE.Int8BufferAttribute([
            0,0,1, 1,0,0, 0,1,0,
            0,0,1, 1,0,0, 0,1,0,
            0,0,1, 1,0,0, 0,1,0,
            0,0,1, 1,0,0, 0,1,0,
            0,0,1, 1,0,0, 0,1,0,
            0,0,1, 1,0,0, 0,1,0,
            0,0,1, 1,0,0, 0,1,0,
            0,0,1, 1,0,0, 0,1,0,
        ],3)

    ];


    const renderCB = (mesh, colorss)=> {
       const i = Math.round(Math.random() * 2);
       const colors = colorss[i];
       mesh.geometry.setAttribute("color", colors);
    }
    window.rendererCBS.push([renderCB, mesh, colorss]);
}

export { animation };