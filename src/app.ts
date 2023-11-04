import path from 'path';
import { Server } from './presentation/server';

import { envs } from './config/envs';
// ejemplo de uso de la libreria de express en node y ts
(async () => {
  main();
}

)();

function main(){
  const server= new Server({
    port: envs.PORT,
  }

  );
   server.start();
}