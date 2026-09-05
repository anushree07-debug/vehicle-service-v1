import { useEffect, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [requests, setRequests] = useState([]);

  const [message, setMessage] = useState("");

  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [vehicleForm, setVehicleForm] = useState({
    vehicleNumber: "",
    vehicleType: "",
    model: "",
    customerId: "",
  });

  const [requestForm, setRequestForm] = useState({
    vehicle: "",
    problem: "",
    serviceDate: "",
    customerId: "",
  });

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const loadData = async () => {
    try {
      const [customerRes, vehicleRes, requestRes] = await Promise.all([
        fetch(`${API_URL}/api/customers`),
        fetch(`${API_URL}/api/vehicles`),
        fetch(`${API_URL}/api/service-requests`),
      ]);

      if (customerRes.ok) setCustomers(await customerRes.json());
      if (vehicleRes.ok) setVehicles(await vehicleRes.json());
      if (requestRes.ok) setRequests(await requestRes.json());
    } catch (error) {
      console.error(error);
      showMessage("Could not connect to the backend.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addCustomer = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerForm),
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage(data.message || "Unable to add customer");
        return;
      }

      showMessage("Customer added successfully!");
      setCustomerForm({
        name: "",
        email: "",
        phone: "",
        address: "",
      });

      loadData();
    } catch {
      showMessage("Server connection failed");
    }
  };

  const addVehicle = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/vehicles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleForm),
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage(data.message || "Unable to add vehicle");
        return;
      }

      showMessage("Vehicle added successfully!");

      setVehicleForm({
        vehicleNumber: "",
        vehicleType: "",
        model: "",
        customerId: "",
      });

      loadData();
    } catch {
      showMessage("Server connection failed");
    }
  };

  const addServiceRequest = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/service-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...requestForm,
          status: "Pending",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage(data.message || "Unable to create service request");
        return;
      }

      showMessage("Service request created!");

      setRequestForm({
        vehicle: "",
        problem: "",
        serviceDate: "",
        customerId: "",
      });

      loadData();
    } catch {
      showMessage("Server connection failed");
    }
  };

  const deleteItem = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/${type}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        showMessage("Unable to delete item");
        return;
      }

      showMessage("Deleted successfully!");
      loadData();
    } catch {
      showMessage("Server connection failed");
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo">🚗</div>
          <div>
            <h2>AutoCare</h2>
            <p>Service Management</p>
          </div>
        </div>

        <nav>
          <button
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}
          >
            📊 Dashboard
          </button>

          <button
            className={activeTab === "customers" ? "active" : ""}
            onClick={() => setActiveTab("customers")}
          >
            👥 Customers
          </button>

          <button
            className={activeTab === "vehicles" ? "active" : ""}
            onClick={() => setActiveTab("vehicles")}
          >
            🚘 Vehicles
          </button>

          <button
            className={activeTab === "requests" ? "active" : ""}
            onClick={() => setActiveTab("requests")}
          >
            🔧 Service Requests
          </button>
        </nav>

        <div className="sidebar-bottom">
          <span>Vehicle Service Management</span>
        </div>
      </aside>

      <main className="main-content">
        <header>
          <div>
            <h1>
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "customers" && "Customers"}
              {activeTab === "vehicles" && "Vehicles"}
              {activeTab === "requests" && "Service Requests"}
            </h1>

            <p>Manage your vehicle service center efficiently.</p>
          </div>

          <button className="refresh-btn" onClick={loadData}>
            ↻ Refresh
          </button>
        </header>

        {message && <div className="message">{message}</div>}

        {activeTab === "dashboard" && (
          <>
            <section className="stats">
              <div className="stat-card">
                <span>👥</span>
                <div>
                  <p>Total Customers</p>
                  <h2>{customers.length}</h2>
                </div>
              </div>

              <div className="stat-card">
                <span>🚘</span>
                <div>
                  <p>Total Vehicles</p>
                  <h2>{vehicles.length}</h2>
                </div>
              </div>

              <div className="stat-card">
                <span>🔧</span>
                <div>
                  <p>Service Requests</p>
                  <h2>{requests.length}</h2>
                </div>
              </div>

              <div className="stat-card">
                <span>⏳</span>
                <div>
                  <p>Pending Services</p>
                  <h2>
                    {
                      requests.filter(
                        (request) => request.status === "Pending"
                      ).length
                    }
                  </h2>
                </div>
              </div>
            </section>

            <section className="panel">
              <h2>Recent Service Requests</h2>

              {requests.length === 0 ? (
                <p className="empty">No service requests yet.</p>
              ) : (
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>Vehicle</th>
                        <th>Problem</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {requests.slice(0, 5).map((request) => (
                        <tr key={request._id}>
                          <td>{request.vehicle}</td>
                          <td>{request.problem}</td>
                          <td>
                            {new Date(
                              request.serviceDate
                            ).toLocaleDateString()}
                          </td>
                          <td>
                            <span className="status">
                              {request.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}

        {activeTab === "customers" && (
          <div className="two-column">
            <section className="panel form-panel">
              <h2>Add Customer</h2>

              <form onSubmit={addCustomer}>
                <input
                  placeholder="Customer Name"
                  required
                  value={customerForm.name}
                  onChange={(e) =>
                    setCustomerForm({
                      ...customerForm,
                      name: e.target.value,
                    })
                  }
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={customerForm.email}
                  onChange={(e) =>
                    setCustomerForm({
                      ...customerForm,
                      email: e.target.value,
                    })
                  }
                />

                <input
                  placeholder="Phone Number"
                  required
                  value={customerForm.phone}
                  onChange={(e) =>
                    setCustomerForm({
                      ...customerForm,
                      phone: e.target.value,
                    })
                  }
                />

                <textarea
                  placeholder="Address"
                  value={customerForm.address}
                  onChange={(e) =>
                    setCustomerForm({
                      ...customerForm,
                      address: e.target.value,
                    })
                  }
                />

                <button type="submit">Add Customer</button>
              </form>
            </section>

            <section className="panel">
              <h2>Customer List</h2>

              {customers.length === 0 ? (
                <p className="empty">No customers found.</p>
              ) : (
                <div className="cards">
                  {customers.map((customer) => (
                    <div className="customer-card" key={customer._id}>
                      <h3>{customer.name}</h3>
                      <p>📧 {customer.email}</p>
                      <p>📱 {customer.phone}</p>
                      <p>📍 {customer.address || "No address"}</p>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteItem("customers", customer._id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === "vehicles" && (
          <div className="two-column">
            <section className="panel form-panel">
              <h2>Add Vehicle</h2>

              <form onSubmit={addVehicle}>
                <input
                  placeholder="Vehicle Number"
                  required
                  value={vehicleForm.vehicleNumber}
                  onChange={(e) =>
                    setVehicleForm({
                      ...vehicleForm,
                      vehicleNumber: e.target.value,
                    })
                  }
                />

                <select
                  required
                  value={vehicleForm.vehicleType}
                  onChange={(e) =>
                    setVehicleForm({
                      ...vehicleForm,
                      vehicleType: e.target.value,
                    })
                  }
                >
                  <option value="">Select Vehicle Type</option>
                  <option>Car</option>
                  <option>Bike</option>
                  <option>Truck</option>
                  <option>Bus</option>
                  <option>Other</option>
                </select>

                <input
                  placeholder="Vehicle Model"
                  required
                  value={vehicleForm.model}
                  onChange={(e) =>
                    setVehicleForm({
                      ...vehicleForm,
                      model: e.target.value,
                    })
                  }
                />

                <select
                  required
                  value={vehicleForm.customerId}
                  onChange={(e) =>
                    setVehicleForm({
                      ...vehicleForm,
                      customerId: e.target.value,
                    })
                  }
                >
                  <option value="">Select Customer</option>

                  {customers.map((customer) => (
                    <option key={customer._id} value={customer._id}>
                      {customer.name}
                    </option>
                  ))}
                </select>

                <button type="submit">Add Vehicle</button>
              </form>
            </section>

            <section className="panel">
              <h2>Vehicle List</h2>

              <div className="cards">
                {vehicles.map((vehicle) => (
                  <div className="customer-card" key={vehicle._id}>
                    <h3>{vehicle.vehicleNumber}</h3>
                    <p>🚗 {vehicle.vehicleType}</p>
                    <p>Model: {vehicle.model}</p>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteItem("vehicles", vehicle._id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "requests" && (
          <div className="two-column">
            <section className="panel form-panel">
              <h2>Create Service Request</h2>

              <form onSubmit={addServiceRequest}>
                <input
                  placeholder="Vehicle Number"
                  required
                  value={requestForm.vehicle}
                  onChange={(e) =>
                    setRequestForm({
                      ...requestForm,
                      vehicle: e.target.value,
                    })
                  }
                />

                <textarea
                  placeholder="Describe the vehicle problem"
                  required
                  value={requestForm.problem}
                  onChange={(e) =>
                    setRequestForm({
                      ...requestForm,
                      problem: e.target.value,
                    })
                  }
                />

                <input
                  type="date"
                  required
                  value={requestForm.serviceDate}
                  onChange={(e) =>
                    setRequestForm({
                      ...requestForm,
                      serviceDate: e.target.value,
                    })
                  }
                />

                <select
                  required
                  value={requestForm.customerId}
                  onChange={(e) =>
                    setRequestForm({
                      ...requestForm,
                      customerId: e.target.value,
                    })
                  }
                >
                  <option value="">Select Customer</option>

                  {customers.map((customer) => (
                    <option key={customer._id} value={customer._id}>
                      {customer.name}
                    </option>
                  ))}
                </select>

                <button type="submit">Create Request</button>
              </form>
            </section>

            <section className="panel">
              <h2>All Service Requests</h2>

              <div className="cards">
                {requests.map((request) => (
                  <div className="customer-card" key={request._id}>
                    <h3>{request.vehicle}</h3>
                    <p><b>Problem:</b> {request.problem}</p>
                    <p>
                      📅{" "}
                      {new Date(
                        request.serviceDate
                      ).toLocaleDateString()}
                    </p>
                    <p>
                      Status:{" "}
                      <span className="status">
                        {request.status}
                      </span>
                    </p>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteItem(
                          "service-requests",
                          request._id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
