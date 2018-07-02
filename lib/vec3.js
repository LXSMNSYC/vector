import { vec2 } from "./vec2.js";

let add = (a, b) => a + b;
let sub = (a, b) => a - b;
let mul = (a, b) => a * b;
let div = (a, b) => a / b;

export class vec3 {
    /**
     * 
     * @param {?(number|vec2|vec3)} x 
     * @param {?(number|vec2)} y 
     * @param {?(number)} z 
     */
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
        this.x = this.y = this.z = 0;
        if (validX) {
            this.x = x;
            if (validY && validZ) {
                this.y = y;
                this.z = z;
            } else if (y instanceof vec2) {
                this.y = y.x;
                this.z = y.y;
            } else {
                this.y = this.z = x;
            }
        } else if (x instanceof vec2 || x instanceof vec3) {
            this.x = x.x;
            this.y = x.y;
            if (validY) {
                this.z = y;
            } else {
                this.z = x.z;
            }
        }
    }


    /**
     * @desc clones a vector
     * @return {vec3} copy of the vec3
     * @property {number} x 
     * @property {number} y
     * @property {number} z
     */
    clone() {
        return new vec3(this);
    }

    /**
     * @desc assigns component-wise from a scalar or a vector
     * @param {?(vec3|number)} v - a scalar or a vector 
     */
    assign(v) {
        if (v instanceof vec3) {
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
        } else if (typeof v === "number") {
            this.x = this.y = this.z = v;
        }
        return this;
    }

    /**
     * @desc checks if vector is a zero vector
     * @type {boolean}
     */
    get isZero() {
        return this.x == 0 && this.y == 0 && this.z == 0;
    }

    /**
     * @desc calculates the squared magnitude
     * @return {number}
     */
    get length2() {
        if (this.isZero) {
            return 0;
        }
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    /**
     * @desc calculates the magnitude
     * @return {number}
     */
    get length() {
        if (this.isZero) {
            return 0;
        }
        return Math.sqrt(this.length2);
    }


    get phiZ() {
        if (this.isZero) {
            return undefined;
        }
        return Math.acos(this.z / this.length);
    }
    get phiY() {
        if (this.isZero) {
            return undefined;
        }
        return Math.acos(this.y / this.length);
    }
    get phiX() {
        if (this.isZero) {
            return undefined;
        }
        return Math.acos(this.x / this.length);
    }

    /**
     * @desc normalize a vector to a given magnitude
     * @param {?(number|vec3)} v - a scalar or a vector. if a vector is passed, the vector's magnitude is applied
     */
    set length(v) {
        if (v instanceof vec3) {
            v = v.length;
        }
        if (typeof v === "number") {
            if (!this.isZero) {
                let len = v / this.length;
                this.x *= len;
                this.y *= len;
                this.z *= len;
            }
        }
    }

    /**
     * @desc scales the magnitude
     * @param {?(number|vec3)} v - a scalar or a vector. if a vector is passed, the vector's magnitude is applied. 
     * @return {vec3}
     */
    scale(v) {
        if (v instanceof vec3) {
            v = v.length;
        }
        if (typeof v === "number") {
            if (!this.isZero) {
                this.length = this.length * v;
            }
        }
        return this;
    }

    /**
     * @desc normalize a vector to the unit vector
     * @return {vec3}
     */
    normalize() {
        this.length = 1;
        return this;
    }

    roll(v) {
        if (!this.isZero) {
            let len = this.x * this.x + this.y * this.y;
            if (v instanceof vec2 || v instanceof vec3) {
                this.x = len * v.x;
                this.y = len * v.y;
            } else if (typeof v === "number") {
                this.x = len * Math.cos(v);
                this.y = len * Math.sin(v);
            }
        }
        return this;
    }
    yaw(v) {
        if (!this.isZero) {
            let len = this.x * this.x + this.z * this.z;
            if (v instanceof vec2 || v instanceof vec3) {
                this.x = len * v.x;
                this.z = len * v.y;
            } else if (typeof v === "number") {
                this.x = len * Math.cos(v);
                this.z = len * Math.sin(v);
            }
        }
        return this;
    }

    pitch(v) {
        if (!this.isZero) {
            let len = this.y * this.y + this.z * this.z;
            if (v instanceof vec2 || v instanceof vec3) {
                this.y = len * v.x;
                this.z = len * v.y;
            } else if (typeof v === "number") {
                this.y = len * Math.cos(v);
                this.z = len * Math.sin(v);
            }
        }
        return this;
    }

    rodrigues(a, r) {
        if (a instanceof vec3) {
            let x, y;
            if (r instanceof vec2 || r instanceof vec3) {
                x = r.x;
                y = r.y;
            } else if (typeof r === "number") {
                x = Math.cos(r);
                y = Math.sin(r);
            } else {
                x = y = 0;
            }
            if (a.length2 > 0) {
                a = a.direction;
            }
            /**
             * rot = this * x + cross(a, this) * y + k * dot(k, this)
             */
            this.mul(x).add(this.cross(a).mul(y)).add(vec3.prod(this.dot(a)));
        }
    }

    /**
     * @desc negates a vector
     * @return {vec3}
     */
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }

    /**
     * @desc compares vectors and applies a function component-wise.
     * @param {(number|Object)} b - a scalar or a vector to be compared. 
     * @param {function(a: number, b: number): number} fn - a function applied to the components 
     * @return {vec3}
     */
    compare(b, fn) {
        if (typeof fn === "function") {
            if (b instanceof vec3) {
                this.x = fn(this.x, b.x);
                this.y = fn(this.y, b.y);
                this.z = fn(this.z, b.z);
            } else if (typeof b === "number") {
                this.x = fn(this.x, b);
                this.y = fn(this.y, b);
                this.z = fn(this.z, b);
            }
        }
        return this;
    }

    /**
     * @desc two vectors and applies a function component-wise
     * @param {?(vec3|number)} a - a scalar or a vector
     * @param {?(vec3|number)} b - a scalar or a vector 
     * @param {vec3~compare} fn - a function applied to the components 
     * @return {vec3}
     */

    /**
     * @callback vec3~compare
     * @param {number} a  
     * @param {number} b
     */
    static compare(a, b, fn) {
        return new vec3(a).compare(b, fn);
    }

    /**
     * @desc adds a vector/scalar component-wise
     * @param {?(vec3|number)} v - a scalar or a vector
     * @return {vec3}
     */
    add(v) {
        return this.compare(v, add);
    }

    /**
     * @desc subtracts a vector/scalar component-wise
     * @param {?(vec3|number)} v - a scalar or a vector
     * @return {vec3}
     */
    sub(v) {
        return this.compare(v, sub);
    }

    /**
     * @desc multiplies a vector/scalar component-wise
     * @param {?(vec3|number)} v - a scalar or a vector
     * @return {vec3}
     */
    mul(v) {
        return this.compare(v, mul);
    }

    /**
     * @desc divides a vector/scalar component-wise. returns a zero-vector if the divisor is a zero vector.
     * @param {?(vec3|number)} v - a scalar or a vector
     * @return {vec3}
     */
    div(v) {
        if ((v instanceof vec3 && v.isZero) || (typeof v === "number" && v == 0)) {
            return new vec3(0, 0);
        }
        return this.compare(v, div);
    }

    /**
     * @desc a min vector (min value component-wise)
     * @param {?(number|vec3)} a - a scalar or a vector
     * @param {?(number|vec3)} b - a scalar or a vector
     * @return {vec3}
     */
    static min(a, b) {
        return vec3.compare(a, b, Math.min);
    }

    /**
     * @desc a max vector (max value component-wise)
     * @param {?(number|vec3)} a - a scalar or a vector
     * @param {?(number|vec3)} b - a scalar or a vector
     * @return {vec3}
     */
    static max(a, b) {
        return vec3.compare(a, b, Math.max);
    }

    /**
     * @desc a clamp vector (clamps value component-wise between 3 vectors/scalar)
     * @param {?(number|vec3)} a - a scalar or a vector
     * @param {?(number|vec3)} b - a scalar or a vector
     * @param {?(number|vec3)} c - a scalar or a vector
     * @return {vec3} 
     */
    static clamp(a, b, c) {
        return vec3.max(a, vec3.min(b, c));
    }

    /**
     * @desc calculates vector dot product
     * @param {?(vec3)} v 
     * @return {number}
     */
    dot(v) {
        if (v instanceof vec3) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        }
        return 0;
    }

    cross(v) {
        if (v instanceof vec3) {
            return new vec3(this.y * v.z - v.y * this.z,
                this.z * v.x - v.z * this.x,
                this.x * v.y - v.x * this.y);
        }
        return new vec3();
    }

    /**
     * @desc gets the direction vector
     * @return {vec3}
     */
    get direction() {
        return this.clone().normalize();
    }

    /**
     * @desc calculates the sum vector between two vectors (adds component-wise)
     * @param {?(number|vec3)} v1 - a scalar or a vector
     * @param {?(number|vec3)} v2 - a scalar or a vector
     * @return {vec3}
     */
    static sum(v1, v2) {
        if (v1 instanceof vec3) {
            return v1.clone().add(v2);
        } else if (v2 instanceof v1) {
            return v2.clone().add(v1);
        }
        return new vec3();
    }

    /**
     * @desc calculates the difference vector between two vectors (subtracts component-wise)
     * @param {?(number|vec3)} v1 - a scalar or a vector
     * @param {?(number|vec3)} v2 - a scalar or a vector
     * @return {vec3}
     */
    static diff(v1, v2) {
        if (v1 instanceof vec3) {
            return v1.clone().sub(v2);
        } else if (v2 instanceof v1) {
            return v2.clone().sub(v1);
        }
        return new vec3();
    }

    /**
     * @desc calculates the product vector between two vectors (multiplies component-wise)
     * @param {?(number|vec3)} v1 - a scalar or a vector
     * @param {?(number|vec3)} v2 - a scalar or a vector
     * @return {vec3}
     */
    static prod(v1, v2) {
        if (v1 instanceof vec3) {
            return v1.clone().mul(v2);
        } else if (v2 instanceof v1) {
            return v2.clone().mul(v1);
        }
        return new vec3();
    }

    /**
     * @desc calculates the quotient vector between two vectors (divides component-wise)
     * @param {?(number|vec3)} v1 - a scalar or a vector
     * @param {?(number|vec3)} v2 - a scalar or a vector
     * @return {vec3}
     */
    static quot(v1, v2) {
        if (v1 instanceof vec3) {
            return v1.clone().div(v2);
        } else if (v2 instanceof v1) {
            return v2.clone().div(v1);
        }
        return new vec3();
    }

    /**
     * @desc calculates linear interpolation between vectors (component-wise)
     * @param {?(number|vec3)} v1 - a scalar or a vector
     * @param {?(number|vec3)} v2 - a scalar or a vector
     * @param {?(number|vec3)} t - weight or time; can be a scalar or a vector
     * @return {vec3}
     */
    static mix(v1, v2, t) {
        /**
         * return v1 + (v2 - v1)*t
         */
        return vec3.sum(v1, vec3.diff(v2, v1).mul(t));
    }

    /**
     * @desc calculates linear interpolation to a vector (component-wise)
     * @param {?(number|vec3)} v - a scalar or a vector
     * @return {vec3}
     */
    mix(v, t) {
        return vec3.mix(this, v, t);
    }

    /**
     * @desc calculates smoothstep between vectors (component-wise)
     * @see https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/smoothstep.xhtml
     * @param {?(number|vec3)} v1 - a scalar or a vector
     * @param {?(number|vec3)} v2 - a scalar or a vector
     * @return {vec3}
     */
    static smoothstep(v1, v2, t) {
        /**
         * t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
         *   return t * t * (3.0 - 2.0 * t);
         */
        let k = vec3.clamp(vec3.diff(t, v1).div(vec3.diff(v2, v1)), 0, 1);
        return vec3.prod(vec3.prod(k, k), vec3.prod(k, 2).negate().sub(3));
    }

    smoothstep(v2, t) {
        return vec3.smoothstep(this, v2, t);
    }

    /**
     * @desc calculates the reflect vector from incident vector and normal vector
     * @see https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/reflect.xhtml
     * @param {!(vec3)} i - incident vector 
     * @param {!(vec3)} n -  normal vector
     * @returns {vec3}
     */
    static reflect(i, n) {
        if (i instanceof vec3 && n instanceof vec3) {
            let nclone = n.direction;
            /**
             * I - 2.0 * dot(N, I) * N.
             */
            return vec3.diff(i, nclone.mul(nclone.dot(i)).mul(2));
        }
        return new vec3();
    }

    /**
     * @desc calculates the reflect vector from incident vector and normal vector
     * @see https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/reflect.xhtml
     * @param {vec2} n -  normal vector
     * @return {vec2}
     */
    reflect(n) {
        return vec3.reflect(this, n);
    }

    /**
     * @desc calculates the refraction vector
     * @see https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/refract.xhtml
     * @param {vec3} i - incident vector
     * @param {vec3} n - normal vector
     * @param {number} eta - ratio of indices of refraction
     * @return {vec3}
     */
    static refract(i, n, eta) {
        if (i instanceof vec3 && n instanceof vec3 && typeof eta === "number") {
            /**
             * k = 1.0 - eta * eta * (1.0 - dot(N, I) * dot(N, I));
             * if (k < 0.0)
             *  R = genType(0.0);       // or genDType(0.0)
             * else
             *  R = eta * I - (eta * dot(N, I) + sqrt(k)) * N;
             */
            let iclone = i.direction;
            let nclone = n.direction;
            let dot = i.dot(n);
            let k = eta * eta * (1 - dot * dot);
            if (k >= 0.0) {
                return iclone.mul(eta).sub(nclone.mul(eta * dot + Math.sqrt(k)));
            }
        }
        return new vec3();
    }

    /**
     * @desc calculates the refraction vector
     * @see https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/refract.xhtml
     * @param {vec3} n - normal vector
     * @param {number} eta - ratio of indices of refraction
     * @return {vec3}
     */
    refract(n, eta) {
        return vec3.refract(this, n, eta);
    }

    /**
     * @desc calculates the orthogonal projection vector
     * @see https://en.wikipedia.org/wiki/Vector_projection
     * @param {vec3} v - the vector component
     */
    projection(v) {
        if (v instanceof vec3 && !v.isZero) {
            let vclone = v.direction;
            return vclone.mul(this.dot(vclone));
        }
        return new vec3();
    }

    /**
     * @desc calculates the orthogonal rejection vector
     * @see https://en.wikipedia.org/wiki/Vector_projection
     * @param {vec3} v - the vector component
     */
    rejection(v) {
        if (v instanceof vec3 && !v.isZero) {
            return vec2.diff(this, this.projection(v));
        }
        return new vec3();
    }


    /**
     * @desc calculates the direction vector towards a vector
     * @param {vec3} v 
     * @return {number}
     */
    directionTo(v) {
        if (v instanceof vec3) {
            if (v.isZero && this.isZero) {
                return new vec3();
            }
            return vec2.diff(v, this).normalize();
        }
    }

    /**
     * @desc calculates the squared distance between two vectors
     * @param {vec2} v 
     * @return {number}
     */
    distance2(v) {
        if (v instanceof vec3) {
            if (this.isZero && v.isZero) {
                return 0;
            }
            let dx = v.x - this.x;
            let dy = v.y - this.y;
            let dz = v.z - this.z;
            return dx * dx + dy * dy + dz * dz;
        }
        return 0;
    }

    /**
     * @desc calculates the distance between two vectors
     * @param {vec3} v 
     * @return {number}
     */
    distance(v) {
        if (v instanceof vec3) {
            if (this.isZero && v.isZero) {
                return 0;
            }
            return Math.sqrt(this.distance2(v));
        }
        return 0;
    }

    /**
     * @desc applies equality comparison between vectors component-wise
     * @param {vec3} v
     * @return {boolean} 
     */
    equalsComp(v) {
        if (v instanceof vec3) {
            return this.x === v.x && this.y === v.y && this.z === v.z;
        }
        return false;
    }

    /**
     * @desc applies less-than comparison between vectors component-wise
     * @param {vec3} v
     * @return {boolean} 
     */
    lessThanComp(v) {
        if (v instanceof vec3) {
            return this.x < v.y && this.y < v.y && this.z < v.z;
        }
        return false;
    }

    /**
     * @desc applies equality comparison between vectors magnitude-wise
     * @param {vec3} v
     * @return {boolean} 
     */
    equals(v) {
        if (v instanceof vec3) {
            return v.length2 === this.length2;
        } else if (typeof v === "number") {
            return this.length === v;
        }
        return false;
    }

    /**
     * @desc applies less-than comparison between vectors magnitude-wise
     * @param {vec3} v
     * @return {boolean} 
     */
    lessThan(v) {
        if (v instanceof vec3) {
            return this.length < v.length;
        } else if (typeof v === "number") {
            return this.length < v;
        }
        return false;
    }

    /**
     *  @desc gets the array representation of vector
     *  @returns {Array}
     */
    toArray() {
        return [this.x, this.y, this.z];
    }
}