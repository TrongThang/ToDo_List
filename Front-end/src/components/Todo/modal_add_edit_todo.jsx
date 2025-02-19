import { useEffect, useState } from "react";
import ContentAddEditToDo from "./content_add_edit_todo";
import axios from "../../services/customAxios";
import Swal from "sweetalert2";

export default function ModalAddEditToDo({ fetchData, title, target, action, categories, todo_id = null }) {    
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        content: '',
        deadline: '',
        active: '',
        category: '',
        category_id: ''
    })
    const [setting, setSetting] = useState({
        title: '',
        action: ''
    });

    useEffect(() => {
        if (todo_id == null) {
            setSetting({
                title: "Thêm công việc mới",
                action: "Thêm"
            })

            return
        }

        const fetchToDo = async () => {
            try {
                if (todo_id) {
                    let data = await axios.get(`/todo?todo_id=${todo_id}`)

                    setFormData({
                        id: data.id,
                        title: data.title,
                        content: data.content,
                        deadline: data.deadline,
                        active: data.active,
                        category: '',
                        category_id: data.category
                    })
                    
                    setSetting({
                        title: "Cập nhật công việc",
                        action: "Sửa"
                    })
                }
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchToDo()
    }, [todo_id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const resetForm = () => {
        setFormData(prevState => ({
            ...prevState,
            title: '',
            content: '',
            deadline: '',
            active: false,
            category: '',
            category_id: ''
        }));
    }
    
    async function addToDo() {
        if (formData.category_id <= 0) {
            const result = Swal.fire({
                title: 'Thông báo',
                text: 'Danh mục là bắt buộc',
                icon: 'warning',
                confirmButtonText: 'Đã Hiểu',
            })
            return
        }

        const deadlineFormatted = formData.deadline
            ? new Date(formData.deadline).toISOString().slice(0, 19).replace("T", " ")
            : null;
        
        const data = axios.post("/todo", {
            "title": formData.title,
            "content": formData.content,
            "deadline": deadlineFormatted,
            "active": formData.active,
            "category_id": formData.category_id
        })
        
        if (data) {
            resetForm()
            fetchData()
        }
    }

    async function updateToDo() {
        if (formData.category_id <= 0) {
            const result = Swal.fire({
                title: 'Thông báo',
                text: 'Danh mục là bắt buộc',
                icon: 'warning',
                confirmButtonText: 'Đã Hiểu',
            })

            return
        }

        const deadlineFormatted = formData.deadline
            ? new Date(formData.deadline).toISOString().slice(0, 19).replace("T", " ")
            : null;

        const data = await axios.put("/todo", {
            "id":formData.id,
            "title": formData.title,
            "content": formData.content,
            "deadline": deadlineFormatted,
            "active": formData.active,
            "category_id": formData.category_id
        })

        if (data) {
            fetchData()
        } 
    }
    
    useEffect(() => {
        const modalElement = document.getElementById(target);
    
        const handleModalClose = () => {
            resetForm();
        }
    
        modalElement.addEventListener('hidden.bs.modal', handleModalClose);
    
        return () => {
            modalElement.removeEventListener('hidden.bs.modal', handleModalClose);
        };
    }, [target]);

    const handleSubmit = () => {
        try {
            console.log('submit')
            if (todo_id) {
                updateToDo()
                console.log('edit')
            } else {
                addToDo()
                console.log('add')
            }
            fetchData()
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div
            class="modal fade"
            id={target}
            tabindex="-1"
            aria-labelledby={ target }
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id={ target }>
                            {setting.title}
                        </h1>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <ContentAddEditToDo categories={categories} handleChange={handleChange} formData={formData} />
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Đóng
                        </button>
                        <button type="button" class="btn btn-primary" onClick={handleSubmit}>
                            {setting.action}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
