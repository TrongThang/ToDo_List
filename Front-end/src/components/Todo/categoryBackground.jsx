import ButtonModal from "../button_modal";
import ItemToDo from "./item_todo";

export default function CategoryBackground({ categories, setCategories, fetchData, setTodoEdit, setReport, report, categoryCurrent }) {
    const updateCategories = (todo, newCateId) => {
        setCategories(prevCategories => {
            return prevCategories.map(category => {
                if (category.id === todo.category) {
                    // Xóa todo khỏi category cũ
                    return {
                        ...category,
                        todos: category.todos.filter(t => t.id !== todo.id)
                    };
                }
                if (category.id == newCateId) {
                    // Thêm todo vào category mới
                    return {
                        ...category,
                        todos: [...category.todos, { ...todo, category_id: newCateId }]
                    };
                }
                return category;
            });
        });
    };
    
    return (
        <div className="background-calender">
            <div className="header-calender">
                <h5 className="title-calender">{ categoryCurrent.name }</h5>
            </div>
            <div className="body-calender">

                {categoryCurrent.todos.length > 0
                    ?   categoryCurrent.todos.map((todo, index) => {
                            return <ItemToDo
                                key={index}
                                id={todo.id}
                                index={index}
                                categories={categories}
                                setCategories={setCategories}
                                fetchData={fetchData}
                                setTodoEdit={setTodoEdit}
                                setReport={setReport}
                                report={report}
                                cate_id={categoryCurrent.id}
                                updateCategories={updateCategories}
                            />
                        })
                    : <ButtonModal
                        target="ToDoModal"
                        title={<span><i class="fa-solid fa-square-plus"></i> Thêm </span> }
                        color="success"
                        action="add"
                    />
                }
            </div>
        </div>
    )
}