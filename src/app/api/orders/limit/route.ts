import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/middleware/auth';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const user = requireAuth(request);
    
    const orders = await prisma.limitOrder.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(orders);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.error('Limit order error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get limit orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request);
    const body = await request.json();
    const { tokenIn, tokenOut, amountIn, price, orderType, expiresAt } = body;

    if (!tokenIn || !tokenOut || !amountIn || !price || !orderType) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const order = await prisma.limitOrder.create({
      data: {
        userId: user.userId,
        tokenIn,
        tokenOut,
        amountIn,
        price,
        orderType,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    return NextResponse.json(order);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.error('Create limit order error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create limit order' },
      { status: 500 }
    );
  }
}

