import { ApiProperty } from "@nestjs/swagger";


export class CreateTaskDto {
    @ApiProperty({
        example:'какой-то текст',
        description:'текст задачи'
    })
    readonly text:string
}


export class updateTaskDto {
    @ApiProperty({
        example:'какой-то текст',
        description:'текст задачи'
    })
    readonly text?:string

    @ApiProperty({
        example:'какой-то текст',
        description:'текст задачи'
    })
    readonly status?:string
}