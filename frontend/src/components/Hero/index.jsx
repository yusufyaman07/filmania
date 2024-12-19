const Hero = () => {
  return (
    <div className="relative bg-[url('/wick.jpg')] bg-center bg-cover text-white">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative p-10 py-32 text-center lg:px-24">
        <h1 className="text-5xl font-extrabold md:text-6xl drop-shadow-lg">
          Welcome,
        </h1>
        <h2 className="mt-4 text-2xl font-semibold md:text-3xl drop-shadow-lg">
          Discover millions of movies, TV series, and actors
        </h2>
        <div className="relative flex items-center justify-center w-full max-w-2xl mx-auto mt-8">
          <input
            type="text"
            placeholder="Search for movies, TV series, actors"
            className="flex-grow p-4 pl-6 text-black rounded-l-full shadow-lg focus:outline-none"
          />
          <button className="px-6 py-4 font-semibold text-white transition bg-blue-500 rounded-r-full shadow-lg hover:bg-blue-600">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
