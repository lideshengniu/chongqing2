function fsize(res) {
  const clientWidth = window.screen.width

  if (!clientWidth) {
    return
  }
  let fontSize = clientWidth / 1920
  fontSize = res * fontSize
  return fontSize
}
export default fsize
