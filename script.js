document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const fileInput = document.getElementById('file-input');

    loadMessages();

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value;
        const file = fileInput.files[0];
        if (message || file) {
            addMessageToChatBox(message, file);
            saveMessage(message, file);
            messageInput.value = '';
            fileInput.value = '';
        }
    });

    function addMessageToChatBox(message, file) {
        const messageDiv = document.createElement('div');
        if (message) {
            messageDiv.textContent = message;
        }
        if (file) {
            const fileLink = document.createElement('a');
            fileLink.href = URL.createObjectURL(file);
            fileLink.textContent = file.name;
            fileLink.target = '_blank';
            messageDiv.appendChild(fileLink);
        }
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function saveMessage(message, file) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        const newMessage = { message: message, file: file ? file.name : null };
        messages.push(newMessage);
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.forEach(msg => {
            addMessageToChatBox(msg.message, msg.file);
        });
    }
});
