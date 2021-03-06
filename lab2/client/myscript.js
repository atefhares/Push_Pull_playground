const form = document.getElementById("myform");
const messageInput = document.getElementById("message");
const usernameInput = document.getElementById("username");
const submitBtn = document.getElementById("submit");
const table_body = document.getElementById("table_body");

const BASE_URL = "http://localhost:5000";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const username = usernameInput.value;
  axios
    .post(BASE_URL + "/messages/long", { message, username })
    .then((res) => (messageInput.value = ""));
});

const evtSource = new EventSource(BASE_URL + "/messages/long");

evtSource.onmessage = (e) => {
  console.log(e);
  const messages = JSON.parse(e.data);
  console.log(messages);

  table_body.innerHTML = "";
  for (i = 0; i < messages.length; i++) {
    table_body.innerHTML += `<tr>
          <th scope="row">${i + 1}</th>
          <td>${messages[i].username}</td>
          <td>${messages[i].message}</td>
          </tr>`;
  }
};
