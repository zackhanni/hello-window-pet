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
  createdAt?: string;
  pets?: Pet[];
}

interface Pet {
  id: string;
  userId: string;
  name: string;
  description?: string;
  species?: string;
  age?: number;
  imageUrl?: string;
  createdAt: string;
}
