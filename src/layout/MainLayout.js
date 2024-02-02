import { Outlet } from "react-router-dom";
import Modal from "../components/modal/Modal";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const { isModalOpen } = useSelector((state) => state.modal);
  return (
    <div className="relative overflow-x-hidden">
      {isModalOpen && <Modal />}
      <Outlet />
    </div>
  );
};

export default MainLayout;
