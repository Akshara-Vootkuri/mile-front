import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // 🔥 remove JWT
    navigate("/login");               // 🔁 go to login
  };

  return (
    <Button danger onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
