//https://b1messenger.imatrythis.com/

/*
<========================================>
<=              BACK-END                =>
<========================================>
 */
let token = null

function login(){
    const username = document.querySelector("#username")
    const password = document.querySelector("#password")

    let body = {
        username: username.value,
        password: password.value
    }
    let params = {
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(body),
        method: "POST"
    }

    fetch("//https://b1messenger.imatrythis.com/login", params)
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
async function fetchMessages(){
    let params = {
        headers: {"Content-type": "application/json", "Authorization":`Bearer ${token}`}
    }
    return await ("//https://b1messenger.imatrythis.com/messages", params)
        .then (response => response.json())
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


run()



























/*
<========================================>
<=              FRONT-END               =>
<========================================>
 */
function renderLoginForm() {
    let loginTemplate =    `<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Username</label>
  <input class="form-control" id="username">
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Password</label>
  <input class="form-control" id="password">
</div>
<button type="button" class="btn" id="logInButton">Log In</button>`

render(loginTemplate)
    const loginButton = document.querySelector("#logInButton")
    loginButton.addEventListener('click', () =>{
        login()
    })
}
function generateMessageForm() {
    let messageTemplate =
        `<div class="form-control">
          <input class="form-control" type="text" name="" id="postMessage" placeholder="your message">
          <button class="btn btn-success form-control" id="postMessageButton">Envoyer</button>
        </div>`
    return messageTemplate
}