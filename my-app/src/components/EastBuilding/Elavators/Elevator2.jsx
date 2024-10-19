import { useState, useEffect } from "react";
import "./Elevator1.css";

function Elevator2({ props }) {
  const { topFloorQue, buttonStates, setButtonStates, setTopFloorQue } = props;
  const [currFloor, setCurrFloor] = useState(12); // Start at floor 12 for upper floors
  const [eleState, setEleState] = useState("idle"); // Initialize to idle state
  const [className, setClassName] = useState("idle");
  const [eleFloorState, setEleFloorState] = useState(buttonStates);

  useEffect(() => {
    if (topFloorQue.length > 0) {
      const firstFloor = topFloorQue[0]; // Get the first destination floor
      const nextQue = [...topFloorQue.slice(1)]; // Remove first floor from the queue

      // Elevator movement logic
      const moveElevator = () => {
        if (firstFloor > currFloor) {
          setEleState("up");
          setClassName("activeEle");
          setCurrFloor((prev) => prev + 1); // Move up one floor
        } else if (firstFloor < currFloor) {
          setEleState("down");
          setClassName("activeEle");
          setCurrFloor((prev) => prev - 1); // Move down one floor
        } else {
          // If the elevator has reached the target floor
          setEleState("idle");
          setClassName("idle");

          // Update the button state to "light" when elevator reaches the floor
          const newButtonStates = [...buttonStates];
          const index = 24 - firstFloor; // Index calculation for top floors
          newButtonStates[index] = "light";
          setButtonStates(newButtonStates);

          // Update the queue to remove the reached floor
          setTimeout(() => setTopFloorQue(nextQue), 500); // Wait 500ms before updating the queue
        }
      };

      const moveInterval = setInterval(moveElevator, 750); // Move elevator every second
      return () => clearInterval(moveInterval); // Clear interval when component unmounts
    }
  }, [topFloorQue, currFloor, setButtonStates, setTopFloorQue, buttonStates]); // Include all necessary dependencies

  return (
    <div className={`elevator1-main-cont`}>
      <div>E2 is at floor {currFloor}</div>
    </div>
  );
}

export default Elevator2;
