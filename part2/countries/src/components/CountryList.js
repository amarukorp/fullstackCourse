
const CountryList = ({ props }) => {

    return (

        <div key={props[0].name.common}>
            <h2 > {props[0].name.common} </h2>
            <p > Population: {props[0].population} </p>
            <p > Capital: {props[0].capital[0]} </p>

            <h3 > Languages</h3>
            <>{Object.values(props[0].languages).map((language) => <p>{language}</p>)}</>
            <h3>Flag</h3>
            <img src={props[0].flags.png} alt="flag"></img>
        </div>
    )
}
export default CountryList