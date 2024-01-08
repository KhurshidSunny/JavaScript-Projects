const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Micheal"] },
];

// 1.
dogs.forEach((dog) => (dog.recommendedFood = dog.weight ** 0.75 * 28));

console.log(dogs);

// 2.
const checkForFood = function (dogs) {
  const sarahDog = dogs.find((dog) => dog.owners.includes("Sarah"));
  const checkFood = `Sarah's dog is Eating Too ${
    sarahDog.curFood > sarahDog.recommendedFood ? "much" : "little"
  }`;
  return checkFood;
};

// 3.
const ownersEatTooMuch = dogs
  .filter((dog) => {
    return dog.curFood > dog.recommendedFood;
  })
  .flatMap((dog) => dog.owners);

const ownersEatTooLittle = dogs
  .filter((dog) => dog.curFood < dog.recommendedFood)
  .flatMap((dog) => dog.owners);

///// 4
console.log(`${ownersEatTooMuch.join(" and ")} dogs eat too much`);
console.log(`${ownersEatTooLittle.join(" and ")} dogs eat too much`);

console.log("////////////// task 5 ///////////////");
const eatRec = dogs.some((dog) => dog.curFood === dog.recommendedFood);
console.log(eatRec);

console.log("////////////// task 6 ///////////////");
const okFood = dogs.some(
  (dog) =>
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
);

console.log("////////// task 7//////////////////");
const numOkFood = dogs.filter((dog) => {
  return (
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
  );
});
console.log(numOkFood);
console.log(`Total dogs eat OK food ${numOkFood}`);

console.log(`Eat Too Much owners: ${ownersEatTooMuch}`);
console.log(`Eat Too Little owners: ${ownersEatTooLittle}`);

console.log(checkForFood(dogs));

console.log("============== task 8 =================");
console.log(dogs);
const sortedRecFood = dogs
  .slice()
  .sort((dog1, dog2) => (dog1.recommendedFood = dog2.recommendedFood));

// console.log(sortedRecFood);
