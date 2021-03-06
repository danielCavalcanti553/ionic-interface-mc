import { CidadeDTO } from "./cidade.dto";

export interface EnderecoDTO{
    id : string, 
    logradouro : string;
    numero: String;
    complemento : string;
    bairro : string;
    cep : string;
    cidade : CidadeDTO;
}