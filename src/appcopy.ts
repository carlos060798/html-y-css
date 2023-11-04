// ejemplo de web server con node json 

import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
    console.log(req.url);
/* ejemplo de envio de respuesta en html 
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Hola mundo desde nodejs</h1>');
    res.end();
    */
/* ejemplo de envio de respuesta en json
 const data = {
        id: 1,
        name: 'Fernando'
        
 }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
*/
// como servir archivos estaticos  desde nodejs
 if (req.url === "/"){
   const htmlFile = fs.readFileSync("public/index.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlFile);
    return;

 } 
  if(req.url?.endsWith(".js")){
    res.writeHead(200, { "Content-Type": "text/javascript" });

 } else if(req.url?.endsWith(".css")){
    res.writeHead(200, { "Content-Type": "text/css" });
 }
 

 const  respuesta = fs.readFileSync(`./public${req.url}`,"utf-8");
 console.log(respuesta);
  res.end(respuesta);
});

server.listen(8000,()=>{
    console.log("servidor corriendo en el puerto 8000");
});