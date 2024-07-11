document.addEventListener('DOMContentLoaded', function() {
    // Specify the API endpoint
    const apiUrl = 'http://localhost:8000/api/customers';

    // Fetch data from the API
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const tableBody = document.getElementById('customerTableBody');
        data.data.forEach(customer => {
            const row = `<tr>
                            <td>${customer.id}</td>
                            <td>${customer.name}</td>
                            <td>${customer.email}</td>
                            <td>${customer.created_at || 'N/A'}</td>
                            <td>${customer.updated_at || 'N/A'}</td>
                            <td>
                            <button class="btn btn-warning">Edit</button>
                            <button class="btn btn-danger">Delete</button>
                            </td>
                         </tr>`;
            tableBody.innerHTML += row;
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});


document.getElementById('addCustomerForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the default form submission

  const name = document.getElementById('customerName').value;
  const email = document.getElementById('customerEmail').value;

  const data = { name, email };

  fetch('http://localhost:8000/api/customers', { // Replace YOUR_SERVER_ENDPOINT with your actual server endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    // Show success notification
    const alertPlaceholder = document.getElementById('alertPlaceholder');
    const alert = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                    Customer added successfully!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
    alertPlaceholder.innerHTML = alert;
    // Optionally close the modal and reset the form
    setTimeout(() => {
        bootstrap.Modal.getInstance(document.getElementById('addCustomerModal')).hide();
        alertPlaceholder.innerHTML = ''; // Clear the alert message
        document.getElementById('addCustomerForm').reset();
      }, 3000); // 3000 milliseconds = 3 seconds
    })})
