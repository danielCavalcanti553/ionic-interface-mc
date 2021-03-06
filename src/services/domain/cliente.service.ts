import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; // Todos de ../http
import { ClienteDTO } from "../../models/cliente.dto";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";


@Injectable()
export class ClienteService{

    // injetando HTTPCliente e Storage Service
    constructor(
      public http:HttpClient, 
      public storage: StorageService,
      public imageUtil : ImageUtilService){
    }

    // Em pedido, certificar que o id é realmente o que foi selecionado no pedido
    findById(id:string){
      return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    findByEmail(email:string){

      return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImageFromS3(id:string) : Observable<any>{ // pegar imagem da amazon
       let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
       return this.http.get(url, {responseType:'blob'})
    }

    insert(obj : ClienteDTO){
      return this.http.post(
        `${API_CONFIG.baseUrl}/clientes`,
        obj,
        {
          observe: 'response',
          responseType: 'text'
        }
      );
    }

    // Enviar imagem para o backend
    uploadPicture(picture){
      let pictureBlob = this.imageUtil.dataUriToBlob(picture); // converter imagem para blob
      let formData : FormData = new FormData();
      formData.set('file',pictureBlob, 'file.png');

      return this.http.post(
        `${API_CONFIG.baseUrl}/clientes/picture`,
        formData,
        {
          observe: 'response',
          responseType: 'text'
        }
      );
    }


}