function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function prettyDate2(time) {
  var date = new Date(parseInt(time));
  var localeSpecificTime = date.toLocaleTimeString();
  return localeSpecificTime.replace(/:\d+ /, " ");
}

function sendMsg() {
  const time = prettyDate2(Date.now());
  chatArea = document.getElementById("chatRecord");
  const senderBox = document.createElement("DIV");
  const senderAvatar = document.createElement("IMG");
  const senderContentPara = document.createElement("P");
  const senderContent = document.createTextNode("content");
  const senderTimeSpan = document.createElement("span");
  const senderTime = document.createTextNode(time);
  const senderClearFloat = document.createElement("DIV");

  senderBox.style.border = "2px solid #dedede";
  senderBox.style.backgroundColor = "#cccddd";
  senderBox.style.border.radius = "5px";
  senderBox.style.padding = "10px";
  senderBox.style.margin = "10px 0";

  senderAvatar.setAttribute("src", "avatar.svg");
  senderAvatar.setAttribute("alt", "Avatar");
  senderAvatar.style.float = "right";
  senderAvatar.style.maxWidth = "60px";
  senderAvatar.style.width = "100%";
  senderAvatar.style.marginLeft = "20px";
  senderAvatar.style.marginLeft = "0";
  senderAvatar.style.borderRadius = "50%";

  senderContentPara.appendChild(senderContent);

  senderTimeSpan.appendChild(senderTime);
  senderTimeSpan.style.float = "left";
  senderTimeSpan.style.color = "#aaa";

  senderClearFloat.style.content = "";
  senderClearFloat.style.clear = "both";
  senderClearFloat.style.display = "table";

  senderBox.appendChild(senderAvatar);
  senderBox.appendChild(senderContentPara);
  senderBox.appendChild(senderTimeSpan);
  senderBox.appendChild(senderClearFloat);
  chatArea.appendChild(senderBox);
}

function receiveMsg() {
  const time = prettyDate2(Date.now());
  chatArea = document.getElementById("chatRecord");
  const senderBox = document.createElement("DIV");
  const senderAvatar = document.createElement("IMG");
  const senderContentPara = document.createElement("P");
  const senderContent = document.createTextNode("Hello What can i help?");
  const senderTimeSpan = document.createElement("span");
  const senderTime = document.createTextNode(time);
  const senderClearFloat = document.createElement("DIV");

  senderBox.style.border = "2px solid #dedede";
  senderBox.style.backgroundColor = "#f1f1f1";
  senderBox.style.border.radius = "5px";
  senderBox.style.padding = "10px";
  senderBox.style.margin = "10px 0";

  senderAvatar.setAttribute("src", "avatar.svg");
  senderAvatar.setAttribute("alt", "Avatar");
  senderAvatar.style.float = "left";
  senderAvatar.style.maxWidth = "60px";
  senderAvatar.style.width = "100%";
  senderAvatar.style.marginRight = "20px";
  senderAvatar.style.borderRadius = "50%";

  senderContentPara.appendChild(senderContent);

  senderTimeSpan.appendChild(senderTime);
  senderTimeSpan.style.float = "right";
  senderTimeSpan.style.color = "#aaa";

  senderClearFloat.style.content = "";
  senderClearFloat.style.clear = "both";
  senderClearFloat.style.display = "table";

  senderBox.appendChild(senderAvatar);
  senderBox.appendChild(senderContentPara);
  senderBox.appendChild(senderTimeSpan);
  senderBox.appendChild(senderClearFloat);
  chatArea.appendChild(senderBox);
}
