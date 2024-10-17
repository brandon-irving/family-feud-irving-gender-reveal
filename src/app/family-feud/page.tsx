import FamilyFeudGameBoard from '@/components/FamilyFeudGameBoard';
import { Suspense } from 'react';

export default function FamilyFeud() {
  return (
    <Suspense fallback={null}>
      <FamilyFeudGameBoard />
    </Suspense>
  );
}
