import { Injectable } from "@nestjs/common";


@Injectable()
export class ProjectService {
    findOne(projectId: string) {
        console.log(projectId);
        return {};
    }
}