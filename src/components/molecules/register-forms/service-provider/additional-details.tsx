import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Input from '../../../atoms/input-field';
import Button from '../../../atoms/button';
import TextArea from '../../../atoms/text-area';
import MultiInputField from '../../multi-input-field';
import { TSearchInputOption } from '../../search-input';

import {
  TAdditionalDetailsSchema,
  additionalDetailsSchema,
} from '../../../../validations/profile';

import { SERVICE_PROVIDER_STRENGTHS } from '../../../../constants/service-provider-strengths';

import { updateAdditionalDetails } from '../../../../api-calls/service-provider/update-profile-details';

import { parseError } from '../../../../utils/parse-error';

const AdditionalDetailsForm = () => {
  const [selectedStrengths, setSelectedStrengths] = useState<
    TSearchInputOption[]
  >([]);

  const navigate = useNavigate();

  const handleAdditionalDetailsSubmit = async (
    data: TAdditionalDetailsSchema
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      await updateAdditionalDetails(data);
      navigate('/service-provider/dashboard');
    } catch (err) {
      console.error(err);
      const message = parseError(err);
      toast.error(message);
    }
    console.log({ data });
  };

  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    setError,
    handleSubmit,
  } = useForm<TAdditionalDetailsSchema>({
    resolver: zodResolver(additionalDetailsSchema),
  });

  useEffect(() => {
    setValue(
      'skills',
      selectedStrengths.map((strength) => strength.value)
    );
    if (selectedStrengths.length < 3 && selectedStrengths.length > 0) {
      setError('skills', {
        message: 'Please select 3 skills',
      });
    } else {
      setError('skills', {
        message: '',
      });
    }
  }, [selectedStrengths, setValue, setError]);

  return (
    <form
      className="tw-flex tw-flex-col tw-gap-5"
      onSubmit={handleSubmit(handleAdditionalDetailsSubmit)}
    >
      <Input
        label="PAN"
        placeholder="ABCDE1234F"
        {...register('PAN')}
        error={errors.PAN?.message}
      />
      <Input
        label="Aadhar Number"
        placeholder="123412341234"
        {...register('aadharNumber')}
        error={errors.aadharNumber?.message}
      />
      <Input
        label="School/College Name"
        placeholder="ABC University"
        {...register('schoolName')}
        error={errors.schoolName?.message}
      />
      <MultiInputField
        label="Strengths"
        options={SERVICE_PROVIDER_STRENGTHS}
        selectedOptions={selectedStrengths}
        setSelectedOptions={setSelectedStrengths}
        placeholder="Select Strengths (Pick 5)"
        maxSelections={5}
        error={errors.skills?.message}
      />
      <TextArea
        label="About Me"
        placeholder="Introduce yourself briefly (It's okay to brag a little)"
        {...register('aboutMe')}
        error={errors.aboutMe?.message}
      />
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

export default AdditionalDetailsForm;
