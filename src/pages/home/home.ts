import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // Desabilitando Menu Lateral, injetar menuController
  // IONIC Life Cycle
  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  // Desabilitar menu lateral quando entrar no login

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  // Habilitar menu lateral quando sair da tela de login (ao realizar o login)
  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  login(){
    this.navCtrl.setRoot('CategoriasPage');
  }

}
