import { zodResolver } from '@hookform/resolvers/zod';
import { FieldErrors, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Input from '../../atoms/input-field';
import Button from '../../atoms/button';
import ToggleSwitch from '../../atoms/toggle-switch';

import {
  TCompanyDetailsSchema,
  companyDetailsSchema,
} from '../../../validations/profile';
import TextArea from '../../atoms/text-area';
import { useEffect, useState } from 'react';

const CompanyDetailsForm = () => {
  const [isNgo, setIsNgo] = useState(false);
  //   const requestToken = searchParams.get("requestToken") ?? "";

  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit,
  } = useForm<TCompanyDetailsSchema>({
    defaultValues: {
      isNgo,
    },
    resolver: zodResolver(companyDetailsSchema),
  });

  useEffect(() => {
    setValue('isNgo', isNgo);
  }, [isNgo, setValue]);

  const navigate = useNavigate();

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
        placeholder="XYZ inc."
        error={errors.companyName?.message}
        {...register('companyName')}
      />
      <TextArea
        label="Address"
        placeholder="Building No, Street Name,&#10;City,&#10;Pin Code"
        error={errors.address?.message}
        {...register('address')}
      />

      <div className="tw-flex tw-items-center">
        <label className="tw-text-sm tw-mr-2 | tw-block | tw-font-bold">
          Is it an NGO
        </label>
        <ToggleSwitch toggle={isNgo} setToggle={setIsNgo} size="sm" />
      </div>
      {!isNgo ? (
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
          {...register('gstin')}
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
          {...register('registrationNumber')}
        />
      )}

      <div className="tw-flex tw-gap-4 | tw-mt-4">
        <Button
          className="tw-flex-1"
          size="lg"
          type="button"
          variant="secondary"
          onClick={() => {
            navigate(-1);
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
