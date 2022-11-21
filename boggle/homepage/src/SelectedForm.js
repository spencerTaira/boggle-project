import React from "react";
import CreateForm from "./CreateForm.js";
import JoinForm from "./JoinForm.js";

/** Renders either CreateForm or JoinForm depending on prop type
 *
 *  Props:
 *  - type: like "create" or "join"
 *
 *  Stateless
 *
 *  HomePage -> SelectedForm -> { CreateForm, JoinForm }
 */

function SelectedForm({type, fn}){

    return (
        <div>
            {type === "create" 
                ? <CreateForm addRoom={fn}/> 
                : <JoinForm joinRoom={fn}/>
            }
        </div>
    );
}

export default SelectedForm;
