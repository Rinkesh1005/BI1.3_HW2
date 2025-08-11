const express = require("express");
const app = express();

const cors = require("cors");

const corsOption = {
  origin: "*",
};

app.use(cors(corsOption));

const Hotel = require("./models/hotel.models");
const { initializeDatabase } = require("./db/db.connect");

app.use(express.json());

initializeDatabase();

const addNewHotelData = async (hotelData) => {
  try {
    const hotel = new Hotel(hotelData);
    await hotel.save();
    return hotel;
  } catch (error) {
    console.error("Error inserting hotel:", error.message);
    throw error;
  }
};

app.post("/hotels", async (req, res) => {
  try {
    const savedHotel = await addNewHotelData(req.body);
    res.status(201).json({
      message: "Hotel added successfully",
      hotel: savedHotel,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add hotel" });
  }
});

// to get all hotels

const getAllHotels = async () => {
  try {
    const hotels = await Hotel.find();
    return hotels;
  } catch (error) {
    console.error(error);
  }
};

app.get("/hotels", async (req, res) => {
  try {
    const hotels = await getAllHotels();
    if (hotels.length !== 0) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: "No hotels found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels." });
  }
});

// to get hotel by name

const getHotelByName = async (hotelName) => {
  try {
    const hotel = await Hotel.findOne({ name: hotelName });
    return hotel;
  } catch (error) {
    console.error(error);
  }
};

app.get("/hotels/:hotelName", async (req, res) => {
  try {
    const hotel = await getHotelByName(req.params.hotelName);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "Hotel not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel." });
  }
});

// to get hotels by category

const getHotelsByCategory = async (category) => {
  try {
    const hotels = await Hotel.find({ category });
    return hotels;
  } catch (error) {
    console.error(error);
  }
};

app.get("/hotels/category/:hotelCategory", async (req, res) => {
  try {
    const hotels = await getHotelsByCategory(req.params.hotelCategory);
    if (hotels.length !== 0) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: "Hotels not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels by category." });
  }
});

// to get hotels by rating
const getHotelsByRating = async (rating) => {
  try {
    const hotels = await Hotel.find({ rating });
    return hotels;
  } catch (error) {
    console.error(error);
  }
};

app.get("/hotels/rating/:hotelRating", async (req, res) => {
  try {
    const hotels = await getHotelsByRating(Number(req.params.hotelRating));
    if (hotels.length !== 0) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: "Hotels not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels by rating." });
  }
});

// to get hotels by phone number
const getHotelByPhoneNumber = async (phoneNumber) => {
  try {
    const hotel = await Hotel.findOne({ phoneNumber });
    return hotel;
  } catch (error) {
    console.error(error);
  }
};

app.get("/hotels/directory/:phoneNumber", async (req, res) => {
  try {
    const hotel = await getHotelByPhoneNumber(req.params.phoneNumber);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "Hotel not found by phone number." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel by phone number." });
  }
});

async function deleteHotel(hotelId) {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
    return deletedHotel;
  } catch (error) {
    console.log(error);
  }
}

app.delete("/hotels/:hotelId", async (req, res) => {
  try {
    const deletedHotel = await deleteHotel(req.params.hotelId);
    if (deletedHotel) {
      res.status(200).json({ message: "Hotel deleted successfully." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete hotel." });
  }
});

async function updateHotel(hotelId, dataToUpdate) {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, dataToUpdate, {
      new: true,
    });
    return updatedHotel;
  } catch (error) {
    console.log("Error in updating hotel rating", error);
  }
}

app.post("/hotels/:hotelId", async (req, res) => {
  try {
    const updatedHotel = await updateHotel(req.params.hotelId, req.body);
    if (updatedHotel) {
      res.status(200).json({
        message: "Hotel rating updated successfully.",
        updatedHotel: updatedHotel,
      });
    } else {
      res.status(404).json({ message: "Hotel not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update hotel rating." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
