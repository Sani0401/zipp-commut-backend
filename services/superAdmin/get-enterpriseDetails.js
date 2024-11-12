import supabase from "../../config/supabaseConfig.js";

const getEnterpriseDetails = async (req, res) => {
  try {
    const { enterpriseId } = req.body;
    const response = {}
    const { data, error } = await supabase
    .from("enterprise_details")
      .select()
      .eq("enterprise_id", enterpriseId).single();
    if (error) {
      return res
        .status(400)
        .json({ message: "Error getting the enterprise details", error });
    }
    console.log("This is the etnerprise details: ", data);
    response.enterpriseName = data.enterprise_name;
    response.enterpriseLocation = data.location;
    response.enterpriseState = data.state;
    response.enterpriseCountry = data.country;
    response.enterpriseEmployeeCount = data.number_of_employees;

    res.status(200).json({ message: "Data recieved sucessfully", data: response });
  } catch (error) {
    console.error("Error fetching enterprise details:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export default getEnterpriseDetails;
