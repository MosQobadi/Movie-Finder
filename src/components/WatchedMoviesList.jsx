import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import WatchedMovie from "./WatchedMovie";

const WatchedMoviesList = ({ watched = [], onDelete }) => {
  return (
    <>
      {watched.length < 5 ? (
        <>
          {/* <div className="list-movies"> */}
          {watched.map((movie) => (
            <WatchedMovie
              key={movie.imdbID}
              movie={movie}
              onDelete={onDelete}
            />
          ))}
          {/* </div> */}
        </>
      ) : (
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={4} // Adjust as needed
          navigation
        >
          {watched?.map((movie) => (
            <SwiperSlide key={movie.imdbID}>
              <WatchedMovie movie={movie} onDelete={onDelete} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default WatchedMoviesList;
