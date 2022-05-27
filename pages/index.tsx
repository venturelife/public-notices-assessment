import { useState } from 'react';
import Head from 'next/head';
import { Alert, Container, Grid, Snackbar, Typography } from '@mui/material';
import moment from 'moment';
import { CustomerForm } from 'components';
import { CFSubmitResult } from 'components/Organisms/CustomerForm/types';

type AlertDataType = Partial<CFSubmitResult> & {
  open: boolean;
};

export default function Home() {
  const [alert, setAlert] = useState<AlertDataType>();
  // URL for submitting the input form
  const submission_url = '/api/submit';

  const onFormResult = (res: CFSubmitResult) => {
    setAlert({
      ...res,
      open: true,
    });
  };

  return (
    <Container>
      <Head>
        <title>Public Notices</title>
        <meta name='description' content='Public Notices' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Grid>
        <Typography variant='h1'>Public Notices</Typography>
      </Grid>
      <Grid>{/* Place user feedback messages here */}</Grid>
      <Grid>
        <Typography>
          Please enter your information into the submission form below and click
          &quot;Submit&quot; when finished.
        </Typography>
        {/* Input form should go here */}
        <CustomerForm submissionUrl={submission_url} onResult={onFormResult} />
      </Grid>
      {/* add a receipt displaying the datetime of submission to a list underneath the form */}
      {alert?.data && (
        <Typography variant='body1' component='h2' textAlign='center'>
          {`${alert.data.name} submitted successfully at ${moment(
            alert.data.createdAt * 1000
          ).format('MM/DD/YYYY h:mm:ss a')}`}
        </Typography>
      )}
      <Grid>
        {/* Place submitted notice here */}
        <Snackbar
          open={alert?.open}
          autoHideDuration={4000}
          onClose={() => setAlert({ open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity={alert?.success ? 'success' : 'error'}>
            {alert?.message}
          </Alert>
        </Snackbar>
      </Grid>
    </Container>
  );
}
