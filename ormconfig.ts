import { DataSourceOptions } from "typeorm";

export const config: DataSourceOptions = {
    type: 'mssql',
    name: 'default',
    host: 'IHSRVDC2',
    port: 1433,
    username: 'sa',
    password: 'abc71db',
    database: 'INTRANET',
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: false,
    extra: {
      trustServerCertificate: true,
    },
    logging: true
}

