/**
 * Form Text Input Component Props
 * 
 * Component based on the React Hook Form Controller to work with controlled component.
 *
 * @param name- the controller name to identify the form input data.
 * @param control - React Hook Form Control object.
 * @param label - the label content.
 * @param error - the error message.
 * @param multiline - if the multiline is true, then the input will work like a textarea.
 * @param rows - the number of lines.
 * 
*/
export interface FormTextInputProps {
  name: string;
  control: any;
  label?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}