import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="bg-gray-900 h-screen flex items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold text-white">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-white">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-300">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{" "}
          </p>
          <Link to={"/"} className="text-white hover:text-cyan-400">
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
