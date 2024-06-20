import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";



async function start() {  
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
                    .setTitle('ToDos')
                    .setDescription('Documentation')
                    .setVersion('1.0')
                    .addTag('To do')
                    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/documentation',app, document)

  await app.listen(PORT,()=>{
    console.log(`PORT: ${PORT}`)
    console.log(`USER: ${process.env.POSTGRES_USERNAME}`)
    console.log(`PASS: ${process.env.POSTGRES_PASSWORD}`)
    console.log(`DB NAME: ${process.env.POSTGRES_DB_NAME}`)
  })
}



start();
