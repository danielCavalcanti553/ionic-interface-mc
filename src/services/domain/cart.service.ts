import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CartService{
    constructor(public storage : StorageService){
    }

    createOrClearCart() : Cart{
        let cart : Cart = {items: []};
        this.storage.setCart(cart);
        return cart;
    }

    getCart() : Cart {
        let cart : Cart = this.storage.getCart();
        if(cart==null){ // se o carrinho não existir, crie
            cart = this.createOrClearCart();
        }
        return cart;
    }

    // Adicionando produto ao carrinho
    addProduto(produto : ProdutoDTO) : Cart{
        let cart = this.getCart();
        // Verifica se existe o produto no carrinho
        let position = cart.items.findIndex(x => x.produto.id==produto.id);
        if(position == -1){ // -1 -> Não existe
            cart.items.push({quantidade: 1, produto:produto});
        }
        this.storage.setCart(cart);
        return cart;
    }

    // excluir produto carrinho
    removeProduto(produto : ProdutoDTO) : Cart{
        let cart = this.getCart();
        // Verifica se existe o produto no carrinho
        let position = cart.items.findIndex(x => x.produto.id==produto.id);
        if(position!= -1){ // -1 -> Não existe
            cart.items.splice(position,1);
        }
        this.storage.setCart(cart);
        return cart;
    }

    // incluir quantidade
    incrementQuantity(produto : ProdutoDTO) : Cart{
        let cart = this.getCart();
        // Verifica se existe o produto no carrinho
        let position = cart.items.findIndex(x => x.produto.id==produto.id);
        if(position!= -1){ // -1 -> Não existe
            cart.items[position].quantidade++;
        }
        this.storage.setCart(cart);
        return cart;
    }

    // incluir quantidade
    decrementQuantity(produto : ProdutoDTO) : Cart{
        let cart = this.getCart();
        // Verifica se existe o produto no carrinho
        let position = cart.items.findIndex(x => x.produto.id==produto.id);
        if(position!= -1){ // -1 -> Não existe
            cart.items[position].quantidade--;
            if(cart.items[position].quantidade < 1){
                cart = this.removeProduto(produto); 
            }
        }
        this.storage.setCart(cart);
        return cart;
    }

    total(){
        let cart = this.getCart()
        let sum = 0;
        for(var i = 0; i<cart.items.length; i++){
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;
        }
        return sum;
    }

}