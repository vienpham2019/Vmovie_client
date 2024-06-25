import { FaEye, FaTrash } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  clearModalResponse,
  modalComponentEnum,
  openModal,
  setModalParams,
} from "../../components/modal/ModalSlice";
import { productDetailTypeEnum } from "../product/ProductDetailModal";
import { ConfirmModalActionEnum } from "../../components/modal/ConfirmModal";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";
import { useDeleteProductByIdMutation } from "../product/productApiSlice";

const DisplayProduct = ({ product, productIndex }) => {
  const [open, setOpen] = useState(false);
  const isLaptop = useMediaQuery({ maxWidth: 1024 });
  const [deleteProduct] = useDeleteProductByIdMutation();
  const { modalResponse } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleModalResponse = async () => {
      if (modalResponse?.isConfirm) {
        if (
          modalResponse.confirmAction.action ===
            ConfirmModalActionEnum.DELETE_PRODUCT_BY_ID &&
          modalResponse.confirmAction.productId === product._id
        ) {
          const res = await deleteProduct({ _id: product._id });
          if (res?.data?.message) {
            dispatch(
              setMessage({
                message: res.data.message,
                messageType: notificationMessageEnum.SUCCESS,
              })
            );
          } else {
            dispatch(
              setMessage({
                message: res.error.data.message,
                messageType: notificationMessageEnum.ERROR,
              })
            );
          }
          dispatch(clearModalResponse());
        }
      }
    };

    handleModalResponse();
  }, [modalResponse, product._id, dispatch]);

  const handleDelete = async () => {
    dispatch(
      setModalParams({
        message: `Are you sure you want to delete this product ?`,
        confirmAction: {
          action: ConfirmModalActionEnum.DELETE_PRODUCT_BY_ID,
          productId: product._id,
        },
      })
    );
    dispatch(openModal(modalComponentEnum.CONFIRM));
  };

  const handlePreview = () => {
    dispatch(
      setModalParams({ _id: product._id, type: productDetailTypeEnum.DETAIL })
    );
    dispatch(openModal(modalComponentEnum.PRODUCT_DETAIL));
  };

  const indexContent = (index) => <div className="text-center">{index}</div>;
  const itemNameContent = (itemName) => (
    <div className="flex gap-4 items-center justify-between p-2  flex-1">
      <span className="w-[15rem] mobile:w-[8rem]">{itemName}</span>
      <IoIosArrowDown className="mobile:block hidden" />
    </div>
  );
  const thumbnailContent = (imageUrl) => (
    <div className="flex justify-center">
      {" "}
      <img className="max-h-[3.4rem]" src={imageUrl} alt={imageUrl} />
    </div>
  );
  const priceContent = (price) => (
    <div className="flex gap-4 items-center justify-between p-2 w-[6rem] flex-auto">
      <span className="w-[15rem] mobile:w-[8rem]">${price}</span>
      <IoIosArrowDown className="mobile:block hidden" />
    </div>
  );
  const typeContent = (type) => (
    <div className="flex gap-4 items-center justify-between p-2 w-[7rem] flex-auto">
      <span className="w-[15rem] mobile:w-[8rem]">{type}</span>
      <IoIosArrowDown className="mobile:block hidden" />
    </div>
  );
  const createdAtContent = (createdAt) => (
    <div className="min-w-[7rem] text-center">{createdAt.split("T")[0]}</div>
  );
  const updatedAtContent = (updatedAt) => (
    <div className="flex gap-4 items-center justify-center px-2">
      <span className="min-w-[7rem]">{updatedAt.split("T")[0]}</span>
      <IoIosArrowDown className="laptop:block hidden" />
    </div>
  );
  const actionsContent = () => {
    return (
      <div className="flex gap-4 min-w-[15rem] justify-center">
        <div
          className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(168,111,248,0.2)]"
          onClick={handlePreview}
        >
          <FaEye className="text-[rgb(168,111,248)]" />
          <div className="tooltip tooltip_bottom">Preview</div>
        </div>
        <Link
          to={`/admin/product/editProduct/${product._id}`}
          className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(135,189,255,0.4)]"
        >
          <RiEdit2Fill className="text-[rgb(135,189,255)]" />
          <div className="tooltip tooltip_bottom">Edit</div>
        </Link>
        <div
          onClick={handleDelete}
          className="tooltip_container w-[2rem] aspect-square rounded-md flex items-center justify-center cursor-pointer bg-[rgba(255,99,99,0.2)]"
        >
          <FaTrash className="text-[rgb(250,117,117)]" />
          <div className="tooltip tooltip_bottom">Delete</div>
        </div>
      </div>
    );
  };

  let contents = {
    id: indexContent(productIndex),
    thumbnail: thumbnailContent(product["imgUrl"]),
    itemName: itemNameContent(product["itemName"]),
    price: priceContent(product["price"]),
    type: typeContent(product["type"]),
    createdAt: createdAtContent(product["createdAt"]),
    updatedAt: updatedAtContent(product["updatedAt"]),
    actions: actionsContent(),
  };

  return (
    <>
      <tr onClick={() => isLaptop && setOpen(!open)}>
        {Object.entries(contents).map(([key, productContent], index) => (
          <td
            // key={"content" + product["itemName"] + index}
            key={Math.random()}
            className={`bg-[rgb(36,36,41)] laptop:cursor-pointer ${
              key === "actions" && "laptop:hidden"
            } ${["updatedAt", "createdAt"].includes(key) && "tablet:hidden"} ${
              ["price", "type"].includes(key) && "mobile:hidden"
            }`}
          >
            {productContent}
          </td>
        ))}
      </tr>
      <tr className={`${(!open || !isLaptop) && "hidden"}`}>
        <td
          colSpan={9}
          className="border border-gray-500 border-t-0 border-l-0 bg-[rgb(36,36,41)]"
        >
          <div className="flex flex-wrap p-2 items-center gap-3">
            <div className="mobile:grid gap-2 flex-1 justify-center hidden">
              <div className="flex gap-1 flex-1">
                <span className="font-thin">Price:</span>
                {contents["price"]}
              </div>
              <div className="flex gap-1">
                <span className="font-thin">Type:</span>
                {contents["type"]}
              </div>
            </div>
            <div className="hidden gap-2 flex-1 justify-center tablet:grid">
              <div className="flex gap-1 hide_svg">
                <span className="font-thin">Updated:</span>
                {contents["updatedAt"]}
              </div>
              <div className="flex gap-1">
                <span className="font-thin">Created:</span>
                {contents["createdAt"]}
              </div>
            </div>
            <div className="hidden flex-1 laptop:block">
              {contents["actions"]}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default DisplayProduct;
