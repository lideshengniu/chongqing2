import { createPinia } from "pinia"
import type { App } from "vue"
import useForm from "./modules/Forms"
import useForms from "./modules/SurveyFormtable"
const store = createPinia()
export default function useStore() {
  return {
    useForm: useForm(),
    useForms: useForms()
  }
}
