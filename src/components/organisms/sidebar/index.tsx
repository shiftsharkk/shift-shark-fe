import { Button } from '@/components/shadcn/ui/button';
import { Skeleton } from '@/components/shadcn/ui/skeleton';
import { LogOut, User } from 'lucide-react';
import logo from '../../../assets/logo-dark.svg';

const Sidebar = () => {
  return (
    <div className="tw-w-[264px] tw-h-full tw-bg-white tw-pt-3 tw-flex tw-flex-col tw-justify-between">
      <div className="tw-px-5 tw-grid tw-gap-5">
        <img src={logo} alt="shift shark logo" className="tw-mb-10 tw-mt-3" />
        <Skeleton className="tw-h-8 tw-w-full" />
        <Skeleton className="tw-h-8 tw-w-full" />
        <Skeleton className="tw-h-8 tw-w-full" />
      </div>
      <div className="tw-flex tw-justify-between tw-px-5 tw-py-3 tw-border-t twborder-[#D6D6D6]">
        <Button
          variant="ghost"
          className="tw-text-base !tw-p-0 hover:tw-bg-transparent"
        >
          <LogOut className="tw-w-6 tw-mr-1" />
          Logout
        </Button>
        <Button
          variant="outline"
          className="tw-text-base tw-bg-[#E7E7E7] tw-border tw-border-[#D6D6D6] !tw-rounded-full tw-w-10 tw-h-10 !tw-p-0"
        >
          <User className="tw-w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
