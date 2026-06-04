import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <nav
      aria-label="Property listing pagination"
      className="flex items-center justify-center gap-2 mt-12"
    >
      {/* Previous */}
      {prevPage ? (
        <Link
          href={`/?page=${prevPage}`}
          className="flex items-center gap-1 px-4 py-2 rounded-lg border border-nordic-dark/10 text-nordic-muted hover:text-mosque hover:border-mosque/50 text-sm font-medium transition-all hover:shadow-sm"
        >
          <span className="material-icons text-base">arrow_back</span>
          Prev
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 rounded-lg border border-nordic-dark/5 text-nordic-dark/20 text-sm font-medium cursor-not-allowed">
          <span className="material-icons text-base">arrow_back</span>
          Prev
        </span>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page) => {
          const isActive = page === currentPage;
          return isActive ? (
            <span
              key={page}
              aria-current="page"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-mosque text-white text-sm font-semibold shadow-sm shadow-mosque/30"
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={`/?page=${page}`}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-nordic-dark/10 text-nordic-muted hover:text-mosque hover:border-mosque/50 text-sm font-medium transition-all hover:shadow-sm"
            >
              {page}
            </Link>
          );
        })}
      </div>

      {/* Next */}
      {nextPage ? (
        <Link
          href={`/?page=${nextPage}`}
          className="flex items-center gap-1 px-4 py-2 rounded-lg border border-nordic-dark/10 text-nordic-muted hover:text-mosque hover:border-mosque/50 text-sm font-medium transition-all hover:shadow-sm"
        >
          Next
          <span className="material-icons text-base">arrow_forward</span>
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 rounded-lg border border-nordic-dark/5 text-nordic-dark/20 text-sm font-medium cursor-not-allowed">
          Next
          <span className="material-icons text-base">arrow_forward</span>
        </span>
      )}
    </nav>
  );
}
