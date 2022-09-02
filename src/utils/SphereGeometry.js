import {
    BufferGeometry,
    Float32BufferAttribute,
    Vector3
} from 'three';

class SphereGeometry extends BufferGeometry {
    constructor(radius = 1, widthSegments = 32, heightSegments = 32, phiStart = 0, phiLength = Math.PI * 2, thetaStart = 0, thetaLength = 2 * Math.PI) {
        super();
        this.type = 'SphereGeometry';
        this.radius = radius;
        this.widthSegments = widthSegments;
        this.heightSegments = heightSegments;
        this.phiStart = phiStart;
        this.phiLength = Math.min(2*Math.PI, phiLength);
        this.thetaStart = thetaStart;
        this.thetaLength = Math.min(Math.PI, thetaLength);

        this.widthSegments = Math.max(3, Math.floor(this.widthSegments));
        this.heightSegments = Math.max(2, Math.floor(this.heightSegments));
        const thetaEnd = Math.min(this.thetaStart + this.thetaLength, Math.PI);

        let index = 0;
        const grid = [];
        const vertex = new Vector3();
        const normal = new Vector3(); // buffers

        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = []; // generate vertices, normals and uvs

        for (let iy = 0; iy <= this.heightSegments; iy++) {
            const verticesRow = [];
            const v = iy / this.heightSegments; // special case for the poles

            let uOffset = 0;

            if (iy == 0 && this.thetaStart == 0) {
                uOffset = 0.5 / this.widthSegments;
            } else if (iy == this.heightSegments && thetaEnd == Math.PI) {
                uOffset = -0.5 / this.widthSegments;
            }

            for (let ix = 0; ix <= this.widthSegments; ix++) {
                const u = ix / this.widthSegments; // vertex

                vertex.x = -this.radius * Math.cos(this.phiStart + u * this.phiLength) * Math.sin(this.thetaStart + v * this.thetaLength);
                vertex.y = this.radius * Math.cos(this.thetaStart + v * this.thetaLength);
                vertex.z = this.radius * Math.sin(this.phiStart + u * this.phiLength) * Math.sin(this.thetaStart + v * this.thetaLength);
                vertices.push(vertex.x, vertex.y, vertex.z); // normal

                normal.copy(vertex).normalize();
                normals.push(normal.x, normal.y, normal.z); // uv
                verticesRow.push(index++);
                uvs.push(u + uOffset, 1 - v);
            }

            grid.push(verticesRow);
        } // indices

        console.debug(vertices);
        for (let iy = 0; iy < this.heightSegments; iy++) {
            for (let ix = 0; ix < this.widthSegments; ix++) {
                const a = grid[iy][ix + 1];
                const b = grid[iy][ix];
                const c = grid[iy + 1][ix];
                const d = grid[iy + 1][ix + 1];
                if (iy !== 0 || this.thetaStart > 0) indices.push(a, b, d);
                if (iy !== this.heightSegments - 1 || thetaEnd < Math.PI) indices.push(b, c, d);
            }
        } // build geometry


        this.setIndex(indices);
        this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
    }

    static fromJSON(data) {
        return new SphereGeometry(data.radius, data.widthSegments, data.heightSegments, data.phiStart, data.phiLength, data.thetaStart, data.thetaLength);
    }

}

export { SphereGeometry };
