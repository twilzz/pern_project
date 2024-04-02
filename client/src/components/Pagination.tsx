import { cn } from '@/lib/utils'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'

interface StorePaginationProps {
  currentPage: number
  setPage: (page: number) => void
  totalPages: number
}

export const StorePagination = ({
  currentPage,
  setPage,
  totalPages,
}: StorePaginationProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              currentPage === 0 && 'pointer-events-none text-muted-foreground'
            )}
            onClick={() => setPage(currentPage - 1)}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNum, index) => {
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index}
                  onClick={() => setPage(index)}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            )
          }
        )}
        <PaginationItem>
          <PaginationNext
            className={cn(
              currentPage === totalPages - 1 &&
                'pointer-events-none text-muted-foreground'
            )}
            onClick={() => setPage(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
