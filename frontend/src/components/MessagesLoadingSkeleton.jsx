function MessagesLoadingSkeleton() {
  const rows = [
    { side: "incoming", width: "w-48" },
    { side: "outgoing", width: "w-36" },
    { side: "incoming", width: "w-64" },
    { side: "incoming", width: "w-32" },
    { side: "outgoing", width: "w-52" },
    { side: "outgoing", width: "w-40" },
  ];

  return (
    <div className="messages-inner">
      {rows.map((row, index) => (
        <div
          key={index}
          className={`flex items-end gap-2 ${row.side === "outgoing" ? "flex-row-reverse" : ""}`}
        >
          {row.side === "incoming" && (
            <div className="skeleton rounded-full flex-shrink-0" style={{ width: 28, height: 28 }} />
          )}
          <div
            className={`skeleton rounded-2xl h-9 ${row.width}`}
            style={{
              borderRadius: row.side === "incoming" ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
            }}
          />
        </div>
      ))}
    </div>
  );
}
export default MessagesLoadingSkeleton;
