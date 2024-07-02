import { Cat } from "../../../core/models/cat.model";

export interface RankedCat {
    votesCount: number;
    cat: Cat;
}