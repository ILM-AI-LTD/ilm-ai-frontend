import * as React from "react";
import { twMerge } from "tailwind-merge";
import { CircleAlert, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  labelText?: string;
  errors?: string;
  touched?: boolean;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const { className, labelText, type, errors, touched, ...restProps } = props;

    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prevState) => !prevState);
    };

    return (
      <div className="w-full flex flex-col justify-center items-start gap-2">
        <Label className="text-base font-medium text-primary-font-color">{labelText}</Label>

        <div className="w-full relative">
          <Input
            ref={ref}
            className={twMerge(
              `text-start text-primary-font-color border-input-border-color ${touched && errors ? "placeholder:text-destructive  border-solid border-destructive !ring-destructive" : ""}`,
              className
            )}
            {...restProps}
            type={
              type === "password" && !isPasswordVisible ? "password" : "text"
            }
            autoComplete="off"
          />

          {type === "password" && (
            <div
              className="absolute top-1 right-1 cursor-pointer p-2"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <Eye color="#6B7280" size={16} />
              ) : (
                <EyeOff color="#6B7280" size={16} />
              )}
            </div>
          )}
        </div>

        {touched && errors ? (
          <div className="flex flex-row items-start justify-center gap-2">
            <div className="flex justify-start mt-[2px]">
              <CircleAlert size={15} color="#F51714" />
            </div>
            <p className="text-red-500 text-sm font-medium">{errors}</p>
          </div>
        ) : null}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
