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
    if (password != confirm_password) {
      return res
        .status(400)
        .json({ message: "Password and confirm passord don't match" });
    }
    const validEmail = await helper.validateEmail(email);
    const encryptedPassword = await helper.encryptPassword(password);
console.log("This is the encrypted password: ", encryptedPassword);

    const { error } = await supabase.from("user_details").insert({
      first_name,
      last_name,
      email: validEmail,
      password: encryptedPassword,
      phone_number,
      city,
      state,
      country,
      role: "admin",
    });
    if (error) {
      console.log("error insertin the user data in the table: ", error);
      return res.status(400).json({ message: "Error creating user", error });
    }
    return res.status(200).json({ message: "User Data added sucessfully" });
  } catch (error) {
    console.log("Something went wrong: ", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
export default Signup;
