import { useEffect, useState } from "react"
import MenuCategory from "./menuCategory";
import ItemToDo from "./item_todo";
import axios from "../../services/customAxios";
import ButtonModal from "../button_modal"
import ModalAddEditToDo from "./modal_add_edit_todo";
import CategoryModalAddEdit from "../Category/category_modal_add_edit";
import CategoryBackground from "./categoryBackground";
import SearchToDo from "./search_todo";

const {
    fetchAllToDo
} = require('../../services/ToDoServices')

export default function TableToDo() {
    // const [listToDo, setListToDo] = useState([]);
    const [categories, setCategories] = useState([]);
    const [allCate, setAlLCate] = useState([]);
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

        // if (name === 'cate_id') {
        //     setCategory(value);
        //     console.log('cate:', value)
        // }
    };

    const fetchData = async () => {
        try {
            let urlCate = `/category` + (Number(category) != 0 ? '?id=' + category : '');
            console.log(urlCate)
            const data = await axios.get(urlCate)

            const allCate = await axios.get("/category")
            // setListToDo(data)
            setCategories(data)
            setAlLCate(allCate)
            console.log('Dữ liệu sau khi fetch:', data)
            let totalFinished = data.reduce((acc, category) => 
                acc + category.todos.filter(todo => todo.active).length, 0
            );

            let totalTodos = data.reduce((acc, category) => acc + category.todos.length, 0);


            setReport({
                finished: totalFinished,
                total: totalTodos,
            })

            console.log("Số todo đã hoàn thành:", totalFinished);
            console.log("Tổng số todo:", totalTodos);
        } catch (error) {
            console.log("Lỗi:", error)
        }
    }

    useEffect(() => {
        if (category !== null) {
            fetchData();
        }
    }, [category])

    if (!categories) {
        return
    }

    const progressPercentage = (report.finished / report.total) * 100;

    return (
        <>
            <div className="container-todo mb-3 mt-3">
                <div className="stats-container">
                    <div className="detail-todo" >
                        <h1 className="text-light">Hoàn Thành</h1>
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
                        <div className="mb-2" id="numbers">
                            {report.finished} / {report.total}
                        </div>
                    </div>
                </div>
                <div className="ms-5">
                    <MenuCategory
                        allCate={allCate}
                        category={category}
                        setCategory={setCategory}
                        handleChange={handleChange}
                    />
                    <SearchToDo setCategories={setCategories} category={category} />
                    </div>
            </div>
            <div className="container mb-5" style={{padding: "0px"}}>
                {/* Khu vực Danh sách ToDo và Menu */}                    
                <ModalAddEditToDo
                    target="ToDoModal"
                    title="Thêm Công Việc"
                    action="Thêm"
                    categories={categories}
                    fetchData={fetchData}
                    todo_id={todoEdit}
                    setTodoEdit={setTodoEdit}
                />

                <CategoryModalAddEdit fetchData={fetchData} categories={categories} />

                {/* DANH SÁCH CATEGORY VÀ TO DO LIST */}
                <div className="row col-12 ms-2">
                    {categories.map((item, index) => {
                        return(
                            <div className="col-lg-3 col-sm-12 col-md-6" style={{maxWidth: "350px"}}>
                                <CategoryBackground
                                    categories={categories}
                                    fetchData={fetchData}
                                    setTodoEdit={setTodoEdit}
                                    setReport={setReport}
                                    report={report}
                                    categoryCurrent={item}
                                />
                            </div>)
                        })}
                </div>
            </div>
            
        </>
    )
}