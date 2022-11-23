import React, { useState } from "react";
import Button from "./Button.js";

const defaultFormData = {
  roomCode: "",
}

/** Form for joining a room
 *
 *  Props:
 *  - initialFormData
 *  - joinRoom: fn to call in parent
 *
 *  States:
 *  - formData: like { roomCode }
 *
 *  SelectedForm -> JoinForm -> Button
 */

function JoinForm({ initialFormData=defaultFormData , joinRoom }) {
  const [formData, setFormData] = useState(initialFormData);

  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    joinRoom(formData);
    setFormData(initialFormData);
  }

  return (
    <form className="JoinForm form">
      <h3>Join Room</h3>
      <div>
        <label htmlFor="JoinForm-room-code">Room Code:</label>
        <input
          id="JoinForm-room-code"
          className="form-control"
          value={formData.roomCode}
          onChange={handleChange}
          name="roomCode"
          aria-label="Room Code"
        />
      </div>
      <Button click={handleSubmit} label="Join Room" type="form-join"/>
    </form>
  );
}

export default JoinForm;
