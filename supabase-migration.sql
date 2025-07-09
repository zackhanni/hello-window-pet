-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  image TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pets table
CREATE TABLE IF NOT EXISTS pets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  species TEXT,
  age INTEGER,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_pets_user_id ON pets(user_id);
CREATE INDEX IF NOT EXISTS idx_pets_created_at ON pets(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (you can modify these based on your security needs)
CREATE POLICY "Allow public read access to users" ON users
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to pets" ON pets
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to users" ON users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert access to pets" ON pets
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to users" ON users
  FOR UPDATE USING (true);

CREATE POLICY "Allow public update access to pets" ON pets
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access to users" ON users
  FOR DELETE USING (true);

CREATE POLICY "Allow public delete access to pets" ON pets
  FOR DELETE USING (true); 