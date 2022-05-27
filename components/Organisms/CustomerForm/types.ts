import { CSResponseType } from 'apiService/types'

/**
 * Customer Form Submitted Callback Result Type
 * 
 * Customer Submission Response data might be passed.
 * 
 * @param success - if submitted is success true, otherwise false
 * 
*/
export type CFSubmitResult = Omit<CSResponseType, 'status'> & {
  success: boolean,
}

/**
 * Customer Form Component Props
 *
 * @param submissionUrl- the submission api url
 * @param onResult - the callback function to get the result after the form is submitted.
 * 
*/
export type CustomerFormProps = {
  submissionUrl: string,
  onResult?: (results: CFSubmitResult) => void;
}

