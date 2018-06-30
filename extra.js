const isScalar = n => typeof n === "number";
const isArray = a => (!!a) && (a.constructor === Array);
const isObject = o => (!!o) && (o.constructor === Object);
const isArrayVec2 = a => isArray(a) ? isScalar(a[0]) && isScalar(a[1]) : false;
const isArrayVec3 = a => isArrayVec2(a) ? (isScalar(a[2])) : false;
const isArrayvec4 = a => isArrayVec3(a) ? (isScalar(a[3])) : false;
const isObjectVec2 = o => isObject(o) ? isScalar(a.x) && isScalar(a.y) : false;
const isObjectVec3 = o => isObjectVec2(o) ? isScalar(a.z) : false;
const isObjectVec4 = o => isObjectVec3(o) ? isScalar(a.w) : false;

const negate = vec => {
    if (isArray(vec)) {
        let arrc = isArrayVec2(vec);
        if (!arrc) return;
        vec[0] = arrc ? -x : vec[0];
        vec[1] = arrc ? -y : vec[1];
        vec[2] = (isArrayVec3(vec)) ? -z : vec[2];
        vec[3] = (isArrayVec4(vec)) ? -w : vec[3];
    }
    if (isObject(vec)) {
        let objc = isObjectVec2(vec);
        if (!objc) return;
        vec.x = objc ? -x : vec.x;
        vec.y = objc ? -y : vec.y;
        vec.z = isObjectVec3(vec) ? -z : vec.z;
        vec.w = isObjectVec4(vec) ? -w : vec.w;
    }
}

const addVec2 = (v1, v2) => {
    let av1 = isArray(v1);
    let av2 = isArray(v2);
    let ov1 = isObject(v1);
    let ov2 = isObject(v2);
    let sv1 = isScalar(v1);
    let sv2 = isScalar(v2);

    if (av1) {
        if (av2) {
            return [v1[0] + v2[0], v1[1] + v2[1]];
        } else if (ov2) {
            return [v1[0] + v2.x, v1[1] + v2.y];
        } else if (sv2) {
            return [v1[0] + v2, v1[1] + v2];
        }
    } else if (ov1) {
        if (av2) {
            return { x: v1.x + v2[0], y: v1.y + v2[1] };
        } else if (ov2) {
            return { x: v1.x + v2.x, y: v1.y + v2.y };
        } else if (sv2) {
            return { x: v1.x + v2, y: v1.y + v2 };
        }
    } else if (sv1) {
        if (av2) {
            return [v1 + v2[0], v1 + v2[1]];
        } else if (ov2) {
            return { x: v1 + v2.x, y: v1 + v2.y };
        }
    }
    return null;
}

const addVec3 = (v1, v2) => {
    let nv = addVec2(v1, v2);
    if (nv !== null) {
        let av1 = isArray(v1);
        let av2 = isArray(v2);
        let ov1 = isObject(v1);
        let ov2 = isObject(v2);
        let sv1 = isScalar(v1);
        let sv2 = isScalar(v2);

        if (av1) {
            if (av2) {
                nv[2] = v1[2] + v2[2];
                return nv;
            } else if (ov2) {
                nv[2] = v1[2] + v2.z;
                return nv;
            } else if (sv2) {
                nv[2] = v1[2] + v2;
                return nv;
            }
        } else if (ov1) {
            if (av2) {
                nv.z = v1.z + v2[2];
                return nv;
            } else if (ov2) {
                return { x: v1.x + v2.x, y: v1.y + v2.y };
            } else if (sv2) {
                return { x: v1.x + v2, y: v1.y + v2 };
            }
        } else if (sv1) {
            if (av2) {
                return [v1 + v2[0], v1 + v2[1]];
            } else if (ov2) {
                return { x: v1 + v2.x, y: v1 + v2.y };
            }
        }
    }
    return nv;
}