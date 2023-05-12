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

export const putDb = async (content) => {
  // opens the indexDB called jate, at version 1
  const jateDb = await openDB('jate', 1);
  // uses the jate database, and is using a readwrite operation to allow us to update the database
  const tx = jateDb.transaction('jate', 'readwrite');
  // performs the readwrite functionality
  const store = tx.objectStore('jate');
  // updates the database where the id is 1, and updates the content in the db with the content on the editor
  const request = store.put({ id: 1, content: content });
  // This is for the console log to show what was updated.
  const result = await request;
  console.log('Database has been updated', result)
};

export const getDb = async () => {
  // opens the indexDB called jate, at version 1
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(0);
  const result = await request;
  return result;
};

initdb();
