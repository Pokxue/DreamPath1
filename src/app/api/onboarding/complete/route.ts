import { NextRequest, NextResponse } from 'next/server';
import { getUserById, saveUserSelections } from '@/lib/database';
import type { TierId } from '@/types/career';

const educationIds = new Set<TierId>(['moonrise', 'starlight', 'nebula', 'galaxy']);
const careerIds = new Set(['future-doctor', 'software-engineer', 'junior-lawyer']);

export async function POST(request: NextRequest) {
  const sessionCookie = request.cookies.get('dreampath-auth')?.value;
  const userId = Number(sessionCookie);
  if (!sessionCookie || !Number.isSafeInteger(userId) || userId <= 0) {
    return NextResponse.json({ error: 'Please sign in to continue.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const educationTier = typeof body?.educationTier === 'string' ? body.educationTier : '';
    const dreamJobId = typeof body?.dreamJobId === 'string' ? body.dreamJobId : '';
    if (!educationIds.has(educationTier as TierId) || !careerIds.has(dreamJobId)) {
      return NextResponse.json({ error: 'Choose a valid education level and career.' }, { status: 400 });
    }

    if (!getUserById(userId)) {
      return NextResponse.json({ error: 'Your session has expired. Please sign in again.' }, { status: 401 });
    }

    const user = saveUserSelections(userId, educationTier, dreamJobId);
    if (!user) return NextResponse.json({ error: 'Unable to save your choices.' }, { status: 500 });
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Onboarding completion error:', error);
    return NextResponse.json({ error: 'Unable to save your choices.' }, { status: 500 });
  }
}
