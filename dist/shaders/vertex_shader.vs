attribute vec4 aVertexPosition;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionsViewMatrix;

void main () {
  gl_Position = uProjectionsViewMatrix * uModelViewMatrix * aVertexPosition;
}