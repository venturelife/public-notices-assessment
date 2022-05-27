import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import { Container, Grid, Typography } from '@mui/material';
import { CustomerFormInputs } from 'apiService/types';

type SubmissionType = {
  filename: string;
  content: CustomerFormInputs;
};

export async function getServerSideProps() {
  const base_path = path.join(process.cwd(), `/public/submissions`);
  const file_list = fs.readdirSync(base_path);
  let submissions: SubmissionType[] = [];
  // loop over files in directory and return an array of objects that includes their filename & contents
  for (const file of file_list) {
    const file_data = fs.readFileSync(`${base_path}/${file}`, {
      encoding: 'utf8',
      flag: 'r',
    });
    submissions.push({
      filename: file,
      content: JSON.parse(file_data) as CustomerFormInputs,
    });
  }
  return {
    props: {
      submissions: submissions.sort((a, b) =>
        b.filename > a.filename ? 1 : b.filename < a.filename ? -1 : 0
      ),
    },
  };
}

export default function Submissions(props: { submissions: SubmissionType[] }) {
  // get the epoch time from the filename
  const parseEpoch = (filename: string) => {
    const regex = /^.+_(\d+).json$/;
    const epoch_time = filename.match(regex)![1];
    const date_time = new Date(parseFloat(epoch_time) * 1000);
    return date_time.toLocaleDateString();
  };

  // convert submission objects into jsd
  const submissions = props.submissions.map((s) => {
    const parsed_date = parseEpoch(s.filename);
    return (
      <Grid key={parsed_date}>
        <Grid>
          <Typography>
            Date: {parsed_date}
            <br />
          </Typography>
        </Grid>
        <Grid>
          <Grid>
            <Typography>Customer Name: {s.content.customer_name}</Typography>
          </Grid>
          <Grid>
            <Typography>Customer Email: {s.content.customer_email}</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Typography>{s.content.text_body}</Typography>
        </Grid>
        <hr />
      </Grid>
    );
  });

  return (
    <Container>
      <Head>
        <title>Public Notices</title>
        <meta name='description' content='Public Notices' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Grid>
        <Typography variant='h1'>Submissions</Typography>
      </Grid>
      <Grid>{submissions}</Grid>
    </Container>
  );
}
