import {Module} from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Task } from "./tasks/tasks.model";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal:true,
        }),
        SequelizeModule.forRootAsync({
            imports: [
                ConfigModule,
            ],
            useFactory: (configService: ConfigService) => ({
                dialect: configService.get('POSTGRES_DIALECT'),
                host: configService.get('POSTGRES_HOST'),
                port: Number(configService.get('POSTGRES_PORT')),
                username: configService.get('POSTGRES_USERNAME'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: configService.get('POSTGRES_DB_NAME'),
                models: [Task],
                autoLoadModels:true,
            }),
            inject:[ConfigService], 
        }),
        TasksModule,
      ],
})
export class AppModule{

}