import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';


@IonicPage()
@Component({
  selector: 'page-pick-adress',
  templateUrl: 'pick-adress.html',
})
export class PickAdressPage {

  items : EnderecoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage : StorageService,
    public clienteService : ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser(); // pegando o localUser
    if(localStorage && localUser.email){ // Se existir localStore e nela existir email
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          // resposta com sucesso
          this.items = response['enderecos']; // Evitando erro do compilador se não houver
        },
      error => {

        if(error.status == 403){
          // Houve um erro, redirecionando para HomePage
          this.navCtrl.setRoot('HomePage');
        }

      });
      
    }else{
      // Houve um erro no localStoraou localUser, redirecionando para HomePage
      this.navCtrl.setRoot('HomePage');
    }
  }

}
