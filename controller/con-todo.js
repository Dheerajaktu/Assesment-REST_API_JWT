const Todo = require('../models/model-todo');
const ObjId = require('mongoose');






/* -------------------Creating ---------------------->> Todo */
module.exports.createTodo = async (req, res) => {
    if (req.auth) {
        if (req.body.title && req.body.description) {
            try {
                const newTodo = new Todo({
                    title: req.body.title,
                    description: req.body.description
                })
                const result = await newTodo.save();
                if (!result) {
                    res.status(400).json({ message: 'Error While Saving Todo' });
                }
                res.status(200).json(result);
            } catch (e) {
                console.log(e);
                res.status(400).json(e);
            }
        } else {
            res.status(400).json({ message: 'Please Provide Todo Values' });
        }
    } else {
        res.status(400).json({ message: 'Please Provide Authorization Token...' });
    }

}

/* -------------------Updating ------------------------>> Todo */
module.exports.updateTodo = async (req, res) => {
    const id = req.params.id;
    if (ObjId.isValidObjectId(id)) {
        if (id && (req.body.title || req.body.description)) {
            try {
                const getTodoDetails = await Todo.findOne({ _id: id });

                if (getTodoDetails) {
                    if (getTodoDetails.title === req.body.title && getTodoDetails.description === req.body.description) {
                        res.status(200).json('Todo Already Exist, nothing to update..');
                    } else {
                        const result = await Todo.findByIdAndUpdate(id, {
                            $set: req.body
                        })
                        if (!result) {
                            res.status(400).json({ message: 'Error While Updating All Todo' });
                        } else {
                            res.status(200).json({ message: 'Todo Updated Successfully!' });
                        }
                    }
                } else {
                    res.status(400).json({ message: 'No Todo Exist with this Object ID...' });
                }
            } catch (e) {
                res.status(400).json(e);
            }
        } else {
            res.status(400).json({ message: 'Please Provide Todo ID or Input values to update...' });
        }
    } else {
        res.status(400).json({ message: 'Please Provide Valid Object ID..' });
    }
}


/* ------------------------------Fetching All ---------->> Todo */
module.exports.getAllTodo = async (req, res) => {

    if (req.auth) {
        try {
            const getTodo = await Todo.find();
            if (getTodo.length <= 0) {
                res.status(404).json({ message: 'No Todo Exist...' });
            } else {
                res.status(200).json(getTodo);
            }

        } catch (e) {
            res.status(400).json(e);
        }
    } else {
        res.status(400).json({ message: 'Please Provide Authorization Token...' });
    }


}


/* ----------------------Fetching Todo by ID--------------------  */
module.exports.getTodoById = async (req, res) => {
    const id = req.params.id;
    if (req.auth) {
        if (ObjId.isValidObjectId(id)) {
            if (id) {
                try {
                    const getTodo = await Todo.findById(id);
                    if (getTodo == null) {
                        res.status(404).json({ message: 'Todo Not Found...' });
                    } else {
                        res.status(200).json(getTodo);
                    }
                } catch (e) {
                    res.status(400).json(e);
                }
            } else {
                res.status(400).json({ message: 'Please Provide Todo ID' });
            }
        } else {
            res.status(400).json({ message: 'Please Provide Valid Object ID..' });
        }

    } else {
        res.status(400).json({ message: 'Please Provide Authorization Token...' });
    }

}


/* ----------------------Deleting -------------------------->> Todo */
module.exports.deleteTodo = async (req, res) => {
    const id = req.params.id;
    if (req.auth) {
        if (ObjId.isValidObjectId(id)) {
            if (id) {
                try {
                    const result = await Todo.deleteOne({ _id: id });
                    if (result.deletedCount == 0) {
                        res.status(500).json({ message: 'Todo Already Deleted or Does not Exist..' });
                    } else {
                        res.status(200).json({ message: 'Todo Deleted Successfully' });
                    }
                } catch (e) {
                    res.status(500).json(e);
                }
            } else {
                res.status(400).json({ message: 'Please Provide Todo ID' });
            }
        } else {
            res.status(400).json({ message: 'Please Provide Valid Object ID..' });
        }
    } else {
        res.status(400).json({ message: 'Please Provide Authorization Token...' });
    }


}
