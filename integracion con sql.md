# como integrar mysql con node js y typescript
## Integracion con prisma y node js 
npm install prisma --save-dev

npx prisma init --datasource-provider postgresql
## se genera el modelo de datos ejemplo
model User {

  id    Int     @id @default(autoincrement())

  email String  @unique

  name  String?

  posts Post[]

}


model Post {

  id        Int     @id @default(autoincrement())

  title     String

  content   String?

  published Boolean @default(false)

  author    User    @relation(fields: [authorId], references: [id])

  authorId  Int

}
## se ejecuta para inciar la conexion con la base de datos
npx prisma migrate dev --name init
## se ejecuta para generar el cliente de prisma

npx prisma generate