console.log('process.env.DATABASE_URL => ', process.env.DATABASE_URL);
module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "logging": false,
  "entities": [
    "./src/modules/**/infra/typeorm/entities/*.ts"
  ],
  "migrations": [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
  "cli": {
    "entitiesDir": "./src/modules/**/infra/typeorm/entities",
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}
