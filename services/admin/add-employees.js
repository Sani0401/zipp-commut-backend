import supabase from "../../config/supabaseConfig.js";
import encryptPassword from "../../helper/auth/encrypPassword.js";
import validateEmail from "../../helper/auth/validateEmail.js";

const addEmployees = async (req, res) => {
  try {
    const {
      employeeName,
      employeeEmail,
      dateOfJoining,
      gender,
      workLocation,
      address,
      enterpriseId
    } = req.body;
    
    const { firstName, middleName, lastName } = employeeName;
    const validatedEmail = validateEmail(employeeEmail);
    const encryptedPassword = await encryptPassword("testPassword");
    console.log("This si encrypted password: ", encryptedPassword);
    
    // Insert employee details into the user_details table
    const { data: userData, error: userError } = await supabase
      .from("user_details")
      .insert({
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        date_of_joining: dateOfJoining,
        gender: gender,
        work_location: workLocation,
        address: address,
        email: validatedEmail,
        password: encryptedPassword,
        role:"employee",
        
      })
      .select();  // Use select() to return the inserted row

    if (userError) {
      console.log("Error adding employee data: ", userError);
      return res.status(400).json({ message: "Employee Not Created!" });
    }

    // Get the userId from the inserted user details
    const userId = userData[0].user_id;

    // Insert userId and enterpriseId into the enterprise_employee table
    const { data: enterpriseData, error: enterpriseError } = await supabase
      .from("enterprise_employee_details")
      .insert({
        user_id: userId,
        enterprise_id: enterpriseId
      });

    if (enterpriseError) {
      console.log("Error adding enterprise employee data: ", enterpriseError);
      return res.status(400).json({ message: "Employee Created but failed to link with enterprise!" });
    }

    return res.status(201).json({ message: "Employee Created Successfully" });
  } catch (error) {
    console.log("Something went wrong: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default addEmployees;
