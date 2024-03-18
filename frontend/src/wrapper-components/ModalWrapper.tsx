import { FC }                                                                                                                                                            from 'react';
import { useForm, SubmitHandler }                                                                                                                                        from 'react-hook-form';
import { zodResolver }                                                                                                                                                   from '@hookform/resolvers/zod';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button, FormControl, FormLabel, Input }                from '@chakra-ui/react'
import * as z                                                                                                                                                            from 'zod'
import axios                                                                                                                                                             from 'axios';




interface FormField {

  id: number;
  name: string,
  label: string;
  type: string;


}




interface QueryProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  route: string;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}



interface ModalWrapperProps {


  isOpen: boolean,
  onClose: () => void
  overlay?: boolean,
  title: string,
  primaryButton: string,
  secondaryButton: string,
  children?: React.ReactNode,
  formSchema: z.ZodType<any, any>,
  hasForm?: {
    fields: FormField[];
  },
  hasQuery?: QueryProps;

}

const ModalWrapper: FC<ModalWrapperProps> = (props) => {


  type FormValues = z.infer<typeof props.formSchema>;



  // -------------------------------------------------------------------

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: zodResolver(props.formSchema),
  });

  // ------------------------------------------------------------------





  const renderFormFields = () => {
    if (props.hasForm && props.hasForm.fields.length) {
      const fieldsToShow = props.hasForm.fields.slice(0, 5);
      return fieldsToShow.map((field) => (
        <FormControl key={field.id} id={field.name} isRequired>
          <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
          <Input id={field.name} {...register(field.name)} type={field.type} />
        </FormControl>
      ));
    }
    return null;
  };



  const handlePrimaryButtonClick: SubmitHandler<FormValues> = async (formData: any) => {

    if (props.hasQuery) {
      try {
        const response = await axios({
          method: props.hasQuery.method,
          url: props.hasQuery.route,
          data: formData,
        });
        props.hasQuery.onSuccess?.(response);
        reset();
      } catch (error) {
        props.hasQuery.onError?.(error);
      }
    }

    console.log("Form submitted", formData);
  };


  return (

    <>

return (
  <Modal isOpen={props.isOpen} onClose={props.onClose}>
    {props.overlay && <ModalOverlay />}
    <ModalContent>
      <ModalHeader>{props.title}</ModalHeader>
      <ModalCloseButton />
      <form onSubmit={handleSubmit(handlePrimaryButtonClick)}>
        <ModalBody>
          {props.children}
          {renderFormFields()}
        </ModalBody>
        <ModalFooter>
          <Button type="submit" isLoading={isSubmitting} colorScheme="teal">
            {props.primaryButton}
          </Button>
          <Button variant="outline" onClick={props.onClose} ml={3}>
            {props.secondaryButton}
          </Button>
        </ModalFooter>
      </form>
    </ModalContent>
  </Modal>
);
    </>

  );

};

export default ModalWrapper;
