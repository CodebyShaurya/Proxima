import { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebaseConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { requiredSkills } = req.body;

  if (!requiredSkills || !Array.isArray(requiredSkills)) {
    return res.status(400).json({ error: 'Invalid input. An array of required skills is expected.' });
  }

  try {
    const usersSnapshot = await getDocs(collection(db, 'signupSubmissions'));
    const users = usersSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        email: data.email || '',
        firstName: data.firstName || '',
        skills: data.skills || [],
      };
    });

    const matchingUsers = users.filter(user =>
      user.skills.filter((skill: string) => requiredSkills.includes(skill.toLowerCase())).length >= 2
    );

    res.status(200).json(matchingUsers);
  } catch (error) {
    console.error('Error fetching users with matching skills:', error);
    res.status(500).json({ error: 'Failed to fetch users with matching skills' });
  }
}