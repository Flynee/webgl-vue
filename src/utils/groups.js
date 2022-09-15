import * as THREE from 'three';

const groupstest = {};

groupstest.start =(scene) =>{
    const geometry = new THREE.BoxGeometry();
    const mat = new THREE.MeshLambertMaterial();
    const mesh = new THREE.Mesh(geometry, mat);

    const mat1 = new THREE.MeshLambertMaterial({color: 0x000000, side: THREE.DoubleSide, transparent: true, opacity: 0});
    const mat2 = new THREE.MeshLambertMaterial({color: 0x3A8A55, side: THREE.DoubleSide});
    const mat3 = new THREE.MeshLambertMaterial({color: 0xDEA6A8, side: THREE.DoubleSide});
    const mat4 = new THREE.MeshLambertMaterial({color: 0xC74DD1, side: THREE.DoubleSide});
    const mat5 = new THREE.MeshLambertMaterial({color: 0x8E112E, side: THREE.DoubleSide});
    const mat6 = new THREE.MeshLambertMaterial({color: 0xDE694C, side: THREE.DoubleSide});
    mesh.material = [
        mat1, 
        mat2,
        mat3,
        mat4,
        mat5,
        mat6,
    ];
    mesh.geometry.clearGroups();
    mesh.geometry.addGroup(0, 6, 0);
    mesh.geometry.addGroup(6, 6, 1);
    mesh.geometry.addGroup(12, 6, 1);
    mesh.geometry.addGroup(18, 6, 1);
    mesh.geometry.addGroup(24, 6, 1);
    mesh.geometry.addGroup(30, 6, 1);

    scene.add(mesh);

}

export {groupstest};