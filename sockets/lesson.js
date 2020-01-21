const io = global.io;

module.exports = {
  async connectToRoom (socket) {



    socket.on('join', (room) => {
      console.log(room)
    })
  },
  closeRoom () {

  }
}