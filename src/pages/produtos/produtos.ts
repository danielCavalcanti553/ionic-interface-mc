import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];
  // NavParam -> Obtenho dados da navegação
  // Injetando ProdutoService
  // injetando Loading (Carregamento da página)
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public produtoService: ProdutoService,
    public loadingCtrl : LoadingController) {
  }

  ionViewDidLoad() {

    let categoria_id = this.navParams.get('categoria_id');

    let loader = this.presentLoadingDefault();

    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.items = response['content'];
        loader.dismiss();
        this.loadImageUrls();
        
      },
      error => { 
        loader.dismiss();
      }
      );
  };

  loadImageUrls() {
    // Carregando imagens para todos os produtos em items
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error => { }
        )
    }
  }

  showDetail(produt_id : string){
    this.navCtrl.push('ProdutoDetailPage',{produto_id : produt_id});
  }

  // mostrar load enquanto é carregado
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
  
    loading.present();
    return loading;
  
  }
}
