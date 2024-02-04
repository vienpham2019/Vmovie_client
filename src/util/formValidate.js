const passwordValidate = (password) => {
  const isLengthValid = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

  return {
    isLengthValid,
    hasUppercase,
    hasLowercase,
    hasDigit,
    hasSpecialChar,
  };
};

export { passwordValidate };
