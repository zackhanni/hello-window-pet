import imagekit from "./imagekit";

export const cats = [
  {
    id: "001",
    name: "Buddy",
    city: "philadelphia",
    photoUrl: "/cats/001/buddy.jpg",
    seenCount: 1,
  },
  {
    id: "002",
    name: "Gibby",
    city: "Philadelphia",
    photoUrl: "/cats/002/gibby.jpg",
    seenCount: 0,
  },
];

export function getCatById(id: string) {
  return cats.find((cat) => cat.id === id);
}

export function getAllCats() {
  return cats;
}

function convertFromZuluTime(zuluString) {
  return new Date(zuluString);
}

export const getCatPhotos = async (catId: string) => {
  try {
    const result = await imagekit.listFiles({
      path: `cats/${catId}`,
    });

    // console.log(JSON.stringify(result));

    return result.map((file) => {
      // limit to only 10 images

      // sort images by date. newest first

      return {
        filePath: file.filePath,
        fileId: file.fileId,
        name: file.name,
        createdAt: convertFromZuluTime(file.createdAt).toString(),
      };
    });
  } catch (error) {
    console.error("Failed to fetch cat photos", error);
    return [];
  }
};
