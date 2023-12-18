import { useState } from "react";
import "./App.css"

const utility = async(formData) => {
  const{name, email, age, batch} = formData
    // API call
    try {
      const response = await fetch("https://yoga-form-q2wi.onrender.com/userData", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          "name" : name,
          "email" : email,
          "age" : age,
          "batch" : batch
        })
      })
      const data = await response.json();
      if (data.status === 'success') {
        // Payment successful, display a success message
        console.log('Payment successful:', data.message);
      } else {
        // Payment failed, display an error message
        console.error('Payment failed:', data.message);
      }
    } catch (error) {
      console.log('error:', error)
    }

}

export default function App() {
  const [formData, setFormData] = useState({name: "",email: "",age: "", batch: "6-9 AM"});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    utility(formData);
};

  return (
    <>
    <h1>Yoga Training Admission Form</h1>
    <div className="con">
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

        <label htmlFor="age">Age:</label>
        <input type="text" id="age" name="age" value={formData.age} onChange={handleChange} />
        {!(formData.age >= 18 && formData.age <= 65) && formData.age > 0 ? (
          <small style={{ color: 'red' }}>Age must be between 18 to 65</small>
        ) : (
          <small></small>
        )}

        <label htmlFor="SelectBatch">Select Batch:</label>
        <select name="batch" onChange={handleChange}>
          <option value="6-7 AM">6-7 AM</option>
          <option value="7-8 AM">7-8 AM</option>
          <option value="8-9 AM">8-9 AM</option>
          <option value="5-6 PM">5-6 PM</option>
        </select>

        <button
  type="submit"
  disabled={
    !(
      formData.name.trim() &&
      formData.age >= 18 &&
      formData.age <= 65 &&
      formData.batch.trim() &&
      formData.email.trim()
    )
  }
  style={{
    backgroundColor: !(
      formData.name.trim() &&
      formData.age >= 18 &&
      formData.age <= 65 &&
      formData.batch.trim() &&
      formData.email.trim()
    )
      ? 'lightgray'
      : '#0056b3',
    cursor: !(
      formData.name.trim() &&
      formData.age >= 18 &&
      formData.age <= 65 &&
      formData.batch.trim() &&
      formData.email.trim()
    )
      ? 'not-allowed'
      : 'pointer',
  }}
>
  Submit
</button>
      </form>
    </div>
    </>
  );
}