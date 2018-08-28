import {Utils} from './Utils';

export class Shader {
  
  gl_shader_type: number;
  shader_type: string;
  file_name: string | null;
  src: string | null;
  gl_shader: WebGLShader | null;
  
  constructor(file_or_src: string, shader_type: number = -1) {
    
    this.gl_shader = null;
    this.gl_shader_type = shader_type;
    this.shader_type = 'Unknown';
    
    // Test what `file_or_src` is
    if (/.+\.(?:vs|fs)/.test(file_or_src)) { // is file
      this.file_name = file_or_src;
      this.src = null;
    } else { // its src
      this.src = file_or_src;
      this.file_name = null;
    }
    
    if (this.file_name != null) {
      
      // get file extention to attribute shader type
      let ext = Utils.get_file_ext(this.file_name);
      if (ext == null) throw `Invalid file extention: .${ext}`;
      if (ext == 'vs'){
        this.gl_shader_type = WebGLRenderingContext.VERTEX_SHADER;
        this.shader_type = 'VERTEX_SHADER';
      } else {
        this.gl_shader_type = WebGLRenderingContext.FRAGMENT_SHADER;
        this.shader_type = 'FRAGMENT_SHADER';
      }
      
    }
    
  }
  
  async init(gl: WebGLRenderingContext): Promise<void> {
    
    if (!this.src && !this.file_name) 
      throw 'File name and shader source is `null` | Unknown error';
      
    if (this.file_name)
      this.src = await Utils.fetch_file_text(this.file_name);
      
    this.load_shader(gl);
    
  }
  
  private load_shader(gl: WebGLRenderingContext): void {
    
    if (!this.src) throw `Shader source is not available!`;
    
    let shader = gl.createShader(this.gl_shader_type);
  
    // Send the source to the shader object
    gl.shaderSource(shader, this.src);
  
    // Compile the shader program
    gl.compileShader(shader);
  
    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      let shader_info = gl.getShaderInfoLog(shader)
      gl.deleteShader(shader);
      throw `An error occurred compiling the shader: ${shader_info}`;
    }
    
    this.gl_shader = shader;
    
  }
  
  toString(): string {
    
    return `{\n  file: ${this.file_name},\n  type: ${this.shader_type},\n  src: \n    ${this.src}\n}`;
    
  }
  
}
