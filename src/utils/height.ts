function Ysize(res) {
  const clientHeight = window.screen.height

  if (!clientHeight) {
    return
  }
  let fontSize = clientHeight / 1080
  fontSize = res * fontSize
  return fontSize
}
export default Ysize
