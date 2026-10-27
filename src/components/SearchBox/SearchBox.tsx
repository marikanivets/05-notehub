import React, { useState, useEffect } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);
    onChange(val);
  };

  return (
    <input
      className={css.input}
      type="text"
      value={localValue}
      onChange={handleChange}
      placeholder="Search notes..."
    />
  );
};

export default SearchBox;
