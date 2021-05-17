module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123456",
  database: "happet",
  migrations: ["./src/database/migrations/*.ts"],
  synchronize: false,
  entities: ["./src/models/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
};
