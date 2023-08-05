import data from "../cities.json";
import { Link } from "react-router-dom";

function Cities() {
  return (
    <>
      <div className=" flex justify-center text-white   bg-blue-900 items-center pt-16 text-2xl">
        Select City
      </div>
      <div className="grid grid-cols-4 gap-4 bg-blue-900 p-16 md:grid-cols-4 sm:grid-cols-1">
        {data.map((r, i) => {
          return (
            <Link
              to={`${r.capital}`}
              className="rounded-md border border-slate-400 text-white flex items-center justify-center p-4 cursor-pointer ease-in duration-300 hover:bg-white hover:text-blue-900"
              key={i}
            >
              {r.capital}
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Cities;
