import { defineStore } from "pinia"
export default defineStore("users", {
  state: () => {
    return {
   form: [],
   find: []
    }
  },
  actions: {
   AddData(data) {
     this.form.push(data)
   },
   findData(data) {
    this.find.push(data)
   }
  }
})
