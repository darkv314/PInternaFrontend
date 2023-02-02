function InputForm({ type, id, label, value, setValue }) {
    return (
        <div className="input-form">
            <label htmlFor={id}>{label}:</label>

            <input
                type={type || "text"}
                id={id}
                autoComplete="off"
                required
                placeholder={label}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}

export default InputForm;
