import {
  Hero,
  PopularProducts,
  SuperQuality,
  CustomerReviews,
  Footer,
} from "./components/landing-page";
import Nav from "./components/layout/navbar/Nav";

const App = () => {
  return (
    <main className="relative">
      <Nav />
      <section className="xl:padding-l wide:padding-r padding-b">
        <Hero />
      </section>
      <section className="padding">
        <PopularProducts />
      </section>
      <section className="padding">
        <SuperQuality />
      </section>
      <section className="bg-pale-blue padding">
        <CustomerReviews />
      </section>
      <section className="padding bg-black padding-x padding-t pb-8">
        <Footer />
      </section>
    </main>
  );
};

export default App;
