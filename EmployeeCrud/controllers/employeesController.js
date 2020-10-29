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
