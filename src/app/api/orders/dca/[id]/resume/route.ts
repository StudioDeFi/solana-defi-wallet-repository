import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/middleware/auth';
import { prisma } from '@/lib/db';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = requireAuth(request);
    const orderId = params.id;

    const order = await prisma.dCAOrder.findFirst({
      where: {
        id: orderId,
        userId: user.userId,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    await prisma.dCAOrder.update({
      where: { id: orderId },
      data: { status: 'active' },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.error('Resume DCA order error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to resume order' },
      { status: 500 }
    );
  }
}

