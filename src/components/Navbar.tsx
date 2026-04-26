import { NavLink } from 'react-router';

const Navbar = () => {
  return (
    <section className="bg-teal-800 h-20 text-white flex justify-center items-center gap-5">
      <NavLink to={'/'}>All Books</NavLink>
      <NavLink to={'/add_book'}>Add Book</NavLink>
      <NavLink to={'/borrowed'}>Borrow Summary</NavLink>
    </section>
  );
};

export default Navbar;