// db.ts
import Dexie, { type EntityTable } from 'dexie';

interface Image {
  id: number;
  name: string;
  data: any;
}

interface WheelCondition {
  id: number;
  front_driver: boolean;
  back_driver: boolean;
  front_passenger: boolean;
  back_passenger: boolean;
}

// Create a single Dexie instance and define both stores
const db = new Dexie('combinedDatabase') as Dexie & {
  images: EntityTable<Image, 'id'>;
  wheel_condition: EntityTable<WheelCondition, 'id'>;
};

// Schema declaration for both stores
db.version(1).stores({
  images: '++id, name, data',
  wheel_condition: '++id, front_driver, back_driver, front_passenger, back_passenger',
});

// Export the types and the database instance
export type { Image };
export type { WheelCondition };
export { db };