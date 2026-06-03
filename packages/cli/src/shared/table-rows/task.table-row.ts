import { MaybeUndefined } from "@ask-ell/core";
import { RunnableTask } from "../../application";


type TaskTableRow = {
    ID: string;
    Description: MaybeUndefined<string>;
    Origin: string;
};

export const fromTaskToTableRow = ({
    id: ID,
    description: Description,
    origin
}: RunnableTask): TaskTableRow => ({
    ID,
    Description,
    Origin: origin?.id ?? '*'
});
