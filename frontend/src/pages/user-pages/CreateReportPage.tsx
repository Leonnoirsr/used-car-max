import { FC, useState, useEffect }                                                                                                                  from 'react';
import { z }                                                                                                                                        from 'zod';
import { CarType }                                                                                                                                  from '../../constants/carTypes';
import { zodResolver }                                                                                                                              from '@hookform/resolvers/zod';
import { useNavigate }                                                                                                                              from 'react-router-dom';
import { SubmitHandler, useForm }                                                                                                                   from 'react-hook-form';
import { Box, Button, Container, FormControl, FormLabel, FormErrorMessage, Heading, Input, FormHelperText, Select, NumberInput, NumberInputField, } from '@chakra-ui/react';
import axios                                                                                                                                        from 'axios';
import toast                                                                                                                                        from 'react-hot-toast';
import { NumericFormat }                                                                                                                            from 'react-number-format';

interface CreateReportPageProps {
  // Define your props here
}



interface FormValues {

  year: number,
  make: string,
  model: string,
  type: CarType,
  mileage: number,
  price: number,
  imageUrl?: string


}

const initialFormValues = {

  year: undefined,
  make: '',
  model: '',
  type: CarType.SEDAN,
  mileage: undefined,
  price: undefined,
  imageUrl: ''

};


const CreateReportPage: FC<CreateReportPageProps> = (props) => {


  const schema = z.object({


    year: z.number().min(1970, { message: 'The vehicle year cannot be before 1970' }).max(2030, { message: 'The vehicle year cannot be newer than 2030' }),
    make: z.string().min(1, { message: 'A Vehicle Make Is Required' }),
    model: z.string().min(1, { message: 'A Vehicle Model Is Required' }),
    type: z.nativeEnum(CarType),
    mileage: z.number().min(0, { message: 'Mileage cannot be negative' }).refine(val => val !== undefined, { message: "Mileage is Required" }),
    price: z.number().min(0, { message: 'Price cannot be negative' }),
    imageUrl: z.string().optional()


  }),

    // -------------------------------------------------------------------

    { watch, register, handleSubmit, setError, setValue, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
      mode: 'onBlur',
      resolver: zodResolver(schema),
      defaultValues: initialFormValues
    });

  // ------------------------------------------------------------------




  const navigate = useNavigate()


  const resetForm = () => {

    reset({ year: undefined, make: '', model: '', type: CarType.SEDAN, mileage: undefined, price: undefined, imageUrl: '' });


  }



  const onSubmit: SubmitHandler<FormValues> = async (data) => {

    try {

      const parsedData = schema.parse(data),

        token = localStorage.getItem('authToken'),

        response = await axios.post('http://localhost:3001/api/reports/create-report', parsedData, {


          headers: {
            Authorization: `Bearer ${token}`,


          },
        });


      resetForm();

      navigate('/reports');

      toast.success('Report Created Successfully');


    } catch (error) {

      if (axios.isAxiosError(error)) {

        const message = error.response?.data.message || 'An unknown error occured';

        toast.error('Failed to create report');

        console.table(`Report creation failed: ${message}`)

      }

    }


  }


  return (
    <div style={{ height: '100vh' }}>

      <Container mt={'6rem'}>


        <Box mb={'5rem'} w={'sm'} bg="white">
          <Heading colorScheme={'facebook'} color={'#003366'}>
            Create A Report
          </Heading>
          <br />
          <p>Create a new vehicle listing</p>
        </Box>


        <Box>
          <FormControl isInvalid={errors.year && true}>
            <FormLabel htmlFor="year">Year</FormLabel>
            <NumberInput
              min={1900}
              max={new Date().getFullYear()}
              onChange={(_, valueAsNumber) => {
                if (valueAsNumber < 1900 || valueAsNumber > new Date().getFullYear()) {

                  setError('year', {
                    type: 'manual',
                    message: 'Year must be between 1900 and the current year.',
                  });
                }
              }}
            >
              <NumberInputField {...register('year', {
                required: "Vehicle Year is Required", // Custom required message
                setValueAs: value => value === '' ? undefined : Number(value)
              })} id="year" />
            </NumberInput>
            <FormErrorMessage>
              {errors.year && errors.year.message}
            </FormErrorMessage>
          </FormControl>
        </Box>



        <Box>
          <FormControl isRequired isInvalid={errors.make && true}>
            <FormLabel htmlFor='make'>Make</FormLabel>
            <Input {...register('make')} id='make' type='text' />
            {errors.make && <FormErrorMessage>{errors.make.message}</FormErrorMessage>}
          </FormControl>
        </Box>



        <Box>
          <FormControl isRequired isInvalid={errors.model && true}>
            <FormLabel htmlFor='model'>Model</FormLabel>
            <Input {...register('model')} id='model' type='text' />
            {errors.model && <FormErrorMessage>{errors.model.message}</FormErrorMessage>}
          </FormControl>
        </Box>



        <Box>
          <FormControl isInvalid={errors.type && true}>
            <FormLabel htmlFor='type'>Type</FormLabel>
            <Select {...register('type')} id='type' name='type'>
              <option value={CarType.SUV}>SUV</option>
              <option value={CarType.TRUCK}>Truck</option>
              <option value={CarType.CROSSOVER}>Crossover</option>
              <option value={CarType.SEDAN}>Sedan</option>
              <option value={CarType.COUPE}>Coupe</option>
              <option value={CarType.CONVERTIBLE}>Convertible</option>
              <option value={CarType.LUXURY}>Luxury</option>
              <option value={CarType.SPORTS_CAR}>Sports Car</option>
              <option value={CarType.MOTORCYCLE}>MotorCycle</option>
            </Select>
            {errors.type && <FormErrorMessage>{errors.type.message}</FormErrorMessage>}
          </FormControl>
        </Box>



        <Box>
          <FormControl isRequired isInvalid={errors.mileage && true}>
            <FormLabel htmlFor='mileage'>Mileage</FormLabel>
            <NumericFormat
              thousandSeparator={true}
              allowLeadingZeros={false}
              allowNegative={false}
              customInput={Input}
              onValueChange={(values) => {
                const { floatValue } = values;
                setValue('mileage', floatValue || 0, { shouldValidate: true });
              }}
              {...register('mileage', {
                required: "Mileage is Required"
              })}
              id="mileage"
            />
            <FormErrorMessage>
              {errors.mileage && errors.mileage.message}
            </FormErrorMessage>
          </FormControl>

        </Box>


        <Box>
          <FormControl isRequired isInvalid={errors.price && true}>
            <FormLabel htmlFor='mileage'>Price</FormLabel>
            <NumericFormat
              thousandSeparator={true}
              allowLeadingZeros={false}
              allowNegative={false}
              customInput={Input}
              prefix='$'
              onValueChange={(values) => {
                const { floatValue } = values;
                setValue('price', floatValue || 0, { shouldValidate: true });
              }}
              {...register('price', {
                required: "Price is Required"
              })}
              id="mileage"
            />
            <FormErrorMessage>
              {errors.price && errors.price.message}
            </FormErrorMessage>
          </FormControl>

        </Box>




        {/* <Box>
        <FormControl>
          <FormLabel htmlFor=''></FormLabel>
          <Input {...register('')} id='' type='' />
          {errors.thing && <FormErrorMessage>{errors.thing}</FormErrorMessage>}
        </FormControl>
      </Box> */}



        <Button
          mt="4"
          disabled={isSubmitting}
          size={'lg'}
          variant={'outline'}
          colorScheme={'white'}
          color={'#003366'}
          type="submit"
          onClick={handleSubmit(onSubmit)}
          sx={{
            _hover: {
              bg: '#003366', // Inverted background color on hover
              color: 'white', // Inverted text color on hover
            },
          }}>

          {isSubmitting ? 'Loading' : 'Submit'}

        </Button>

        <Button
          mt='4'
          ml={'4'}
          size={'lg'}
          variant={'solid'}
          bg={'#003366'}
          color={'white'}
          onClick={resetForm}
          sx={{
            _hover: {
              bg: 'white',
              color: '#003366',
              border: '1px solid #003366' // Add a border to simulate the outline effect
            }
          }}
        >Reset Form</Button>



      </Container>


    </div>
  );


};

export default CreateReportPage;
