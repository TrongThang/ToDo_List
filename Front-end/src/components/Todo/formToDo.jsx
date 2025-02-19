export default function FormToDo() {
    const handleSubmit = (e) => {
        
    }
    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <input type="text" value={1} className="todo-input" placeholder='What is the task today?' />
            <button type="submit" className='todo-btn'>Add Task</button>
        </form>
    )
}