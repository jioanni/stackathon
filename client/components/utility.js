export const arrayCreator = (dataPoint, array) => {
    (array.length < 20) ? array.push(dataPoint) : array.shift() && array.push(dataPoint)
    return array
}