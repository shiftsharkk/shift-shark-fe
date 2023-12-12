import { isAxiosError } from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Input from "../../atoms/input-field";
import { toast } from "../../atoms/toast";
import Button from "../../atoms/button";

import { verifyOTP } from "../../../api-calls/auth";

import { TVerifyOtpSchema, verifyOtpSchema } from "../../../validations/auth";
import { useNavigate } from "react-router-dom";

type VerifyOtpFormProps = {
  requestId: string;
  setRequestId: React.Dispatch<React.SetStateAction<string>>;
  type: "login" | "register";
  phone: string;
};

const VerifyOtpForm: React.FC<VerifyOtpFormProps> = ({
  requestId,
  setRequestId,
  phone,
  type,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TVerifyOtpSchema>({
    resolver: zodResolver(verifyOtpSchema),
  });

  const navigate = useNavigate();

  const handleAfterOtpVerification = (data: {
    newUser: boolean;
    requestToken: string;
  }) => {
    console.log({ data });
    if (data.newUser) {
      navigate(`/onboarding?requestToken=${data.requestToken}`);
      return;
    }
    // [TODO]: handle login
    localStorage.set("token", data.requestToken);
    navigate("/dashboard");
  };

  const handleVerifyOtpSubmit = async (requestData: TVerifyOtpSchema) => {
    try {
      const responseData = await verifyOTP({
        ...requestData,
        requestId,
      });
      toast.success("OTP verified successfully");
      handleAfterOtpVerification(responseData.data);
    } catch (error) {
      let errorMessage = "OTP verification failed";
      if (isAxiosError(error)) {
        errorMessage = error.response?.data.message ?? errorMessage;
      }
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <form
        className="tw-w-full lg:tw-max-w-[320px]"
        onSubmit={handleSubmit(handleVerifyOtpSubmit)}
      >
        <div className="tw-flex">
          <Input
            {...register("otp", { required: "Phone number is required" })}
            placeholder="123456"
            label="OTP"
            error={errors.otp?.message}
          />
        </div>
        <Button
          disabled={isSubmitting || !errors}
          loading={isSubmitting}
          type="submit"
          block
          variant="primary"
          size="lg"
          className="tw-mt-4"
        >
          {type === "login" ? "Login" : "Register"}
        </Button>
      </form>
      <div className="tw-text-center tw-text-sm">
        OTP has been sent to <b>{phone}</b>.<br />
        Want to{" "}
        <button onClick={() => setRequestId("")} className="tw-cursor-pointer">
          <b>change it?</b>
        </button>
      </div>
    </>
  );
};

export default VerifyOtpForm;
