// src/components/Header.jsx
const Header = () => {
  return (
    <header className="bg-blue-light py-4 px-6 flex justify-between items-center shadow">
      <div className="flex items-center space-x-2">
        <img src={`/public/images/gettentor.png`} alt="logo" className="w-64 h-12" />
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-blue hover:bg-blue-dark text-white px-4 py-1 rounded">
          Tentor Favorit
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-blue-dark">Fumino Furuhashi</span>
          <img src={`/public/images/fumino.jpg`} className="w-8 h-8 rounded-full border" alt="User Avatar" />
        </div>
      </div>
    </header>
  );
};


export default Header;