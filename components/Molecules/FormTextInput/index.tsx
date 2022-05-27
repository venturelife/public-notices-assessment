import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { FormTextInputProps } from './types';

export default function FormTextInput({
  name,
  control,
  error,
  label,
  rows,
  multiline,
}: FormTextInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          onChange={onChange}
          value={value}
          fullWidth
          error={!!error}
          helperText={error}
          label={label}
          rows={multiline ? 6 : rows || 1}
          multiline={multiline}
        />
      )}
    />
  );
}
