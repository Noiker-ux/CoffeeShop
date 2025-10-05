export default function Home() {
  return (
    <>
      <section className="w-full h-screen bg-gradient-custom-snow">
        <video
          src="/videos/7876_Dust_Particles_1920x1080.mp4"
          autoPlay
          muted
          loop
          className="mix-blend-multiply w-full h-full object-cover absolute"
        ></video>
        <div className="relative h-screen flex items-center justify-center text-white font-[SoDo Sans Black] font-extrabold text-9xl">
          Toxic Dreams
        </div>
      </section>{" "}
    </>
  );
}
