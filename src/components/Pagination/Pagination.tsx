import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  forcePage: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination = ({ pageCount, forcePage, onPageChange }: PaginationProps) => {
  const handlePageClick = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1);
  };

  return (
    <ReactPaginate
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      forcePage={forcePage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
};

export default Pagination;
