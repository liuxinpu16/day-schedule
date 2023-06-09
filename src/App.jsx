import "./App.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
export default function App() {
  const [slots, setSlots] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [name, setName] = useState("");
  const canAdd = Boolean(Number(startTime) < Number(endTime)) && Boolean(name);
  const options = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24,
  ];

  function handleClick() {
    if (canAdd) {
      setSlots((pre) => [
        ...pre,
        { start: startTime, end: endTime, name: name, id: uuidv4() },
      ]);
      setStartTime(0);
      setEndTime(0);
      setName("");
    }
  }

  function deleteSlot(id) {
    setSlots((pre) => {
      const deleted = pre.filter((slot) => slot.id !== id);
      return deleted;
    });
  }

  return (
    <>
      <div className="timetable">
        {slots.map((slot) => {
          const mystyle = {
            "grid-row": `${Number(slot.start) + 1} / ${Number(slot.end) + 1}`,
          };
          return (
            <div key={slot.id} className="slot" style={mystyle}>
              {slot.start}:00 to {slot.end}:00 with {slot.name}
              <button onClick={() => deleteSlot(slot.id)}>Delete</button>
            </div>
          );
        })}
      </div>

      <div>
        <label>
          name :
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          start time :
          <select
            value={0 || startTime}
            onChange={(e) => setStartTime(e.target.value)}
          >
            {options.map((option) => (
              <option key={`s ${option}`} value={option}>
                {option}:00
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          end time :
          <select
            value={0 || endTime}
            onChange={(e) => setEndTime(e.target.value)}
          >
            {options.map((option) => (
              <option key={`e ${option}`} value={option}>
                {option}:00
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <button disabled={!canAdd} onClick={handleClick}>
          submit
        </button>
      </div>
    </>
  );
}
