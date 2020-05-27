/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    server: Server
    database: Database
  }
  interface Database {
    host: undefined
    port: number
    username: undefined
    password: undefined
    database: undefined
    dialect: string
    define: Define
  }
  interface Define {
    paranoid: boolean
    timestamps: boolean
    underscored: boolean
    freezeTableName: boolean
    createdAt: string
    updatedAt: string
    deletedAt: string
    charset: string
    schema: string
  }
  interface Server {
    port: undefined
  }
  export const config: Config
  export type Config = IConfig
}
