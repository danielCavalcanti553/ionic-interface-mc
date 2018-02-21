import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO


export class ErrorInterceptor implements HttpInterceptor{

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

                return Observable.throw(errorObj);
            }) as any;
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