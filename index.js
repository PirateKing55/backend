const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json());
app.use(
  // cors({
  //   origin: "http://localhost:5173/",
  // })
  cors()
);

app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs",
    });
    return;
  }
  // put into db
  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });
  res.send({
    msg: "todo created",
  });
});

app.get("/todos", async (req, res) => {
  const todos = await todo.find();
  res.json({ todos });
});

app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs",
    });
    return;
  }
  // update db
  await todo.updateOne(
    { _id: req.body.id },
    {
      completed: true,
    }
  );
  res.json({
    msg: "todo completed",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
