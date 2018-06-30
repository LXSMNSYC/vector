import { vec2 } from "./vec2.js";
import { vec3 } from "./vec3.js";
export class vec4 {
    /*
     *
     *   Overloads:
     *   new vec4(x, y, z, w)
     *   new vec4(vec4)
     *   new vec4(vec3, w)
     *   new vec4(x, vec3)
     *   new vec4(vec2, vec2)
     *   new vec4(vec2, z, w)
     *   new vec4(x, vec2, w)
     *   new vec4(x, y, vec2)
     *   new vec4(value)
     *   new vec4()
     */
    constructor(x, y, z, w) {
        let validX = typeof x === "number";
        let validY = typeof y === "number";
        let validZ = typeof z === "number";
        let validW = typeof w === "number";
        if (validX && validY && validZ && validW) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        } else if (x instanceof vec4) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
            this.w = x.w;
        } else if (x instanceof vec3 && validY) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
            this.w = y;
        } else if (validX && y instanceof vec3) {
            this.x = x;
            this.y = y.x;
            this.z = y.y;
            this.w = y.z;
        } else if (x instanceof vec2) {
            this.x = x.x;
            this.y = x.y;
            if (y instanceof vec2) {
                this.z = y.x;
                this.w = y.y;
            } else if (validY && validZ) {
                this.z = y;
                this.w = z;
            }
        } else if (validX) {
            this.x = x;
            if (y instanceof vec2 && validZ) {
                this.y = y.x;
                this.z = y.y;
                this.w = z;
            } else if (validY) {
                this.y = y;
                if (z instanceof vec2) {
                    this.z = z.x;
                    this.w = z.y;
                }
            } else {
                this.y = this.z = this.w = x;
            }
        } else {
            this.x = this.y = this.z = this.w = 0;
        }
    }

    clone() {
        return new vec4(this);
    }
    assign(v) {
        if (v instanceof vec4) {
            this.x = v.x;
            this.y = v.y;
        }
        return this;
    }
}
