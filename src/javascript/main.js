const chatDisplay = require('./chat-display');

const messageList = chatDisplay.createMessageList('.conversation__message-list');
const userList = chatDisplay.createUserList('.conversation-list');

messageList.addMessage({ text: 'Hello', date: new Date() }, { firstName: 'Piotr', surName: 'Miara' }, false);
messageList.addMessage({ text: 'World', date: new Date() }, { firstName: 'Tomek', surName: 'Jósiak' }, true);
userList.addUser({ firstName: 'Piotr', surName: 'Miara', avatar: '10', id: 0 });
userList.addUser({ firstName: 'Piotr', surName: 'Miara', avatar: '10', id: 1 });
userList.addUser({ firstName: 'Piotr', surName: 'Miara', avatar: '10', id: 2 });
userList.activateUsers({
    0: true,
    1: true
});
