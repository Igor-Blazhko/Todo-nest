import { ApiProperty } from "@nestjs/swagger";
import { Model } from "sequelize-typescript";
import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Table } from "sequelize-typescript";

interface CreateTask {
    text:string,
}

@Table({tableName:'Table_task'})
export class Task extends Model<Task, CreateTask>{

    @ApiProperty({
        example:'1',
        description:'Уникальный ид задачи'
    })
    @Column({
        type:DataType.INTEGER,
        unique:true,
        autoIncrement:true,
        primaryKey:true,    
    })
    id:number;


    @ApiProperty({
        example:'Я должен сделать что-то',
        description:'Текст задачи'
    })
    @Column({
        type:DataType.STRING, 
        allowNull:false,
    })
    text:string;


    @ApiProperty({
        example:'false',
        description:'статус задачи(Выполенено/нет)'
    })
    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false
    })
    status:boolean;

}