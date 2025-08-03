const db = require("../models");
const Users = db.Users;
const Address = db.Address
const {updateSchema} = require("../validations/userValidations")

module.exports.updateProfile = async (req, res) => {
  const userIdFromToken = req.user.id;
  const userIdFromParams = parseInt(req.params.userId);

  if (userIdFromToken !== userIdFromParams) {
    return res.status(403).json({ error: "Unauthorized access to this profile." });
  }

  const { error } = updateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ validationError: error.details[0].message });
  }

  const { name, username, companyName, gender, street, district, state, pincode, country } = req.body;

  try {
    await Users.update(
      { name, username, companyName, gender },
      { where: { id: userIdFromParams } }
    );

    const address = await Address.findOne({ where: { userId: userIdFromParams } });

    if (address) {
      await address.update({ street, district, state, pincode, country });
    } else {
      await Address.create({ userId: userIdFromParams, street, district, state, pincode, country });
    }

    return res.status(200).json({ success: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};