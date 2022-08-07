const SearchBar = () => {
    return (
        <div className="d-flex justify-content-center">
            <div style={{ position: 'relative' }}>
                <img src={require('../assets/icons/search.png')} alt="Search" style={{ position: 'absolute', top: '27%', left: '5%', width: 17 }} />
                <input placeholder="Name" className="py-2 px-5 rounded " />
            </div>
        </div>);
}

export default SearchBar;