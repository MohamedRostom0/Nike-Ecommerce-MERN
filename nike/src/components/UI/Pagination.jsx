import { useLocation } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = ({ pagination, count }) => {
  const location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  searchParams.delete("limit");
  searchParams.delete("page");
  const newSearchString = searchParams.toString();

  console.log("==> ", newSearchString);

  // Calculate items per page based on the available next or prev limit, or a default value
  const itemsPerPage = pagination.next
    ? pagination.next.limit
    : pagination.prev
    ? pagination.prev.limit
    : 10; // Assuming a default if neither is present
  const totalPages = Math.ceil(count / itemsPerPage);

  // Determine current page based on the presence of next or prev in the pagination object
  const currentPage = pagination.next ? pagination.next.page - 1 : totalPages;

  const pageNumbers = [];
  if (currentPage > 1) pageNumbers.push(currentPage - 1); // Previous page
  pageNumbers.push(currentPage); // Current page
  if (currentPage < totalPages) pageNumbers.push(currentPage + 1); // Next page

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {/* Render Previous Button only if current page is greater than 1 */}
            {currentPage > 1 && (
              <a
                href={`/products?${
                  newSearchString.length > 0 ? newSearchString + "&" : ""
                }page=${pagination.prev.page}&limit=${itemsPerPage}`}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            )}

            {/* Dynamically render page numbers */}
            {pageNumbers.map((page) => (
              <a
                key={page}
                href={`/products?${
                  newSearchString.length > 0 ? newSearchString + "&" : ""
                }page=${page}&limit=${itemsPerPage}`}
                aria-current={page === currentPage ? "page" : undefined}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                  page === currentPage
                    ? "z-10 bg-coral-red text-white"
                    : "text-gray-700 hover:bg-gray-50"
                } ring-1 ring-inset ring-gray-300 focus:z-20`}
              >
                {page}
              </a>
            ))}

            {/* Dots after Next if there are more pages */}
            {currentPage + 1 < totalPages && (
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 focus:z-20">
                ...
              </span>
            )}

            {/* Render Next Button only if current page is less than total pages */}
            {currentPage < totalPages && (
              <a
                href={`/products?${
                  newSearchString.length > 0 ? newSearchString + "&" : ""
                }page=${pagination.next.page}&limit=${itemsPerPage}`}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
