
import infrastructureVideo from "../images/infrastructure.mp4";
import Seeding1 from "../images/seeding1.jpg";
import Seeding2 from "../images/seeding2.jpg";
import Seeding3 from "../images/seeding3.jpg";
import SeederMachine1 from "../images/seederMachine1.jpg";
import SeederMachine2 from "../images/seederMachine2.jpg";
import SeederMachine3 from "../images/seederMachine3.jpg";
import Polyhouse1 from "../images/polyhouse1.jpg";
import Polyhouse2 from "../images/polyhouse2.jpg";
import Polyhouse3 from "../images/polyhouse3.jpg";

// eslint-disable-next-line react/prop-types
const InfrastructureSection = ({ title, description, images }) => {
  return (
    <div className="bg-green-50 p-6 rounded-xl my-10 border-l-4 border-green-600 shadow-md">
      <h2 className="text-2xl font-semibold text-green-800 mb-2">{title}</h2>
      <p className="text-gray-700 mb-4 text-justify">{description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${title}-image-${index + 1}`}
            className="rounded-lg shadow"
          />
        ))}
      </div>
    </div>
  );
};

const Infrastructure = () => {
  return (
    <div className="w-full">
      {/* Video Section */}
     <div className="w-screen h-[500px] overflow-hidden flex justify-center items-center bg-black">
  <video
    className="w-screen h-auto object-cover transition-all duration-300 ease-in-out rounded-none rotate-[360deg]"
    src={infrastructureVideo}
    autoPlay
    loop
    muted
    playsInline
    controlsList="nodownload noremoteplayback"
    disablePictureInPicture
      style={{
      imageRendering: "auto",
      backfaceVisibility: "hidden",
      willChange: "transform",
    }}
   
  />
</div>


      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <InfrastructureSection
          title="Seedling Tray Manufacturing"
          description="We manufacture our seedling trays that we use from the germination stage until the seedlings are ready for transplantation. We fill it with high quality coco peat for sowing seeds. Each tray contains just one or two seedlings, making transplanting easier as they grow. This ensures excellent nutrition availability and retention by the seedlings."
          images={[Seeding1, Seeding3, Seeding2]}
        />

        <InfrastructureSection
          title="Automatic Seeder Machine"
          description="Our automatic seeder machine helps in sowing seeds quickly and uniformly in trays. This modern technology reduces human effort and ensures precision during the planting process."
          images={[SeederMachine1, SeederMachine2, SeederMachine3]}
        />

        <InfrastructureSection
          title="Polyhouses"
          description="We grow plants in controlled environments inside polyhouses to ensure optimal temperature, humidity, and protection from external weather. This results in healthier and faster-growing plants."
          images={[Polyhouse1, Polyhouse2, Polyhouse3]}
        />
      </div>
    </div>
  );
};

export default Infrastructure;
