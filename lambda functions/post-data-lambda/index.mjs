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
  This Lambda function stores post data, including a pre-defined S3 image URL, in an AWS DynamoDB table.
  It is triggered by an HTTP request containing post data such as title, description, and a direct S3 image URL.
  - Parses the incoming request to extract the title, description, and the image URL (already stored in S3).
  - Constructs parameters for the DynamoDB 'put' operation, specifying the table name and the item data.
  - Uses DynamoDB's DocumentClient to insert the new post entry, including the image URL, into the table.
  - Returns a success response confirming the entry or an error message if the operation fails.
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
            title: requestJSON.title,
            description: requestJSON.description,
            userid: requestJSON.userid,
            imageurl: requestJSON.imageurl
          },
        })
      );
      
    body = `Put post ${requestJSON.id}`;
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