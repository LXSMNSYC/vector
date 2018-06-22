export class vec3 {
    constructor(x, y, z) {
        /*
         *
         *   Overloads:
         *   new vec3(x, y, z)
         *   new vec3(x, vec2)
         *   new vec3(vec2, z)
         *   new vec3(vec3)
         *   new vec3(value)
         *   new vec3()
         */
        let validX = typeof x === "number";
        let validY = typeof y === "number";
        let validZ = typeof z === "number";

        if (validX && validY && validZ) {
            this.x = x;
            this.y = y;
            this.z = z;
        } else if (validX && y instanceof vec2) {
            this.x = x;
            this.y = y.x;
            this.z = y.y;
        } else if (x instanceof vec2 && validY) {
            this.x = x.x;
            this.y = x.y;
            this.z = y;
        } else if (x instanceof vec3) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        } else if (validX) {
            this.x = x;
            this.y = x;
            this.z = x;
        }
    }
    get length2() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    get length2XY() {
        return this.x * this.x + this.y * this.y;
    }
    get length2XZ() {
        return this.x * this.x + this.z * this.z;
    }
    get length2YZ() {
        return this.y * this.y + this.z * this.z;
    }
    get length() {
        return Math.sqrt(this.length2);
    }
    get lengthXY() {
        return Math.sqrt(this.length2XY);
    }
    get lengthXZ() {
        return Math.sqrt(this.length2XZ);
    }
    get lengthYZ() {
        return Math.sqrt(this.length2YZ);
    }
    get radXY() {
        return Math.atan2(this.y, this.x);
    }
    get radXZ() {
        return Math.atan2(this.z, this.x);
    }
    get radYZ() {
        return Math.atan2(this.z, this.x);
    }
    get radYX() {
        return Math.atan2(this.x, this.y);
    }
    get radZX() {
        return Math.atan2(this.x, this.z);
    }
    get radZY() {
        return Math.atan2(this.y, this.z);
    }
    get radZ() {
        return Math.atan2(this.z, this.lengthXY);
    }
    get radY() {
        return Math.atan2(this.y, this.lengthXZ);
    }
    get radX() {
        return Math.atan2(this.x, this.lengthYZ);
    }

    negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }
    add(v) {
        if (v instanceof vec3) {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
        } else if (v instanceof vec2) {
            this.x += v.x;
            this.y += v.y;
        } else if (typeof v === "number") {
            this.x += v;
            this.y += v;
            this.z += v;
        }
        return this;
    }
    sub(v) {
        if (v instanceof vec3) {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
        } else if (v instanceof vec2) {
            this.x -= v.x;
            this.y -= v.y;
        } else if (typeof v === "number") {
            this.x -= v;
            this.y -= v;
            this.z -= v;
        }
        return this;
    }
    mul(v) {
        if (v instanceof vec3) {
            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;
        } else if (v instanceof vec2) {
            this.x *= v.x;
            this.y *= v.y;
        } else if (typeof v === "number") {
            this.x *= v;
            this.y *= v;
            this.z *= v;
        }
        return this;
    }
    div(v) {
        if (v instanceof vec3) {
            this.x /= v.x;
            this.y /= v.y;
            this.z /= v.z;
        } else if (v instanceof vec2) {
            this.x /= v.x;
            this.y /= v.y;
        } else if (typeof v === "number") {
            this.x /= v;
            this.y /= v;
            this.z /= v;
        }
        return this;
    }

    dot(v) {
        if (v instanceof vec3) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        } else if (v instanceof vec2) {
            return this.x * v.x + this.y * v.y;
        }
    }

    cross(v) {
        if (v instanceof vec3) {
            let crossx = this.y * v.z - this.z * v.y;
            let crossy = this.z * v.x - this.x * v.z;
            let crossz = this.x * v.y - this.y * v.x;
            return new vec3(crossx, crossy, crossz);
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
    get yx() {
        return new vec2(this.y, this.x);
    }
    get yy() {
        return new vec2(this.y, this.y);
    }
    get yz() {
        return new vec2(this.y, this.z);
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
    get xxx() {
        return new vec3(this.x, this.x, this.x);
    }
    get xxy() {
        return new vec3(this.x, this.x, this.y);
    }
    get xxz() {
        return new vec3(this.x, this.x, this.z);
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
    get xzx() {
        return new vec3(this.x, this.z, this.x);
    }
    get xzy() {
        return new vec3(this.x, this.z, this.y);
    }
    get xzz() {
        return new vec3(this.x, this.z, this.z);
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
    get yyx() {
        return new vec3(this.y, this.y, this.x);
    }
    get yyy() {
        return new vec3(this.y, this.y, this.y);
    }
    get yyz() {
        return new vec3(this.y, this.y, this.z);
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
    get zxx() {
        return new vec3(this.z, this.x, this.x);
    }
    get zxy() {
        return new vec3(this.z, this.x, this.y);
    }
    get zxz() {
        return new vec3(this.z, this.x, this.z);
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
    get zzx() {
        return new vec3(this.z, this.z, this.x);
    }
    get zzy() {
        return new vec3(this.z, this.z, this.y);
    }
    get zzz() {
        return new vec3(this.z, this.z, this.z);
    }

    set xy(v2) {
        if (v2 instanceof vec3 || v2 instanceof vec2) {
            this.x = v2.x;
            this.y = v2.y;
        } else if (typeof v2 === "number") {
            this.x = v2;
            this.y = v2;
        }
    }
    set yx(v2) {
        if (v2 instanceof vec3 || v2 instanceof vec2) {
            this.y = v2.x;
            this.x = v2.y;
        } else if (typeof v2 === "number") {
            this.x = this.y = v2;
        }
    }
    set xz(v2) {
        if (v2 instanceof vec3 || v2 instanceof vec2) {
            this.x = v2.x;
            this.z = v2.y;
        } else if (typeof v2 === "number") {
            this.x = this.z = v2;
        }
    }
    set zx(v2) {
        if (v2 instanceof vec3 || v2 instanceof vec2) {
            this.z = v2.x;
            this.x = v2.y;
        } else if (typeof v2 === "number") {
            this.z = this.x = v2;
        }
    }
    set yz(v2) {
        if (v2 instanceof vec3 || v2 instanceof vec2) {
            this.y = v2.x;
            this.z = v2.y;
        } else if (typeof v2 === "number") {
            this.y = this.z = v2;
        }
    }
    set zy(v2) {
        if (v2 instanceof vec3 || v2 instanceof vec2) {
            this.z = v2.x;
            this.y = v2.y;
        } else if (typeof v2 === "number") {
            this.z = this.y = v2;
        }
    }
    set xyz(v2) {
        if (v2 instanceof vec3) {
            this.x = v2.x;
            this.y = v2.y;
            this.z = v2.z;
        } else if (typeof v2 === "number") {
            this.x = this.y = this.z = v2;
        }
    }
    set xzy(v2) {
        if (v2 instanceof vec3) {
            this.x = v2.x;
            this.z = v2.y;
            this.y = v2.z;
        } else if (typeof v2 === "number") {
            this.x = this.y = this.z = v2;
        }
    }
    set yxz(v2) {
        if (v2 instanceof vec3) {
            this.y = v2.x;
            this.x = v2.y;
            this.z = v2.z;
        } else if (typeof v2 === "number") {
            this.x = this.y = this.z = v2;
        }
    }
    set yzx(v2) {
        if (v2 instanceof vec3) {
            this.y = v2.x;
            this.z = v2.y;
            this.x = v2.z;
        } else if (typeof v2 === "number") {
            this.x = this.y = this.z = v2;
        }
    }
    set zxy(v2) {
        if (v2 instanceof vec3) {
            this.z = v2.x;
            this.x = v2.y;
            this.y = v2.z;
        } else if (typeof v2 === "number") {
            this.x = this.y = this.z = v2;
        }
    }

    set zyx(v2) {
        if (v2 instanceof vec3) {
            this.x = v2.x;
            this.y = v2.y;
            this.x = v2.z;
        } else if (typeof v2 === "number") {
            this.x = this.y = this.z = v2;
        }
    }
}