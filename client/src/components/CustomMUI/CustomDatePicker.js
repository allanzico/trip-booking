import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useField } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const CustomDatePicker = ({ name, label, onChange, value, ...otherProps }) => {

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#F97316",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#F97316",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#D1D5DB",
        borderRadius: 1,
      },
      "&:hover fieldset": {
        borderColor: "#CBD5E1",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#D1D5DB",
      },
    },
  });

  const [field, meta] = useField(name);
  const configDateTimePicker = {
    ...field,
    ...otherProps,
    type: "date",
    variant: "outlined",
    InputLabelProps: {
      shrink: true,
    },
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DesktopDatePicker
        disablePast
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <CssTextField fullWidth {...params} {...configDateTimePicker} />
        )}
      />
    </LocalizationProvider>
    //   <CssTextField fullWidth={true} {...configDateTimePicker} sx={{border: 0}}  />
  );
};

export default CustomDatePicker;
