import { RiFolderVideoFill } from "react-icons/ri";
import InputList from "./InputList";
import Selection from "./Selection";
import UploadFile from "./image/UploadFile";
import { separatedWords } from "../../util/string";
import { inputTypeEnum } from "./formEnum";

const displayInput = ({
  formData,
  type = "input",
  inputType = "text",
  name,
  handleOnChange,
  db,
}) => {
  let content;
  if (type === inputTypeEnum.TEXT_AREA) {
    content = (
      <textarea
        name={name}
        value={formData[name].value}
        onChange={(e) => handleOnChange(e.target.value, name)}
        className={`text-area h-[6rem] pt-2 resize-none ${formData[name].validate} border-gray-500`}
      ></textarea>
    );
  } else if (type === inputTypeEnum.SELECT) {
    content = (
      <Selection
        formData={formData[name]}
        handleOnChange={(value) => handleOnChange(value, name)}
      />
    );
  } else if (type === inputTypeEnum.INPUT_LIST) {
    content = (
      <InputList
        height="h-[2.2rem]"
        listValues={formData[name].value}
        validate={formData[name].validate}
        handleOnChange={(value) => handleOnChange(value, name)}
      />
    );
  } else if (type === inputTypeEnum.FILE) {
    content = (
      <UploadFile
        name={name}
        type={Array.isArray(formData[name].value) ? "list" : "single"}
        value={formData[name].value}
        validate={formData[name].validate}
        db={db}
        setOnChange={(uploadFiles) => {
          handleOnChange(uploadFiles, name);
        }}
      />
    );
  } else if (type === inputTypeEnum.VIDEO) {
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
      <div className={`input_title ${formData[name].validate}`}>
        <span>
          {separatedWords(name)} <small className="text-red-400">*</small>
        </span>
      </div>
    </div>
  );
};

export { displayInput };
