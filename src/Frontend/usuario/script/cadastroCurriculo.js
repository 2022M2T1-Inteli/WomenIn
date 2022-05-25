const addExperiencia = () => {
  $("#formacao").append(
    "<div class='inputs'><selectclass='form-select selectStyle'id='estado1'value='Estado'aria-label='Default select example'></select><select  class='form-select selectStyle'  id='cidade1'  value='Cidade'  aria-label='Default select example'></select><script language='JavaScript' type='text/javascript' charset='utf-8'>  new dgCidadesEstados({    cidade: document.getElementById('cidade1'),    estado: document.getElementById('estado1'),  });</script></div>"
  );
};
