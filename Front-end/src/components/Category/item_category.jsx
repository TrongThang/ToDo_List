import Swal from "sweetalert2"
import axios from "../../services/customAxios"
import { useEffect, useState } from "react"

export default function ItemCategory({ id, name, fetchData, setCateEdit, setFormData, totalTodo, cateEdit }) {
    const handleDelete = async () => {
        try {
            console.log(`/category?cate_id=${id}`)
            const data = await axios.delete(`/category?cate_id=${id}`)
            console.log(data)
            if (data === true) {
                console.log('lấy data sau khi xoá cate')
                fetchData()
            } else if (data.success === false) {
                const result = await Swal.fire({
                    title: 'Thông báo!',
                    text: data.message,
                    icon: 'error',
                    confirmButtonText: 'Tôi đã hiểu!',
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeCate = (e) => {
        e.stopPropagation();
        console.log(id)
        setCateEdit(id)
        setFormData((prevForm) => {
            if (prevForm.id === id) return prevForm;
            return { id: id, name: name };
        })
    }

    // const [bgColor, setBgColor] = useState('')
    // useEffect(() => {
    //     try {
    //         console.log(`${id} == ${cateEdit}:`, id == cateEdit)
    //         if (id == cateEdit) {
    //             setBgColor('bg-primary border border-danger')
    //         } else {
    //             setBgColor('')
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [])

    return (
        <div className={`btn-container m-2 d-flex align-items-center`}>
            <button
                className="btn-update flex-grow-1"
                value={id}
                onClick={(e) => handleChangeCate(e)}
                style={{ width: "100%", height: "100%" }}
            >
                <span> {name} <span className="text-danger">({totalTodo})</span></span>
                <span className="icon-update-cate ms-2">
                    <i className="fa-solid fa-pen-to-square fs-5"></i>
                </span>
            </button>

            <span
                className="icon-delete-cate ms-2"
                onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                }}
            >
                <i className="fa-solid fa-circle-xmark fs-5"></i>
            </span>
        </div>
    )
}