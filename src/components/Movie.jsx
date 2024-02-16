import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import {
  Add,
  CloseOutlined,
  InfoOutlined,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import BasicModal from "./BasicModal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import requests from "./Requests";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  p: 4,
};

const Movie = ({ item }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("please log in to save a movie");
    }
  };

  return (
    <div
      ListItem
      key={item?.id}
      className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 "
    >
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div style={{ margin: "25%" }}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <img
                className="w-full h-full object-cover "
                src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                alt={movie?.title}
              />
            </Typography>
            <Typography
              className="sm:items-center sm:justify-center "
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              <button>
              <CloseOutlined
                onClick={handleClose}
                className="absolute top-0 right-0 cursor-pointer z-10"
              />
              </button>
              <div className="w-full h-full">
                <div className="absolute w-[700px] h-[500px] top-[0%] left-[0%] bg-gradient-to-r from-black z-0"></div>

                <div className="absolute  top-[20%] p-4 md:p-8">
                  <h1 className="text-3xl md:text-5xl text-white font-bold sm:text-2">
                    {movie?.title}
                  </h1>
                  <div className="my-4"></div>
                  <p className="text-white text-50px ">
                    Released:{movie?.release_date}
                  </p>
                  <p className="w-full sm:max-w-[60%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[80%] text-white sm:text-1">
                    {movie?.overview}
                  </p>
                </div>
              </div>
            </Typography>
          </Box>
        </Modal>
      </div>
      <p onClick={handleOpen}>
        <InfoOutlined className=" absolute  text-white bottom-2 left-4 bg-black-700 cursor-pointer" />
      </p>
      <p onClick={saveShow}>
        {like ? (
          <FaHeart className="absolute top-4 left-4 text-gray-300" />
        ) : (
          <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
        )}
      </p>
      {/* {modalOpen && (
        <div
          onClick={closeModal}
          className="desc Modal flex flex-row absolute w-[500px] bg- text-black overflow-auto"
        >
          <div className="overlay w-[500px] h-[100vh] top-0 left-0 right-0 bottom-0 fixed bg-black/0 opacity-80 ">
            <div className="modal-content display: inline-flex; bg-blue z-99 w-full h-full break-words bg-red-800 justify-center items-left ">
              <h4 className="text-white ">Overview: {item?.overview}</h4>
              <p className="text-white">Release Date: {item?.release_date}</p>
              <button className="text-white" onClick={closeModal}>
               
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Movie;
