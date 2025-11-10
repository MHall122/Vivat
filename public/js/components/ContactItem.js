function ContactItem({ icon, title, info }) {
  return (
    <div className="text-center">
      <div className="text-5xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold text-wine mb-2">{title}</h3>
      {info.map((line, index) => (
        <p key={index} className="text-gray-600">{line}</p>
      ))}
    </div>
  );
}
