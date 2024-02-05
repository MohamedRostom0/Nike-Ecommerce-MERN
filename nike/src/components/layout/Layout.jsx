import Footer from "./Footer";
import Nav from "./navbar/Nav";

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <footer className="padding bg-black padding-x padding-t pb-8">
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
