const { useState, useEffect } = React;

// =====================================
// COMPONENT 1: APP
// =====================================

function App() {
    const [kw, setKeyword] = useState("");
    const [newUser, setNewUser] = useState(null);

    return (
        <div className="container">

            <h1>Quản lý người dùng</h1>

            <div className="toolbar">

                <SearchForm
                    onChangeValue={setKeyword}
                />

                <AddUser
                    onAdd={setNewUser}
                />

            </div>

            <ResultTable
                keyword={kw}
                user={newUser}
                onAdded={() => setNewUser(null)}
            />

        </div>
    );
}


// =====================================
// COMPONENT 2: SEARCH FORM
// =====================================

function SearchForm({ onChangeValue }) {

    return (
        <input
            className="search-input"
            type="text"
            placeholder="Tìm theo name, username..."
            onChange={(e) => onChangeValue(e.target.value)}
        />
    );

}


// =====================================
// COMPONENT 3: ADD USER
// =====================================

function AddUser({ onAdd }) {

    const [adding, setAdding] = useState(false);

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        address: {
            street: "",
            suite: "",
            city: ""
        },
        phone: "",
        website: ""
    });

    // Xử lý thay đổi input
    const handleChange = (e) => {

        const { id, value } = e.target;

        if (["street", "suite", "city"].includes(id)) {

            setUser({
                ...user,
                address: {
                    ...user.address,
                    [id]: value
                }
            });

        } else {

            setUser({
                ...user,
                [id]: value
            });

        }

    };


    // Thêm người dùng
    const handleAdd = () => {

        if (!user.name.trim() || !user.username.trim()) {
            alert("Vui lòng nhập Name và Username!");
            return;
        }

        onAdd(user);

        setUser({
            name: "",
            username: "",
            email: "",
            address: {
                street: "",
                suite: "",
                city: ""
            },
            phone: "",
            website: ""
        });

        setAdding(false);

    };


    return (
        <div>

            <button
                className="btn-add"
                onClick={() => setAdding(true)}
            >
                + Thêm người dùng
            </button>


            {adding && (

                <div className="modal-overlay">

                    <div className="modal-content">

                        <h3>Thêm người dùng</h3>

                        <div className="form-group">
                            <label>Name *</label>
                            <input
                                id="name"
                                value={user.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Username *</label>
                            <input
                                id="username"
                                value={user.username}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                id="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Street</label>
                            <input
                                id="street"
                                value={user.address.street}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Suite</label>
                            <input
                                id="suite"
                                value={user.address.suite}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>City</label>
                            <input
                                id="city"
                                value={user.address.city}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                id="phone"
                                value={user.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Website</label>
                            <input
                                id="website"
                                value={user.website}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-actions">

                            <button
                                className="btn-add"
                                onClick={handleAdd}
                            >
                                Thêm
                            </button>

                            <button
                                className="btn-cancel"
                                onClick={() => setAdding(false)}
                            >
                                Hủy
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );

}


// =====================================
// COMPONENT 4: RESULT TABLE
// =====================================

function ResultTable({ keyword, user, onAdded }) {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);


    // READ: Lấy dữ liệu từ API
    useEffect(() => {

        fetch("https://jsonplaceholder.typicode.com/users")

            .then(res => res.json())

            .then(data => {
                setUsers(data);
                setLoading(false);
            })

            .catch(error => {
                console.error(error);
                setLoading(false);
            });

    }, []);


    // CREATE: Nhận user mới từ App
    useEffect(() => {

        if (user) {

            setUsers(prev => {

                const nextId = prev.reduce(
                    (max, item) => Math.max(max, Number(item.id) || 0),
                    0
                ) + 1;

                return [
                    ...prev,
                    { ...user, id: nextId }
                ];

            });

            onAdded();

        }

    }, [user]);


    // SEARCH: Lọc dữ liệu
    const filteredUsers = users.filter(u =>

        u.name.toLowerCase().includes(keyword.toLowerCase()) ||

        u.username.toLowerCase().includes(keyword.toLowerCase())

    );


    // EDIT: Sao chép user sang editing
    function editUser(user) {

        setEditing({
            ...user,
            address: {
                ...user.address
            }
        });

    }


    // Cập nhật trường đang chỉnh sửa
    function handleEditChange(id, value) {

        if (["street", "suite", "city"].includes(id)) {

            setEditing(current => ({
                ...current,
                address: {
                    ...current.address,
                    [id]: value
                }
            }));

        } else {

            setEditing(current => ({
                ...current,
                [id]: value
            }));

        }

    }


    // UPDATE: Lưu thông tin
    function saveUser() {

        setUsers(prev =>
            prev.map(u =>
                u.id === editing.id ? editing : u
            )
        );

        setEditing(null);

    }


    // DELETE: Xóa user
    function removeUser(id) {

        setUsers(prev =>
            prev.filter(u => u.id !== id)
        );

    }


    if (loading) {
        return <p className="loading">Đang tải dữ liệu...</p>;
    }


    return (

        <>

            <div className="table-wrapper">

                <table>

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>


                    <tbody>

                        {filteredUsers.map(u => (

                            <tr key={u.id}>

                                <td>{u.id}</td>

                                <td>{u.name}</td>

                                <td>{u.username}</td>

                                <td>{u.email}</td>

                                <td>
                                    {u.address.street},
                                    {u.address.suite},
                                    {u.address.city}
                                </td>

                                <td>{u.phone}</td>

                                <td>

                                    <button
                                        className="btn-edit"
                                        onClick={() => editUser(u)}
                                    >
                                        Sửa
                                    </button>

                                    <button
                                        className="btn-delete"
                                        onClick={() => removeUser(u.id)}
                                    >
                                        Xóa
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                {filteredUsers.length === 0 && (
                    <p className="loading">
                        Không tìm thấy người dùng!
                    </p>
                )}

            </div>


            {/* FORM EDIT USER */}

            {editing && (

                <div className="modal-overlay">

                    <div className="modal-content">

                        <h3>Chỉnh sửa người dùng</h3>

                        <div className="form-group">
                            <label>Name</label>
                            <input
                                value={editing.name}
                                onChange={e =>
                                    handleEditChange("name", e.target.value)
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label>Username</label>
                            <input
                                value={editing.username}
                                onChange={e =>
                                    handleEditChange("username", e.target.value)
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                value={editing.email}
                                onChange={e =>
                                    handleEditChange("email", e.target.value)
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label>Street</label>
                            <input
                                value={editing.address.street}
                                onChange={e =>
                                    handleEditChange("street", e.target.value)
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label>Suite</label>
                            <input
                                value={editing.address.suite}
                                onChange={e =>
                                    handleEditChange("suite", e.target.value)
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label>City</label>
                            <input
                                value={editing.address.city}
                                onChange={e =>
                                    handleEditChange("city", e.target.value)
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                value={editing.phone}
                                onChange={e =>
                                    handleEditChange("phone", e.target.value)
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label>Website</label>
                            <input
                                value={editing.website}
                                onChange={e =>
                                    handleEditChange("website", e.target.value)
                                }
                            />
                        </div>

                        <div className="form-actions">

                            <button
                                className="btn-add"
                                onClick={saveUser}
                            >
                                Lưu
                            </button>

                            <button
                                className="btn-cancel"
                                onClick={() => setEditing(null)}
                            >
                                Hủy
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>

    );

}


// =====================================
// RENDER APP
// =====================================

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(<App />);