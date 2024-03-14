import CustomForm from "../../components/form/CustomForm";

const AddMovie = () => {
  //   const initFormData = {
  //     title: { value: "", validate: "", type: "text" },
  //     yearRelease: { value: "", validate: "", type: "text" },
  //     runningTime: { value: "", validate: "", type: "text" },
  //   };
  return (
    <div className="p-[1rem]">
      <div className="py-[0.4rem] border-b border-gray-600">
        <h2 className="admin_page_title">Add new movie</h2>
      </div>
      {/* Body */}
      <div className="p-2">
        <CustomForm />
      </div>
    </div>
  );
};

export default AddMovie;
