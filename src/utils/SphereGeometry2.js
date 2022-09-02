import {
    BufferGeometry,
    Float32BufferAttribute,
    Vector3
} from 'three';

class SphereGeometry extends BufferGeometry {
    // constructor(radius = 1, widthSegments = 32, heightSegments = 16, phiStart = 0, phiEnd = Math.PI * 2, thetaStart = 0, thetaEnd = Math.PI) {
    //     super();
    //     this.type = 'SphereGeometry';
    //     this.radius = radius;
    //     this.widthSegments = widthSegments;
    //     this.heightSegments = heightSegments;
    //     this.phiStart = phiStart;
    //     this.phiEnd = phiEnd;
    //     this.thetaStart = thetaStart;
    //     this.thetaEnd = thetaEnd;

    //     widthSegments = Math.max(3, Math.floor(widthSegments));
    //     heightSegments = Math.max(2, Math.floor(heightSegments));
    //     const phiStep = (this.phiEnd - this.phiStart) / heightSegments; 
    //     const thetaStep = (this.thetaEnd - this.thetaStart) / widthSegments; 

    //     let index = 0;
    //     const grid = [];
    //     const vertex = new Vector3();
    //     const normal = new Vector3(); // buffers

    //     const indices = [];
    //     const vertices = [];
    //     const normals = [];
    //     const uvs = []; // generate vertices, normals and uvs
    //     const filterSet = new Set();
    constructor(radius = 1, widthSegments = 32, heightSegments = 32, phiStart = 0, phiEnd = 0, thetaStart = 0, thetaEnd = 0) {
        super();
        this.type = 'SphereGeometry';
        this.radius = Math.abs(radius);
        this.widthSegments = Math.max(3, Math.floor(widthSegments));
        this.heightSegments = Math.max(2, Math.floor(heightSegments));
        this.phiStart = (phiStart % 360) / 180 * Math.PI;
        this.thetaStart = (thetaStart % 360) / 180 * Math.PI;
        this.phiEnd = (phiEnd % 360) / 180 * Math.PI;
        this.thetaEnd = (thetaEnd % 360) / 180 * Math.PI;


        if (phiEnd - phiStart >= 360) {
            this.phiEnd = this.phiStart + 2 * Math.PI;
        }else if (phiEnd - phiStart <= -360) {
            this.phiEnd = this.phiStart - 2 * Math.PI;
        }

        if (thetaEnd - thetaStart >= 360) {
            this.thetaEnd = this.thetaStart + 2 * Math.PI;
        }else if (thetaEnd - thetaStart <= -360) {
            this.thetaEnd = this.thetaStart - 2 * Math.PI;
        }

        if (Math.abs(this.thetaEnd - this.thetaStart) > Math.PI || this.thetaEnd * this.thetaStart < 0 || ((Math.abs(this.thetaStart) - Math.PI) * (Math.abs(this.thetaEnd) - Math.PI) < 0)) {
            this.phiStart = 0;
            this.phiEnd = 2 * Math.PI;
        }

        console.debug("theta", this.thetaStart / Math.PI * 180, this.thetaEnd / Math.PI * 180);
        console.debug("phi", this.phiStart / Math.PI * 180, this.phiEnd / Math.PI * 180);


        // for(let hi=0; hi <= heightSegments; hi+=1) {
        //     let v = 1 - hi / heightSegments;
        //     const verticesRow = [];

        //     for(let wi=0; wi <= widthSegments; wi+=1) {
        //         let u = wi / widthSegments;
        //         if (v ==0 || v==1) {
        //             u += (v- 0.5) / widthSegments;
        //         }

        //         vertex.x = this.radius * Math.abs(Math.sin(this.thetaStart + hi*thetaStep)) * Math.cos(this.phiStart + wi*phiStep);
        //         vertex.y = this.radius * Math.abs(Math.sin(this.thetaStart + hi*thetaStep)) * Math.sin(this.phiStart + wi*phiStep);
        //         vertex.z = this.radius * Math.cos(this.thetaStart + hi*thetaStep);
        //         // const filterV = vertex.x + ',' + vertex.y + ',' + vertex.z;
        //         // if (!filterSet.has(filterV)) {
        //         //     filterSet.add(filterV);
        //         // }
        //         vertices.push(vertex.x, vertex.y, vertex.z);
        //         normal.copy(vertex).normalize();
        //         normals.push(normal.x, normal.y, normal.z); // uv
        //         verticesRow.push(index++);
        //         uvs.push(u,v);
                

        //     }
        //     grid.push(verticesRow);
        // }

      
        // for (let iy = 0; iy < heightSegments; iy++) {
        //     for (let ix = 0; ix < widthSegments; ix++) {
        //         let a = 0;
        //         let b = 0;
        //         let c =0;
        //         let d = 0;

        //         if (iy == 0) {
        //             a = grid[iy][ix];
        //             b = grid[iy + 1][ix];
        //             c = grid[iy + 1][ix + 1];
        //             indices.push(a, b, c);
        //         } 
        //         else if (iy == heightSegments - 1 && this.thetaEnd == Math.PI) {
        //             a = grid[iy][ix];
        //             b = grid[iy + 1][ix];
        //             c = grid[iy][ix + 1];
        //             indices.push(a, b, c);
        //         } 
        //         else {
        //             a = grid[iy][ix];
        //             b = grid[iy + 1][ix + 1];
        //             c = grid[iy][ix + 1];
        //             d = grid[iy + 1][ix];
        //             indices.push(a, b, c);
        //             indices.push(a, d, b);
        //         }
        //     }
        // } 


        // this.setIndex(indices);
        // this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        // this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
        // this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
    }

    static fromJSON(data) {
        return new SphereGeometry(data.radius, data.widthSegments, data.heightSegments, data.thetaStart, data.thetaEnd, data.thetaStart, data.thetaEnd);
    }

}

export { SphereGeometry };
