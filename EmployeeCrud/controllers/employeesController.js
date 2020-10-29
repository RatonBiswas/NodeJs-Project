import Employee from '../models/employeeModel.js'
export const getone = (req, res) => {
    res.render('index')
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