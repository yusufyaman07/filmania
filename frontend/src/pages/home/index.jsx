import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api/api";
import Hero from "../../components/Hero";
import Loader from "../../components/Loader";
import Card from "../../components/Card";
import Error from "../../components/Error";

const HomePage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: () => api.get("/movies").then((res) => res.data),
  });

  return (
    <div style={{ position: "relative" }}>
      <Hero />
      {isLoading ? (
        <Loader />
      ) : error || !data || !data.movies ? (
        <Error />
      ) : (
        <div className="grid grid-cols-1 gap-10 p-4 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {data.movies.map((movie, key) => (
            <Card movie={movie} key={key} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
