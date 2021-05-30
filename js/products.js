let newItemModal = "";
let delItemModal = "";
let img = "https://picsum.photos/400";

const app = {
  data() {
    return {
      url: "https://vue3-course-api.hexschool.io",
      path: "onedog",
      isNew: false,
      products: [],
      tempProducts: {
        imagesUrl: [],
      },
    };
  },
  methods: {
    getData() {
      axios
        .get(`${this.url}/api/${this.path}/admin/products`)
        .then((res) => {
          //   console.log(res);
          this.products = res.data.products;
          console.log(this.products);
        })
        .catch((error) => console.log(error));
    },
    openModal(action, item) {
      if (action === "newItem") {
        this.isNew = true;
        this.tempProducts = { imagesUrl: [] };
        newItemModal.show();
      }
      if (action === "editItem") {
        this.isNew = false;
        this.tempProducts = { ...item };
        newItemModal.show();
      }
      if (action === "delItem") {
        this.tempProducts.id = item;
        console.log(item);
        delItemModal.show();
      }
    },
    addItem() {
      let url = `${this.url}/api/${this.path}/admin/product`;
      let http = "post";

      if (!this.isNew) {
        url = `${this.url}/api/${this.path}/admin/product/${this.tempProducts.id}`;
        http = "put";
      }

      axios[http](url, { data: this.tempProducts })
        .then((res) => {
          // console.log(res);
          if (res.data.success) {
            alert(res.data.message);
            this.getData();
            // this.tempProducts = {};
          } else {
            console.log(res.data.message);
            alert(res.data.message);
          }
          newItemModal.hide();
        })
        .catch((error) => console.log(error));
    },
    addImg() {
      // this.tempProducts.imagesUrl = [];
      this.tempProducts.imagesUrl.push("");
      // this.tempProducts.imagesUrl.push(this.tempProducts.imagesUrl);
    },
    autoImg() {
      this.tempProducts.imageUrl = "https://picsum.photos/400";
      this.tempProducts.imagesUrl.push("https://picsum.photos/399");
    },
    delItem() {
      axios
        .delete(
          `${this.url}/api/${this.path}/admin/product/${this.tempProducts.id}`
        )
        .then((res) => {
          if (res.data.success) {
            this.getData();
            this.tempProducts = {};
          } else {
            console.log(res.data.message);
            alert(res.data.message);
          }
          delItemModal.hide();
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    newItemModal = new bootstrap.Modal(document.getElementById("productModal"));
    delItemModal = new bootstrap.Modal(
      document.getElementById("delProductModal")
    );
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (token == "") {
      alert("您尚未登入，請重新登入");
      window.location = "index.html";
    }
    axios.defaults.headers.common["Authorization"] = token;
    this.getData();
  },
};

Vue.createApp(app).mount("#app");
