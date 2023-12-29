import { List, LogOut, User } from 'lucide-react';

import { Button } from '@/components/shadcn/ui/button';
import { Skeleton } from '@/components/shadcn/ui/skeleton';

import { logout } from '@/utils/auth';

import logo from '../../../assets/logo-dark.svg';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/shadcn/ui/sheet';

const Sidebar = () => {
  return (
    <div className="">
      <div className="tw-hidden lg:tw-w-[264px] tw-h-full tw-bg-white tw-pt-3 lg:tw-flex tw-flex-col tw-justify-between">
        <div className="tw-px-5 tw-grid tw-gap-5">
          <img src={logo} alt="shift shark logo" className="tw-mb-10 tw-mt-3" />
          <Skeleton className="tw-h-8 tw-w-full" />
          <Skeleton className="tw-h-8 tw-w-full" />
          <Skeleton className="tw-h-8 tw-w-full" />
        </div>
        <div className="tw-flex tw-justify-between tw-px-5 tw-py-3 tw-border-t tw-border-[#D6D6D6]">
          <Button
            variant="ghost"
            className="tw-text-base !tw-p-0 hover:tw-bg-transparent"
            onClick={() => {
              logout();
            }}
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
      <div className="tw-flex lg:tw-hidden tw-absolute tw-w-full  tw-items-center tw-bg-white tw-py-3 tw-px-3">
        <Sheet>
          <SheetTrigger asChild>
            <List className="tw-mr-5" />
          </SheetTrigger>
          <img src={logo} alt="shift shark logo" className="" />

          <SheetContent side="left" className="tw-max-w-[264px] tw-px-0">
            <SheetHeader>
              <img
                src={logo}
                alt="shift shark logo"
                className="tw-mb-10 tw-mx-auto"
                width={'150px'}
              />
            </SheetHeader>
            <div className="tw-flex tw-flex-col tw-justify-between tw-h-[calc(100%-40px)]">
              <div className="tw-px-5 tw-grid tw-gap-5">
                <Skeleton className="tw-h-8 tw-w-full" />
                <Skeleton className="tw-h-8 tw-w-full" />
                <Skeleton className="tw-h-8 tw-w-full" />
              </div>
              <div className="tw-flex tw-justify-between tw-px-5 tw-py-3 tw-border-t tw-border-[#D6D6D6]">
                <Button
                  variant="ghost"
                  className="tw-text-base !tw-p-0 hover:tw-bg-transparent"
                  onClick={() => {
                    logout();
                  }}
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
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Sidebar;
