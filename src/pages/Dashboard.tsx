import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { Employee } from "../models/Employee";

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const { logout, token } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newEmployee, setNewEmployee] = useState({ 
    firstName: "", lastName: "", email: "", jobTitle: "", birthDate: "" 
  });
  const [positions, setPositions] = useState<string[]>([]);
  
  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<Employee[]>(`${API_URL}/employees`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Error al cargar empleados:", error);
      setError("Error al cargar empleados.");
    } finally {
      setLoading(false);
    }
  }, [token]);
  
  useEffect(() => {
    if (!token) return;
    fetchEmployees();
    fetchPositions();
  }, [token, fetchEmployees]);
   
  const fetchPositions = async () => {
    try {
      const apiUrl = import.meta.env.VITE_POSITIONS_API;
      const response = await axios.get<{ positions: string[] }>(apiUrl);
      setPositions(response.data.positions);
    } catch (error) {
      console.error("Error cargando posiciones:", error);
    }
  };
  
  const handleCreateEmployee = async () => {
    try {
      const response = await axios.post<Employee>(`${API_URL}/employees`, newEmployee, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees([...employees, response.data]);
      setNewEmployee({ firstName: "", lastName: "", email: "", jobTitle: "", birthDate: "" });
    } catch (error) {
      console.error("Error al crear empleado:", error);
      setError("Error al crear empleado.");
    }
  };
  
  const handleUpdateEmployee = async (id: string, updatedEmployee: Partial<Employee>) => {
    try {
      await axios.put(`${API_URL}/employees/${id}`, updatedEmployee, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(employees.map(emp => (emp._id === id ? { ...emp, ...updatedEmployee } : emp)));
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
      setError("Error al actualizar empleado.");
    }
  };
  
  const handleDeleteEmployee = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(employees.filter(emp => emp._id !== id));
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
      setError("Error al eliminar empleado.");
    }
  };
  
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Empleados</h2>
      <button className="btn btn-danger mb-3" onClick={() => logout()}>
        Cerrar Sesión
      </button>

      <div className="card p-3 mb-4">
        <h3>Nuevo Empleado</h3>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              value={newEmployee.firstName}
              onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Apellido"
              value={newEmployee.lastName}
              onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={newEmployee.jobTitle}
              onChange={(e) => setNewEmployee({ ...newEmployee, jobTitle: e.target.value })}
            >
              <option value="">Seleccione un puesto</option>
              {positions.map((pos) => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <input
              type="date"
              className="form-control"
              value={newEmployee.birthDate}
              onChange={(e) => setNewEmployee({ ...newEmployee, birthDate: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary w-100" onClick={handleCreateEmployee}>Agregar</button>
          </div>
        </div>
      </div>

      {loading && <p>Cargando empleados...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && employees.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Puesto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id}>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={emp.firstName}
                      onChange={(e) => handleUpdateEmployee(emp._id, { firstName: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={emp.lastName}
                      onChange={(e) => handleUpdateEmployee(emp._id, { lastName: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      className="form-control"
                      value={emp.email}
                      onChange={(e) => handleUpdateEmployee(emp._id, { email: e.target.value })}
                    />
                  </td>
                  <td>
                    <select
                      className="form-select"
                      value={emp.jobTitle}
                      onChange={(e) => handleUpdateEmployee(emp._id, { jobTitle: e.target.value })}
                    >
                      {positions.map((pos) => (
                        <option key={pos} value={pos}>{pos}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDeleteEmployee(emp._id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!loading && !error && employees.length === 0 && <p>No hay empleados registrados.</p>}
    </div>
  );
};

export default Dashboard;
