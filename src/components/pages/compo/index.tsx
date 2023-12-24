import { useState } from 'react';

import ToggleSwitch from '../../atoms/toggle-switch';
import { Navigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../shadcn/ui/select';

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
    <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
      <Grouping title="ToggleSwitch">
        <ToggleSwitch toggle={toggle} setToggle={setToggle} size="sm" />
        <ToggleSwitch toggle={toggle} setToggle={setToggle} size="md" />
      </Grouping>
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ComponentsTest;
