import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";
import { MdAdd } from "react-icons/md";
import {
  useDeleteTheaterMutation,
  useGetAllTheaterByAdminQuery,
} from "../theater/theaterApiSlice";
import AdminSkeleton from "./AdminSkeleton";
import { seatTypeEnum } from "../theater/theaterEnum";
import { FaEye, FaPencil, FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  clearModalResponse,
  modalComponentEnum,
  openModal,
  setModalParams,
} from "../../components/modal/ModalSlice";
import { ConfirmModalActionEnum } from "../../components/modal/ConfirmModal";
import {
  notificationMessageEnum,
  setMessage,
} from "../../components/notificationMessage/notificationMessageSlice";

const Theater = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { modalResponse } = useSelector((state) => state.modal);
  const limit = 10;
  const [deleteTheater] = useDeleteTheaterMutation();
  const { data, isLoading } = useGetAllTheaterByAdminQuery(
    { search, page, limit },
    {
      pollingInterval: 120000, // 2min the data will fetch again
      refertchOnFocus: true, // data will fetch when page on focus
      refetchOnMountOrArgChange: true, // it will refresh data when remount component
      // Set the query key to include the page so it updates when the page changes
      queryKey: ["getAllTheaterByAdmin", { search, page }],
    }
  );

  useEffect(() => {
    const handleModalResponse = async () => {
      if (modalResponse?.isConfirm) {
        if (
          modalResponse.confirmAction.action ===
          ConfirmModalActionEnum.DELETE_THEATER_BY_ID
        ) {
          const res = await deleteTheater({
            _id: modalResponse.confirmAction.theaterId,
          });
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
  }, [modalResponse, dispatch, deleteTheater]);

  const handleDeleteTheater = async (_id) => {
    dispatch(
      setModalParams({
        message: `Are you sure you want to delete this theater ?`,
        confirmAction: {
          action: ConfirmModalActionEnum.DELETE_THEATER_BY_ID,
          theaterId: _id,
        },
      })
    );
    dispatch(openModal(modalComponentEnum.CONFIRM));
  };
  const handleDisplayTheater = () => {
    const theaters = data?.theaters?.entities;
    if (theaters && Object.keys(theaters).length === 0) {
      return (
        <div className="h-[30vh] flex justify-center items-center text-white">
          No Theater
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-3 justify-center">
        {Object.entries(theaters).map(([_id, theater]) => {
          const seatCount = {};
          const seatTypeName = {};
          Object.entries(seatTypeEnum).forEach(([key, value]) => {
            seatTypeName[value] = key;
          });
          theater.grid.forEach(({ value: row }) => {
            row.forEach((seat) => {
              if (seat !== seatTypeEnum.HALL) {
                seatCount[`${seatTypeName[seat]}`] =
                  seatCount[`${seatTypeName[seat]}`] + 1 || 1;
              }
            });
          });

          return (
            <div
              key={"theater " + theater.name}
              className="w-[9rem] border border-gray-500 rounded text-white p-2 flex flex-col justify-between"
            >
              <span className="text-[0.8rem] ">Room: {theater.name}</span>
              <div className="text-[0.8rem]">
                <span className="text-gray-400">Seats</span>
                {Object.entries(seatCount).map(
                  ([seatType, count], seatIndex) => (
                    <div key={`${theater.name} - Seats ${seatIndex}`}>
                      <span className="">
                        {seatType} : {count}
                      </span>
                    </div>
                  )
                )}
              </div>
              <div className="flex flex-col gap-2 text-[0.8rem]">
                <div className="flex flex-col">
                  <span className="text-gray-400">Created at</span>{" "}
                  <span> {theater.createdAt.split("T")[0]}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400">Updated at</span>{" "}
                  <span>{theater.updatedAt.split("T")[0]}</span>
                </div>
              </div>
              <div className="flex flex-wrap border border-gray-500 py-2 gap-3 justify-around">
                <div
                  className="text-[rgb(168,111,248)] tooltip_container cursor-pointer"
                  onClick={() => {
                    dispatch(setModalParams({ grid: theater.grid }));
                    dispatch(openModal(modalComponentEnum.THEATER_LAYOUT));
                  }}
                >
                  <FaEye />
                  <div className="tooltip tooltip_top">Preview</div>
                </div>
                <div
                  className="text-cyan-500 tooltip_container cursor-pointer"
                  onClick={() => navigate(`/admin/theater/editTheater/${_id}`)}
                >
                  <FaPencil />
                  <div className="tooltip tooltip_top">Edit</div>
                </div>
                <div
                  className="text-red-500 tooltip_container cursor-pointer"
                  onClick={() => handleDeleteTheater(_id)}
                >
                  <FaTrash />
                  <div className="tooltip tooltip_top">Delete</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (isLoading) return <AdminSkeleton />;

  return (
    <div className="p-[1rem]">
      {" "}
      <div className="grid gap-[1rem]">
        <div className="flex justify-between flex-wrap items-center py-[0.4rem] border-b border-gray-600">
          <div className="flex gap-[1rem] items-center">
            <h2 className="admin_page_title">Theater</h2>
          </div>
        </div>
        {/* Body */}
        <div className="flex justify-center">
          <div className="h-full py-4 grid justify-center gap-3 w-fit p-4 mt-4 rounded-md ">
            <div className="flex flex-wrap items-center gap-3 justify-end px-[1rem]">
              {/* Search */}
              <div className="input_group mobile:w-full">
                <input
                  type="text"
                  className="input py-[1.4rem]"
                  placeholder="Find theater"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="input_attachment ">
                  <SlMagnifier />
                </div>
              </div>
              {/* Add theater */}
              <div className="flex flex-wrap gap-[1rem] items-center ">
                <button
                  className="text-cyan-300 flex gap-1 items-center px-5 border border-gray-500 rounded-md py-[0.7rem]"
                  onClick={() => navigate("addTheater")}
                >
                  <MdAdd />
                  Add Theater
                </button>
              </div>
            </div>
            {/* Theater List */}
            {handleDisplayTheater()}
            {false && (
              <div className="flex justify-between items-center">
                <div className="text-gray-300 font-thin text-[0.8rem] border border-gray-700 bg-slate-800 flex items-center h-[2rem] px-2 rounded-md">
                  Showing 10 of {0}
                </div>
                <Pagination
                  currentPage={page}
                  totalPage={Math.ceil(1 / 10)}
                  setCurrentPage={(page) => setPage(page)}
                />
              </div>
            )}
          </div>
        </div>
        {/* Body */}
      </div>
    </div>
  );
};

export default Theater;
