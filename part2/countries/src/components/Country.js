import React from 'react'
import CountryList from './CountryList'

const Country = ({ props }) => {

    if (props.length > 10) {
        return (
            <>
                <p>too many countries, please improve your filter</p>
            </>
        )
    }

    if (props.length > 1 && props.length < 10) {
        return (
            <>
                {props.map((country) =>
                    <p key={country.name.common}>
                        {country.name.common}
                    </p>
                )}
            </>
        )
    }

    if (props.length === 1) {

        return (
            <CountryList props={props} />
        )
    }
    else {
        return ''
    }
}

export default Country