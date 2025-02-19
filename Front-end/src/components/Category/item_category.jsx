import Swal from "sweetalert2"
import axios from "../../services/customAxios"

export default function ItemCategory({ id, name, fetchData, setCateEdit }) {
    const handleDelete = async () => {
        try {
            console.log(`/category?cate_id=${id}`)
            const data = await axios.delete(`/category?cate_id=${id}`)
            console.log(data)
            if (data === true) {
                console.log('lấydataa sau khi xoá cate')
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

    const handleChangeCate = () => {
        console.log(id)
        setCateEdit(id)
    }

    return (
        <div className="btn-container m-2 d-flex align-items-center">
            <button
                className="btn-update flex-grow-1"
                value={id}
                onClick={handleChangeCate}
                style={{ width: "100%", height: "100%" }}
            >
                {name}
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