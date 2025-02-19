import { useEffect, useState } from "react"
import MenuCategory from "./menuCategory";
import ItemToDo from "./item_todo";
import axios from "../../services/customAxios";
import ButtonModal from "../button_modal"
import ModalAddEditToDo from "./modal_add_edit_todo";
import CategoryModalAddEdit from "../Category/category_modal_add_edit";

const {
    fetchAllToDo
} = require('../../services/ToDoServices')

export default function TableToDo() {
    const [listToDo, setListToDo] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(0);
    const [todoEdit, setTodoEdit] = useState(null);
    const [report, setReport] = useState({
        finished: 0,
        total: 0
    })

    const [formData, setFormData] = useState({
        "id": '',
        "title": '',
        "content": '',
        "created_date": '',
        "deadline": '',
        "active": '',
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'cate_id') {
            setCategory(value);
            console.log('cate:', value)
        }
        console.log('Form data thay đổi: ', formData)
    };

    const fetchData = async () => {
        try {
            const cate_id = formData.cate_id;
            let urlCate = `/todo` + (category ? '?cate_id=' + category : '');
            console.log(urlCate)
            const data = await axios.get(urlCate)

            const dataCate = await axios.get("/category")
            console.log("categories:", dataCate)
            setListToDo(data)
            setCategories(dataCate)
            
            let totalFinished = data.reduce((acc, todo) => todo.active === true ? acc + 1 : acc, 0)
                
            setReport({
                finished: totalFinished,
                total: data.length
            })

        } catch (error) {
            console.log("Lỗi:", error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [category])

    if (!listToDo) {
        return
    }

    const progressPercentage = (report.finished / report.total) * 100;

    return (
        <>
            <div className="container-todo">
                <div className="stats-container">
                    <div className="detail-todo" >
                        <h1>Hoàn Thành</h1>
                        <div id="progressBar" style={{backgroundColor: "#DCD7C9", borderRadius:"20px"}}> 
                            <div id="progress" style={{ width: `${progressPercentage}%`}} ></div>
                        </div>
                        <ButtonModal
                            target="ToDoModal"
                            title="Thêm Công Việc"
                            color="success"
                            action="add"
                        />
                        <ButtonModal
                            target="CateModal"
                            title="Thêm Danh Mục"
                            action="add"
                            color='warning'
                        />

                    </div>
                    <div className="stats-numbers">
                        <p id="numbers"> {report.finished} / {report.total}</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                </div>

                {/* Khu vực Danh sách ToDo và Menu */}
                <div className="col-7">
                    
                    <ModalAddEditToDo
                        target="ToDoModal"
                        title="Thêm Công Việc"
                        action="Thêm"
                        categories={categories}
                        fetchData={fetchData}
                        todo_id={todoEdit}
                    />

                    <CategoryModalAddEdit fetchData={fetchData} categories={categories} />
                    <div>
                        {listToDo.map((item, index) => (
                            <ItemToDo
                                key={index}
                                todo={item}
                                index={index}
                                categories={categories}
                                fetchData={fetchData}
                                setTodoEdit={setTodoEdit}
                                setReport={setReport}
                                report={report}
                            />
                        ))}
                    </div>
                </div>

                {/* Khu vực Lọc */}
                <div className="col-2">
                    <div className="mt-2">
                        <MenuCategory
                            categories={categories}
                            category={category}
                            setCategory={setCategory}
                            handleChange={handleChange}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}