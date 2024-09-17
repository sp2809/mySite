function buildCell(rowIndex) {
  const cell = rowIndex ? document.createElement('td') : document.createElement('th');
  if (!rowIndex) cell.setAttribute('scope', 'col');
  return cell;
}

async function fetchUserData(offset, limit) {
  const response = await fetch(`/user-details.json?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  return data;
}

function createPaginationControls(currentPage, totalPages, onPageChange) {
  const pagination = document.createElement('div');
  pagination.classList.add('pagination-controls');

  const prevButton = document.createElement('button');
  prevButton.textContent = 'Previous';
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener('click', () => onPageChange(currentPage - 1));
  pagination.append(prevButton);

  const pageIndicator = document.createElement('span');
  pageIndicator.textContent = ` Page ${currentPage} of ${totalPages} `;
  pagination.append(pageIndicator);

  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener('click', () => onPageChange(currentPage + 1));
  pagination.append(nextButton);

  return pagination;
}

function renderTable(data, table) {
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = ''; // Clear existing table rows

  // Populate the table body with paginated data
  data.forEach((user, rowIndex) => {
    const row = document.createElement('tr');
    tbody.append(row);

    // Create table data (td) cells for each field in the user object
    Object.values(user).forEach((value) => {
      const cell = buildCell(rowIndex + 1); // Pass the row index for td
      cell.textContent = value;
      row.append(cell);
    });
  });
}

export default async function decorate(block) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const header = !block.classList.contains('no-header');
  if (header) table.append(thead);
  table.append(tbody);

  const resultsPerPage = 20; // Number of results per page
  let currentPage = 1;
  let totalUsers = 0; // Total users, fetched dynamically

  // Fetch initial data
  const initialData = await fetchUserData(0, resultsPerPage);
  const users = initialData.data;
  totalUsers = initialData.total;

  const totalPages = Math.ceil(totalUsers / resultsPerPage);

  // Check if there should be a header
  if (header && users.length > 0) {
    const row = document.createElement('tr');
    thead.append(row);

    // Create table header (th) cells based on the JSON fields
    ['Id', 'Name', 'Role', 'Contact', 'Status'].forEach((key) => {
      const cell = buildCell(0);
      cell.textContent = key; // Use field names from the JSON structure
      row.append(cell);
    });
  }

  // Pagination handling function
  async function onPageChange(newPage) {
    currentPage = newPage;
    const offset = (currentPage - 1) * resultsPerPage;
    const userData = await fetchUserData(offset, resultsPerPage);
    const users = userData.data;

    renderTable(users, table); // Render the new set of users

    // Update the pagination controls
    block.querySelector('.pagination-controls').replaceWith(
      createPaginationControls(currentPage, totalPages, onPageChange)
    );
  }

  // Render the initial table and pagination controls
  renderTable(users, table);

  // Create pagination controls
  const paginationControls = createPaginationControls(currentPage, totalPages, onPageChange);

  // Append the table and pagination controls to the block
  block.innerHTML = '';
  block.append(table);
  block.append(paginationControls);
}
