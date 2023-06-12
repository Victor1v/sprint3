const url = "empresas.json";
const xhr = new XMLHttpRequest();

const reputacaoValor = {
	ÓTIMO: 4,
	BOM: 3,
	REGULAR: 2,
	RUIM: 1,
};

xhr.onreadystatechange = function () {
	if (xhr.readyState === XMLHttpRequest.DONE) {
		if (xhr.status === 200) {
			const empresas = JSON.parse(xhr.responseText).empresas;
			empresas.sort((a, b) => {
				const reputacaoA = reputacaoValor[a.reputacao];
				const reputacaoB = reputacaoValor[b.reputacao];
				if (reputacaoA < reputacaoB) {
					return 1;
				}
				if (reputacaoA > reputacaoB) {
					return -1;
				}
				if (a.nome < b.nome) {
					return -1;
				}
				if (a.nome > b.nome) {
					return 1;
				}
				return 0;
			});
			const tabela = document.getElementById("empresas");
			empresas.forEach((empresa) => {
				const linha = document.createElement("tr");
				const nome = document.createElement("td");
				nome.textContent = empresa.nome;
				
				const reputacao = document.createElement("td");

				reputacao.textContent = empresa.reputacao;
				reputacao.className = `reputacao ${empresa.reputacao.toLowerCase()}`;

				const reputacaoImg = document.createElement("img");
				reputacaoImg.src = "img/" + empresa.reputacao.toLowerCase() + ".png";
				reputacaoImg.alt = empresa.reputacao;
				reputacaoImg.style.width = "20px";
				reputacaoImg.style.height = "20px";
				reputacaoImg.style.marginLeft = "4px";
				reputacaoImg.classList.add(`reputacao-${empresa.reputacao.toLowerCase()}`);

				reputacao.appendChild(reputacaoImg);
				linha.appendChild(nome);
				linha.appendChild(reputacao);
				tabela.appendChild(linha);
			});
		} else {
			console.error(xhr.statusText);
		}
	}
};

xhr.open("GET", url);
xhr.send();
