import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { ETab, countElementOnPage } from './tasks.enums';
import { count } from 'console';
@Injectable()
export class TasksService {

    constructor(@InjectModel(Task) private TaskRepository:typeof Task){}

    async CreateTask(dto:CreateTaskDto){
        const task = await this.TaskRepository.create(dto);
        return task
    }

    async getAllTask(Tab:ETab,numberPage:number){

        let tasks = null
        const tasksAll = await this.TaskRepository.findAll()
        const tasksTrue = tasks = await this.TaskRepository.findAll({
            where:{
                status:true
            }
        })
        switch (Tab){
            case ETab.All:
                tasks = await this.TaskRepository.findAll({
                    order: [['createdAt','ASC']],
                })
                break;
            case ETab.Active:
                tasks = await this.TaskRepository.findAll({
                    where:{
                        status:false
                    },
                    order: [['createdAt','ASC']],
                })
                break;
            case ETab.Completed:
                tasks = await this.TaskRepository.findAll({
                    where:{
                        status:true
                    },
                    order: [['createdAt','ASC']],
                })
                break;
            default:
                check(Tab)
                break;
        }
        let EditTasks = tasks.map((item,index) => {
            const ObjTask:{
                id:number,
                index:number,
                text:string,
                status:boolean,
            } = {
                id:item.id,
                index:index+1,
                text:item.text,
                status:item.status,
            }
            return ObjTask
        })
        const countPage = Math.floor(EditTasks.length/countElementOnPage)===0? 1:Math.ceil(EditTasks.length/countElementOnPage)
        numberPage = numberPage>countPage? countPage:numberPage;
        EditTasks = EditTasks.slice((numberPage-1)*countElementOnPage, ((numberPage-1)*countElementOnPage+countElementOnPage))
        return {
            tasks:EditTasks,
            statusCheckbox:(tasksTrue.length===tasksAll.length),
            countPage:countPage,
            len:{
                AllTask:tasksAll.length,
                ActiveTask:(tasksAll.length-tasksTrue.length),
                CompletedTask:tasksTrue.length,
            },
            ActivePage: numberPage,
        }
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


    async updateStatus(status:boolean, id?:number, ){
        try{
            // let BoolStatus = false
            // if (status === 'true'){
            //     BoolStatus = true
            // }
            let updatedTask = null
            if ((id !== undefined)){
                updatedTask = await this.TaskRepository.update({ status: status },{
                    where:{
                        id:id
                    }
                })
            }else{
                updatedTask = await this.TaskRepository.update({ status: status },{where:{
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