import React, { useState } from "react";
import axios from "axios";

const Create = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    fatherName: "",
    grandFatherName: "",
    familyName: "",
    gender: "",
    typeOfIdentification: "",
    idNumber: "",
    staffType: "",
    contactNumber: "",
    employeeNumber: "",
    age: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://child.care.selsla.net/api/staff/create",
        formData
      );
      console.log("Staff created successfully");
      alert("Staff created successfully")
    } catch (error) {
      console.error("Error creating staff:", error);
      alert("Error creating staff")
    }
  };

  return (
    <div className="container text-center">
      <h1>Create page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="fatherName"
          placeholder="Father's Name"
          value={formData.fatherName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="grandFatherName"
          placeholder="Grandfather's Name"
          value={formData.grandFatherName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="familyName"
          placeholder="Family Name"
          value={formData.familyName}
          onChange={handleChange}
          required
        />
        <br />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <br />
        <select
          name="typeOfIdentification"
          value={formData.typeOfIdentification}
          onChange={handleChange}
          required
        >
          <option value="">Select Type of Identification</option>
          <option value="Passport">Passport</option>
          <option value="ID Card">ID Card</option>
          <option value="Driver's License">Driver's License</option>
        </select>
        <br />
        <input
          type="text"
          name="idNumber"
          placeholder="ID Number"
          value={formData.idNumber}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="staffType"
          placeholder="Staff Type"
          value={formData.staffType}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="employeeNumber"
          placeholder="Employee Number"
          value={formData.employeeNumber}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <br /><br />
        <button className="btn btn-primary" type="submit">Submit</button>
        
      </form>
    </div>
  );
};

export default Create;


