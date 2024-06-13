
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { VacationRequest } from "./entities/vacation-request.entity";

@Injectable()
export class VacationRequestRepository extends Repository<VacationRequest> {

    constructor(private dataSource: DataSource) {
      super(VacationRequest, dataSource.createEntityManager());
    }
}