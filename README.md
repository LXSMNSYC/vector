# vector (in development)
Vector Math for ES6.
### Table of Contents
### Description
### Installation
### Usage
#### Importing
#### Example
#### Overloading
#### Chaining
### API
#### vec2
##### The vec2 constructor has 4 overloads:
```js
let v = new vec2(x, y); // x and y are coordinates
let v = new vec2(vector); // copies the passed vector's coordinates
let v = new vec2(value); // value is assigned to both x and y properties
let v = new vec2(); // creates a zero vector
```
##### vec2 getters
```js
v.isZero; // checks if the vector is a zero vector
v.length2; // gets the squared magnitude/length of the vector.
v.length; // gets the magnitude/length of the vector.
v.angle; // gets the angle (in radians)
```
##### vec2 setters
```js
v.length = value; //sets the magnitude/length of the vector
v.scale = factor; //scales(multiplies) the magnitude of the vector.
```
##### vec2 operations
```js
v.negate(); // negates (flips) a vector
v.add(v2); // adds v2 to v
v.add(value); // adds value to v (both x and y)
v.sub(v2); // subtracts v2 to v
v.sub(value); // subtracts value to v (both x and y)
v.mul(v2); // multiplies v2 to v
v.mul(value); // multiplies value to v
v.div(v2); // divides v by v2
v.div(value); // divides v by value
v.dot(v2); // dot product of a vector
```

##### vec2 factory
the following methods produces a new vector
```js
v.mix(v2, t); // applies the mix (lerp) method. 
v.direction(); // gets the direction/unit vector. This is similar to the normalize method, but this extracts the unit vector.
vec2.sum(v1, v2); // adds to vectors and produces a sum vector.
vec2.sum(v1, value);
vec2.sum(value, v2);
vec2.diff(v1, v2); // difference vector
vec2.diff(v1, value);
vec2.diff(value, v2);
vec2.prod(v1, v2); // product vector
vec2.prod(v1, value);
vec2.prod(value, v2);
vec2.quot(v1, v2); // quotient vector
vec2.quot(v1, value); // v1.x/value, v1.y/value
vec2.quot(value, v2); // value/v2.x, value/v2.y
v.clone(); // clones vector
```
##### other vec2 methods
```js
v.angleTo(v2); // the angle from a vector to another vector (in radians).
v.directionTo(v2); // gets the direction vector (normalized difference) from v towards v2;
v.distance2(v2); // squared distance between two vectors.
v.distance(v2); // distance between two vectors.
v.rotateOn(v, rad); // moves vector to another vector and rotates on that coordinates. rad can be radians or a direction vector.
v.assign(v2); // assign v2's value to v
v.equals(v2); // equality comparison of two vectors
v.toArray(); // returns the Array representation of vector v
```
