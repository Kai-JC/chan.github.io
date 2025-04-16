const form = document.getElementById("input-form");
const chatLog = document.getElementById("chat-log");
const inputField = document.getElementById("message-input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = inputField.value.trim();
  if (!message) return;

  // Display the user's message in the chat log
  chatLog.innerHTML += `<div class="message user"><strong>You:</strong> ${message}</div>`;
  inputField.value = "";
  chatLog.scrollTop = chatLog.scrollHeight;

  // Add a loading message for the bot response
  chatLog.innerHTML += `<div class="message bot"><em>K.AI is thinking...</em></div>`;
  chatLog.scrollTop = chatLog.scrollHeight;

  try {
    // IMPORTANT: Replace the URL below with your external backend URL
    const response = await fetch("https://chatbot.kaic.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    // Remove the loading message and display the bot's reply
    chatLog.innerHTML = chatLog.innerHTML.replace(
      `<div class="message bot"><em>K.AI is thinking...</em></div>`,
      `<div class="message bot"><strong>K.AI:</strong> ${data.reply}</div>`
    );
  } catch (error) {
    chatLog.innerHTML += `<div class="message bot"><strong>K.AI:</strong> Hmm... something went wrong!</div>`;
  }
  
  chatLog.scrollTop = chatLog.scrollHeight;
});
