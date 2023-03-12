import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";



function Donate(props) {

    const { project } = props;

    //State
    const [pledgeDetails, setpledgeDetails] = useState({
        // default values 
        amount: "",
        comment: "",
        anonymous: false,
    });

    //Hooks
    const navigate = useNavigate(); //using the function use Navigate from react-router-dom.
    const { id } = useParams();
    //Actions
    //everytime input changes, it calls this function called handleChange. 
    //whenever we call this function, an event is passed through it. The target is the input (username,password input)
    // id=username, value=kimghwjd
    const handleChange = (event) => {
        const { name, value } = event.target;
        // we are taking the id and value out of the input. 

        setpledgeDetails((pledgeDetails) => ({
            ...pledgeDetails, ///... doesn't give nested objects
            [name]: value,
            supporter: 1,

        }));
    };

    // const postData = async () => { //we are using async as we are doing await first
    //     const response = await fetch(
    //       `${import.meta.env.VITE_API_URL}pledges/`,
    //       {
    //         method: "post",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(pledgeDetails),
    //       }
    //     );
    //     return response.json();
    //   };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const authToken = window.localStorage.getItem("token");

        if (authToken) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}pledges/`,
                    {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Token ${authToken}`,
                        },
                        body: JSON.stringify({ ...pledgeDetails, project: id }),
                    }
                );
                navigate(`/thankyou`);
            } catch (err) {
                console.error(err);
            }
        } else {
            navigate(`/login`);

        };
    };

    //if creating new pledge then return:

    return (

        <form className="pledgeform" onSubmit={handleSubmit}>
            <div>
                <h3>Make your donation:</h3>
                <label htmlFor="amount">Amount:</label>
                <input className="field"
                    type="number"
                    id="amount"
                    name="amount"
                    onChange={handleChange}
                    placeholder="Enter Amount"
                />
            </div>
            <div>
                <label htmlFor="comment">Comment:</label>
                <input className="field"
                    type="text"
                    id="comment"
                    onChange={handleChange}
                    placeholder="Add a Comment"
                    name="comment"
                />
            </div>
            <div>
                <label htmlFor="Project">Choose the Project:</label>
                <input className="field"
                    type="Number"
                    id="project"
                    onChange={handleChange}
                    placeholder="Add Project Number"
                />
            </div>
            <div className="options">
                <label htmlFor="Anonymous">Would you like to stay Anonymous:</label>
                <input
                    type="radio"
                    id="anonymous"
                    onChange={handleChange}
                    value="True"
                    name="anonymous"
                />
                <label htmlFor="yes">Yes</label>
            </div>
            <button className="submitbutton" type="submit">
                Donate
            </button>
        </form>
    );
}

//if editing a form, then return below:
export default Donate;