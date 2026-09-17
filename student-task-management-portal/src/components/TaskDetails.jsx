import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
function TaskDetails(props){
   const { id } = useParams();
   const [task, setTask] = useState(() =>
     props.tasks.find((t) => t._id === id) || null
   );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/tasks/${id}`)
      .then((response) => {
        if (!response.ok) { 
          throw new Error("Task Not Found");
        }
        return response.json();
      })
      .then((data) => {
        setTask(data); 
      })
      .catch((error) => {
        console.log(error);
        setTask(null); // Clear data ONLY if an error actually happens
      })
      .finally(() => {
        setLoading(false); // FIXED: Only turn off the loading screen here!
      });
  }, [id]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if(!task){
        return <h2> Task not found </h2>
    }
    
    return (
        <div>
            <h1>Task Details</h1>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p className="task-id">Task ID: {task._id}</p>
            <p className={`status-badge ${task.status === "Completed" ? "status-completed" : "status-pending"}`}>{task.status}</p>
        </div>
    );
}
export default TaskDetails;
