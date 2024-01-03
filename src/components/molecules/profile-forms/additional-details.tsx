import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { TSearchInputOption } from '../search-input';
import {
  TAdditionalDetailsSchema,
  additionalDetailsSchema,
} from '@/validations/profile';
import { updateAdditionalDetails } from '@/api-calls/service-provider/update-profile-details';
import { parseError } from '@/utils/parse-error';
import Input from '@/components/atoms/input-field';
import MultiInputField from '../multi-input-field';
import { SERVICE_PROVIDER_STRENGTHS } from '@/constants/service-provider-strengths';
import TextArea from '@/components/atoms/text-area';
import Button from '@/components/atoms/button';
import InfoTooltip from '@/components/atoms/info-tooltip';

import { useUser } from '@/utils/hooks/use-user';
import useIsOnboardingRoute from '@/utils/hooks/use-is-onboarding-route';

const AdditionalDetailsForm = () => {
  const isOnboardingRoute = useIsOnboardingRoute();

  const [selectedStrengths, setSelectedStrengths] = useState<
    TSearchInputOption[]
  >([]);

  const handleAdditionalDetailsSubmit = async (
    data: TAdditionalDetailsSchema
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      await updateAdditionalDetails(data);
    } catch (err) {
      console.error(err);
      const message = parseError(err);
      toast.error(message);
    }
    console.log({ data });
  };
  const { user } = useUser();
  const additionalDetails = useMemo(() => {
    return user?.additionalDetails;
  }, [user]);

  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    setError,
    handleSubmit,
    reset,
  } = useForm<TAdditionalDetailsSchema>({
    resolver: zodResolver(
      isOnboardingRoute
        ? additionalDetailsSchema
        : additionalDetailsSchema.omit({ PAN: true, aadharNumber: true })
    ),
    defaultValues: {
      PAN: additionalDetails?.PAN,
      aadharNumber: additionalDetails?.aadharNumber,
      schoolName: additionalDetails?.schoolName,
      skills: additionalDetails?.skills,
      aboutMe: additionalDetails?.aboutMe,
    },
  });

  useEffect(() => {
    reset({
      PAN: additionalDetails?.PAN,
      aadharNumber: additionalDetails?.aadharNumber,
      schoolName: additionalDetails?.schoolName,
      skills: additionalDetails?.skills,
      aboutMe: additionalDetails?.aboutMe,
    });
    if (additionalDetails?.skills) {
      const skillsArray = additionalDetails.skills.map(
        (skill: string) =>
          SERVICE_PROVIDER_STRENGTHS.find(
            (strength) => strength.value === skill
          )!
      );
      setSelectedStrengths(skillsArray);
    }
  }, [additionalDetails, reset]);

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
        labelSuffixElement={
          <InfoTooltip content="Please contact us to change your PAN" />
        }
        placeholder="ABCDE1234F"
        {...register('PAN')}
        error={errors.PAN?.message}
        disabled={!isOnboardingRoute}
      />
      <Input
        label="Aadhar Number"
        labelSuffixElement={
          <InfoTooltip content="Please contact us to change your Aadhar Number" />
        }
        placeholder="123412341234"
        {...register('aadharNumber')}
        error={errors.aadharNumber?.message}
        disabled={!isOnboardingRoute}
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
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default AdditionalDetailsForm;
