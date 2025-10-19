import { useEffect, useState } from "react";

import { NavLink } from "react-router";

const Rooms = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rooms, setRooms] = useState([]);
  //   const { token } = useAuth();
  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    setLoading(true);
    setError(null);

    const url = `/api/rooms?search=${search}`;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setRooms(data.data);
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [search, token]);

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
      {rooms.map((r, index) => (
        <NavLink className="list-row" key={index} to={`/rooms/${r.id}`}>
          <div>
            <img
              className="size-10 rounded-box"
              src="https://placehold.co/600x500"
            />
          </div>
          <div>
            <div>{r.name}</div>
          </div>
          <p className="list-col-wrap text-xs">{r.room_number}</p>
        </NavLink>
      ))}
      {loading && (
        <div className="mt-4 text-sm text-gray-600">Loading Rooms...</div>
      )}
      {error && (
        <div className="mt-4 alert alert-error">{/* <div>{error}</div> */}</div>
      )}
    </ul>
  );
};

export default Rooms;
