import React, { useState } from "react";
import LoadingSpinner from "./spinner";
import "./index.css";

export default function App() {
  const [Character, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleFetch = () => {
    setIsLoading(true);
    fetch("https://rickandmortyapi.com/api/character")
      .then((respose) => respose.json())
      .then((respose) => {
        setUsers(respose.data)
        setIsLoading(false)
         // Optional code to simulate delay
         //setTimeout(() => {
           //setUsers(respose.data);
           //setIsLoading(false);
         //}, 3000);
      })
      .catch(() => {
         setErrorMessage("Unable to fetch user list");
         setIsLoading(false);
      });
  };
  const renderUser = (
    <div className="userlist-container">
      {Character.map((item, index) => (
        <div className="user-container" key={index}>
          <img src={item.image} alt="" />
          <div className="userDetail">
            <div className="name">{`${item.name}                
                                   ${item.status}`}</div>
            <div className="species">{item.species}</div>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <div className="App">
      {isLoading ? <LoadingSpinner /> : renderUser}
      {errorMessage && <div className="error">{errorMessage}</div>}
      <button onClick={handleFetch} disabled={isLoading}>
        Fetch Users
      </button>
    </div>
  );
}