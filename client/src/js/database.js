import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT in the Database');
  const jateDB = await openDB('text', 1);
  const tx = jateDB.transaction('text', 'readwrite');
  const store = tx.objectStore('text');
  const request = store.put({text: content});
  const result = await request;
  console.log('data saved', result); 
 
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
console.log("GET data from jateDB");
const jateDB = await openDB('jateDB', 1);
const tx = jateDB.transaction('jateDB', 'readonly');
const store = tx.objectStore('jateDB');
const request = store.getAll();
const result = await request;

console.log('result.value', result);

};

initdb();
