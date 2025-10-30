export const TextField = ({ helperText, label }) => {
  let labelClass = "text-preset-4 text-neutral-950";
  let inputClass = "";
  let helperClass = "";

  return (
    <div className="flex flex-col gap-">
      {label && <label className={labelClass}>{label}</label>}
      <input />
      {helperText && <span>{helperText}</span>}
    </div>
  );
};
