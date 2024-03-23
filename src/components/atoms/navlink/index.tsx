import { NavLink as Nav } from 'react-router-dom';

type Props = {
  key: string;
  title: string;
  icon: string;
  link: string;
};

const NavLink = (props: Props) => {
  return (
    <Nav
      key={props.title}
      to={props.link}
      className={({ isActive }) =>
        [
          !isActive && 'tw-bg-[#BEDCFFB0]',
          'tw-py-2  tw-w-full tw-flex tw-font-[500] hover:tw-bg-[#BEDCFFB0] tw-gap-x-3 tw-px-7 tw-text-lg tw-relative tw-group tw-cursor-pointer',
        ].join(' ')
      }
    >
      {({ isActive }) => (
        <>
          <span>
            <img
              src={props.icon}
              alt="home"
              className="tw-w-[24px] tw-h-[24px]"
            />
          </span>
          <span>{props.title}</span>
          <div
            className={[
              !isActive ? 'tw-w-1' : 'tw-w-0',
              'tw-absolute tw-top-0 tw-right-0 tw-bg-blue-500 tw-h-full group-hover:tw-w-1 ',
            ].join(' ')}
          ></div>
        </>
      )}
    </Nav>
  );
};

export default NavLink;
