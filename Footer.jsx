const Footer = () => {
  return (
    <footer className="bg-white shadow-inner mt-auto">
      <div className="container mx-auto px-4 py-4 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;