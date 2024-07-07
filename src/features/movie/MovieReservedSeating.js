import { useParams } from "react-router-dom";
import MovieSeats from "./MovieSeats";
import {
  useGetAllShowtimeByMovieQuery,
  useGetShowtimeQuery,
} from "../showtime/showtimeApiSlice";
import { useEffect, useState } from "react";
import Selection from "../../components/form/Selection";
import { convertToAmPm } from "../../util/time";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { FaWheelchair } from "react-icons/fa6";
import { MdOutlineWheelchairPickup } from "react-icons/md";
import { compressGrid, expandGrid } from "../../util/grid";
const MovieReservedSeating = () => {
  const { movieId, date, time } = useParams();
  const { data: { metadata: showtimes } = [], isLoading: showtimeLoading } =
    useGetAllShowtimeByMovieQuery(
      {
        movieId,
      },
      {
        refertchOnFocus: true, // data will fetch when page on focus
        refetchOnMountOrArgChange: true, // it will refresh data when remount component
      }
    );

  const { data: { metadata: showtimeDetail } = {} } = useGetShowtimeQuery(
    {
      date: date.split("-").join("/"),
      movieId,
      time,
    },
    {
      skip: !date || !movieId || !time,
      refertchOnFocus: true, // data will fetch when page on focus
      refetchOnMountOrArgChange: true, // it will refresh data when remount component
    }
  );

  const [dateOptions, setDateOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [timeOptions, setTimeOptions] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [seatGrid, setSeatGrid] = useState([]);
  const [takenSeats, setTakenSeats] = useState([]);
  const [prices, setPrices] = useState([
    { type: "XD Matinne", price: 10.5 },
    { type: "XD Child", sub: "Child (1-11)", price: 9.25 },
    { type: "XD Senior", sub: "Senior (62+)", price: 9.75 },
  ]);
  useEffect(() => {
    setSelectedDate(date.split("-").join("/"));
    setSelectedTime(convertToAmPm(time));
  }, []);

  useEffect(() => {
    if (showtimes) {
      setDateOptions(showtimes.map((s) => s.date));
      setTimeOptions(showtimes[0].showtimes.map((time) => convertToAmPm(time)));
    }
  }, [showtimes]);

  useEffect(() => {
    if (showtimeDetail) {
      console.log(showtimeDetail);
      const { takenSeats, childPrice, generalAdmissiopnPrice, seniorPrice } =
        showtimeDetail;
      setTakenSeats(takenSeats);
      setPrices([
        { type: "XD Matinne", price: generalAdmissiopnPrice },
        { type: "XD Child", sub: "Child (1-11)", price: childPrice },
        { type: "XD Senior", sub: "Senior (62+)", price: seniorPrice },
      ]);
      setSeatGrid(showtimeDetail.theaterId.grid);
    }
  }, [showtimeDetail]);

  const [tickets, setTickets] = useState({});
  const [totalTickets, setTotalTickets] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [selectSeat, setSelectSeat] = useState([]);

  useEffect(() => {
    if (prices) {
      let initTickets = {};
      prices.forEach(({ type, sub, price }) => {
        initTickets[type] = { price, count: 0 };
        if (sub) {
          initTickets[type].sub = sub;
        }
      });
      setTickets(initTickets);
      setSubTotal(0);
      setTotalTickets(0);
    }
  }, []);

  const handleAddTickets = (type) => {
    if (tickets[type].count === 20) return;
    setTickets((prevTickets) => {
      const updatedTickets = { ...prevTickets };
      updatedTickets[type] = {
        ...updatedTickets[type],
        count: updatedTickets[type].count + 1,
      };

      return updatedTickets;
    });
    setSubTotal(subTotal + tickets[type].price);
    setTotalTickets(totalTickets + 1);
  };

  const handleRemoveTickets = (type) => {
    if (tickets[type].count === 0) return;
    setTickets((prevTickets) => {
      const updatedTickets = { ...prevTickets };
      updatedTickets[type] = {
        ...updatedTickets[type],
        count: updatedTickets[type].count - 1,
      };

      return updatedTickets;
    });
    setSubTotal(subTotal - tickets[type].price);
    setTotalTickets(totalTickets - 1);
  };

  const displaySelectSeatController = () => {
    const remainTickets = totalTickets - selectSeat.length;
    const remainSeats = selectSeat.length - totalTickets;
    return (
      <div className="w-[18rem] flex flex-col items-center gap-2 bg-[#172532] rounded">
        <h2 className="text-[1.2rem] font-bold m-2 mt-[1.2rem]">
          Select {selectSeat.length} Ticket{selectSeat.length > 1 && "s"}
        </h2>
        <hr className="border-gray-600 w-full" />
        <span className="p-2 text-gray-300 text-[0.9rem]">
          Select {selectSeat.length} Standard Ticket
          {selectSeat.length > 1 && "s"}
        </span>
        <div className="flex flex-col gap-4 w-full p-2">
          {Object.entries(tickets).map(
            ([key, { price, sub, count }], index) => (
              <div
                key={`Ticket type ${index}`}
                className="flex flex-col gap-3 items-center"
              >
                <div className="flex flex-col items-center">
                  <span className="text-[0.9rem]">
                    {key} ${price}
                  </span>
                  {sub && <small className="text-gray-400">{sub}</small>}
                </div>
                <div className="flex gap-3 items-center">
                  <FiMinusCircle
                    onClick={() => handleRemoveTickets(key)}
                    className={`text-[1.3rem] ${
                      count === 0
                        ? "text-gray-500 cursor-default"
                        : "cursor-pointer"
                    }`}
                  />
                  <span>{count}</span>
                  <FiPlusCircle
                    onClick={() => handleAddTickets(key)}
                    className={`text-[1.3rem] ${
                      count === 20
                        ? "text-gray-500 cursor-default"
                        : "cursor-pointer"
                    }`}
                  />
                </div>
                {index < prices.length - 1 && (
                  <hr className="border-gray-500 w-full" />
                )}
              </div>
            )
          )}
        </div>
        <hr className="border-gray-600 w-full" />
        <div className="flex justify-around w-full">
          <span className="font-bold">SubTotal</span>
          <span className="text-[0.9rem] text-gray-200">${subTotal}</span>
        </div>
        <div>
          <hr className="border-gray-600 w-full" />
          {remainTickets > 0 && (
            <div className="flex flex-col text-center p-2">
              <span className="text-[0.9rem] font-bold">
                {remainTickets} selected seat{remainTickets > 1 && "s"}{" "}
                {remainTickets > 1 ? "has" : "have"} no ticket
                {remainTickets > 1 && "s"}.
              </span>
              <span className="text-[0.8rem] text-gray-200">
                Add {remainTickets > 1 && "a"} ticket{remainTickets > 1 && "s"}{" "}
                for your selected seat{remainTickets > 1 && "s"} to continue.
              </span>
            </div>
          )}
          {remainSeats > 0 && (
            <div className="flex flex-col text-center p-2">
              <span className="text-[0.9rem] font-bold">
                {remainSeats} ticket{remainSeats > 1 && "s"}{" "}
                {remainSeats > 1 ? "has" : "have"} no selected seat
                {remainSeats > 1 && "s"}.
              </span>
              <span className="text-[0.8rem] text-gray-200">
                Select {remainSeats > 1 && "a"} seat{remainSeats > 1 && "s"} for
                your remaining ticket{remainSeats > 1 && "s"} to continue.
              </span>
            </div>
          )}
        </div>
        <button
          className={`border ${
            (totalTickets === 0 || remainTickets > 0 || remainSeats > 0) &&
            "hidden"
          }  border-cyan-400 text-gray-100 hover:border-cyan-700 p-2 w-[10rem] mx-2`}
        >
          Next
        </button>
      </div>
    );
  };
  if (showtimeLoading) return <div>Loading...</div>;
  return (
    <div className="w-full flex flex-col gap-2 mb-[2rem]">
      <div className="flex justify-center w-full">
        {/* Date */}
        <div className="py-2 rounded flex bg-[#172532] flex-1">
          <div className="text-gray-300 items-center gap-4 flex flex-wrap justify-around w-full px-4">
            {dateOptions.length > 0 && (
              <div className="flex gap-[1.5rem] flex-wrap items-end">
                <div>
                  <span className="text-[0.9rem] font-thin">Chose Date</span>
                  <div className="w-[10rem]">
                    <Selection
                      formData={{
                        value: selectedDate,
                        options: dateOptions,
                      }}
                      placeHolder="Select Date"
                      border={"border border-gray-600"}
                      handleOnChange={(value) => setSelectedDate(value)}
                    />
                  </div>
                </div>
                <div>
                  <span className="text-[0.9rem] font-thin">Chose Time</span>
                  <div className="w-[10rem]">
                    <Selection
                      formData={{
                        value: selectedTime,
                        options: timeOptions,
                      }}
                      placeHolder="Select Time"
                      border={"border border-gray-600"}
                      handleOnChange={(value) => setSelectedTime(value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>{" "}
        {/* Date */}
      </div>
      <div className="flex flex-wrap-reverse gap-[1rem] w-full tablet:justify-center justify-start">
        {displaySelectSeatController()}
        {/* Sit */}
        <MovieSeats
          seatLayOut={seatGrid}
          selectedSeats={takenSeats}
          selectSeat={selectSeat}
          handleAddSelectSeat={(seatNumber) =>
            setSelectSeat((prev) => [...prev, seatNumber])
          }
          handleRemoveSelectSeat={(seatNumber) =>
            setSelectSeat((prev) => prev.filter((seat) => seat !== seatNumber))
          }
        />
        {/* Sit */}
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="p-2 rounded flex flex-col gap-2 bg-[#172532]  w-[18rem] flex-auto">
          <span className="font-bold text-[1.3rem]">Seat Legend</span>
          <div className="flex gap-3 items-center">
            <div className="w-[1.8rem] rounded aspect-square bg-emerald-700 border border-emerald-400"></div>
            <span className="text-[0.9rem] text-gray-300">Avaliable Seat</span>
          </div>
          <hr className="border-gray-600" />
          <div className="flex gap-3 items-center">
            <div className="w-[1.8rem] rounded aspect-square bg-gray-900 border border-gray-400"></div>
            <span className="text-[0.9rem] text-gray-300">Selected Seat</span>
          </div>
          <hr className="border-gray-600" />
          <div className="flex gap-3 items-center">
            <div className="w-[1.8rem] rounded aspect-square bg-gray-700 text-gray-400"></div>
            <span className="text-[0.9rem] text-gray-300">Unavaliable</span>
          </div>
          <hr className="border-gray-600" />
          <div className="flex flex-wrap gap-3 items-center">
            <div className="w-[1.8rem] flex items-center justify-center rounded aspect-square bg-[#2f76b8]">
              <FaWheelchair />
            </div>
            <span className="text-[0.9rem] text-gray-300">
              Wheelchair Space (no seat)
            </span>
            <p className="w-full text-[0.9rem] text-gray-300">
              This is a wheelchair space, it is not a seat.
            </p>
          </div>
          <hr className="border-gray-600" />
          <div className="flex flex-wrap gap-3 items-center">
            <div className="w-[1.8rem] flex items-center justify-center rounded aspect-square bg-[#2f76b8]">
              <MdOutlineWheelchairPickup />
            </div>
            <span className="text-[0.9rem] text-gray-300">Companion Seat</span>
            <p className="w-full text-[0.9rem] text-gray-300">
              This seat is only available for a guest accompanying a guest who
              has purchased a wheelchair seat.
            </p>
          </div>
        </div>
        <div className="p-2 rounded flex flex-col gap-2 bg-[#172532] flex-1 h-fit">
          <span className="font-bold text-[1.3rem]">
            Information and Policies
          </span>
          <p className="text-[0.9rem] text-gray-300">
            No Children Under Age 6 Will Be Admitted To Any R-Rated Feature
            After 6:00 PM. Valid IDs will be required to attend Rated "R"
            movies. You must be at least 17 years of age or have your parent
            accompany you to view the movie. IDs will be checked at the theatre.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieReservedSeating;
