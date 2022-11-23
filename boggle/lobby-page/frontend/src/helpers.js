/**Get the current lobby. */
function getLobby() {
  return localStorage.getItem("lobby");
}

/**Remove the lobby. */
function leaveLobby() {
  return localStorage.removeItem("lobby");
}

export { getLobby, leaveLobby };
