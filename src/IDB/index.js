import Dexie from "dexie";

export const db = new Dexie("AniliteDatabase");
db.version(1).stores({
  anime: "++id, &slug, name_en,name_jp,started,rating, *genres, type", // Primary key and indexed props
  character: "++id, &slug, name",
  genre: "++id,&slug, name",
});
