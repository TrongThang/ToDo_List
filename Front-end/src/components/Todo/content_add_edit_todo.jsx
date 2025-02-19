export default function ContentAddEditToDo({ categories, handleChange, formData }) {
    console.log('deadline:', formData.deadline)
    return (
        <form>
            <div class="mb-3">
                <input type="text" class="form-control" name="title" placeholder="Tiêu đề công việc..."
                    value={formData.title}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div class="mb-3">
                <select id="cate_id" name="category_id"
                    className="form-select col-4 w-75"
                    onChange={(e) => handleChange(e)}
                    value={formData.category_id}
                >
                    <option value="0"> - Chọn danh mục - </option>
                    {categories.map((item, index) => {
                        return (
                            <option key={index} value={item.id}>{item.name}</option>
                        )
                    })}
                </select>
            </div>
            <div class="mb-3">
                <textarea class="form-control" name="content" placeholder="Mô tả..." style={{ height: "150px" }}
                    value={formData.content}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div class="mb-3">
                <label for="deadline">⏰</label>
                <input
                    type="datetime-local"
                    id="deadline" name="deadline"   
                    value={formData.deadline}
                    onChange={(e) => handleChange(e)}
                />
            </div>
        </form>
    )
}