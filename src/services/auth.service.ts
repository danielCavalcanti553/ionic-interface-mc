import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./domain/storage.service";

@Injectable()
export class AuthService{

    constructor(public http: HttpClient, public storage : StorageService){ // Injetado StorageService
    }

    authenticate(creds : CredenciaisDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe:'response', // pegar o header da resposta
                responseType: 'text' // evitar erro parseJSON em retorno vazio  
            }
        );
    }

    // Quando um login tem sucesso
    sucessfulLogin(authorizationValue : string){ // Recebe com argumento o token
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok
        };

        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}