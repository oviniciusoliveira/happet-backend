import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1618195922251 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "images",
        columns: [
          {
            name: "id",
            type: "text",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "path",
            type: "varchar",
          },
          {
            name: "pet_home_id",
            type: "text",
          },
        ],
        foreignKeys: [
          {
            name: "imagePetHome",
            columnNames: ["pet_home_id"],
            referencedTableName: "pet_homes",
            referencedColumnNames: ["id"],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }
}
