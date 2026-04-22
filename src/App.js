import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [job, setJob] = useState({
    company: "",
    role: "",
    status: "Applied",
  });

  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const fetchJobs = async () => {
    const res = await axios.get("https://job-tracker-backend-kjzt.onrender.com/jobs");
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!job.company.trim() || !job.role.trim()) {
      alert("Company and Role are required");
      return;
    }

    await axios.post("https://job-tracker-backend-kjzt.onrender.com/jobs", job);

    fetchJobs();

    setJob({
      company: "",
      role: "",
      status: "Applied",
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://job-tracker-backend-kjzt.onrender.com/jobs/${id}`);
    fetchJobs();
  };

  const handleStatusChange = async (id, newStatus) => {
    await axios.put(`https://job-tracker-backend-kjzt.onrender.com/jobs/${id}`, {
      status: newStatus,
    });

    fetchJobs();
  };

  const filteredJobs = jobs.filter((j) => {
    const matchesFilter =
      filter === "All" || j.status === filter;

    const matchesSearch =
      j.company.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const appliedCount = jobs.filter(
    (j) => j.status === "Applied"
  ).length;

  const oaCount = jobs.filter(
    (j) => j.status === "OA"
  ).length;

  const interviewCount = jobs.filter(
    (j) => j.status === "Interview"
  ).length;

  const rejectedCount = jobs.filter(
    (j) => j.status === "Rejected"
  ).length;

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          padding: "30px",
          borderRadius: "12px",
          backgroundColor: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            marginBottom: "25px",
            color: "#222",
          }}
        >
          Job Tracker
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            name="company"
            placeholder="Company"
            value={job.company}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />

          <input
            name="role"
            placeholder="Role"
            value={job.role}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />

          <select
            name="status"
            value={job.status}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "16px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          >
            <option>Applied</option>
            <option>OA</option>
            <option>Interview</option>
            <option>Rejected</option>
          </select>

          <button
            type="submit"
            style={{
              padding: "12px",
              width: "100%",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            Add Job
          </button>
        </form>

        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "8px",
            marginTop: "24px",
            color: "#333",
          }}
        >
          Filter
        </h3>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontSize: "14px",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="OA">OA</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
        </select>

        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "8px",
            color: "#333",
          }}
        >
          Search
        </h3>

        <input
          type="text"
          placeholder="Search by company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontSize: "14px",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        />

        <h2
          style={{
            fontSize: "22px",
            fontWeight: "600",
            marginBottom: "14px",
            color: "#222",
          }}
        >
          Dashboard
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              padding: "14px",
              borderRadius: "10px",
              backgroundColor: "#f9fafb",
              border: "1px solid #e5e7eb",
              fontWeight: "500",
            }}
          >
            Applied: {appliedCount}
          </div>

          <div
            style={{
              padding: "14px",
              borderRadius: "10px",
              backgroundColor: "#f9fafb",
              border: "1px solid #e5e7eb",
              fontWeight: "500",
            }}
          >
            OA: {oaCount}
          </div>

          <div
            style={{
              padding: "14px",
              borderRadius: "10px",
              backgroundColor: "#f9fafb",
              border: "1px solid #e5e7eb",
              fontWeight: "500",
            }}
          >
            Interview: {interviewCount}
          </div>

          <div
            style={{
              padding: "14px",
              borderRadius: "10px",
              backgroundColor: "#f9fafb",
              border: "1px solid #e5e7eb",
              fontWeight: "500",
            }}
          >
            Rejected: {rejectedCount}
          </div>
        </div>

        <h2
          style={{
            fontSize: "22px",
            fontWeight: "600",
            marginBottom: "14px",
            color: "#222",
          }}
        >
          Jobs List
        </h2>

        <ul style={{ padding: 0, margin: 0 }}>
          {filteredJobs.map((j) => (
            <li
              key={j._id}
              style={{
                listStyle: "none",
                marginBottom: "12px",
                padding: "14px",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: "500" }}>
                {j.company} - {j.role}
              </span>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <select
                  value={j.status}
                  onChange={(e) =>
                    handleStatusChange(
                      j._id,
                      e.target.value
                    )
                  }
                  style={{
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    marginRight: "10px",
                  }}
                >
                  <option>Applied</option>
                  <option>OA</option>
                  <option>Interview</option>
                  <option>Rejected</option>
                </select>

                <button
                  onClick={() => handleDelete(j._id)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#ef4444",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;




