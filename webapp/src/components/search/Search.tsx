import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames';

interface SearchProps {
  defaultValue?: string;
  placeholder?: string;
  styleType?: 'rounded' | 'bold' | 'thin';
  placeholderColor?: 'default' | 'black';
  onSearch: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({
  defaultValue,
  placeholder = 'Search here',
  styleType = 'rounded',
  onSearch,
}) => {
  const styleClasses = {
    rounded: 'rounded-full border-gray-300 shadow-sm',
    bold: 'rounded-full border border-black shadow-sm',
    thin: 'rounded-full border border-black shadow-sm',
  };

  //const placeholderClass = placeholderColor === "black" ? "placeholder:black" : "placeholder:italic";
  return (
    <Input
      defaultValue={defaultValue}
      placeholder={placeholder}
      onPressEnter={(e) => onSearch((e.target as HTMLInputElement).value)}
      suffix={<SearchOutlined />}
      className={classNames(`py-2 px-4 ${styleClasses[styleType]}`)}
    />
  );
};

export default Search;
