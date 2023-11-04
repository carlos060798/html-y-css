// ejemplo de como servir archivos estaticos con express
import express from "express";
import path from "path";
import { Router } from "express";


// interface para definir las opciones del servidor
interface options{
  port: number;
  routes: Router;
 public_path?: string;

} 

export class Server {
  


private app = express();
private  readonly port: number;
private readonly publicPath: string;
private readonly routes: Router;

constructor(options: options) {
  const { port,public_path,routes } = options;
    
  this.port = port;
  this.publicPath = public_path|| "public";
  this.routes = routes;
}


  async start() {

  // Middlewere

  // public folder
  this.app.use(express.static(this.publicPath));

  // routes de rest api 

  this.app.use(this.routes);





  // ruta para servir el app de react
  this.app.get("*", (req, res) => {
    const index = path.join(__dirname,`../../${this.publicPath}/index.html`);
    res.sendFile(index);
    
  }) 

  // iniciar el servidor

   this.app.listen(this.port, () => {

    console.log("servidor corriendo en el puerto 3000");
   });
 }
}