// Sidebar toggle (optional if you make sidebar collapsible)
document.querySelector('.navbar-toggler').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('active');
  });
  
  // Student data
  const students = [
    { id: "S001", name: "Rishi Kumar Singh", email: "rishi@example.com", lastExam: "DSA", score: 99, status: "Active" },
    { id: "S002", name: "Ritik Sharma", email: "ritik@example.com", lastExam: "OOPS", score: 92, status: "Active" },
    { id: "S003", name: "Milan Yadav", email: "milan@example.com", lastExam: "WAD", score: 78, status: "Active" },
    { id: "S004", name: "Lokesh Verma", email: "lokesh@example.com", lastExam: "DBMS", score: 95, status: "Active" },
    { id: "S005", name: "Anjali Mehta", email: "anjali@example.com", lastExam: "DSA", score: 88, status: "Active" },
    { id: "S006", name: "Kavya Nair", email: "kavya@example.com", lastExam: "OOPS", score: 91, status: "Active" },
    { id: "S007", name: "Aman Gupta", email: "aman@example.com", lastExam: "WAD", score: 83, status: "Active" },
    { id: "S008", name: "Priya Iyer", email: "priya@example.com", lastExam: "DBMS", score: 89, status: "Active" }
  ];
  
  // Pagination
  const itemsPerPage = 4;
  let currentPage = 1;
  const totalPages = Math.ceil(students.length / itemsPerPage);
  
  // DOM References
  const tableBody = document.getElementById('studentTable');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const currentPageSpan = document.getElementById('currentPage');
  const totalPagesSpan = document.getElementById('totalPages');
  
  // Render Table
  function renderTable() {
    tableBody.innerHTML = '';
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = students.slice(start, end);
  
    pageData.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.lastExam}</td>
        <td>${student.score}%</td>
        <td><span class="badge bg-success">${student.status}</span></td>
      `;
      tableBody.appendChild(row);
    });
  
    // Update Pagination Controls
    currentPageSpan.textContent = currentPage;
    totalPagesSpan.textContent = totalPages;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }
  
  // Pagination Event Listeners
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderTable();
    }
  });
  
  // Initial render
  renderTable();
  