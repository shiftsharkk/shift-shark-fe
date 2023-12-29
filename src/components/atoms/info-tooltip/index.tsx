import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn/ui/tooltip';
import { Info } from 'lucide-react';
import React from 'react';

type TInfoTooltip = {
  content: string;
};
const InfoTooltip: React.FC<TInfoTooltip> = ({ content }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info size="18px" />
        </TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InfoTooltip;
