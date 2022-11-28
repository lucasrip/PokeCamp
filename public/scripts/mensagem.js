function renderMessage(post) {
  const chatMessagens = document.getElementById("chatMessagens");

  chatMessagens.innerHTML += `
  <div class="messageItem">
    <div>
        <strong>${post.author}</strong>
    </div>
    <p>${post.message}</p>
    <strong class="time">
      ${post.time}
    </strong>
  </div>`;
}
