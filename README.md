# Serverless Framework Saga Pattern Example
> This example demonstrates a simple [saga pattern](https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/implement-the-serverless-saga-pattern-by-using-aws-step-functions.html) using AWS Step Functions and DynamoDB

## Architecture

![state machine defintion](./docs/architecture.svg)

### Execution Input

```json
{
  "itemId": "coffee-beans",
  "quantity": 1,
  "firstname": "Laura",
  "surname": "Becker",
  "street": "Main Avenue 1",
  "zip": "12345",
  "city": "Fancy Town"
}
```

### Steps

1. **IsValidRequest?**: Validate the execution input.
2. **CreateOrder**: Take the execution input and create a new order. To keep the example simple, we can only buy one item per order.
3. **ReserveItem**: Decrease the number of items in stock.
4. **ProcessPayment**: Trigger a Lambda function to process the payment. For demonstration purposes, the Lambda function randomly throws errors to simulate failing third-party integrations.
5. **ConfirmOrder**: Change the status of the order to `PROCESSED`.
6. **RefundPayment**: Simple task to simulate refunding. There is no implementation in place to actually refund payments.
7. **CancelReservation**: Increase the number of items in stock.
8. **CancelOrder**: Change the status of the order to `CANCELLED`.
9. **EmitSuccessEvent**: Put an event to an event bus using AWS EventBridge.
10. **EmitFailureEvent**: Put an event to an event bus using AWS EventBridge.
11. **DoNothing**: Just stop the exution if the execution input is not valid.

## Usage

### Prerequisites

* Node.js v14
* AWS credentials in terminal

### Deploy stack

In order to deploy the example, you need to run the following command:

```sh
$ npm run deploy
```

⚠️ Make sure you have AWS credentials in place.

### Execution

Before we can run our first execution, we need to put some coffee beans in our stock. Go to the [AWS management console](https://console.aws.amazon.com/dynamodbv2), click on the storage table and create the following item:

```json
{
  "itemId": {
    "S": "coffee-beans"
  },
  "quantity": {
    "N": "5"
  }
}
```

Cool, now that we have something in our store, we can trigger an order. Take the endpoint from the deployment and run the following curl request:

```sh
curl -X POST https://XXXXXXXXXX.execute-api.eu-central-1.amazonaws.com/dev/order --data '{ "itemId": "coffee-beans", "quantity": 1, "firstname": "Laura", "surname": "Becker", "street": "Main Avenue 1", "zip": "12345", "city": "Fancy Town" }' -H 'Content-Type: application/json'
```

Play around with the quantity to see how the state machine behaves.

### Remove stack

In order to remove the example, you need to run the following command:

```sh
$ npm run remove
```

⚠️ Make sure you have AWS credentials in place.