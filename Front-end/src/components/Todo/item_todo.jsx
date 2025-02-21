import axios from "../../services/customAxios";
import moment from "moment";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import ModalAddEditToDo from "./modal_add_edit_todo";
import ButtonModal from "../button_modal";
import DeadlineStatus from "./deadline_status";
import { Modal } from "bootstrap";

export default function ItemToDo({ todo, index, categories, fetchData, setTodoEdit, setReport, report, cate_id }) {
    const [active, setActive] = useState(todo.active)
    const [status, setStatus] = useState('')
    const [bgColor, setBgColor] = useState('none')
    
    const now = moment();
    const deadline = moment(todo.deadline);
    const duration = moment.duration(deadline.diff(now));

    const days = Math.floor(duration.asDays());
    const hours = Math.floor(duration.asHours() % 24);
    const minutes = Math.floor(duration.asMinutes() % 60);

    useEffect(() => {
        if (status === "todo") setBgColor('#4CAF50')
        else if (status === "prepare") setBgColor('#2196F3')
        else if (status === "deadline") setBgColor('#FFC107')
        else if (status === "important") setBgColor('#FF9800')
        else if (status === "expired") setBgColor('#F44336')
        else setBgColor('#fff')
    }, [status])

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
            let value = e.target.checked;
            if (value) {
                setReport({ ...report, finished: report.finished + 1 })
            } else {
                setReport({ ...report, finished: report.finished - 1 })
            }
            const data = await axios.put('/todo', {
                id: todo.id,
                active: value
            })

            fetchData()
        } catch (error) {
            console.log(error)
        }
    }

    const handleThumbtack = async (e) => {
        try {
            let value = e.target.checked;

            const data = await axios.put('/todo', {
                id: todo.id,
                thumbtack: value
            })

            fetchData()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeadline = async (e) => {
        try {
            var deadlineUpdated = e.target.value;

            const deadlineFormatted = moment(deadlineUpdated).utc().format("YYYY-MM-DD HH:mm:ss");

            const data = await axios.put('/todo', {
                id: todo.id,
                deadline: deadlineFormatted
            })
            console.log("Formatted Deadline:", deadlineFormatted);
            fetchData()

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

            fetchData()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div
                class="mt-4 position-relative"
                onClick={(e) => {
                    if (
                        e.target.tagName !== "INPUT" &&
                        e.target.tagName !== "SELECT" &&
                        e.target.tagName !== "BUTTON"
                    ) {
                        setTodoEdit(todo.id);
                        const modalElement = document.getElementById("ToDoModal");
                        if (modalElement) {
                            const modalInstance = new Modal(modalElement);
                            modalInstance.show();
                        }
                    }
                }}
            >
                <div class="mb-5 p-2 todo" style={{ backgroundColor: bgColor }}>
                    <div
                        className="check-thumbtack"
                    >
                        <input
                            type="checkbox"
                            name="thumbtack"
                            checked={todo.thumbtack}
                            onClick={(e) => handleThumbtack(e)}
                        />
                        {/* <span><i class="fa-solid fa-thumbtack"></i></span> */}
                    </div>
                    <div className="datetime-todo">
                        <input
                            type="datetime-local"
                            defaultChecked={todo.active ? true : false}
                            onChange={e => handleDeadline(e)}
                            value={todo.deadline}
                            min={moment().format("YYYY-MM-DD HH:mm")}
                            style={{ width: "200px" }}
                            onClick={e => e.stopPropagation}
                        />
                    </div>
                    <DeadlineStatus todo={todo} deadline={deadline} status={status} setStatus={setStatus}/>

                    {/* TITLE */}
                    <h4 style={{ textAlign: "left", wordWrap: "break-word", maxWidth: "12vw", paddingTop: "10px" }}>
                        {todo.title}
                    </h4>

                    <div className="custom-select">
                        <select 
                            className="form-select"
                            value={cate_id}
                            style={{ width: "50%", height: "6vh", textWrap: "wrap"}}
                            onChange={(e) => handleCategory(e)}
                            onClick={e => e.stopPropagation}
                        >
                            {categories.map((item, indexCate) => {
                                return (
                                    <option key={indexCate} value={item.id}>{item.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="checked-finished">
                        <label for="checked"></label>
                        <input
                            type="checkbox"
                            class="custom-checkbox"
                            checked={todo.active}
                            onChange={e => handleActive(e)}
                            onClick={e => {
                                // setStatus('finished')
                                e.stopPropagation()
                            }}
                            style={{ width: "50px", height: "25px" }}   
                            name="checked"
                        />
                    </div>
                </div>
                <span className="icon-delete-todo translate-middle" onClick={(e) => {
                    e.stopPropagation()
                    handleDelete()
                }}>
                    {/* <i class="fa-solid fa-delete-left tag-delete"></i> */}
                    <div className="bg-white-icon-delete">
                        <i class="fa-solid fa-delete-left tag-delete"></i>
                    </div>
                </span>
            </div>
        </>
    )
}