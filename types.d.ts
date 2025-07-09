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
  created_at?: string;
  pets?: Pet[];
}

interface Pet {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  species?: string;
  age?: number;
  image_url?: string;
  created_at: string;
}
