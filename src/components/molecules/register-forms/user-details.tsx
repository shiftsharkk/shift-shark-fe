import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { isAxiosError } from "axios";

import Button from "../../atoms/button";
import Input from "../../atoms/input-field";
import { toast } from "../../atoms/toast";

import { createUser } from "../../../api-calls/auth";

import {
  TUserDetailsSchema,
  userDetailsSchema,
} from "../../../validations/profile";

const UserDetailsForm: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const requestToken = searchParams.get("requestToken") ?? "";

  const {
    register,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<TUserDetailsSchema>({
    resolver: zodResolver(userDetailsSchema),
  });

  const handleBasicDetailsSubmit = async (data: TUserDetailsSchema) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log({ data });

      // go to next step
      setSearchParams((params) => {
        params.set("step", "banking-details");
        return params;
      });
    } catch (err) {
      let errMessage =
        "Something went wrong wile registering user. Please try again later.";
      if (err instanceof Error) {
        if (isAxiosError(err)) {
          errMessage = err.response?.data?.message ?? err.message;
        }
      }
      toast.error(errMessage);
    }
  };

  return (
    <form
      className="tw-flex tw-flex-col tw-gap-5"
      onSubmit={handleSubmit(handleBasicDetailsSubmit)}
    >
      <Input
        label="Full Name"
        placeholder="John Doe"
        {...register("name")}
        error={errors.name?.message}
      />
      <Input
        label="Email"
        placeholder="john@gmail.com"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        label="Employee Id"
        placeholder="123456"
        {...register("employeeId")}
        error={errors.employeeId?.message}
      />
      <Input
        label="Designation"
        {...register("designation")}
        error={errors.designation?.message}
      />

      <Button
        loading={isSubmitting}
        disabled={isSubmitting}
        type="submit"
        block
        size="lg"
        className="tw-mt-4"
      >
        Next
      </Button>
    </form>
  );
};

export default UserDetailsForm;
