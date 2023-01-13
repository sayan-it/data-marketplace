import { useState } from "react";
import axios from "axios";

export default function DataFilterForm() {
  const table = [
    "customer",
    "inventory",
    "order",
    "products",
    "shipments",
    "store_order",
  ];

  const [checkedState, setCheckedState] = useState(
    new Array(table.length).fill(false)
  );

  const [search, searchhData] = useState("");
  let [foundrecords, setRecords] = useState([]);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  const handleSearch = (queryText) => {
    axios
      .get(`http://localhost:3200/elastic?text=${queryText}`)
      .then((result) => {
        setRecords(result.data.records);
      })
      .catch((err) => console.log(err.response.data.json()));
  };

  return (
    <div className="row">
      <div className="col-md-3">
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
      <div className="col-md-9">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            name="searchData"
            value={search}
            placeholder="Search Data"
            onChange={(e) => searchhData(e.target.value)}
          />
          <button
            className="btn btn-success"
            onClick={() => handleSearch(search)}
          >
            Search
          </button>
        </div>
        <div>
          {foundrecords.length > 0 ? (
            <div className="table-responsive">
              <table class="table table-striped table-responsive">
                <thead>
                  <tr>
                    {Object.keys(foundrecords[0]).map((ele, ind) => (
                      <th>{ele}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {foundrecords.map((ele, ind) => {
                    return (
                      <tr>
                        {Object.values(ele).map((data, id) => {
                          return typeof data === "boolean" ? (
                            <td>{JSON.stringify(data)}</td>
                          ) : (
                            <td>{data}</td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
