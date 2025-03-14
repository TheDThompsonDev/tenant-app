

const Button = ({
  label,
  href,
  style,
}: {
  label: string;
  href: string;
  style: string;
}) => {
  return (
    <a href={href}>
      <button
        className={`${style} min-w-[8rem] tracking-wider rounded-md p-3 text-lg hover:translate-0.5 hover:cursor-pointer`}
      >
        {label}
      </button>
    </a>
  );
};

export default Button;
