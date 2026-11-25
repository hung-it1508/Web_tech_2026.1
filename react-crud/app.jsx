const { useState, useEffect } = React;

const emptyUser = () => ({
    name: "", username: "", email: "",
    address: { street: "", suite: "", city: "" },
    phone: "", website: ""
});

// Component cha: quản lý state dùng chung.
function App() {
    const [kw, setKeyword] = useState("");
    const [newUser, setNewUser] = useState(null);
    return (
        <div className="container">
            <h1>Quản lý người dùng</h1>
            <div className="toolbar">
                <SearchForm onChangeValue={setKeyword} />
                <AddUser onAdd={setNewUser} />
            </div>
            <ResultTable keyword={kw} user={newUser}
                onAdded={() => setNewUser(null)} />
        </div>
    );
}

function SearchForm({ onChangeValue }) {
    return <input type="text" className="search"
        aria-label="Tìm kiếm người dùng"
        placeholder="Tìm theo name, username..."
        onChange={e => onChangeValue(e.target.value)} />;
}

// Form dùng chung cho thêm và sửa người dùng.
function UserForm({ title, user, onChange, onSave, onCancel }) {
    const fields = [
        ["name", "Họ tên"], ["username", "Username"],
        ["email", "Email"], ["street", "Đường"],
        ["suite", "Số nhà / căn hộ"], ["city", "Thành phố"],
        ["phone", "Số điện thoại"], ["website", "Website"]
    ];
    return (
        <div className="modal-overlay">
            <form className="modal-content" role="dialog" aria-modal="true"
                aria-label={title} onSubmit={e => { e.preventDefault(); onSave(); }}>
                <h2>{title}</h2>
                {fields.map(([key, label]) => (
                    <label key={key}>
                        {label}
                        <input value={(["street", "suite", "city"].includes(key)
                            ? user.address[key] : user[key]) ?? ""}
                            required={key === "name" || key === "username"}
                            onChange={e => onChange(key, e.target.value)} />
                    </label>
                ))}
                <div className="actions">
                    <button type="submit">Lưu</button>
                    <button type="button" className="btn-cancel" onClick={onCancel}>Hủy</button>
                </div>
            </form>
        </div>
    );
}

function updateField(user, key, value) {
    if (["street", "suite", "city"].includes(key)) {
        return { ...user, address: { ...user.address, [key]: value } };
    }
    return { ...user, [key]: value };
}

function AddUser({ onAdd }) {
    const [adding, setAdding] = useState(false);
    const [user, setUser] = useState(emptyUser);
    function handleAdd() {
        if (!user.name.trim() || !user.username.trim()) {
            alert("Vui lòng nhập Name và Username!");
            return;
        }
        onAdd(user);
        setUser(emptyUser());
        setAdding(false);
    }
    return (
        <div>
            <button onClick={() => setAdding(true)}>+ Thêm người dùng</button>
            {adding && <UserForm title="Thêm người dùng" user={user}
                onChange={(key, value) => setUser(prev => updateField(prev, key, value))}
                onSave={handleAdd} onCancel={() => setAdding(false)} />}
        </div>
    );
}

function ResultTable({ keyword, user, onAdded }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [error, setError] = useState("");

    // Đọc dữ liệu mẫu từ API khi component được mount.
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => {
                if (!res.ok) throw new Error("Lỗi API");
                return res.json();
            })
            .then(data => { setUsers(prev => [...data, ...prev]); setLoading(false); })
            .catch(() => { setError("Không thể tải dữ liệu từ API."); setLoading(false); });
    }, []);

    // Nhận dữ liệu mới từ App.
    useEffect(() => {
        if (user) {
            const id = Date.now();
            setUsers(prev => [...prev, { ...user, id }]);
            onAdded();
        }
    }, [user]);

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(keyword.toLowerCase()) ||
        u.username.toLowerCase().includes(keyword.toLowerCase())
    );

    function editUser(user) {
        setEditing({ ...user, address: { ...user.address } });
    }
    function saveUser() {
        if (!editing.name.trim() || !editing.username.trim()) {
            alert("Vui lòng nhập Name và Username!");
            return;
        }
        setUsers(prev => prev.map(u => u.id === editing.id ? editing : u));
        setEditing(null);
    }
    function removeUser(id) {
        setUsers(prev => prev.filter(u => u.id !== id));
    }

    if (loading) return <p>Đang tải dữ liệu...</p>;
    return (
        <div>
            {error && <p role="alert">{error}</p>}
            <p>Tổng số người dùng: {filteredUsers.length}</p>
            <div className="table-wrapper">
                <table>
                    <thead><tr>
                        <th>STT</th><th>Họ tên</th><th>Username</th>
                        <th>Email</th><th>Địa chỉ</th><th>Số điện thoại</th><th>Thao tác</th>
                    </tr></thead>
                    <tbody>
                        {filteredUsers.map((u, index) => (
                            <tr key={u.id}>
                                <td>{index + 1}</td><td>{u.name}</td><td>{u.username}</td>
                                <td>{u.email}</td>
                                <td>{[u.address.street, u.address.suite, u.address.city].filter(Boolean).join(", ")}</td>
                                <td>{u.phone}</td>
                                <td><div className="actions">
                                    <button className="btn-edit" onClick={() => editUser(u)}>Sửa</button>
                                    <button className="btn-delete" onClick={() => removeUser(u.id)}>Xóa</button>
                                </div></td>
                            </tr>
                        ))}
                        {filteredUsers.length === 0 && <tr><td colSpan="7">Không tìm thấy người dùng.</td></tr>}
                    </tbody>
                </table>
            </div>
            {editing && <UserForm title="Sửa người dùng" user={editing}
                onChange={(key, value) => setEditing(prev => updateField(prev, key, value))}
                onSave={saveUser} onCancel={() => setEditing(null)} />}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
