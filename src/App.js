import React, { useEffect, useState } from 'react';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faBars, faCircle, faExclamationCircle, faCheck, faTimes, faCog, faSpinner, faUser, faBatteryFull, faBatteryHalf, faBatteryEmpty } from '@fortawesome/free-solid-svg-icons';

<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet"></link>
const App = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupByOption, setGroupByOption] = useState('status'); // Default grouping by status
  const [orderByOption, setOrderByOption] = useState('priority'); // Default ordering by priority
  const [showDropdowns, setShowDropdowns] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        setTickets(data.tickets); // Assuming 'tickets' is an array in the API response
        setLoading(false);
      } catch (error) {
        setError('There was a problem fetching the data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGroupByChange = (event) => {
    setGroupByOption(event.target.value);
  };

  const handleOrderByChange = (event) => {
    setOrderByOption(event.target.value);
  };

  const organizeTickets = () => {
    const organizedTickets = {};

    tickets.forEach((ticket) => {
      const groupKey = ticket[groupByOption];

      if (!organizedTickets[groupKey]) {
        organizedTickets[groupKey] = [];
      }
      organizedTickets[groupKey].push(ticket);
    });

    return organizedTickets;
  };

  const sortTickets = (groupedTickets) => {
    Object.keys(groupedTickets).forEach((key) => {
      if (orderByOption === 'priority') {
        groupedTickets[key].sort((a, b) => b.priority - a.priority);
      } else if (orderByOption === 'title') {
        groupedTickets[key].sort((a, b) => a.title.localeCompare(b.title));
      }
    });
    return groupedTickets;
  };

  const groupedTickets = sortTickets(organizeTickets());

  const handleDisplayClick = () => {
    setShowDropdowns(!showDropdowns);
  };


  return (
    <div>
      <div className="display">
        <button className="display-button" onClick={handleDisplayClick}>
        <FontAwesomeIcon icon={faBars} /> Display
        </button>
        {showDropdowns && (
          <div className="dropdowns-wrapper show-dropdowns">
            <div className="dropdown">
              <label htmlFor="groupingBy">Grouping:</label>
              <select
                id="groupingBy"
                value={groupByOption}
                onChange={handleGroupByChange}
              >
                <option value="status">Status</option>
                <option value="userId">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown">
              <label htmlFor="orderBy">Ordering:</label>
              <select
                id="orderBy"
                value={orderByOption}
                onChange={handleOrderByChange}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <div className="card-container">
        {Object.keys(groupedTickets).map((groupKey) => (
          <div key={groupKey} className="card-column">
            <p className='title'>
              {groupKey === '0' && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginLeft: '15px' }}>
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    &nbsp;&nbsp;No Priority
                  </span>
                  <span style={{ flexGrow: '0.9', textAlign: 'right' }}>+ ...</span>
                </div>
              )}
              {groupKey === '1' && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginLeft: '10px' }}>
                    <FontAwesomeIcon icon={faBatteryEmpty} />
                    &nbsp;&nbsp;Low
                  </span>
                  <span style={{ flexGrow: '0.9', textAlign: 'right' }}>+ ...</span>
                </div>
              )}
              {groupKey === '2' && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginLeft: '10px' }}>
                    <FontAwesomeIcon icon={faBatteryHalf} />
                    &nbsp;&nbsp;Medium
                  </span>
                  <span style={{ flexGrow: '0.9', textAlign: 'right' }}>+ ...</span>
                </div>
              )}
              {groupKey === '3' && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginLeft: '10px' }}>
                    <FontAwesomeIcon icon={faBatteryFull} />
                    &nbsp;&nbsp;High
                  </span>
                  <span style={{ flexGrow: '0.9', textAlign: 'right' }}>+ ...</span>
                </div>

              )}
              {groupKey === '4' && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginLeft: '10px' }}>
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    &nbsp;&nbsp;Urgent
                  </span>
                  <span style={{ flexGrow: '0.9', textAlign: 'right' }}>+ ...</span>
                </div>
              )}
              {groupKey === 'done' && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginLeft: '10px' }}>
                    <FontAwesomeIcon icon={faCheck} />
                    &nbsp;&nbsp;Done
                  </span>
                  <span style={{ flexGrow: '0.9', textAlign: 'right' }}>+ ...</span>
                </div>
              )}
              {groupKey === 'Todo' && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginLeft: '10px' }}>
                    <FontAwesomeIcon icon={faCircle} />
                    &nbsp;&nbsp;Todo
                  </span>
                  <span style={{ flexGrow: '0.9', textAlign: 'right' }}>+ ...</span>
                </div>
              )}
              {groupKey === 'cancel' && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginLeft: '10px' }}>
                    <FontAwesomeIcon icon={faTimes} />
                    &nbsp;&nbsp;Cancel
                  </span>
                  <span style={{ flexGrow: '0.9', textAlign: 'right' }}>+ ...</span>
                </div>
              )}
              {groupKey === 'In progress' && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginLeft: '10px' }}>
                    <FontAwesomeIcon icon={faSpinner} />
                    &nbsp;&nbsp;In Progress
                  </span>
                  <span style={{ flexGrow: '0.9', textAlign: 'right' }}>+ ...</span>
                </div>
              )}
              {groupKey === 'Backlog' && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginLeft: '10px' }}>
                    <FontAwesomeIcon icon={faCog} />
                    &nbsp;&nbsp;Backlog
                  </span>
                  <span style={{ flexGrow: '0.9', textAlign: 'right' }}>+ ...</span>
                </div>
              )}
              {!['0', '1', '2', '3', '4', 'Done', 'Todo', 'Cancel', 'In progress', 'Backlog'].includes(groupKey) && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginLeft: '10px' }}>
                    <FontAwesomeIcon icon={faUser} />
                    {groupKey}
                  </span>
                  <span style={{ flexGrow: '0.9', textAlign: 'right' }}>+ ...</span>
                </div>
              )}
            </p>


            {groupedTickets[groupKey].map((ticket) => (
              <div key={ticket.id} className="card">
                <p className='light'>{ticket.id}</p>
                <p className='title'>{ticket.title}</p>
                <p className='light tag'>⦿ {ticket.tag}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
};

export default App;
