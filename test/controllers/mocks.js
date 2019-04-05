const mealIdMocks = {
  validList: [52772, 52771, 52769],
  nonExistentIds: [52772, 52771, 50000],
  emptyList: [],
  nonArray: { id1: 52772, id2: 52769 },
  nonNumberArray: [[], {}, 'jack'],
  singleNumberArray: [52772],
};

export default mealIdMocks;
