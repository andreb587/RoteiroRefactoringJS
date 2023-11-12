const { readFileSync } = require('fs');

var Repositorio = require("./repositorio.js");
var ServicoCalculoFatura = require("./servico.js") ;
var formatarMoeda = require("./util.js") ;
const calc = new ServicoCalculoFatura(new Repositorio());


module.exports = function gerarFaturaStr (fatura) {
    let faturaStr = `Fatura ${fatura.cliente}\n`;
    for (let apre of fatura.apresentacoes) {
        faturaStr += `  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
    }
    faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))}\n`;
    faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)} \n`;
    return faturaStr;
    }
  