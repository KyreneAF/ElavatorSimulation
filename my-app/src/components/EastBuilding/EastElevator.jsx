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

  //This function removes the floors from the que
  const handleElevatorMotion = (newQue) => {
    setTimeout(() => {
      if (newQue && newQue.length > 0) {
        const nextQue = [...newQue.slice(1)];
        setFloorQue(nextQue);
      }
    }, 3000);
  };
  //This Func adds the floor to the elevator que
  const handleElevatorQue = (num) => {
    const newQue = [...floorQue, num];
    setFloorQue(newQue);
    handleElevatorMotion(newQue);
  };

  //THis Func handles when the floor button is clicked
  const handleClick = (index, num) => {
    const newButtonStates = [...buttonStates]; //spreads buttonStates into an array variable
    newButtonStates[index] = "success"; //changes the buttonState at the clicked index to success which turns it green
    setButtonStates(newButtonStates); //updates buttonStates to the newButtonStates array
    handleElevatorQue(num);
    handleElevatorMotion();
  };

  console.log("eleQue", floorQue);
  return (
    <div className="e-elevator-main-cont">
      <div className="bttn-main-cont">
        {floorBttns.map((num, index) => (
          <div className="single-btn-cont" key={index}>
            <div className={`btn btn-${buttonStates[index]}`}></div>
            <button
              style={{ border: "1px solid black", borderRadius: "50%" }}
              type="button"
              className={`btn btn-${buttonStates[index]}`}
              onClick={() => handleClick(index, num)}
            >
              {num}
            </button>
            <div className={`btn btn-${buttonStates[index]}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EastElevator;
