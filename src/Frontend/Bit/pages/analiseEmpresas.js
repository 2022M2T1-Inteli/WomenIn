const getInfo = async () => {
  infos = { id: userId };
  console.log(JSON.stringify(infos));
  const parameters = {
    method: "POST",
    body: JSON.stringify(infos),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    "http://127.0.0.1:3030/api/getEmpresasEmAnalise",
    parameters
  );
  const data = await response.json();
  return data;
};

getInfo().then((res) => {

});
