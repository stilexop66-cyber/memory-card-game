export const WindMessage = ({ moves }) => {
  return (
    <div className="win-message">
      <h2>Congratulations! You won!</h2>
      <p>You completed the game in {moves} moves</p>
    </div>
  );
};