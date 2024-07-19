function cl()
        {
            document.getElementById('chat-container').innerHTML = '';
        }
        document.getElementById("chat-form").addEventListener("submit", async function(event) {
            event.preventDefault();
            const msgInp = document.getElementById("message-input");
            const message = msgInp.value;
            if (!message.trim()) return;

            const response = await fetch("/prompt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt: message })
            });
            //getting the response
            const responseData = await response.json();
            //getting the chatContainer for Storing The History of responses
            const chatContainer = document.getElementById("chat-container");
            //creating a div for appending
            const userMessage = document.createElement("div");
            //adding Classes for the styling to be added onto it
            userMessage.classList.add("message","user-message");
            //Displaying and appending The Message
            userMessage.innerHTML = '<h3>User:</h3> '+message;
            chatContainer.appendChild(userMessage);

            //Same Goes With The Chat BOT Response
            const botMessage = document.createElement("div");
            botMessage.classList.add("message","bot-message");
            botMessage.innerHTML = '<h3>ChatBOT:</h3> '+responseData.response;
            chatContainer.appendChild(botMessage);

            //clearing for accepting the other input
            msgInp.value = "";
            //Whenever more responses are recorded then the scroll gets to the newly recieved response
            chatContainer.scrollTop = chatContainer.scrollHeight;
        });