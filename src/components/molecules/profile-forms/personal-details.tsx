import InfoTooltip from '@/components/atoms/info-tooltip';
import Input from '@/components/atoms/input-field';
import { useUser } from '@/utils/hooks/use-user';

const PersonalDetailsForm: React.FC = () => {
  const { user } = useUser();
  const tooltipMessage =
    "We're curently live only in Bengaluru. Coming to your city soon";

  return (
    <form
      className="tw-flex tw-flex-col tw-gap-5"
      //   onSubmit={handleSubmit(handleBasicDetailsSubmit)}
    >
      <Input label="Full Name" placeholder="John Doe" value={user?.name} />
      <Input label="Email" placeholder="john@gmail.com" value={user?.email} />

      <Input
        label="City"
        labelSuffixElement={<InfoTooltip content={tooltipMessage} />}
        placeholder="Bengaluru"
        disabled
      />
    </form>
  );
};

export default PersonalDetailsForm;
