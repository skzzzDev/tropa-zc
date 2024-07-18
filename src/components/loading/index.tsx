export function Loading() {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-white mx-auto"></div>
        <h2 className="text-white  mt-4">Loading...</h2>
        <p className="text-white">
          Carregando as informações
        </p>
      </div>
    </div>
  );
}
