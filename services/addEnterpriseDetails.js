import supabase from "../config/supabaseConfig.js";
import jwt from "jsonwebtoken";

const addEnterpriseDetails = async (req, res) => {
  try {
    const {
      enterpriseName,
      location,
      state,
      country,
      industry,
      no_of_employees,
      adminID,
    } = req.body;
let JWT_SECRET = "testSecret"
    // Insert enterprise details
    const { error: insertError } = await supabase
      .from("enterprise_details")
      .insert({
        enterprise_name: enterpriseName,
        location,
        state,
        country,
        industry,
        number_of_employees: no_of_employees,
        admin_id: adminID,
      });

    if (insertError) {
      console.log("Error inserting the enterprise details: ", insertError);
      return res
        .status(400)
        .json({ message: "Error adding enterprise details", error: insertError });
    }

    // Fetch user details based on adminID from userDetails table
    const { data: userDetails, error: userError } = await supabase
      .from("user_details")
      .select("*")
      .eq("user_id", adminID)
      .single(); // Ensure we fetch only one user detail

    if (userError || !userDetails) {
      console.log("Error fetching user details: ", userError);
      return res.status(400).json({ message: "Error fetching user details", error: userError });
    }

    // Combine the enterprise and user details in a JWT payload
    const tokenPayload = {
      enterpriseDetails: {
        enterpriseName,
        location,
        state,
        country,
        industry,
        no_of_employees,
        adminID,
      },
      userDetails,
    };

    // Sign the JWT token (using your secret key) with 30-day expiration
    const token = jwt.sign(tokenPayload,JWT_SECRET, {
      expiresIn: "30d", // Token will expire in 30 days
    });

    // Return the JWT
    return res.status(200).json({ message: "Enterprise details saved!", token });
  } catch (error) {
    console.log("Something went wrong: ", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default addEnterpriseDetails;
