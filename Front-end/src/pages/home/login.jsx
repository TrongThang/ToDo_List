import { useEffect, useState } from "react"
import axios from '../../services/customAxios'
import Swal from "sweetalert2";
import { Link } from "react-router";
export default function LoginPage({ username }) {
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        'username': '',
        'password': ''
    })

    useEffect(() => {
        if (username) {
            window.location.href = '/'
        }
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (action) => {
        try {
            let urlAction = action === 'login' ? '/login' : 'register';

            const data = await axios.post(urlAction, {
                username: formData.username,
                password: formData.password
            })
            console.log('login:', data)
            const messageAction = action === 'login' ? "Đăng nhập" : "Đăng ký";
            if (data.success) {
                localStorage.setItem('authToken', data.token)
                Swal.fire({
                    title: 'Thông báo!',
                    text: `${messageAction} thành công!`,
                    icon: 'success',
                    confirmButtonText: 'Tiếp tục',
                });

                setTimeout(() => {
                    window.location.href = '/';
                }, 1000)
            }
            else {
                await Swal.fire({
                    title: 'Thông báo!',
                    text: 'Tài khoản hoặc mật khẩu không chính xác!',
                    icon: 'error',
                    confirmButtonText: 'OK!',
                });

                return
            }

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="form-login" style={{alignItems: 'center'}}>
            <div className="container-login">
                <div>
                    {isLogin
                        ? <h3 className="title">ĐĂNG NHẬP</h3>
                        : <h3 className="title">ĐĂNG KÝ</h3>
                    }    
                    <p><span className="text-danger fw-bold">THẮNG</span> mang lại trải nghiệm tuyệt vời cho bạn. Hãy lưu các việc cần làm của bạn để kiểm soát công việc của bạn!.</p>
                </div>
                <div>
                    <input type="text" name="username" id="username" placeholder="Tên tài khoản..."
                        onChange={(e) => handleChange(e)}
                    />
                    <input type="password" name="password" id="password" placeholder="Mật khẩu..."
                        onChange={(e) => handleChange(e)}
                    />
                    {/* <div className="row">
                        <label htmlFor="remember">Ghi nhớ đăng nhập</label>
                        <input type="checkbox" name="remember" id="remember" />
                    </div> */}
                    {isLogin
                        ? <p style={{textAlign: "left", textDecorationLine: "underline", color: "blue"}} onClick={() => {setIsLogin(false)}}>Chưa có tài khoản?</p>
                        : <p style={{textAlign: "left", textDecorationLine: "underline", color: "blue"}} onClick={() => {setIsLogin(true)}}>Đăng nhập <i class="fa-solid fa-arrow-right"></i> </p>
                    }
                    
                    
                </div>
                {isLogin
                    ? <button type="button" onClick={() => handleSubmit('login')}>Đăng nhập</button>
                    : <button type="button" onClick={() => handleSubmit('register')}>Đăng ký</button>
                }
            </div>
        </div>
    )
}