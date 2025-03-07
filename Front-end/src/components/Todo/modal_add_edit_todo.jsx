import { useEffect, useState } from "react";
import ContentAddEditToDo from "./content_add_edit_todo";
import axios from "../../services/customAxios";
import Swal from "sweetalert2";
import moment from "moment";

export default function ModalAddEditToDo({ fetchData, title, target, action, categories, todo_id = null, setTodoEdit }) {    
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        content: '',
        deadline: '',
        active: '',
        category: '',
        category_id: ''
    })

    const [errors, setErrors] = useState({
        title: '',
        category_id: '',
        deadline: ''
    });    

    const [setting, setSetting] = useState({
        title: '',
        action: ''
    });

    useEffect(() => {
        if (todo_id == null) {
            console.log(123);
            
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
            ? moment(formData.deadline).format("YYYY-MM-DD HH:mm:ss")
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
            await fetchData()
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
            ? moment(formData.deadline).format("YYYY-MM-DD HH:mm:ss")
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
            setTodoEdit(null)
        }
    
        modalElement.addEventListener('hidden.bs.modal', handleModalClose);
    
        return () => {
            modalElement.removeEventListener('hidden.bs.modal', handleModalClose);
        };
    }, [target]);

    const handleSubmit = () => {
        try {
            let newErrors = {};

            if (!formData.title.trim()) {
                newErrors.title = '*Tiêu đề không được để trống và từ trên 50 ký tự!';
            }else if (formData.title.length > 50) {
                newErrors.title = '*Tiêu đề không được trên 50 ký tự!';
            }

            if (!formData.category_id || formData.category_id <= 0) {
                newErrors.category_id = '*Bạn phải chọn danh mục!';
            }

            if (formData.deadline) {
                const deadlineDate =  moment(formData.deadline).format("YYYY-MM-DD HH:mm:ss");
                const now = moment.now();
                if (deadlineDate <= now) {
                    newErrors.deadline = '*Thời gian deadline phải lớn hơn hiện tại!';
                }
            }

            setErrors(newErrors);

            if (Object.keys(newErrors).length > 0) {
                return;
            }

            if (todo_id) {
                updateToDo()
            } else {
                addToDo()
            }
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
                        <ContentAddEditToDo categories={categories} handleChange={handleChange} formData={formData} errors={errors} />
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
