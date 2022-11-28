/* eslint-disable no-unused-vars */
import axios from "axios";

export async function mockRequestUrl(
  price,
  initial,
  months,
  sum,
  monthlyPayment
) {
  const mockUrl = "http://jsonplaceholder.typicode.com/posts";

  try {
    const res = await axios.post(mockUrl, {
      params: {
        price: price,
        initial: initial,
        months: months,
        sum: sum,
        monthlyPayment: monthlyPayment,
      },
    });
    return res.status;
  } catch (error) {
    console.log(error.message);
  }
}
// we will use mock bellow for button test
export function mockRequestTimeout(
  price,
  initial,
  months,
  sum,
  monthlyPayment
) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("201");
    }, 1000);
  });
}
