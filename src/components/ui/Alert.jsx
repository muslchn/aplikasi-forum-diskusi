export default function Alert({ children }) {
  if (!children) {
    return null;
  }

  return (
    <p className="alert" role="alert">
      {children}
    </p>
  );
}
