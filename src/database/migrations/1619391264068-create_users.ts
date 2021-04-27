import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1619391264068 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "varchar",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          { name: "name", type: "varchar" },
          { name: "email", type: "varchar" },
          { name: "password", type: "varchar" },
          { name: "password_reset_token", type: "varchar" },
          { name: "password_reset_expires", type: "int"},
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
