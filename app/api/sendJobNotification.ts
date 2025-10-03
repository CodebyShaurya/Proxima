import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebaseConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { job } = req.body;

  if (!job) {
    return res.status(400).json({ error: 'Job data is required' });
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

    // Fixed implicit 'any' types for 'skill' and 'req'
    const matchingUsers = users.filter(user =>
      user.skills.some((skill: string) =>
        job.requirements.some((req: string) => req.toLowerCase() === skill.toLowerCase())
      )
    );

    if (matchingUsers.length === 0) {
      return res.status(200).json({ message: 'No matching users found for the job.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    for (const user of matchingUsers) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `New Job Opportunity: ${job.title}`,
        text: `Hi ${user.firstName},\n\nWe found a new job that matches your skills:\n\nTitle: ${job.title}\nCompany: ${job.company}\nLocation: ${job.location}\nDescription: ${job.description}\n\nApply here: ${job.applyLink}\n\nBest regards,\nProxima Team`,
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({ message: 'Job notifications sent successfully!' });
  } catch (error) {
    console.error('Error sending job notifications:', error);
    res.status(500).json({ error: 'Failed to send job notifications' });
  }
}