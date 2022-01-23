import { db } from "..";

export async function bulkAddGenres(data) {
  try {
    await db.genre.bulkAdd(data);
  } catch (error) {
    console.log(error);
  }
}
