const rad2deg = 57.295779513082320;

export class vec2 {
    /*
     *
     * 
     * 
     */
    constructor(x, y) {
        /*
         *
         *   Overloads:
         *   new vec2(x, y)
         *   new vec2(vec)
         *   new vec2(value)
         *   new vec2()
         *
         */
        if (typeof x === "number" && typeof y === "number") {
            this.x = x;
            this.y = y;
        } else if (x instanceof vec2) {
            this.x = x.x;
            this.y = x.y;
        } else if (typeof x === "number") {
            this.x = this.y = x;
        } else {
            this.x = this.y = 0;
        }
    }

    get isZero() {
        return this.x == 0 && this.y == 0
    }

    get length2() {
        if (this.isZero) {
            return 0;
        }
        return this.x * this.x + this.y * this.y;
    }
    get length() {
        if (this.isZero) {
            return 0;
        }
        return Math.sqrt(this.length2);
    }
    get rad() {
        if (this.isZero) {
            return undefined;
        }
        return atan2(this.y, this.x);
    }
    set length(v) {
        if (typeof v === "number") {
            let len = this.length;
            if (len > 0) {
                len = v / len;
                this.x *= len;
                this.y *= len;
            }
        }
    }
    set scale(v) {
        if (typeof v === "number") {
            this.length = this.length * v;
        }
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
        if (len != 1) {
            this.length = len;
        }
        return new vec2(x, y);
    }
    normalize() {
        this.length = 1;
        return this;
    }
    rotate(v) {
        let len = this.length;
        if (v instanceof vec2) {
            if (!this.isZero) {
                this.x = len * v.x;
                this.y = len * v.y;
            }
        } else if (typeof v === "number") {
            this.x = len * Math.cos(v);
            this.y = len * Math.sin(v);
        }
        return this;
    }

    set xy(v) {
        if (v instanceof vec2) {
            this.x = v.x;
            this.y = v.y;
        } else if (typeof v === "number") {
            this.x = this.y = v;
        }
    }
    set yx(v) {
        if (v instanceof vec2) {
            this.x = v.y;
            this.y = v.x;
        } else if (typeof v === "number") {
            this.x = this.y = v;
        }
    }
    get xx() {
        return new vec2(this.x, this.x);
    }
    get yy() {
        return new vec2(this.y, this.y);
    }
    get yx() {
        return new vec2(this.y, this.x);
    }
    get xy() {
        return new vec2(this.x, this.y);
    }
    negate() {
        if (!this.isZero) {
            this.x = -this.x;
            this.y = -this.y;
        }
        return this;
    }
    add(v) {
        if (v instanceof vec2) {
            this.x += v.x;
            this.y += v.y;
        } else if (typeof v === "number") {
            this.x += v;
            this.y += v;
        }
        return this;
    }
    sub(v) {
        if (v instanceof vec2) {
            this.x -= v.x;
            this.y -= v.y;
        } else if (typeof v === "number") {
            this.x -= v;
            this.y -= v;
        }
        return this;
    }
    mul(v) {
        if (v instanceof vec2) {
            this.x *= v.x;
            this.y *= v.y;
        } else if (typeof v === "number") {
            this.x *= v;
            this.y *= v;
        }
        return this;
    }
    div(v) {
        if (v instanceof vec2) {
            this.x *= v.x;
            this.y *= v.y;
        } else if (typeof v === "number") {
            this.x *= v;
            this.y *= v;
        }
        return this;
    }
    dot(v) {
        if (v instanceof vec2) {
            return this.x * v.x + this.y * v.y
        }
    }
    static sum(v1, v2) {
        if (v1 instanceof vec2 && v2 instanceof vec2) {
            return new vec2(v1.x + v2.x, v1.y + v2.y);
        } else if (v1 instanceof vec2 && typeof v2 === "number") {
            return new vec2(v1.x + v2, v1.y + v2);
        } else if (v2 instanceof vec2 && typeof v1 === "number") {
            return new vec2(v2.x + v1, v2.y + v1);
        }
        return new vec2(0, 0);
    }
    static diff(v1, v2) {
        if (v1 instanceof vec2 && v2 instanceof vec2) {
            return new vec2(v1.x - v2.x, v1.y - v2.y);
        } else if (v1 instanceof vec2 && typeof v2 === "number") {
            return new vec2(v1.x - v2, v1.y - v2);
        } else if (v2 instanceof vec2 && typeof v1 === "number") {
            return new vec2(v2.x - v1, v2.y - v1);
        }

        return new vec2(0, 0);
    }
    static prod(v1, v2) {
        if (v1 instanceof vec2 && v2 instanceof vec2) {
            if (v1.isZero || v2.isZero) {
                return 0;
            }
            return new vec2(v1.x * v2.x, v1.y * v2.y);
        } else if (v1 instanceof vec2 && typeof v2 === "number") {
            return new vec2(v1.x * v2, v1.y * v2);
        } else if (v2 instanceof vec2 && typeof v1 === "number") {
            return new vec2(v2.x * v1, v2.y * v1);
        }
        return new vec2(0, 0);
    }
    static quot(v1, v2) {
        if (v1 instanceof vec2 && v2 instanceof vec2) {
            if (v2.isZero) {
                return undefined;
            }
            if (v1.isZero) {
                return 0;
            }
            return new vec2(v1.x / v2.x, v1.y / v2.y);
        } else if (v1 instanceof vec2 && typeof v2 === "number") {
            return new vec2(v1.x / v2, v1.y / v2);
        } else if (v2 instanceof vec2 && typeof v1 === "number") {
            return new vec2(v2.x / v1, v2.y / v1);
        }
        return new vec2(0, 0);
    }
    angleTo(v) {
        if (v instanceof vec2) {
            return atan2(v.y - this.y, v.x - this.x);
        }
        return 0;
    }
    distance2(v) {
        if (v instanceof vec2) {
            if (this.isZero && v.isZero) {
                return 0;
            }
            let dx = v.x - this.x;
            let dy = v.y - this.y;
            return dx * dx + dy * dy;
        }
        return 0;
    }
    distance(v) {
        if (v instanceof vec2) {
            if (this.isZero && v.isZero) {
                return 0;
            }
            return Math.sqrt(this.distance2(v));
        }
        return 0;
    }
    static distance2(v1, v2) {
        if (v1 instanceof vec2 && v2 instanceof vec2) {
            if (v1.isZero && v2.isZero) {
                return 0;
            }
            return v1.distance2(v2);
        }
        return 0;
    }
    static distance(v1, v2) {
        if (v1 instanceof vec2 && v2 instanceof vec2) {
            if (v1.isZero && v2.isZero) {
                return 0;
            }
            return v1.distance(v2);
        }
        return 0;
    }
    rotateOnVec(v, rad) {
        if (v instanceof vec2) {
            let len = this.length;
            if (typeof rad === "number") {
                this.x = v.x + len * Math.cos(rad);
                this.y = v.y + len * Math.sin(rad);
            } else if (rad instanceof vec2) {
                this.x = v.x + len * rad.x;
                this.y = v.y + len * rad.y;
            }
        }
        return this;
    }

    equals(v) {
        if (v instanceof vec2) {
            return this.x === v.x && this.y === v.y && this.z === v.z;
        }
        return false;
    }

    toArray() {
        return [this.x, this.y];
    }

}