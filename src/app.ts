import { Server } from './presentation/server';

import { envs } from './config/envs';
import { AppRouter } from './presentation/routes';
// ejemplo de uso de la libreria de express en node y ts
(async () => {
  main();
}

)();

function main(){
  const server= new Server({
    port: envs.PORT,
    routes: AppRouter.routes,
  }

  );
   server.start();
}