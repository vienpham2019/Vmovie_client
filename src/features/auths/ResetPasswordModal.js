import { useSelector } from "react-redux";
import { useResendForgotPasswordMutation } from "./authApiSlice";
import { useEffect, useState } from "react";

const ResetPasswordModal = () => {
  const { modalParams } = useSelector((state) => state.modal);
  const [resendForgotPassword, { isLoading }] =
    useResendForgotPasswordMutation();
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => {
        const newCountdown = prevCountdown - 1;
        if (newCountdown === 0) {
          clearInterval(intervalId); // Stop the interval if countdown reaches 0
        }
        return newCountdown;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleResendLink = async () => {
    try {
      await resendForgotPassword({
        email: modalParams.email,
        clientUrl: `${process.env.REACT_APP_BASE_URL}/resetpassword`,
      });
      setCountdown(60);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="grid text-center gap-[1rem] max-w-[30rem] bg-white p-4 rounded">
      <div className="flex justify-center items-center">
        <h2 className="text-[1.7rem] font-[1rem]">Check Your Email</h2>
        <div className="w-[3rem] aspect-square flex justify-center items-center">
          <lord-icon
            src="https://cdn.lordicon.com/aycieyht.json"
            trigger="in"
            delay="10"
            stroke="bold"
            state="in-unfold"
            colors="primary:#16a9c7,secondary:#107c91"
          ></lord-icon>
        </div>
      </div>

      <div className="grid gap-4 font-thin text-[1rem]">
        <span>
          A password reset message has been sent to your email address{" "}
          <strong>{modalParams?.email}</strong>. Please click the link in that
          message to reset your password.
        </span>
        <span>
          If you do not receive the password reset message within a few moments,
          please check your spam folder or other filtering tools
        </span>
        <span>The password reset link will expire in 15 min.</span>
      </div>
      <div className="flex gap-[0.4rem] justify-center items-center">
        {isLoading ? (
          <button className="bg-gray-300 p-2 rounded-md flex justify-center items-center gap-1">
            <span>Sending...</span>
            <lord-icon
              src="https://cdn.lordicon.com/aycieyht.json"
              trigger="loop"
              state="loop-flying"
            ></lord-icon>
          </button>
        ) : countdown <= 0 ? (
          <button className="btn-blue px-2" onClick={handleResendLink}>
            Resend reset password link
          </button>
        ) : (
          <button className="btn-blue btn-disabled px-2">
            {countdown} seconds
          </button>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordModal;
