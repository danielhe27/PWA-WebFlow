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
const db = await openDB('jate', 1);
 const tx = db.transaction('jate','readwrite');
 const store = tx.objectStore('jate');
 const request = store.put({ content });
 const result = await request;
 console.log('putDb result', result);
console.error('putDb not implemented');
};


export const getDb = async () => {  
const db = await openDB('jate', 1);

const tx = db.transaction('jate','readonly');

const store = tx.objectStore('jate');

const request = store.getAll();

const result= await request;
console.log('getDb result', result);
return result;

console.error('getDb not implemented');
};

initdb();
