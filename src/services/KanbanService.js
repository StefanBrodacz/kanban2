export default {
  saveBoard(board) {
    console.log(board);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("foo");
      }, 3000);
    });
  }
};
