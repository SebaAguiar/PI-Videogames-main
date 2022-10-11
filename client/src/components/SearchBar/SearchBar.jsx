import React from 'react'
import { getByName } from '../../actions/actions'
import { useState } from 'react'
import { useDispatch } from 'react-redux'


function SearchBar() {
   const dispatch = useDispatch()
   const [name, setName] = useState('')

   const handleInputChange = (e) => {
      e.preventDefault()
      setName(e.target.value)
   }

   const handleClick = (e) => {
      e.preventDefault()
      dispatch(getByName(name))
      name('')
   }

   return (
      <div className='SearchBar'>
         <input type="text" className='input' placeholder='Search...' onChange={e => handleInputChange(e)} />
         <button className='searchButton' onClick={e => handleClick(e)}>Search</button>
      </div>
   )
}

export default SearchBar