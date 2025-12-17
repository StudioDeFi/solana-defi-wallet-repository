/**
 * Health Check API Endpoint
 * 
 * Provides health status for the application and database connection.
 * Used by Docker healthchecks and load balancers.
 * 
 * @route GET /api/health
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
  checks: {
    app: CheckResult;
    database?: CheckResult;
  };
}

interface CheckResult {
  status: 'pass' | 'fail' | 'warn';
  message?: string;
  latency?: number;
}

// Track server start time for uptime calculation
const startTime = Date.now();

// Version from package.json (fallback if env not set)
const APP_VERSION = '1.0.0';

/**
 * Check database connectivity
 */
async function checkDatabase(): Promise<CheckResult> {
  const start = Date.now();
  
  try {
    // Simple query to verify connection
    await prisma.$queryRaw`SELECT 1`;
    
    return {
      status: 'pass',
      message: 'Database connection successful',
      latency: Date.now() - start,
    };
  } catch (error) {
    return {
      status: 'fail',
      message: error instanceof Error ? error.message : 'Database connection failed',
      latency: Date.now() - start,
    };
  }
}

/**
 * GET /api/health
 * 
 * Returns the health status of the application
 */
export async function GET() {
  const timestamp = new Date().toISOString();
  const uptime = Math.floor((Date.now() - startTime) / 1000);
  
  // App is always healthy if this endpoint responds
  const appCheck: CheckResult = {
    status: 'pass',
    message: 'Application is running',
  };
  
  // Check database (optional - don't fail health if DB check fails in some environments)
  let dbCheck: CheckResult | undefined;
  let overallStatus: HealthStatus['status'] = 'healthy';
  
  try {
    // Only check database if DATABASE_URL is configured
    if (process.env.DATABASE_URL) {
      dbCheck = await checkDatabase();
      
      if (dbCheck.status === 'fail') {
        overallStatus = 'degraded';
      }
    }
  } catch {
    // If database check throws, mark as degraded but don't fail
    dbCheck = {
      status: 'warn',
      message: 'Database check skipped',
    };
  }
  
  const healthStatus: HealthStatus = {
    status: overallStatus,
    timestamp,
    uptime,
    version: process.env.APP_VERSION || APP_VERSION,
    environment: process.env.NODE_ENV || 'development',
    checks: {
      app: appCheck,
      ...(dbCheck && { database: dbCheck }),
    },
  };
  
  // Return appropriate status code (503 for degraded to signal issues to health check systems)
  const statusCode = overallStatus === 'healthy' ? 200 : 503;
  
  return NextResponse.json(healthStatus, { status: statusCode });
}

/**
 * HEAD /api/health
 * 
 * Simple health check for load balancers (just returns 200)
 */
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
