const Conference = require('../models/conference');
const { createConferenceHash } = require('../utils/crypto');

const getConferences = () => {
  return Conference.find({ is_deleted: false });
};

const addConference = (data) => {
  const conf = new Conference(data);
  conf.hash = createConferenceHash(data);
  return conf.save();
};

const updateConference = (id, conf) => {
  conf.hash = createConferenceHash(conf);
  return Conference.findByIdAndUpdate(id, conf);
};

const deleteConference = (id) => {
  return Conference.findByIdAndUpdate(id, { is_deleted: true });
};

const updateChangedConference = async (conf) => {
  const hash = createConferenceHash(conf);
  const currentConf = await Conference.findOne({
    is_deleted: false,
    name: conf.name,
  });

  if (!currentConf) {
    await addConference(conf);
    console.info(
      `Conference added successfully: ${conf.name} --  ${conf.location} -- ${conf.date}`
    );
  } else if (currentConf.hash !== hash) {
    await updateConference(currentConf.id, conf);
    console.info(
      `Conference updated successfully: ${conf.name} --  ${conf.location} -- ${conf.date}`
    );
  }
};

module.exports = {
  getConferences,
  addConference,
  updateConference,
  deleteConference,
  updateChangedConference,
};
