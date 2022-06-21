# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="https://www.inteli.edu.br/wp-content/uploads/2021/08/20172028/marca_1-2.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>

# BIT Match

## WomenIn

## Integrantes: 
- <a href="https://www.linkedin.com/in/victorbarq/">Ariel </a>
- <a href="https://www.linkedin.com/in/victorbarq/">Cristiane Andrade</a>
- <a href="https://www.linkedin.com/in/victorbarq/">Daniel Cunha</a> 
- <a href="https://www.linkedin.com/in/victorbarq/">Lívia Coutinho</a> 
- <a href="https://www.linkedin.com/in/victorbarq/">Luiz Alencar</a>
- <a href="https://www.linkedin.com/in/victorbarq/">Paulo Evangelista</a> 

## 📝 Descrição

Mulheres são mais seletivas ao se candidatar a vagas de emprego, boa parte dessas mulheres acreditam que não cumprem 100% dos requisitos solicitados pela empresa e por isso acabam abandonando a candidatura. Para diminuir essas percepções, foi proposto ao grupo uma aplicação web voltada para mulheres que querem encontrar um emprego na área de tecnologia. A solução propõem às usuárias o cadastramento de seu curriculo e suas softskills e apartir dessas softskills é feito um match com as vagas disponiveis que se adequem ao perfil da candidata, eliminando assim a percepção de que a usuária deve atender à 100% dos requisitos. Outro requisito é a padronização de nome das vagas, dando a possibilidade que não exista mais de um nome para uma vaga.
A solução propõe às usuárias o cadastramento de seu curriculo e suas softskills e a partir dessas softskills é feito um match com as vagas disponiveis que se adequem ao perfil da candidata, eliminando assim a percepção de que a usuária deve atender à 100% dos requisitos.


## 📁 Estrutura de pastas

```
Alunos inteli (remover essa observação do readme.md após leitura e execução):

Supondo que você é da Turma 4 e Projeto 5, substitua:

T(NUMERO_DA_TURMA)_G(NUMERO_DO_GRUPO)_V(VERSÃO)_Web_application_document.pdf
por
T4_G5_V01_Web_application_document.pdf

Faça o mesmo para a documentação em formato DOCX.
```

|--> documentos<br>
  &emsp;| --> outros <br>
  &emsp;| T(NUMERO_DA_TURMA)_G(NUMERO_DO_GRUPO)_V(VERSÃO)_Web_application_document.pdf<br>
  &emsp;| T(NUMERO_DA_TURMA)_G(NUMERO_DO_GRUPO)_V(VERSÃO)_Web_application_document.docx<br>
|--> imagens<br>
|--> src<br>
  &emsp;|--> Backend<br>
  &emsp;|--> Frontend<br>
| readme.md<br>
| license.txt

Dentre os arquivos presentes na raiz do projeto, definem-se:

- <b>readme.md</b>: arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

- <b>documentos</b>: aqui estarão todos os documentos do projeto. Há também uma pasta denominada <b>outros</b> onde estão presentes aqueles documentos complementares ao <b>web application document</b>.

- <b>imagens</b>: imagens relacionadas ao projeto como um todo (por exemplo imagens do sistema, do grupo, logotipos e afins).

- <b>src</b>: nesta pasta encontra-se todo o código fonte do sistema (existem duas subpastas <b>backend</b> e <b>frontend</b> que contêm, respectivamente, o código do servidor e o código da página web).

## 💻 Configuração para desenvolvimento

Aqui encontram-se todas as instruções necessárias para a instalação de todos os programas, bibliotecas e ferramentas imprescindíveis para a configuração do ambiente de desenvolvimento.

1.  Baixar e instalar o node.js:  [https://nodejs.org/pt-br/](https://nodejs.org/pt-br/) (versão 16.15.1 LTS)
2. Clone o repositório em questão.
3.  No modo administrador, abra o "prompt de comando" ou o "terminal" e, após,  abra a pasta "src/backend" no diretório raiz do repositório clonado e digite o segundo comando:

```sh
npm install
```

Isso instalará todas as dependências definidas no arquivo <b>package.json</b> que são necessárias para rodar o projeto. Agora o projeto já está pronto para ser modificado. Caso ainda deseje iniciar a aplicação, digite o comando abaixo no terminal:

```sh
npm start
```
5. Agora você pode acessar a aplicação através do link http://localhost:1234/
6. O servidor está online.


```
Alunos inteli (remover essa observação do readme.md após leitura e execução):

1. Certifique-se que há um arquivo "package.json" na pasta backend do projeto.

2. Dentro deste arquivo, encontre a propriedade "scripts", e adicione um atributo de nome "start"
com o valor "node <CAMINHO_DO_ARQUIVO_DO_SERVIDOR>." Atenção: "<CAMINHO_DO_ARQUIVO_DO_SERVIDOR>" 
deve ser substituído pelo caminho para o arquivo principal da aplicação, utilizado para subir o
servidor. Por exemplo, se o arquivo utilizado para subir o servidor é "app.js", o atributo start
deve possuir o valor "node app.js".

3. No arquivo utilizado para subir a aplicação, defina a porta padrão de execução para "1234".
````

## 🗃 Histórico de lançamentos

* 0.5.2 - 20/06/2022
    * Alterações no estilo de páginas da empresa e da usuária.
* 0.5.1 - 17/06/2022
    * Correção de erros na responsividade da página.
* 0.5.0 - 14/06/2022
    * Correção em direcionamentos de páginas.
* 0.4.2 - 10/06/2022
    * Entrega da integração do sistema.
* 0.4.1 - 07/06/2022
    * Integração das Soft Skills.
* 0.4.0 - 30/05/2022
    * Início da integração do Back-End com o Front-End.
* 0.3.1 - 27/06/2022
    * Entrega da primeira versão do Back-End com implementação de NodeJs e banco de dados.
* 0.3.0 - 16/05/2022
    * Início da implementação do javascript no projeto.
* 0.2.1 - 13/05/2022
    * Entrega da primeira versão do Front-End.
* 0.2.0 - 04/05/2022
    * Ínicio do design do Front-End.
    
* 0.1.1 - 29/04/2022
    * Preenchimento do WAD: Personas, Análise do Mercado, Análise SWOT, Descrição da Solução, Proposta de Valor e Matriz de Risco.
* 0.1.0 - 22/04/2022
    * Criação do WAD
    
* 0.0.1 - 18/04/2022
    * Início do desenvolvimento do projeto.

## 📋 Licença/License

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Spidus/Teste_Final_1">MODELO GIT INTELI</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.yggbrasil.com.br/vr">Inteli, Nome do integrante 1, Nome do integrante 2, Nome do integrante 3, Nome do integrante 4, Nome do integrante 5, Nome do integrante 6, Nome do integrante 7</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>

## 🎓 Referências

Aqui estão as referências usadas no projeto:

1. <https://creativecommons.org/share-your-work/>
