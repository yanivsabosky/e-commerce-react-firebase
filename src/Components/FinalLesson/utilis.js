import axios from "axios"

const users_url = "https://jsonplaceholder.typicode.com/users";
const todos_url = "https://jsonplaceholder.typicode.com/todos";

async function getAllUsers(){
    const data =  await axios.get(users_url)
    return data.data;
}

async function getTodos(id){
    const data  = await axios.get(`${todos_url}?userId=${id}`)
    return data.data.slice(0,3);
}

export {getAllUsers,getTodos};