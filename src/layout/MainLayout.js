import { Outlet } from "react-router-dom";
import Modal from "../components/modal/Modal";
import { useSelector } from "react-redux";
import NotificationMessage from "../components/notificationMessage/NotificationMessage";

const MainLayout = () => {
  const { isModalOpen } = useSelector((state) => state.modal);
  const { message } = useSelector((state) => state.notificationMessage);
  return (
    <div className="relative overflow-x-hidden bg-gray-900 min-h-screen">
      {message && <NotificationMessage />}
      {isModalOpen && <Modal />}
      <Outlet />
    </div>
  );
};

export default MainLayout;
