import React from "react";
import CreateForm from "./CreateForm.js";
import JoinForm from "./JoinForm.js";

function SelectedForm({type}){
    return (
        <div>
            {type === "create" ? <CreateForm /> : <JoinForm />}
        </div>
    );
}

export default SelectedForm;
