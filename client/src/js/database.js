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
  const request = store.put({ content });
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
  const request = store.getAll();
  const result = await request;
  console.log('getDb result', result);
  if (!result) {
    console.error('getDb failed');
    throw new Error('getDb failed');
  }
  return result;
};

// Call initdb to ensure the database is initialized when the module is imported
initdb();
