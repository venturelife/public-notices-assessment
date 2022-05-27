import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  /*
  Example POST payload expected in request:
  {
    "customer_name": "Lisa Snodgrass",
    "customer_email": "lisa.snodgrass@gothamcitypublicworks.gov"
    "text_body": "Gotham City Public Works is accepting sealed solicitations for a new drinking fountain."
  }
  */
  if (req.method === 'POST') {
    const data = req.body;

    if (
      data.hasOwnProperty('customer_name') === true &&
      data.hasOwnProperty('customer_email') === true &&
      data.hasOwnProperty('text_body') === true &&
      typeof data.customer_name === "string" &&
      typeof data.customer_email === "string" &&
      typeof data.text_body === "string" &&
      data.customer_name.length > 0 &&
      data.customer_email.length > 0 &&
      data.text_body.length > 0
    ) {
      // debugging feedback
      console.debug(`data payload: ${JSON.stringify(data)}`);

      // define filename and path
      const epoch_date = Math.trunc(new Date().getTime() / 1000);
      const file_name = `customer_submission_${epoch_date}.json`;
      const base_path = path.join(process.cwd(), `/public/submissions/${file_name}`);

      // write file to public submissions in public directory
      fs.writeFile(base_path, JSON.stringify(data), (err) => {
        if (err) { res.status(500).json({ status: "error", message: err }) }
      })

      // return a 200 for response
      res.status(200).json({
        status: "good", message: "information successfully submitted", data: {
          name: data.customer_name,
          email: data.customer_email,
          createdAt: epoch_date
        }
      })
    } else {
      console.debug(`data payload: ${req.body}`)
      res.status(500).json({ status: "error", message: "missing or incorrect data" })
    }
  } else {
    console.debug(`data payload: ${req.body}`)
    res.status(500).json({ status: "error", message: "request requirements not met" })
  }
}
