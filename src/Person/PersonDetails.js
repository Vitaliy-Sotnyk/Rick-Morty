import { useNavigate } from "react-router-dom";

function PersonDetails({ element }) {
    const navigate = useNavigate();

    const closeDetails = () => {
        navigate('/');
    }
    return (
        <section className='section-person'>
            <button onClick={closeDetails}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z" fill="black" />
                </svg>
                <span>GO BACK</span>
            </button>
            <div className="section-person__info">
                <div className="section-person__info__main">
                    <img src={element.image} alt={element.name} />
                    <h2>{element.name}</h2>
                </div>
                <div className="section-person__info__details">
                    <h3>Informations</h3>
                    <ul>
                        <li>
                            Gender
                            <p>{element.gender}</p>
                        </li>
                        <li>
                            Status
                            <p>{element.status}</p>
                        </li>
                        <li>
                            Species
                            <p>{element.species}</p>
                        </li>
                        <li>
                            Origin
                            <p>{element.origin.name}</p>
                        </li>
                        <li>
                            Type
                            <p>{element.type ? element.type : "Unknown"}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default PersonDetails;
