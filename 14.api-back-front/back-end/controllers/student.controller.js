const db = require('../models/index.js');

// eslint-disable-next-line prefer-destructuring
const students = db.Students;
exports.create = async function (req, res) {
    let data;
    try {
        data = await students.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            age: req.body.age,
            mobile: req.body.mobile,
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: 'Unable to save in database',
            data: err,
        });
    }
    if (data !== undefined) {
        res.status(200).json({
            status: true,
            message: 'saved in database',
            data,
        });
    }
};

exports.list = async function (req, res) {
    let data;

    // PAGINATION
    let skipping = req.query.skip;
    let limiting = req.query.limit;
    let searching = req.query.search;
    // eslint-disable-next-line prefer-destructuring
    const asc = req.query.asc;
    // eslint-disable-next-line prefer-destructuring
    let sort = req.query.sort;
    let x = 'ASC';
    // eslint-disable-next-line prefer-destructuring
    const Op = db.Sequelize.Op;
    if (skipping === null || skipping === undefined || skipping === '') {
        skipping = 0;
    }
    if (limiting === '' || limiting === null || limiting === undefined) {
        limiting = null;
    }
    if (searching === null || searching === undefined) {
        searching = '';
    }
    if (sort === null || sort === undefined || sort === '') {
        sort = 'id';
    }
    if (asc === '0') {
        x = 'DESC';
    } else {
        x = 'ASC';
    }
    try {
        data = await students.findAll({
            where: { fname: { [Op.iLike]: `${searching}%` } },
            order: [[sort, x]],
            offset: skipping,
            limit: limiting,
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: 'Unable To List Data.',
            data: err,
        });
    }
    if (data !== undefined) {
        res.status(200).json({
            status: true,
            message: 'All Data fetched successfully',
            data,
            metadata: {
                skip: req.query.skip,
                limit: req.query.limit,
                search: req.query.search,
            },
        });
    }
};

exports.find = async function (req, res) {
    let data;

    try {
        data = await students.find({
            where: { id: req.params.id }
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: 'Unable To List Data.',
            data: err,
        });
    }
    if (data !== undefined) {
        res.status(200).json({
            status: true,
            message: 'All Data fetched successfully',
            data,
        });
    }
};

exports.update = async function (req, res) {
    let data;
    console.log(data)
    try {
        data = await students.update({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            age: req.body.age,
            mobile: req.body.mobile,
        },
            { where: { id: req.params.id } });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: 'Unable To Update.',
            data: err,
        });
    }
    if (data !== undefined) {
        res.status(200).json({
            status: true,
            message: 'Updated Successfully',
            data,
        });
    }
};

exports.delete = async function (req, res) {
    let data;
    try {
        data = await students.destroy({ where: { id: req.params.id } });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: 'Unable To Delete.',
            data: err,
        });
    }
    if (data !== undefined) {
        res.status(200).json({
            status: true,
            message: 'Deleted Successfully',
            data,
        });
    }
};