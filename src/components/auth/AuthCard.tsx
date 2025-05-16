
import React, { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  title,
  description,
  children,
  footer
}) => {
  return (
    <div className="flex min-h-[calc(100vh-64px-180px)] items-center justify-center py-12">
      <Card className="mx-auto w-full max-w-md animate-scale-in">
        <CardHeader>
          <CardTitle className="text-center text-2xl">{title}</CardTitle>
          <CardDescription className="text-center">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        {footer && (
          <CardFooter>
            {footer}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};
