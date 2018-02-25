import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // removido '/src/model'
//import { FormBuilder } from '@angular/forms/src/form_builder'; Inserido no Grupo acima


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup : FormGroup;

  // FormGroup: Injetar o formBuider
  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public formBuilder : FormBuilder) {

        this.formGroup = this.formBuilder.group({
          // Parâmetros: valor inicial, lista de validators (repetir do backend)
          nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
          email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
          tipo : ['1', [Validators.required]],
          cpfOuCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
          senha : ['123', [Validators.required]],
          logradouro : ['Rua Via', [Validators.required]],
          numero : ['25', [Validators.required]],
          complemento : ['Apto 3', []],
          bairro : ['Copacabana', []],
          cep : ['10828333', [Validators.required]],
          telefone1 : ['977261827', [Validators.required]],
          telefone2 : ['', []],
          telefone3 : ['', []],
          estadoId : [null, [Validators.required]],
          cidadeId : [null, [Validators.required]] 
        }); // Responsável por instanciar um FormGroup
  }

  signupUser(){
    console.log("Enviando Form...");
  }

  // contolar o formulário, fazer valiações


}
