import {
    BufferGeometry,
    Float32BufferAttribute,
    Vector3
} from 'three';

class SphereGeometry extends BufferGeometry {
    constructor(radius = 1, widthSegments = 32, heightSegments = 16, phiStart = 0, phiEnd = Math.PI * 2, thetaStart = 0, thetaEnd = Math.PI) {
        super();
        this.type = 'SphereGeometry';
        this.parameters = {
            radius: radius,
            widthSegments: widthSegments,
            heightSegments: heightSegments,
            phiStart: phiStart,
            phiEnd: phiEnd,
            thetaStart: thetaStart,
            thetaEnd: thetaEnd
        };
        widthSegments = Math.max(3, Math.floor(widthSegments));
        heightSegments = Math.max(2, Math.floor(heightSegments));
        const phiStep = (phiEnd - phiStart) / heightSegments; 
        const thetaStep = (thetaEnd - thetaStart) / widthSegments; 

        let index = 0;
        const grid = [];
        const vertex = new Vector3();
        const normal = new Vector3(); // buffers

        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = []; // generate vertices, normals and uvs
        const filterSet = new Set();

        for(let hi=0; hi <= heightSegments; hi+=1) {
            let v = 1 - hi / heightSegments;
            const verticesRow = [];

            for(let wi=0; wi <= widthSegments; wi+=1) {
                let u = wi / widthSegments;
                if (v ==0 || v==1) {
                    u += 0.5 / widthSegments;
                }

                vertex.x = this.parameters.radius * Math.sin(hi*thetaStep) * Math.cos(wi*phiStep);
                vertex.y = this.parameters.radius * Math.sin(hi*thetaStep) * Math.sin(wi*phiStep);
                vertex.z = this.parameters.radius * Math.cos(hi*thetaStep);
                const filterV = vertex.x + ',' + vertex.y + ',' + vertex.z;
                if (!filterSet.has(filterV)) {
                    filterSet.add(filterV);
                    vertices.push(vertex.x, vertex.y, vertex.z);
                    normal.copy(vertex).normalize();
                    normals.push(normal.x, normal.y, normal.z); // uv
                    uvs.push(u,v);
                    verticesRow.push(index++);
                }
                

            }
            grid.push(verticesRow);
        }

        for (let iy = 0; iy < heightSegments; iy++) {
            for (let ix = 0; ix < widthSegments; ix++) {
                const a = grid[iy][ix + 1];
                const b = grid[iy][ix];
                const c = grid[iy + 1][ix];
                const d = grid[iy + 1][ix + 1];
                if (iy !== 0 || thetaStart > 0) indices.push(a, b, d);
                if (iy !== heightSegments - 1 || thetaEnd < Math.PI) indices.push(b, c, d);
            }
        } // build geometry


        this.setIndex(indices);
        this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
    }

    static fromJSON(data) {
        return new SphereGeometry(data.radius, data.widthSegments, data.heightSegments, data.phiStart, data.phiEnd, data.thetaStart, data.thetaEnd);
    }

}

export { SphereGeometry };
