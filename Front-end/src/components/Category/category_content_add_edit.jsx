import axios from "../../services/customAxios"
import ItemCategory from "./item_category"

export default function CategoryContentAddEdit({ formData, categories, handleChange, fetchData, setCateEdit }) {

    return (
        <>
            {/* Change Data */}
            <div className="row">
                <div className="col-12">
                    <div class="mb-3">
                        <input type="text" class="form-control" name="name" placeholder="Tên mục của công việc..."
                            value={formData.name}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>
            </div>
            {/* List Cate Current */}
            <div className="row">
                <div className="col-12">
                    {categories.map((item, index) => {
                        return (
                            <ItemCategory id={item.id} name={item.name} fetchData={fetchData} key={index} setCateEdit={setCateEdit} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}