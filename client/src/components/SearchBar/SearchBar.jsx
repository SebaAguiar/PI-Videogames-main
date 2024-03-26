import React from 'react';
import { getByName } from '../../actions/actions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './SearchBar.css';

function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  // const [currentPage, setCurrentPage] = useState(1)
  const [order, setOrder] = useState('');

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await dispatch(getByName(name));
    name.length && setCurrentPage(1);
  };

  return (
    <div className='SearchBar'>
      <input
        className='inputSearchbar'
        type='text'
        placeholder='Search...'
        onChange={(e) => handleInputChange(e)}
      />
      <button
        type='submit'
        className='searchButton'
        onClick={(e) => handleClick(e)}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
