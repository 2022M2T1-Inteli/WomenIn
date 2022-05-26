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
        class="btn btn-warning"
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
  $("#formacao").append(
    "<div class='inputs'><selectclass='form-select selectStyle'id='estado1'value='Estado'aria-label='Default select example'></select><select  class='form-select selectStyle'  id='cidade1'  value='Cidade'  aria-label='Default select example'></select><script language='JavaScript' type='text/javascript' charset='utf-8'>  new dgCidadesEstados({    cidade: document.getElementById('cidade1'),    estado: document.getElementById('estado1'),  });</script></div>"
  );
};
