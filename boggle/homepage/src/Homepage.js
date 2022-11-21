import React, { useState } from "react";
import Button from "./Button.js";
import SelectedForm from "./SelectedForm.js";
import { v4 as uuid } from "uuid";

/** Smart component rendering the homepage
 *
 *  Props:
 *  - none
 *
 *  States:
 *  - form: like "create" or "join"
 *  - isUser: Boolean
 *  - formData: like { roomName } or { roomCode }
 *
 *  App -> Homepage -> { SelectedForm, Button }
 */

function Homepage() {
  const [form, setForm] = useState({name: "", fn: null});
  const [isUser, setIsUser] = useState(false);
  const [formData, setFormData] = useState({});
  const [rooms, setRooms] = useState([]);

  console.log("Homepage", form, isUser, formData, rooms);

  /** Identify which button was selected. Create or Join */
  function selectForm(evt) {
    console.log(evt.target.classList.value);
    const buttonClasses = evt.target.classList.value;

    if(buttonClasses.includes("create")) {
      setForm({
        name: "create",
        fn: addRoom
      });
    }

    else {
      setForm({
        name: "join",
        fn: joinRoom
      });
    }
  }

  /** Add Room Function */
  function addRoom(room){
    const newRoom = {...room, id: uuid()}; 
    setRooms(rooms => [...rooms, newRoom]);
  }

  /** Add Room Function */
  function joinRoom(room){
    console.log("Joined Room!!", room);
  }



  return(
    <div className="Homepage">
      <h1>Boggle</h1>
      <div className="buttons">
        <Button click={selectForm} label="Create Room" type="create"/>
        <Button click={selectForm} label="Join Room" type="join"/>
      </div>
      {form.name ? <SelectedForm type={form.name} fn={form.fn}/> : null }
    </div>
  );
}

export default Homepage;
