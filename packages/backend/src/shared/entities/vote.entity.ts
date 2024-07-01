import { Column, Entity, PrimaryGeneratedColumn, Relation, ManyToOne } from "typeorm";
import { CatEntity } from "./cat.entity";

@Entity('vote')
export class VoteEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CatEntity, cat => cat.id, { onDelete: "CASCADE" })
    cat: Relation<CatEntity>;

    @Column()
    date: Date;

}