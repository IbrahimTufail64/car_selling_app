

// db.ts
import Dexie, { type EntityTable } from 'dexie';

interface Image {
  id: number;
  name: string;
  data: any
}

interface AppContext {
  id: number;
  name: string;
  state: boolean
}

const db = new Dexie('imagesDatabase') as Dexie & {
  images: EntityTable<
    Image,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  images: '++id, name, data' // primary key "id" (for the runtime!)
});

// for context: 
const db2 = new Dexie('contextDatabase') as Dexie & {
  context: EntityTable<
    AppContext,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db2.version(1).stores({
  context: '++id, name, state' // primary key "id" (for the runtime!)
});

export type { Image ,AppContext};
export { db,db2 };