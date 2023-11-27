import React from 'react';

export default function Main() {
  return (
    <div>
    <div style={{backgroundColor:'rgb(72, 150, 160)',minHeight: '100vh',display: 'flex',flexDirection: 'column',padding: '20px', paddingTop: '20px',}}>
          
      <h2 style={{ color: 'blue' }}>Overview</h2>
      <p style={{ color: 'white' }}>
        Welcome to the Deskify Help Desk website design document. This document
        serves as a comprehensive blueprint for the construction and
        implementation of our online support platform. Deskify is conceived as a
        user-centric help desk solution that aims to streamline customer
        service operations and enhance user engagement through efficient
        ticketing and support mechanisms. This introduction outlines our vision,
        objectives, and the scope of functionality intended for Deskify.
      </p>

      <h2 style={{ color: 'blue' }}>Team Overview</h2>
      <p style={{ color: 'white' }}>
        Deskify is brought to life by a cohesive team of skilled professionals,
        each bringing a unique set of expertise to the project. Our team is
        composed of:
      </p>
      <ul>
        <li style={{ color: 'white' }}>
          <strong style={{ color: 'Black' }}>Project Manager:</strong> Johnathan Hall - Johnathan oversees
          the project's progress from conception to launch. His strategic
          planning and keen oversight ensure that project milestones are met on
          time and within budget.
        </li>
        <li style={{ color: 'white' }}>
          <strong style={{ color: 'Black' }}>Lead Software Engineer:</strong> Ibtesam Mirza - Ibtesam
          leads the software development efforts, ensuring high-quality code
          and effective implementation of the project’s technical aspects.
        </li>
        <li style={{ color: 'white' }}>
          <strong style={{ color: 'Black' }}>UI Programmer:</strong> Rodrigo Soto Acuna - Rodrigo
          specializes in user interface programming, focusing on delivering a
          seamless and intuitive user experience across all devices.
        </li>
        <li style={{ color: 'white' }}>
          <strong style={{ color: 'Black' }}>Security Programmer:</strong> Mohammed Subhaan Asif Hakeem -
          Mohammed is in charge of the platform's security, implementing robust
          measures to protect user data and prevent breaches.
        </li>
        <li style={{ color: 'white' }}>
          <strong style={{ color: 'Black' }}>Database Programmer:</strong> Anmoljeet Kaur - Anmoljeet
          expertly manages the database architecture, ensuring the integrity and
          performance of the data storage mechanisms.
        </li>
        <li style={{ color: 'white' }}>
          <strong style={{ color: 'Black' }}>Web Designer:</strong> Saiham Salim Ullah - Saiham crafts the
          website's visual elements, focusing on aesthetics, functionality, and
          user accessibility.
        </li>
      </ul>
    </div>
    </div>
  );
}
