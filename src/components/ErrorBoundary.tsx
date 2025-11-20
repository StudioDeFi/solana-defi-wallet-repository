'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { GlowCard } from './ui/GlowCard';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4" role="alert">
          <GlowCard className="max-w-md w-full">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-text">Something went wrong</h2>
              <p className="text-text-secondary">{this.state.error.message}</p>
              <button
                onClick={this.resetErrorBoundary}
                className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
                aria-label="Retry"
              >
                Try again
              </button>
            </div>
          </GlowCard>
        </div>
      );
    }

    return this.props.children;
  }
}

