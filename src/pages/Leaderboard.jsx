import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        fetchScores();
    }, []);

    const fetchScores = async () => {
        try {
            const response = await fetch('http://localhost:3000/leaderboard');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const sortedData = data.sort((a, b) => b.score - a.score);
            console.log(sortedData);
            setScores(sortedData);
        } catch (error) {
            console.error("Error fetching scores:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Leaderboard</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Position</th>
                            <th className="py-2 px-4 border-b">Username</th>
                            <th className="py-2 px-4 border-b">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((entry, index) => (
                            <tr key={entry.id}>
                                <td className="py-2 px-4 border-b text-center">{index + 1}.</td>
                                <td className="py-2 px-4 border-b text-center">{entry.username}</td>
                                <td className="py-2 px-4 border-b text-center">{entry.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;