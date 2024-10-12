// src/Tracking.js
import React, { useState, useEffect } from "react";

const Tracking = () => {
  const [trackings, setTrackings] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchTrackings = async () => {
      const response = await fetch("http://localhost:8000/tracking");
      const data = await response.json();
      setTrackings(data);
    };
    fetchTrackings();
  }, []);

  const addTracking = async () => {
    const response = await fetch("http://localhost:8000/tracking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, status }),
    });
    const data = await response.json();
    setTrackings([...trackings, data]);
    setName("");
    setStatus("");
  };

  return (
    <div>
      <h1>Tracking System</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <button onClick={addTracking}>Add Tracking</button>
      <ul>
        {trackings.map((tracking) => (
          <li key={tracking.id}>
            {tracking.name}: {tracking.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tracking;
