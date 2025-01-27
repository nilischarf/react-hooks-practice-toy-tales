import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then((response) => response.json())
      .then((data) => setToys(data))
  }, [])

  function handleAddToy(newToy) {
    setToys((prevToys) => [...prevToys, newToy]);
  }
  
  function handleDeleteToy(id) {
    setToys((prevToys) => prevToys.filter((toy) => toy.id !== id));
  }
  
  function handleUpdateToy(updatedToy) {
    setToys((prevToys) => prevToys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy)));
  }
  
  function handleClick() {
    setShowForm((showForm) => !showForm); 
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDeleteToy={handleDeleteToy} onUpdateToy={handleUpdateToy} />
    </>
  );
}

export default App;
