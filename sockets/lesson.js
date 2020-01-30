const io = global.io;

module.exports = {
  sendNotebookText(socket) {
    return socket.on('send-notebook-text', (txt, room) => {
      socket.to(room).broadcast.emit('notebook-text', txt)
    })
  },
  closeRoom() {

  }
}