var hospede = {
	"pessoa": {
		"nome": "Fulano",
		"documento": "123456",
		"telefone": "99123 4567"
	},
	"dataEntrada": "2018-03-14T08:00:00",
	"dataSaida": "2018-03-16T10:17:00",
	"adicionalVeiculo": true
}

console.log(hospede);

var saida = document.getElementById('saida');

saida.innerHTML = hospede.pessoa.nome +' '+ hospede.dataEntrada;