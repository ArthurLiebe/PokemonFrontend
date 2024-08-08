import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
    const [scores, setScores] = useState([]);
    const [username, setUsername] = useState('');
    const [score, setScore] = useState(0);

    // Fetch scores when the component mounts
    useEffect(() => {
        fetchScores();
    }, []);

    // Function to fetch scores from the backend
    const fetchScores = async () => {
        try {
            const response = await fetch('/leaderboard');
            const data = await response.json();
            setScores(data);
        } catch (error) {
            console.error("Error fetching scores:", error);
        }
    };

    // Function to handle the score submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/leaderboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, score }),
            });
            await response.json();
            fetchScores(); // Refresh the leaderboard after submission
            setUsername('');
            setScore(0);
        } catch (error) {
            console.error("Error submitting score:", error);
        }
    };

    return (
        <div>
            <h1>Leaderboard</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Enter your name" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Enter your score" 
                    value={score} 
                    onChange={(e) => setScore(e.target.value)} 
                    required 
                />
                <button type="submit">Submit Score</button>
            </form>
            <h2>Top Scores</h2>
            <ul>
                {scores.map((entry) => (
                    <li key={entry.id}>
                        {entry.username}: {entry.score} (Date: {new Date(entry.date).toLocaleDateString()})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
