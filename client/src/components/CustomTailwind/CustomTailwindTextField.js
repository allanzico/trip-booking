import { useField } from "formik";
import React from "react";

const CustomTailwindTextField = ({ name, label, ...otherProps }) => {
  const [field, metaData] = useField(name);
  const configTextField = {
    ...field,
    ...otherProps,
  };

  if (metaData && metaData.touched && metaData.error) {
    configTextField.error = true;
    configTextField.helperText = metaData.error;
  }
  return (
    <>
      <label
        class="relative block p-3 border-2 border-gray-200 rounded-sm"
        for="textField"
      >
        <input
          class="w-full px-0  pb-0 text-sm placeholder-transparent border-none focus:ring-0 peer"
          id="textField"
          type="text"
          {...configTextField}
        />

        <span class="absolute text-xs font-medium text-gray-500 transition-all left-3 peer-focus:text-xs peer-focus:top-3 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm">
          {label}
        </span>
      </label>
    </>
  );
};

export default CustomTailwindTextField;
