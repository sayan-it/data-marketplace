import { useState } from 'react'
import axios from 'axios'


export default function DataFilterForm() {

    const table = ['customer', 'inventory', 'order', 'products', 'shipments', 'store_order']

    const [checkedState, setCheckedState] = useState(
        new Array(table.length).fill(false)
    );

    const [search, searchhData]=useState('')

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);
    }

    const handleSearch=(queryText)=>{
        axios.get(`http://localhost:3200/elastic?text=${queryText}`).then((result) => {
            const { records } = result.data;
    }).catch (err=> console.log(err.response.data.json()))
    }

    return (
        <div>
            <div className="searchbar">
                <input type="text" name="searchData" value={search} placeholder="Search data" onChange={e=>searchhData(e.target.value)} />
                <button onClick={()=>handleSearch(search)}>Search</button>
            </div>
            <div className="table">
                <h3>Select Data</h3>

                {table.map((ele, index) => {
                    return (

                        <div className="table-list-item">
                            <input
                                type="checkbox"
                                id={`custom-checkbox-${index}`}
                                name={ele}
                                value={ele}
                                checked={checkedState[index]}
                                onChange={() => handleOnChange(index)}
                            />
                            <label htmlFor={`custom-checkbox-${index}`}>{ele}</label>
                        </div>

                    );
                })}

            </div>
        </div>

    );
}
