import React, { useState, useEffect } from "react";
import Button from "./Button.js";
import SelectedForm from "./SelectedForm.js";
import { v4 as uuid } from "uuid";
import UsernameForm from "./UsernameForm.js";
import Rooms from "./Rooms.js";
import axios from 'axios';


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
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState(null);
  const [testData, setTestData] = useState([{}]);

  console.log("Homepage", form, isUser, rooms, "<ROOM",user);
  console.log(testData, "<<<<<<<<<< test Data")

  /** Identify which button was selected. Create or Join */
  function selectForm(evt) {
    // console.log(evt.target.classList.value);
    const buttonClasses = evt.target.classList.value;

    if(buttonClasses.includes("create")) {
      setForm({
        name: "create",
        fn: AddRoom
      });
    }

    else {
      setForm({
        name: "join",
        fn: JoinRoom
      });
    }
  }

  // function AxiosTest(){
  //   useEffect(() => {
  //     axios.get("/homepage")
  //       .then(
  //           res => {
  //             console.log(res, "<<<<<<<<< res")
  //             setTestData(res.data)
  //             console.log(res.data, "<<< from backend");
  //         }
  //       )
  //   }, [] );
  // }

  // AxiosTest();



  /** Add Room Function */
  async function AddRoom(room){
    const newRoom = {...room, id: uuid()};
    // setRooms(rooms => [...rooms, newRoom]);
    console.log(room, "<<<<<<<<< room in addRoom");

    // useEffect(() => {
    //   console.log("use Effect", room)
    // }, [] );

    let testing = await axios
      .post(`/test`, testData)
      .then((res) => {
        console.log(res, "<<<<<<< in AddRoom");
        return res
      });

    console.log(testing, "<<<<< seeing axios")

    // useEffect(() => {
      
    //   axios.post(
    //         "/test",
    //         testData)
    //     .then(
    //       res => {
    //         console.log(res, "<<<<<<<<<< in Homepage Add Room");
    //         setTestData(res.data);
    //       }
    //   )
    // }, [] )
    //Make axios call to backend. Make query to update rooms table.
    //Take us to lobby
    //store roomName in session
    // JoinRoom(room);
  }

  /** Add Room Function */
  function JoinRoom(room){
    console.log("Joined Room!!", room);
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
      <h1>Boggle</h1>

      { isUser ?
      <div className="buttons">
        <Button click={selectForm} label="Create Room" type="create"/>
        <Button click={selectForm} label="Join Room" type="join"/>
      </div>
      : <UsernameForm addUser={addUser} /> }
      { form.name ? <SelectedForm type={form.name} fn={form.fn} /> : null }
      <Rooms rooms={rooms}/>
      { testData.rooms === undefined
          ? null
          : (
            testData.rooms.map((room,i) => (
            <p key={i}>{room.name} {room.id}</p>
            ))
          )
      }
    </div>
  );
}

export default Homepage;

//TODO: show rooms that are in db (exists)
