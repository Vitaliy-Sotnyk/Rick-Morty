import { useNavigate } from "react-router-dom";

function PersonList({ element }) {
    const navigate = useNavigate();

    const openDetails = () => {
        navigate(`${element.name.split(' ').join('_').toLowerCase()}`);
    }
    return (
        <div className="main-section__person-list" onClick={openDetails}>
            <img src={element.image} alt={element.name} />
            <div className="main-section__person-list__info">
                <h3>{element.name}</h3>
                <p>{element.species}</p>
            </div>
        </div>
    );
}

export default PersonList;
