export interface IMysqlConfiguration {
  type: 'mysql'
  charset: string
  extra: {
    connectionLimit: number
    queueLimit: number
  }
  autoLoadEntities: boolean
}
