import { Command } from "commander";

import { RunnableTask } from "../../../application";
import { TaskRunner } from "../../../shared/task";


// TODO: remove
export class TaskCommand extends Command {
    constructor(private task: RunnableTask){
        super(task.id);
        if(task.description) {
            this.description(task.description);
        }
    }

    setTaskRunner(taskRunner: TaskRunner): this {
        return this.action((): void => taskRunner(this.task));
    }
}
