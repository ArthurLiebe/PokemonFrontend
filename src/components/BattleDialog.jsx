import { useState } from "react";
const BattleDialog = ({ score }) => {
  const [userName, setUserName] = useState("");
  const userScore = score.player1;
  const pcScore = score.player2;
  const leaderboardData = {
    username: userName,
    score: userScore
  }
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/leaderboard", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(leaderboardData),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch Leaderboard");
      }
    } catch (error) {
      console.error("Error fetching Leaderboard data:", error);
    }
  };
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <form>
          <fieldset>
            <p className="text-lg font-bold mb-6">
              {userScore > pcScore
                ? `You got ${userScore} Points, You win!`
                : `Computer got ${pcScore} Points, Computer wins!`}
            </p>

            <label className="input input-bordered flex items-center gap-2">
              Username
              <input
                type="text"
                className="grow"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Please give your Username"
              />
            </label>
          </fieldset>
          <div className="modal-action">
            <button className="btn" type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
export default BattleDialog;
