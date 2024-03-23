import img from '../../../assets/images/image.png';
import message from '../../../assets/icons/message-svg.svg';
import MessageField from '@/components/molecules/message-field';
import notification from '../../../assets/icons/notification-svg.svg';
import person from '../../../assets/icons/user-black.svg';
import UpdateField from '@/components/molecules/update-field';

const MessageBar = () => {
  return (
    <div className="tw-bg-[#ffffff] tw-w-[22%] tw-max-h-screen tw-min-h-screen tw-overflow-scroll tw-fixed tw-right-0">
      <div className="tw-flex tw-flex-col tw-pt-16 tw-w-full tw-justify-center tw-items-center tw-gap-y-4">
        <img
          src={img}
          alt="img"
          className="tw-w-[120px] tw-h-[120px] tw-rounded-full tw-object-cover"
        />
        <div className="tw-flex tw-flex-col tw-gap-y-1 tw-justify-center tw-items-center">
          <div className="tw-text-2xl tw-font-semibold">SUDEEP GAMASTE</div>
          <div className="tw-text-lg">Manager</div>
        </div>
      </div>
      <div className="tw-w-full tw-flex tw-flex-col tw-px-8 tw-pt-10 tw-gap-y-4">
        <div className="tw-flex tw-justify-between tw-w-full">
          <div className="tw-text-xl tw-font-bold">Messages</div>
          <img src={message} alt="message" />
        </div>
        <MessageField
          img={img}
          title="Ishika Garg"
          description="Lorem ipsum dolor sit amet consecte tur adipisicing elit. Omnis eum amet maxime veritatis beatae officia nostrum!"
        />
        <MessageField
          img={img}
          title="Ishika Garg"
          description="Lorem ipsum dolor sit amet consecte tur adipisicing elit. Omnis eum amet maxime veritatis beatae officia nostrum!"
        />
        <MessageField
          img={img}
          title="Ishika Garg"
          description="Lorem ipsum dolor sit amet consecte tur adipisicing elit. Omnis eum amet maxime veritatis beatae officia nostrum!"
        />
      </div>
      <div className="tw-w-full tw-flex tw-flex-col tw-px-8 tw-pt-10 tw-gap-y-4">
        <div className="tw-flex tw-justify-between tw-w-full">
          <div className="tw-text-xl tw-font-bold">Recent Updates</div>
          <img src={notification} alt="notification" />
        </div>
        <UpdateField
          img={person}
          description="Lorem ipsum dolor, sit amet consec tetur adipisicing elit."
        />
        <UpdateField
          img={person}
          description="Lorem ipsum dolor, sit amet consec tetur adipisicing elit."
        />
        <UpdateField
          img={person}
          description="Lorem ipsum dolor, sit amet consec tetur adipisicing elit."
        />
      </div>
    </div>
  );
};

export default MessageBar;
