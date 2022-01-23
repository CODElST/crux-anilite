import { db } from "..";

export async function bulkAddCharacters(data) {
  try {
    await db.character.bulkAdd(data);
  } catch (error) {
    console.log(error);
  }
}
