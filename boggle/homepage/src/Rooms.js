import React from "react";
import Room from "./Room";

/** Renders a Room component for each room
 *
 *  Props:
 *  - rooms: like { roomName, id }
 *
 *  Stateless
 *
 *  Homepage -> Rooms -> Room
 */

function Rooms({ rooms }) {
  return (
    <div className="Rooms">
      {rooms.map(room => (
        <Room
          key={room.id}
          room={room.roomName}
        />
      ))}
    </div>
  );
}

export default Rooms;
