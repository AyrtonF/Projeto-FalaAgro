
// import logo from '../../assets/logo.png'
// import React from 'react';
// import './Header.css'; // Assuming you create a separate CSS file
// import { Link } from 'react-router-dom'; // Import Link for routing

// const Navbar = () => {
//   return (
//     <header className="fala-agro-header">
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <div className="container fala-agro-container"> {/* Custom container class */}
//           <Link to="/" className="navbar-brand">
//             <img src={logo} alt="Logo fala agro" aria-label="Fala Agro Logo" />
//           </Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav">
//               <NavLink to="/favoritos">Favoritos</NavLink>
//               <NavLink to="/chat">Chat</NavLink>
//               <NavLink to="/notificacoes">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   fill="currentColor"
//                   className="bi bi-bell"
//                   viewBox="0 0 16 16"
//                 >
//                   {/* SVG icon for bell */}
//                 </svg>
//               </NavLink>
//               <NavLink to="/carrinho">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   fill="currentColor"
//                   className="bi bi-cart"
//                   viewBox="0 0 16 16"
//                 >
//                   {/* SVG icon for cart */}
//                 </svg>
//               </NavLink>
//             </ul>
//           </div>
//           <div className="fala-agro-actions"> {/* Custom actions container class */}
//             <Link to="/login">
//               <button type="button" className="btn btn-primary">
//                 Entrar
//               </button>
//             </Link>
//             <Link to="/anunciar">
//               <button type="button" className="btn btn-outline-primary">
//                 Anunciar
//               </button>
//             </Link>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

// // Create a separate NavLink component for reusability
// const NavLink = ({ href, children }) => (
//   <li className="nav-item">
//     <Link to={href} className="nav-link">
//       {children}
//     </Link>
//   </li>
// );
