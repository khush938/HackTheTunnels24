import { Central as Layout } from "@/layouts";
import "./NotFound.style.scss";

function NotFound() {
  return (
    <Layout >
      <div className="not-found-container">
        <h1 className="not-found-header">404 - PAGE NOT FOUND</h1>
        <div className="content">
          <div className="left-section">
            <p className="description">← This is everyone else</p>
            <img src="/path-to-your-map-image.png" alt="Map of crimes" className="map-image" />
          </div>
          <div className="right-section">
            <p className="this-is-you">THIS IS YOU →</p>
            <p className="this-is-you">uOttawa</p>
            <p className="off-the-map">(wayyy off the map)</p>
            <p className="note">
              So while you’re here on the totally incorrect page, 
            </p>

            <a href="/login" className="dashboard-link">Go here for the main menu</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NotFound;
