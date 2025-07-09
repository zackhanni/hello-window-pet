-- Seed data for users and pets
-- This matches the data from your Prisma seed.ts file

-- Insert users
INSERT INTO users (email, name, city) VALUES
  ('zack.hanni@gmail.com', 'Zack Hanni', 'Philadelphia'),
  ('stein.emilyj@gmail.com', 'Emily Hanni', 'Miami')
ON CONFLICT (email) DO NOTHING;

-- Insert pets (get the user IDs first)
INSERT INTO pets (user_id, name, description, species, age, image_url) 
SELECT 
  u.id,
  'Buddy',
  'Buddy loved to sit by the window and sun his pooch',
  'cat',
  12,
  '/cats/001/buddy.jpg'
FROM users u 
WHERE u.email = 'zack.hanni@gmail.com'
ON CONFLICT DO NOTHING;

INSERT INTO pets (user_id, name, description, species, age, image_url) 
SELECT 
  u.id,
  'Gibby',
  'She loves attention and the occasional play bite. She may look angry, but shes usually pretty sweet.',
  'cat',
  6,
  '/cats/001/buddy2.jpg'
FROM users u 
WHERE u.email = 'stein.emilyj@gmail.com'
ON CONFLICT DO NOTHING; 