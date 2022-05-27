import { CustomerFormInputs, CSResponseType } from './types'

const HEADERS = {
  'Content-Type': 'application/json',
}

/**
 * The Common Fetch POST API
 *
 * @method POST
 * 
 * @param T - Response Data Type
 * @param url - api URL
 * @param params - JSON based parameters
 * 
*/
export async function postAPI<T>(url: string, params: unknown) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: HEADERS,
    })
    // error handling according to the status code
    // 404, 500, etc
    // const { status } = res;
    const result = await res.json() as T
    return Promise.resolve(result)
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Customer Submission API
 *
 * @method POST
 * 
 * @param url - api URL
 * @param params - the customer form inputs
 * 
 * @returns Customer Submission Response Data
 * 
*/
export const submissionAPI = (url: string, params: CustomerFormInputs) =>
  postAPI<CSResponseType>(url, params)