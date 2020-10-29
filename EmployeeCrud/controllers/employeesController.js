import Employee from '../models/employeeModel.js'
export const getone = (req, res) => {
    Employee.find({}).then((employees) =>{
        res.render('index',{employees:employees});
    }).catch((err) => {
        console.log(err);
    })
}
export const getnew = (req, res) => {
    res.render('new')
}

export const createEmployee = (req, res) => {
    let newEmployee = {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary
    };
    Employee.create(newEmployee).then((employee) =>{
        res.redirect('/employee')
    }).catch((err) =>{
        console.log(err);
    })
}

export const getSearch = (req, res) => {
    res.render('search',{employee:""})
}

export const getEmployeeInfo = (req, res) => {
    const searchQuery = {name: req.query.name};
    Employee.findOne(searchQuery).then((employee) => {
        res.render('search',{employee:employee})
    }).catch((err) => {
        console.log(err);
    })
}

export const getUpdateView = (req, res) => {
    let searchQuery = {_id:req.params.id}
    Employee.findOne(searchQuery).then((employee) => {
        res.render('edit',{employee:employee})
    }).catch((err) => {
        console.log(err);
    })
}

export const getUpdate = (req, res) => {
    let searchQuery = {_id:req.params.id}
    Employee.updateOne(searchQuery,{$set:{
        name:req.body.name,
        description: req.body.description,
        salary: req.body.salary,
    }}).then((employee) => {
        res.render('index',{employee:employee})
    }).catch((err) => {
        console.log(err);
    })
}
