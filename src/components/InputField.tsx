import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input, Textarea } from "@chakra-ui/react";
import { useField } from "formik";
import { KeyboardEventHandler } from "react";

interface InputFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
  disabled?: boolean;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const InputField = ({ textarea, ...props }: InputFieldProps) => {
  const [field, { error }] = useField(props);
  // field include value, name, onChange
  // error set when submit
  props.placeholder = props.placeholder || props.label;

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel marginTop={"0.2rem"} htmlFor={field.name}>
        {props.label}
      </FormLabel>
      {textarea ? (
        <Textarea {...field} id={field.name} {...props} />
      ) : (
        <Input {...field} id={field.name} {...props} />
      )}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;
