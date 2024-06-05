import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "user";

/*
  This Lambda function handles user registration by inserting user data into an AWS DynamoDB table.
  The function is triggered by an HTTP request with a JSON body containing the name, password, and email of the user.
  Registers a new user by storing their details in a DynamoDB table.
 - Parses the request body to extract user details.
 - Uses DynamoDB's DocumentClient to insert the user's data into the specified table.
 - Returns a success response upon successful insertion or an error message on failure.
*/
export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    let requestJSON = JSON.parse(event.body);
      await dynamo.send(
        new PutCommand({
          TableName: tableName,
          Item: {
            id: requestJSON.id,
            name: requestJSON.name,
            email: requestJSON.email,
            password: requestJSON.password,
          },
        })
      );
    body = `Put user ${requestJSON.id}`;
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};