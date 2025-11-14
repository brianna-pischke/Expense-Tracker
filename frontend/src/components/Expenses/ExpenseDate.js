import "./ExpenseDate.css";

function ExpenseDate(props) {
  // Force UTC timezone to prevent date shifting
  const month = props.date.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit", timeZone: "UTC" });
  const year = props.date.toLocaleString("en-US", { year: "numeric", timeZone: "UTC" });
  
  return (
    <div className="expense-date">
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
      <div className="expense-date__day">{day}</div>
    </div>
  );
}

export default ExpenseDate;
