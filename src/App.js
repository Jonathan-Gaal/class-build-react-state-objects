import { useState } from "react";
import { v1 as generateUniqueID } from "uuid";
import { dogsData } from "./data";
import DogDetails from "./DogDetails";

function App() {
  const [dogs, setDogs] = useState(dogsData);

  //add a dog
  const addDog = () => {
    const rover = {
      id: generateUniqueID(),
      name: "Rover",
      present: false,
      grade: "100",
      notes: "The goodest new dog",
    };
    setDogs([rover, ...dogs]);
  };

  //delete a dog
  const removeDog = (dogID) => {
    //return a new array using filter and set the state with the new array
    const filteredDogs = dogs.filter((dog) => dog.id !== dogID);
    setDogs(filteredDogs);
  };

  //update
  const updateDogAttendance = (dogID) => {
    // Copy the dogs array so that the copy can be updated
    const dogsArr = [...dogs];
    // Find the dog with the matching id number's array position
    const i = dogsArr.findIndex((dog) => dogID === dog.id);
    // Access the dog's present property and update the value
    // By using ! it will toggle the value of present
    dogsArr[i].present = !dogsArr[i].present;
    // Put the updated array into setDogs to update the dogs array
    setDogs(dogsArr);
  };

  return (
    <div className="App">
      <header>
        <h1> Bark and Bowl Doggy Day Care</h1>
        <h2>{new Date().toDateString()}</h2>
      </header>
      <aside>
        <button onClick={addDog}>Add a new dog</button>
      </aside>
      <main>
        <ul>
          {dogs.map((dog) => {
            return (
              <li key={dog.id}>
                <span
                  onClick={() => updateDogAttendance(dog.id)}
                  style={
                    dog.present
                      ? { textDecoration: "none" }
                      : { textDecoration: "line-through" }
                  }
                >
                  {dog.name}
                </span>{" "}
                <button onClick={() => removeDog(dog.id)}>remove</button>
                <DogDetails dog={dog} />
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
