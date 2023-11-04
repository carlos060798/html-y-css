// ejemplo de como servir archivos estaticos con express
import express from "express";
import path from "path";

interface options{
  port: number;
 public_path?: string;

} 

export class Server {
  


private app = express();
private  readonly port: number;
private readonly publicPath: string;

constructor(options: options) {
  const { port,public_path } = options;
    
  this.port = port;
  this.publicPath = public_path|| "public";
}


  async start() {

  // Middlewere

  // public folder
  this.app.use(express.static(this.publicPath));
  
  this.app.get("*", (req, res) => {
    const index = path.join(__dirname,`../../${this.publicPath}/index.html`);
    res.sendFile(index);
    
  })

   this.app.listen(this.port, () => {

    console.log("servidor corriendo en el puerto 3000");
   });
 }
}