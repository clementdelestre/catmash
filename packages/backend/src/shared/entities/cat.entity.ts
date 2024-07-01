import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Relation } from "typeorm";
import { VoteEntity } from "./vote.entity";

@Entity('cat')
export class CatEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    imgUrl: string;

    @OneToMany(() => VoteEntity, vote => vote.cat, {cascade: true})
    votes: Relation<VoteEntity[]>;

}