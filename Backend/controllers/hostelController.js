import Hostel from '../Models/Hostel.js';
export  const getHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.status(200).json(hostels);
  } catch (error) {
    res.status(400).json({
      success: false,
      Reason: error,
    });
  }
};

export  const addHostel = async (req, res) => {
  try {
    const { name, location, type, price, shuttle, comment } = req.body;
        const exists =await Hostel.findOne({name})
        if(exists){
          return res.status(400).json("Hostel already exists rename to save")
        }


    if (!name || !location || !price || !type || !shuttle) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }
    

    const newHostel = await Hostel.create(req.body);
    res.status(201).json({
      success: true,
      data: newHostel,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Server Error: Could not add hostel.',
      reason: error
    });
  }
};

