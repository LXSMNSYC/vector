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
                this.w = y.w;
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
    get xx() {
        return new vec2(this.x, this.x);
    }
    get xy() {
        return new vec2(this.x, this.y);
    }
    get xz() {
        return new vec2(this.x, this.z);
    }
    get xw() {
        return new vec2(this.x, this.w);
    }
    get yx() {
        return new vec2(this.y, this.x);
    }
    get yy() {
        return new vec2(this.y, this.y);
    }
    get yz() {
        return new vec2(this.y, this.z);
    }
    get yw() {
        return new vec2(this.y, this.w);
    }
    get zx() {
        return new vec2(this.z, this.x);
    }
    get zy() {
        return new vec2(this.z, this.y);
    }
    get zz() {
        return new vec2(this.z, this.z);
    }
    get zw() {
        return new vec2(this.z, this.w);
    }
    get wx() {
        return new vec2(this.w, this.x);
    }
    get wy() {
        return new vec2(this.w, this.y);
    }
    get wz() {
        return new vec2(this.w, this.z);
    }
    get ww() {
        return new vec2(this.w, this.w);
    }

    get xxx() {
        return new vec3(this.x, this.x, this.x);
    }
    get xxy() {
        return new vec3(this.x, this.x, this.y);
    }
    get xxz() {
        return new vec3(this.x, this.x, this.z);
    }
    get xxw() {
        return new vec3(this.x, this.x, this.w);
    }
    get xyx() {
        return new vec3(this.x, this.y, this.x);
    }
    get xyy() {
        return new vec3(this.x, this.y, this.y);
    }
    get xyz() {
        return new vec3(this.x, this.y, this.z);
    }
    get xyw() {
        return new vec3(this.x, this.y, this.w);
    }
    get xzx() {
        return new vec3(this.x, this.z, this.x);
    }
    get xzy() {
        return new vec3(this.x, this.z, this.y);
    }
    get xzz() {
        return new vec3(this.x, this.z, this.z);
    }
    get xzw() {
        return new vec3(this.x, this.z, this.w);
    }
    get xwx() {
        return new vec3(this.x, this.w, this.x);
    }
    get xwy() {
        return new vec3(this.x, this.w, this.y);
    }
    get xwz() {
        return new vec3(this.x, this.w, this.z);
    }
    get xww() {
        return new vec3(this.x, this.w, this.w);
    }

    get yxx() {
        return new vec3(this.y, this.x, this.x);
    }
    get yxy() {
        return new vec3(this.y, this.x, this.y);
    }
    get yxz() {
        return new vec3(this.y, this.x, this.z);
    }
    get yxw() {
        return new vec3(this.y, this.x, this.w);
    }
    get yyx() {
        return new vec3(this.y, this.y, this.x);
    }
    get yyy() {
        return new vec3(this.y, this.y, this.y);
    }
    get yyz() {
        return new vec3(this.y, this.y, this.z);
    }
    get yyw() {
        return new vec3(this.y, this.y, this.w);
    }
    get yzx() {
        return new vec3(this.y, this.z, this.x);
    }
    get yzy() {
        return new vec3(this.y, this.z, this.y);
    }
    get yzz() {
        return new vec3(this.y, this.z, this.z);
    }
    get yzw() {
        return new vec3(this.y, this.z, this.w);
    }
    get ywx() {
        return new vec3(this.y, this.w, this.x);
    }
    get ywy() {
        return new vec3(this.y, this.w, this.y);
    }
    get ywz() {
        return new vec3(this.y, this.w, this.z);
    }
    get yww() {
        return new vec3(this.y, this.w, this.w);
    }

    get zxx() {
        return new vec3(this.z, this.x, this.x);
    }
    get zxy() {
        return new vec3(this.z, this.x, this.y);
    }
    get zxz() {
        return new vec3(this.z, this.x, this.z);
    }
    get zxw() {
        return new vec3(this.z, this.x, this.w);
    }
    get zyx() {
        return new vec3(this.z, this.y, this.x);
    }
    get zyy() {
        return new vec3(this.z, this.y, this.y);
    }
    get zyz() {
        return new vec3(this.z, this.y, this.z);
    }
    get zyw() {
        return new vec3(this.z, this.y, this.w);
    }
    get zzx() {
        return new vec3(this.z, this.z, this.x);
    }
    get zzy() {
        return new vec3(this.z, this.z, this.y);
    }
    get zzz() {
        return new vec3(this.z, this.z, this.z);
    }
    get zzw() {
        return new vec3(this.z, this.z, this.w);
    }
    get zwx() {
        return new vec3(this.z, this.w, this.x);
    }
    get zwy() {
        return new vec3(this.z, this.w, this.y);
    }
    get zwz() {
        return new vec3(this.z, this.w, this.z);
    }
    get zww() {
        return new vec3(this.z, this.w, this.w);
    }
}