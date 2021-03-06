import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1618195922251 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "images",
        columns: [
          {
            name: "id",
            type: "uuid",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "public_id",
            type: "varchar",
          },
          {
            name: "url",
            type: "varchar",
          },
          {
            name: "pet_home_id",
            type: "uuid",
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
