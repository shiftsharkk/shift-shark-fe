import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'react-router-dom';

import Button from '../../../atoms/button';
import Input from '../../../atoms/input-field';
import RadioButton from '../../../atoms/radio-button';
import { toast } from '../../../atoms/toast';
import CalendarField from '../../calendar-field';
import InfoTooltip from '@/components/atoms/info-tooltip';
import { createServiceProvider } from '../../../../api-calls/service-provider/create-account';

import {
  Genders,
  TPersonalDetailsSchema,
  personalDetailsSchema,
} from '../../../../validations/profile';

import { setAccessToken, setRefreshToken } from '../../../../utils/auth';
import { parseError } from '../../../../utils/parse-error';
import { useServiceProviderSignupStore } from '@/stores/serviceProvider-signup.store';

const BasicDetailsForm: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tooltipMessage =
    "We're curently live only in Bengaluru. Coming to your city soon";
  const requestToken = searchParams.get('requestToken') ?? '';
  const { setBasicDetails } = useServiceProviderSignupStore();
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
      setBasicDetails(data);
      const response = await createServiceProvider({
        requestToken,
        userData: {
          user: {
            ...data,
            dob: data.dob.getTime(),
          },
        },
      });

      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);

      // go to next step
      setSearchParams((params) => {
        params.set('step', 'banking-details');
        return params;
      });
    } catch (err) {
      console.log({ err });
      const errMessage = parseError(err);
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
      <Input
        label="City"
        labelSuffixElement={<InfoTooltip content={tooltipMessage} />}
        placeholder="Bengaluru"
        disabled
      />

      <p className="tw-text-sm tw-mb-2 | tw-block | tw-font-bold | tw-mt-2">
        By clicking on Next, you acknowledge and accept our Terms and
        Conditions.
      </p>
      <Button
        loading={isSubmitting}
        disabled={isSubmitting}
        type="submit"
        block
        size="lg"
        className=""
      >
        Next
      </Button>
    </form>
  );
};

export default BasicDetailsForm;
