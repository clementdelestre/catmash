import { environment } from "../../../environments/environment";

export function getCatPictureUrl(id: number){
    return environment.apiUrl + 'cat/picture/' + id;
}