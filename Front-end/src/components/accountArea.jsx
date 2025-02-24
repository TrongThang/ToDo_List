import { Link } from "react-router";

export default function AccountArea({ username = null }) {
    const handleLogout = () => {
        localStorage.clear('authToken');
        window.location.href = '/login'
    }
    return (
        <div className="container-profile">
            <div className="profile">
                {username
                    ? <button className="logout" onClick={handleLogout}> Đăng xuất </button>
                    : <>
                        <Link to="/login">
                            <button className="login">Đăng nhập</button>
                        </Link>
                        <Link to="/register">
                            <button className="register">Đăng ký</button>
                        </Link>
                    </>
                }
            </div>
        </div>
    )
}