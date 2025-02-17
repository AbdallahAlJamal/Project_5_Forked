import axios from "axios"

export const categoriesLoader = async () => {
    const result = axios.get("http://localhost:5000/products/category")
        .then(res => {

            return res.data.result
        })
    return { result }
}