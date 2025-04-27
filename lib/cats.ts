// lib/cats.ts

export const cats = [
  {
    id: "001",
    name: "Buddy",
    city: "philadelphia",
    photoUrl: "/cats/buddy.jpg",
    seenCount: 1,
  },
  {
    id: "002",
    name: "Gibby",
    city: "Philadelphia",
    photoUrl: "",
    seenCount: 0,
  },
];

export function getCatById(id: string) {
  return cats.find((cat) => cat.id === id);
}

export function getAllCats() {
  return cats;
}
