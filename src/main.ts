
import {WebGLCanvas} from './WebGLCanvas'

(() => {
  
  let gl_canvas: WebGLCanvas;
  
  window.addEventListener('DOMContentLoaded', () => {
    gl_canvas = new WebGLCanvas(800, 600);
    gl_canvas.clear();
    
    gl_canvas.add_shaders(
      'shaders/vertex_shader.vs',
      'shaders/fragment_shader.fs');
    
    gl_canvas.load_shaders();
    
    console.log(gl_canvas);
    
    // gl_canvas.initilize_shader_program();
    
    setTimeout(() => {
      gl_canvas.initilize_shader_program();
    }, 1000);
    
  });
  
})();
