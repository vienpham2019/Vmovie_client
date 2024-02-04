import { useEffect, useState } from "react";
import { GiCheckMark, GiCrossedBones } from "react-icons/gi";
const PasswordRule = ({ password = "" }) => {
  const [validationResults, setValidationResults] = useState([]);
  const passwordRule = [
    [`^(?=.*[^a-zA-Z]).+$`, "Be at least 8 characters long."],
    [`^(?=.*[A-Z]).+$`, "Contain at least one uppercase letter."],
    [`^(?=.*[a-z]).+$`, "Contain at least one lowercase letter."],
    [`^(?=.*\\d).+$`, "Contain at least one digit (0-9)."],
    [
      `^(?=.*[!@#$%^&*]).+$`,
      "Contain at least one special character (!@#$%^&*).",
    ],
  ];

  useEffect(() => {
    const results = passwordRule.map((rule) => ({
      valid: new RegExp(rule[0]).test(password),
      description: rule[1],
    }));

    setValidationResults(results);
  }, [password]);

  return (
    <ul className="text-gray-400 bg-[#2b2b31] p-2 text-[0.8rem] rounded-lg grid text-start">
      <span>Password Requirements</span>
      {validationResults.map((result, index) => (
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
