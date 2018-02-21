import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"; // Todos de ../http
import { ClienteDTO } from "../../models/cliente.dto";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "./storage.service";

@Injectable()
export class ClienteService{

    // injetando HTTPCliente e Storage Service
    constructor(public http:HttpClient, public storage: StorageService){
    }

    findByEmail(email:string) : Observable<ClienteDTO>{

        let token = this.storage.getLocalUser().token;// pegar valor do token
        let authHeader = new HttpHeaders({'Authorization' : 'Bearer ' + token}); // header que será enviado para back-end
        
        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
            { 'headers':authHeader } // acrescentando o header a requisição
        );
    }

    getImageFromS3(id:string) : Observable<any>{ // pegar imagem da amazon
       let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
       return this.http.get(url, {responseType:'blob'})
    }
}