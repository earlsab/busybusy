/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// interface StoreDetailsProps {
//   data: any; // Replace 'any' with the actual type of your data
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function StoreDetails({
  title,
  description,
  location,
  link,
  type,
}: {
  title: string;
  description: string;
  location: string;
  link: string;
  type: string;
}) {
  // Get Latest Entry for Shop
  return (
    <>
      <div className="store-details">
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="location">
          <h2>Location</h2>
          <p>{location}</p>
        </div>
        <div className="social-media">
          <h2>Follow Us</h2>
          <ul>
            {/* {socialMedia.map((link, index) => (
              <li key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.platform}
                </a>
              </li>
            ))} */}
          </ul>
        </div>
        <p>{link}</p>
        <div className="store-type">
          <h2>Store Type</h2>
          <p>{type}</p>
        </div>
      </div>
    </>
  );
}
