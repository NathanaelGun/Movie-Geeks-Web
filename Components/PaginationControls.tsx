"use client";

import { useRouter, useSearchParams } from 'next/navigation';

type PaginationControlsProps = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

const PaginationControls: React.FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const search = searchParams.get('search') ?? '';

  const handlePrev = () => {
    router.push(`/movies?search=${search}&page=${Number(page) - 1}`);
  };

  const handleNext = () => {
    router.push(`/movies?search=${search}&page=${Number(page) + 1}`);
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        disabled={!hasPrevPage}
        onClick={handlePrev}
        className="px-6 py-2 font-semibold text-white bg-red-600 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-red-700"
      >
        Previous
      </button>

      <div className="text-lg font-medium">
        Page {page}
      </div>

      <button
        disabled={!hasNextPage}
        onClick={handleNext}
        className="px-6 py-2 font-semibold text-white bg-red-600 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-red-700"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;