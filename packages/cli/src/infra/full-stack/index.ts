import { askProject, nxProjectConfiguration } from '../../shared/data';
import { TaskSorter } from '../../shared/task.sorter';
import { IProject, IProjectConfiguration, ITask } from '../../shared/types';
import { AskCommand } from '../commander';


export const run = async (): Promise<void> => {
    // TODO: fetch from server
    const project: IProject = await Promise.resolve(askProject);
    const projectConfiguration: IProjectConfiguration = await Promise.resolve(nxProjectConfiguration);
    const tasks: ITask[] = new TaskSorter(project, projectConfiguration).getUniqueTasks();
    new AskCommand(tasks).parse();
};
