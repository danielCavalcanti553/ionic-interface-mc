import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // removido '/src/model'
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
//import { FormBuilder } from '@angular/forms/src/form_builder'; Inserido no Grupo acima


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  // contolar o formulário, fazer valiações
  formGroup: FormGroup;

  // coleção de cidades e estados
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  // FormGroup: Injetar o formBuider
  // Injetando serviços de estado e cidade
  // Injetando Cliente Service para inserir Clientes
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController
  ) {

    this.formGroup = this.formBuilder.group({
      // Parâmetros: valor inicial, lista de validators (repetir do backend)
      nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['123', [Validators.required]],
      logradouro: ['Rua Via', [Validators.required]],
      numero: ['25', [Validators.required]],
      complemento: ['Apto 3', []],
      bairro: ['Copacabana', []],
      cep: ['10828333', [Validators.required]],
      telefone1: ['977261827', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    }); // Responsável por instanciar um FormGroup
  }

  signupUser() {
    // console.log(this.formGroup.value); -> Testar Json no Console do Chrome
    this.clienteService.insert(this.formGroup.value)
      .subscribe(reponse => {
        this.showInsertOk();
      },
      error => { }
      );
  }

  // Mostrar um alert
  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false, // clicar somente no botão para sair
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.pop(); // desempilhar a página
          }
        }
      ]
    });

    alert.present();
  }

  // Ao carregar a página
  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {
        // Erro ainda não tratado
      })
  }

  // atualizando o campo Cidades
  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null); // Tira seleção da caixa de cidades
      })
  }



}
