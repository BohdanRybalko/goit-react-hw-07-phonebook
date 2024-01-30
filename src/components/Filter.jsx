import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/contactsSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const filterChangeHandler = (value) => {
    dispatch(setFilter(value));
  };

  return (
    <input
      type="text"
      value={filter}
      onChange={(e) => filterChangeHandler(e.target.value)}
      placeholder="Search contacts"
    />
  );
};

export default Filter;
