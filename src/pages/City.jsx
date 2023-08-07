import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import data from "../cities.json";
import { baseApi } from "../../api";
import Sunny from "../shared/loading/Sunny";
import ArrowIcon from "../assets/icons/ArrowIcon";

function City() {
  const [loading, setLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [filteredCity, setFilteredCity] = useState(data);

  const { city } = useParams();
  let conditionWeather;

  if (currentCity?.current?.condition.text.toLowerCase().includes("sunny")) {
    conditionWeather = "bg-default";
  } else if (
    currentCity?.current?.condition.text.toLowerCase().includes("rain")
  ) {
    conditionWeather = "bg-rain";
  } else if (
    currentCity?.current?.condition.text.toLowerCase().includes("cloud")
  ) {
    conditionWeather = "bg-cloudly";
  } else if (
    currentCity?.current?.condition.text.toLowerCase().includes("overcast")
  ) {
    conditionWeather = "bg-cloudly";
  } else if (
    currentCity?.current?.condition.text.toLowerCase().includes("storm")
  ) {
    conditionWeather = "bg-thunder_storm";
  } else if (
    currentCity?.current?.condition.text.toLowerCase().includes("snow")
  ) {
    conditionWeather = "bg-snowly";
  } else if (
    currentCity?.current?.condition.text.toLowerCase().includes("driz")
  ) {
    conditionWeather = "bg-drizzle";
  }

  useEffect(() => {
    setLoading(true);
    setInputValue("");
    setFilteredCity([]);
    let selectedCity = data.find((c) => c.capital === city);

    if (selectedCity) {
      baseApi
        .get("/current.json", {
          params: {
            q: `${selectedCity.lat},${selectedCity.long}`,
          },
        })
        .then((res) => {
          setTimeout(() => {
            setCurrentCity(res.data);
            setLoading(false);
          }, 1000);
        });
    }
  }, [city]);

  const changeSearch = (value) => {
    setInputValue(value);
  };

  useEffect(() => {
    setFilteredCity(
      data.filter((c) =>
        c.capital.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue]);

  return loading ? (
    <div className="flex justify-center items-center h-full">
      <Sunny />
    </div>
  ) : (
    <div
      className={`flex flex-col items-center h-screen bg-no-repeat bg-center bg-cover ${conditionWeather}`}
    >
      <div className="w-[50%] mt-10">
        <NavLink to="/" className="flex text-blue-500 font-medium">
          <ArrowIcon /> City list
        </NavLink>
      </div>
      <div className="mt-[5%] relative">
        <input
          type="text"
          placeholder="Search city"
          className="p-2 rounded-sm text-sm outline-none opacity-70 w-[200px]"
          onChange={(e) => changeSearch(e.target.value)}
          value={inputValue}
        />

        {filteredCity.length > 0 && inputValue && (
          <ul className="bg-white rounded-sm opacity-70 mt-1 absolute w-[100%] z-10 max-h-[200px] overflow-scroll">
            {filteredCity.map((c, key) => {
              return (
                <li
                  className="cursor-pointer hover:bg-slate-200 p-2 font-medium text-sm text-black"
                  key={key}
                >
                  <NavLink to={`/${c.capital}`}> {c.capital}</NavLink>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="w-[30%] flex flex-col gap-2">
        <div className="flex justify-center max-w-lg items-center px-4 rounded-sm gap-4">
          <img src={currentCity.current.condition.icon} />
          <div className="flex gap-2 flex-col p-5 text-white opacity-80">
            <span className="text-white font-medium">
              {currentCity.current.condition.text}
            </span>
            <div className="text-6xl">{currentCity.current.temp_c}°</div>
            <div className=" font-medium">
              {currentCity.location.region}, {currentCity.location.country}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-[100%] sm:flex-col md:flex-col xl:flex-row">
          <div className="flex flex-col gap-1 items-center">
            <div className=" bg-gray-100 rounded-full w-14 p-1 opacity-75">
              <img
                src="https://res.cloudinary.com/dawsyfhbt/image/upload/v1691234399/wind_i2jw15.png"
                className="w-[100%]"
              />
            </div>
            <span className=" font-semibold text-white">Wind</span>
            <span className=" text-white font-semibold">
              {currentCity.current.wind_kph} km/h
            </span>
          </div>

          <div className="flex flex-col gap-1 items-center">
            <div className=" bg-gray-100 rounded-full w-14 p-1 opacity-75">
              <img
                src="https://res.cloudinary.com/dawsyfhbt/image/upload/v1691234402/humidity_wd0mfu.png"
                className="w-[100%]"
              />
            </div>
            <span className=" font-semibold text-white">Humidity</span>
            <span className=" text-white font-semibold">
              {currentCity.current.humidity}%
            </span>
          </div>

          <div className="flex flex-col gap-1 items-center">
            <div className=" bg-gray-100 rounded-full w-14 p-2 opacity-75">
              <img
                src="https://res.cloudinary.com/dawsyfhbt/image/upload/v1691234390/pr_zs212e.png"
                className="w-[100%]"
              />
            </div>
            <span className=" font-semibold text-white">Pressure</span>
            <span className=" text-white font-semibold">
              {currentCity.current.pressure_in} in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default City;
