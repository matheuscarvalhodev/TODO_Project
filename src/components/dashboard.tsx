import CardTask from "./cardTask";
import "../styles/dashboard.css"
import {ImArrowLeft} from "react-icons/im"

interface Task{
    id:string,
    newData:string,
    task:string,
    color:string,
  }

interface DashboardProps{
    tasks:Task[],
    aoDeletar:(id:string) => void;
    aoAtualizar: (id: string, newText: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({tasks, aoDeletar, aoAtualizar}) => {
    return (
        <div className="dashboard">
            <div className="cards">
                {tasks.length === 0 ? <div className="empty"><img src="../post-it.png" alt="" />
                <div className="arrow">
                    <ImArrowLeft size={50}/>
                    <h2>Create a new post it</h2>
                </div><h1>Dashboard empty</h1></div> : tasks.map(task => (
                    <CardTask key={task.id} id={task.id} task={task.task} newData={task.newData} color={task.color} aoDeletar={aoDeletar} aoAtualizar={aoAtualizar}/>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;