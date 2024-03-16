import MovieForm from "../../components/form/MovieForm";

const AddMovie = () => {
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
        <MovieForm handleOnSubmit={handleOnSubmit} />
      </div>
    </div>
  );
};

export default AddMovie;
