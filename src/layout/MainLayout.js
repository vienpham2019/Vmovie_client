import { Outlet } from "react-router-dom";
import Modal from "../components/modal/Modal";
import { useSelector } from "react-redux";
import NotificationMessage from "../components/notificationMessage/NotificationMessage";
import { useEffect } from "react";

const MainLayout = () => {
  const { isModalOpen } = useSelector((state) => state.modal);
  const { message } = useSelector((state) => state.notificationMessage);
  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = "hidden";
    else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);
  return (
    <div className="relative overflow-x-hidden bg-gray-900 min-h-screen">
      {message && <NotificationMessage />}
      {isModalOpen && <Modal />}
      <Outlet />
    </div>
  );
};

export default MainLayout;
