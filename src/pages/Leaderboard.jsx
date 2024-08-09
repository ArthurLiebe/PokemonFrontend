import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  // const [scores, setScores] = useState([]);
  // const [username, setUsername] = useState('');
  // const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  // Fetch scores when the component mounts
  useEffect(() => {
    fetchScores();
  }, []);

  // Function to fetch scores from the backend
  const fetchScores = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_TRAVEL_JOURNAL_API_URL}/leaderboard`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon");
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setLeaderboard(() => data);
        console.log(leaderboard);
      } else {
        throw new Error("Failed to fetch Leaderboard");
      }
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  return (
    <div className="m-auto mt-10 card bg-primary text-primary-content w-96">
      <div className="card-body">
        <h2 className="card-title">Leaderboard</h2>
        <ul>
          {leaderboard.map((entry) => (
            <li key={entry.id}>
              {entry.username}: {entry.score}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
