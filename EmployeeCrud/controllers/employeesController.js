import Employee from '../models/employeeModel.js'
export const getone = (req, res) => {
    Employee.find({}).then((employees) =>{
        res.render('index',{employees:employees});
    }).catch((err) => {
        req.flash('error_msg','Error: '+err)
        res.redirect('/employee')
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
        req.flash('success_msg','Employee data added to database successfully.')
        res.redirect('/employee')
    }).catch((err) =>{
        req.flash('error_msg','Error: '+err)
        res.redirect('/employee')
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
        req.flash('error_msg','Error: '+err)
        res.redirect('/employee')
    })
}

export const getUpdateView = (req, res) => {
    let searchQuery = {_id:req.params.id}
    Employee.findOne(searchQuery).then((employee) => {
        res.render('edit',{employee:employee})
    }).catch((err) => {
        req.flash('error_msg','Error: '+err)
        res.redirect('/employee')
    })
}

export const getUpdate = (req, res) => {
    let searchQuery = {_id:req.params.id}
    Employee.updateOne(searchQuery,{$set:{
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary
    }}).then((employee) =>{
        req.flash('success_msg','Employee data updated successfully.')
        res.redirect('/employee')
    }).catch((err) =>{
        req.flash('error_msg','Error: '+err)
        res.redirect('/employee')
    })
}

export const deleteOne = (req, res) => {
    let searchQuery = {_id:req.params.id}
    Employee.findByIdAndDelete(searchQuery).then((employee) =>{
        req.flash('success_msg','Employee deleted successfully.')
        res.redirect('/employee')
    }).catch((err) =>{
        req.flash('error_msg','Error: '+err)
        res.redirect('/employee')
    })
}
