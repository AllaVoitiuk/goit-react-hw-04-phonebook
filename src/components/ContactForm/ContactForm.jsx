import { useState } from 'react';
import css from './ContactForm.module.css';

export default function ContactForm ({onSubmit}) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
  
  const handleChangeName = event => {
    setName(event.target.value);
  };
  
  const handleChangeNumber = event => {
    setNumber(event.target.value);
  };

 const handleSubmit = event => {
    event.preventDefault();
       
    if(onSubmit({ name, number })){
      reset();
    }
    setName('');
  };

  const reset = () => {
    setName('');
    setNumber('');
  };


return (
    <form className={css.form} onSubmit={handleSubmit}>
    <label className={css.label}>
        Name
        <input
        className={css.input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChangeName}
        />
    </label>
    <label className={css.label}>
        Number
        <input
        className={css.input}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChangeNumber}
        />
    </label>
    <button type="submit">Add contact</button>
    </form>
);
  
}


