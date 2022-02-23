const socket = io();
let user;
let chatBox = document.getElementById('chatBox');

Swal.fire({
    title: 'Log in',
    input: 'text',
    text: 'Write your username',
    allowOutsideClick: false,
    inputValidator: (value) => {
        return !value && "Log in with a valid user!"
    }
}).then(result => {
    user = result.value;
})

chatBox.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', {
                user: user.trim(),
                message: chatBox.value.trim()
            })
            chatBox.value = "";
        }
    }
})

socket.on('newUser', (data)=>{
    alert('New user')
})
socket.on('chatLog', data => {
    const chatLog = document.getElementById('chatLog');
    let messages = "";
    data.forEach(message => {
        messages += `<strong>${message.user}:</strong>${message.message}<br>`;
    });
    chatLog.innerHTML = messages;
})