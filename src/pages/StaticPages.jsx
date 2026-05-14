import React from 'react';
import SEOHead from '../components/SEOHead';

export function About() {
  return (
    <>
      <SEOHead
        title="About PoolCalculator – Free Electronics Tools for Students"
        description="PoolCalculator is a free online resource for electronics students and hobbyists. Learn about our mission to provide accurate, fast electronics calculators."
        keywords="about PoolCalculator, electronics calculator website, free electronics tools"
        canonical="/about"
      />
      <div className="page-wrapper">
        <div className="container" style={{maxWidth:'720px'}}>
          <div className="page-header">
            <h1>About PoolCalculator</h1>
            <p>A free toolkit for electronics learners, students, and hobbyists.</p>
          </div>
          <div className="card" style={{marginBottom:'20px'}}>
            <h2 style={{fontSize:'20px',marginBottom:'12px',color:'var(--text-primary)'}}>Our Mission</h2>
            <p style={{color:'var(--text-secondary)',lineHeight:'1.8',marginBottom:'12px'}}>
              PoolCalculator was created with one goal: make electronics calculations simple, fast, and accessible to everyone. Whether you're a student learning the basics or an experienced engineer prototyping a circuit, our tools give you instant, accurate results without the need for registration or expensive software.
            </p>
            <p style={{color:'var(--text-secondary)',lineHeight:'1.8'}}>
              Every calculator on this site is built with clarity and accuracy in mind. We show you the formula used so you understand the mathematics — not just the answer.
            </p>
          </div>
          <div className="card" style={{marginBottom:'20px'}}>
            <h2 style={{fontSize:'20px',marginBottom:'12px',color:'var(--text-primary)'}}>What We Offer</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {[
                ['💡','LED Resistor Calculator','Find the correct current-limiting resistor for any LED.'],
                ['🎨','Resistor Color Code','Decode 4, 5, and 6-band resistor color codes.'],
                ['🔲','SMD Resistor Code','Decode surface-mount resistor markings.'],
                ['🌀','Inductor Color Code','Identify inductance values from color bands.'],
                ['⚡','Capacitor Code','Decode ceramic and polyester capacitor codes.'],
              ].map(([icon,title,desc]) => (
                <div key={title} style={{display:'flex',gap:'12px',padding:'12px',background:'var(--bg-secondary)',borderRadius:'var(--radius-sm)'}}>
                  <span style={{fontSize:'20px'}}>{icon}</span>
                  <div>
                    <div style={{fontWeight:'700',color:'var(--text-primary)',fontSize:'14px'}}>{title}</div>
                    <div style={{color:'var(--text-muted)',fontSize:'13px',marginTop:'2px'}}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h2 style={{fontSize:'20px',marginBottom:'12px',color:'var(--text-primary)'}}>Why Free?</h2>
            <p style={{color:'var(--text-secondary)',lineHeight:'1.8'}}>
              We believe education should be free. PoolCalculator is supported by non-intrusive advertising which keeps the lights on while keeping every tool completely free and accessible. No paywalls, no sign-ups, no data harvesting.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function Contact() {
  return (
    <>
      <SEOHead
        title="Contact PoolCalculator – Get In Touch"
        description="Contact the PoolCalculator team via email or Discord. We welcome feedback, bug reports, and suggestions."
        keywords="contact PoolCalculator, electronics calculator feedback"
        canonical="/contact"
      />
      <div className="page-wrapper">
        <div className="container" style={{maxWidth:'680px'}}>
          <div className="page-header">
            <h1>Contact Us</h1>
            <p>Have a question, bug report, or suggestion? We'd love to hear from you.</p>
          </div>
          <div className="card" style={{marginBottom:'20px'}}>
            <div className="section-title">Get In Touch</div>
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'16px',padding:'16px',background:'var(--bg-secondary)',borderRadius:'var(--radius-md)'}}>
                <div style={{fontSize:'28px'}}>📧</div>
                <div>
                  <div style={{fontSize:'12px',color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'4px',fontWeight:'600'}}>Email</div>
                  <a href="mailto:arpankar077@gmail.com" style={{color:'var(--accent)',fontFamily:'var(--font-mono)',fontSize:'15px'}}>arpankar077@gmail.com</a>
                </div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'16px',padding:'16px',background:'var(--bg-secondary)',borderRadius:'var(--radius-md)'}}>
                <div style={{fontSize:'28px'}}>💬</div>
                <div>
                  <div style={{fontSize:'12px',color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'4px',fontWeight:'600'}}>Discord Server</div>
                  <a href="https://discord.gg/QbCcpKCZPF" target="_blank" rel="noopener noreferrer" style={{color:'var(--accent)',fontFamily:'var(--font-mono)',fontSize:'15px'}}>discord.gg/QbCcpKCZPF</a>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="section-title">What to Reach Us About</div>
            <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
              {['🐛 Bug reports or calculation errors','💡 Suggestions for new calculators','🤝 Collaboration or sponsorship','❓ General questions about electronics'].map(item => (
                <div key={item} style={{padding:'10px 14px',background:'var(--bg-secondary)',borderRadius:'var(--radius-sm)',color:'var(--text-secondary)',fontSize:'14px'}}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function PrivacyPolicy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy – PoolCalculator"
        description="PoolCalculator privacy policy. We do not collect personal data. Learn about our cookie usage and Google AdSense practices."
        canonical="/privacy-policy"
      />
      <div className="page-wrapper">
        <div className="container" style={{maxWidth:'720px'}}>
          <div className="page-header">
            <h1>Privacy Policy</h1>
            <p>Last updated: January 2025</p>
          </div>
          <div className="card">
            {[
              ['No Personal Data Collection', 'PoolCalculator does not collect, store, or process any personal information. All calculations happen entirely in your browser. No account registration is required to use any tool on this website.'],
              ['Cookies', 'We use cookies and third-party services like Google AdSense to display advertisements. These services may collect data based on your consent to provide a more personalized experience. By using this website, you consent to the use of cookies in accordance with this policy. You can disable cookies in your browser settings, though this may affect site functionality.'],
              ['Google AdSense', 'This website uses Google AdSense to display advertisements. Google AdSense uses cookies and web beacons to serve ads based on your prior visits to this website and other sites on the internet. You may opt out of personalized advertising by visiting Google\'s Ad Settings page at www.google.com/settings/ads. Ads will only be loaded if you explicitly accept our cookie policy.'],
              ['Analytics', 'We may use anonymous analytics tools to understand general usage patterns such as page views and popular tools. No personally identifiable information is collected.'],
              ['Third-Party Links', 'Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites.'],
              ['Changes to This Policy', 'We may update this privacy policy from time to time. Continued use of the website after changes constitutes acceptance of the new policy.'],
              ['Contact', 'If you have questions about this privacy policy, contact us at arpankar077@gmail.com.'],
            ].map(([title, text]) => (
              <div key={title} style={{marginBottom:'24px'}}>
                <h2 style={{fontSize:'16px',fontWeight:'700',color:'var(--text-primary)',marginBottom:'8px'}}>{title}</h2>
                <p style={{color:'var(--text-secondary)',lineHeight:'1.8',fontSize:'14px'}}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function Terms() {
  return (
    <>
      <SEOHead
        title="Terms & Conditions – PoolCalculator"
        description="Terms and conditions for using PoolCalculator. This site is for educational use only. No liability is accepted for calculation errors."
        canonical="/terms"
      />
      <div className="page-wrapper">
        <div className="container" style={{maxWidth:'720px'}}>
          <div className="page-header">
            <h1>Terms &amp; Conditions</h1>
            <p>Last updated: January 2025</p>
          </div>
          <div className="card">
            {[
              ['Educational Use Only', 'PoolCalculator provides calculators and tools for educational and informational purposes only. All results should be verified before use in real-world applications, especially those involving safety-critical circuits or commercial products.'],
              ['No Warranty', 'The tools and calculators on this website are provided "as is" without any warranty of any kind. While we strive for accuracy, we make no guarantees about the correctness, completeness, or reliability of any calculation result.'],
              ['Limitation of Liability', 'PoolCalculator and its operators shall not be held liable for any damages, losses, or consequences arising from the use of calculation results from this website. Users assume full responsibility for verifying calculations before applying them.'],
              ['Intellectual Property', 'All content, design, and code on this website is the property of PoolCalculator unless otherwise noted. Unauthorized copying or reproduction is prohibited.'],
              ['Acceptable Use', 'You agree to use this website only for lawful purposes. You must not attempt to disrupt, hack, or interfere with the operation of this website.'],
              ['Changes to Terms', 'We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the new terms.'],
              ['Governing Law', 'These terms are governed by applicable laws. Any disputes will be resolved under the laws of the jurisdiction in which PoolCalculator operates.'],
              ['Contact', 'For any questions regarding these terms, contact us at arpankar077@gmail.com.'],
            ].map(([title, text]) => (
              <div key={title} style={{marginBottom:'24px'}}>
                <h2 style={{fontSize:'16px',fontWeight:'700',color:'var(--text-primary)',marginBottom:'8px'}}>{title}</h2>
                <p style={{color:'var(--text-secondary)',lineHeight:'1.8',fontSize:'14px'}}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
