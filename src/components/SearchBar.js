import { useState } from 'react'

const SearchBar = () => {
    const [query, setquery] = useState("");

    return (
        <div className="d-flex justify-content-center">
            <div style={{ position: 'relative' }}>
                <img src={require('./assets/icons/search.png')} alt="Search" style={{ position: 'absolute', top: '27%', left: '5%', width: 17 }} />
                <input
                    placeholder="Search by name or type"
                    className="py-2 px-5 rounded "
                    onChange={e => setquery(e.target.value)}
                />
            </div>
        </div>
    )
}

export default SearchBar;