import React from "react";

/** Presentation component for a Room
 *
 *  Props:
 *  - room: like "Room Name"
 *
 *  Stateless
 *
 *  Rooms -> Room
 */

function Room({ room }) {
  return (
    <div className="Room">
      { room }
    </div>
  );
}

export default Room;
