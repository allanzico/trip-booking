import { TextField } from '@mui/material'
import { alpha, styled } from '@mui/material/styles';
import React from 'react'
import { useField } from 'formik'

const CustomDatePicker = ({name, ...otherProps}) => {
  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#F97316',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#F97316',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#D1D5DB',
        borderRadius: 1,
      },
      '&:hover fieldset': {
        borderColor: '#CBD5E1',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#D1D5DB',
      },
    },
    
  });

  const [field, meta] = useField(name)
  const configDateTimePicker = {
    ...field,
    ...otherProps,
    type: 'date',
    variant: 'outlined',
    InputLabelProps: {
      shrink: true,
     }
   }

   if (meta && meta.touched && meta.error) {
     configDateTimePicker.error = true
     configDateTimePicker.helperText = meta.error
   }

  return (
    <CssTextField fullWidth={true} {...configDateTimePicker} sx={{border: 0}}  />
  )
}

export default CustomDatePicker