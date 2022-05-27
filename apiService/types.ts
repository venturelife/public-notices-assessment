// Customer Form Data Type
export type CustomerFormInputs = {
  customer_name: string,
  customer_email: string,
  text_body: string
}

/**
 * Customer Submission Response Type
 *
 * @param status- the response status string. 'good' or 'error'
 * @param message - success or error message content.
 * @param data - response data content.
 * 
*/
export type CSResponseType = {
  status: 'good' | 'error', // string
  message: string,
  data?: {
    name: string,
    email: string,
    createdAt: number
  }
}
