import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
function Table() {
  const [userdata, setuserdata] = useState([]);
  const [age, setage] = useState("");
  const [start, setstart] = useState([]);
  const [end, setend] = useState([]);

  const [alluserdata, setalluserdata] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
//using axios
  useEffect(() => {
    axios
      .get("http://localhost:3000/userdata")
      .then((res) => {
        console.log(res);
        setuserdata(res.data);
        setalluserdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSelect = (date) => {
    let filtered = alluserdata.filter((item) => {
      let itemDate = new Date(item.birthDate);
      return (
        itemDate >= date.selection.startDate &&
        itemDate <= date.selection.endDate
      );
    });
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setuserdata(filtered);
    console.log(date);
  };

  const selecionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handlsearch = () => {
    console.log(age);
    const newdata = userdata.filter(
      (person) => person.age >= start && person.age <= end
    );
    setuserdata(newdata);
  };

  const unique = userdata.filter((item) => {
    return item.bloodGroup === "A+";
  });
  const unique1 = userdata.filter((item) => {
    return item.bloodGroup === "A−";
  });
  const unique2 = userdata.filter((item) => {
    return item.bloodGroup === "B+";
  });
  const unique3 = userdata.filter((item) => {
    return item.bloodGroup === "B−";
  });
  const unique4 = userdata.filter((item) => {
    return item.bloodGroup === "O+";
  });
  const unique5 = userdata.filter((item) => {
    return item.bloodGroup === "O−";
  });
  const unique6 = userdata.filter((item) => {
    return item.bloodGroup === "AB+";
  });
  const unique7 = userdata.filter((item) => {
    return item.bloodGroup === "AB−";
  });

  function startdata(event) {
    setstart(event.target.value);
    console.log(event.target.value);
  }

  function enddata(event) {
    setend(event.target.value);
    console.log(event.target.value);
  }
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-title">
            <h2 className="h1">Employee Data</h2>
          </div>
          <div className="card-body"></div>

          <table>
            <tr>
              <td className="btn btn-success">
                Total Users are: {userdata.length}
              </td>

              <td className="btn btn-danger">
                Total A+ Blood Groups are: {unique.length}
              </td>
              <td className="btn btn-danger ">
                Total A- Blood Groups are: {unique1.length}
              </td>
              <td className="btn btn-danger ">
                Total B+ Blood Groups are: {unique2.length}
              </td>
              <td className="btn btn-danger ">
                Total B- Blood Groups are: {unique3.length}
              </td>
              <td className="btn btn-danger ">
                Total O+ Blood Groups are: {unique4.length}
              </td>
              <td className="btn btn-danger ">
                Total O- Blood Groups are: {unique5.length}
              </td>
              <td className="btn btn-danger ">
                Total AB+ Blood Groups are: {unique6.length}
              </td>
              <td className="btn btn-danger ">
                Total AB- Blood Groups are: {unique7.length}
              </td>
            </tr>

            <tr>
              <td className="">Filter By Date
                <div className="APP">
                  <header className="App-header">
                    <DateRangePicker
                      ranges={[selecionRange]}
                      onChange={handleSelect}
                    />
                  </header>
                </div>
              </td>
            </tr>
            <tr>
              <td>Filter By Age
                <form>
                  <input placeholder="From" type="text" onChange={startdata} />
                  <input placeholder="To" type="text" onChange={enddata} />
                </form>
              </td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => handlsearch()}
                >
                  Search
                </button>
              </td>
            </tr>
          </table>
          <table className="table table-bordered">
            <thead>
              <tr className="head">
                <td>ID</td>
                <td>Name</td>
                <td>Image</td>
                <td>Date Of Birth</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Age</td>
                <td>Blood Group</td>
                <td>Address</td>
              </tr>
            </thead>
            <tbody>
              {userdata &&
                userdata

                  .sort((a, b) => (a.firstName > b.firstName ? 1 : -1))
                  .map((item) => {
                    return (
                      <tr key={item.id} className="body">
                        <td>{item.id}</td>
                        <td>
                          {item.firstName} {item.lastName}
                        </td>
                        <td>
                          <img
                            className="center"
                            src={item.image}
                            width={70}
                            height={70}
                          ></img>
                        </td>
                        <td>{item.birthDate}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.age}</td>
                        <td>{item.bloodGroup}</td>
                        <td>{item.address.address}</td>
                      </tr>
                    );
                  })}
              <tr>
                <td colSpan={9}>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Table;
