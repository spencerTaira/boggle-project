/**
 * lobbyForm
 *
 * State:
 *
 * Props:   username - string
 *          handleChange - function
 *          handleSubmit - function
 *
 * Lobby -> LobbyForm
 */
function LobbyForm({ username, handleChange, handleSubmit }) {
  return (
    <form className="LobbyForm" onSubmit={handleSubmit}>
      <input value={username} onChange={handleChange} />
      <button>Create</button>
    </form>
  );
}

export default LobbyForm;
