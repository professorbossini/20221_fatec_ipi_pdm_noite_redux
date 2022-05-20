//arrow function
//nome: criarContrato
//recebe: nome e valor
//devolve: um JSON com type = CRIAR_CONTRATO e payload igual a um JSON com nome e valor
const criarContato = (nome, valor) => {
    return {
        type: "CRIAR_CONTRATO",
        payload: {
            nome, valor
        }
    }
}
//function regular (usar function)
//cancelarContrato
//recebe: nome
//devolve: um JSON com type = CANCELAR_CONTRATO e payload igual a um JSON com nome
function cancelarContrato (nome){
    return {
        type: "CANCELAR_CONTRATO",
        payload: {
            nome
        }
    }
}
//uma função criadora de ação para solicitações de cashback
const solicitarCashback = (nome, valor) => {
    return {
        type: "SOLICITAR_CASHBACK",
        payload: {nome, valor}
    }
}
