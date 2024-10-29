import { v4 as uuidv4 } from "uuid";
import supabase from "../../config/supabaseConfig.js";
const createRoaster = async (req, res) => {
  try {
    const { employeeDetails, pickupTime, dropTime, enterpriseId } = req.body;

    console.log(req.body);

    const roasterId = uuidv4();
    // Loop through each employee email
    for (const employee of employeeDetails) {
      const email = employee.name;

      // Step 1: Retrieve userId from user_details table
      const { data: user, error: userError } = await supabase
        .from("user_details")
        .select("user_id")
        .eq("email", email)
        .single();

      if (userError || !user) {
        console.log(`User not found for email: ${email}`);
        continue; // Skip this employee if userId not found
      }

      const userId = user.user_id;

      // Step 2: Insert into employee_roaster table
      const { error: insertError } = await supabase
        .from("employee_roaster")
        .insert([
          {
            roaster_id: roasterId,
            enterprise_id: enterpriseId,
            user_id: userId,
            pickup_time: pickupTime,
            drop_time: dropTime,
          },
        ]);

      if (insertError) {
        console.error(
          `Error inserting roaster for userId: ${userId}`,
          insertError
        );
        continue; // Log the error and move to the next employee
      }

      console.log(`Roaster entry created for userId: ${userId}`);
    }

    res.status(200).json({ message: "Roaster created successfully" });
  } catch (error) {
    console.error("Error creating roaster:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default createRoaster;
