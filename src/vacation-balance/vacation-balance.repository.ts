
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { VacationBalance } from "./entities/vacation-balance.entity";

@Injectable()
export class VacationBalanceRepository extends Repository<VacationBalance> {

    constructor(private dataSource: DataSource) {
      super(VacationBalance, dataSource.createEntityManager());
    }
}