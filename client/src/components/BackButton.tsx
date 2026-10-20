const VolverAtras = () => {
  const volver = () => {
    window.history.back();
  };

  return (
    <button
      type="button"
      className="btn"
      onClick={volver}
      style={{
        backgroundColor: 'var(--violeta)',
        color: 'var(--blanco)',
        fontWeight: 'bold',
      }}
    >
      ← Volver
    </button>
  );
};

export default VolverAtras;