'use client';

import { useAuth } from '@/hooks/useAuth';
import { Navigation } from '@/components/layout/Navigation';
import { CreditPackages } from '@/components/dashboard/CreditPackages';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, History, Zap } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

function CreditsPage() {
  const { user, loading, updateUserData } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      redirect('/');
    }
  }, [user, loading]);

  const handlePurchaseCredits = async (packageId: string) => {
    if (!user) return;

    // In production, this would integrate with a payment processor
    const creditPackages = {
      '1': { credits: 10, price: 9.99 },
      '2': { credits: 25, price: 19.99 },
      '3': { credits: 50, price: 34.99 },
    };

    const selectedPackage = creditPackages[packageId as keyof typeof creditPackages];
    if (selectedPackage) {
      try {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        await updateUserData({ 
          credits: user.credits + selectedPackage.credits 
        });
        
        toast.success(`Successfully purchased ${selectedPackage.credits} credits!`);
      } catch (error) {
        throw error;
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Credits & Billing</h1>
          <p className="text-gray-600 mt-2">
            Manage your application credits and purchase new packages.
          </p>
        </div>

        {/* Current Credits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Current Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{user.credits}</div>
              <p className="text-blue-100">Available Credits</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <CreditCard className="h-5 w-5" />
                Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">5</div>
              <p className="text-gray-600">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <History className="h-5 w-5" />
                Success Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">67%</div>
              <p className="text-gray-600">Interview rate</p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How Credits Work</CardTitle>
            <CardDescription>
              Our credit system makes job applications simple and fair
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">1 Credit = 1 Application</h3>
                <p className="text-sm text-gray-600">
                  Each job application costs exactly one credit. No hidden fees.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">AI</span>
                </div>
                <h3 className="font-semibold mb-2">AI Recommendations</h3>
                <p className="text-sm text-gray-600">
                  Get personalized job matches based on your profile and preferences.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">📧</span>
                </div>
                <h3 className="font-semibold mb-2">Instant Notifications</h3>
                <p className="text-sm text-gray-600">
                  Get notified when new jobs matching your profile are posted.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credit Packages */}
        <CreditPackages onPurchase={handlePurchaseCredits} />
      </main>
    </div>
  );
}

export default function Credits() {
  return <CreditsPage />;
}