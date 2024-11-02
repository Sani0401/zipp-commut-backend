import supabase from "../../config/supabaseConfig.js";

const getRoaster = async (req, res) => {
  try {
    const enterpriseId = req.query.enterpriseId;

    if (!enterpriseId) {
      return res.status(400).json({ error: "Enterprise ID is required" });
    }

    const { data, error } = await supabase
      .from("employee_roaster")
      .select("*")
      .eq("enterprise_id", enterpriseId);

    if (error) {
      console.error("Error fetching roaster data:", error);
      return res.status(500).json({ error: "Failed to fetch roaster data" });
    }

    // Group data by roaster_id
    const groupedData = data.reduce((acc, roaster) => {
      const { roaster_id } = roaster;
      if (!acc[roaster_id]) {
        acc[roaster_id] = [];
      }
      acc[roaster_id].push(roaster);
      return acc;
    }, {});

    // Optionally, convert the grouped data to an array of objects
    const responseArray = Object.keys(groupedData).map((roasterId) => ({
      roaster_id: roasterId,
      roasters: groupedData[roasterId],
    }));

    console.log("Grouped roaster data by roaster_id:", responseArray);
    res.status(200).json(responseArray); // Send grouped data as JSON response
  } catch (error) {
    console.error("Unexpected error in getRoaster:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export default getRoaster;
