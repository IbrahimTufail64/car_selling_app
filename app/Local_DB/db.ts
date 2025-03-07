import Dexie, { type EntityTable } from 'dexie';

interface Image {
  id: number;
  name?: string;
  data?: any;
  car_number?: string;
  dynamic_image_number?: number;
  condition?: boolean;
}

interface WheelCondition {
  id: number;
  front_driver: boolean;
  back_driver: boolean;
  front_passenger: boolean;
  back_passenger: boolean;
}

interface DamageSelection {
  id?: number;
  name: string;
  dynamic_image_no: number;
  url: any;
  car_no: string;
  coordinates?: { x: number; y: number };
  size: string;
  side: string;
}

interface Technicals {
  id: number;
  state: boolean;
  details: string;
}

// Create a single Dexie instance and define stores
const db = new Dexie('combinedDatabase') as Dexie & {
  images: EntityTable<Image, 'id'>;
  wheel_condition: EntityTable<WheelCondition, 'id'>;
  damage_selection: EntityTable<DamageSelection, 'id'>;
};

// Schema declaration for all stores
db.version(2).stores({
  images: '++id, name, data, condition, dynamic_image_number, car_number',
  wheel_condition: '++id, front_driver, back_driver, front_passenger, back_passenger',
  damage_selection: '++id, coordinates, size, url, side, car_no, name, dynamic_image_no',
});

// Export the types and the database instance
export type { Image, WheelCondition, DamageSelection };
export { db };
