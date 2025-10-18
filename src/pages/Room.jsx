import React, { useEffect, useState } from "react";
import { hotels } from "../data/hotels";
import { useParams } from "react-router";

const Room = () => {
  let { roomId } = useParams();
  const [room, setRoom] = useState(null);

  const findByRoomId = (roomId) => {
    return hotels.find((hotel) => hotel.id === roomId);
  };

  useEffect(() => {
    const room = findByRoomId(parseInt(roomId));
    setRoom(room);
  }, [roomId]);

  return (
    <>
      <div>Room {roomId}</div>
      <div>{room && room.description}</div>
    </>
  );
};

export default Room;
