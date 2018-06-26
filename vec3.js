import { vec2 } from "./vec2.js";

function lerp(a, b, t) {
    return a + (b - a) * t;
}

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
        } else if (x instanceof vec3 || x instanceof vec4) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        } else if (validX) {
            this.x = x;
            this.y = x;
            this.z = x;
        }
    }
    get isZero() {
        return this.x == 0 && this.y == 0 && this.z == 0;
    }
    get length2() {
        if (this.isZero) {
            return 0;
        }
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    get length() {
        if (this.isZero) {
            return 0;
        }
        return Math.sqrt(this.length2);
    }
    get angleZ() {
        if (this.isZero) {
            return undefined;
        }
        return Math.atan2(this.z, this.xy.length);
    }
    get angleY() {
        if (this.isZero) {
            return undefined;
        }
        return Math.atan2(this.y, this.xz.length);
    }
    get angleX() {
        if (this.isZero) {
            return undefined;
        }
        return Math.atan2(this.x, this.yz.length);
    }
    set length(v) {
        if (typeof v === "number") {
            if (!this.isZero) {
                let len = v / this.length;
                this.x *= len;
                this.y *= len;
                this.z *= len;
            }
        }
    }
    set scale(v) {
        if (typeof v === "number") {
            if (!this.isZero) {
                this.length = this.length * v;
            }
        }
    }
    normalize() {
        this.length = 1;
        return this;
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
            if (!v.isZero) {
                if (v.x != 0) {
                    this.x /= v.x;
                }
                if (v.y != 0) {
                    this.y /= v.y;
                }
                if (v.z != 0) {
                    this.z /= v.z;
                }
            } else {
                this.x = this.y = this.z = 0;
            }
        } else if (v instanceof vec2) {
            if (!v.isZero) {
                this.x /= v.x;
                this.y /= v.y;
            } else {
                this.x = this.y = this.z = 0;
            }
        } else if (typeof v === "number") {
            if (v != 0) {
                this.x /= v;
                this.y /= v;
                this.z /= v;
            } else {
                this.x = this.y = this.z = 0;
            }
        }
        return this;
    }
    dot(v) {
        if (v instanceof vec3) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        } else if (v instanceof vec2) {
            return this.x * v.x + this.y * v.y;
        }
        return 0;
    }
    cross(v) {
        if (v instanceof vec3) {
            let crossx = this.y * v.z - this.z * v.y;
            let crossy = this.z * v.x - this.x * v.z;
            let crossz = this.x * v.y - this.y * v.x;
            return new vec3(crossx, crossy, crossz);
        }
        return undefined
    }

    mix(v, t) {
        if (v instanceof vec3 && t === "number") {
            return new vec3(lerp(this.x, v.x, t), lerp(this.y, v.y, t), lerp(this.z, v.z, t));
        }
        return 0;
    }
    get direction() {
        if (this.isZero) {
            return undefined;
        }
        let len = this.length;
        if (len != 1) {
            this.normalize();
        }
        let x = this.x;
        let y = this.y;
        let z = this.z;
        if (len != 1) {
            this.length = len;
        }
        return new vec3(x, y, z);
    }

    static sum(v1, v2) {
        if (v1 instanceof vec3 && v2 instanceof vec3) {
            return new vec3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
        } else if (v1 instanceof vec3 && typeof v2 === "number") {
            return new vec3(v1.x + v2, v1.y + v2, v1.z + v2);
        } else if (v2 instanceof vec3 && typeof v1 === "number") {
            return new vec3(v2.x + v1, v2.y + v1, v2.z + v1);
        }
        return new vec3(0, 0, 0);
    }

    static diff(v1, v2) {
        if (v1 instanceof vec3 && v2 instanceof vec3) {
            return new vec3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
        } else if (v1 instanceof vec3 && typeof v2 === "number") {
            return new vec3(v1.x - v2, v1.y - v2, v1.z - v2);
        } else if (v2 instanceof vec3 && typeof v1 === "number") {
            return new vec3(v2.x - v1, v2.y - v1, v2.z - v1);
        }
        return new vec3(0, 0, 0);
    }

    static prod(v1, v2) {
        if (v1 instanceof vec3 && v2 instanceof vec3) {
            return new vec3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
        } else if (v1 instanceof vec3 && typeof v2 === "number") {
            return new vec3(v1.x * v2, v1.y * v2, v1.z * v2);
        } else if (v2 instanceof vec3 && typeof v1 === "number") {
            return new vec3(v2.x * v1, v2.y * v1, v2.z * v1);
        }
        return new vec3(0, 0, 0);
    }

    static quot(v1, v2) {
        if (v1 instanceof vec3 && v2 instanceof vec3) {
            return new vec3(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z);
        } else if (v1 instanceof vec3 && typeof v2 === "number") {
            return new vec3(v1.x / v2, v1.y / v2, v1.z / v2);
        } else if (v2 instanceof vec3 && typeof v1 === "number") {
            return new vec3(v2.x / v1, v2.y / v1, v2.z / v1);
        }
        return new vec3(0, 0, 0);
    }

    get clone() {
        return new vec3(this.x, this.y, this.z);
    }

    set assign(v) {
        if (v instanceof vec3) {
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
        }
    }
}