import { EstadoDTO } from "./estado.dto";

export interface CidadeDTO{
    id : string;
    nome : string;
    estado? : EstadoDTO;
    // Buscar somente as cidades sem estar anexado
}