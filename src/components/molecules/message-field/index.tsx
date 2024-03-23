import React from 'react';

type Props = {
  img: string;
  title?: string;
  description: string;
};

const MessageField: React.FC<Props> = (props: Props) => {
  return (
    <div className="tw-w-full tw-bg-[#FAFAFA] tw-flex tw-rounded-[12px] tw-items-center tw-p-2 tw-cursor-pointer">
      <div className="tw-w-36 tw-h-12">
        <img
          src={props.img}
          alt="img"
          className="tw-w-full tw-h-full tw-rounded-full tw-object-cover"
        />
      </div>
      <div className="tw-flex tw-flex-col tw-text-left tw-ml-2">
        {props.title && (
          <div className="tw-text-lg tw-font-bold">{props.title}</div>
        )}
        <div className="tw-line-clamp-1">{props.description}</div>
      </div>
    </div>
  );
};

export default MessageField;
