export default function MenuCategory({ categories, category, setCategory, handleChange }) {
    const handleChangeCategory = (e) => {
        handleChange(e)
    }
    return (
        <select id="cate_id" name="cate_id"
            className="form-select col-4 w-75"
            value={category}
            onChange={e => handleChangeCategory(e)}
        >
            <option value=""> Tất cả </option>
            {categories.map((item, index) => {
            return (
                <option key={index} value={item.id}>{ item.name }</option>
                )
            })}
        </select>
    )
}