import supabase from "../../config/supabaseConfig.js";

const getEnterpriseRoaster = async (req, res) => {
  try {
    const { enterpriseID } = req.query;

    if (!enterpriseID) {
      return res.status(400).json({ error: "Enterprise ID is required" });
    }

    console.log("This is the enterprise ID: ", enterpriseID);

    // Fetch data from Supabase
    const { data, error } = await supabase
      .from("employee_roaster")
      .select()
      .eq("enterprise_id", enterpriseID);

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No roasters found for this enterprise." });
    }

    console.log("Fetched enterprise roaster data: ", data);

    // Group data by `roaster_id`
    const groupedRoasters = data.reduce((acc, curr) => {
      const { roaster_id, ...rest } = curr;

      if (!acc[roaster_id]) {
        acc[roaster_id] = {
          roaster_id,
          employees: [],
        };
      }

      acc[roaster_id].employees.push(rest);
      return acc;
    }, {});

    // Convert grouped data into an array
    const response = Object.values(groupedRoasters);

    console.log("Grouped Roasters: ", response);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching enterprise roaster: ", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default getEnterpriseRoaster;
