const Redux = require ('redux')
const { createStore, combineReducers } = Redux
//arrow function
//nome: criarContrato
//recebe: nome e valor
//devolve: um JSON com type = CRIAR_CONTRATO e payload igual a um JSON com nome e valor
const criarContrato = (nome, valor) => {
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

//arrow function
//historicoDePedidosCashbackReducer
//recebe uma fatia de estado sobre a qual operar (uma lista chamada historicoDePedidosCashback. Por padrão, ela é uma lista vazia)
//recebe uma acao
//devolve: uma lista que contém todos os pedidos da lista recebida e o pedido descrito no payload da ação
//detalhe: somente operar no estado se o type for apropriado
//detalhe2: obrigatório usar o spread (...)
const historicoDePedidosCashbackReducer = (historicoDePedidosCashback = [], acao) => {
    if (acao.type === "SOLICITAR_CASHBACK"){
        return [
            ...historicoDePedidosCashback, acao.payload
        ]
    }
    return historicoDePedidosCashback  
}
//implementar o reducer que manipula o caixa
//o caixa começa zerado
function caixaReducer(valorEmCaixa = 0, acao){
    if (acao.type === "SOLICITAR_CASHBACK")
        return valorEmCaixa - acao.payload.valor
    if (acao.type === "CRIAR_CONTRATO")
        return valorEmCaixa + acao.payload.valor
    return valorEmCaixa
}
//implementar o reducer que lida com a lista de contratos
//ele pode criar contratos e cancelar contratos
const contratosReducer = (listaDeContratosAtual = [], acao) => {
    if (acao.type === "CRIAR_CONTRATO"){
        return [
            ...listaDeContratosAtual,
            acao.payload
        ]
    }
    if (acao.type === "CANCELAR_CONTRATO"){
        return listaDeContratosAtual.filter(contrato => contrato.nome !== acao.payload.nome)
    }
    return listaDeContratosAtual
}

const todosOsReducers = combineReducers({
    historicoDePedidosCashback: historicoDePedidosCashbackReducer,
    caixa: caixaReducer,
    contratos: contratosReducer
})

const store = createStore(todosOsReducers)

//criar um contrato para o José
const acaoContratoJose = criarContrato('José', 50)
console.log(store.getState())
store.dispatch(acaoContratoJose)
console.log(store.getState())
//criar um contrato para a Maria
const acaoContratoMaria = criarContrato('Maria', 50)
store.dispatch(acaoContratoMaria)
console.log(store.getState())

//pedido de cashback para a Maria de 10
const acaoCashbackMaria = solicitarCashback('Maria', 10)
store.dispatch(acaoCashbackMaria)
console.log(store.getState())

//pedido de cashback para o José de 20
store.dispatch(solicitarCashback('José', 20))
console.log(store.getState())
//cancelar o contrato da Maria
store.dispatch(cancelarContrato('Maria'))
console.log(store.getState())






