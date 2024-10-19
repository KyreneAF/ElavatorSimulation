import { useState, useEffect } from "react";
import "./EastElevator.css";

function EastElevator() {
  const [floorBttns, setFloorBttns] = useState([]);
  // const [buttonStates, setButtonStates] = useState([]);
  // const [buttonStates, setButtonStates] = useState(Array(24).fill("light")); // this fills a copy array of floors but containing the class name to change button color
  const [buttonStates, setButtonStates] = useState([]);
  const [floorQue, setFloorQue] = useState([]);

  useEffect(() => {
    //This function creates the floors array
    let resArr = [];

    for (let i = 1; i <= 24; i++) {
      resArr.push(i);
    }
    setFloorBttns(resArr);
    setButtonStates(Array(24).fill("light"));
  }, []);

  //This Func adds the floor to the elevator que
  const handleElevatorQue = (index, num) => {
    const check = floorQue.find((n) => n == num); // Check if num alread in que
    if (!check) {
      const newQue = [...floorQue, num];
      setFloorQue(newQue);
      // handleElevatorMotion(index, newQue);
    }
  };
  //THis Func handles when the floor button is clicked
  const handleClick = (index, num) => {
    console.log("buttonstates first", buttonStates);
    const newButtonStates = [...buttonStates]; //spreads buttonStates into an array variable
    newButtonStates[index] = "success"; //changes the buttonState at the clicked index to success which turns it green
    setButtonStates(newButtonStates); //updates buttonStates to the newButtonStates array
    handleElevatorQue(index, num);
  };
  //This function removes the floors from the que
  // const handleElevatorMotion = (index, newQue) => {
  //   setTimeout(() => {
  //     if (newQue && newQue.length > 0) {
  //       const indxOfNum = floorBttns.indexOf(newQue[0]); // find index of first num in que we cannot pass the index because that does not get updated
  //       const nextQue = [...newQue.slice(1)]; // Here we are slicing the first number in our que and setting our floor que to the remainder que
  //       setFloorQue(nextQue); //updating our que with the first value popped
  //       const btnStateCopy = [...buttonStates];
  //       btnStateCopy[indxOfNum] = "light";
  //       setButtonStates(btnStateCopy);
  //     }
  //   }, 3000);
  // };

  console.log("eleQue", floorQue);
  return (
    <div className="e-elevator-main-cont">
      <div className="bttn-main-cont">
        {floorBttns.map((num, index) => (
          <div className="single-btn-cont" key={index}>
            {/* <div className={`btn btn-${buttonStates[index]}`}></div> */}
            <button
              style={{ border: "1px solid black", borderRadius: "50%" }}
              className={`btn btn-${buttonStates[index]}`}
              onClick={() => handleClick(index, num)}
            >
              {num}
            </button>
            {/* <div className={`btn btn-${buttonStates[index]}`}></div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EastElevator;
