import { Client, Account, Databases } from 'appwrite';

const client = new Client();

// TODO: Set these in your .env file and load with process.env
const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'http://localhost/v1';
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'your_project_id';
const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY || 'your_api_key';

client
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

export const appwrite = client;
export const account = new Account(client);
export const databases = new Databases(client);
export const APPWRITE_API_KEY = APPWRITE_API_KEY; 