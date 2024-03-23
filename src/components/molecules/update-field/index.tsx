import React from 'react';

type Props = {
  img: string;
  description: string;
};

const UpdateField: React.FC<Props> = (props: Props) => {
  return (
    <div className="tw-flex tw-bg-[#FAFAFA] tw-rounded-[12px] tw-gap-x-2 tw-p-2 tw-cursor-pointer">
      <div className="tw-w-20 tw-h-12 tw-rounded-full tw-bg-[#ffffff] tw-flex tw-items-center tw-justify-center">
        <img
          src={props.img}
          alt="person"
          className="tw-w-8 tw-h-8 tw-rounded-full tw-object-contain"
        />
      </div>
      <div className="tw-break-before-avoid">{props.description}</div>
    </div>
  );
};

export default UpdateField;
