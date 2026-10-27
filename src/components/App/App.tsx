import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '../../services/noteService';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './App.module.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(0); 
  const [isModalOpen, setIsModalOpen] = useState(false); // Стейт восстановлен!
  const perPage = 12;

  const debouncedSearchHandler = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setPage(0); 
  }, 500);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    debouncedSearchHandler(value);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', { page, perPage, search: debouncedSearch }],
    queryFn: () => fetchNotes({ page: page + 1, perPage, search: debouncedSearch }),
    placeholderData: (previousData) => previousData,
  });

  const pageCount = data?.totalPages || 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearchChange} />
        
        {pageCount > 1 && (
          <Pagination pageCount={pageCount} forcePage={page} onPageChange={(p) => setPage(p)} />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>Create note +</button>
      </header>

      <main>
        {isLoading && <Loader />}
        {isError && <ErrorMessage message="Error loading notes. Please verify your API key." />}
        
        {data && !isLoading && (
          <NoteList notes={data.notes} />
        )}
      </main>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default App;

