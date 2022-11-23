import React, { useState } from "react";
import Button from "./Button";

const defaultFormData = {
  username: "",
}

/** Form for creating username 
 * 
 * Props
 *  - initialFormData (Default: defaultFormData) 
 *  - addUser: fn to call in parent
 * 
 * States
 *  - formData: like { username }
 * 
 * Homepage -> UsernameForm -> Button
 */

function UsernameForm({addUser, initialFormData=defaultFormData}){
    const [formData, setFormData] = useState(initialFormData);
    //console.log(formData, "<<<<<<<<< formData in Username Form");

    function handleChange(evt) {
        const { name, value } = evt.target;

        setFormData(formData => ({
        ...formData,
        [name]: value,
        }));
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if(!(formData.username === "")){   
            addUser(formData);
            setFormData(initialFormData);
        }
        else {
            alert("Please input username")
        }
    }


    return (
        <form className="Username">
        <h3>Username</h3>
        <div>
            <label htmlFor="CreateUser">Username:</label>
            <input 
                type="text"
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