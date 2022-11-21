import React from "react";

function SelectedForm({type}){
    return (
        <div>
            {type === "create" ? <CreateForm /> : <JoinForm />}
        </div>
    )
}

export default SelectedForm;