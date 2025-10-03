'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/utils/firebaseConfig';
import { doc, getDoc, updateDoc, DocumentData, Firestore, collection as firestoreCollection, query, where, getDocs } from 'firebase/firestore';

function collection(db: Firestore, collectionPath: string) {
    return firestoreCollection(db, collectionPath);
}

const ProfilePage = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userData, setUserData] = useState<DocumentData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        preferredJobTypes: [''],
        skills: [''],
    });

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        setUserEmail(email || '');

        if (email) {
            const fetchUserData = async () => {
                try {
                    const q = query(collection(db, 'signupSubmissions'), where('email', '==', email));
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        const userDoc = querySnapshot.docs[0];
                        const data = userDoc.data();
                        setUserData(data);
                        setFormData({
                            name: data.name || '',
                            phone: data.phone || '',
                            preferredJobTypes: data.preferredJobTypes || [''],
                            skills: data.skills || [''],
                        });
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };

            fetchUserData();
        }
    }, []);

    const handleUpdate = async () => {
        try {
            await updateDoc(doc(db, 'signupSubmissions', userEmail), formData);
            setUserData({ ...userData, ...formData });
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating user data:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    if (!userData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full border rounded p-2"
                            />
                        ) : (
                            <p className="text-gray-700">{userData.name}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full border rounded p-2"
                            />
                        ) : (
                            <p className="text-gray-700">{userData.phone}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Preferred Job Types</label>
                        {isEditing ? (
                            <textarea
                                value={formData.preferredJobTypes.join(', ')}
                                onChange={(e) => setFormData({ ...formData, preferredJobTypes: e.target.value.split(',').map(type => type.trim()) })}
                                className="w-full border rounded p-2"
                            />
                        ) : (
                            <p className="text-gray-700">{userData.preferredJobTypes?.join(', ')}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Skills</label>
                        {isEditing ? (
                            <textarea
                                value={formData.skills.join(', ')}
                                onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',').map(skill => skill.trim()) })}
                                className="w-full border rounded p-2"
                            />
                        ) : (
                            <p className="text-gray-700">{userData.skills?.join(', ')}</p>
                        )}
                    </div>
                </div>
                <div className="p-6">
                    {isEditing ? (
                        <button
                            onClick={handleUpdate}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Save Changes
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-gray-600 text-white rounded"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

