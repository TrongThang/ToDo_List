import axios from "../../services/customAxios";
import moment from "moment";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import ModalAddEditToDo from "./modal_add_edit_todo";
import ButtonModal from "../button_modal";
import DeadlineStatus from "./deadline_status";

export default function ItemToDo({ todo, index, categories, fetchData, setTodoEdit, setReport, report }) {
    const [active, setActive] = useState(todo.active)
    const [status, setStatus] = useState('todo')
    const now = moment();
    const deadline = moment(todo.deadline);
    const duration = moment.duration(deadline.diff(now));

    const days = Math.floor(duration.asDays());
    const hours = Math.floor(duration.asHours() % 24);
    const minutes = Math.floor(duration.asMinutes() % 60);

    useEffect(() => {
        if (days <= 1) {
            setStatus('prepare');
        } else if (hours <= 12) {
            setStatus('deadline');
        } else if (hours <= 1) {
            setStatus('important');
        } else if (minutes <= 0) {
            setStatus('false');
        } else {
            setStatus('todo');
        }
    }, [days, hours, minutes]);

    const timeBeforeDeadline = () => {
        if (days >= 1) {
            return `${days}D ${hours}M ${minutes}`
        } else if (hours >= 1) {
            return `${hours}M ${minutes}`
        } else {
            return `${minutes} phút`
        }
    }

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Thông báo!',
            text: 'Bạn có chắc chắn muốn xoá ghi chú này không!',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
        });

        if (result.isConfirmed) {
            try {
                console.log(`/todo?todo_id=${todo.id}`)
                const data = await axios.delete(`/todo?todo_id=${todo.id}`)

                if (data === true) {
                    fetchData()
                }
            } catch (error) {
                console.log(error.message)
            }
        }

    }

    const handleActive = async (e) => {
        try {
            alert('update')
            // let value = e.target.checked;
            // if (value) {
            //     setReport({ ...report, finished: report.finished + 1 })
            // } else {
            //     setReport({ ...report, finished: report.finished - 1 })
            // }
            // const data = await axios.put('/todo', {
            //     id: todo.id,
            //     active: value
            // })
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeadline = async (e) => {
        try {
            var deadlineUpdated = e.target.value;

            const deadlineFormatted = moment(deadlineUpdated).format("YYYY-MM-DD HH:mm:ss");

            const data = await axios.put('/todo', {
                id: todo.id,
                deadline: deadlineFormatted
            })
            console.log("Formatted Deadline:", deadlineFormatted);

        } catch (error) {
            console.log(error)
        }
    }

    const handleCategory = async (e) => {
        try {
            const data = await axios.put('/todo', {
                id: todo.id,
                category_id: e.target.value
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div class="mt-4 item-todo-show" onClick={handleActive}>
                <div class="d-flex inline">
                    <div class="input-group">
                        <input
                            type="checkbox"
                            class="form-check-input m-2 checkbox-todo"
                            defaultChecked={todo.active ? true : false}
                            onChange={e => handleActive(e)}
                            style={{ width: "25px", height: "25px", }}
                        />
                        <input
                            type="text"
                            class="form-control"
                            value={todo.title}
                        />
                        <select class="form-select"
                            value={todo.category.id}
                            style={{ width: "100px" }}
                            onChange={(e) => handleCategory(e)}
                        >
                            {categories.map((item, indexCate) => {
                                return (
                                    <option key={indexCate} value={item.id}>{item.name}</option>
                                )
                            })}
                        </select>
                        
                        <ButtonModal
                            target="ToDoModal"
                            title="Sửa"
                            action="edit"
                            categories={categories}
                            fetchData={fetchData}
                            onClick={() => setTodoEdit(todo.id)}
                        />
                        <button className="btn btn-danger" onClick={handleDelete}>
                            <i class="fa-solid fa-trash"></i>
                        </button>
                            {/* {timeBeforeDeadline()} 🔥 */}
                    </div>
                        <input
                            type="datetime-local"
                            class="t m-2"
                            defaultChecked={todo.active ? true : false}
                            onChange={e => handleDeadline(e)}
                            value={todo.deadline}
                            min={moment().format("YYYY-MM-DD HH:mm:ss")}
                        // onClick={handleDeadline}
                        />
                    <DeadlineStatus deadline={deadline} />
                </div>
            </div>
        </>
    )
}