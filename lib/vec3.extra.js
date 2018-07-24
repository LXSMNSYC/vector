
let ARRAY_TYPE = typeof Float32Array !== undefined ? Float32Array : Array;
let isScalar = n => typeof n === "number";
let isArray = a => (!!a) && (a.constructor === ARRAY_TYPE);

/**
 * Creates a new vector
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} z 
 * @returns {vec3}
 */
const create = (x, y, z) => isScalar(x) && isScalar(y) && isScalar(z) ? new ARRAY_TYPE([x, y, z]) : undefined;

/**
 * Returns a zero vector
 * @returns {vec3} 
 */
const zero = ()=> create(0, 0, 0);

/**
 * Clones a vector
 * @param {vec3} a 
 * @returns {vec3} 
 */
const clone = a => isArray(a) ? create(a[0], a[1], a[2]) : zero();

/**
 * Converts spherical coordinates to vector
 * @param {Number} r - radius
 * @param {Number} t - theta or azimuthal angle
 * @param {Number} p - phi
 * @returns {vec3}
 */
const fromSpherical = (r, t, p) => isScalar(r) && isScalar(theta) && isScalar(phi) ? create(r*Math.sin(p)*Math.cos(t), r*Math.sin(p)*Math.sin(t), r*Math.sin(p)) : undefined;

/**
 * Converts an angle (radians) to a unit vector
 * @param {Number} t - theta 
 * @param {Number} p - phi
 * @returns {vec3} 
 */
const fromAngles = (t, p) => fromSpherical(1, t, p);

/**
 * Generates a random unit vector
 * @returns {vec3} 
 */
const random = () => fromAngles(-Math.PI + Math.random()*Math.PI*2, -Math.PI + Math.random()*Math.PI*2);

/**
 * Checks if a vector is a zero vector
 * @param {vec3} a 
 * @returns {Boolean} 
 */
const isZero = a => isArray(a) ? a[0] === 0 && a[1] === 0 && a[2] === 0 : false;

/**
 * Calculates the squared length of a vector
 * @param {vec3} a 
 * @returns {number} 
 */
const length2 = a => !isZero(a) ? (a[0]*a[0] + a[1]*a[1] + a[2]*a[2]) : 0;

/**
 * Calculates the length of a vector
 * @param {vec3} a 
 * @returns {number} 
 */
const length = a => !isZero(a) ? Math.sqrt(length2(a)) : 0;

/**
 * Calculates the phi angle (radians) of a vector with z as reference axis
 * @param {vec3} a 
 * @returns {number} 
 */
const phiZ = a => !isZero(a) ? Math.acos(a[2]/this.length) : undefined;


/**
 * Calculates the phi angle (radians) of a vector with y as reference axis
 * @param {vec3} a 
 * @returns {number} 
 */
const phiY = a => !isZero(a) ? Math.acos(a[1]/this.length) : undefined;


/**
 * Calculates the phi angle (radians) of a vector with x as reference axis
 * @param {vec3} a 
 * @returns {number} 
 */
const phiX = a => !isZero(a) ? Math.acos(a[0]/this.length) : undefined;

/**
 * Sets the length of a vector
 * @param {vec3} a 
 * @param {(vec3 | number)} b - if a vector is passed, the length of the vector is applied. 
 */
const setLength = (a, b) => {
    if(isArray(a)){
        if(!isZero(a)){
            let len = (isArray(b) ? length(b) : isScalar(b) ? b : 0) / length(a);
            a[0] *= len;
            a[1] *= len;
            a[2] *= len;
        }
        return a;
    }
};

/**
 * Sets the length of a vector into 1 (unit vector).
 * @param {vec3} a 
 */
const normalize = a => setLength(a, 1);

/**
 * Scales a vector's length
 * @param {vec3} a 
 */
const scale = a => setLength(a, length(a));

/**
 * Gets the unit vector from a vector
 * @param {vec3} a
 * @returns {vec3} 
 */
const unit = a => normalize(clone(a));



/**
 * Compares two vectors component-wise by applying a function that declares the first vector's values 
 * @param {vec2} a 
 * @param {(vec2 | number)}  b 
 * @param {Function} fn - a function that compares two values from two vectors. Must return a value.
 */
const compare = (a, b, fn) => {
    if(isArray(a)){
        if(isArray(b)){
            a[0] = fn(a[0], b[0]);
            a[1] = fn(a[1], b[1]);
            a[2] = fn(a[2], b[2]);
        }
        else if(isScalar(b)){
            a[0] = fn(a[0], b);
            a[1] = fn(a[1], b);
            a[2] = fn(a[2], b);
        }
    }
    return a;
};

/**
 * Compares two vectors component-wise by applying a function. Returns a resultant vector.
 * @param {vec2} a 
 * @param {(vec2 | number)} b 
 * @param {Function} fn - a function that compares two values from two vectors. Must return a value.
 * @returns {vec2}
 */
const comparison = (a, b, fn) => {
    let c = [0, 0];
    if(isArray(a)){
        if(isArray(b)){
            c[0] = fn(a[0], b[0]);
            c[1] = fn(a[1], b[1]);
            c[2] = fn(a[2], b[2]);
        }
        else if(isScalar(b)){
            c[0] = fn(a[0], b);
            c[1] = fn(a[1], b);
            c[2] = fn(a[2], b);
        }
    }
    else if(isArray(b) && isScalar(a)){
        c[0] = fn(a, b[0]);
        c[1] = fn(a, b[1]);
        c[2] = fn(a, b[2]);
    }
    return c;
};

const vAssign = (a, b) => b;

/**
 * Assigns a vector's value from another vector
 * @param {vec3} a 
 * @param {(vec3 | number)} b 
 */
const assign = (a, b) => compare(a, b, vAssign);

const vAdd = (a, b) => a + b;
const vSub = (a, b) => a - b;
const vMul = (a, b) => a * b;
const vDiv = (a, b) => a / b;

/**
 * Adds two vectors
 * @param {vec3} a 
 * @param {vec3 | number} b 
 */
const add = (a, b) => compare(a, b, vAdd);

/**
 * Subtracts two vectors
 * @param {vec3} a 
 * @param {vec3 | number} b 
 */
const sub = (a, b) => compare(a, b, vSub);

/**
 * Multiplies two vectors
 * @param {vec3} a 
 * @param {vec3 | number} b - can be a vector or a scalar.
 */
const mul = (a, b) => compare(a, b, vMul);

/**
 * Divides two vectors
 * @param {vec3} a 
 * @param {vec3 | number} b - can be a vector or a scalar.
 */
const div = (a, b) => compare(a, b, vDiv);

/**
 * Produces sum of two vectors
 * @param {vec3} a 
 * @param {vec3 | number} b - can be a vector or a scalar. 
 * @returns {vec3}
 */
const sum = (a, b) => comparison(a, b, vAdd);

/**
 * Produces difference of two vectors
 * @param {vec3} a 
 * @param {vec3 | number} b  - can be a vector or a scalar.
 * @returns {vec3}
 */
const diff = (a, b) => comparison(a, b, vSub);

/**
 * Produces product of two vectors
 * @param {vec3} a 
 * @param {vec3 | number} b - can be a vector or a scalar.
 * @returns {vec3}
 */
const prod = (a, b) => comparison(a, b, vMul);

/**
 * Produces quotient of two vectors
 * @param {vec3} a 
 * @param {vec3 | number} b 
 * @returns {vec3}
 */
const quot = (a, b) => comparison(a, b, vDiv);

/**
 * Negates a vector
 * @param {vec3} a 
 */
const negate = (a) => {
    if(isArray(a)){
        a[0] = -a[0];
        a[1] = -a[1];
        a[2] = -a[2];
    }
    return a;
};

/**
 * Calculates dot product of two vectors
 * @param {vec3} a 
 * @param {vec3} b
 * @returns {Number}
 */
const dot = (a, b) => isArray(a) && isArray(b) ? a[0]*b[0] + a[1]*b[1] + a[2]*b[2] : 0;

/**
 * Applies Math.min component-wise
 * @param {vec3} a 
 * @param {(vec3|Number)} b 
 * @returns {vec3}
 */
const min = (a, b) => comparison(a, b, Math.min);

/**
 * Applies Math.max component-wise
 * @param {vec3} a 
 * @param {(vec3|Number)} b  
 * @returns {vevec3c2}
 */
const max = (a, b) => comparison(a, b, Math.max);

/**
 * Clamps value component-wise between 3 vectors
 * @param {vec3} a 
 * @param {(vec3|Number)} b 
 * @param {(vec3|Number)} c  
 * @returns {vec3}
 */
const clamp = (a, b, c) => min(max(a, b), c);

/**
 * Applies linear interpolation component-wise
 * @param {vec3} a 
 * @param {(vec3|Number)} b 
 * @param {(vec3|Number)} t  
 * @returns {vec3}
 */
const mix = (a, b, t) => sum(a, mul(diff(b, a), t));

/**
 * Calculates the vector projection
 * @param {vec3} a 
 * @param {vec3} b  
 * @returns {vec3}
 */
const projection = (a, b) => mul(unit(b), dot(a, unit(b)));

/**
 * Calculates the vector rejection
 * @param {vec3} a 
 * @param {vec3} b 
 * @returns {vec3}
 */
const rejection = (a, b) => diff(a, projection(a, b));

/**
 * Calculates the squared distance between two vectors
 * @param {vec3} a 
 * @param {vec3} b  
 * @returns {Number}
 */
const distance2 = (a, b) => isArray(a) && isArray(b) ? (b[0] - a[0])*(b[0] - a[0]) + (b[1] - a[1])*(b[1] - a[1]) + (b[2] - a[2])*(b[2] - a[2]) : 0;

/**
 * Calculates the distance between two vectors
 * @param {vec3} a 
 * @param {vec3} b  
 * @returns {Number}
 */
const distance = (a, b) => Math.sqrt(distance2(a, b));

export {
    clone,
    zero,
    fromSpherical,
    fromAngles,
    random,
    isZero,
    length,
    length2,
    phiX,
    phiY,
    phiZ,
    setLength,
    normalize,
    scale,
    unit,
    compare,
    assign,
    negate,
    add,
    sub,
    mul,
    div,
    sum,
    diff,
    prod,
    quot,
    min,
    max,
    clamp,
    mix,
    projection,
    rejection,
    distance2,
    distance
};


