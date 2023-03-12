import { Link } from "react-router-dom";

// CSS
import "./ProjectCard.css";

function ProjectCard(props) {
    const { projectData } = props;

    return (
        <div className="project-card">
            <Link className="project-card-link" to={`/project/${projectData.id}`}>
                <img className="project-card-img" src={projectData.image} />
                <h3 className="project-card-name">{projectData.title}</h3>
            </Link>
        </div>
    );
}

export default ProjectCard;