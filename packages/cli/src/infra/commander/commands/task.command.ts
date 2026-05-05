import { Command } from "commander";

import { ITaskDTO } from "@ask/back-end-api";

import { TaskRunner } from "../../../shared/tasks";


export class TaskCommand extends Command {
    constructor(private task: ITaskDTO){
        super(task.id);
        if(task.description) {
            this.description(task.description);
        }
    }

    setTaskRunner(taskRunner: TaskRunner): this {
        return this.action((): void => taskRunner.run(this.task));
    }
}