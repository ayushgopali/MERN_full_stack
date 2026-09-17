import { Link } from "react-router-dom";

function TaskCard(props) {
    return (
        <div className={`task-card ${props.status === "Completed" ? "status-completed" : "status-pending"}`}>
            <h3>{props.title}</h3>

            <p>{props.description}</p>

            <p className={`status-badge ${props.status === "Completed" ? "status-completed" : "status-pending"}`}>{props.status}</p>
            <button onClick={props.onToggle}>
                Change Status
            </button>
            <button onClick={props.onDelete}>
                Delete
            </button>
            <Link to={`/tasks/${props.id}`}>
                View Details
            </Link>
        </div>
    );
}

export default TaskCard;