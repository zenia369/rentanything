import { FC, HTMLAttributes } from "react";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  placeholder: string;
  list?: string;
  step?: number | string;
}

interface ErrorListProps {
  id?: string;
  errors?: string[] | null;
}

export const inputStyles =
  "py-1 px-2 border border-gray-200 rounded h-12 placeholder:capitalize";

export const ErrorList: FC<ErrorListProps> = ({ id, errors }) => {
  return errors?.length ? (
    <ul id={id} className="flex flex-col gap-1">
      {errors.map((error, i) => (
        <li
          key={i}
          className="text-red-500 text-xs font-normal leading-none flex gap-1"
        >
          {error}
        </li>
      ))}
    </ul>
  ) : null;
};

const Input: FC<InputProps> = ({
  placeholder,
  className,
  list,
  step,
  ...props
}) => {
  return (
    <input
      {...props}
      placeholder={placeholder}
      className={`${inputStyles} ${className}`}
      list={list}
      step={step}
    />
  );
};

export default Input;
