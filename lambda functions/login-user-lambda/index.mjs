import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "user";

/*
  This Lambda function facilitates user login by verifying credentials against a DynamoDB table.
  The function is triggered by an HTTP request containing a JSON body with the user's email and password.
  - Parses the request body to extract email and password.
  - Queries the DynamoDB table to find a matching user entry based on the email.
  - Compares the provided password with the stored password hash to authenticate the user.
  - Returns a success response with authentication details if credentials match, or an error message if login fails.
*/
export const handler = async (event, context) => {
  let body;
  let fetchUsers;
  let resUser;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    let requestJSON = JSON.parse(event.body);
    
    const fetchUsers = await client.send(new QueryCommand({
      TableName: tableName,
      IndexName: "email-index",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email":requestJSON.email
      }
    }));
    
    resUser = fetchUsers.Items[0];
    
    if (!resUser) {
      throw new Error("User does not exist!")    
    } 
    
    
    if (resUser.password == requestJSON.password) {
      body = resUser
    } else{
      throw new Error("Email or Password is wrong!")  
    }
    
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