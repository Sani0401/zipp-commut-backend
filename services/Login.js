import supabase from "../config/supabaseConfig.js";
import helper from "../exports/Helpers.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET; // Replace with your actual secret key

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("This is the email: ", req.body.email);
    console.log("This is the password: ", req.body.password);

    // Supabase query to get user details
    const { data: userData, error: userDataError } = await supabase
      .from("user_details")
      .select()
      .eq("email", email)
      .single();

    if (userDataError) {
      console.log("This is the user data error: ", userDataError);
      return res.status(400).json({
        message: "User not found or some error occurred",
        error: userDataError,
      });
    }

    // Verify password
    const checkPassword = await helper.verifyPassword(
      password,
      userData.password
    );
    if (!checkPassword) {
      return res
        .status(400)
        .json({ message: "Authentication Failed, check Email or Password" });
    }
    console.log("This is the user data: ", userData);

    // Supabase query to get enterprise details using userId
    const { data: enterpriseDetails, error: enterpriseError } = await supabase
      .from("enterprise_details")
      .select()
      .eq("admin_id", userData.user_id)
      .single();

    if (enterpriseError) {
      console.log("This is the enterprise data error: ", enterpriseError);
      return res.status(400).json({
        message: "Enterprise details not found",
        error: enterpriseError,
      });
    }

    // Create JWT payload
    const payload = {
      enterpriseDetails: {
        enterpriseName: enterpriseDetails.enterprise_name,
        location: enterpriseDetails.location,
        state: enterpriseDetails.state,
        country: enterpriseDetails.country,
        industry: enterpriseDetails.industry,
        no_of_employees: enterpriseDetails.no_of_employees,
        adminID: enterpriseDetails.admin_id,
        enterpriseId: enterpriseDetails.enterprise_id,
      },
      userDetails: {
        user_id: userData.user_id,
        created_at: userData.created_at,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        phone_number: userData.phone_number,
        city: userData.city,
        state: userData.state,
        country: userData.country,
        role: userData.role,
      },
    };

    // Set token expiration (e.g., 1 hour)
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });

    if ((userData.role == "super_admin")) {
      return res.status(200).json({
        message: "Login successful",
        userToken: token,
        isSuperAdmin: 1,
      });
    }

    // Send the JWT token as a response
    return res.status(200).json({
      message: "Login successful",
      userToken: token,
    });
  } catch (error) {
    console.log("Error during login: ", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export default Login;
