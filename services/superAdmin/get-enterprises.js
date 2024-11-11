import supabase from "../../config/supabaseConfig.js";

const getEnterprises = async (req, res) => {
  try {
    // Retrieve all enterprise details
    const { data, error } = await supabase.from("enterprise_details").select();

    if (error) {
      console.error("Error retrieving enterprise details:", error);
      return res.status(400).json({ 
        message: "Cannot retrieve enterprises from the database", 
        error: error.message 
      });
    }

    // Map the data to include only the fields we need
    const filteredData = data.map((enterprise) => ({
      enterpriseId: enterprise.enterprise_id,
      enterpriseName: enterprise.enterprise_name,
      numberOfEmployees: enterprise.number_of_employees,
    }));

    // Send the filtered data as the response
    res.status(200).json({ enterprises: filteredData });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export default getEnterprises;
