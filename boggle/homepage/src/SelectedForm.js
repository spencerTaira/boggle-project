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

function SelectedForm({type}){
    return (
        <div>
            {type === "create" ? <CreateForm /> : <JoinForm />}
        </div>
    );
}

export default SelectedForm;
