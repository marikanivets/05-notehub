import { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
  onDeleteNote: (id: string) => void;
}

const NoteList = ({ notes, onDeleteNote }: NoteListProps) => {
  if (notes.length === 0) return <div className={css.empty}>No notes found.</div>;

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.listItem}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <button className={css.button} onClick={() => onDeleteNote(id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
