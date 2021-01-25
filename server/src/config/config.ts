export const config = () => ({
  port: Number(process.env.SERVER_PORT),
  redis: {
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
  },
  mysql: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    timezone: 'Z',
    synchronize: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
  },
});
