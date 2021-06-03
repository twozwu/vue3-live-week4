let newItemModal = "";
let delItemModal = "";
let img = "https://picsum.photos/400";
const url = "https://vue3-course-api.hexschool.io";
const path = "onedog";

const app = Vue.createApp({
  data() {
    return {
      isNew: false,
      title: "",
      products: [],
      tempProducts: {
        imagesUrl: [],
      },
      pagination: {},
    };
  },
  methods: {
    getData(page = 1) {
      axios
        .get(`${url}/api/${path}/admin/products?page=${page}`)
        .then((res) => {
          //   console.log(res);
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          console.log(this.products);
        })
        .catch((error) => console.log(error));
    },
    openModal(action, item) {
      if (action === "newItem") {
        this.isNew = true;
        this.title = "新增產品";
        this.tempProducts = { imagesUrl: [] };
        newItemModal.show();
      }
      if (action === "editItem") {
        this.isNew = false;
        this.title = "編輯產品";
        this.tempProducts = { ...item };
        newItemModal.show();
      }
      if (action === "delItem") {
        this.tempProducts.id = item;
        console.log(item);
        delItemModal.show();
      }
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
});
// "total_pages": 1,
// "current_page": 1,
// "has_pre": false,
// "has_next": false,
// "category": null
app.component("pagination", {
  template: "#pagination",
  props: ["pages"],
  methods: {
    emitPage(page) {
      this.$emit("emit-page", page); //傳送要點擊的頁數
    },
  },
});

app.component("product-modal", {
  template: "#productModal",
  props: {
    products: {
      type: Object,
      default() {
        return {
          imagesUrl: [],
        };
      },
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    title: "",
  },
  methods: {
    addItem() {
      let api = `${url}/api/${path}/admin/product`;
      let http = "post";

      if (!this.isNew) {
        api = `${url}/api/${path}/admin/product/${this.products.id}`;
        http = "put";
      }

      axios[http](api, { data: this.products })
        .then((res) => {
          // console.log(res);
          if (res.data.success) {
            alert(res.data.message);
            this.$emit("update");
          } else {
            console.log(res.data.message);
            alert(res.data.message);
          }
          newItemModal.hide();
        })
        .catch((error) => console.log(error));
    },
    addImg() {
      this.products.imagesUrl.push("");
    },
    autoImg() {
      this.products.imageUrl = "https://picsum.photos/400";
      this.products.imagesUrl.push("https://picsum.photos/399");
    },
  },
  mounted() {
    console.log("已建立");
  },
});

app.component("del-product-modal", {
  template: "#delProductModal",
  props: {
    products: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    delItem() {
      axios
        .delete(`${url}/api/${path}/admin/product/${this.products.id}`)
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
            this.$emit("update");
            this.products = {};
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
    console.log("刪除元件已建立");
  },
});

app.mount("#app");
