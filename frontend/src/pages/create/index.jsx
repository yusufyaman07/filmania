import { useNavigate } from "react-router-dom";
import InputField from "../../components/İnputField";
import { inputs } from "../../constants";
import api from "../../utils/api/api";
import { toast } from "react-toastify"; // Toastify sadece burada kullanılıyor

const CreatePage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    data.genre = data.genre.split(",");
    data.image = "https://picsum.photos/200";
    data.description =
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime eaque hic rerum. Commodi doloribus molestiae similique odit animi rerum, fuga porro amet ad repellat quasi dolorum quibusdam optio enim illum.";

    api
      .post("/movies", data)
      .then(() => {
        toast.success("Movie created successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/");
      })
      .catch((err) => {
        toast.error("An error occurred while creating the movie.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.error("Hata oluştu:", err);
      });
  };

  return (
    <div className="flex items-center justify-center flex-1 min-h-screen p-5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
      <div className="bg-white w-full max-w-[1200px] p-10 rounded-lg shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Title */}
        <div className="text-center lg:col-span-2">
          <h1 className="mb-8 text-4xl font-bold text-yellow-600">
            Create New Movie
          </h1>
        </div>

        {/* Form Area */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-6"
        >
          {inputs.map((props) => (
            <InputField key={props.name} {...props} />
          ))}

          <button className="p-3 font-semibold text-white transition-all bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-400">
            Create
          </button>
        </form>

        {/* Image Area */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <img
              className="rounded-full border-4 border-yellow-600 shadow-lg max-h-[300px] lg:max-h-[400px] object-cover"
              src="/movie-bg.jpg"
              alt="Movie Background"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
