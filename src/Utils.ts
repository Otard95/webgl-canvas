export class Utils {
  
  static async fetch_file_text(file_name: string): Promise<string> {
    
    try {
      let res = await fetch(file_name);
      return await res.text();
    } catch (e) {
      console.log(e);
      throw null;
    }
    
  }
  
  static get_file_ext (file_name: string): string | null {
    
    let reg_res: any[] | null = file_name.match(/.+\.(\w{2})/);
    if (reg_res == null) return null;
    return reg_res[1];
    
  }
  
}