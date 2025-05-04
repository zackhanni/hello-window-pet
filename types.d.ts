interface SessionUser {
  email: string;
  name: string;
  image?: string;
}

interface DatabaseUser {
  id: string;
  email: string;
  name?: string;
  image?: string;
  city?: string;
  pets: Pet[];
}

interface Pet {
  id: string;
  name: string;
  description: string;
  species: string;
  age: number;
  imageUrl: string;
}
