import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import Input from '../../atoms/input-field';
import Button from '../../atoms/button';

import {
  TBankingDetailsSchema,
  bankingDetailsSchema,
} from '../../../validations/profile';

const BankingDetailsForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const requestToken = searchParams.get('requestToken') ?? '';

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<TBankingDetailsSchema>({
    resolver: zodResolver(bankingDetailsSchema),
  });

  const handleBasicDetailsSubmit = async (data: TBankingDetailsSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log({ data });
  };

  return (
    <form
      className="tw-flex tw-flex-col tw-gap-5"
      onSubmit={handleSubmit(handleBasicDetailsSubmit)}
    >
      <Input
        label="Account Number"
        placeholder="000012345678901234"
        error={errors.accountNumber?.message}
        {...register('accountNumber')}
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
