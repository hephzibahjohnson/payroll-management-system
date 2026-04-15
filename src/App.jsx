import React, { useState, useEffect } from "react";

export default function App() {
  const [page, setPage] = useState("login");
  const [activeMenu, setActiveMenu] = useState("add");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", id: "", salary: "" });
  const [selected, setSelected] = useState(null);

  const handleLogin = () => {
    if (username && password) setPage("success");
  };

  useEffect(() => {
    if (page === "success") {
      setTimeout(() => setPage("dashboard"), 1000);
    }
  }, [page]);

  const addEmployee = () => {
    if (!form.name || !form.id || !form.salary) return;
    setEmployees([...employees, form]);
    setForm({ name: "", id: "", salary: "" });
  };

  const calculateSalary = (salary) => {
    const basic = Number(salary);
    const hra = basic * 0.2;
    const bonus = basic * 0.1;
    const deduction = basic * 0.05;
    const net = basic + hra + bonus - deduction;
    return { basic, hra, bonus, deduction, net };
  };

  const totalSalary = employees.reduce((acc, emp) => acc + Number(emp.salary || 0), 0);

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Segoe UI" }}>

      {/* LOGIN */}
      {page === "login" && (
        <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#4facfe,#00f2fe)" }}>
          <h1 style={{ textAlign: "center", color: "white", paddingTop: 30 }}>
            Smart Payroll System
          </h1>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
            <div style={{ background: "white", padding: 30, borderRadius: 15, width: 320, textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
              <h2 style={{ marginBottom: "20px", color: "#1e293b" }}>Welcome</h2>

              <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 8 }} />

              <div style={{ position: "relative" }}>
                <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 8 }} />
                <span onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}>
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

              <button onClick={handleLogin} style={{ marginTop: 15, padding: 10, width: "100%", borderRadius: 8, background: "#4facfe", color: "white" }}>
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {page === "success" && (
        <div style={{ textAlign: "center", marginTop: "200px", fontSize: 24 }}>
          ✅ Logged in successfully...
        </div>
      )}

      {/* DASHBOARD */}
      {page === "dashboard" && (
        <div style={{ display: "flex" }}>

          {/* SIDEBAR */}
          <div style={{ width: 220, background: "#1e293b", color: "white", minHeight: "100vh", padding: 20 }}>
            <h3>💼 Payroll</h3>

            <p
              style={{
                cursor: "pointer",
                marginTop: 20,
                background: activeMenu === "add" ? "#334155" : "transparent",
                padding: 8,
                borderRadius: 6
              }}
              onClick={() => setActiveMenu("add")}
            >
              👤 Employee Details
            </p>

            <p
              style={{ cursor: "pointer", marginTop: 20, color: "#f87171" }}
              onClick={() => setPage("login")}
            >
              🚪 Logout
            </p>
          </div>

          {/* MAIN */}
          <div style={{ flex: 1, padding: 30, background: "#f1f5f9" }}>
            <h2 style={{ color: "#1e293b" }}>Hi, {username} 👋</h2>

            {/* CARDS */}
            <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
              <div style={{ padding: 20, background: "white", borderRadius: 10, flex: 1 }}>
                <h4>👥 Employees</h4>
                <p>{employees.length}</p>
              </div>

              <div style={{ padding: 20, background: "white", borderRadius: 10, flex: 1 }}>
                <h4>💰 Total Salary</h4>
                <p>₹{totalSalary}</p>
              </div>

              <div style={{ padding: 20, background: "white", borderRadius: 10, flex: 1 }}>
                <h4>🟢 Status</h4>
                <p style={{ color: "green" }}>Active</p>
              </div>
            </div>

            {/* EMPLOYEE SECTION */}
            {activeMenu === "add" && (
              <div style={{ marginTop: 30 }}>
                <h3>Add Employee</h3>

                <div style={{ display: "flex", gap: 10 }}>
                  <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <input placeholder="ID" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} />
                  <input placeholder="Salary" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} />
                  <button onClick={addEmployee}>Add</button>
                </div>

                <div style={{ marginTop: 30 }}>
                  <h3>Employee List</h3>
                  <table width="100%" style={{ background: "white", borderRadius: 10 }}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Salary</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((emp, i) => (
                        <tr key={i} style={{ textAlign: "center" }}>
                          <td>{emp.name}</td>
                          <td>{emp.id}</td>
                          <td>₹{emp.salary}</td>
                          <td>
                            <button onClick={() => { setSelected(emp); setPage("salaryPage"); }}>
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SALARY PAGE */}
      {page === "salaryPage" && selected && (
        <div style={{ padding: 40 }}>
          <h2 style={{ color: "#1e293b" }}>Salary Details</h2>

          {(() => {
            const s = calculateSalary(selected.salary);
            return (
              <div style={{ background: "#f8fafc", padding: 20, borderRadius: 10 }}>
                <h3>{selected.name}</h3>
                <p>Basic: ₹{s.basic}</p>
                <p>HRA: ₹{s.hra}</p>
                <p>Bonus: ₹{s.bonus}</p>
                <p>Deduction: ₹{s.deduction}</p>
                <h2 style={{ color: "#16a34a" }}>Net Salary: ₹{s.net}</h2>
              </div>
            );
          })()}

          <button onClick={() => setPage("dashboard")}>Back</button>
        </div>
      )}
    </div>
  );
}
