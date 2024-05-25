import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [dbEmployees, setDbEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  });
  const [errors, setErrors] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  });

  const url = "https://reqres.in/api/users";

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (Array.isArray(json.data)) {
          setEmployees(json.data);
          setDbEmployees(json.data);
        } else {
          console.error('Fetched data is not an array:', json.data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const validateForm = () => {
    const { id, first_name, last_name, email, avatar } = newEmployee;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const namePattern = /^[A-Za-z]+$/;
    let valid = true;
    const newErrors = { id: '', first_name: '', last_name: '', email: '', avatar: '' };

    if (!id || !/^\d+$/.test(id)) {
      newErrors.id = "ID is required and should contain only numbers.";
      valid = false;
    }

    if (!first_name || !namePattern.test(first_name)) {
      newErrors.first_name = "First name is required and should contain only letters.";
      valid = false;
    }

    if (!last_name || !namePattern.test(last_name)) {
      newErrors.last_name = "Last name is required and should contain only letters.";
      valid = false;
    }

    if (!email || !emailPattern.test(email)) {
      newErrors.email = "A valid email is required.";
      valid = false;
    }

    if (!avatar) {
      newErrors.avatar = "Avatar URL is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const addEmployee = () => {
    if (validateForm()) {
      const newEmpList = [...employees, newEmployee];
      setEmployees(newEmpList);
      setDbEmployees(newEmpList);
      setNewEmployee({ id: '', first_name: '', last_name: '', email: '', avatar: '' });
      setErrors({ id: '', first_name: '', last_name: '', email: '', avatar: '' });
    }
  };

  const deleteEmployee = (employee) => {
    const updatedEmployees = dbEmployees.filter(emp => emp.id !== employee.id);
    setEmployees(updatedEmployees);
    setDbEmployees(updatedEmployees);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <div className="container">
        <h2 className="mb-4">Employees</h2>
        <Table className="table table-hover table-bordered table-sortable">
          <thead>
            <tr>
              <th className="first-table-column" scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Avatar</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td className="first-table-column">{employee.id}</td>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.email}</td>
                <td><img src={employee.avatar} alt="employee" width="50" /></td>
                <td>
                  <Button onClick={() => deleteEmployee(employee)} type="button" variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            <tr className="input-row">
              <td>
                <input type="text" name="id" value={newEmployee.id} onChange={handleInputChange} placeholder="ID" className="form-control" />
                {errors.id && <div className="text-danger">{errors.id}</div>}
              </td>
              <td>
                <input type="text" name="first_name" value={newEmployee.first_name} onChange={handleInputChange} placeholder="First Name" className="form-control" />
                {errors.first_name && <div className="text-danger">{errors.first_name}</div>}
              </td>
              <td>
                <input type="text" name="last_name" value={newEmployee.last_name} onChange={handleInputChange} placeholder="Last Name" className="form-control" />
                {errors.last_name && <div className="text-danger">{errors.last_name}</div>}
              </td>
              <td>
                <input type="text" name="email" value={newEmployee.email} onChange={handleInputChange} placeholder="Email" className="form-control" />
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </td>
              <td>
                <input type="text" name="avatar" value={newEmployee.avatar} onChange={handleInputChange} placeholder="Avatar URL" className="form-control" />
                {errors.avatar && <div className="text-danger">{errors.avatar}</div>}
              </td>
              <td><Button onClick={addEmployee} type="button" variant="success">Add</Button></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Employees;
