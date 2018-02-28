import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';


@IonicPage()
@Component({
  selector: 'page-pick-adress',
  templateUrl: 'pick-adress.html',
})
export class PickAdressPage {

  items : EnderecoDTO[];

  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage : StorageService,
    public clienteService : ClienteService,
    public cartService : CartService) {
  }

  ionViewDidLoad() {

    let localUser = this.storage.getLocalUser(); // pegando o localUser

    if(localStorage && localUser.email){ // Se existir localStore e nela existir email
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          
          // resposta com sucesso
          this.items = response['enderecos']; // Evitando erro do compilador se não houver
          
          // Pegando intens do carrinho no LocalStore
          let cart = this.cartService.getCart();

          //preenchendo Pedido
          this.pedido = {
            cliente: {id:response['id']},
            enderecoDeEntrega: null,
            pagamento: null,
            itens : cart.items.map(x => { return {quantidade: x.quantidade, produto:{id: x.produto.id}} })
          }
        
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

  nextPage(item:EnderecoDTO){
    this.pedido.enderecoDeEntrega = {id : item.id};
    this.navCtrl.push('PaymentPage',{pedido : this.pedido});
  }

}
