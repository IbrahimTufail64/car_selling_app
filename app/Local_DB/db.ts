

// db.ts
import Dexie, { type EntityTable } from 'dexie';

interface Image {
  id: number;
  name: string;
  data: any
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

export type { Image };
export { db };