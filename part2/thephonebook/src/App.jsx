import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import personService from "./services/persons";

const Header = ({ text }) => <h2>{text}</h2>;

const Person = ({ name, number, functionHandler }) => (
    <li>
        {name} {number}
        <button onClick={functionHandler}>Delete</button>
    </li>
);

const Input = ({ text, value, functionHandler }) => (
    <div>
        {text}:
        <input value={value} onChange={functionHandler} />
    </div>
);

const Form = ({
    functionHandler,
    newNameText,
    newNameValue,
    newNameFunctionHandler,
    newNumberText,
    newNumberValue,
    newNumberFunctionHandler,
}) => (
    <form onSubmit={functionHandler}>
        <Input
            text={newNameText}
            value={newNameValue}
            functionHandler={newNameFunctionHandler}
        />
        <Input
            text={newNumberText}
            value={newNumberValue}
            functionHandler={newNumberFunctionHandler}
        />
        <div>
            <button type="submit">Add</button>
        </div>
    </form>
);

const Filter = ({ inputValue, functionHandler }) => (
    <Input text="Filter" value={inputValue} functionHandler={functionHandler} />
);

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");
    const [newNotification, setNotification] = useState([]);

    useEffect(() => {
        personService.getAll().then((initialNotes) => {
            setPersons(initialNotes);
        });
    }, []);

    const addPerson = (event) => {
        event.preventDefault();
        const personObject = {
            name: newName,
            number: newNumber,
        };

        const notificationObject = {
            message: `Added ${newName}!`,
            cls: "success",
        };

        const search = persons.find((n) => n.name === newName);
        if (search) {
            if (
                window.confirm(
                    `${newName} is already added to the phonebook, replace the old number with the new one?`
                )
            ) {
                personService
                    .update(search.id, personObject)
                    .then((returnedPerson) => {
                        const updateNotification = {
                            ...notificationObject,
                            message: `Updated ${newName}!`,
                        };
                        setPersons(
                            persons.map((person) =>
                                person.id !== search.id
                                    ? person
                                    : returnedPerson
                            )
                        );
                        setNewName("");
                        setNewNumber("");
                        setNotification(updateNotification);
                        setTimeout(() => {
                            setNotification([]);
                        }, 5000);
                    })
                    // .catch(() => {
                    //     const errorNotification = {
                    //         message: `Information of ${newName} has already been deleted on the server.`,
                    //         cls: "error",
                    //     };
                    //     setPersons(persons.filter((n) => n.id !== search.id));
                    //     setNewName("");
                    //     setNewNumber("");
                    //     setNotification(errorNotification);
                    //     setTimeout(() => {
                    //         setNotification([]);
                    //     }, 5000);
                    // });
                    .catch((error) => {
                        const errorNotification = {
                            message: error.response.data.error,
                            cls: "error",
                        };
                        setNewName("");
                        setNewNumber("");
                        setNotification(errorNotification);
                        setTimeout(() => {
                            setNotification([]);
                        }, 5000);
                    });
            }
        } else {
            personService
                .create(personObject)
                .then((returnedPerson) => {
                    setPersons(persons.concat(returnedPerson));
                    setNewName("");
                    setNewNumber("");
                    setNotification(notificationObject);
                    setTimeout(() => {
                        setNotification([]);
                    }, 5000);
                })
                .catch((error) => {
                    const errorNotification = {
                        message: error.response.data.error,
                        cls: "error",
                    };
                    setNotification(errorNotification);
                    setTimeout(() => {
                        setNotification([]);
                    }, 5000);
                });
        }
    };

    const deletePerson = (id, name) => {
        const person = persons.find((n) => n.id === id);

        const notificationObject = {
            message: `Deleted ${name}!`,
            cls: "error",
        };

        if (window.confirm(`Delete ${name}?`)) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter((n) => n.id !== id));
                    setNotification(notificationObject);
                    setTimeout(() => {
                        setNotification([]);
                    }, 5000);
                })
                .catch(() => {
                    alert(
                        `The person ${person.id} was already deleted from server.`
                    );
                });
        }
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value);
    };

    const filter =
        newFilter.length == 0
            ? persons
            : persons.filter((person) =>
                  person.name.toLowerCase().includes(newFilter.toLowerCase())
              );

    return (
        <div>
            <Header text="Phonebook" />
            <Notification
                message={newNotification.message}
                cls={newNotification.cls}
            />
            <Filter
                inputValue={newFilter}
                functionHandler={handleFilterChange}
            />
            <Header text="Add New Record" />
            <Form
                functionHandler={addPerson}
                newNameText="Name"
                newNameValue={newName}
                newNameFunctionHandler={handleNameChange}
                newNumberText="Number"
                newNumberValue={newNumber}
                newNumberFunctionHandler={handleNumberChange}
                submitButtonText="Add"
            />
            <Header text="Numbers" />
            <ul>
                {filter.map((person) => (
                    <Person
                        key={person.id}
                        name={person.name}
                        number={person.number}
                        functionHandler={() =>
                            deletePerson(person.id, person.name)
                        }
                    />
                ))}
            </ul>
        </div>
    );
};

export default App;
