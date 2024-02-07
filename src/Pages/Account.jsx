import React from "react";
import SavedShows from "../components/SavedShows";

const Account = () => {
  return (
    <>
      <div className="w-full text-white">
        <img
          className=" w-full h-[400px] object-cover"
          src="https://media.istockphoto.com/id/1287677376/photo/television-streaming-multimedia-wall-concept.jpg?s=612x612&w=0&k=20&c=l708bRK47ZAVn2srax3fkVodTDEsK6nus0c6KHnUPbM="
          alt="/"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[550px]"></div>
        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:5xl font bold">My Shows</h1>
        </div>
      </div>
      <SavedShows />
    </>
  );
};

export default Account;
