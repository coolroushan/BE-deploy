const express = require("express");
const { NoteModel } = require("../middleware/model/note.model");
const { auth } = require("../middleware/auth.middleware");

const noteRouter = express.Router();

noteRouter.use(auth);

noteRouter.post("/create", async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).json({ msg: "Notes has been added", note: req.body });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find({ userId: req.body.userId });

    res.status(200).json({ notes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

noteRouter.patch("/update/:noteId", async (req, res) => {
  const userDocId = req.body.userId;
  const { noteId } = req.params;

  try {
    const note = await NoteModel.findOne({_id: noteId });
    const userNoteId = note.userId;
    if (userDocId === userNoteId) {
        console.log("userDocId :", userDocId)
        await NoteModel.findByIdAndUpdate({_id:noteId},req.body)
        res.status(200).json({ msg: `${note.title} has been updated` });
    } else {
      res.status(200).json({ msg: "Not Authorised" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

noteRouter.delete("/delete/:noteId",async (req, res) => {
    const userDocId = req.body.userId;
  const { noteId } = req.params;

  try {
    const note = await NoteModel.findOne({_id: noteId });
    const userNoteId = note.userId;
    if (userDocId === userNoteId) {
        console.log("userDocId :", userDocId)
        await NoteModel.findByIdAndDelete({_id:noteId})
        res.status(200).json({ msg: `${note.title} has been deleted` });
    } else {
      res.status(200).json({ msg: "Not Authorised" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  noteRouter,
};
