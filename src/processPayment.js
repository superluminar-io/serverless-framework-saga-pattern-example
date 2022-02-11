/*
** The Lambda function demonstrates payment processing with a third-party integration
** Imagine a flaky integration with exceptions
*/
exports.handler = async (event) => {
  const randomNumber = Math.floor(Math.random() * 100)

  if (randomNumber < 70) {
    throw new Error(`Payment processing didn't work.`)
  }
};
