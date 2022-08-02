import { FC, ReactNode } from "react";
import classnames from "classnames";
import { Input as AntDInput } from "antd";
import "./style.scss";

interface IPropType {
  value: string;
  onChange: TCallback;
  placeholder?: string;
  size?: "small" | "middle" | "large";
  onBlur?: TCallback;
  background?: "theme" | "white" | "black";
  noBorder?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

const Input: FC<IPropType> = (props) => {
  const { size, onChange, value, background, noBorder, placeholder, prefix, suffix } = props;

  return (
    <AntDInput
      size={size}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className={classnames("custom-input", `bg-${background}`, {
        [`no-border`]: noBorder,
      })}
      prefix={prefix}
      suffix={suffix}
    />
  );
};

Input.defaultProps = {
  size: "small",
  background: "theme",
  noBorder: true,
  placeholder: "",
};

export default Input;
