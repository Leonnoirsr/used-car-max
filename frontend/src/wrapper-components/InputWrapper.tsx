import { FC, ReactNode }                                                                                        from 'react';
import { Input, Icon, InputGroup, InputLeftAddon, InputRightAddon, InputLeftElement, InputRightElement,}        from '@chakra-ui/react';

interface NonGroupedWrapperProps {

  type?: string,
  placeholder?: string,
  size?: 'xs' | 'sm' | 'md' | 'lg',
  textColor?: string,
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled',
  children?: ReactNode,

}

interface GroupedWrapperProps extends NonGroupedWrapperProps {

  grouped: boolean,
  addOns?: {
    leftAddOn?: boolean,
    rightAddOn?: boolean,
  },
  elements?: {
    leftElement?: boolean,
    rightElement?: boolean,
    icon?: {
      type: typeof Icon,
      name: string,
      color: string
    }
  },
  children?: ReactNode,

}

type InputWrapperProps = NonGroupedWrapperProps | GroupedWrapperProps;

const InputWrapper: FC<InputWrapperProps> = (props) => {

  if ('grouped' in props && props.grouped) {

    // props is of type GroupedWrapperProps

    return (

      <InputGroup size={props.size}>
        {props.addOns?.leftAddOn && <InputLeftAddon children={props.children} />}
        {props.elements?.leftElement && <InputLeftElement children={props.children} />}

        <Input
          type={props.type}
          placeholder={props.placeholder}
          size={props.size}
          variant={props.variant}
          textColor={props.textColor}
        />

        {props.elements?.icon && (
          <InputRightElement>
            <props.elements.icon.type name={props.elements.icon.name} color={props.elements.icon.color} />
          </InputRightElement>
        )}
        {props.elements?.rightElement && <InputRightElement children={props.children} />}
        {props.addOns?.rightAddOn && <InputRightAddon children={props.children} />}
      </InputGroup>


    );


  } else {
    // props is of type NonGroupedWrapperProps
    return (
      <Input
        type={props.type}
        placeholder={props.placeholder}
        size={props.size}
        variant={props.variant}>

        {props.children}

      </Input>
    );

  }

};

export default InputWrapper;
