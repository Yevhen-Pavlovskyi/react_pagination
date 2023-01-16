import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const startNumber = 1;
const endNumber = 42;

const items = getNumbers(startNumber, endNumber)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setItemsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, items.length);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const hadleToPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
    setPage(1);
  };

  const slicedItems = items.slice(start - 1, end);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${start} - ${end} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={hadleToPage}
            value={perPage}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={page}
        onPageChange={handlePageChange}
      />
      <ul>
        {slicedItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
