import axios from "../../services/customAxios"

export default function SearchToDo({setCategories, category}) {
    const handleInputSearch = async (e) => {
        try {
            let urlSearch = "";
            let kw_todo = e.target.value;

            if (category && category !== 0) {
                urlSearch += `?id=${category}`;
            }

            if (kw_todo) {
                let keyword = e.target.value.trim();
                if (keyword) {
                    urlSearch += urlSearch ? `&kw_todo=${encodeURIComponent(keyword)}` : `?kw_todo=${encodeURIComponent(keyword)}`;
                }
            }

            // const urlSearch = `/category?kw_todo=${kw_todo}` + urlCate;
            console.log("http://127.0.0.1:5000/category", urlSearch)
            const data = await axios.get(`/category${urlSearch}`)

            console.log('Tìm kiếm:', data)
            if (data) {
                setCategories(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <input
                type="text"
                className="form-control mt-2"
                name="search-todo"
                id="search-todo"
                placeholder="Tìm kiếm..."
                onChange={(e) => handleInputSearch(e)}
            />
        </div>
    )
}