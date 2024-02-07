import React, { useState, useEffect } from "react";
import axios from "axios";
import {useParams } from "react-router-dom";

const GetById = () => {
  const { id } = useParams();
  const [staffData, setStaffData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://child.care.selsla.net/api/staff/getById/${id}`
        );
        setStaffData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching staff data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Include id in the dependency array to refetch data when id changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>GetById page</h1>
      <div>
      
        <h3>
          {staffData.firstName} {staffData.familyName}
        </h3>
       <h1> {id}</h1>
        <p>Father's Name: {staffData.fatherName}</p>
        <p>Gender: {staffData.gender}</p>
        <p>Type of Identification: {staffData.typeOfIdentification}</p>
        <p>ID Number: {staffData.idNumber}</p>
        <p>Staff Type: {staffData.staffType}</p>
        <p>Contact Number: {staffData.contactNumber}</p>
        <p>Employee Number: {staffData.employeeNumber}</p>
        <p>Age: {staffData.age}</p>
      </div>
    </div>
  );
};

export default GetById;
