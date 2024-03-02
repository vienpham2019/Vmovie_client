import { useEffect, useState } from "react";
import { GiCheckMark, GiCrossedBones } from "react-icons/gi";
import { passwordValidate } from "../../util/formValidate";

const PasswordRule = ({ password = "" }) => {
  const [validationResults, setValidationResults] = useState({
    isLengthValid: {
      valid: false,
      description: "Be at least 8 characters long.",
    },
    hasUppercase: {
      valid: false,
      description: "Contain at least one uppercase letter.",
    },
    hasLowercase: {
      valid: false,
      description: "Contain at least one lowercase letter.",
    },
    hasDigit: {
      valid: false,
      description: "Contain at least one digit (0-9).",
    },
    hasSpecialChar: {
      valid: false,
      description: "Contain at least one special character (!@#$%^&*).",
    },
  });

  useEffect(() => {
    const passwordValidity = passwordValidate(password);
    setValidationResults((prevData) => {
      const updatedResults = {};
      Object.entries(passwordValidity).forEach(([key, value]) => {
        updatedResults[key] = {
          valid: value,
          description: prevData[key].description,
        };
      });
      return updatedResults;
    });
  }, [password]);

  return (
    <ul className="text-gray-400 bg-[#2b2b31] p-2 text-[0.8rem] rounded-lg grid text-start">
      <span>Password Requirements</span>
      {Object.entries(validationResults).map(([_, result], index) => (
        <li
          key={index}
          className={`flex items-center gap-2 ${
            password === ""
              ? "text-gray-500"
              : result.valid
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {result.valid ? <GiCheckMark /> : <GiCrossedBones />}
          {result.description}
        </li>
      ))}
    </ul>
  );
};

export default PasswordRule;
