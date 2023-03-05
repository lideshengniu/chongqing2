import { defineStore } from "pinia"
import { getForms, queryForms, addForms, deleteForms, addPhoto, updata } from "@/api/prospecting"
export default defineStore("prospecting", {
  state: () => {
    return {
      AllTableData: []
    }
  },
  actions: {
    async getform() {
      const Alldata = await getForms()
      Alldata.map((item) => {
        return Object.assign(item, { position: `[${item.centerLongitude},${item.centerLatitude}]` })
      })
      console.log(Alldata, "Alldata")
      this.AllTableData = Alldata
      return Alldata
    },
    async queryforms(id) {
      const Alldata = await queryForms(id)
      return Alldata
    },
    async addforms(data) {
      const Alldata = await addForms(data)
      console.log(Alldata, "all@@@@@@@@@@@@")
      return Alldata
    },
    async deleteforms(id) {
      const Alldata = await deleteForms(id)
      console.log(Alldata, "all")
      return Alldata
    },
    async addphote(file) {
      console.log("aaaa")
      const Alldata = await addPhoto(file)
      return Alldata
    },
    async updatas(data) {
      console.log("aaaa")
      const Alldata = await updata(data)
      return Alldata
    }
  }
})
