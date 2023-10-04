import React, { useState, useEffect } from 'react';
import './App.css';
import FormTask from './components/formTask';
import Dashboard from './components/dashboard';

interface Task {
  id: string,
  newData: string,
  task: string,
  color: string
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function deletarTarefa(id: string) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function deletarTudo() {
    setTasks([]);
  }

  function cadastrarTarefa(task: Task) {
    setTasks(prevTasks => [...prevTasks, task]);
  }

  function atualizarTarefa(id: string, newText: string) {
    setTasks(prevTasks => prevTasks.map(task => {
      if (task.id === id) {
        return { ...task, task: newText };
      }
      return task;
    }));
  }

  return (
    <div className="App">
      <FormTask aoCadastrar={cadastrarTarefa} deletarTudo={deletarTudo} />
      <Dashboard tasks={tasks} aoDeletar={deletarTarefa} aoAtualizar={atualizarTarefa} />
    </div>
  );
}

export default App;
