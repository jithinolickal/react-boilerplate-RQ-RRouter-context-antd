import axios from "axios"

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  // any other settings
})

export default apiClient
