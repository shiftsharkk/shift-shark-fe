import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'react-router-dom';
import { isAxiosError } from 'axios';

import Button from '../../../atoms/button';
import Input from '../../../atoms/input-field';
import { toast } from '../../../atoms/toast';

import {
  TUserDetailsSchema,
  userDetailsSchema,
} from '../../../../validations/profile';

import { useHirerSignupStore } from '../../../../stores/hirer-signup.store';

const UserDetailsForm: React.FC = () => {
  const [ , setSearchParams] = useSearchParams();

  const setUserDetails = useHirerSignupStore((state) => state.setUserDetails);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<TUserDetailsSchema>({
    resolver: zodResolver(userDetailsSchema),
  });

  const handleBasicDetailsSubmit = async (data: TUserDetailsSchema) => {
    try {
      setUserDetails(data);
      // go to next step
      setSearchParams((params) => {
        params.set('step', 'company-details');
        return params;
      });
    } catch (err) {
      let errMessage =
        'Something went wrong wile registering user. Please try again later.';
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
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        label="Employee Id"
        placeholder="123456"
        {...register('employeeId')}
        error={errors.employeeId?.message}
      />
      <Input
        label="Designation"
        {...register('designation')}
        error={errors.designation?.message}
        placeholder="Manager"
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
