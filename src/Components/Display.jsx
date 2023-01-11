import React from 'react'

function Display({ match }) {
    const [country, setCountry] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(
          `https://restcountries.com/v2/name/${match.params.name}`
        );
        const data = await res.json();
        setCountry(data[0]);
      } catch (err) {
        setErrorMessage(err.message);
      }
    };
    fetchCountry();
  }, [match.params.name]);

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      {country && (
        <div>
          <h3>{country.name}</h3>
          <img src={country.flag} alt={`Flag of ${country.name}`} />
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <p>Region: {country.region}</p>
          <p>Subregion: {country.subregion}</p>
        </div>
      )}
    </div>
  )
}

export default Display