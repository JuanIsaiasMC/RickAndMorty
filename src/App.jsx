import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'
import ResidentInfo from './components/ResidentInfo'
import imageRick from './assets/rick.jpg'




function App() {

  const [location, setLocation] = useState({})
  const [searchValue, setSearchValue] = useState("")
  const [locationSuggestions, setLocationSuggestions] = useState([])


  // const handleKeyDown = event => {
  //   if (event.key === 'Enter') {

  //     searchLocation();
  //   }
  // };

  useEffect(() => {
    const random = Math.floor(Math.random() * 126) + 1
    axios.get(`https://rickandmortyapi.com/api/location/${random}`)
      .then(res => setLocation(res.data))

  }, [])


  const searchLocation = (location) => {
    setLocation(location)
    cleanInput()
  }

  useEffect(() => {
    if (searchValue !== '') {
      axios.get(`https://rickandmortyapi.com/api/location/?name=${searchValue}`)
        .then(res => setLocationSuggestions(res.data.results))

    } else {
      setLocationSuggestions([])
    }
  }, [searchValue])

  const [page, setPage] = useState(1)
  const lastIndex = page * 12
  const firstIndex = lastIndex - 12
  const locationPagination = location?.residents?.slice(firstIndex, lastIndex)

  const lastPage = Math.ceil(location?.residents?.length / 12)

  const numbers = []

  for (let i = 1; i <= lastPage; i++) {
    numbers.push(i)
  }

  let cleanInput = () => {
    setSearchValue('')
  }



  // console.log(location)




  return (
    <div>
      <figure className='container__img'>
        {/* <img src={imageRick} alt="" className="img__rick" /> */}
      </figure>
      <div className="container">
        <h1 className='container__title'>Rick and Morty</h1>
        <div className='formulary'>
          <input className='formulary__input' placeholder='write a dimension' type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
          {locationSuggestions?.map(location => (
            <div key={location.id} className='formulary__results' onClick={() => searchLocation(location)}>{location.name}</div>
          ))}
        </div>
        <h2 className='container__subtitle'>{location?.name}</h2>
        <ul className='container__location'>
          <li>type: <p>
            {location?.type} </p></li>
          <li>dimension: <p>
            {location?.dimension} </p></li>
          <li>population: <p>
            {location?.residents?.length} </p></li>
        </ul>
        <article className='container__button'>
          <button className='button__page' onClick={() => setPage(page - 1)} disabled={page === 1}>prev page</button>
          {numbers.map((number) => (
            <button className='button__page' key={number} onClick={() => setPage(number)}>{number}</button>
          ))
          }
          <button className='button__page' onClick={() => setPage(page + 1)} disabled={page === lastPage}>next page</button>
        </article>

        <ul className='container__resident'>
          {locationPagination?.map(character => (
            <ResidentInfo key={character} character={character} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
