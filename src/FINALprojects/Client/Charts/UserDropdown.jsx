function UserDropdown({ users, onSelect }) {
  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      defaultValue=""
      style={{
        width: '100%',
        padding: '10px',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}
    >
      <option value="" disabled>
        Choose User
      </option>

      {users.map(user => (
        <option key={user.uid} value={user.uid}>
          {user.fullname}
        </option>
      ))}
    </select>
  );
}

export default UserDropdown;



