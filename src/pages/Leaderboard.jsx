import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

 
  useEffect(() => {
    fetchScores();
  }, []);

 
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
        
        const sortedData = data.sort((a, b) => b.score - a.score);
        setLeaderboard(() => sortedData);
        console.log(sortedData);
      } else {
        throw new Error("Failed to fetch Leaderboard");
      }
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  return (
    
      <div className="m-auto mt-10 card bg-primary text-primary-content w-96 text-center font-bold">
        <div className="card-body">
          <h2 className="card-title font-press-start text-center">Leaderboard:</h2>
          <ul>
            {leaderboard.map((entry, index) => (
              <li key={entry.id}>
                {index + 1}. {entry.username}: {entry.score}
              </li>
            ))}
          </ul>
        </div>
      </div>
    
  );
};

export default Leaderboard;