import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const GetAll = () => {
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://child.care.selsla.net/api/staff/getAll");
        setStaffData(response.data.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching staff data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>GetAll page</h1>
      <div>
        {staffData.map((staff, index) => (
          <div key={index}>
            <h3>
              {staff.firstName} {staff.familyName}
            </h3>
            {/* <Link to={`/getbyid/${staff.id}`}>click me</Link> */}
            <p>Father's Name: {staff.idNumber}</p>
            <p>Gender: {staff.gender}</p>
            <p>Type of Identification: {staff.typeOfIdentification}</p>
            <p>ID Number: {staff.idNumber}</p>
            <p>Staff Type: {staff.staffType}</p>
            <p>Contact Number: {staff.contactNumber}</p>
            <p>Employee Number: {staff.employeeNumber}</p>
            <p>Age: {staff.age}</p>
           
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAll;
