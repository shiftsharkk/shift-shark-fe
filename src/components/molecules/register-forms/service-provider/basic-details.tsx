import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'react-router-dom';

import Button from '../../../atoms/button';
import Input from '../../../atoms/input-field';
import RadioButton from '../../../atoms/radio-button';
import TextArea from '../../../atoms/text-area';
import { toast } from '../../../atoms/toast';
import CalendarField from '../../calendar-field';

import { createServiceProvider } from '../../../../api-calls/service-provider/create-account';

import {
  Genders,
  TPersonalDetailsSchema,
  personalDetailsSchema,
} from '../../../../validations/profile';

import { setAccessToken, setRefreshToken } from '../../../../utils/authTokens';
import { parseError } from '../../../../utils/parse-error';

const BasicDetailsForm: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const requestToken = searchParams.get('requestToken') ?? '';

  const {
    register,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<TPersonalDetailsSchema>({
    defaultValues: {
      gender: Genders.Male,
    },
    resolver: zodResolver(personalDetailsSchema),
  });

  const handleBasicDetailsSubmit = async (data: TPersonalDetailsSchema) => {
    try {
      const response = await createServiceProvider({
        requestToken,
        userData: {
          user: {
            ...data,
            dob: data.dob.getTime(),
          },
        },
      });
      
      setAccessToken(response.data.accessToken)
      setRefreshToken(response.data.refreshToken)

      // go to next step
      setSearchParams((params) => {
        params.set('step', 'banking-details');
        return params;
      });
    } catch (err) {
      console.log({err})
      const errMessage = parseError(err)
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
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        label="Email"
        placeholder="john@gmail.com"
        {...register('email')}
        error={errors.email?.message}
      />
      <RadioButton
        options={[
          {
            label: 'Male',
            value: 'Male',
          },
          {
            label: 'Female',
            value: 'Female',
          },
        ]}
        id="gender"
        label="Gender"
        value={getValues('gender')}
        onClick={(value) => {
          setValue('gender', value as Genders);
        }}
      />
      <CalendarField
        value={getValues('dob')}
        onChange={(value) => {
          setValue('dob', value);
        }}
        label="Date of birth"
        error={errors.dob?.message}
      />
      <TextArea
        label="Address"
        placeholder="Enter your address"
        {...register('address')}
        error={errors.address?.message}
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

export default BasicDetailsForm;
