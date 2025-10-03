'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Ban, CircleCheck as CheckCircle } from 'lucide-react';
import { User } from '@/lib/types';
import { toast } from 'react-hot-toast';

interface UserManagementProps {
  users: User[];
  onBlockUser: (userId: string) => Promise<void>;
  onUnblockUser: (userId: string) => Promise<void>;
}

export function UserManagement({ users, onBlockUser, onUnblockUser }: UserManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBlockUser = async (userId: string) => {
    try {
      await onBlockUser(userId);
      toast.success('User blocked successfully');
    } catch (error) {
      toast.error('Failed to block user');
    }
  };

  const handleUnblockUser = async (userId: string) => {
    try {
      await onUnblockUser(userId);
      toast.success('User unblocked successfully');
    } catch (error) {
      toast.error('Failed to unblock user');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">User Management</h2>
        <p className="text-gray-600">Manage registered users and their access</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Badge variant="outline">
          {filteredUsers.length} users found
        </Badge>
      </div>

      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {user.firstName} {user.lastName}
                    {user.isBlocked ? (
                      <Badge variant="destructive">Blocked</Badge>
                    ) : (
                      <Badge variant="secondary">Active</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
                <div className="flex gap-2">
                  {user.isBlocked ? (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleUnblockUser(user.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Unblock
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => handleBlockUser(user.id)}
                    >
                      <Ban className="h-4 w-4 mr-2" />
                      Block
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Location:</span> {user.location}
                </div>
                <div>
                  <span className="font-medium">Experience:</span> {user.experience}
                </div>
                <div>
                  {/* <span className="font-medium">Credits:</span> {user.credits} */}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div>
                  <span className="font-medium text-sm">Skills:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-sm">Preferred Job Types:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.preferredJobTypes.map((type, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}