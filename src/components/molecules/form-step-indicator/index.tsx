import FormStepIndicatorElement, {
  TFormStepIndicatorElement,
} from "../../atoms/form-step-indicator-element";

type Props = {
  steps: Omit<TFormStepIndicatorElement, "showConnector" | "active">[];
  activeStep: number;
};

const FormStepIndicator: React.FC<Props> = ({ steps, activeStep }) => {
  return (
    <div className="tw-flex lg:tw-flex-col">
      {steps.map((step, index) => (
        <FormStepIndicatorElement
          key={index}
          {...step}
          active={index === activeStep}
          showConnector={index !== steps.length - 1}
        />
      ))}
    </div>
  );
};

export default FormStepIndicator;
