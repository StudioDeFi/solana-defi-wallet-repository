import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/middleware/auth';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const user = requireAuth(request);
    
    const orders = await prisma.dCAOrder.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(orders);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.error('DCA order error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get DCA orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request);
    const body = await request.json();
    const { tokenIn, tokenOut, amountPerInterval, interval, totalAmount } = body;

    if (!tokenIn || !tokenOut || !amountPerInterval || !interval || !totalAmount) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Calculate next execution time
    const now = new Date();
    let nextExecution = new Date();
    
    switch (interval) {
      case 'hourly':
        nextExecution.setHours(now.getHours() + 1);
        break;
      case 'daily':
        nextExecution.setDate(now.getDate() + 1);
        break;
      case 'weekly':
        nextExecution.setDate(now.getDate() + 7);
        break;
    }

    const order = await prisma.dCAOrder.create({
      data: {
        userId: user.userId,
        tokenIn,
        tokenOut,
        amountPerInterval,
        interval,
        totalAmount,
        nextExecution,
      },
    });

    return NextResponse.json(order);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.error('Create DCA order error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create DCA order' },
      { status: 500 }
    );
  }
}

