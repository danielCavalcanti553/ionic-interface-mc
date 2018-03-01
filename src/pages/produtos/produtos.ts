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

  lines : number = 15;

  page : number = 0;
  
  // Lista inicia vazia -> Infinity scroll concatena listas
  items: ProdutoDTO[] = [];

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
    this.loadProduct();
  };

  loadProduct(){
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoadingDefault();
    this.produtoService.findByCategoria(categoria_id, this.page, this.lines)
      .subscribe(response => {
        let start = this.items.length;
        this.items = this.items.concat(response['content']);
        let end = this.items.length - 1;
        loader.dismiss();
        console.log(this.page);
        console.log(this.items);
        this.loadImageUrls(start, end);
      },
      error => {
        loader.dismiss();
      });
  }

  loadImageUrls(start : number, end: number) {
    // Carregando imagens para todos os produtos em items
   for (var i=start; i<=end; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error => {});
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

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadProduct();
    this.loadProduct();
     setTimeout(() => {
       refresher.complete();
    }, 1000); // milisegundos
  }

  // Infinity scroll para produtos
  doInfinite(infiniteScroll) {

    this.page++;
    this.loadProduct();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);

  }

}
