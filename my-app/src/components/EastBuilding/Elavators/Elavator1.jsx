import { useState, useEffect } from "react";
import "./Elevator1.css";

function Elevator1({ props }) {
  //   const { lowFloorQue, lowFloorBttns, buttonStates, index } = props; // destructure floor states out of props variable
  const { lowFloorQue, buttonStates, setButtonStates, setLowFloorQue } = props;
  const [currFloor, setCurrFloor] = useState(0);
  const [eleState, setEleState] = useState("");
  const [className, setClassName] = useState("idle");
  const [sortedFloorQue, setFloorQue] = useState([]);

  useEffect(() => {
    if (lowFloorQue.length > 0) {
      const firstFloor = lowFloorQue[0]; // Get the first destination floor
      const nextQue = [...lowFloorQue.slice(1)];

      // This moves the elevator
      const moveElevator = () => {
        if (firstFloor > currFloor) {
          setEleState("up");
          setClassName("activeEle");
          setCurrFloor((prev) => prev + 1); // Simulate going up one floor
        } else if (firstFloor < currFloor) {
          setEleState("down");
          setClassName("activeEle");
          setCurrFloor((prev) => prev - 1); // Simulate going down one floor
        } else {
          setEleState("idle");
          setClassName("idle");
          // Clear the button state (set back to "light" when elevator reaches the floor)
          const newButtonStates = [...buttonStates];
          const index = 24 - firstFloor; // Find index based on floor number
          newButtonStates[index] = "light";
          setButtonStates(newButtonStates);
          // Update the queue
          setTimeout(() => setLowFloorQue(nextQue), 500); // Remove reached floor from queue
        }
      };

      const moveInterval = setInterval(moveElevator, 1000); // Move elevator every second
      return () => clearInterval(moveInterval); // Clean up interval
    }
  }, [lowFloorQue, currFloor]);

  if (!sortedFloorQue.length) return;
  return (
    <div className={`elevator1-main-cont ${className}`}>
      <div>E1</div>
    </div>
  );
}

export default Elevator1;
