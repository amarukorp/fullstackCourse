import React from "react";
import Person from "./Person";

const PersonList = ({ newFiltered, filterArray, persons, handleDelete }) => {
    return (
        <ul>{newFiltered === '' ? persons.map((person) =>
            <Person key={person.id} person={person} handleDelete={() => handleDelete(person.id)} />) : filterArray.map((person) =>
                <Person key={person.id} person={person} handleDelete={() => handleDelete(person.id)} />)}
        </ul>

    )
}

export default PersonList