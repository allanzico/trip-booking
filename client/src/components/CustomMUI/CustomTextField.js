import { TextField } from '@mui/material'
import { alpha, styled } from '@mui/material/styles';
import React from 'react'
import {useField} from 'formik'

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
      borderRadius: 3,
    },
    '&:hover fieldset': {
      borderColor: '#CBD5E1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#D1D5DB',
    },
  },
  
});


const CustomTextField = ({name, ...otherProps}) => {
  
  const [field, metaData ] = useField(name)
  const configTextField = {
    ...field,
    ...otherProps,
    variant: "outlined"
  };

  if (metaData && metaData.touched && metaData.error) {
    configTextField.error = true
    configTextField.helperText = metaData.error
  }
  return (
    // <TextField {...configTextField}/>
    <CssTextField fullWidth={true} {...configTextField} sx={{border: 0}}  />

  )
}

export default CustomTextField