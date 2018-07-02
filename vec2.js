let add = (a, b) => a + b;
let sub = (a, b) => a - b;
let mul = (a, b) => a * b;
let div = (a, b) => a / b;
/**
 * @desc vec2 class
 */
export class vec2 {

    /**
     * @param {?(number|vec2)} x - a scalar or a vector.
     * @param {?number} [y] - a scalar. ignored if x is a vector.
     * @return {vec2} new vec2 instance
     * @property {number} x 
     * @property {number} y
     */
    constructor(x, y) {
        this.x = this.y = 0;
        if (typeof x === "number" && typeof y === "number") {
            this.x = this.y = x;
            if (typeof y === "number") {
                this.y = y;
            }
        } else if (x instanceof vec2) {
            this.x = x.x;
            this.y = x.y;
        }
    }

    /**
     * @desc clones a vector
     * @return {vec2} copy of the vec2
     * @property {number} x 
     * @property {number} y
     */
    clone() {
        return new vec2(this);
    }

    /**
     * @desc assigns component-wise from a scalar or a vector
     * @param {?(vec2|number)} v - a scalar or a vector 
     */
    assign(v) {
        if (v instanceof vec2) {
            this.x = v.x;
            this.y = v.y;
        } else if (typeof v === "number") {
            this.x = this.y = v;
        }
        return this;
    }

    /**
     * @desc checks if vector is a zero vector
     * @type {boolean}
     */
    get isZero() {
        return this.x == 0 && this.y == 0;
    }

    /**
     * @desc calculates the squared magnitude
     * @return {number}
     */
    get length2() {
        if (this.isZero) {
            return 0;
        }
        return this.x * this.x + this.y * this.y;
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

    /**
     * @desc calculates the angle (in radians)
     * @return {number}
     */
    get angle() {
        if (this.isZero) {
            return undefined;
        }
        return Math.atan2(this.y, this.x);
    }

    /**
     * @desc normalize a vector to a given magnitude
     * @param {?(number|vec2)} v - a scalar or a vector. if a vector is passed, the vector's magnitude is applied
     */
    set length(v) {
        if (v instanceof vec2) {
            v = v.length;
        }
        if (typeof v === "number") {
            if (!this.isZero) {
                let len = v / this.length;
                this.x *= len;
                this.y *= len;
            }
        }
    }

    /**
     * @desc scales the magnitude
     * @param {?(number|vec2)} v - a scalar or a vector. if a vector is passed, the vector's magnitude is applied. 
     * @return {vec2}
     */
    scale(v) {
        if (v instanceof vec2) {
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
     * @return {vec2}
     */
    normalize() {
        this.length = 1;
        return this;
    }

    /**
     * @desc rotates the vector
     * @param {?(number|vec2)} v - angle in radians or a direction vector 
     * @return {vec2}
     */
    rotate(v) {
        let len = this.length;
        if (v instanceof vec2) {
            if (!this.isZero) {
                let dir = v.direction;
                this.x = len * dir.x;
                this.y = len * dir.y;
            }
        } else if (typeof v === "number") {
            this.x = len * Math.cos(v);
            this.y = len * Math.sin(v);
        }
        return this;
    }

    /**
     * @desc negates a vector
     * @return {vec2}
     */
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    /**
     * @desc compares vectors and applies a function component-wise.
     * @param {(number|Object)} b - a scalar or a vector to be compared. 
     * @param {function(a: number, b: number): number} fn - a function applied to the components 
     * @return {vec2}
     */
    compare(b, fn) {
        if (typeof fn === "function") {
            if (b instanceof vec2) {
                this.x = fn(this.x, b.x);
                this.y = fn(this.y, b.y);
            } else if (typeof b === "number") {
                this.x = fn(this.x, b);
                this.y = fn(this.y, b);
            }
        }
        return this;
    }

    /**
     * @desc two vectors and applies a function component-wise
     * @param {?(vec2|number)} a - a scalar or a vector
     * @param {?(vec2|number)} b - a scalar or a vector 
     * @param {vec2~compare} fn - a function applied to the components 
     * @return {vec2}
     */

    /**
     * @callback vec2~compare
     * @param {number} a  
     * @param {number} b
     */
    static compare(a, b, fn) {
        return new vec2(a).compare(b, fn);
    }

    /**
     * @desc adds a vector/scalar component-wise
     * @param {?(vec2|number)} v - a scalar or a vector
     * @return {vec2}
     */
    add(v) {
        return this.compare(v, add);
    }

    /**
     * @desc subtracts a vector/scalar component-wise
     * @param {?(vec2|number)} v - a scalar or a vector
     * @return {vec2}
     */
    sub(v) {
        return this.compare(v, sub);
    }

    /**
     * @desc multiplies a vector/scalar component-wise
     * @param {?(vec2|number)} v - a scalar or a vector
     * @return {vec2}
     */
    mul(v) {
        return this.compare(v, mul);
    }

    /**
     * @desc divides a vector/scalar component-wise. returns a zero-vector if the divisor is a zero vector.
     * @param {?(vec2|number)} v - a scalar or a vector
     * @return {vec2}
     */
    div(v) {
        if ((v instanceof vec2 && v.isZero) || (typeof v === "number" && v == 0)) {
            return new vec2(0, 0);
        }
        return this.compare(v, div);
    }

    /**
     * @desc a min vector (min value component-wise)
     * @param {?(number|vec2)} a - a scalar or a vector
     * @param {?(number|vec2)} b - a scalar or a vector
     * @return {vec2}
     */
    static min(a, b) {
        return vec2.compare(a, b, Math.min);
    }

    /**
     * @desc a max vector (max value component-wise)
     * @param {?(number|vec2)} a - a scalar or a vector
     * @param {?(number|vec2)} b - a scalar or a vector
     * @return {vec2}
     */
    static max(a, b) {
        return vec2.compare(a, b, Math.max);
    }

    /**
     * @desc a clamp vector (clamps value component-wise between 3 vectors/scalar)
     * @param {?(number|vec2)} a - a scalar or a vector
     * @param {?(number|vec2)} b - a scalar or a vector
     * @param {?(number|vec2)} c - a scalar or a vector
     * @return {vec2} 
     */
    static clamp(a, b, c) {
        return vec2.max(a, vec2.min(b, c));
    }

    /**
     * @desc calculates vector dot product
     * @param {?(vec2)} v 
     * @return {number}
     */
    dot(v) {
        if (v instanceof vec2) {
            return this.x * v.x + this.y * v.y;
        }
        return 0;
    }

    /**
     * @desc gets the direction vector
     * @return {vec2}
     */
    get direction() {
        return this.clone().normalize();
    }

    /**
     * @desc calculates the sum vector between two vectors (adds component-wise)
     * @param {?(number|vec2)} v1 - a scalar or a vector
     * @param {?(number|vec2)} v2 - a scalar or a vector
     * @return {vec2}
     */
    static sum(v1, v2) {
        if (v1 instanceof vec2) {
            return v1.clone().add(v2);
        } else if (v2 instanceof v1) {
            return v2.clone().add(v1);
        }
        return new vec2(0, 0);
    }

    /**
     * @desc calculates the difference vector between two vectors (subtracts component-wise)
     * @param {?(number|vec2)} v1 - a scalar or a vector
     * @param {?(number|vec2)} v2 - a scalar or a vector
     * @return {vec2}
     */
    static diff(v1, v2) {
        if (v1 instanceof vec2) {
            return v1.clone().sub(v2);
        } else if (v2 instanceof v1) {
            return v2.clone().sub(v1);
        }
        return new vec2(0, 0);
    }

    /**
     * @desc calculates the product vector between two vectors (multiplies component-wise)
     * @param {?(number|vec2)} v1 - a scalar or a vector
     * @param {?(number|vec2)} v2 - a scalar or a vector
     * @return {vec2}
     */
    static prod(v1, v2) {
        if (v1 instanceof vec2) {
            return v1.clone().mul(v2);
        } else if (v2 instanceof v1) {
            return v2.clone().mul(v1);
        }
        return new vec2(0, 0);
    }

    /**
     * @desc calculates the quotient vector between two vectors (divides component-wise)
     * @param {?(number|vec2)} v1 - a scalar or a vector
     * @param {?(number|vec2)} v2 - a scalar or a vector
     * @return {vec2}
     */
    static quot(v1, v2) {
        if (v1 instanceof vec2) {
            return v1.clone().div(v2);
        } else if (v2 instanceof v1) {
            return v2.clone().div(v1);
        }
        return new vec2(0, 0);
    }

    /**
     * @desc calculates linear interpolation between vectors (component-wise)
     * @param {?(number|vec2)} v1 - a scalar or a vector
     * @param {?(number|vec2)} v2 - a scalar or a vector
     * @param {?(number|vec2)} t - weight or time; can be a scalar or a vector
     * @return {vec2}
     */
    static mix(v1, v2, t) {
        /**
         * return v1 + (v2 - v1)*t
         */
        return vec2.sum(v1, vec2.diff(v2, v1).mul(t));
    }

    /**
     * @desc calculates linear interpolation to a vector (component-wise)
     * @param {?(number|vec2)} v - a scalar or a vector
     * @return {vec2}
     */
    mix(v, t) {
        return vec2.mix(this, v, t);
    }

    /**
     * @desc calculates smoothstep between vectors (component-wise)
     * @see https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/smoothstep.xhtml
     * @param {?(number|vec2)} v1 - a scalar or a vector
     * @param {?(number|vec2)} v2 - a scalar or a vector
     * @return {vec2}
     */
    static smoothstep(v1, v2, t) {
        /**
         * t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
         *   return t * t * (3.0 - 2.0 * t);
         */
        let k = vec2.clamp(vec2.diff(t, v1).div(vec2.diff(v2, v1)), 0, 1);
        return vec2.prod(vec2.prod(k, k), vec2.prod(k, 2).negate().sub(3));
    }

    smoothstep(v2, t) {
        return vec2.smoothstep(this, v2, t);
    }

    /**
     * @desc calculates the reflect vector from incident vector and normal vector
     * @see https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/reflect.xhtml
     * @param {!(vec2)} i - incident vector 
     * @param {!(vec2)} n -  normal vector
     * @returns {vec2}
     */
    static reflect(i, n) {
        if (i instanceof vec2 && n instanceof vec2) {
            let nclone = n.direction;
            /**
             * I - 2.0 * dot(N, I) * N.
             */
            return vec2.diff(i, nclone.mul(nclone.dot(i)).mul(2));
        }
        return new vec2(0, 0);
    }

    /**
     * @desc calculates the reflect vector from incident vector and normal vector
     * @see https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/reflect.xhtml
     * @param {vec2} n -  normal vector
     * @return {vec2}
     */
    reflect(n) {
        return vec2.reflect(this, n);
    }

    /**
     * @desc calculates the refraction vector
     * @see https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/refract.xhtml
     * @param {vec2} i - incident vector
     * @param {vec2} n - normal vector
     * @param {number} eta - ratio of indices of refraction
     * @return {vec2}
     */
    static refract(i, n, eta) {
        if (i instanceof vec2 && n instanceof vec2 && typeof eta === "number") {
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
        return new vec2(0, 0);
    }

    /**
     * @desc calculates the refraction vector
     * @see https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/refract.xhtml
     * @param {vec2} n - normal vector
     * @param {number} eta - ratio of indices of refraction
     * @return {vec2}
     */
    refract(n, eta) {
        return vec2.refract(this, n, eta);
    }

    /**
     * @desc calculates the orthogonal projection vector
     * @see https://en.wikipedia.org/wiki/Vector_projection
     * @param {vec2} v - the vector component
     */
    projection(v) {
        if (v instanceof vec2 && !v.isZero) {
            let vclone = v.direction;
            return vclone.mul(this.dot(vclone));
        }
        return new vec2();
    }

    /**
     * @desc calculates the orthogonal rejection vector
     * @see https://en.wikipedia.org/wiki/Vector_projection
     * @param {vec2} v - the vector component
     */
    rejection(v) {
        if (v instanceof vec2 && !v.isZero) {
            return vec2.diff(this, this.projection(v));
        }
        return new vec2();
    }

    /**
     * @desc calculates the angle (in radians) towards a vector
     * @param {vec2} v 
     * @return {number}
     */
    angleTo(v) {
        if (v instanceof vec2) {
            if (v.isZero && this.isZero) {
                return undefined;
            }
            return Math.atan2(v.y - this.y, v.x - this.x);
        }
        return 0;
    }

    /**
     * @desc calculates the direction vector towards a vector
     * @param {vec2} v 
     * @return {number}
     */
    directionTo(v) {
        if (v instanceof vec2) {
            if (v.isZero && this.isZero) {
                return new vec2(0, 0);
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

    /**
     * @desc calculates the distance between two vectors
     * @param {vec2} v 
     * @return {number}
     */
    distance(v) {
        if (v instanceof vec2) {
            if (this.isZero && v.isZero) {
                return 0;
            }
            return Math.sqrt(this.distance2(v));
        }
        return 0;
    }

    /**
     * @desc rotate a vector on a vector
     * @param {vec2} v 
     * @param {?(number|vec2)} rad 
     */
    rotateOn(v, rad) {
        let len = this.length / v.length;
        return this.assign(v).rotate(rad).scale(len);
    }

    /**
     * @desc applies equality comparison between vectors component-wise
     * @param {vec2} v
     * @return {boolean} 
     */
    equalsComp(v) {
        if (v instanceof vec2) {
            return this.x === v.x && this.y === v.y;
        }
        return false;
    }

    /**
     * @desc applies less-than comparison between vectors component-wise
     * @param {vec2} v
     * @return {boolean} 
     */
    lessThanComp(v) {
        if (v instanceof vec2) {
            return this.x < v.y && this.y < v.y;
        }
        return false;
    }

    /**
     * @desc applies equality comparison between vectors magnitude-wise
     * @param {vec2} v
     * @return {boolean} 
     */
    equals(v) {
        if (v instanceof vec2) {
            return v.length2 === this.length2;
        } else if (typeof v === "number") {
            return this.length === v;
        }
        return false;
    }

    /**
     * @desc applies less-than comparison between vectors magnitude-wise
     * @param {vec2} v
     * @return {boolean} 
     */
    lessThan(v) {
        if (v instanceof vec2) {
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
        return [this.x, this.y];
    }

}