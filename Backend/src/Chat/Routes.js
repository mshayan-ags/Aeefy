const { getUserId } = require("../utils");
const { Router } = require("express");
const { AddChat, DeleteChat, GetChat, GetAllChats, GetChatWithPerson } = require("./Function");

const router = Router();

router.post("/AddChat", async (req, res) => {
  try {
    const { id, message } = getUserId(req);
    if (id) {
      const SaveData = await AddChat(req.body, id);
      res.status(SaveData?.status).json(SaveData);
    } else {
      res.status(401).json({ "status": 401, message: message });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ "status": 500, message: error });
  }
});

router.post("/DeleteChat/:id", async (req, res) => {
  try {
    const { id, message } = getUserId(req);
    if (id) {
      const DeleteData = await DeleteChat(req.params.id, id);
      res.status(DeleteData?.status).json(DeleteData);
    } else {
      res.status(401).json({ "status": 401, message: message });
    }
  } catch (error) {
    res.status(500).json({ "status": 500, message: error });
  }
});

router.get("/GetChat/:id", async (req, res) => {
  try {
    const { id, message } = getUserId(req);
    if (id) {
      const GetData = await GetChat(req.params.id, id);
      res.status(GetData?.status).json(GetData);
    } else {
      res.status(401).json({ "status": 401, message: message });
    }
  } catch (error) {
    res.status(500).json({ "status": 500, message: error });
  }
});


router.get("/GetChatWithPerson/:id", async (req, res) => {
  try {
    const { id, message } = getUserId(req);
    if (id) {
      const GetData = await GetChatWithPerson(req.params.id, id);
      res.status(GetData?.status).json(GetData);
    } else {
      res.status(401).json({ "status": 401, message: message });
    }
  } catch (error) {
    res.status(500).json({ "status": 500, message: error });
  }
});

router.get("/GetAllChats", async (req, res) => {
  try {
    const { id, message } = getUserId(req);
    if (id) {
      const GetAllData = await GetAllChats(id);
      res.status(GetAllData?.status).json(GetAllData);
    } else {
      res.status(401).json({ "status": 401, message: message });
    }
  } catch (error) {
    res.status(500).json({ "status": 500, message: error });
  }
});

module.exports = router;