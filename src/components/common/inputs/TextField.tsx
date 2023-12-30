import React from "react";
import { useFormContext } from "react-hook-form";
import ErrorHandler from "./ErrorHandler";
type IProps = {
  name: string;
  componentProps: any;
  className?: string;
};
function TextField(props: IProps) {
  const objForm = useFormContext();
  return (
    <div>
      <input
        {...objForm.register(props.name)}
        className={`peer w-full h-full bg-transparent text-blue-gray-700 mb-2 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 ${
          props?.className && props?.className
        }`}
        {...props.componentProps}
      />
      <ErrorHandler errors={objForm.formState.errors} name={props.name} />
    </div>
  );
}

export default TextField;
