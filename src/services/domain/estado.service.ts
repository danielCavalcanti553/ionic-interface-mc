
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; // Retirei "src/client" para importar todos de http
import { API_CONFIG } from "../../config/api.config";
import { EstadoDTO } from "../../models/estado.dto";
import { Observable } from "rxjs/Rx"; // Rx é a importação correta, Obsevable é incompleta

@Injectable() // Permite que seja injetado
export class EstadoService{

    constructor(public http:HttpClient){
    }

    findAll() : Observable<EstadoDTO[]>{
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
       
    }
}