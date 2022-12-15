import { openDB } from 'idb';

// Function to start up database
const initdb = async () =>
  openDB('jate', 1, {
    // Sets up the db schema if not already defined
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Set keyPath to id and auto-increments the key
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('Put to the db');
  
  // Create a connection to the database database and version we want to use.
  const todosDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = todosDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .add() method on the store and pass in the content.
  const request = store.add({ data: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
  
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  const todosDb = await openDB('jate', 1);
  const tx = todosDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();
