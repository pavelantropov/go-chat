const params = new URLSearchParams(window.location.search);
const room = params.get("room");

if (!room) {
  alert("No room specified. Redirecting to homepage...");
  window.location.href = "/";
}

const socket = new WebSocket(`ws://${location.host}/room?room=${room}`);

socket.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);

    const msgContainer = document.createElement("div");
    msgContainer.classList.add("message-container");

    const usernameDiv = document.createElement("div");
    usernameDiv.classList.add("username");
    usernameDiv.textContent = data.name;

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.textContent = data.message;

    msgContainer.appendChild(usernameDiv);
    msgContainer.appendChild(messageDiv);

    document.getElementById("messages").appendChild(msgContainer);

    const messagesDiv = document.getElementById("messages");
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

  } catch (err) {
    console.error("Invalid JSON received:", event.data);
  }
};

function sendMessage() {
  const input = document.getElementById("msg");
  if (input.value.trim() == "") return;

  socket.send(input.value);
  input.value = "";
}

document.getElementById("sendBtn").addEventListener("click", sendMessage);

document.getElementById("msg").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});