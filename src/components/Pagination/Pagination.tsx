import type { ComponentType } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from './Pagination.module.css';

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

interface PaginationProps {
  pageCount: number;
  forcePage: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination = ({ pageCount, forcePage, onPageChange }: PaginationProps) => {
  const handlePageClick = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected);
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
      forcePage={forcePage}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
};

export default Pagination;
