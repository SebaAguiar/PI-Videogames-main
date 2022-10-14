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
   if(!input.platforms) {
      errors.platforms = 'Platform must be completed'
   }
   if(!input.description) {
      errors.description = 'Description must be completed'
   }
   if(!input.genres) {
      errors.genres = 'Description must be completed'
   }
   return errors
}


function Form() {
   const dispatch = useDispatch()
   const history = useHistory()
   const genres = useSelector((state) => state.genres)
   const platforms = useSelector((state) => state.platforms)
   const videogames = useSelector((state) => state.videogamesCopy)
   const [errors, setErrors] = useState({})
   const [input, setInput] = useState({
      name: '',
      description: '',
      platforms: [], 
      released: '',
      genres:[],
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
      // console.log(input)
      dispatch(postVideogame(input))
      alert('Videogame successfully created')
      setInput({
         name: '',
         description: '',
         platforms: [], 
         released: '',
         genres:[],
         rating: '',
         image: ''
      })
      history.push('/videogames')
   }

   const handleGenreSelect = (e) => {
      setInput({
         ...input,
         genres: [...input.genres, e.target.value]
      })
   }


   const handlePlatformSelect = (e) => {
      setInput({
         ...input,
         platforms: [...input.platforms, e.target.value]
      })
   }

   const handleGenresDelete = (e) => {
      setInput({
         ...input,
         genres: input.genres.filter(g => g !== e)
      })
   }

   const handlePlatformsDelete = (e) => {
      setInput({
         ...input,
         platforms: input.platforms.filter(p => p !== e)
      })
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
                  <input className="inputReleased" onChange={e => handleChange(e)} type="date" value={input.released} name="released" />
               </div>
               <div className="rating formInput">
                  <label>Rating:</label>
                  <input className="inputRating " onChange={e => handleChange(e)} type="number" min='1' max='5' value={input.rating} name="rating" />
               </div>
               <div className="image formInput">
                  <label>Image:</label>
                  <input className="inputImage" onChange={e => handleChange(e)} type="text" value={input.image} name="image" />
               </div>
               <p>Genres:</p>
               <div className="genres">
               { <select onChange={e => handleGenreSelect(e)}> {
                  genres.map(g => (
                     <option value={g.name}>{g.name}</option>
                  ))}
               </select> 
               }
                 {input.genres.map(e => 
               <div className="divgenres">
                  <h2>Genres</h2>
                  <p>{e}</p>
                  <button className="buttonX" onClick={() => handleGenresDelete(e)}>X</button>
               </div>
            )}

               </div>
               <p className="pPlatforms">Platforms:</p>
               <div className="platforms"> 
               { <select onChange={e => handlePlatformSelect(e)}> {
                  platforms.map(g => (
                     <option value={g.name}>{g.name}</option>

                  ))}
                  </select> 
               }
                      {input.platforms.map(e => 
               <div className="divPlatform">
                  
                  <p>{e}</p>
                  <button className="buttonX" onClick={() => handlePlatformsDelete(e)}>X</button>
               </div>
            )}
               </div>
            </div>

            <button type="submit">Submit</button> 
         </form>
  
       
      </div>
  )
}

export default Form