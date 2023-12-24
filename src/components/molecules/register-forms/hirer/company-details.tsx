import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldErrors, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Input from '../../../atoms/input-field';
import Button from '../../../atoms/button';
import TextArea from '../../../atoms/text-area';
import ToggleSwitch from '../../../atoms/toggle-switch';

import {
  TCompanyDetailsSchema,
  companyDetailsSchema,
} from '../../../../validations/profile';

import { useHirerSignupStore } from '../../../../stores/hirer-signup.store';

import { createHirer } from '../../../../api-calls/hirer/create-account';

import { parseError } from '../../../../utils/parse-error';

const CompanyDetailsForm = () => {
  const [isNgo, setIsNgo] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const requestToken = searchParams.get('requestToken') ?? '';

  const setCompanyDetails = useHirerSignupStore(
    (state) => state.setCompanyDetails
  );
  const userDetails = useHirerSignupStore((state) => state.userDetails);

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
    if (!userDetails) {
      toast.error('Please start over! Cannot find user details');
      setSearchParams((params) => {
        params.set('step', 'user-details');
        return params;
      });
      return;
    }
    setValue('isNgo', isNgo);
  }, [isNgo, setSearchParams, setValue, userDetails]);

  const navigate = useNavigate();

  const handleBasicDetailsSubmit = async (data: TCompanyDetailsSchema) => {
    setCompanyDetails(data);
    if (!userDetails) {
      toast.error('Please start over! Cannot find user details');
      return;
    }
    const requestData = {
      user: userDetails,
      companyDetails: data,
    };

    try {
      await createHirer({ data: requestData, requestToken });
      navigate('/hirer/auth?accountCreated=true');
    } catch (err) {
      console.log(err);
      const message = parseError(err);
      toast.error(message);
    }
  };

  return (
    <form
      className="tw-flex tw-flex-col tw-gap-5"
      onSubmit={handleSubmit(handleBasicDetailsSubmit)}
    >
      <Input
        label="Company Name"
        placeholder="XYZ inc."
        error={errors.name?.message}
        {...register('name')}
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
