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

/**
 * Clase que representa un servidor HTTP.
 * @class
 */
export class Server {
  /**
   * Aplicación express.
   * @private
   */
  private app = express();
  /**
   * Puerto en el que se iniciará el servidor.
   * @private
   * @readonly
   */
  private readonly port: number;
  /**
   * Ruta pública del servidor.
   * @private
   * @readonly
   */
  private readonly publicPath: string;
  /**
   * Rutas del servidor.
   * @private
   * @readonly
   */
  private readonly routes: Router;

  /**
   * Crea una instancia de Server.
   * @constructor
   * @param {options} options - Opciones para configurar el servidor.
   * @param {number} options.port - Puerto en el que se iniciará el servidor.
   * @param {string} [options.public_path="public"] - Ruta pública del servidor.
   * @param {Router} options.routes - Rutas del servidor.
   */
  constructor(options: options) {
    const { port, public_path, routes } = options;

    this.port = port;
    this.publicPath = public_path || "public";
    this.routes = routes;
  }

  /**
   * Inicia el servidor.
   * @async
   * @returns {Promise<void>}
   */
  async start(): Promise<void> {
    // Middlewere
    this.app.use(express.json()); // para parsear json
    this.app.use(express.urlencoded({ extended: true })); // para parsear formularios html

    // public folder
    this.app.use(express.static(this.publicPath)); 

    // routes de rest api
    this.app.use(this.routes);   

    this.app.get("*", (req, res) => {
      const index = path.join(__dirname, `../../${this.publicPath}/index.html`);
      res.sendFile(index);
    });

    // iniciar el servidor
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en el puerto 3000");
    });
  }
}