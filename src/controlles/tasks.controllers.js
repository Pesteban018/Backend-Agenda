import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
try {
  const task = await Task.find({
    user: req.user.id,
  }).populate("user");
  res.json(task);
} catch (error) {
  return res.status(500).json({ message: "Something went wrong" });
}
};

export const createTasks = async (req, res) => {
try {
  const { title, description, date } = req.body;
  const time = Date.now();
  const newTask = new Task({
    title,
    description,
    date,
    time,
    user: req.user.id,
  });
  const savedTask = await newTask.save();
  res.json(savedTask);
} catch (error) {
  return res.status(500).json({ message: "Something went wrong" });
}
};

export const getTask = async (req, res) => {
try {
  const task = await Task.findById(req.params.id).populate("user");
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
} catch (error) {
  return res.status(404).json({ message: "Task not found" });
};
}
export const deleteTasks = async (req, res) => {
try {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  return res.sendStatus(204);
} catch (error) {
  return res.status(404).json({ message: "Task not found" });
}
};
export const updateTasks = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    // Verifica si el campo 'time' está presente en los datos de entrada
    if (req.body.time) {
      // Actualiza el campo 'time' en el documento
      task.time = req.body.time;
      await task.save();
    }

    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};

