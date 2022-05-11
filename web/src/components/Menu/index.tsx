import { useState } from "react";
import { Link } from "react-router-dom";
import { items } from "./MenuItems";
import { X, List } from "phosphor-react";


export function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex absolute h-screen">
      <div
        className={` ${open ? "w-60" : "w-12 "
          } bg-[#01C0D5] duration-300`}
      >
        { open ?
          <button
            className={`absolute cursor-pointer right-2 top-3`}
            onClick={() => setOpen(false)}
          >
            <X weight="bold" color="#F4F4F4" className="w-5 h-5" />
          </button>
          :
          <button
            className={`absolute cursor-pointer m-2 right-1 top-3`}
            onClick={() => setOpen(true)}
          >
            <List weight="bold" color="#F4F4F4" className="w-5 h-5" />
          </button>
        }

        <ul className="pt-6 font-medium text-sm text-slate-100">
          { items.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-20" : "mt-2"} ${index === 0 && "bg-light-white"
                } `}
            >
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                <Link to={Menu.src}>
                  {Menu.title}
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}