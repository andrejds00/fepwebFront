import { AddressModel } from "./address.model"

export interface ClientModel {
    id?: number
    codExterno?: number
    nome: string
    cpfCnpj: string
    documento?: string
    email?: string
    sexo?: string
    estadoCivil?: string
    telefone1?: string
    telefone2?: string
    dataNascimento?: Date  
    ativa?: boolean 
    dataCadastro?: Date
    endereco?: AddressModel
}