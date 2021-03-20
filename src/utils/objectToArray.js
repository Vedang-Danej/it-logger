const objectToArray = (obj) => {
  const array = [];
  for (let key in obj) {
    array.push({
      ...obj[key],
      key: key,
    });
  }
  return array;
};
export default objectToArray;
