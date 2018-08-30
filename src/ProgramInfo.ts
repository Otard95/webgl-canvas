export class ProgramInfo {
  public attribLocations: {
    vertexPosition: number;
  };
  public uniformLocations: {
    projectionMatrix: number;
    modelViewMatrix: number;
  };
  
  constructor (vertex_pos: number, projection_matrix: number, model_view_matrix: number) {
    
    this.attribLocations = { vertexPosition: vertex_pos };
    this.uniformLocations = {
      modelViewMatrix: model_view_matrix,
      projectionMatrix: projection_matrix,
    };
    
  }
  
}
