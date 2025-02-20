import ItemToDo from "./item_todo";

export default function CategoryBackground({ listToDo, categories, fetchData, setTodoEdit, setReport, report, categoryCurrent }) {
    return (
        <div className="background-calender col-4 m-2">
            <div className="header-calender">
                <h5 className="title-calender">{ categoryCurrent.name }</h5>
            </div>
            <div className="body-calender">
                {categories.map((category, index) => {
                    console.log('category:', category)
                    console.log('categoryCurrent:', categoryCurrent)
                    if (category.id !== categoryCurrent.id) {
                        return null
                    }
                    return category.todos.map((todo, index) => {
                        return <ItemToDo
                            key={index}
                            todo={todo}
                            index={index}
                            categories={categories}
                            fetchData={fetchData}
                            setTodoEdit={setTodoEdit}
                            setReport={setReport}
                            report={report}
                            cate_id={category.id}
                        />
                    })
                })}
            </div>
        </div>
    )
}