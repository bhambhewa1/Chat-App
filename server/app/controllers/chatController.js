const chatModel = require('../models/chatModel')

// createChat
// findUserChat
// findChat

const createChat = async (req, res) => {
    try {
        const { firstId, secondId } = req.body;
        let chat = chatModel.findOne({
            members: { $all: { firstId, secondId } }
        })
        if (chat) return res.json(chat);

        const newChat = chatModel({ members: { firstId, secondId } });
        chat = await newChat.save();
        res.json(chat);

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ Error: error });
    }
}

const findUserChat = async (req, res) => {
    try {
        const userId = req.params.userId;
        let chats = chatModel.findOne({
            members: { $in: userId }
        })
        res.json(chats);

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ Error: error });
    }
}

const findChat = async (req, res) => {
    try {
        const { firstId, secondId } = req.params;
        let chat = chatModel.findOne({
            members: { $all: { firstId, secondId } }
        })
        res.json(chat);

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ Error: error });
    }
}

module.exports = { createChat, findUserChat, findChat };