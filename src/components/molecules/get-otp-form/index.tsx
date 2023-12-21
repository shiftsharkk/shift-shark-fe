import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";

import { TGetOtpSchema, getOtpSchema } from "../../../validations/auth";
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
    formState: { isSubmitting, errors },
  } = useForm<TGetOtpSchema>({
    resolver: zodResolver(getOtpSchema),
  });

  const { role  } = useParams()

  const handleOtpSubmit = async (requestData: TGetOtpSchema) => {
    try {
      const responseData = await getOTP({
        phone: requestData.phone,
        source: role as TRole
      });
      setRequestId(responseData.data.requestId);
      setPhone(requestData.phone);
      toast.success("OTP sent successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="tw-w-full lg:tw-max-w-[320px]"
      onSubmit={handleSubmit(handleOtpSubmit)}
    >
      <div className="tw-flex">
        <Input
          {...register("phone")}
          prefixElement={
            <span className="tw-min-w-[40px] tw-px-2">
              <img src={indiaFlag} alt="+91" aria-hidden />
            </span>
          }
          placeholder="9876543210"
          label="Phone Number"
          error={errors.phone?.message}
        />
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
