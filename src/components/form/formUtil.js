import InputList from "./InputList";
import Selection from "./Selection";
import UploadFile from "./image/UploadFile";
import { separatedWords } from "../../util/string";
import { inputTypeEnum } from "./formEnum";
import VideoInput from "./VideoInput";
import UploadUrl from "./image/UploadUrl";

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
        className={`text-area h-[9rem] pt-2 resize-none ${formData[name].validate} border-gray-500`}
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
        listValues={formData[name].value || []}
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
  } else if (type === inputTypeEnum.IMG_URL) {
    content = (
      <UploadUrl
        name={name}
        value={formData[name].value?.url || ""}
        validate={formData[name].validate}
        handleOnChange={handleOnChange}
      />
    );
  } else if (type === inputTypeEnum.VIDEO) {
    content = (
      <VideoInput
        name={name}
        formData={formData}
        setOnChange={(videoUrl) => {
          handleOnChange(videoUrl, name);
        }}
      />
    );
  } else {
    content = (
      <input
        type={inputType}
        className={`input ${formData[name].validate} border-gray-500 `}
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
