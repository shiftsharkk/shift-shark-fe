import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';

import Input from '../../../atoms/input-field';
import Button from '../../../atoms/button';

import {
  TBankingDetailsSchema,
  bankingDetailsSchema,
} from '../../../../validations/profile';

import { parseError } from '../../../../utils/parse-error';

import { updateBankDetails } from '../../../../api-calls/service-provider/update-profile-details';
import { useServiceProviderSignupStore } from '@/stores/serviceProvider-signup.store';
import { useEffect } from 'react';

const BankingDetailsForm = () => {
  const [, setSearchParams] = useSearchParams();
  const { basicDetails } = useServiceProviderSignupStore();

  useEffect(() => {
    if (!basicDetails) {
      toast.error('Please start over! Cannot find basic details');
      setSearchParams((params) => {
        params.set('step', 'basic-details');
        return params;
      });
      return;
    }
  }, [setSearchParams, basicDetails]);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<TBankingDetailsSchema>({
    resolver: zodResolver(bankingDetailsSchema),
  });

  const handleBankingDetailsSubmit = async (data: TBankingDetailsSchema) => {
    try {
      await updateBankDetails(data);
      setSearchParams((params) => {
        params.set('step', 'additional-details');
        return params;
      });
    } catch (error) {
      console.error({ error });
      const message = parseError(error);
      toast(message);
    }
  };

  return (
    <form
      className="tw-flex tw-flex-col tw-gap-5"
      onSubmit={handleSubmit(handleBankingDetailsSubmit)}
    >
      <Input
        label="Account Number"
        placeholder="000012345678901234"
        type="password"
        error={errors.accountNumber?.message}
        {...register('accountNumber')}
      />
      <Input
        label="Confirm Account Number"
        placeholder="000012345678901234"
        type="text"
        error={errors.confirmAccountNumber?.message}
        {...register('confirmAccountNumber')}
      />
      <Input
        label="IFSC Code"
        placeholder="12003456789"
        error={errors.ifscCode?.message}
        {...register('ifscCode')}
      />
      <Input
        label="Account Holder Name"
        placeholder="John Doe"
        error={errors.accountHolderName?.message}
        {...register('accountHolderName')}
      />
      <Input
        label="Bank Name"
        placeholder="HDFC"
        error={errors.bankName?.message}
        {...register('bankName')}
      />
      <div className="tw-flex tw-gap-4 | tw-mt-4">
        <Button
          className="tw-flex-1"
          size="lg"
          type="button"
          variant="secondary"
          onClick={() => {
            setSearchParams((params) => {
              params.set('step', 'basic-details');
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

export default BankingDetailsForm;
