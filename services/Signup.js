import helper from "../exports/Helpers.js";
import supabase from "../config/supabaseConfig.js";

const Signup = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
      phone_number,
      city,
      state,
      country,
    } = req.body;

    // Check if passwords match
    if (password !== confirm_password) {
      return res
        .status(400)
        .json({ message: "Password and confirm password don't match" });
    }

    // Validate email and encrypt password
    const validEmail = await helper.validateEmail(email);
    const encryptedPassword = await helper.encryptPassword(password);
    console.log("This is the encrypted password: ", encryptedPassword);

    // Insert data into user_details table
    const { data, error } = await supabase
      .from("user_details")
      .insert({
        first_name,
        last_name,
        email: validEmail,
        password: encryptedPassword,
        phone_number,
        city,
        state,
        country,
        role: "admin",
      })
      .select(); // Use .select() to return the inserted data, including the user_id

    if (error) {
      console.log("Error inserting the user data into the table: ", error);
      return res.status(400).json({ message: "Error creating user", error });
    }

    // Assuming the user_id is part of the returned data
    const userId = data[0].user_id; // user_id should be available in the first element of the returned array
    console.log("This is the created data: ", userId);

    // Return userId and success message
    return res.status(200).json({
      message: "User Data added successfully",
      userId,
    
    });
  } catch (error) {
    console.log("Something went wrong: ", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export default Signup;
