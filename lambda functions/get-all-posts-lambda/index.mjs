import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "post";

/*
  This Lambda function retrieves all posts from a DynamoDB table.
  Triggered by an HTTP GET request, it scans the DynamoDB table to fetch all post entries.
  - Uses DynamoDB's DocumentClient to perform a scan operation on the posts table.
  - Efficiently handles the scan results and checks for errors during the fetch operation.
  - Returns a JSON response with all the posts if successful, or an error message if the operation fails.
*/
export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    body = await dynamo.send(
        new ScanCommand({ TableName: tableName })
      );
    
    body = body.Items;
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