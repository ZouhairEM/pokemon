import avatar from "../assets/icons/missing.svg";

const NotFound = () => {
    return (
        <div className="row pokemon-wrapper justify-content-center align-items-center flex-column">
            <div>
                <img src={avatar} alt="avatar" width={200} className="mb-5" />
                <h2>No Pokémon found</h2>
            </div>
        </div>);
}

export default NotFound;