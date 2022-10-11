import { useState, useEffect } from "react"
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { postVideogame, getGenres, getPlatforms, getVideogames } from '../../actions/actions'
import { useDispatch, useSelector } from "react-redux"

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
      <div>
         <Link to='/videogames'>
            <button>Home</button>
         </Link>
         <h1>CEATE YOUR VIDEOGAME!</h1>
         <form onSubmit={e => handleSubmit(e)}>
            <div>
               <label>Name:</label>
               <input onChange={e => handleChange(e)} type="text" value={input.name} name="name" />
               {errors.name && (
                  <p className="error">{errors.name}</p>
               )}
            </div>
            <div>
               <label>Description:</label>
               <input onChange={e => handleChange(e)} type="text" value={input.description} name="description" />
               {errors.description && (
                  <p className="error">{errors.description}</p>
               )}
            </div>
            <div>
               <label>Released:</label>
               <input onChange={e => handleChange(e)} type="text" value={input.released} name="released" />
            </div>
            <div>
               <label>Rating:</label>
               <input onChange={e => handleChange(e)} type="text" value={input.rating} name="rating" />
            </div>
            <div>
               <label>Image:</label>
               <input onChange={e => handleChange(e)} type="text" value={input.image} name="image" />
            </div>
            <div>
            <p>Genres:</p>
            {
               genre.map(g => (
                 
                  <label><input onChange={e => handleGenreCheck(e)} key={g.id} type='checkbox' name={g.name} value={g.name} />{g.name} {errors.genre && (
                     <p className="error">{errors.genre}</p>
                  )}</label>
               ))
            }
            </div>
            <div> 
            <p>Platforms:</p>
            {
               platform.map(g => (
                  <label><input onChange={e => handlePlatformCheck(e)} key={g.id} type='checkbox' name={g.name} value={g.name} />{g.name} {errors.platform && (
                     <p className="error">{errors.platform}</p>
                  )}</label>
               ))
            }
            </div>

            <button type="submit">Submit</button>
         </form>
      </div>
  )
}

export default Form