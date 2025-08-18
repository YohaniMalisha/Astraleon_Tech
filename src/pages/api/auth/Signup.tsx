// import { hash } from 'bcryptjs';
// import { prisma } from '@/lib/prisma';
// import { sendVerificationEmail } from '@/lib/email';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).end();

//   const { email, password, name } = req.body;

//   // 1. Check if user exists
//   const exists = await prisma.user.findUnique({ where: { email } });
//   if (exists) return res.status(400).json({ error: 'User already exists' });

//   // 2. Create user
//   const user = await prisma.user.create({
//     data: {
//       email,
//       name,
//       password: await hash(password, 12),
//       emailVerified: null // Will be set after verification
//     }
//   });

//   // 3. Send verification email
//   await sendVerificationEmail(email);

//   return res.status(201).json({ user });
// }