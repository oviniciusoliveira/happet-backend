import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPetHomes1618189129540 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "pet_homes",
        columns: [
          {
            name: "id",
            type: "varchar",
            unsigned: true, // sempre um numero positivo
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "latitude",
            type: "decimal",
            scale: 10,
            precision: 2,
          },
          {
            name: "longitude",
            type: "decimal",
            scale: 10,
            precision: 2,
          },
          {
            name: "about",
            type: "text",
          },
          {
            name: "instructions",
            type: "text",
          },
          {
            name: "opening_hours",
            type: "varchar",
          },
          {
            name: "open_on_weekends",
            type: "boolean",
            default: false,
          },
          {
            name: "is_accepted",
            type: "boolean",
            default: false,
          },
          {
            name: "whatsapp",
            type: "varchar",
          }
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("pet_homes");
  }
}
