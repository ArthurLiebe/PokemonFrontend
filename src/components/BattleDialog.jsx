import { useState } from "react";
const BattleDialog = ({ score}) => {
  const [userName, setUserName] = useState("")
  const userScore = score.player1
  const pcScore = score.player2
  console.log("close", score, userName);
  const handleSubmit =() => {
    console.log("close", score, userName);
  }
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <form>
          <fieldset>
            <p className="text-lg font-bold mb-6">{userScore > pcScore ? `You got ${userScore} Points, You win!` : `Computer got ${pcScore} Points, Computer wins!`}</p>

            <label className="input input-bordered flex items-center gap-2">
              Username
              <input
                type="text"
                className="grow"
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}
                placeholder="Please give your Username"
              />
            </label>
          </fieldset>
          <div className="modal-action">
              <button className="btn" type="submit" onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
export default BattleDialog;
