import React from 'react'
import { useFormikContext } from "formik";
import { Button } from '@mui/material';

const CustomSubmitButton = ({children}) => {
    const { submitForm } = useFormikContext();
    const handleSubmit = () => {
        submitForm()
    }

    const configButton = {
        variant: 'contained',
        color:'primary',
        fullWidth: true,
        onClick: handleSubmit
    }
  return (
    <Button {...configButton} >
                {children}
    </Button>
  )
}

export default CustomSubmitButton
