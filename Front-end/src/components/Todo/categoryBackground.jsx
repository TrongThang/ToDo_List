import ButtonModal from "../button_modal";
import ItemToDo from "./item_todo";

export default function     CategoryBackground({ categories, fetchData, setTodoEdit, setReport, report, categoryCurrent }) {
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
                                todo={todo}
                                index={index}
                                categories={categories}
                                fetchData={fetchData}
                                setTodoEdit={setTodoEdit}
                                setReport={setReport}
                                report={report}
                                cate_id={categoryCurrent.id}
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