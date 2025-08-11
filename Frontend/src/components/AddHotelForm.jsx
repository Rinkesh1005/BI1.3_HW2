import { useState } from "react";

const AddHotelForm = () => {
  const [hotel, setHotel] = useState({
    name: "",
    category: "",
    location: "",
    rating: "",
    website: "",
    phoneNumber: "",
    checkInTime: "",
    checkOutTime: "",
    amenities: "",
    priceRange: "",
    reservationsNeeded: false,
    isParkingAvailable: false,
    isWifiAvailable: false,
    isPoolAvailable: false,
    isSpaAvailable: false,
    isRestaurantAvailable: false,
    photos: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHotel({
      ...hotel,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("https://bi-1-3-hw-2-backend-seven.vercel.app/hotels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hotel),
      });
    } catch (error) {
      console.error("Error adding hotel:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Hotel Name:</label>
      <br />
      <input
        type="text"
        name="name"
        value={hotel.name}
        onChange={handleChange}
      />
      <br />
      <br />
      <label>Category:</label>
      <br />
      <input
        type="text"
        name="category"
        value={hotel.category}
        onChange={handleChange}
      />
      <br />
      <br />
      <label>Location:</label>
      <br />
      <input
        type="text"
        name="location"
        value={hotel.location}
        onChange={handleChange}
      />
      <br />
      <br />
      <label>Rating: </label>
      <br />
      <input
        type="number"
        name="rating"
        value={hotel.rating}
        onChange={handleChange}
      />
      <br />
      <br />
      <label>Website:</label>
      <br />
      <input
        type="text"
        name="website"
        value={hotel.website}
        onChange={handleChange}
      />
      <br />
      <br />
      <label>Phone Number:</label>
      <br />
      <input
        type="text"
        name="phoneNumber"
        value={hotel.phoneNumber}
        onChange={handleChange}
      />
      <br />
      <br />
      <label>Checkin Time:</label>
      <br />
      <input
        type="text"
        name="checkInTime"
        value={hotel.checkInTime}
        onChange={handleChange}
      />
      <br />
      <br />
      <label>Checkout Time:</label>
      <br />
      <input
        type="text"
        name="checkOutTime"
        value={hotel.checkOutTime}
        onChange={handleChange}
      />
      <br />
      <br />
      <label>Amenities: </label>
      <br />
      <input
        type="text"
        name="amenities"
        value={hotel.amenities}
        onChange={handleChange}
      />
      <br />
      <br />
      <label>Price Range:</label>
      <br />
      <select
        name="priceRange"
        value={hotel.priceRange}
        onChange={handleChange}
      >
        <option value="">Select Price Range</option>
        <option value="$$ (11-30)">$$ (11-30)</option>
        <option value="$$$ (31-60)">$$$ (31-60)</option>
        <option value="$$$$ (61+)">$$$$ (61+)</option>
        <option value="Other">Other</option>
      </select>
      <br />
      <br />
      <input
        type="checkbox"
        name="reservationsNeeded"
        checked={hotel.reservationsNeeded}
        onChange={handleChange}
      />
      Reservations Needed
      <br />
      <input
        type="checkbox"
        name="isParkingAvailable"
        checked={hotel.isParkingAvailable}
        onChange={handleChange}
      />
      Parking Available
      <br />
      <input
        type="checkbox"
        name="isWifiAvailable"
        checked={hotel.isWifiAvailable}
        onChange={handleChange}
      />
      Wifi Available
      <br />
      <input
        type="checkbox"
        name="isPoolAvailable"
        checked={hotel.isPoolAvailable}
        onChange={handleChange}
      />
      Pool Available
      <br />
      <input
        type="checkbox"
        name="isSpaAvailable"
        checked={hotel.isSpaAvailable}
        onChange={handleChange}
      />
      Spa Available
      <br />
      <input
        type="checkbox"
        name="isRestaurantAvailable"
        checked={hotel.isRestaurantAvailable}
        onChange={handleChange}
      />
      Restaurant Available
      <br />
      <br />
      <label>Photos:</label>
      <input
        type="text"
        name="photos"
        value={hotel.photos}
        onChange={handleChange}
      />
      <br />
      <br />
      <button type="submit">Add Hotel</button>
    </form>
  );
};

export default AddHotelForm;
