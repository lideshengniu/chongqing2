export function getMonthDays() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  // const date = new Date()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const seconde = date.getSeconds()
  const time = `${year}-${month}-${day} ${hour}:${minute}:${seconde}`

  return time
}
export function getSeconds() {
  const date = new Date()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const seconde = date.getSeconds()
  const time = `${hour}:${minute}:${seconde}`
  return time
}
