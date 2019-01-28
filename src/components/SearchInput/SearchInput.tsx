import * as React from 'react';

import * as searchIcon from '../../assets/Search.svg';

import { Input, ModifiedCloseButton, SearchIcon, Wrapper } from './SearchInput.css';

interface Props {
  className?: string;
  htmlInputRef?: React.RefObject<HTMLInputElement>;
  name?: string;
  onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
  value: string;
  width?: number;
}

export const defaultProps = {
  width: 291,
};

const SearchInput = ({ className, htmlInputRef, name, onChange, onClear, placeholder, value, width = defaultProps.width }: Props) => (
  <Wrapper className={className} width={width}>
    <SearchIcon imgSrc={searchIcon} size={35} />

    <Input name={name} onChange={onChange} placeholder={placeholder} ref={htmlInputRef} type="text" value={value} />

    {value && onClear && <ModifiedCloseButton size={20} onClick={onClear} />}
  </Wrapper>
);

export default SearchInput;
