import { useEffect, useRef, useState } from "react";
import MovieForm from "../../components/form/MovieForm";
import { useGetUncompletedMovieMutation } from "./adminApiSlice";

const AddMovie = () => {
  const [uncompletedMovie] = useGetUncompletedMovieMutation();
  const [initFormData, setInitFormData] = useState({});
  const initialized = useRef(false);

  useEffect(() => {
    const getMovie = async () => {
      if (initialized.current) return;
      initialized.current = true;
      try {
        const res = await uncompletedMovie();
        let fromData = {};
        Object.keys(res.data.metadata).forEach((key) => {
          fromData[key] = {
            value: res.data.metadata[key],
            validate: "",
          };
        });
        setInitFormData(fromData);
        console.log(fromData);
      } catch (error) {
        console.error(error);
      }
    };
    getMovie();
  }, [uncompletedMovie, setInitFormData]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="p-[1rem]">
      <div className="py-[0.4rem] border-b border-gray-600">
        <h2 className="admin_page_title">Add new movie</h2>
      </div>
      {/* Body */}
      <div className="p-2">
        <MovieForm
          handleOnSubmit={handleOnSubmit}
          initFormData={initFormData}
        />
      </div>
    </div>
  );
};

export default AddMovie;
