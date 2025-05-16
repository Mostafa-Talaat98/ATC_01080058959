
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateEventImagePlaceholder(): string {
  const placeholders = [
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678',
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4',
    'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    'https://images.unsplash.com/photo-1555244162-803834f70033'
  ];
  return `${placeholders[Math.floor(Math.random() * placeholders.length)]}?q=80&w=600&auto=format&fit=crop`;
}
