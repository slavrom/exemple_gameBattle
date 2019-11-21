addOne = () => {
  let number = 0;
  return () => {
    console.log(++number);
  }
}

const countInvokations = addOne();

countInvokations(); // 1
countInvokations(); // 2