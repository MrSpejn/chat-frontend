module.exports = function ChatConnection(opts) {
    const options = Object.assign({}, { address: '127.0.0.1', port: '8000', path: '' }, opts);
    const __handlers = {};
    const supportedEvents = [ 'open', 'init', 'error', 'message', 'join', 'leave', 'close' ];
    const self = {
        isOpen: false,
        on(eventName, handler) {
            if (!supportedEvents.includes(eventName)) throw 'Unsupported event';
            if (!(handler instanceof Function)) throw 'Handler must be a function';
            addHandler(__handlers, eventName, handler);
        },
        send(text) {
            if (!self.isOpen) throw 'Cannot send on closed connection';
            self.socket.send(JSON.stringify({ text: text }));
        },
        close() {
            self.socket.close();
        }
    };

    if (options.open) addHandler(__handlers, 'open', options.open);
    if (options.init) addHandler(__handlers, 'init', options.init);
    if (options.error) addHandler(__handlers, 'error', options.error);
    if (options.message) addHandler(__handlers, 'message', options.message);
    if (options.join) addHandler(__handlers, 'join', options.join);
    if (options.leave) addHandler(__handlers, 'leave', options.leave);
    if (options.close) addHandler(__handlers, 'close', options.close);

    const socket = new WebSocket(`ws://${options.address}:${options.port}${options.path}?token=${options.token}`);
    socket.onopen = function (event) {
        self.isOpen = true;
        triggerEvent('open' ,__handlers, [self, event]);
    }
    socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        switch (data.type) {
            case 'INITIAL': triggerEvent('init' ,__handlers, [ self, data.data ]); break;
            case 'JOIN': triggerEvent('join' ,__handlers, [ self, data.data ]); break;
            case 'LEAVE': triggerEvent('leave' ,__handlers, [ self, data.data ]); break;
            case 'MESSAGE': triggerEvent('message' ,__handlers, [ self, data.data ]); break;
        }
    }
    socket.onerror = function (event) {
        triggerEvent('error' ,__handlers, [self, event]);
    }
    socket.onclose = function (event) {
        triggerEvent('close' ,__handlers, [self, event]);
    }
    self.socket = socket;
    return self;
}

function triggerEvent(eventName, handlers, params) {
    executeHandlers(handlers[eventName], params);
}

function addHandler(obj, eventName, handler) {
    if (obj[eventName]) {
        obj[eventName].push(handler);
    } else {
        obj[eventName] = [ handler ];
    }
}

function executeHandlers(handlers, params = []) {
    if (!handlers) return;
    handlers.forEach(handler => {
        handler.apply(null, params);
    });
}
