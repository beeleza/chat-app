const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)]
            .map((_, i) => ({ id: i, animate: i % 2 === 0 }))
            .sort(() => Math.random() - 0.5)
            .map(({ id, animate }) => (
              <div
                className={`aspect-square rounded-2xl bg-primary/10 ${
                  animate ? "animate-pulse" : ""
                }`}
                key={id}
              />
            ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
