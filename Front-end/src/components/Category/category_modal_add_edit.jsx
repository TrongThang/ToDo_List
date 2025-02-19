import { useEffect, useState } from 'react';
import ButtonModal from '../button_modal'
import axios from '../../services/customAxios';
import CategoryContentAddEdit from './category_content_add_edit';

export default function CategoryModalAddEdit({ fetchData, categories }) {

    const [setting, setSetting] = useState({
        title: '',
        action: ''
    });

    const [cateEdit, setCateEdit] = useState(null)

    const [formData, setFormData] = useState({
        id: '',
        name: ''
    })

    useEffect(() => {
        const modalElement = document.getElementById('CateModal');
        const handleHidden = () => {
            resetForm();
            setCateEdit(null);
        };

        modalElement.addEventListener('hidden.bs.modal', handleHidden);

        return () => {
            modalElement.removeEventListener('hidden.bs.modal', handleHidden);
        };
    }, []);

    useEffect(() => {
        if (cateEdit == null) {
            setSetting({
                title: "Thêm công việc mới",
                action: "Thêm"
            })

            return
        }
        console.log('cateEdit thay đổi')
        const fetchToDo = async () => {
            try {
                if (cateEdit) {
                    let data = await axios.get(`/category?id=${cateEdit}`)
                    console.log(data)
                    setFormData({
                        id: data.id,
                        name: data.name
                    })

                    setSetting({
                        title: "Cập nhật Danh Mục",
                        action: "Sửa"
                    })
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchToDo()
    }, [cateEdit])

    const resetForm = () => {
        setFormData({
            id: '',
            name: ''
        });
    }

    async function createCategory() {
        try {
            const data = await axios.post("/category", {
                "name": formData.name,
            })
            console.log('Thêm Cate:', data)
            if (data) {
                resetForm()
                fetchData()
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    async function updateCategory() {
        try {
            const data = axios.put("/category", {
                "id": formData.id,
                "name": formData.name,
            })

            if (data) {
                resetForm()
                fetchData()
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleSubmit = (action = null) => {
        try {
            console.log('submit')
            if (cateEdit && action !== 'add') {
                updateCategory()
                console.log('edit')
            } else {
                createCategory()
                console.log('add')
            }
            fetchData()
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }
    return (
        <>
            <div
                class="modal fade"
                id="CateModal"
                tabindex="-1"
                aria-labelledby="CateModal"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="CateModal">
                                {setting.title}
                            </h1>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        {/* BODY */}
                        <div class="modal-body">
                            <CategoryContentAddEdit
                                formData={formData}
                                categories={categories}
                                handleChange={handleChange}
                                fetchData={fetchData}
                                setCateEdit={setCateEdit}
                            />
                        </div>
                        {/* END BODY */}
                        <div className={`modal-footer d-flex ${!cateEdit ? "" : "justify-content-between"} align-items-center`}>
                            {cateEdit && (
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => handleSubmit('add')}
                                >
                                    <i className="fa-solid fa-plus me-2"></i>
                                    Thêm
                                </button>
                            )}
                            <div className={`d-flex gap-2`}>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Đóng
                                </button>
                                <button
                                    type="button"
                                    style={{width: "60px"}}
                                    className="btn btn-primary"
                                    onClick={handleSubmit}
                                >
                                    {setting.action}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}