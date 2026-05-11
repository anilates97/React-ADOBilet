const Input = ({ label, type, name, formik }) => {
  return (
    <label className="block text-left">
      <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.14em] text-[#d9a85f]">
        {label}
      </span>
      <input
        name={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        className="premium-input px-4"
        type={type}
      />
      {formik.touched[name] && formik.errors[name] && (
        <div className="mt-2 text-sm font-semibold text-[#ff6b6b]">
          {formik.errors[name]}
        </div>
      )}
    </label>
  );
};

export default Input;
