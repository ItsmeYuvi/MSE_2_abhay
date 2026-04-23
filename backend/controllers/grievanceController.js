const Grievance = require('../models/Grievance');

const createGrievance = async (req, res) => {
    try {
        const { title, description, category } = req.body;

        const grievance = await Grievance.create({
            title,
            description,
            category,
            student: req.student.id
        });

        res.status(201).json(grievance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getGrievances = async (req, res) => {
    try {
        const grievances = await Grievance.find({ student: req.student.id }).sort({ date: -1 });
        res.status(200).json(grievances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getGrievanceById = async (req, res) => {
    try {
        const grievance = await Grievance.findById(req.params.id);

        if (!grievance) {
            return res.status(404).json({ message: 'Grievance not found' });
        }

        if (grievance.student.toString() !== req.student.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.status(200).json(grievance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateGrievance = async (req, res) => {
    try {
        const grievance = await Grievance.findById(req.params.id);

        if (!grievance) {
            return res.status(404).json({ message: 'Grievance not found' });
        }

        if (grievance.student.toString() !== req.student.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedGrievance = await Grievance.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedGrievance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteGrievance = async (req, res) => {
    try {
        const grievance = await Grievance.findById(req.params.id);

        if (!grievance) {
            return res.status(404).json({ message: 'Grievance not found' });
        }

        if (grievance.student.toString() !== req.student.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await Grievance.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Grievance removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchGrievances = async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ message: 'Please provide a search title' });
        }
        
        const grievances = await Grievance.find({
            student: req.student.id,
            title: { $regex: title, $options: 'i' }
        });

        res.status(200).json(grievances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createGrievance,
    getGrievances,
    getGrievanceById,
    updateGrievance,
    deleteGrievance,
    searchGrievances
};
