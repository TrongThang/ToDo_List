export default function MenuCategory({ allCate, category, setCategory }) {
    const handleChangeCategory = (e) => {
        const value = e.target.value;
        if (value <= 0) {
            setCategory(null)
        }
        setCategory(e.target.value);
    }
    return (
        <select id="cate_id" name="cate_id"
            className="form-select col-4 w-75"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        >
            <option value={0}> Tất cả </option>
            {allCate.map((item, index) => {
            return (
                <option key={index} value={item.id}>{ item.name }</option>
                )
            })}
        </select>
    )
}