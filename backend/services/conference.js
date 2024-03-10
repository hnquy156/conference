const Conference = require('../models/conference');

const getConferences = () => {
  return Conference.find({ is_deleted: false });
};

const addConference = (data) => {
  const conf = new Conference(data);
  return conf.save();
};

const updateConference = (id, data) => {
  return Conference.findByIdAndUpdate(id, data);
};

const deleteConference = (id) => {
  return Conference.findByIdAndUpdate(id, { is_deleted: true });
};

module.exports = {
  getConferences,
  addConference,
  updateConference,
  deleteConference,
};
