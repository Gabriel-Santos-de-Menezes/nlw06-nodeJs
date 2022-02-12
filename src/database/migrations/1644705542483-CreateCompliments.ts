import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCompliments1644705542483 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "compliments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_sender",
                        type: "uuid",
                    },
                    {
                        name: "user_receiver",
                        type: "uuid"
                    },
                    {
                        name: "tag_id",
                        type: "uuid"
                    },
                    {
                        name: "message",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKUserSenderCompliments",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_sender"],// Coluna a ser referenciada dentro dessa tabela
                        onDelete: "SET NULL", // Se for removido
                        onUpdate: "SET NULL",
                    }, {
                        name: "FKUserReceiverCompliments",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_receiver"],// Coluna a ser referenciada dentro dessa tabela
                        onDelete: "SET NULL", // Se for removido
                        onUpdate: "SET NULL",
                    }, {
                        name: "FKTagCompliments",
                        referencedTableName: "tags",
                        referencedColumnNames: ["id"],
                        columnNames: ["tag_id"],// Coluna a ser referenciada dentro dessa tabela
                        onDelete: "SET NULL", // Se for removido
                        onUpdate: "SET NULL",
                    },
        
                ]
            })
        
        )
        // OU Daria para fazer as FKs da maneira abaixo
        /**
         await queryRunner.createForeignKey(
             "compliments",
             new TableForeignKey({
                 name: "FKUserSenderCompliments",
                 referencedTableName: "users",
                 referencedColumnNames: ["id"],
                 columnNames: ["user_sender"],// Coluna a ser referenciada dentro dessa tabela
                 onDelete: "SET NULL", // Se for removido
                 onUpdate: "SET NULL",
             })
         )
         */
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("compliments");
    }
}