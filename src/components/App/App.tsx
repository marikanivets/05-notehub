import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes, createNote, deleteNote } from '../../services/noteService';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './App.module.css';

const App = () => {
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const perPage = 12;

  const debouncedSearchHandler = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setPage(1); 
  }, 500);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    debouncedSearchHandler(value);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', { page, perPage, search: debouncedSearch }],
    queryFn: () => fetchNotes({ page, perPage, search: debouncedSearch }),
    placeholderData: (previousData) => previousData,
  });

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setIsModalOpen(false);
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const totalNotes = data?.total || 0;
  const pageCount = Math.ceil(totalNotes / perPage);

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
        
        {(createNoteMutation.isPending || deleteNoteMutation.isPending) && <Loader />}
        
        {data && !isLoading && (
          <NoteList notes={data.data} onDeleteNote={(id) => deleteNoteMutation.mutate(id)} />
        )}
      </main>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onSubmit={(values) => createNoteMutation.mutate(values)} onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default App;
