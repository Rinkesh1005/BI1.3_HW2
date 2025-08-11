import { useState } from "react";
import useFetch from "../useFetch";

const Hotels = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const { data, loading, error } = useFetch(
    "https://bi-1-3-hw-2-backend-seven.vercel.app/hotels"
  );

  const handleDelete = async (hotelId) => {
    try {
      const response = await fetch(
        `https://bi-1-3-hw-2-backend-seven.vercel.app/hotels/${hotelId}`,
        {
          method: "DELETE",
          "Content-Type": "application/json",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete hotel");
      }
      const data = await response.json();
      if (data) {
        setSuccessMessage("Hotel deleted successfully.");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <h2>List of Hotels</h2>
      <ul>
        {data &&
          data.map((hotel) => (
            <li key={hotel._id}>
              {" "}
              {hotel.name}{" "}
              <button onClick={() => handleDelete(hotel._id)}>Delete</button>
            </li>
          ))}
        <p>{successMessage}</p>
      </ul>
    </div>
  );
};

export default Hotels;
