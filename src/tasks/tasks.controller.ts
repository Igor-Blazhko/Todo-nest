import { Body, Controller, Delete, Get, Param, ParseBoolPipe, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, updateTaskDto } from './dto/create-task.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './tasks.model';
import { ETab } from './tasks.enums';


@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {

    constructor(private TasksService:TasksService, ){}

    @ApiOperation({
        summary:'Create Task'
    })
    @ApiResponse({
        status:200,
        type:Task,
    })
    @Post()
    CreateTask(@Body() taskDto:CreateTaskDto){
        try {
            if (!taskDto){
                throw new Error('Не получен запрос')
            }
        }
        catch(e){
                console.log(e.message)  
        }
        return this.TasksService.CreateTask(taskDto)
    }


    @ApiOperation({
        summary:'Get all Task'
    })
    @ApiResponse({
        status:200,
        type:[Task]
    })
    @Get(':Tab')
    getAllTask(@Param('Tab') Tab:ETab){
        return this.TasksService.getAllTask(Tab)
    }


    @ApiOperation({
        summary:'Get all Task'
    })
    @ApiResponse({
        status:200,
        type:[Task]
    })
    @Get(`*/:id`)
    getOneTask(@Param('id') id:string){
        return this.TasksService.getOneTask(+id)
    }


    @ApiOperation({
        summary:'remove some Task'
    })
    @ApiResponse({
        status:200,
        type:String
    })
    @Delete('*/:id')
    removeTask(@Param('id') id:string){
        const idTask = Number(id);
        return this.TasksService.removeTask(idTask)
    }

    @ApiOperation({
        summary:'remove all Task'
    })
    @ApiResponse({
        status:200,
        type:String
    })
    @Delete('*/')
    removeCompletedTask(){

        return this.TasksService.removeCompletedTask()
    }

    @ApiOperation({
        summary:'update status Task'
    })
    @ApiResponse({
        status:200,
        type:String
})
    @Patch('*/:id')
    update(@Param('id') id: string, @Body('status') status?:string,@Body('text') text?:string){
        try{
            console.log(text)
            console.log(status)
            if(text !== undefined){  
                this.TasksService.updateText(text, Number(id))
            }
            if(status !== undefined){
                this.TasksService.updateStatus(status, Number(id))//возможен косяк из-за прокидывания строки (исправил без пайпов)
            }
            return 'update Successful'
        }
        catch(e){
            return e.message
        }
    }

    @ApiOperation({
        summary:'update text Task'
    })
    @ApiResponse({
        status:200,
        type:String
})

    @ApiOperation({
        summary:'update all status Task'
    })
    @ApiResponse({
        status:200,
        type:String
})
    @Patch('*/')
    updateAllStatus(@Body( 'status') status:string){
        return this.TasksService.updateStatus(status)
    }
}
