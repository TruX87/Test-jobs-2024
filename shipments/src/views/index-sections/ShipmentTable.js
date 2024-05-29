import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import '../../assets/css/shipment-table.css';

function ShipmentTable() {
  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedShipment, setUpdatedShipment] = useState(null);

  useEffect(() => {
    fetch('/shipments.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setShipments(data);
      })
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, []);

  const handleSelectShipment = (shipment) => {
    console.log('Selected shipment:', shipment);
    setSelectedShipment(shipment);
    setUpdatedShipment({ ...shipment });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedShipment(null);
  };

  const handleDeleteShipment = (orderNo) => {
    const updatedShipments = shipments.filter(shipment => shipment.orderNo !== orderNo);
    setShipments(updatedShipments);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedShipment(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    const updatedShipments = shipments.map(shipment =>
      shipment.orderNo === updatedShipment.orderNo ? updatedShipment : shipment
    );
    setShipments(updatedShipments);
    setShowModal(false);
  };

  console.log('Current selectedShipment state:', selectedShipment);

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ORDER NO</th>
            <th>DELIVERY DATE</th>
            <th>CUSTOMER</th>
            <th>TRACKING NO</th>
            <th>STATUS</th>
            <th>CONSIGNEE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment, index) => (
            <tr key={index}>
              <td>{shipment.orderNo}</td>
              <td>{shipment.date}</td>
              <td>{shipment.customer}</td>
              <td>{shipment.trackingNo}</td>
              <td>{shipment.status}</td>
              <td>{shipment.consignee}</td>
              <td>
                <button className="btn btn-info" onClick={() => handleSelectShipment(shipment)}>
                  <img className='btn-icon' src="/shipment-detail.png" alt="details button" />
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteShipment(shipment.orderNo)}>x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedShipment && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Shipment Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h5>Order No:</h5>
                  <input
                    className='shipment-table-input'
                    name="orderNo"
                    value={updatedShipment.orderNo}
                    type='text'
                    onChange={handleUpdateChange}
                  />
                  <h5>Customer:</h5>
                  <input
                    className='shipment-table-input'
                    name="customer"
                    value={updatedShipment.customer}
                    type='text'
                    onChange={handleUpdateChange}
                  />
                  <h5>Consignee:</h5>
                  <input
                    className='shipment-table-input'
                    name="consignee"
                    value={updatedShipment.consignee}
                    type='text'
                    onChange={handleUpdateChange}
                  />
                </div>
                <div className="col-md-6">
                  <h5>Date:</h5>
                  <input
                    className='shipment-table-input'
                    name="date"
                    value={updatedShipment.date}
                    type='text'
                    onChange={handleUpdateChange}
                  />
                  <h5>Tracking No:</h5>
                  <input
                    className='shipment-table-input'
                    name="trackingNo"
                    value={updatedShipment.trackingNo}
                    type='text'
                    onChange={handleUpdateChange}
                  />
                  <h5>Status:</h5>
                  <input
                    className='shipment-table-input'
                    name="status"
                    value={updatedShipment.status}
                    type='text'
                    onChange={handleUpdateChange}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-danger" onClick={handleCloseModal}>
              Close
            </Button>
            <Button className="btn btn-info" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default ShipmentTable;
