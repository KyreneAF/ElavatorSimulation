import { useState, useEffect } from "react";
import "./EastElevator.css";

function EastElevator() {
  const [floorBttns, setFloorBttns] = useState([]);
  const [buttonStates, setButtonStates] = useState([]);
  const [floorQue, setFloorQue] = useState([]);

  useEffect(() => {
    //This function creates the floors array
    let resArr = [];

    for (let i = 1; i <= 24; i++) {
      resArr.push(i);
    }
    setFloorBttns(resArr);
  }, []);

  const handleElevatorQue = (index) => {
    const newQue = [...floorQue, index];
    setFloorQue(newQue);
    handleElevatorMotion(newQue);
  };

  const handleElevatorMotion = (newQue) => {
    setTimeout(() => {
      const newDeQue = [...floorQue].shift();
      if (newDeQue.length > 0) {
        const nextQue = newQue.slice(1);
        setFloorQue(nextQue);
      }
    }, 1000);
  };

  const handleClick = (index) => {
    const newButtonStates = [...buttonStates]; //spreads buttonStates into an array variable
    newButtonStates[index] = "success"; //changes the buttonState at the clicked index to success which turns it green
    setButtonStates(newButtonStates); //updates buttonStates to the newButtonStates array
    handleElevatorQue(index);
    handleElevatorMotion();
  };

  console.log("eleQue", floorQue);
  return (
    <div className="e-elevator-main-cont">
      <div className="bttn-main-cont">
        {floorBttns.map((num, index) => (
          <div key={index}>
            <button
              style={{ border: "1px solid black", borderRadius: "50%" }}
              type="button"
              className={`btn btn-${buttonStates[index]}`}
              onClick={() => handleClick(index)}
            >
              {num}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EastElevator;
