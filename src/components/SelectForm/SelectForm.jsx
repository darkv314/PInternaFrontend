function SelectForm({ id, label, value, setValue, options, values }) {
    return (
        <div className="input-form">
            <label htmlFor={id}>{label}:</label>
            <select
                name={id}
                id={id}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
                {options.map((option) => (
                    <option
                        // className="role-option"
                        key={option.id}
                        value={option[values || "name"]}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectForm;
