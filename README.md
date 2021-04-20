# Mini-artigo
Mini artigo sobre linter em Phyton

# Código
Para rodar o código basta começar pelo comando:
- node ./utils/repositories.js
- Esse comando vai buscar os 1000 repositórios em primeiro lugar com menos de 200000 estrelas e mais de 100. O resultado será mostrado no arquivo "repositories_1000.json".

Depois rodar o comando: 
- node ./utils/organized.js
- Esse comando vai tirar informações que não serão usadas e organizam os dados necessários no arquivo "repositories_organized_1000.json".

Depois rodar o comando: 
- node ./utils/updateHasLint.js
- Esse comando vai atualizar o atributo _hasLint_ dos dados organizados chamando o endpoint da busca de linters para cada repositório da lista. Armazena o resultado no arquivo "repositories_organized_and_evaluated_1000.json".

Depois rodar o comando: 
- node ./utils/group.js
- Esse comando vai gerar o resultado final com os grupos do ranking e armazenar o resultado no arquivo "repositories_grouped.json".
