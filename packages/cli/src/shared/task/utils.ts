import { ITaskDTO } from "@ask/back-end-api";


export const addStyleToDescription = ({ description }: ITaskDTO): string => description ? `${description} <- *` : '<- *';
