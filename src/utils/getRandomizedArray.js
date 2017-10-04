export default function (array = []) {
  function randomize (arr) {
    if (!arr.length) {
      return []
    }
    let randomIndex = Math.floor(Math.random() * arr.length)
    return arr.splice(randomIndex, 1).concat(randomize(arr))
  }

  let arrayCopy = Array.from(array)
  return randomize(arrayCopy)
}
