import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import api from "../../utils/api/api";
import { FaTrashAlt } from "react-icons/fa";
import { FaHeart, FaBookmark, FaStar } from "react-icons/fa";
import { BiSolidCameraMovie } from "react-icons/bi";
import { toast } from "react-toastify"; // Toastify import
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS

const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => api.get(`/movies/${id}`),
  });
  const movie = data?.data;
  const rating = +movie?.rating;

  // Dinamik Color
  const color =
    rating > 9
      ? "blue"
      : rating > 7.5
      ? "green"
      : rating > 5
      ? "orange"
      : "red";

  // Delete Movie
  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (confirmed) {
      api
        .delete(`/movies/${movie.id}`)
        .then(() => {
          toast.success("Movie deleted successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          navigate("/");
        })
        .catch((error) => {
          toast.error("Failed to delete the movie.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          console.error("Error deleting movie:", error);
        });
    }
  };

  return (
    <div className="p-10">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        data && (
          <div>
            <div className="flex justify-end">
              <button
                onClick={handleDelete}
                className="p-2 text-white bg-red-600 rounded-md hover:bg-red-400"
              >
                <FaTrashAlt />
              </button>
            </div>

            <div className="flex flex-col items-center gap-10 md:flex-row">
              <div>
                <img
                  className="rounded-md w-[400px] height-[400px]"
                  src={movie.image}
                  alt="image"
                />
              </div>
              <div className="flex flex-col gap-10">
                {/* Title */}
                <div>
                  <h1 className="text-3xl font-semibold">
                    {movie.title} <span>({movie.year}) </span>
                  </h1>
                </div>
                {/* Rating */}
                <p>
                  <span className="font-semibold me-3 ">Audience Rating:</span>
                  <span
                    style={{ background: color }}
                    className="p-2 font-semibold text-white rounded-full"
                  >
                    {movie.rating}
                  </span>
                </p>
                {/* Icons */}
                <div className="flex gap-5">
                  <button className="p-3 text-white bg-gray-800 rounded-full hover:bg-gray-700 ">
                    <FaHeart />
                  </button>
                  <button className="p-3 text-white bg-gray-800 rounded-full hover:bg-gray-700 ">
                    <FaBookmark />
                  </button>
                  <button className="p-3 text-white bg-gray-800 rounded-full hover:bg-gray-700 ">
                    <FaStar />
                  </button>
                  <button className="p-3 text-white bg-gray-800 rounded-full hover:bg-gray-700 ">
                    <BiSolidCameraMovie />
                  </button>
                </div>
                {/* Categories */}
                <div className="flex items-center gap-5">
                  <p className="font-semibold">Categories:</p>
                  <p className="flex gap-3">
                    {movie.genre.map((genre, index) => (
                      <span
                        key={`${movie.id}-${index}`}
                        className="px-3 py-1 text-white bg-yellow-600 rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </p>
                </div>
                {/* Description */}
                <h1 className="text-3xl font-semibold">Description:</h1>
                <p className="text-xl">{movie.description}</p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default DetailPage;
