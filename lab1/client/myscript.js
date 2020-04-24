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

function sendGetRequest() {
  axios.get(BASE_URL + "/messages").then((res) => {
    const { data } = res;
    console.log(data);

    table_body.innerHTML = "";
    for (i = 0; i < data.length; i++) {
      table_body.innerHTML += `<tr>
      <th scope="row">${i + 1}</th>
      <td>${data[i].username}</td>
      <td>${data[i].message}</td>
      </tr>`;
    }
  });
}

function sendGetRequestAwait() {
  axios.get(BASE_URL + "/messages/long").then((res) => {
    const { data } = res;
    console.log(data);

    table_body.innerHTML = "";
    for (i = 0; i < data.length; i++) {
      table_body.innerHTML += `<tr>
        <th scope="row">${i + 1}</th>
        <td>${data[i].username}</td>
        <td>${data[i].message}</td>
        </tr>`;
    }

    sendGetRequestAwait();
  });
}

// to fetch initial messages [only one time]
sendGetRequest();

// recurring fetch new messages on any client send
sendGetRequestAwait();
