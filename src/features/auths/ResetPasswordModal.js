import { TfiEmail } from "react-icons/tfi";
import { FaRegCheckCircle } from "react-icons/fa";

const ResetPasswordModal = () => {
  return (
    <div className="grid text-center gap-[1rem] max-w-[30rem]">
      <h2 className="text-[2rem] text-cyan-600">Password Reset Request Sent</h2>
      <div className="grid gap-4">
        <span>
          A password reset message has been sent to your email address. Please
          click the link in that message to reset your password.
        </span>
        <span>
          If you do not receive the password reset message within a few moments,
          please check your spam folder or other filtering tools
        </span>
        <span>The password reset link will expire in 1 hour.</span>
      </div>
      <div className="flex justify-center">
        <div className="relative">
          <TfiEmail className="text-[5rem]" />
          <FaRegCheckCircle className="text-white absolute -right-[0.7rem] -top-[0.4rem] text-[2rem] bg-cyan-400 rounded-full" />
        </div>
      </div>
      <div className="flex gap-[0.4rem] justify-center items-center">
        <button className="btn-blue px-2">Resend reset password link</button>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
