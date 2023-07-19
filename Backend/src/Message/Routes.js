const { getUserId } = require("../utils");
const { Router } = require("express");
const { AddMessage, DeleteMessage, GetMessage, GetAllMessages } = require("./Function");

const router = Router();

router.post("/AddMessage", async (req, res) => {
  try {
    const { id, message } = getUserId(req);
    console.log(id)
    if (id) {
      const SaveData = await AddMessage(req.body, id);
      res.status(SaveData?.status).json(SaveData);
    } else {
      res.status(401).json({ "status": 401, message: message });
    }
  } catch (error) {
    res.status(500).json({ "status": 500, message: error });
  }
});

router.post("/DeleteMessage/:id", async (req, res) => {
  try {
    const { id, message } = getUserId(req);
    if (id) {
      const DeleteData = await DeleteMessage(req.params.id, id);
      res.status(DeleteData?.status).json(DeleteData);
    } else {
      res.status(401).json({ "status": 401, message: message });
    }
  } catch (error) {
    res.status(500).json({ "status": 500, message: error });
  }
});

router.get("/GetMessage/:id", async (req, res) => {
  try {
    const { id, message } = getUserId(req);
    if (id) {
      const GetData = await GetMessage(req.params.id, id);
      res.status(GetData?.status).json(GetData);
    } else {
      res.status(401).json({ "status": 401, message: message });
    }
  } catch (error) {
    res.status(500).json({ "status": 500, message: error });
  }
});

router.get("/GetAllMessages/:Chat_Id", async (req, res) => {
  try {
    const { id, message } = getUserId(req);
    if (id) {
      const GetAllData = await GetAllMessages(req.params.Chat_Id);
      res.status(GetAllData?.status).json(GetAllData);
    } else {
      res.status(401).json({ "status": 401, message: message });
    }
  } catch (error) {
    res.status(500).json({ "status": 500, message: error });
  }
});

module.exports = router;