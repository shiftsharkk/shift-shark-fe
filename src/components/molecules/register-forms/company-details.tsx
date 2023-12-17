import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import Input from "../../atoms/input-field";
import Button from "../../atoms/button";
import ToggleSwitch from "../../atoms/toggle-switch";

import {
  TCompanyDetailsSchema,
  companyDetailsSchema,
} from "../../../validations/profile";
import { useState } from "react";

const CompanyDetailsForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [toggle, setToggle] = useState(false);

  //   const requestToken = searchParams.get("requestToken") ?? "";

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<TCompanyDetailsSchema>({
    defaultValues: {
      isNgo: toggle,
    },
    resolver: zodResolver(companyDetailsSchema),
  });

  const handleBasicDetailsSubmit = async (data: TCompanyDetailsSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log({ data });
  };

  return (
    <form
      className="tw-flex tw-flex-col tw-gap-5"
      onSubmit={handleSubmit(handleBasicDetailsSubmit)}
    >
      <Input
        label="Company Name"
        placeholder="XYZ"
        error={errors.companyName?.message}
        {...register("companyName")}
      />
      <Input
        label="Address"
        placeholder="Address"
        error={errors.address?.message}
        {...register("address")}
      />
      <div className="tw-flex tw-items-center">
        <label className="tw-text-sm tw-mr-2 | tw-block | tw-font-bold">
          Is it an NGO
        </label>
        <ToggleSwitch toggle={toggle} setToggle={setToggle} size="md" />
      </div>
      {!toggle ? (
        <Input
          label="GSTIN"
          placeholder="69420"
          error={
            (
              errors as FieldErrors<{
                isNgo: false;
                companyName: string;
                address: string;
                gstin: string;
              }>
            ).gstin?.message
          }
          {...register("gstin")}
        />
      ) : (
        <Input
          label="Registration Number"
          placeholder="69420"
          error={
            (
              errors as FieldErrors<{
                isNgo: true;
                companyName: string;
                address: string;
                registrationNumber: number;
              }>
            ).registrationNumber?.message
          }
          {...register("registrationNumber")}
        />
      )}

      <div className="tw-flex tw-gap-4 | tw-mt-4">
        <Button
          className="tw-flex-1"
          size="lg"
          type="button"
          variant="secondary"
          onClick={() => {
            setSearchParams((params) => {
              params.set("step", "basic-details");
              return params;
            });
          }}
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button
          className="tw-flex-1"
          size="lg"
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default CompanyDetailsForm;
