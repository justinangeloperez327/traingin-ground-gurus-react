import React, { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router";

const Success = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const token = JSON.parse(localStorage.getItem("token"));
  const api = import.meta.env.VITE_API_URL;
  useEffect(() => {
    if (!sessionId) {
      setStatus({ ok: false, message: "Missing session_id" });
      setLoading(false);
    }

    (async () => {
      try {
        const res = await fetch(
          `${api}/success?session_id=${encodeURIComponent(sessionId)}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        await res.json();

        if (!res.ok) {
          setStatus({
            ok: false,
            message: "Verification Failed",
          });
        } else {
          setStatus({
            ok: true,
            message: "Payment status received",
          });
        }
      } catch (err) {
        setStatus({ ok: false, message: err.message || "Network error" });
      } finally {
        setLoading(false);
      }
    })();
  }, [sessionId, token]);

  return (
    <div className="min-h-screen flex items-center justify center bg-base-200 p-6">
      {loading ? (
        <div className="card w-full">
          <div className="card-body items-center">
            <h2 className="card-title">Verifying payment...</h2>
            <progress className="progress w-56"></progress>
            <div className="text-sm text-muted">
              Please wait while we confirm your payment.
            </div>
          </div>
        </div>
      ) : !status?.ok ? (
        <div className="card w-full">
          <div className="card-body items-center">
            <div className="alert alert-error">
              <span className="">Payment not Completed</span>
            </div>
            <div className="card-actions">
              <NavLink to="/">Back to Home</NavLink>
            </div>
          </div>
        </div>
      ) : (
        <div className="card w-full">
          <div className="card-body items-center">
            <div className="alert alert-success">
              <span className="">Payment Successful</span>
            </div>
            <h2 className="card-title">Thank you</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Success;
