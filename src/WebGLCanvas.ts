import { ProgramInfo } from './ProgramInfo';
import { Shader } from './Shader';

export class WebGLCanvas {

  private gl: WebGLRenderingContext;
  private canvas: HTMLCanvasElement;
  private shaderProgram: WebGLProgram | null;
  private shaders: Shader[];
  private program_info: ProgramInfo | null;

  private width: number;
  private height: number;
  
  constructor(width: number, height: number) {

    this.program_info = null;
    this.shaderProgram = null;
    this.shaders = [];
    
    this.width = width;
    this.height = height;

    this.canvas = this.create_canvas();
    this.gl = this.init_gl_context();

  }
  
  public add_shaders(...files: string[]) {
    
    console.log(`Adding ${ files.length } shader${ files.length > 1 ? "'s" : '' }...`);
    files.forEach((file) => {
      this.shaders.push(new Shader(file));
      console.log(`Added shader from file \`${file}\``);
    });

  }
  
  public initilize_shader_program(): void {

    const tmp_prog: WebGLProgram | null = this.gl.createProgram();
    if (tmp_prog == null) {
      throw new Error(`Unable to create the shader program`);
    } else {
      this.shaderProgram = tmp_prog;
    }
    

    this.shaders.forEach((shader: Shader) => {
      this.gl.attachShader(this.shaderProgram, shader.gl_shader);
    });
    this.gl.linkProgram(this.shaderProgram);
    
    if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
      throw new Error(`Unable to initialize the shader program:\n
      ${this.gl.getProgramInfoLog(this.shaderProgram)}`);
    }
    
    /**
     * gl.getAttribLocation(shaderProgram, 'aVertexPosition')
     * gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
     * gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    */
    this.program_info = new ProgramInfo(
      this.gl.getAttribLocation(this.shaderProgram, 'aVertexPosition'),
      this.gl.getAttribLocation(this.shaderProgram, 'uProjectionMatrix'),
      this.gl.getAttribLocation(this.shaderProgram, 'uModelViewMatrix'),
    );
    
    console.log(`Shader program initilized and linked.`);
    
  }
  
  public clear() {

    // Set clear color
    this.gl.clearColor(.2, .2, .2, 1);
    // And klear the background
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    
  }
  
  public load_shaders(): void {
    
    this.shaders.forEach((shader: Shader) => {
      shader.init(this.gl)
      .then(() => {
        console.log(`Shader loaded and ready: ${shader.toString()}`);
      })
      .catch((err) => {
        console.error(`A shader failed to load:\n`, err);
      });
    });
    
  }
  
  private create_canvas(): HTMLCanvasElement {
    
    // Setup canvas
    const canvas = document.createElement('canvas');
    canvas.setAttribute('height', this.height.toString());
    canvas.setAttribute('width', this.width.toString());

    // Appen canvas to body
    document.body.appendChild(canvas);
    
    console.log(`Canvas created and added to body.`);

    return canvas;

  }

  private init_gl_context(): WebGLRenderingContext {
    
    // get WebGL context
    const gl = this.canvas.getContext("webgl");

    // make sure we got the contet
    if (!gl) {
      throw new Error('Unable to initialize WebGL. Your browser or machine may not support it.');
    } else {
      console.log(`Successfully acquired WebGl Render Context,`);
      return gl;
    }

  }

}