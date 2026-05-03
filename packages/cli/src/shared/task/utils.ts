import { ITaskDTO } from "@ask/back-end-api";


export const addStyleToDescription = ({ description }: ITaskDTO) => description ? `${description} <- *` : '<- *';
