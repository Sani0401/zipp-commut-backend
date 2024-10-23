import supabase from "../../config/supabaseConfig.js";

const getAllEmployees = async (req, res) => {
  try {
    const { enterpriseId } = req.query; // Assuming enterpriseId is sent in the request body
    console.log("Request received!", enterpriseId);

    // Query to get all userIds from enterprise_user_details for the given enterpriseId
    const { data: userIdsData, error: userIdsError } = await supabase
      .from("enterprise_employee_details")
      .select("user_id")
      .eq("enterprise_id", enterpriseId);

    if (userIdsError) {
      console.error("Error fetching user IDs: ", userIdsError);
      return res.status(400).json({ message: "Failed to get user IDs" });
    }

    if (userIdsData.length === 0) {
      return res.status(404).json({ message: "No employees found for this enterprise" });
    }

    // Extract all the user IDs
    const userIds = userIdsData.map((item) => item.user_id);

    // Query to get user details for all the userIds from user_details
    const { data: userDetailsData, error: userDetailsError } = await supabase
      .from("user_details")
      .select("*")
      .in("user_id", userIds); // Assuming 'id' is the primary key in user_details table

    if (userDetailsError) {
      console.error("Error fetching user details: ", userDetailsError);
      return res.status(400).json({ message: "Failed to get user details" });
    }

    return res.status(200).json({ employees: userDetailsData });
  } catch (error) {
    console.error("Something went wrong: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getAllEmployees;
