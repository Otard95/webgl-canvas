
import { Utils } from './Utils';
import { WebGLCanvas } from './WebGLCanvas';

(() => {
  
  let gl_canvas: WebGLCanvas;
  
  window.addEventListener('DOMContentLoaded', init_gl_canvas);
  
  function init_gl_canvas () {
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

      gl_canvas.init_buffers();
      
      render_square();

    }, 1000);
    
  }
  
  function render_square () {
    
    Utils.fetch_file_text('objects/square.json')
    .then(JSON.parse)
    .then((square: number[]) => {
      gl_canvas.render_shape(square);
    })
    .catch(console.error);
    
  }
  
})();
