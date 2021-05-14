export default () => 42;

export const y = () => "yay";

export const z = () => {
  let i = 0;
  i++;
  i;
};

export function notTest(value, other) {
  value;
  other;
  return "test";
}

async function someAsyncFunction() {
  return true;
}

someAsyncFunction().then((result) => console.log(result));
