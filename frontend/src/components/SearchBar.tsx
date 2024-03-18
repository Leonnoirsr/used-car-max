import { FC }                 from 'react';
import { Search2Icon }        from '@chakra-ui/icons';
import InputWrapper           from '../wrapper-components/InputWrapper';

interface SearchBarProps {

  // Define your props here

}

const SearchBar: FC<SearchBarProps> = (props) => {


  return (

    <InputWrapper
      type={'text'}
      placeholder={'Search For Vehicles Here'}
      textColor={'black'}
      variant={'outline'}
      grouped={true}
      elements={{ rightElement: true, icon: { type: Search2Icon, name: 'search', color: 'black' } }}
    />


  );


};

export default SearchBar;
