import React, { useState } from "react";
import Button from "./Button.js";
import SelectedForm from "./SelectedForm.js";

function Homepage() {
  const [form, setForm] = useState("");
  const [isUser, setIsUser] = useState(false);
  const [formResults, setFormResults] = useState({});

  console.log("Homepage", form, isUser, formResults);

  function selectForm(evt) {
    console.log(evt.target.classList.value);
    const buttonClasses = evt.target.classList.value;

    if(buttonClasses.includes("create")) {
      setForm("create");
    }

    else {
      setForm("join");
    }
  }

  return(
    <div className="Homepage">
      <h1>Boggle</h1>
      <div className="buttons">
        <Button click={selectForm} label="Create Room" type="create"/>
        <Button click={selectForm} label="Join Room" type="join"/>
      </div>
      {form ? <SelectedForm type={form} /> : null }
    </div>
  );
}

export default Homepage;
