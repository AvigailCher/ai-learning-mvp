// import { useState } from "react";
// import { api } from "../api/client";

// function Register() {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setLoading(true);

//       const response = await api.post("/users", {
//         name,
//         phone,
//       });

//       console.log("User created:", response.data);
//       alert("User created successfully!");

//       setName("");
//       setPhone("");
//     } catch (error: any) {
//       alert(error.response?.data?.message || "Error creating user");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Register User</h2>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Phone:</label>
//           <input
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? "Creating..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Register;
