const stud = require('../controllers/student.controller')

const routes = (app) => {
  app.post('/api/students/create', stud.create)
  app.get('/api/students/list', stud.list)
  app.get('/api/students/find/:id', stud.find)
  app.put('/api/students/update/:id', stud.update)
  app.delete('/api/students/delete/:id', stud.delete)

};
module.exports = { routes }