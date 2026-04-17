'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/feed');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black94-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black94-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black94-bg text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black94-primary/10 via-transparent to-black94-secondary/10" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          {/* Logo */}
          <div className="mb-8 inline-block">
            <div className="text-5xl font-black tracking-tight">
              <span className="text-black94-primary">Black</span>
              <span className="text-white">94</span>
            </div>
            <div className="text-black94-muted text-sm mt-1 tracking-widest uppercase">Connect. Create. Earn.</div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            The Social Platform
            <br />
            <span className="text-black94-primary">Built for Privacy</span>
            <br />
            & Growth
          </h1>

          <p className="text-black94-muted text-lg md:text-xl max-w-2xl mx-auto mb-10">
            E2EE messaging, creator monetization, AI-powered business CRM,
            and affordable advertising — all in one platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="b94-btn-primary text-center">
              Get Started Free
            </Link>
            <Link href="/auth/login" className="b94-btn-secondary text-center">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="b94-card p-6 hover:border-black94-primary/50 transition-colors">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-black94-muted text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Preview */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
        <p className="text-black94-muted text-center mb-12">Start free, upgrade when you grow</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`b94-card p-6 ${
                plan.featured ? 'border-black94-primary ring-1 ring-black94-primary' : ''
              }`}
            >
              {plan.featured && (
                <div className="text-xs text-black94-primary font-semibold uppercase tracking-wider mb-3">Most Popular</div>
              )}
              <div className="text-xl font-bold mb-1">{plan.name}</div>
              <div className="text-3xl font-black mb-4">
                {plan.price === 0 ? 'Free' : `\u20B9${plan.price}`}
                {plan.price > 0 && <span className="text-base font-normal text-black94-muted">/mo</span>}
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm text-black94-muted flex items-center gap-2">
                    <span className="text-green-500">\u2713</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/signup" className={plan.featured ? 'b94-btn-primary block text-center' : 'b94-btn-secondary block text-center'}>
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-black94-border py-8 text-center text-black94-muted text-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="font-bold text-white mb-2">
            <span className="text-black94-primary">Black</span>94
          </div>
          <p>&copy; 2024 Black94. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

const FEATURES = [
  {
    icon: '\uD83D\uDD10',
    title: 'End-to-End Encryption',
    description: 'All messages are encrypted on your device. Not even we can read them.',
  },
  {
    icon: '\uD83D\uDCA3',
    title: 'Nuclear Block',
    description: 'Permanently erase entire conversations including media from both sides.',
  },
  {
    icon: '\uD83D\uDCB0',
    title: 'Paid Chat',
    description: 'Creators can charge per message or session. Start earning from your conversations.',
  },
  {
    icon: '\uD83E\uDD16',
    title: 'AI Business CRM',
    description: 'AI captures leads, replies to customers, sends follow-ups, and closes deals automatically.',
  },
  {
    icon: '\uD83D\uDD2D',
    title: 'Hybrid Search',
    description: 'Search users, posts, and the live web — all with AI fact-checking built in.',
  },
  {
    icon: '\uD83C\uDFAF',
    title: 'Affordable Ads',
    description: 'Run targeted ads at a fraction of competitor prices. Built for Indian businesses.',
  },
];

const PLANS = [
  {
    name: 'Free',
    price: 0,
    featured: false,
    features: ['Basic chat', 'Public profile', 'Post & articles', 'Standard search'],
  },
  {
    name: 'Premium',
    price: 449,
    featured: true,
    features: ['Blue tick \u2714\uFE0F', 'Paid chat', 'Advanced privacy', 'Priority support', 'All Free features'],
  },
  {
    name: 'Business',
    price: 1599,
    featured: false,
    features: ['Gold tick \uD83D\uDFE1', 'AI CRM dashboard', 'Affiliate badges', 'Ad creation', 'Analytics', 'All Premium features'],
  },
];
