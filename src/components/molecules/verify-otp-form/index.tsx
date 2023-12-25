import { isAxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Input from '../../atoms/input-field';
import { toast } from '../../atoms/toast';
import Button from '../../atoms/button';

import { TVerifyOtpResponse, verifyOTP } from '../../../api-calls/auth';
import { TVerifyOtpSchema, verifyOtpSchema } from '../../../validations/auth';

import { setAccessToken, setRefreshToken } from '../../../utils/auth';

type VerifyOtpFormProps = {
  requestId: string;
  setRequestId: React.Dispatch<React.SetStateAction<string>>;
  type: 'login' | 'register';
  phone: string;
};

const VerifyOtpForm: React.FC<VerifyOtpFormProps> = ({
  requestId,
  setRequestId,
  phone,
  type,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TVerifyOtpSchema>({
    resolver: zodResolver(verifyOtpSchema),
  });

  const navigate = useNavigate();

  const { role } = useParams();

  const handleAfterOtpVerification = (data: TVerifyOtpResponse['data']) => {
    if (data.newUser) {
      const params = new URLSearchParams();
      params.set('requestToken', data.requestToken);
      navigate(`/${role}/onboarding?${params.toString()}`);
      return;
    }

    // login user
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    navigate(`/${role}/dashboard`);
    console.log('data', data);
  };

  const handleVerifyOtpSubmit = async (requestData: TVerifyOtpSchema) => {
    try {
      const responseData = await verifyOTP({
        ...requestData,
        requestId,
      });
      toast.success('OTP verified successfully');
      handleAfterOtpVerification(responseData.data);
    } catch (error) {
      let errorMessage = 'OTP verification failed';
      if (isAxiosError(error)) {
        errorMessage = error.response?.data.message ?? errorMessage;
      }
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <form
        className="tw-w-full lg:tw-max-w-[320px] tw-mb-4"
        onSubmit={handleSubmit(handleVerifyOtpSubmit)}
      >
        <div className="tw-flex">
          <Input
            {...register('otp', { required: 'Phone number is required' })}
            placeholder="123456"
            label="OTP"
            error={errors.otp?.message}
          />
        </div>
        <Button
          disabled={isSubmitting || !errors}
          loading={isSubmitting}
          type="submit"
          block
          variant="primary"
          size="lg"
          className="tw-mt-4"
        >
          {type === 'login' ? 'Login' : 'Register'}
        </Button>
      </form>
      <div className="tw-text-center tw-text-sm">
        OTP has been sent to <b>{phone}</b>.<br />
        Want to{' '}
        <button onClick={() => setRequestId('')} className="tw-cursor-pointer">
          <b>change it?</b>
        </button>
      </div>
    </>
  );
};

export default VerifyOtpForm;
