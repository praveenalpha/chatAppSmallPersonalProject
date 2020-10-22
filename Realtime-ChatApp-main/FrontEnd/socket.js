//Message received
socket.on("receive-msg", function (obj) {
  let chatItem = document.createElement("div");
  chatItem.classList.add("chat-item");
  chatItem.classList.add("left");
  chatItem.innerHTML = `${obj.name}: ${obj.message}`;
  chatBox.appendChild(chatItem);
  chatBox.scrollTop = chatBox.scrollHeight;
});

//New User joined the chat
socket.on("new-user", function (name) {
  //Update in chat
  let chatItem = document.createElement("div");
  chatItem.classList.add("join");
  chatItem.innerHTML = `${name} joined the chat`;
  chatBox.appendChild(chatItem);
  chatBox.scrollTop = chatBox.scrollHeight;

  //Update in online list
  //   updateOnlineList(name, userDB);
});

// User left the chat
socket.on("left-chat", function (name) {
  //Update in chat
  let chatItem = document.createElement("div");
  chatItem.classList.add("leave");
  chatItem.innerHTML = `${name} left the chat`;
  chatBox.appendChild(chatItem);
  chatBox.scrollTop = chatBox.scrollHeight;

  //Update online list
  //   updateOnlineList(name, userDB);
});

socket.on("update-list", function (userDB) {
  //update count
  let count = document.querySelector(".count");
  count.innerHTML=`(${userDB.length})`;

  //update list names
  let onlineList = document.querySelector(".online-list");
  let participantsList = document.querySelector(".participants-list");
  onlineList.remove();
  let newList = document.createElement("div");
  newList.classList.add("online-list");
  for (let i = 0; i < userDB.length; i++) {
    let listItem = document.createElement("div");
    let onlineMark = document.createElement("div");
    let itemName = document.createElement("div");

    listItem.classList.add("list-item");
    onlineMark.classList.add("online-mark");
    itemName.classList.add("item-name");

    // console.log(userDB[i].name);
    itemName.innerHTML = userDB[i].name;
    listItem.appendChild(onlineMark);
    listItem.appendChild(itemName);
    newList.appendChild(listItem);
  }

  participantsList.appendChild(newList);
});
