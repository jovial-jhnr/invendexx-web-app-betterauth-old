import { Link } from "react-router-dom";
import MailtoLink from "./MailtoLink";
import { Separator } from "../ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

// Image imports for the socials in the avatar
import tiktok_image from "../../assets/socials-icons/tiktok_image.png";
import discord_image from "../../assets/socials-icons/discord_image.png";
import instagram_image from "../../assets/socials-icons/instagram_image.png";
import linkedin_image from "../../assets/socials-icons/linkedin_image.png";

function Footer() {
  return (
    <footer>
      <Separator />
      <div className="flex flex-col md:flex-row m-3 p-3 justify-between container ">
        {/* About the web app section */}
        <div className="flex flex-col md:m-5 w-1/3">
          <h1 className="font-inter font-bold text-lg">About Invendexx</h1>
          <p className="text-md font-medium ">
            Invendexx is an all round inventory and business management
            application made in mind for all business
          </p>
        </div>

        {/* Links side of the web app */}
        <div className=" grid grid-cols-2 md:grid-cols-5  gap-10 pt-2 ">
          {/* Quick Links */}
          <div>
            <h1 className="font-inter font-medium text">Links </h1>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
              <li>
                <Link to="#">Features</Link>
              </li>
              <li>
                <Link to="#">Releases</Link>
              </li>
              <li>
                <Link to="#">Tutorials</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h1 className="font-inter font-medium text">Support </h1>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="">Blog</Link>
              </li>
              <li>
                <Link to="#">FAQ</Link>
              </li>
              <li>
                <Link to="#">Chat</Link>
              </li>
              <li>
                <Link to=""></Link>
              </li>
              <li>
                <Link to=""></Link>
              </li>
              <li>
                <Link to=""></Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h1 className="font-inter font-medium text">Resources</h1>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="">Help Center</Link>
              </li>
              <li>
                <Link to="">How it Works</Link>
              </li>
              <li>
                <Link to="">Privacy Policy</Link>
              </li>
              <li>
                <Link to="">Terms of Services</Link>
              </li>
              <li>
                <Link to="">Legal Notice</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h1 className="font-inter font-medium text">Company </h1>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="">About Us</Link>
              </li>
              <li>
                <Link to="">Careers</Link>
              </li>
              <li>
                <Link to="">Contact Us</Link>
              </li>
              <li>
                <Link to="">Career Tips</Link>
              </li>
            </ul>
          </div>

          {/* Socials. It not needed now will use icons below */}
          <div>
            <h1 className="font-inter font-medium text">Socials</h1>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="">Instagram</Link>
              </li>
              <li>
                <a href="https://www.tiktok.com/@invendexx">Tiktok</a>
              </li>
              <li>
                <Link to="">Whatsapp</Link>
              </li>
              <li>
                <Link to="">Telegram</Link>
              </li>
              <li>
                <Link to="">Facebook</Link>
              </li>
              <li>
                <Link to="">Twitter</Link>
              </li>
            </ul>
          </div>

          {/* End of links side */}
        </div>

        {/* Subscribe Newsletter */}
        {/* <div className="col-span-2">
          <h6 className="font-semibold">Stay up to date</h6>
          <form className="mt-6 flex items-center gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="grow max-w-64"
            />
            <Button>Subscribe</Button>
          </form>
        </div> */}
      </div>

      {/* Separator */}
      <Separator />

      {/* Copyright Section and Socials */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Copyright Section */}
        <div className="text-start text-md font-medium  m-8">
          <p>{`© Copyright ${new Date().getFullYear()} Invendex. All Rights Reserved.`}</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Socials and Icons Section */}
          <div className="flex flex-row items-center gap-5 text-muted-foreground m-3">
            <a
              href="https://www.instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar>
                <AvatarImage src={instagram_image} />
                <AvatarFallback>IG</AvatarFallback>
              </Avatar>
            </a>

            <a
              href="https://www.tiktok.com/@yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar>
                <AvatarImage src={tiktok_image} />
                <AvatarFallback>TT</AvatarFallback>
              </Avatar>
            </a>

            <a
              href="https://discord.gg/yourinvite"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar>
                <AvatarImage src={discord_image} />
                <AvatarFallback>DS</AvatarFallback>
              </Avatar>
            </a>

            <a
              href="https://www.linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar>
                <AvatarImage src={linkedin_image} />
                <AvatarFallback>LI</AvatarFallback>
              </Avatar>
            </a>
          </div>
        </div>
        {/* End of Social Icon */}
      </div>
    </footer>
  );
}

export default Footer;
