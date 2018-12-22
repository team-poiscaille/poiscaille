// WARN Does not support multiple requests
export default (socket) => {
  const apiCall = (...args) => {
    const [eventName] = args;

    return new Promise((resolve) => {
      socket.once(eventName, resolve);
      socket.emit(...args);
    });
  };

  socket.apiCall = apiCall;
  return apiCall;
};
