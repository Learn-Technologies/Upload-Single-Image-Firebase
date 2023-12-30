import { ErrorMessage } from "@hookform/error-message";
import React from "react";
type IProps = {
  errors: any;
  name: string;
};
export default function ErrorHandler(props: IProps) {
  return (
    <ErrorMessage
      errors={props.errors}
      name={props.name}
      render={({ message }) => <p className="text-red-500">{message}</p>}
    />
  );
}
