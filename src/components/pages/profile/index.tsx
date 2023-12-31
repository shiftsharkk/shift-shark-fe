import PersonalDetailsForm from '@/components/molecules/profile-forms/personal-details';
import BankingDetailsForm from '@/components/molecules/profile-forms/banking-details';
import Sidebar from '@/components/organisms/sidebar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/ui/card';
import AdditionalDetailsForm from '@/components/molecules/profile-forms/additional-details';

const Profile = () => {
  return (
    <div className="tw-flex tw-w-screen tw-h-screen">
      <Sidebar />
      <div className="tw-w-full lg:tw-w-[calc(100%-264px)] tw-h-screen tw-flex tw-flex-col  tw-text-center  tw-overflow-y-auto">
        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-gap-10 tw-w-full tw-px-10 lg:tw-px-32 tw-py-20">
          <div className="tw-min-w-80 lg:tw-w-1/2">
            <Card className="tw-w-full">
              <CardHeader>
                <CardTitle>Personal Details</CardTitle>
              </CardHeader>
              <CardContent>
                <PersonalDetailsForm />
              </CardContent>
            </Card>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-10  tw-w-full lg:tw-min-w-80">
            <Card className="tw-w-full">
              <CardHeader>
                <CardTitle>Banking Details</CardTitle>
              </CardHeader>
              <CardContent>
                <BankingDetailsForm />
              </CardContent>
            </Card>
            <Card className="tw-w-full">
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
              </CardHeader>
              <CardContent>
                <AdditionalDetailsForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
