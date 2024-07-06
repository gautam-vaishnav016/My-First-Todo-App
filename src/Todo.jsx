import React, { useState } from "react";
import { useEffect } from "react";

export const Todo = () => {
  const localStorageKey = "list";

  const [task, setTask] = useState("");
  const [list, setList] = useState(() => {
    return JSON.parse(localStorage.getItem(localStorageKey)) || [];
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(list));
  }, [list]);

  const addTask = () => {
    // setList([...list, task]);
    // console.log(list);

    (task == "" ||
      setList((list) => {
        const data = [task, ...list];
        return data;
      })) &&
      alert("Please write your task");

    // const newListArray = [...list, task];
    // setList(newListArray);
    setTask("");
  };

  const removeTask = (index) => {
    // accept the value index
    const updatedList = list.filter((elem, id) => {
      return index != id;
    });
    setList(updatedList);
  };

  function clear() {
    setList([]);
  }

  return (
    <>
      <div className="flex flex-col items-center bg-[#a78fb8] m-10 mb-5 rounded-md">
        <h1 className="text-3xl m-5 font-bold">TODO LIST📙</h1>
        <div>
          <input
            className="bg-slate-300 rounded-l-full m-8 mr-0 p-2 text-center outline-none"
            type="text"
            placeholder="create a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-green-400 font-bold text-white rounded-r-full p-2 m-1 ml-0 hover:bg-green-600"
          >
            Add Tasks
          </button>
        </div>

        {list != [] &&
          list.map((data, index) => {
            return (
              <>
                <p
                  key={index}
                  className=" flex bg-slate-300 m-4 py-2 pl-10 pr-2 rounded-md "
                >
                  <div className="self-center font-semibold pr-10 mr-6 grow">
                    {data}
                  </div>
                  <button
                    onClick={() => removeTask(index)} //pass the value index on calling time.
                    className="bg-red-500 text-white rounded-md p-2 mx-1 font-bold hover:bg-red-600"
                  >
                    Delete
                  </button>
                </p>
              </>
            );
          })}

        {list.length >= 1 && (
          <button
            onClick={clear}
            className="bg-red-600 rounded-md p-1 text-white font-bold ml-4 mb-3"
          >
            Clear all
          </button>
        )}
      </div>
    </>
  );
};
