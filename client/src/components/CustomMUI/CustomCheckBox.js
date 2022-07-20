import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import React from "react";
import { useField, useFormikContext } from "formik";

const CustomCheckBox = ({ name, label, legend, value, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, metaData] = useField(name);
  const handleChange = (e) => {
    const { checked } = e.target;
    setFieldValue(name, checked);
  };
  const configCheckbox = {
    ...field,
    onChange: handleChange,
  };

  const configFormControl = {};

  if (metaData && metaData.touched && metaData.error) {
    configFormControl.error = true;
    configFormControl.helpertext = metaData.error
  }

  return (
    <FormControl {...configFormControl}>
      <FormLabel component="legend" className="text-orange-500">{legend}</FormLabel>

      <FormGroup>
        <FormControlLabel
          control={<Checkbox {...configCheckbox} value={value} />}
          label={label}
        />
      </FormGroup>
    </FormControl>
  );
};

export default CustomCheckBox;
