import { db } from "..";

export async function bulkAddAnime(data) {
  try {
    await db.anime.bulkAdd(data);
  } catch (error) {
    console.log(error);
  }
}

export async function getAnimeByGenre(genre) {
  const data = await db.anime
    .orderBy("name_jp")
    .filter(({ num_of_eps }) => num_of_eps === 1)
    .toArray();
  data?.map((item) => console.log(item));
}
