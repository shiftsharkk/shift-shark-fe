import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Input from '@/components/atoms/input-field';
import Button from '@/components/atoms/button';

import {
  TBankingDetailsSchema,
  bankingDetailsSchema,
} from '@/validations/profile';
import { updateBankDetails } from '@/api-calls/service-provider/update-profile-details';
import { parseError } from '@/utils/parse-error';
import { useEffect, useMemo } from 'react';
import { useUser } from '@/utils/hooks/use-user';

const BankingDetailsForm = () => {
  const { user } = useUser();
  const bankDetails = useMemo(() => {
    return user?.bankDetails;
  }, [user]);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<TBankingDetailsSchema>({
    resolver: zodResolver(bankingDetailsSchema),
    defaultValues: {
      accountNumber: bankDetails?.accountNumber,
      confirmAccountNumber: bankDetails?.accountNumber,
      ifscCode: bankDetails?.ifscCode,
      accountHolderName: bankDetails?.accountHolderName,
      bankName: bankDetails?.bankName,
    },
  });

  useEffect(() => {
    reset({
      accountNumber: bankDetails?.accountNumber,
      confirmAccountNumber: bankDetails?.accountNumber,
      ifscCode: bankDetails?.ifscCode,
      accountHolderName: bankDetails?.accountHolderName,
      bankName: bankDetails?.bankName,
    });
  }, [bankDetails, reset]);

  const handleBankingDetailsSubmit = async (data: TBankingDetailsSchema) => {
    try {
      await updateBankDetails(data);
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

export default BankingDetailsForm;
