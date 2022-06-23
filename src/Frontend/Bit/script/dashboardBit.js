const getTotalOfCompany = async () => {
  const response = await fetch("http://127.0.0.1:3030/api/getTotalOfCompany");
  const data = await response.json();
  return data;
};

getTotalOfCompany().then((res) => {
  const companyTot = Object.values(res)[0];
  $("#companyTot").append(`${companyTot}`);
});

const getTotalOfCompanyInAnalisys = async () => {
  const response = await fetch(
    "http://127.0.0.1:3030/api/getTotalOfCompanyInAnalisys"
  );
  const data = await response.json();
  return data;
};

getTotalOfCompanyInAnalisys().then((res) => {
  const companyTot = Object.values(res)[0];
  $("#companyInAnalysisTot").append(`${companyTot}`);
});

const getTotalOfUsers = async () => {
  const response = await fetch("http://127.0.0.1:3030/api/getTotalOfUsers");
  const data = await response.json();
  return data;
};

getTotalOfUsers().then((res) => {
  const usersTot = Object.values(res)[0];
  $("#totalOfUsers").append(`${usersTot}`);
});

const getTotalOfJobs = async () => {
  const response = await fetch("http://127.0.0.1:3030/api/getTotalOfJobs");
  const data = await response.json();
  return data;
};

getTotalOfJobs().then((res) => {
  const jobsTot = Object.values(res)[0];
  $("#totalOfJobs").append(`${jobsTot}`);
});
