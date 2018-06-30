import { vec2, vec3, vec4 } from "./vector.js";

{
    let v1 = new vec2(1, 2);
    let v2 = new vec2(3, 4);
    let v3 = new vec3(v1, 3);
    let v4 = new vec3(0, v1);
    let v5 = new vec4(v3, 4);
    let v6 = new vec4(-1, v4);
    let v7 = new vec4(v1, v2);

    console.log(v1);
    console.log(v2);
    console.log(v3);
    console.log(v4);
    console.log(v5);
    console.log(v6);
    console.log(v7);

    console.log(v1.toArray());
    console.log(v1.equals(v1));
}