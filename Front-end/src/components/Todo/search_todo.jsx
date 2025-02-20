import axios from "../../services/customAxios"

export default function SearchToDo({setListToDo, category}) {
    const handleInputSearch = async (e) => {
        try {
            let urlCate = ""
            if (category !== 0) {
                urlCate = `&cate_id=${category}`
            }
            let kw = e.target.value;
            const urlSearch = `/todo?kw=${kw}` + urlCate;
            console.log(urlSearch)
            const data = await axios.get(urlSearch)

            console.log('Tìm kiếm:', data)
            if (data) {
                setListToDo(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <input type="text" name="search-todo" id="search-todo" onChange={(e) => handleInputSearch(e)}/>
        </div>
    )
}