import discord_image from "../../assets/socials-icons/discord_image.png";

export default function About() {
  return (
    <>
      <div className="">
        <div className="m-3 text-center text-2xl font-roboto font-semibold ">
          <h1>All About Us</h1>
        </div>

        <div className="flex flex-col md:flex-row justify-evenly">
          {/* Mission Image */}
          <div>
            <img
              src={discord_image}
              alt="Mission Image"
              className="rounded-lg size-12"
            />
          </div>

          {/* Other Text */}
          <div>
            <div>
              <h1 className="text-center text-xl font-opensans font-bold">
                OUR MISSION
              </h1>
              <p>
                This is our core mission to serve all businesses that needs help
                mananging their system, from inventory, staff, orders, finances
                etc we are here to help
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
