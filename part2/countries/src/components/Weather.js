

const Weather = ({ props }) => {

    return (
        <>
            <p>weather in: {props.location.name}</p>
            <p>Temperature: {props.current.temperature}°C </p>
            <img src={props.current.weather_icons[0]} alt="flag"></img>
            <p>{props.current.weather_descriptions[0]}</p>
            <p>Wind: {props.current.wind_speed} mph, {props.current.wind_degree} degrees {props.current.wind_dir}</p>
        </>
    )




}

export default Weather