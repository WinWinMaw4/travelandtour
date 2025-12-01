import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    // Determine whiwch page numbers to show (e.g., current, prev, next, first, last)
    const pageNumbers: (number | '...')[] = [];

    // Always include the first page
    if (totalPages > 0) pageNumbers.push(1);

    // Add '...' if the current page is far from the start
    if (currentPage > 3) {
        pageNumbers.push('...');
    }

    // Add the pages around the current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        // Avoid adding the first page again
        if (i !== 1) {
            pageNumbers.push(i);
        }
    }

    // Add '...' if the current page is far from the end
    if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
    }

    // Always include the last page (if it's not the first page)
    if (totalPages > 1 && !pageNumbers.includes(totalPages)) {
        // If '...' was the last push, check if totalPages is adjacent to the last number
        if (pageNumbers[pageNumbers.length - 1] === '...' && totalPages - 1 === (pageNumbers[pageNumbers.length - 2] as number)) {
            pageNumbers.pop(); // Remove '...' if totalPages is adjacent
        }
        pageNumbers.push(totalPages);
    }

    // Filter out duplicates (can happen when totalPages is small)
    const uniquePageNumbers = pageNumbers.filter((value, index, self) => {
        if (value === '...') {
            // Keep only the first occurrence of '...' if it is followed by a non-adjacent number
            return self.indexOf(value) === index;
        }
        return self.indexOf(value) === index;
    });

    return (
        <div className="flex justify-center space-x-2 mt-10">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${currentPage === 1
                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                    : 'text-primary-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
            >
                Previous
            </button>

            {/* Page Numbers */}
            {uniquePageNumbers.map((page, index) => {
                if (page === '...') {
                    return <span key={index} className="px-4 py-2 text-sm font-medium text-gray-500">...</span>;
                }

                const pageNum = page as number;
                const isActive = pageNum === currentPage;

                return (
                    <button
                        key={index}
                        onClick={() => onPageChange(pageNum)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition ${isActive
                            ? 'text-white bg-primary-600'
                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        {pageNum}
                    </button>
                );
            })}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${currentPage === totalPages
                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                    : 'text-primary-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;