import { RiFolderVideoFill } from "react-icons/ri";
import InputList from "./InputList";
import Selection from "./Selection";
import UploadFile from "./image/UploadFile";
import { separatedWords } from "../../util/string";

const displayInput = ({
  formData,
  type = "input",
  inputType = "text",
  name,
  handleOnChange,
}) => {
  let content;
  if (type === "text-area") {
    content = (
      <textarea
        name={name}
        value={formData[name].value}
        onChange={(e) => handleOnChange(e.target.value, name)}
        className="text-area h-[6rem] pt-2 resize-none border-gray-500"
      ></textarea>
    );
  } else if (type === "select") {
    content = (
      <Selection
        formData={formData[name]}
        handleOnChange={(value) => handleOnChange(value, name)}
      />
    );
  } else if (type === "input-list") {
    content = (
      <InputList
        height="h-[2.2rem]"
        listValues={formData[name].value}
        handleOnChange={(value) => handleOnChange(value, name)}
      />
    );
  } else if (type === "file") {
    content = (
      <UploadFile
        name={name}
        type={typeof formData[name].value === "string" ? "single" : "list"}
        value={formData[name].value}
        onChange={(e) => handleOnChange(e, name)}
      />
    );
  } else if (type === "video") {
    content = (
      <>
        <input
          type={inputType}
          className={`input ${formData[name].validate} border-gray-500 pl-[2rem]`}
          value={formData[name].value}
          onChange={(e) => handleOnChange(e.target.value, name)}
        />
        <div className="input_attachment border-l border-gray-500 text-[1.5rem] cursor-pointer">
          <RiFolderVideoFill />
        </div>
      </>
    );
  } else {
    content = (
      <input
        type={inputType}
        className={`input ${formData[name].validate} border-gray-500`}
        value={formData[name].value}
        onChange={(e) => handleOnChange(e.target.value, name)}
      />
    );
  }
  return (
    <div className="input_group">
      {content}
      <div className="input_title">
        <span>{separatedWords(name)} *</span>
      </div>
    </div>
  );
};

export { displayInput };
