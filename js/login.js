const emailInput = document.querySelector("#email");
const pwInput = document.querySelector("#password");
const checkBtn = document.querySelector("#check");
const getProductsBtn = document.querySelector("#getProducts");
const addProductBtn = document.querySelector("#addProduct");

const url = "https://vue3-course-api.hexschool.io";

function login() {
  const username = emailInput.value.trim();
  const password = pwInput.value;
  const user = { username, password };
  // console.log(user);
  axios
    .post(`${url}/admin/signin`, user) //請求的方法
    .then((res) => {
      if (res.data.success == true) {
        const { token, expired } = res.data;
        console.log(token, expired);
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
        window.location = "products.html";
      } else {
        alert("帳號或密碼錯誤");
      }
    })
    .catch((error) => {
      console.dir(error);
    });
  return false;
}
