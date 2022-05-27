import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CustomerFormInputs } from 'apiService/types';
import { CustomerFormProps } from './types';
import { FormTextInput } from 'components';
import { submissionAPI } from 'apiService';

const schema = yup
  .object({
    customer_name: yup
      .string()
      .trim()
      .required('Must not be empty')
      .test(
        'name-checker',
        'First & Last name are required. e.g. "xxxx xxxx"',
        (value) => value?.split(' ').length === 2
      ),
    customer_email: yup
      .string()
      .required('Invalid Email')
      .email('Invalid Email'),
    text_body: yup.string().required('Must not be empty'),
  })
  .required();

const defaultValues: CustomerFormInputs = {
  customer_name: '',
  customer_email: '',
  text_body: '',
};

const CFINPUTDATKEY = 'cfInputData';

export default function CustomerForm({
  submissionUrl,
  onResult,
}: CustomerFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  // react hook form useForm hooks
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<CustomerFormInputs>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  // store / remove the inputs to / from the localStorage
  const storeOrRemoveInputData = (opt?: { isRemove: boolean }) => {
    if (opt?.isRemove) {
      localStorage.removeItem(CFINPUTDATKEY);
      return;
    }
    try {
      localStorage.setItem(CFINPUTDATKEY, JSON.stringify(getValues()));
    } catch (error) {
      console.log(error);
    }
  };

  const onBeforeUnload = () => storeOrRemoveInputData();

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload);
    try {
      // load and init with the inputs data from the localStorage
      const data = JSON.parse(
        localStorage.getItem(CFINPUTDATKEY) || '{}'
      ) as CustomerFormInputs;

      // init the inputs data
      setValue('customer_name', data.customer_name);
      setValue('customer_email', data.customer_email);
      setValue('text_body', data.text_body);
    } catch (error) {
      console.log(error);
    }
    return () => {
      // store the inputs to localStorage
      storeOrRemoveInputData();
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // form submit
  const onSubmit = (params: CustomerFormInputs) => {
    if (isLoading) return;

    setIsLoading(true);
    submissionAPI(submissionUrl, params)
      .then((res) => {
        setIsLoading(false);
        const { status } = res;
        if (status === 'good') {
          reset();
          storeOrRemoveInputData({ isRemove: true });
        }
        onResult &&
          onResult({
            ...res,
            success: status === 'good',
          });
      })
      .catch((e) => {
        setIsLoading(false);
        onResult &&
          onResult({
            success: false,
            message: e.toString(),
          });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
        gap={1.5}
        py={1}
      >
        <FormTextInput
          name='customer_name'
          control={control}
          label='Name'
          error={errors.customer_name?.message}
        />
        <FormTextInput
          name='customer_email'
          control={control}
          label='Email'
          error={errors.customer_email?.message}
        />
        <FormTextInput
          name='text_body'
          control={control}
          label='Notice'
          multiline
          error={errors.text_body?.message}
        />
        <Button type='submit' variant='contained' disabled={isLoading}>
          Submit
        </Button>
      </Box>
    </form>
  );
}
