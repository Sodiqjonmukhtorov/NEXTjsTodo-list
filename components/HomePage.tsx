import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { EditProps, Todos } from "../interfaces/types";
import { AiOutlineEdit, AiOutlineCloseCircle } from "react-icons/ai";
import Cookies from "js-cookie";
import EditTodo from "./EditTodo";
import { Linkedin } from "../public/linkedin";
import { Github } from "../public/github";

const HomePage = ({ todos, setTodos }: Todos) => {
  const [deadline, setDeadline] = useState<string>("");
  const [todo, setTodo] = useState<string>("");
  const [red, setRed] = useState<string>("");
  const [green, setGreen] = useState<string>("");
  const [blue, setBlue] = useState<string>("");
  const [edit, setEdit] = useState<Boolean>(false);
  const [editTodo, setEditTodo] = useState<EditProps | any>();

  let redd = "";
  let greenn = "";
  let bluee = "";

  const handleColor = () => {
    const max = 200;
    const min = 0;
    redd = Math.trunc(Math.random() * (max - min) - min).toString();
    greenn = Math.trunc(Math.random() * (max - min) - min).toString();
    bluee = Math.trunc(Math.random() * (max - min) - min).toString();
  };

  const handleSubmit = (): void => {
    setRed(redd);
    setGreen(greenn);
    setBlue(bluee);
    const id = Date.now().toString();
    setTodos([
      ...todos,
      { todo, deadline, id, bg: `rgb(${redd},${greenn},${bluee})` },
    ]);
  };

  useLayoutEffect(() => {
    handleColor();
  });

  useEffect(() => {
    Cookies.set("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDelete = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEdit = (item: EditProps) => {
    setEdit(true);
    setEditTodo(item);
  };
  return (
    <div className='px-4 pt-8 overflow-auto todo'>
      <h2 className='px-8 font-bold text-center todo_title'>
        What is the Plan for Toda
      </h2>
      <div className='flex flex-col mx-4 mb-8 border-2 border-indigo-600 rounded-lg md:flex-row '>
        <div className='flex'>
          <input
            type='text'
            value={todo}
            name='todo'
            placeholder='Add a todo'
            onChange={(e) => setTodo(e.target.value)}
            className='flex-1 px-3 py-2 text-sm border-2 border-indigo-600 border-solid focus:outline-none'
          />
          <input
            type='date'
            value={deadline}
            name='deadline'
            placeholder='deadline'
            onChange={(e) => setDeadline(e.target.value)}
            className='md:w-[30%] border-2 border-indigo-600 border-solid text-sm px-2 focus:outline-none'
          />
        </div>
        <button
          onClick={() => {
            handleColor(), handleSubmit();
          }}
          className='px-4 py-1 text-sm text-white transition-all duration-300 ease-in-out bg-indigo-600 hover:bg-indigo-400'
        >
          Add Todo
        </button>
      </div>
      {edit ? (
        <EditTodo
          todos={todos}
          setTodos={setTodos}
          editTodo={editTodo}
          setEdit={setEdit}
          id={""}
          deadline={""}
          bg={""}
          todo=''
        />
      ) : (
        <div className='flex flex-col w-full gap-3'>
          {todos.map((item, index) => (
            <div
              key={item?.id}
              style={{ background: item.bg }}
              className='flex justify-between p-3 text-sm rounded-lg'
            >
              <h4 className='font-semibold text-white capitalize'>
                {`${index + 1}.`} {item.todo}
              </h4>
              <span className='font-semibold text-white'>{item.deadline}</span>
              <div className='flex gap-1 text-white todo_actions'>
                <span onClick={() => handleDelete(item.id)}>
                  <AiOutlineCloseCircle />
                </span>
                <span onClick={() => handleEdit(item)}>
                  <AiOutlineEdit />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-24 mt-[240px]">
              <a href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile"><Linkedin/></a>
              <h1 className="font-semibold text-gray-50">Sodiqjon Mukhtorov</h1>
              <a href="https://github.com/Sodiqjonmukhtorov"><Github/></a>
              </div>
    </div>
  );
};

export default HomePage;
