import { useState } from 'react';

import ToggleSwitch from '../../atoms/toggle-switch';
import { Navigate } from 'react-router-dom';

type TGroupingProps = {
  title: string;
  children: React.ReactNode;
};

const Grouping: React.FC<TGroupingProps> = ({ title, children }) => {
  return (
    <div className="tw-mb-7">
      <h1 className="tw-text-3xl tw-mb-2 | tw-font-bold">{title}</h1>
      <div>{children}</div>
    </div>
  );
};

const ComponentsTest = () => {
  const [toggle, setToggle] = useState(false);

  if (import.meta.env.MODE === 'production') {
    return <Navigate to="/" />;
  }

  return (
    <Grouping title="ToggleSwitch">
      <ToggleSwitch toggle={toggle} setToggle={setToggle} size="sm" />
      <ToggleSwitch toggle={toggle} setToggle={setToggle} size="md" />
    </Grouping>
  );
};

export default ComponentsTest;
