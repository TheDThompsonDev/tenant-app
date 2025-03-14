import LABELS from "../constants/labels";

const ReuseableButton = () => {
  return (
    <button className={`${LABELS.buttons.FooterSignUp.style} min-w-[8rem] tracking-wider rounded-md p-3 text-lg hover:translate-0.5`}>
      {LABELS.buttons.FooterSignUp.label}
    </button>
  );
};

export default ReuseableButton;
