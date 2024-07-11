
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Visit } from "./entities/visit.entity";

@Injectable()
export class VisitRepository extends Repository<Visit> {

    constructor(private dataSource: DataSource) {
      super(Visit, dataSource.createEntityManager());
    }
}