import { Formik, Form, Field, ErrorMessage as FormikError, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { CreateNotePayload } from '../../services/noteService';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onSubmit: (values: CreateNotePayload, helpers: FormikHelpers<CreateNotePayload>) => void;
  onCancel: () => void;
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(50, 'Maximum 50 characters')
    .required('Required field'),
  content: Yup.string()
    .max(500, 'Maximum 500 characters')
    .required('Required field'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Required field'),
});

const initialValues: CreateNotePayload = { title: '', content: '', tag: 'Todo' };

const NoteForm = ({ onSubmit, onCancel }: NoteFormProps) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <FormikError name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field id="content" as="textarea" name="content" rows={6} className={css.textarea} />
            <FormikError name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field id="tag" as="select" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <FormikError name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onCancel}>Cancel</button>
            <button type="submit" className={css.submitButton} disabled={isSubmitting}>Create note</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
