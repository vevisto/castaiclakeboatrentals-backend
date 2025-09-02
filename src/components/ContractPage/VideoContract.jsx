

export const VideoContract = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Your Payment is Confirmed!</h1>
      <h2 className="text-2xl text-[#88907B]">
        Please, watch video instruction and sign contract form
      </h2>

      <div className="mt-6 flex justify-center">
        <video
          className="rounded-xl shadow-lg w-full max-w-2xl"
          controls
          poster="/videothumbnail.png"
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
