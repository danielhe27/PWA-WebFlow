import { openDB } from 'idb';

export const initdb = async () => {
  await openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

export const putDb = async (content) => { 
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  // Always save to the same record (id 1) so the store holds one document, not a new row per save.
  const request = store.put({ id: 1, content });
  const result = await request;
  console.log('putDb result', result);
  if (!result) {
    console.error('putDb failed');
    throw new Error('putDb failed');
  }
};

export const getDb = async () => {  
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // The editor needs text, so return the saved content (or undefined if nothing is saved yet).
  const result = await store.get(1);
  console.log('getDb result', result);
  return result?.content;
};

// Call initdb to ensure the database is initialized when the module is imported
initdb();
