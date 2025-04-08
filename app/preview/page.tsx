export default function Preview() {
  return (
    <>
      {/* Background Elements */}
      <div className="fixed inset-0 w-full min-h-screen overflow-hidden">
        {/* Base background */}
        <div className="absolute inset-0 w-full h-full dark:bg-black bg-white -z-30" />

        <div
          className="absolute inset-0 w-full h-full -z-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ff0000 1px, transparent 1px), linear-gradient(to bottom, #ff0000 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            opacity: 0.23,
          }}
        />

        <div
          className="absolute inset-0 w-full h-full -z-20"
          style={{
            backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            opacity: 0.26,
          }}
        />

        {/* Spots */}
        <div
          key="0"
          className="absolute -z-10 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: "30%",
            top: "34%",
            width: "350px",
            height: "350px",
            backgroundColor: "#00a3f3",
            opacity: 0.33,
            filter: "blur(184px)",
          }}
        />
      </div>

      {/* Write your content here */}
      <main className="relative z-10">
        {/* Your code here */}

        <div className="flex flex-col justify-between items-center">
          <div className="text-red-500 text-4xl mb-24">Hello there</div>
          <div className="text-red-500 text-4xl mb-24">Hello there</div>
          <div className="text-red-500 text-4xl mb-24">Hello there</div>
          <div className="text-red-500 text-4xl mb-24">Hello there</div>
          <div className="text-red-500 text-4xl mb-24">Hello there</div>
          <div className="text-red-500 text-4xl mb-24">Hello there</div>
          <div className="text-red-500 text-4xl mb-24">Hello there</div>
          <div className="text-red-500 text-4xl mb-24">Hello there</div>
          <div className="text-red-500 text-4xl mb-24">Hello there</div>
          <div className="text-red-500 text-4xl mb-24">Hello there</div>
          <div className="text-red-500 text-4xl mb-24">Hello there</div>
          <div className="text-red-500 text-4xl mb-24">Hello there</div>
          <div className="text-red-500 text-4xl mb-24">Hello there</div>
          <div className="text-red-500 text-4xl mb-24">Hello there</div>
          <div className="text-red-500 text-4xl mb-24">Hello there</div>
          <div className="text-red-500 text-4xl mb-24">Hello there</div>
        </div>
      </main>
    </>
  );
}
