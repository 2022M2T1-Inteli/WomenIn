const addFormacao = () => {
  $("#novaFormacao").append(
    `
    <div style="margin:20px">
    <h1 id="formacao" style="margin:20px">Formação</h1>
    <div class="inputs">
      <input placeholder="Formação" type="text" />
      <input placeholder="Universidade" type="text" />
      <div class="data">
        <p>
          Data de entrada:
          <input
            class="datecolor"
            type="date"
            placeholder="Duração"
            type="text"
          />
        </p>
        <p>
          Data de saída:
          <input type="date" placeholder="Duração" type="text" />
        </p>
      </div>
      <button
        type="button"
        id="newFormacao"
        class="hover btn btn-warning"
        onclick="addFormacao()"
      >
        Adicionar Formação
      </button>
    </div>
    </div>
    `
  );
};

const addExperiencia = () => {
  $("#novaExperiencia").append(
    `
    <div style="margin:20px">
    <h1 id="experiencia" style="margin:20px">Experiência</h1>
      <div class="inputs">
        <input placeholder="Cargo/Posição" type="text" />
        <input placeholder="Empresa" type="text" />
        <div class="data">
          <p>
            Data de entrada:
            <input
              class="datecolor"
              type="date"
              placeholder="Duração"
              type="text"
            />
          </p>
          <p>
            Data de saída:
            <input type="date" placeholder="Duração" type="text" />
          </p>
        </div>
        <input placeholder="Endereço" type="text" />
        <input type="" placeholder="Hábilidades" type="text" />
        <select
          class="form-select selectStyle"
          aria-label="Default select example"
        >
          <option selected aria-label="Disabled select example">Tipo</option>
          <option value="1">Estágio</option>
          <option value="2">Trabalho voluntário</option>
          <option value="3">Iniciação Cientifica</option>
          <option value="4">Efetivo</option>
        </select>
        <button onclick="addExperiencia()" type="button" class="hover btn btn-warning">
          Adicionar experiência
        </button>
      </div>
    </div>
    `
  );
};