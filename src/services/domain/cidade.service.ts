
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; // Retirei "src/client" para importar todos de http
import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/cidade.dto";
import { Observable } from "rxjs/Rx"; // Rx é a importação correta, Obsevable é incompleta

@Injectable() // Permite que seja injetado
export class CidadeService{

    constructor(public http:HttpClient){
    }

    findAll(estado_id : string) : Observable<CidadeDTO[]>{
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
       
       
    }
}