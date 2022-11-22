import React, { useState } from "react";
import Button from "./Button";

const defaultFormData = {
  username: "",
}

/**
 * 
 */

function UsernameForm({addUser, initialFormData=defaultFormData}){
    const [formData, setFormData] = useState(initialFormData);
    console.log(formData, "<<<<<<<<< formData in Username Form")

    function handleChange(evt) {
        const { name, value } = evt.target;

        setFormData(formData => ({
        ...formData,
        [name]: value,
        }));
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        addUser(formData);
        setFormData(initialFormData);
    }


    return (
        <form className="Username">
        <h3>Username</h3>
        <div>
            <label htmlFor="CreateUser">Username:</label>
            <input
                id="CreateUser"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                name="username"
                aria-label="Username"
            />
        </div>
        <Button click={handleSubmit} label="Create User" type="form-user"/>
        </form>
    )
}

export default UsernameForm;