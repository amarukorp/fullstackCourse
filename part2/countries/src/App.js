import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import Weather from './components/Weather'

const App = (props) => {
  const [countries, setCountries] = useState([])
  const [filterCountries, setFilterCountries] = useState([])
  const [newCountry, setNewCountry] = useState('')
  const [weatherInfo, setWeatherInfo] = useState([])

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    const apiUrl = "http://api.weatherstack.com/current"
    const YOUR_ACCESS_KEY = process.env.REACT_APP_API_KEY

    if (filterCountries.length === 1) {
      const capital = filterCountries.map((country) => country.capital)
      axios
        .get(`${apiUrl}?access_key=${YOUR_ACCESS_KEY}&query=${capital}`)
        .then(response => {
          setWeatherInfo(response.data)
        })
    }

  }, [filterCountries])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    const cFilteredByName = countries.filter(function (country) {
      if (country.name.common.toLowerCase().includes(newCountry)) {
        return country.name
      } else {
        return ""
      }
    })
    setFilterCountries(cFilteredByName)
    setNewCountry(event.target.value)
  }

  return (
    <div>
      <h1>Country search App</h1>
      <form>
        Find countries:
        <input
          value={newCountry}
          onChange={handleNameChange}
        />
      </form>
      <ul>
        <Country props={filterCountries} />
      </ul>
      <div>
        {filterCountries.length === 1 ? <Weather props={weatherInfo} /> :
          <p></p>}
      </div>

    </div>
  )
}
export default App;
