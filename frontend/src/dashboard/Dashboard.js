import React, { useState, useEffect } from "react"; // Import useState and useEffect
import Sidebar from "../components/Sidebar"; // Adjust the path if needed
import "./Dashboard.css"; // Ensure this CSS file is linked
import TabBar from "../components/TabBar";  
import bgImage from './assets/bg.jpg';

// New component for displaying a single announcement detail
const AnnouncementDetail = ({ title, detail, date, onBack }) => {
  return (
    <div className="announcement-detail-page">
      <button className="back-button" onClick={onBack}>&larr; Back to Dashboard</button>
      <h1 className="announcement-page-title">{title}</h1>
      <p className="announcement-page-date">{date}</p>
      <p className="announcement-page-content">{detail}</p>
      {/* You can add more details here, e.g., images, sub-sections */}
    </div>
  );
};


function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard'); // State to manage current view
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null); // State to store selected announcement data
  

  // Function to show announcement details
  const showAnnouncementDetail = (announcement) => {
    setSelectedAnnouncement(announcement);
    setCurrentView('announcementDetail');
  };
  useEffect(() => {
    // Fetch profile data when the component mounts
    const applicationId = localStorage.getItem('application_id');
    if (!applicationId) return;
    fetch(`http://localhost:5000/profile/${applicationId}`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(() => setProfile(null));
  }, []);

  // Function to go back to the dashboard
  const backToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedAnnouncement(null); // Clear selected announcement
  };

  // Sample announcement data (you'd likely fetch this from an API in a real app)
  const announcements = [

// Article about early bird enrollment discount
{
  id: 'early-bird-details',
  title: 'Early Bird Enrollment Discount',
  detail: `
Announcing Our Early Bird Enrollment Incentive

We are pleased to announce a special Early Bird Enrollment Discount, providing prospective students with an opportunity to receive a 10% reduction on tuition fees. This initiative is designed to support individuals committed to advancing their education by offering a significant financial incentive.

To qualify for this exclusive offer, applicants must complete their enrollment process by July 15, 2025. This stipulated deadline is firm, and we encourage all interested parties to finalize their registration promptly to benefit from this advantageous offer.

    

Key Benefits of Early Enrollment:

- Financial Advantage: A direct 10% reduction on tuition fees, contributing to overall cost savings.
- Program Assurance: Early enrollment guarantees placement in your chosen program, particularly beneficial for courses with limited capacities.
- Enhanced Preparation: Securing your enrollment in advance allows ample time for academic and logistical preparations, ensuring a smooth transition into your studies.

    

Eligibility and Application Procedure:

The 10% tuition fee discount will be automatically applied to all enrollments processed on or before July 15, 2025. No separate application for the discount is required; timely enrollment is the sole prerequisite.

This early bird incentive represents a valuable opportunity to invest in your academic or professional development while realizing substantial savings. We encourage you to utilize this limited-time offer.

    

For further inquiries or to commence your enrollment, please contact our admissions department.`,
  date: 'Posted: June 1, 2025',
},

//article about scholarship applications
    {
    
  id: 'scholarship-details',
  title: 'Scholarship Applications Open',
  detail: `
Opportunity Awaits: Scholarship Applications for AY 2025-2026

Aspiring students seeking to fund their academic journey will be pleased to learn that scholarship applications for the Academic Year 2025-2026 are officially open. This is a crucial opportunity for individuals demonstrating exceptional academic promise or outstanding athletic talent to receive financial assistance towards their education.

Both academic and athletic scholarship applications are now being accepted. These scholarships are designed to support students who meet specific criteria, recognizing their achievements and potential.

To ensure all necessary information is readily accessible, comprehensive details regarding "eligibility criteria" for each scholarship category, along with the required application forms, have been published. Prospective applicants are strongly encouraged to visit the dedicated Scholarships page on our officiaL website for full information and to download the relevant documents.

Please note the critical deadline for submission: All applications must be submitted by July 31, 2025. Late submissions will not be considered. We advise all interested candidates to begin their application process promptly to gather all required documents and accurately complete the forms.

This is a chance to invest in your future and alleviate the financial burden of higher education. Don't miss out on the opportunity to secure support for Academic Year 2025-2026.`,
  date: 'Posted: June 18, 2025',
},

// Article about new course offerings
    {
  id: 'new-courses-details',
  title: 'New Course Offerings',
  detail: `We are thrilled to unveil significant enhancements to our academic portfolio with the launch of new initiatives designed to meet diverse educational and industry needs. These new programs and opportunities will be available starting this upcoming academic year.
           
Among our new offerings, we are excited to introduce a cutting-edge "Bachelor of Science in Data Science" program. This innovative program is meticulously designed to equip students with the theoretical knowledge, practical skills, and critical thinking necessary to excel in the dynamic and high-growth sector of data analysis. Graduates of the BS in Data Science program will be prepared to transform complex data into actionable insights, utilizing statistical analysis, machine learning algorithms, and data visualization techniques.

  

    Programs Offered:

    - 4 - Year Baccalaureate Degree
    - 2- Year Certificate Course

    

    Special Skills Program:

    - Executive Class
    - Institute of Technical Resource and Entrepreneurial Development

    

    FREE TUITION FOR:

    UNIFAST - QUALIFIED COLLEGE STUDENTS

  

Our expanded offerings and financial aid opportunities reflect our commitment to providing accessible and high-quality education. We aim to empower the next generation of professionals and contribute directly to the talent pool required by various industries.

We invite prospective students eager to embark on a rewarding career or enhance their skills to explore these new program offerings and tuition assistance. Join us in shaping your future.`,
  date: 'Posted: June 18, 2025',
},
  ];

  return (
     <div>
      <TabBar profile={profile} />
      <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main-content">
        {currentView === 'dashboard' ? (
          // Render Dashboard content
          <>
            {/* Top Header Section */}
            <header className="dashboard-header">
              <div className="header-overlay">
              </div>
            </header>

            {/* Info Cards Section */}
            <section className="info-cards-section">
              <div className="info-card">
                <img
                  src="https://img.freepik.com/free-vector/calendar-icon-white-background_1308-84634.jpg"
                  className="info-card-icon"
                  alt="Calendar icon"
                />
                <p className="info-card-text">
                  <span className="info-card-highlight">30+ Years</span> of Academic Excellence
                </p>
              </div>
              <div className="info-card">
                <img
                  src="https://media.istockphoto.com/id/1205507976/vector/graduate-cap-logo-university-mortarboard.jpg?s=612x612&w=0&k=20&c=X_WSdETOyZPl9KeYSdYCYCltoS7cYwUtQHM6hbj_QqQ="
                  className="info-card-icon"
                  alt="Graduation cap icon"
                />
                <p className="info-card-text">
                  <span className="info-card-highlight">5,000+</span> Enrolled Students
                </p>
              </div>
              <div className="info-card">
                <img
                  src="https://chedcar.com/wp-content/uploads/2020/09/Commission_on_Higher_Education_CHEd.svg_.png"
                  className="info-card-icon"
                  alt="CHED logo"
                />
                <p className="info-card-text">
                  <span className="info-card-highlight">CHED Recognized</span> Quality Education
                </p>
              </div>
            </section>

            {/* Main Content Columns (Announcements and Important Information) */}
            <div
  className="dashboard-columns-container"
  style={{ backgroundImage: `url(${bgImage})` }}
  >
              {/* Latest Announcements Section */}
              <section className="announcements-section">
                <h2 className="section-title">Latest Announcements</h2>
                <ul className="announcement-list">
                  {announcements.map((announcement) => (
                    <li
                      key={announcement.id}
                      className="announcement-item clickable-list-item"
                      onClick={() => showAnnouncementDetail(announcement)} // Use new handler
                    >
                      <h3 className="announcement-heading">{announcement.title}</h3>
                      <p className="announcement-detail">{announcement.detail.substring(0, 80)}...</p> {/* Truncate for list view */}
                      <span className="announcement-date">{announcement.date}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Important Information Section */}
              <section className="info-section">
                <h2 className="section-title">Important Information</h2>
                <ul className="info-list">
                  <li className="info-item">
                    <h3 className="info-heading">Enrollment Period</h3>
                    <p className="info-detail">July 1 - August 15, 2025</p>
                  </li>
                  <li className="info-item">
                    <h3 className="info-heading">Start of Classes</h3>
                    <p className="info-detail">August 29, 2025</p>
                  </li>
                  <li className="info-item">
                    <h3 className="info-heading">Requirements Deadline</h3>
                    <p className="info-detail">August 1, 2025</p>
                  </li>
                </ul>
              </section>
            </div> {/* End dashboard-columns-container */}

            {/* Academic Programs Section */}
            <section className="academic-programs-section">
              <h2 className="section-title">Academic Programs</h2>
              <div className="academic-programs-grid">
                <div className="program-card">
                  <h3 className="program-heading">TWO YEAR PROGRAMS (PAYING/NON-UNIFAST)</h3>
                  <ul className="program-list">
                    <li>Associate in Business Administration (ABA)</li>
                    <li>Associate in Accounting Information System (AAIS)</li>
                    <li>Associate in Human Resource Development (AHRD)</li>
                    <li>Associate in Hotel and Restaurant Technology (AHRT)</li>
                  </ul>
                </div>
                <div className="program-card">
                  <h3 className="program-heading">INSTITUTE OF INFORMATION AND COMMUNICATION TECHNOLOGY (IICT)</h3>
                  <ul className="program-list">
                    <li>Bachelor of Science Information Technology (BSIT)</li>
                    <li>Certificate in Computer Sciences (CCS)</li>
                  </ul>
                </div>
                <div className="program-card">
                  <h3 className="program-heading">INSTITUTE OF BUSINESS AND OFFICE ADMINISTRATION (IBOA)</h3>
                  <ul className="program-list">
                    <li>Bachelor of Science in Office Administration (BSOA)</li>
                    <li>Certificate in Office Administration (COA)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact Information Section */}
            <section className="contact-info-section">
              <h2 className="section-title">Contact Information</h2>
              <div className="contact-details-grid">
                <div className="contact-address">
                  <h3 className="contact-heading">Main Campus Address:</h3>
                  <p>123 College Road, Pateros, Metro Manila</p>
                </div>
                <div className="contact-numbers">
                  <h3 className="contact-heading">Contact Numbers:</h3>
                  <p>+63 (2) 8123-4567</p>
                  <p>+63 917-123-4567</p>
                </div>
                <div className="contact-email">
                  <h3 className="contact-heading">Email:</h3>
                  <p>admissions@ptc.edu.ph</p>
                </div>
                <div className="contact-hours">
                  <h3 className="contact-heading">Office Hours:</h3>
                  <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                </div>
              </div>
            </section>
          </>
        ) : (
          // Render Announcement Detail page
          <AnnouncementDetail
            title={selectedAnnouncement.title}
            detail={selectedAnnouncement.detail}
            date={selectedAnnouncement.date}
            onBack={backToDashboard}
          />
        )}
      </div> {/* End dashboard-main-content */}
    </div>
    </div>
  );
}

export default Dashboard;