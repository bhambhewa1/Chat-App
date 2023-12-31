const chatModel = require("../models/chatModel");

// createChat
// findUserChat
// findChat

const createChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.body;

    let chat = await chatModel.findOne({
      members: { $all: { firstId, secondId } },
    });
    if (chat) return res.json(chat);

    const newChat = new chatModel({ members: [firstId, secondId] });
    chat = await newChat.save();
    console.log("ram")
    res.json(chat);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ Error: error });
  }
};

const findUserChat = async (req, res) => {
  try {
    const userId = req.params.userId;
    let chats = await chatModel.find({
      members: { $in: userId },
    });    
    // lean() method convert mongoose object into plain javaScript object then easy to change
    // _id is immutable, so if you want to change it then convert its object to plain javaScript
 
    res.json(chats);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ Error: error });
  }
};

const findChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.params;
    let chat = await chatModel.findOne({
      members: { $all: { firstId, secondId } },
    });
    res.json(chat);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ Error: error });
  }
};

module.exports = { createChat, findUserChat, findChat };
