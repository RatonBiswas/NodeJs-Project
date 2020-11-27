const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const socket= io() 

//** Messages from server */
socket.on('message', message =>{
    console.log(message);
    outputMessage(message)

    //**Scroll down */
    chatMessages.scrollTop = chatMessages.scrollHeight

})

// ** message Submit */

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    //** Get message text */
    const msg = e.target.elements.msg.value
    
    // ** Emit message  to server */
    socket.emit('chatMessage',msg);
})

//** Output message to DOM */
function outputMessage (message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Raton <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}