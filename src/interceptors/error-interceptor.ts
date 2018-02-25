import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    // injetando o storage
    constructor(public storage: StorageService, public alertCtrl : AlertController){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        console.log('INTERCEPTOR FUNCIONOU');
        return next.handle(req)
            .catch((error, caught) => {

                let errorObj = error;

                // existe um campo de erro?
                if(errorObj.error){
                    errorObj = errorObj.error;
                }

                // Será que é JSON? Se não for, converta
                if(!errorObj.status){ // Todo JSON possui campo status
                    errorObj = JSON.parse(errorObj);

                }

                console.log("ERRO DETECTADO");
                console.log(errorObj);
                
                // Verificando tipos de erro
                switch(errorObj.status){
                    case 401: // autenticação
                        this.handle401();
                        break;
                    case 403: // autorização
                        this.handle403();
                        break;

                    default:
                        this.handleDefaultError(errorObj);
    
                }

                return Observable.throw(errorObj);
            }) as any;
    }

    handle403(){
        // remove objeto do storage
        this.storage.setLocalUser(null);
    }

    handle401(){
        let alert = this.alertCtrl.create({
            title: 'Erro 401: Falha na autenticação!',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false, // Pra sair do alert tem que apertar no botão do alert (opcional)
            buttons: [
                {
                    text: 'Ok'
                }          
            ]
        });
        alert.present();
    }

    handleDefaultError(errorObj){
        let alert = this.alertCtrl.create({
            title: 'Erro' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }          
            ]
        });
        alert.present();
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}

/*
TEMPLATE

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO


export class ErrorInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req)
            .catch((error, caught) => {
                return Observable.throw(error);
            }) as any;
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}

*/