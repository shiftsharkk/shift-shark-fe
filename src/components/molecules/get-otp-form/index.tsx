import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { isAxiosError } from "axios";

import { TGetOtpErrorSchema, TGetOtpSchema, TGetOtpWithEmailSchema, TGetOtpWithPhoneSchema, getOtpSchema } from "../../../validations/auth";
import { getOTP } from "../../../api-calls/auth";

import Input from "../../atoms/input-field";
import Button from "../../atoms/button";
import { toast } from "../../atoms/toast";

import { TRole } from "../../../types/user";

import indiaFlag from "../../../assets/icons/india-flag.svg";

type GetOtpFormProps = {
  setRequestId: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
};

const GetOtpForm: React.FC<GetOtpFormProps> = ({ setRequestId, setPhone }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors: rawErrors },
  } = useForm<TGetOtpSchema>({
    resolver: zodResolver(getOtpSchema),
  });

  const { role } = useParams()

  const errors = rawErrors as TGetOtpErrorSchema;

  const handleGetOtpWithPhone = async (requestData: TGetOtpWithPhoneSchema) => {
    try {
      const responseData = await getOTP({
        phone: requestData.phone,
        source: role as 'service-provider'
      });
      setRequestId(responseData.data.requestId);
      setPhone(requestData.phone);
      toast.success("OTP sent successfully");
    } catch (error) {
      console.log(error);
      if(isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? 'Something went wrong')
      }
    }
  };

  const handleGetOtpWithEmail = async (requestData: TGetOtpWithEmailSchema) => {
    try {
      const responseData = await getOTP({
        email: requestData.email,
        source: role as 'hirer'
      });
      setRequestId(responseData.data.requestId);
      toast.success("OTP sent successfully");
    } catch (error) {
      console.log(error);
      if(isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? 'Something went wrong')
      }
    }
  };

  const handleOtpSubmit = (requestData: TGetOtpSchema) => {
    if (role === "service-provider") {
      handleGetOtpWithPhone(requestData as TGetOtpWithPhoneSchema);
    } else {
      handleGetOtpWithEmail(requestData as TGetOtpWithEmailSchema);
    }
  };
  
  useEffect(() => {
    setValue('role', role as TRole)
  },[role, setValue])

  return (
    <form
      className="tw-w-full lg:tw-max-w-[320px]"
      onSubmit={handleSubmit(handleOtpSubmit)}
    >
      <div className="tw-flex">
        {
          role === "service-provider" ? (
            <Input
              {...register("phone")}
              prefixElement={
                <span className="tw-min-w-[40px] tw-px-2">
                  <img src={indiaFlag} alt="+91" aria-hidden />
                </span>
              }
              placeholder="9876543210"
              label="Phone Number"
              error={(errors).phone?.message}
            />
          ) : (
            <Input
              {...register("email")}
              placeholder="johndoe@company.com"
              label="Email"
              error={(errors).email?.message}
            />
          )
        }
      </div>
      <Button
        disabled={isSubmitting || !errors}
        loading={isSubmitting}
        type="submit"
        block
        variant="primary"
        size="lg"
        className="tw-mt-4 tw-mb-3"
      >
        Get OTP
      </Button>
    </form>
  );
};

export default GetOtpForm;
