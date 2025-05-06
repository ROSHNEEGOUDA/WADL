function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tableBody = document.getElementById('userTable');
    tableBody.innerHTML = '';

    if (users.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="text-center">No users registered yet</td></tr>';
        return;
    }

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.userId}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.department}</td>
            <td>${new Date(user.registrationDate).toLocaleDateString()}</td>
            <td><button class="btn btn-danger btn-delete" onclick="deleteUser(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteUser(index) {
    if (confirm('Are you sure you want to delete this user?')) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
    }
}

window.onload = loadUsers;

document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const userData = {
        userId: document.getElementById('userId').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        department: document.getElementById('department').value,
        registrationDate: new Date().toISOString()
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            const messageDiv = document.getElementById('message');
            if (xhr.status === 201 || xhr.status === 200) {
                saveToLocalStorage(userData);
                messageDiv.innerHTML = '<div class="alert alert-success">User registered successfully! Redirecting...</div>';
                document.getElementById('userForm').reset();
                setTimeout(() => window.location.href = 'index.html', 2000);
            } else {
                messageDiv.innerHTML = '<div class="alert alert-danger">Error registering user</div>';
                setTimeout(() => messageDiv.innerHTML = '', 3000);
            }
        }
    };

    xhr.send(JSON.stringify(userData));
});

function saveToLocalStorage(userData) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
}