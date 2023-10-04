import "../styles/cardTask.css"
import React, { useState, useRef, useEffect } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

interface Task {
  id: string;
  newData: string;
  task: string;
  color: string;
  aoDeletar: (id: string) => void;
  aoAtualizar: (id: string, newText: string) => void;
}

const CardTask: React.FC<Task> = ({ id, newData, task, color, aoDeletar, aoAtualizar }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task);

  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleCardClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    aoAtualizar(id, e.target.value); // Chamando a função aoAtualizar passando o id da tarefa e o novo texto
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="cardContainer">
      <div className="backCard"></div>
      <section className="card" onClick={handleCardClick} ref={cardRef} style={{ backgroundColor: color }}>
        <header className="cardHeader">
          <p>{newData}</p>
          <AiOutlinePaperClip className="pin" size={40} />
        </header>
        <div className="cardText">
          {isEditing ? (
            <textarea
              value={text}
              onChange={handleTextChange}
              onBlur={handleBlur}
              className="updateText"
            />
          ) : (
            <p>{text}</p>
          )}
        </div>
        <BsTrash size={25} className="cardDelete" onClick={() => aoDeletar(id)} />
      </section>
    </div>
  );
};

export default CardTask;
