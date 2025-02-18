const Application = require('../models/application');

exports.getApprovedApplications = async (req, res) => {
  try {
    const approvedApplications = await Application.getAll("Approved");
    res.json({ success: true, data: approvedApplications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

exports.getPendingApplications = async (req, res) => {
  try {
    const pendingApplications = await Application.getAll("Pending");
    res.json({ success: true, data: pendingApplications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
