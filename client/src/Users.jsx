import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Users() {
    const [users, setUsers] = useState([]);  // State for storing users
    const [searchQuery, setSearchQuery] = useState("");  // State for storing search input
    const [file, setFile] = useState(null);  // State for storing file to upload
    const [fileUploaded, setFileUploaded] = useState(false);  // State to track if file is uploaded
    const [fileUrl, setFileUrl] = useState("");  // State to store file URL
    const [url, setUrl] = useState("");  // State for URL input
    const [submittedUrl, setSubmittedUrl] = useState("");  // State to store the submitted URL

    // Fetch users based on the search query
    const fetchUsers = async (query = "") => {
        try {
            const result = await axios.get(`http://localhost:3001/search?query=${query}`);
            setUsers(result.data);  // Set users to search results
        } catch (err) {
            console.log(err);
        }
    };

    // Fetch all users initially
    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle search button click
    const handleSearchClick = () => {
        fetchUsers(searchQuery);  // Trigger search when the user clicks the search button
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);  // Store selected file
    };

    // Handle file upload
    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);  // Adding the file to the form data

        try {
            const response = await axios.post("http://localhost:3001/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);
            setFileUploaded(true);  // Set state to indicate the file is uploaded
            setFileUrl(response.data.fileUrl);  // Store the file URL from the response
        } catch (err) {
            console.error("File upload failed:", err);
        }
    };

    // Handle URL input change
    const handleUrlChange = (e) => {
        setUrl(e.target.value);  // Store URL input
    };

    // Handle URL submission
    const handleUrlSubmit = () => {
        setSubmittedUrl(url);  // Store the submitted URL in the state
        setUrl("");  // Reset the URL input field
        console.log("URL submitted:", url);  // Handle URL logic (e.g., fetch or process)
    };

    // Handle file download
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = `http://localhost:3001${fileUrl}`;  // Use the correct file URL
        link.download = fileUrl.split('/').pop();  // Use the file's name as the download file name
        link.click();  // Trigger the download
    };

    // Handle delete user
    const handleDelete = async (userId) => {
        try {
            // Ensure this matches the backend '/users/:id'
            await axios.delete(`http://localhost:3001/users/${userId}`);  
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));  // Remove deleted user from state
        } catch (err) {
            console.error("Failed to delete user:", err);
        }
    };
    

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-75 bg-white rounded p-3">
                {/* Search Bar */}
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Search for products"
                        value={searchQuery}
                        onChange={handleSearchChange}  // Update search query
                        className="form-control mb-2"
                    />
                    <button
                        onClick={handleSearchClick}  // Trigger search on button click
                        className="btn btn-primary"
                    >
                        Search
                    </button>
                </div>

                {/* File Upload */}
                {!fileUploaded && (
                    <div className="mb-3">
                        <input
                            type="file"
                            onChange={handleFileChange}  // Handle file selection
                            className="form-control mb-2"
                        />
                        <button
                            onClick={handleFileUpload}  // Trigger file upload
                            className="btn btn-secondary"
                        >
                            Upload File
                        </button>
                    </div>
                )}

                {/* View/Download File Button after file is uploaded */}
                {fileUploaded && (
                    <div>
                        <a
                            href={`http://localhost:3001${fileUrl}`} // Corrected file URL to access in 'public/images' folder
                            target="_blank"  // Open in a new tab
                            rel="noopener noreferrer"
                            className="btn btn-info me-2"
                        >
                            View
                        </a>
                        <button
                            onClick={handleDownload}  // Trigger file download
                            className="btn btn-warning"
                        >
                            Download
                        </button>
                    </div>
                )}

                {/* URL Input and Submit */}
                <div className="mt-3">
                    <input
                        type="text"
                        placeholder="Enter URL"
                        value={url}
                        onChange={handleUrlChange}  // Update URL input value
                        className="form-control mb-2"
                    />
                    <button
                        onClick={handleUrlSubmit}  // Trigger URL submission
                        className="btn btn-primary"
                    >
                        Submit URL
                    </button>
                </div>

                {/* Display the Submitted URL */}
                {submittedUrl && (
                    <div className="mt-3">
                        <a
                            href={submittedUrl}  // Use the submitted URL
                            target="_blank"  // Open in a new tab
                            rel="noopener noreferrer"
                            className="btn btn-info"
                        >
                            View Submitted URL
                        </a>
                    </div>
                )}

                {/* Add New User Button */}
                <Link to="/create" className="btn btn-success mb-3">
                    Add +
                </Link>

                {/* Products/Users Table - Hide when uploading a file */}
                {!fileUploaded && (
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.category}</td>
                                        <td>
                                            {/* Update Button */}
                                            <Link to={`/update/${user._id}`} className="btn btn-success me-2">
                                                Update
                                            </Link>

                                            {/* Delete Button */}
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(user._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Users;
