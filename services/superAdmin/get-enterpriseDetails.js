const getEnterpriseDetails = (req, res) => {
    try {
        console.log("This is the params: ", req.body);
        
      const { enterpriseId } = req.params;
      console.log("This is the enterprise ID:", enterpriseId);
  

  
      res.status(200).json({ message: "Enterprise ID received", req });
    } catch (error) {
      console.error("Error fetching enterprise details:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  export default getEnterpriseDetails;
  