import React from "react";
import Movie from "./Movie";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const MoviesList = ({ movies, onSelect }) => {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={20}
      slidesPerView={4} // Adjust as needed
      navigation
    >
      {movies?.map((movie) => (
        <SwiperSlide key={movie.imdbID}>
          <Movie movie={movie} onSelect={onSelect} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MoviesList;
