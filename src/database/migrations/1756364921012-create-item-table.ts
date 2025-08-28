import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateItemTable1756364921012 implements MigrationInterface {
    name = 'CreateItemTable1756364921012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`items\` (
                \`id\` varchar(36) NOT NULL,
                \`item_name\` varchar(255) NOT NULL,
                \`category_id\` varchar(255) NOT NULL,
                \`stock\` int NOT NULL DEFAULT '0',
                \`item_group\` varchar(255) NOT NULL,
                \`price\` int NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`items\`
            ADD CONSTRAINT \`FK_0c4aa809ddf5b0c6ca45d8a8e80\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_0c4aa809ddf5b0c6ca45d8a8e80\`
        `);
        await queryRunner.query(`
            DROP TABLE \`items\`
        `);
    }

}
