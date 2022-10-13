import { useState, useEffect } from "react"
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { postVideogame, getGenres, getPlatforms, getVideogames } from '../../actions/actions'
import { useDispatch, useSelector } from "react-redux"
import Nav from '../Nav/Nav'
import './Form.css'

const validate = (input) => {
   let errors = {}
   if(!input.name) {
      errors.name = 'Name must be completed'
   }
   if(!input.platform) {
      errors.platform = 'Platform must be completed'
   }
   if(!input.description) {
      errors.description = 'Description must be completed'
   }
   if(!input.genre) {
      errors.genre = 'Description must be completed'
   }
   return errors
}


function Form() {
   const dispatch = useDispatch()
   const history = useHistory()
   const genre = useSelector((state) => state.genres)
   const platform = useSelector((state) => state.platforms)
   const videogames = useSelector((state) => state.videogamesCopy)
   const [errors, setErrors] = useState({})
   const [input, setInput] = useState({
      name: '',
      description: '',
      platform: [], 
      released: '',
      genre:[],
      rating: '',
      image: ''
   })
   useEffect(() => {
      dispatch(getGenres())
      dispatch(getPlatforms())
   }, [dispatch])
  

   const handleChange = (e) => {
      setInput({
         ...input,
         [e.target.name] : e.target.value
      })
      setErrors(validate({
         ...input,
         [e.target.name]: e.target.value
      }))
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      console.log(input)
      dispatch(postVideogame(input))
      alert('Videogame successfully created')
      setInput({
         name: '',
         description: '',
         platform: [], 
         released: '',
         genre:[],
         rating: '',
         image: ''
      })
      history.push('/videogames')
   }

   const handleGenreCheck = (e) => {
      if (e.target.checked) {
         setInput({
            ...input,
            genre: [...input.genre, e.target.value]
         })
         setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
         }))
         // console.log(input)
      }
   }

   const handlePlatformCheck = (e) => {
      if (e.target.checked) {
         setInput({
            ...input,
            platform: [...input.platform, e.target.value]
         })
         setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
         }))
         // console.log(input)
      }
   }


   return (
      <div className="container">
         <div className="navContainer">
            <Link className="nav" to='/videogames'>
               <Nav />
            </Link>
         </div>
         <h1 className="title">CEATE YOUR VIDEOGAME!</h1>
         <form className="form" onSubmit={e => handleSubmit(e)}>
               <div className="formContainer">
            <div className="name formInput">
               <label>Name:</label>
               <input className="inputName" onChange={e => handleChange(e)} type="text" value={input.name} name="name" />
               {errors.name && (
                  <p className="error">{errors.name}</p>
               )}
            </div>
               <div className="description formInput">
                  <label>Description:</label>
                  <input className="inputDescription" onChange={e => handleChange(e)} type="text" value={input.description} name="description" />
                  {errors.description && (
                     <p className="error">{errors.description}</p>
                  )}
               </div>
               <div className="realesed formInput">
                  <label>Released:</label>
                  <input className="inputReleased" onChange={e => handleChange(e)} type="text" value={input.released} name="released" />
               </div>
               <div className="rating formInput">
                  <label>Rating:</label>
                  <input className="inputRating " onChange={e => handleChange(e)} type="text" value={input.rating} name="rating" />
               </div>
               <div className="image formInput">
                  <label>Image:</label>
                  <input className="inputImage" onChange={e => handleChange(e)} type="text" value={input.image} name="image" />
               </div>
               <p>Genres:</p>
               <div className="genres">
               {
                  genre.map(g => (
                  
                     <label><input className="inputGenres" onChange={e => handleGenreCheck(e)} key={g.id} type='checkbox' name={g.name} value={g.name} />{g.name} {errors.genre && (
                        <p className="error">{errors.genre}</p>
                     )}</label>
                  ))
               }
               </div>
               <p className="pPlatforms">Platforms:</p>
               <div className="platforms"> 
               {
                  platform.map(g => (
                     <label><input className="inputPlatform" onChange={e => handlePlatformCheck(e)} key={g.id} type='checkbox' name={g.name} value={g.name} />{g.name} {errors.platform && (
                        <p className="error">{errors.platform}</p>
                     )}</label>
                  ))
               }
               </div>
            </div>

            <button type="submit">Submit</button>
         </form>
      </div>
  )
}

export default Form