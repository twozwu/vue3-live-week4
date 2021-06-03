export default {
  template: "#pagination",
  props: ["pages"],
  methods: {
    emitPage(page) {
      this.$emit("emit-page", page); //傳送要點擊的頁數
    },
  },
};
// "total_pages": 1,
// "current_page": 1,
// "has_pre": false,
// "has_next": false,
// "category": null
