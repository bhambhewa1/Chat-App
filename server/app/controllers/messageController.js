const messageModel = require("../models/messageModel");

// createMessage
const createMessage = async (req, res) => {
  try {
    const { chatId, senderId, text } = req.body;
    let message = new messageModel({
      chatId,
      senderId,
      text,
    });
    message = await message.save();
    res.json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: error });
  }
};

// getMessages
const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = messageModel.find({ chatId });
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: error });
  }
};

module.exports = { createMessage, getMessages };
