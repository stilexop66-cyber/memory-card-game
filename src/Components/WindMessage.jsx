export const windMessage = (moves) => {
  return (
    <div className="win-message">
      <h2>Congratulations! You won!</h2>
      <p>you completed the game in {moves} moves</p>
    </div>
  );
};
