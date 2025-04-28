import imagekit from "./imagekit";

export const cats = [
  {
    id: "001",
    name: "Buddy",
    description: "Buddy loved to sit by the window and sun his pooch",
    city: "Philadelphia",
    photoUrl: "/cats/001/buddy.jpg",
    species: "cat",
  },
  {
    id: "002",
    name: "Gibby",
    description:
      "She loves attention and the occasional play bite. She may look angry, but shes usually pretty sweet.",
    city: "Philadelphia",
    photoUrl: "/cats/001/buddy2.jpg",
    species: "cat",
  },
];

export function getCatById(id: string) {
  return cats.find((cat) => cat.id === id);
}

export function getAllCats() {
  return cats;
}

function convertFromZuluTime(zuluString: string) {
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
