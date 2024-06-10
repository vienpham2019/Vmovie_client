import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";
import { MdAdd } from "react-icons/md";
import { useGetAllTheaterByAdminQuery } from "../theater/theaterApiSlice";
import AdminSkeleton from "./AdminSkeleton";
import { seatTypeEnum } from "../theater/theaterEnum";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import {
  modalComponentEnum,
  openModal,
  setModalParams,
} from "../../components/modal/ModalSlice";
import { ConfirmModalActionEnum } from "../../components/modal/ConfirmModal";

const ShowTime = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  return (
    <div className="p-[1rem]">
      {" "}
      <div className="grid gap-[1rem]">
        <div className="flex justify-between flex-wrap items-center py-[0.4rem] border-b border-gray-600">
          <div className="flex gap-[1rem] items-center">
            <h2 className="admin_page_title">Showtime</h2>
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
                  placeholder="Find showtime"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="input_attachment ">
                  <SlMagnifier />
                </div>
              </div>
              {/* Add showtime */}
              <div className="flex flex-wrap gap-[1rem] items-center ">
                <button
                  className="text-cyan-300 flex gap-1 items-center px-5 border border-gray-500 rounded-md py-[0.7rem]"
                  onClick={() => navigate("addShowtime")}
                >
                  <MdAdd />
                  Add Showtime
                </button>
              </div>
            </div>
            {/* Theater List */}
            {/* {handleDisplayTheater()} */}
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

export default ShowTime;
