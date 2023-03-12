import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PledgeForm from "../components/PledgeForm/PledgeForm";


function ProjectPage() {
    // State
    const [projectData, setProjectData] = useState({ pledges: [] });

    // Hooks
    const { id } = useParams();



    // Effects
    // useEffect(() => {
    //   fetch(`${import.meta.env.VITE_API_URL}projects/${id}`)
    //     .then((results) => {
    //       return results.json();
    //     })
    //     .then((data) => {
    //       setProjectData(data);
    //     });
    // }, []);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}projects/${id}`
                );
                console.log(res);
                const data = await res.json();
                setProjectData(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProject();
    }, []);

    return (
        <div className="project-details">
            <h2>{projectData.title}</h2>
            <h3 className="descrip">{projectData.description}</h3>
            <PledgeForm />
            <h3>Current Donations:</h3>
            <ul>
                {projectData.pledges.map((pledgeData, key) => {
                    return (
                        <li key={key}>
                            {pledgeData.amount} from {pledgeData.supporter}
                        </li>
                    );
                })}
            </ul>

        </div>
    );
}

export default ProjectPage;