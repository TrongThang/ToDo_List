import moment from "moment"

export default function ContentAddEditToDo({ categories, handleChange, formData, errors }) {
    return (
        <form>
            <div class="mb-3">
                <input type="text" class="form-control" name="title" placeholder="Tiêu đề công việc..."
                    value={formData.title}
                    onChange={(e) => handleChange(e)}
                />
                {errors.title && <p className="text-danger mt-1 error-message">{errors.title}</p>}

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
                {errors.category_id && <p className="text-danger mt-1 error-message">{errors.category_id}</p>}
            </div>
            <div class="mb-3">
                <textarea class="form-control" name="content" placeholder="Mô tả..." style={{ height: "150px" }}
                    value={formData.content}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div class="mb-3 me-4">
                <label htmlFor="deadline me-1">⏰ Hẹn giờ</label>
                <input
                    type="datetime-local"
                    className="add-edit-datetime"
                    id="deadline" name="deadline"   
                    value={formData.deadline}
                    onChange={(e) => handleChange(e)}
                    min={moment().format("YYYY-MM-DD HH:mm")}
                />
                {errors.deadline && <p className="text-danger mt-1 error-message">{errors.deadline}</p>}
            </div>
        </form>
    )
}