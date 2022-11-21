import React, { useState } from "react";
import Button from "./Button.js";

const defaultFormData = {
  roomName: "",
}

function CreateForm({ initialFormData=defaultFormData , addRoom }) {
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
    addRoom(formData);
    setFormData(initialFormData);
  }

  return (
    <form className="CreateForm">
      <h3>Create Room</h3>
      <div>
        <label htmlFor="CreateForm-room-name">Room Name:</label>
        <input
          id="CreateForm-room-name"
          className="form-control"
          value={formData.roomName}
          onChange={handleChange}
          name="room-name"
          aria-label="Room Name"
        />
      </div>
      <Button click={handleSubmit} label="Create Room" type="form-create"/>
    </form>
  );
}

export default CreateForm;
