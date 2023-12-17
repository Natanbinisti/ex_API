//https://b1messenger.imatrythis.com/

/*
<========================================>
<=              BACK-END                =>
<========================================>
 */
let token = ""
const content = document.querySelector(".content")

function login() {
    const username = document.querySelector("#username")
    const password = document.querySelector("#password")

    let body = {
        username: username.value,
        password: password.value
    }
    let params = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(body)

    }

    fetch("https://b1messenger.imatrythis.com/login", params)
        .then(response => response.json())
        .then(data => {
            if (data.message == 'Invalid JWT Token') {
                renderLoginForm()
            } else {
                token = data.token
                run()
            }
        })
}

async function fetchMessages() {
    let params = {
        headers: {"Content-type": "application/json", "Authorization": `Bearer ${token}`},
        method: "GET"
    }
    return await fetch("https://b1messenger.imatrythis.com/api/messages", params)
        .then(response => response.json())
        .then(data => {
            if (data.message == "Invalid JWT Token") {
                renderLoginForm()
            } else {
                return data
            }
        })
}

function render(pageContent) {
    content.innerHTML = "",
        content.innerHTML = pageContent
}

function generateMessage(message) {
    let messageTemplate = `<div class="row">
        <hr>
        <p><strong>${message.author.username} :<strong>${message.content}</p>
    </div>`
    return messageTemplate
}

function sendMessage(messageToSend) {
    let body = {
        content: messageToSend
    }
    let params = {
        headers: {"Content-type": "application/json", "Authorization": `Bearer ${token}`},
        method: "POST",
        body: JSON.stringify(body)
    }
    fetch(`https://b1messenger.imatrythis.com/api/messages/new`, params)
        .then(response => response.json())
        .then(data => {
                if (data.message == 'Invalid JWT Token' | "Invalid credentials.") {
                    renderLoginForm()
                } else {
                    if (data == "OK") {
                        run()
                    } else {
                        alert("ta cassé un truc")
                        run()
                    }
                }

            }
        )
}

/*
<========================================>
<=              FRONT-END               =>
<========================================>
 */
function renderLoginForm() {
    let loginTemplate = `<div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Username</label>
      <input class="form-control" id="username">
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Password</label>
      <input class="form-control" type="password" id="password">
    </div>
    <button type="button" class="btn" id="logInButton">Log In</button>`

    render(loginTemplate)
    const loginButton = document.querySelector("#logInButton")
    loginButton.addEventListener('click', () => {
        login()
    })
}

function generateMessageForm() {
    let messageFormTemplate =
        `<div class="form-control">
          <input class="form-control" type="text" name="" id="postMessage" placeholder="your message">
          <button class="btn btn-success form-control" id="postMessageButton">Envoyer</button>
        </div>`
    return messageFormTemplate
}

function renderMessages(tableauMessages) {
    let contentMessages = ""

    tableauMessages.forEach(message => {
        contentMessages += generateMessage(message)
    })
    let messagesAndMessageForm = contentMessages + generateMessageForm()

    render(messagesAndMessageForm)

    const postMessage = document.querySelector('#postMessage')
    const postMessageButton = document.querySelector('#postMessageButton')

    postMessageButton.addEventListener('click', () => {
        sendMessage(postMessage.value)
    })
}

function run() {
    if (!token) {
        renderLoginForm()
    } else {
        fetchMessages().then(messages => {
            renderMessages(messages)
        })
    }
}


run()