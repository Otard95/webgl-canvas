
export class Status {
  
  /**
   * Simple status class using binary flags.
   * 
   * FLag syntax:
   * 
   *    | Class  ||  ID    |
   *  0bxxxx_xxxx_xxxx_xxxx
   * 
   *  Class:
   *    This part of the flag will be the id of the class to with the status belongs.
   *    A class can use one or more bits depending on how many statuses it has
   * 
   *  ID:
   *    THis is simply the if of the flag.
   * 
  */
  
  // General
  public static OK: number = 0;
  
  // Masks
  public static CLASS_ID_MASK: number  = 0b1111_1111_0000_0000;
  public static STATUS_ID_MASK: number = 0b0000_0000_1111_1111;
  
  // Class ID's
  public static CLASS_SHADER: number = 0b0000_0001_0000_0000;
  
  // Shader 0b0000_0001_xxxx_xxxx
  public static SDR_NO_SRC: number       = (Status.CLASS_SHADER | 0b0000_0001);
  public static SDR_NOT_LOADED: number   = (Status.CLASS_SHADER | 0b0000_0010);
  public static SDR_UNKNOWN_TYPE: number = (Status.CLASS_SHADER | 0b0000_0100);
  
  public static get_status_names (status: number): string[] {
    
    if (status === 0) { return ['OK']; }
    
    let statuses: string[] = [];

    // Figure out the class
    const class_id: number = (status & Status.CLASS_ID_MASK);
    let  class_name: string;
    if ((class_id & Status.CLASS_SHADER) !== 0) {
      class_name = 'SHADER';
    }
    
    // Get the spesific status id
    const status_id: number = (status & Status.STATUS_ID_MASK);
    
    return statuses;
    
  }
  
}
