import { useState } from "react";
import "../styles/formTask.css";
import { v4 as uuid } from "uuid";
import {MdDeleteForever, MdPostAdd} from "react-icons/md"

interface Task {
  id: string;
  newData: string;
  task: string;
  color: string;
}

interface Form {
  aoCadastrar: (task: Task) => void;
  deletarTudo: () => void;
}

const FormTask: React.FC<Form> = ({ aoCadastrar, deletarTudo }) => {
  const [data, setData] = useState<string>("");
  const [task, setTask] = useState<string>("");
  const [color, setColor] = useState<string>("#FBE161");
  const [formColor, setFormColor] = useState<string>("Transparent")

  const colors = [
    { name: "Vermelho", hex: "#F18383" },
    { name: "Verde", hex: "#84F381" },
    { name: "Azul", hex: "#7766F6" },
    { name: "Amarelo", hex: "#FBE161" },
    { name: "Laranja", hex: "#F2A960" },
    { name: "Rosa", hex: "#F789F2" },
    { name: "Roxo", hex: "#D27CD6" },
    { name: "Branco", hex: "#FFFFFF" },
    { name: "Cinza", hex: "#A2ADB0" },
  ];

  const aoSubmeter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newData = data.split('-').reverse().join('/');
    aoCadastrar({
      id: uuid(),
      newData,
      task,
      color,
    });
    setFormColor("Transparent");
    setData("");
    setTask("");
  };

  const handleColorClick = (hex: string) => {
    setColor(hex);
    setFormColor(hex);
  };

  return (
    <form className="formTask" onSubmit={aoSubmeter} style={{backgroundColor:formColor}}>
      <h1 style={{ alignSelf: "center" }}>Create a post-it</h1>
      <label>Datatime:</label>
      <input
        type="date"
        className="dateTask"
        value={data}
        onChange={(evento) => setData(evento.target.value)}
        required
      />
      <label>Task:</label>
      <textarea
        className="textTask"
        cols={30}
        rows={10}
        value={task}
        onChange={(evento) => setTask(evento.target.value)}
        required
      ></textarea>
      <label>Select a color:</label>
      <div className="buttonContainer">
        {colors.map((color, index) => (
          <button
            key={index}
            className="buttonColor"
            type="button"
            style={{ backgroundColor: color.hex }}
            onClick={() => handleColorClick(color.hex)}
          ></button>
        ))}
      </div>
      <div className="buttons">
        <button type="submit" className="formButton add">
          <MdPostAdd className="deleteIcon"/>
        </button>
        <button type="button" className="formButton delete" onClick={() => deletarTudo()}>
        <MdDeleteForever className="deleteIcon"/>
      </button>
      </div>
    </form>
  );
};

export default FormTask;
