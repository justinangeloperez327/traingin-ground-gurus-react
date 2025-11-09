import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Room = () => {
  let { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = JSON.parse(localStorage.getItem("token"));
  const api = import.meta.env.VITE_API_URL;
  useEffect(() => {
    try {
      fetch(`${api}/rooms/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok);
          return res.json();
        })
        .then((data) => {
          setRoom(data.data);
        })
        .catch((error) => {
          setError(error.message || "Failed to load rooms");
        })
        .finally(() => setLoading(false));
    } catch (err) {
      setError(err.message);
    }
  }, [roomId, token]);

  async function handleCheckout() {
    const response = await fetch(`${api}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        room_id: room.id,
        price: room.price,
      }),
    });

    const data = await response.json();
    if (data.stripe_checkout_url) {
      window.location.href = data.stripe_checkout_url;
    } else {
      alert("Failed to initiate checkout");
    }
  }

  return (
    <>
      {room && (
        <div className="card bg-base-100 w-96 shadow-sm">
          <figure>
            <img
              src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
              alt="Hotel Room"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{room.name}</h2>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => handleCheckout()}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="mt-4 text-sm text-gray-600">Loading Rooms...</div>
      )}
      {error && (
        <div className="mt-4 alert alert-error">{/* <div>{error}</div> */}</div>
      )}
    </>
  );
};

export default Room;
