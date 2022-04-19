const express = require("express");
const router = express.Router();
const Item = require("../models/Item");


// Get All Tasks

router.get("/", (req, res) => {
    Item.find({}, (err, foundItems) => {
        if (!err) {
            res.status(200).json(foundItems)
        } else {
            res.status(400).json(err)
        }
    })
})

// Table Route (filter all our tasks)

router.get("/table", (req, res) => {
    Item.find({}, (err, foundItems) => {
        // item is each array/task, item.status = "TO-DO", etc.
        if (!err) {
            const formattedData = foundItems.reduce((acc, item) => {
                acc[item.status] = acc[item.status] ?
                    [...acc[item.status], item] : [item]
                return acc
            }, {})
            res.status(200).json(formattedData)
        } else {
            res.status(400).json(err)
        }
    })
})

// Create

router.post("/", (req, res) => {
    const { body } = req

    Item.create(body, (err, createdItem) => {
        if (!err) {
            res.status(200).json({ message: "All good!", createdItem: createdItem })
        } else {
            res.status(400).json(err)
        }
    })
})


// Update
router.put("/:id", (req, res) => {
    const { body } = req

    Item.findByIdAndUpdate(req.params.id, body, { new: true }, (err, updatedItem) => {
        if (!err) {
            res.status(200).json(updatedItem)
        } else {
            res.status(400).json(err)
        }
    })
})

// Delete
router.delete("/:id", (req, res) => {
    Item.findByIdAndDelete(req.params.id, (err) => {
        if (!err) {
            res.status(200).json({ message: "deleted item" })
        } else {
            res.status(400).json(err)
        }
    })
})



// Show
router.get("/:id", (req, res) => {
    Item.findById(req.params.id, (err, foundItem))
    if (!err) {
        res.status(200).json(foundItem)
    } else {
        res.status(400).json(err)
    }
})







module.exports = router;