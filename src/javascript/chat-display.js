module.exports = {
    createMessageList(elName) {
        const self = {};
        self.el = document.querySelector(elName);
        self.addMessage = addMessage;
        return self;
    },

    createUserList(elName) {
        const self = {};
        self.el = document.querySelector(elName);
        self.addUser = addUser;
        self.activateUsers = activateUsers;
        return self;
    }
};

function addUser(user) {
    const userEl = document.createElement('li');
    const image = document.createElement('img');
    const text = document.createElement('div');
    userEl.classList.add('miniature');
    image.classList.add('miniature__img');
    text.classList.add('miniature__text');
    userEl.setAttribute('data-id', user.id);
    image.setAttribute('src', `/images/avatar-${user.avatar}.png`);
    text.textContent = `${user.firstName} ${user.surName}`;
    userEl.appendChild(image);
    userEl.appendChild(text);
    this.el.appendChild(userEl);
}

function activateUsers(activeIds) {
    toList(this.el.children).forEach(child => {
        const childId = parseInt(child.getAttribute('data-id'));
        if (activeIds[childId]) {
            child.classList.add('miniature--active');
        } else {
            child.classList.remove('miniature--active');
        }
    });
}


function toList(collection) {
    return Array.prototype.slice.call(collection, 0);
}



















function addMessage(message, author, isLocal) {
    const hours = message.date.getHours();
    const minutes = message.date.getMinutes();

    const messageEl = document.createElement('li');
    const info = document.createElement('div');
    messageEl.textContent = message.text;
    info.textContent = `${author.firstName} ${author.surName}, ${hours}:${ minutes > 9 ? minutes : '0'+minutes }`;
    messageEl.classList.add('message');
    if (isLocal) {
        messageEl.classList.add('message--self');
    }
    info.classList.add('message__info');

    messageEl.appendChild(info);
    this.el.appendChild(messageEl);
}
