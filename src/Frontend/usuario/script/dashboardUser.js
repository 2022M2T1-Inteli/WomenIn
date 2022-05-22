let userId = document.cookie.split("=")[1];
console.log(userId);
const getInfo = async () => {
  const response = await fetch("http://127.0.0.1:3030/api/getUserInfo");
  const data = await response.json();
  return data;
};

getInfo().then((res) => {
  console.log(res);
  document.querySelector("#username").textContent = res.name;
});
