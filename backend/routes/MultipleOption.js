const router = require("express").Router();
const multipleOptionModal = require("../models/MultipleOption");


router.post("/add", async (req, res) => {
    const { options, question } = req.body;
    if (!question) {
        res.status(422).json("plz fill the question field");
    } else {
        try {
            const addMultipleOption = new multipleOptionModal({
                options, question
            });
            await addMultipleOption.save();
            res.status(201).json(addMultipleOption);
            console.log(addMultipleOption);

        } catch (error) {
            res.status(422).json(error);
        }
    }
})


// get All MultipleOption  List

router.get("/getAll", async (req, res) => {
    try {
        const MultipleOptionList = await multipleOptionModal.find();
        res.status(201).json(MultipleOptionList)
    } catch (error) {
        res.status(422).json(error);
    }
})

// get individual MultipleOption 

router.get("/getMultipleOption/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const singleMultipleOptionUnit = await multipleOptionModal.findById({ _id: id });
        console.log(singleMultipleOptionUnit);
        res.status(201).json(singleMultipleOptionUnit)

    } catch (error) {
        res.status(422).json(error);
    }
})


// update MultipleOption list data
router.patch("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const updateMultipleOption = await multipleOptionModal.findByIdAndUpdate(id, req.body, {
            new: true
        });

        console.log(updateMultipleOption);
        res.status(201).json(updateMultipleOption);

    } catch (error) {
        res.status(422).json(error);
    }
})


// delete MultipleOption 
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleteMultipleOption = await multipleOptionModal.findByIdAndDelete({ _id: id })
        console.log(deleteMultipleOption);
        res.status(201).json("Record has been Deleted Successfully");

    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;