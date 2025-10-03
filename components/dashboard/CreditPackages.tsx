'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Star, Zap } from 'lucide-react';
import { CreditPackage } from '@/lib/types';
import { toast } from 'react-hot-toast';

const creditPackages: CreditPackage[] = [
  {
    id: '1',
    name: 'Starter Pack',
    credits: 10,
    price: 9.99,
    description: 'Perfect for casual job searching'
  },
  {
    id: '2',
    name: 'Professional Pack',
    credits: 25,
    price: 19.99,
    description: 'Best for active job seekers'
  },
  {
    id: '3',
    name: 'Premium Pack',
    credits: 50,
    price: 34.99,
    description: 'Maximum applications with bonus credits'
  }
];

interface CreditPackagesProps {
  onPurchase: (packageId: string) => Promise<void>;
}

export function CreditPackages({ onPurchase }: CreditPackagesProps) {
  const handlePurchase = async (packageId: string) => {
    try {
      await onPurchase(packageId);
      toast.success('Credits purchased successfully!');
    } catch (error) {
      toast.error('Purchase failed. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Credit Package</h2>
        <p className="text-gray-600">Apply for your dream jobs with our flexible credit system</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {creditPackages.map((pkg, index) => (
          <Card key={pkg.id} className={`relative hover:shadow-lg transition-all duration-300 ${index === 1 ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
            {index === 1 && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-3 py-1">
                  <Star className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className={`mx-auto p-3 rounded-full w-fit ${index === 0 ? 'bg-green-100' : index === 1 ? 'bg-blue-100' : 'bg-purple-100'}`}>
                {index === 0 ? (
                  <CreditCard className="h-6 w-6 text-green-600" />
                ) : index === 1 ? (
                  <Star className="h-6 w-6 text-blue-600" />
                ) : (
                  <Zap className="h-6 w-6 text-purple-600" />
                )}
              </div>
              <CardTitle className="text-xl font-bold">{pkg.name}</CardTitle>
              <CardDescription>{pkg.description}</CardDescription>
            </CardHeader>

            <CardContent className="text-center pb-4">
              <div className="space-y-4">
                <div>
                  <span className="text-3xl font-bold text-gray-900">${pkg.price}</span>
                </div>
                <div className="text-lg font-semibold text-blue-600">
                  {pkg.credits} Credits
                </div>
                <div className="text-sm text-gray-500">
                  ${(pkg.price / pkg.credits).toFixed(2)} per application
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button 
                onClick={() => handlePurchase(pkg.id)}
                className={`w-full ${index === 1 ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                variant={index === 1 ? 'default' : 'outline'}
              >
                Purchase Credits
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}