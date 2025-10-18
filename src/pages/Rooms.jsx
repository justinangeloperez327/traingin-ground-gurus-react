import React, { useEffect, useMemo, useState } from "react";
import { hotels } from "../data/hotels";
import { NavLink, useNavigate } from "react-router";

const Rooms = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const rooms = useMemo(() => {
    const s = search.trim().toLowerCase();

    return hotels.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(s) ||
        hotel.description.toLowerCase().includes(s)
    );
  }, [search]);

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Rooms</li>
      <div>
        <input
          type="text"
          className="input"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {rooms.length === 0 && <p>No rooms math your filter</p>}
      {rooms.map((r) => (
        <NavLink className="list-row" key={r.id} to={`/rooms/${r.id}`}>
          <div>
            <img
              className="size-10 rounded-box"
              src="https://placehold.co/600x500"
            />
          </div>
          <div>
            <div>{r.name}</div>
            {/* <div className="text-xs uppercase font-semibold opacity-60">
            Roo
          </div> */}
          </div>
          <p className="list-col-wrap text-xs">{r.description}</p>
        </NavLink>
      ))}
    </ul>
  );
};

export default Rooms;
