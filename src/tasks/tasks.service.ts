import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { ETab } from './tasks.enums';

@Injectable()
export class TasksService {

    constructor(@InjectModel(Task) private TaskRepository:typeof Task){}

    async CreateTask(dto:CreateTaskDto){
        const task = await this.TaskRepository.create(dto);
        return task
    }

    async getAllTask(Tab:ETab){

        let tasks = null

        switch (Tab){
            case ETab.All:
                tasks = await this.TaskRepository.findAll()
                break;
            case ETab.Active:
                tasks = await this.TaskRepository.findAll({
                    where:{
                        status:false
                    }
                })
                break;
            case ETab.Completed:
                tasks = await this.TaskRepository.findAll({
                    where:{
                        status:true
                    }
                })
                break;
            default:
                check(Tab)
                break;
        }
        
        return tasks
    }


    async getOneTask(id){
        const task = await this.TaskRepository.findOne({
            where:{
                id:id
            }
        })
        return task
    }


    async removeTask(id){
        const removedTask = await this.TaskRepository.destroy({
            where:{
                id:id
            }
        })
        console.log(removedTask)
        return 'Successful remove Task'
    }


    async updateStatus(status:string, id?:number, ){
        try{
            let BoolStatus = false
            if (status === 'true'||'True'||'TRUE'){
                BoolStatus = true
            }
            let updatedTask = null
            if ((id !== undefined)){
                updatedTask = await this.TaskRepository.update({ status: BoolStatus },{
                    where:{
                        id:id
                    }
                })
            }else{
                updatedTask = await this.TaskRepository.update({ status: BoolStatus },{where:{
                    status:!status
                }})
            }
        return updatedTask
        }
        catch(e){
            return e.message
        }
        
    }

    async removeCompletedTask(){
        const removeAll = await this.TaskRepository.destroy({
            where:{
                status:true
            }
        })
        return 'Successful removed Completed'
    }

    async updateText(text:string, id:number){
        try{
            if(!text) throw new Error(text)
            const updatedTask = await this.TaskRepository.update({ text: text },{
                where:{
                    id:id
                }
            })
            return updatedTask
        }
        catch(e){
            return e.message
        }

    }

}


function check(agr:never):never{
    return agr
}