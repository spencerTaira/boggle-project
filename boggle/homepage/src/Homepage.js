import React, { useState, useEffect } from "react";
import Button from "./Button.js";
import SelectedForm from "./SelectedForm.js";
import UsernameForm from "./UsernameForm.js";
import Rooms from "./Rooms.js";
import axios from 'axios';
// import { ReactSession } from 'react-client-session';
import { makeid } from "./utils.js";
import "./Homepage.css"


const BASE_URL = "http://localhost:5000/";

/** Smart component rendering the homepage
 *
 *  Props:
 *  - none
 *
 *  States:
 *  - form: like "create" or "join"
 *  - isUser: Boolean
 *  - formData: like { roomName } or { roomCode }
 *  - rooms: like [{ room }, ...]
 *    --room: like { roomName, id }
 *  - user: like { username }
 *
 *  App -> Homepage -> { SelectedForm, Button, UsernameForm, Rooms }
 */

function Homepage() {
  const [form, setForm] = useState({name: "", fn: null});
  const [isUser, setIsUser] = useState(false);
  // const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([{}]);

  console.log("Homepage", form, isUser,user);
  console.log(rooms, "<<<<<<<<<< rooms")

  /** Identify which button was selected. Create or Join */
  function selectForm(evt) {
    // console.log(evt.target.classList.value);
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


  useEffect(() => {
      axios.get("/homepage")
        .then(
            res => {
              console.log(res, "<<<<<<<<< res")
              setRooms(res.data)
              console.log(res.data, "<<< from backend");
          }
        )
    }, [] );




  /** Add Room Function */
  async function addRoom(room){
    const newRoom = {...room, id: makeid(6)};
    // setRooms(rooms => [...rooms, newRoom]);
    console.log(newRoom, "<<<<<<<<< room in addRoom");

    let testing = await axios
      .post(`/addRoom/${room.roomName}`, newRoom)
      .then((res) => {
        return res.data
      });

    console.log(testing, "<<<<< seeing axios")

    //   axios.post(
    //         "/test",
    //         testData)
    //     .then(
    //       res => {
    //         console.log(res, "<<<<<<<<<< in Homepage Add Room");
    //         setTestData(res.data);
    //       }
    //   )

    //Make axios call to backend. Add room. Go to lobby.
    //Take us to lobby
    //store roomName in session
    await joinRoom(room);
  }

  /** Add Room Function */
  async function joinRoom(room){
    console.log("Joined Room!!", room);

    let joinTest = await axios
      .get(`/joinRoom/${room.roomName}`, {headers: {username: user.username}})
      .then(res => {
        console.log(res.data);
      });

    console.log(joinTest, "<<<<< test joinRoom")
    //on backend,
    //Make axios call and check if room exists
    //if it does, enter lobby. make get request to render the lobby html
    //store roomName in session
    //get request TODO: communicate with backend
      //render template for lobby page of roomName
  }

  /** Add User */
  function addUser(userData){
    //store username in session
    setUser(userData);
    setIsUser(true);
  }


  return(
    <div className="Homepage">
      <h1 className="Homepage-title">Boggle</h1>

      { isUser ?
      <div className="Homepage-buttons">
        <Button click={selectForm} label="Create Room" type="create"/>
        <Button click={selectForm} label="Join Room" type="join"/>
      </div>
      : <UsernameForm addUser={addUser} /> }
      { form.name ? <SelectedForm type={form.name} fn={form.fn} /> : null }
      { rooms.rooms === undefined
          ? null
          : (
            rooms.rooms.map((room,i) => (
            <p key={i}>{room.roomName} {room.id}</p> // TODO: Change to 'a' tag with href
            ))
          )
      }
    </div>
  );
}

export default Homepage;
