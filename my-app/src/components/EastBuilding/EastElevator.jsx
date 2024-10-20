import { useState, useEffect } from "react";
import "./EastElevator.css";
import Elevator1 from "./Elavators/Elavator1";
import Elevator2 from "./Elavators/Elevator2";

function EastElevator() {
  const [floorBttns, setFloorBttns] = useState([]);
  // const [buttonStates, setButtonStates] = useState([]);
  // const [buttonStates, setButtonStates] = useState(Array(24).fill("light")); // this fills a copy array of floors but containing the class name to change button color
  const [buttonStates, setButtonStates] = useState([]);
  const [lowFloorQue, setLowFloorQue] = useState([]);
  const [topFloorQue, setTopFloorQue] = useState([]);

  useEffect(() => {
    //This function creates the floors array
    let resArr = [];

    for (let i = 24; i > 0; i--) {
      resArr.push(i);
    }
    setFloorBttns(resArr);
    setButtonStates(Array(24).fill("light"));
  }, []);

  //This Func adds the floor to the elevator que
  const handleElevatorQue = (index, num) => {
    if (num < 13 && !lowFloorQue.includes(num)) {
      // Add to the lowFloorQue if it's not already there and the floor is less than 13
      const newQue = [...lowFloorQue, num];
      setLowFloorQue(newQue);
    } else if (num > 12 && !topFloorQue.includes(num)) {
      // Add to the topFloorQue if it's not already there and the floor is greater than 12
      const newQue = [...topFloorQue, num];
      setTopFloorQue(newQue);
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
  console.log("TopQue", topFloorQue, "LOWQue", lowFloorQue);
  return (
    <div className="e-elevator-main-cont">
      <Elevator2
        props={{
          topFloorQue,
          buttonStates,
          setButtonStates,
          setTopFloorQue,
        }}
      />
      <div className="bttn-main-cont">
        {floorBttns.map((num, index) => (
          <div className="single-btn-cont" key={index}>
            <button
              style={{
                border: "1px solid black",
                borderRadius: "50%",
              }}
              className={`btn btn-${buttonStates[index]}`}
              onClick={() => handleClick(index, num)}
            >
              {num}
            </button>
          </div>
        ))}
      </div>
      <Elevator1
        props={{
          lowFloorQue,
          buttonStates,
          setButtonStates,
          setLowFloorQue,
        }}
      />
    </div>
  );
}

export default EastElevator;
