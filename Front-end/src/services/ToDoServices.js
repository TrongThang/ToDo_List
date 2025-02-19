import axios from "./customAxios"

async function fetchAllToDo () {
    console.log(123)
    const data = await axios.get("/todo")

    console.log(data)
    return data
}

const ValidationToDo = async (category_id = false, deadline = false, ) => {
    
    
}

const deleteToDo = async (todo_id) => {
    try {
        const data = await axios.delete("/todo", {
            todo_id: todo_id
        })

        return data
    } catch (error) {
        console.log(error.message)
    }
}

module.export = {
    fetchAllToDo, deleteToDo
}