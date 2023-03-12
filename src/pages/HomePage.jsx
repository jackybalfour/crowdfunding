import { useState, useEffect } from "react";

// Components
import ProjectCard from "../components/ProjectCard/ProjectCard";

import video from "../assets/airplane-995.mp4";


function HomePage() {
    // State
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}projects`)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                setProjectList(data);
            });
    }, []);

    return (
        <div>
            <div className="main-container">
                <h1 className="h1-index">IT'S POSSIBLE</h1>
                <video src={video} autoPlay muted loop className="video"></video>
                <p className="text-index">
                    LET'S GET YOU THERE
                </p>
            </div>
            <div>
                <p className="others">You can help others:</p>
                <div id="project-list">
                    {projectList.map((project, key) => {
                        return <ProjectCard key={key} projectData={project} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default HomePage;