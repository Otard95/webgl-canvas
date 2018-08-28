import {Shader} from './Shader';

export class WebGLCanvas {

  gl: WebGLRenderingContext;
  canvas: HTMLCanvasElement;
  shaderProgram: WebGLProgram | null;
  shaders: Shader[];

  width: number;
  height: number;
  
  constructor(width: number, height: number) {

    this.shaderProgram = null;
    this.shaders = [];
    
    this.width = width;
    this.height = height;

    this.canvas = this.create_canvas();
    this.gl = this.init_gl_context();

  }

  private create_canvas(): HTMLCanvasElement {
    
    // Setup canvas
    let canvas = document.createElement('canvas');
    canvas.setAttribute('height', this.height.toString());
    canvas.setAttribute('width', this.width.toString());

    // Appen canvas to body
    document.body.appendChild(canvas);
    
    console.log(`Canvas created and added to body.`);

    return canvas;

  }

  private init_gl_context(): WebGLRenderingContext {
    
    // get WebGL context
    let gl = this.canvas.getContext("webgl");

    // make sure we got the contet
    if (!gl) {
      throw 'Unable to initialize WebGL. Your browser or machine may not support it.';
    } else {
      console.log(`Successfully acquired WebGl Render Context,`);
      return gl;
    }

  }

  add_shaders(...files: string[]) {
    
    console.log(`Adding ${ files.length } shader${ files.length > 1 ? "'s" : '' }...`);
    files.forEach(file => {
        this.shaders.push(new Shader(file));
      console.log(`Added shader from file \`${file}\``);
    });

  }
  
  load_shaders(): void {
    
    this.shaders.forEach(shader => {
      shader.init(this.gl)
      .then(() => {
        console.log(`Shader loaded and ready: ${shader.toString()}`);
      })
      .catch(err => {
        console.error(`A shader failed to load:\n`, err);
      })
    })
    
  }
  
  initilize_shader_program(): void {

    let tmp_prog: WebGLProgram | null = this.gl.createProgram();
    if (tmp_prog == null)
      throw `Unable to create the shader program`;
    
    this.shaderProgram = tmp_prog;

    this.shaders.forEach(shader => {
      this.gl.attachShader(this.shaderProgram, shader.gl_shader);
    })
    this.gl.linkProgram(this.shaderProgram);
    
    if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
      throw `Unable to initialize the shader program:\n
      ${this.gl.getProgramInfoLog(this.shaderProgram)}`;
    }
    
    console.log(`Shader program initilized and linked.`);
    
  }
  
  clear() {

    // Set clear color
    this.gl.clearColor(.2, .2, .2, 1);
    // And klear the background
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    
  }

}