import React, { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import PersonList from './components/PersonList.js'
import Notification from './components/Notification.js'
import personService from './services/persons'
import './style.css'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFiltered, setNewFiltered] = useState('')
	const [filterArray, setFilterArray] = useState([])
	const [notification, setNotification] = useState(null)
	const [stateOfNotification, setStateOfNotification] = useState(true)

	useEffect(() => {
		personService.getAll().then((initialData) => {
			setPersons(initialData)
		})
	}, [])

	const handleDelete = (id) => {
		const person = persons.find((n) => n.id === id)
		const executor = window.confirm(`Do you want to delete ${person.name}?`)
		if (executor) {
			personService
				.deleter(person.id)
				.then(() => {
					personService.getAll().then((persons) => setPersons(persons))
				})
				.catch((error) => {
					setStateOfNotification(false)
					setNotification(
						`Information of ${person.name} has already been removed from server`
					)
					setTimeout(() => {
						setStateOfNotification(null)
						setNotification(null)
					}, 5000)
				})
		}
	}
	const addName = (event) => {
		event.preventDefault()
		const personObject = {
			name: newName,
			number: newNumber,
		}

		let switcher = false
		for (let i = 0; i < persons.length; i++) {
			if (persons[i].name === personObject.name) {
				switcher = true
			} else {
				continue
			}
		}

		if (switcher === true) {
			const some = persons.some((person) => person.name === newName)
			if (some) {
				const foundPerson = persons.find((n) => n.name === newName)
				const changedPerson = { ...foundPerson, number: newNumber }
				const { id } = foundPerson

				const executor = window.confirm(
					`${newName} is already added to phonebook, replace the old number with the new one?`
				)
				if (executor) {
					personService.update(id, changedPerson).then((returnedPerson) => {
						setPersons(
							persons.map((person) =>
								person.id !== id ? person : returnedPerson
							)
						)
					})

					setNewNumber('')
					setNewName('')
				} else {
					personService
						.add(personObject)
						.then((returnedPerson) =>
							setPersons(persons.concat(returnedPerson))
						)
						.catch((error) => {
							setStateOfNotification(false)
							setNotification(`${error.response.data.error}`)
							console.log(error.response.data.error)
						})
					// setNotification(
					//   `${personObject.name} has been added`
					// )
					// setTimeout(() => {
					//   setNotification(null)
					// }, 5000)
					setNewNumber('')
					setNewName('')
				}
			}
		} else {
			personService
				.add(personObject)
				.then((returnedPerson) => setPersons(persons.concat(returnedPerson)))
				.catch((error) => {
					setStateOfNotification(false)
					setNotification(`${error.response.data.error}`)
					console.log(error.response.data.error)
				})
			setStateOfNotification(true)
			setNotification(`${personObject.name} has been added`)
			setTimeout(() => {
				setStateOfNotification(null)
				setNotification(null)
			}, 5000)
			setNewNumber('')
			setNewName('')
		}
	}

	const handleFilter = (event) => {
		setNewFiltered(event.target.value)

		if (newFiltered === '') {
			setFilterArray(persons)
		} else {
			const filter = persons.filter((person) =>
				person.name.toLowerCase().includes(newFiltered)
			)
			setFilterArray(filter)
		}
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={newFiltered} onchange={handleFilter} />
			<Notification
				message={notification}
				className={stateOfNotification ? 'notification' : 'error'}
			/>
			<h2>Add new</h2>
			<PersonForm
				addName={addName}
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<PersonList
				newFiltered={newFiltered}
				filterArray={filterArray}
				persons={persons}
				handleDelete={handleDelete}
			/>
		</div>
	)
}

export default App
