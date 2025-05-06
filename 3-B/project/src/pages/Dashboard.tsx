import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface Student {
  id: string;
  name: string;
  email: string;
  lastExam: string;
  score: number;
  status: string;
}

const students: Student[] = [
  { id: 'S001', name: 'Rishi Kumar Singh', email: 'rishi@example.com', lastExam: 'DSA', score: 99, status: 'Active' },
  { id: 'S002', name: 'Ritik Sharma', email: 'ritik@example.com', lastExam: 'OOPS', score: 92, status: 'Active' },
  { id: 'S003', name: 'Milan Yadav', email: 'milan@example.com', lastExam: 'WAD', score: 78, status: 'Active' },
  { id: 'S004', name: 'Lokesh Verma', email: 'lokesh@example.com', lastExam: 'DBMS', score: 95, status: 'Active' },
  { id: 'S005', name: 'Anjali Mehta', email: 'anjali@example.com', lastExam: 'DSA', score: 88, status: 'Active' },
  { id: 'S006', name: 'Kavya Nair', email: 'kavya@example.com', lastExam: 'OOPS', score: 91, status: 'Active' },
  { id: 'S007', name: 'Aman Gupta', email: 'aman@example.com', lastExam: 'WAD', score: 83, status: 'Active' },
  { id: 'S008', name: 'Priya Iyer', email: 'priya@example.com', lastExam: 'DBMS', score: 89, status: 'Active' },
];

const Dashboard: React.FC = () => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(students.length / itemsPerPage);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const pageData = students.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h4 className="text-center py-3 border-bottom">Exam Admin</h4>
        <a href="#" className="text-white d-block mb-2">
          <i className="fas fa-home me-2"></i> Dashboard
        </a>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ background: '#f8f9fa' }}>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white rounded shadow-sm mb-4 px-3">
          <div className="container-fluid">
            <span className="navbar-brand fw-bold">Dashboard</span>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link text-dark" href="#"><i className="fas fa-bell me-2"></i></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="#"><i className="fas fa-user-circle me-2"></i>Admin</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Summary Cards */}
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="card text-white bg-primary h-100 shadow-sm">
              <div className="card-body">
                <i className="fas fa-users fa-lg mb-2"></i>
                <h6>Total Students</h6>
                <h3>1,234</h3>
                <small>+5% from last month</small>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card text-white bg-success h-100 shadow-sm">
              <div className="card-body">
                <i className="fas fa-book fa-lg mb-2"></i>
                <h6>Active Exams</h6>
                <h3>45</h3>
                <small>3 exams this week</small>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card mt-4 shadow-sm">
          <div className="card-header bg-white">
            <h5 className="mb-0">Recent Activity</h5>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Exam "Math 101" completed - 95% avg score</li>
              <li className="list-group-item">New student batch (50) registered</li>
            </ul>
          </div>
        </div>

        {/* Student Table */}
        <div className="card mt-4 shadow-sm">
          <div className="card-header bg-white">
            <h5 className="mb-0">Student Records</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Last Exam</th>
                    <th>Score</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pageData.map(student => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.lastExam}</td>
                      <td>{student.score}%</td>
                      <td><span className="badge bg-success">{student.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <button
                className="btn btn-outline-primary"
                disabled={currentPage === 1}
                onClick={handlePrev}
              >
                Previous
              </button>
              <span className="fw-semibold">Page {currentPage} of {totalPages}</span>
              <button
                className="btn btn-outline-primary"
                disabled={currentPage === totalPages}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
