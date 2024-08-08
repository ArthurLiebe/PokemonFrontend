const BattleDialog = ({ score}) => {
  const handleSubmit =() => {
    console.log("close");
  }
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <form>
          <fieldset>
            <p className="text-lg font-bold mb-6">{score.player1 > score.player2 ? `You got ${score.player1} Points, You win!` : `Computer got ${score.player2} Points, Computer wins!`}</p>

            <label className="input input-bordered flex items-center gap-2">
              Username
              <input
                type="text"
                className="grow"
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
