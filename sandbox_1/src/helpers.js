let nextItemIndex = 1;

const randomValue = () => 20 + Math.floor(80 * Math.random());

function getInitialData() {
  const startingCount = 10;
  let items = [];
  for (let i = 0; i < startingCount; i++) {
    items = getAppendedData(items);
  }
  return items;
}

function getAppendedData(data) {
  const nextData = data.map(entry => entry);
  nextData.push({
    id: "id-" + nextItemIndex,
    value: randomValue(),
    name: "Item " + nextItemIndex
  });
  nextItemIndex++;
  return nextData;
}

function getTruncatedData(data) {
  return data.map(entry => entry).slice(1);
}

function getUpdatedData(data) {
  return data.map(entry => ({
    id: entry.id,
    value: randomValue(),
    name: entry.name
  }));
}

export { getInitialData, getAppendedData, getTruncatedData, getUpdatedData };
